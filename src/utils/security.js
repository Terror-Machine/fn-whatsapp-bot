const { getContentType } = require('baileys');

const EMOJI_RE = /[\u{1F000}-\u{1FAFF}]/u;        // emoji
const ZW_RE = /[\u200B-\u200D\u2060\u3164]/;      // zero-width
const NULL_RE = /\u0000/;                         // null byte
const RLO_RE = /\u202E/;                          // Right-to-Left Override
const EMOJI_UNICODE_RE = /\p{Emoji}/u;            // [BARU] Unicode property untuk emoji, lebih akurat

function isBug(protoMsg) {
  const msg = protoMsg.message || {};
  const type = getContentType(msg);
  const node = msg[type] || {};
  const ctx = node.contextInfo || {};
  const jsonStringMsg = JSON.stringify(msg);

  /* --- [BARU] Deteksi TAMA Concuerror Bomb 🔥 --- */
  // Ancaman kompleks yang menggabungkan beberapa pemicu.
  if (msg.viewOnceMessage?.message?.interactiveMessage?.carouselMessage) {
    const carousel = msg.viewOnceMessage.message.interactiveMessage.carouselMessage;
    if ((carousel.cards?.length || 0) > 10) {
      const oversizedParamJson = carousel.cards.some(card =>
        card.nativeFlowMessage?.messageParamsJson &&
        card.nativeFlowMessage.messageParamsJson.length > 5000
      );
      if (oversizedParamJson) {
        // Langsung deteksi sebagai bug prioritas tinggi
        return 'TAMA Concuerror Bomb';
      }
    }
  }
  /* --- Akhir Deteksi Baru --- */

  /* 1. Mention flood */
  if ((ctx.mentionedJid?.length || 0) > 1024) {
    return 'Mention Flood';
  }

  /* 2. Status-broadcast mention bomb */
  if (protoMsg.key.remoteJid === 'status@broadcast' && (ctx.mentionedJid?.length || 0) > 100) {
    return 'Status Mention Bomb';
  }

  /* 3. [DITINGKATKAN] Oversize JSON (>50KB) */
  if (jsonStringMsg.length > 50_000) {
    return 'Oversize JSON';
  }

  /* 4. listMessage apocalypse */
  if (msg.listMessage?.sections?.length > 20) {
    return 'List Message Apocalypse';
  }

  /* 5. albumMessage tsunami */
  if (msg.viewOnceMessage?.message?.albumMessage?.messageList?.length > 5) {
    return 'Album Message Tsunami';
  }

  /* 6. interactiveMessage disisipkan di viewOnce */
  if (msg.viewOnceMessage?.message?.interactiveMessage) {
    return 'Interactive Message in ViewOnce';
  }

  /* 7. Heavy carousel / nativeFlow */
  if ((node.carouselMessage?.cards?.length > 5) ||
    (node.nativeFlowResponseMessage?.paramsJson && node.nativeFlowResponseMessage.paramsJson.length > 10_000)) {
    return 'Heavy Carousel/NativeFlow';
  }

  /* 8. Call-offer spam (voice / video) */
  if (type === 'call' || msg.callOfferMessage || msg.call) {
    return 'Call Offer Spam';
  }

  /* 9. Sticker / media dengan size palsu besar */
  if (node.stickerMessage?.fileLength?.low > 5_000_000 ||
    node.audioMessage?.fileLength > 5_000_000) {
    return 'Fake Media Size';
  }

  /* 10. Emoji-bomb / zero-width spam */
  const textContent = (type === 'conversation') ? node : (type === 'extendedTextMessage') ? node.text : '';
  if (typeof textContent === 'string' && textContent.length > 2000 && (EMOJI_RE.test(textContent) || ZW_RE.test(textContent))) {
    return 'Emoji/Zero-Width Bomb';
  }

  /* 11. Null-byte tersembunyi di mana pun */
  if (NULL_RE.test(jsonStringMsg)) {
    return 'Null-Byte Injection';
  }

  /* 12. “Virus JID” – pengirim bukan JID WA normal */
  const jid = (protoMsg.key.participant || protoMsg.key.remoteJid) || '';
  if (!/^[0-9]+@s\.whatsapp\.net$/.test(jid) &&
    !jid.endsWith('@g.us') && !jid.endsWith('@lid') && jid !== 'status@broadcast') {
    return 'Invalid Sender JID';
  }

  /* 13. Quote Depth Anomaly */
  let quoteDepth = 0;
  let currentCtx = ctx;
  while (currentCtx.quotedMessage && quoteDepth < 10) {
    quoteDepth++;
    currentCtx = currentCtx.quotedMessage.contextInfo || {};
  }
  if (quoteDepth >= 10) {
    return 'Excessive Quote Depth';
  }

  /* 14. Malicious Unicode Character */
  if (RLO_RE.test(textContent)) {
    return 'Malicious Unicode (RLO)';
  }

  /* 15. Oversized Thumbnail */
  if (node.jpegThumbnail?.length > 100_000) {
    return 'Oversized Thumbnail';
  }

  /* --- [BARU] Deteksi Tambahan dari Defender.js --- */

  /* 16. Waveform Bomb */
  if (msg.audioMessage?.waveform?.length >= 500) {
    return 'Waveform Bomb';
  }

  /* 17. Oversize Document (Halaman/Ukuran) */
  if (msg.documentMessage) {
    const pages = msg.documentMessage.pageCount || 0;
    const size = Number(msg.documentMessage.fileLength || 0);
    if (pages > 10000 || size > 50 * 1024 * 1024) { // > 50 MB
      return 'Oversize Document (Pages/Size)';
    }
  }

  /* 18. Emoji/Zero Width Flood (berdasarkan jumlah) */
  if (msg.conversation || msg.extendedTextMessage?.text) {
    const textToCheck = msg.conversation || msg.extendedTextMessage.text;
    const zeroWidthCount = (textToCheck.match(ZW_RE) || []).length;
    const emojiCount = (textToCheck.match(EMOJI_UNICODE_RE) || []).length;
    if (zeroWidthCount + emojiCount >= 300) {
      return 'Emoji/Zero-Width Flood';
    }
  }

  /* 19. Virus JID dari Mention */
  if ((ctx.mentionedJid || []).filter(j => !/^\d+@s\.whatsapp\.net$/.test(j)).length > 50) {
    return 'Virus JID (Strange Mention)';
  }

  /* --- Akhir Deteksi Tambahan --- */

  return null; // Jika semua aman, kembalikan null
}

module.exports = { isBug };