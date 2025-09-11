const { getContentType } = require('baileys');

const EMOJI_RE = /[\u{1F000}-\u{1FAFF}]/u;
const ZW_RE = /[\u200B-\u200D\u2060\u3164]/;
const NULL_RE = /\u0000/;
const RLO_RE = /\u202E/;
const EMOJI_UNICODE_RE = /\p{Emoji}/u;

function isBug(protoMsg) {
  const msg = protoMsg.message || {};
  const type = getContentType(msg);
  const node = msg[type] || {};
  const ctx = node.contextInfo || {};
  const jsonStringMsg = JSON.stringify(msg);

  if (msg.viewOnceMessage?.message?.interactiveMessage?.carouselMessage) {
    const carousel = msg.viewOnceMessage.message.interactiveMessage.carouselMessage;
    if ((carousel.cards?.length || 0) > 10) {
      const oversizedParamJson = carousel.cards.some(card =>
        card.nativeFlowMessage?.messageParamsJson &&
        card.nativeFlowMessage.messageParamsJson.length > 8000
      );
      if (oversizedParamJson) {
        return 'TAMA Concuerror Bomb';
      }
    }
  }
  if ((ctx.mentionedJid?.length || 0) > 1024) {
    return 'Mention Flood';
  }
  if (protoMsg.key.remoteJid === 'status@broadcast' && (ctx.mentionedJid?.length || 0) > 100) {
    return 'Status Mention Bomb';
  }
  if (jsonStringMsg.length > 100_000) {
    return 'Oversize JSON';
  }
  if (msg.listMessage?.sections?.length > 20) {
    return 'List Message Apocalypse';
  }
  if (msg.viewOnceMessage?.message?.albumMessage?.messageList?.length > 5) {
    return 'Album Message Tsunami';
  }
  if (msg.viewOnceMessage?.message?.interactiveMessage) {
    return 'Interactive Message in ViewOnce';
  }
  if ((node.carouselMessage?.cards?.length > 5) ||
    (node.nativeFlowResponseMessage?.paramsJson && node.nativeFlowResponseMessage.paramsJson.length > 10_000)) {
    return 'Heavy Carousel/NativeFlow';
  }
  if (type === 'call' || msg.callOfferMessage || msg.call) {
    return 'Call Offer Spam';
  }
  if (node.stickerMessage?.fileLength?.low > 5_000_000 ||
    node.audioMessage?.fileLength > 5_000_000) {
    return 'Fake Media Size';
  }
  const textContent = (type === 'conversation') ? node : (type === 'extendedTextMessage') ? node.text : '';
  if (typeof textContent === 'string' && textContent.length > 8000 && (EMOJI_RE.test(textContent) || ZW_RE.test(textContent))) {
    return 'Emoji/Zero-Width Bomb';
  }
  if (NULL_RE.test(jsonStringMsg)) {
    return 'Null-Byte Injection';
  }
  const jid = (protoMsg.key.participant || protoMsg.key.participantAlt || protoMsg.key.remoteJid || protoMsg.key.remoteJidAlt) || '';
  if (!/^[0-9]+@s\.whatsapp\.net$/.test(jid) &&
    !jid.endsWith('@g.us') && !jid.endsWith('@lid') && jid !== 'status@broadcast') {
    return 'Invalid Sender';
  }
  let quoteDepth = 0;
  let currentCtx = ctx;
  while (currentCtx.quotedMessage && quoteDepth < 10) {
    quoteDepth++;
    currentCtx = currentCtx.quotedMessage.contextInfo || {};
  }
  if (quoteDepth >= 10) {
    return 'Excessive Quote Depth';
  }
  if (RLO_RE.test(textContent)) {
    return 'Malicious Unicode (RLO)';
  }
  if (node.jpegThumbnail?.length > 100_000) {
    return 'Oversized Thumbnail';
  }
  if (msg.audioMessage?.waveform?.length >= 500) {
    return 'Waveform Bomb';
  }
  if (msg.documentMessage) {
    const pages = msg.documentMessage.pageCount || 0;
    const size = Number(msg.documentMessage.fileLength || 0);
    if (pages > 10000 || size > 50 * 1024 * 1024) {
      return 'Oversize Document (Pages/Size)';
    }
  }
  if (msg.conversation || msg.extendedTextMessage?.text) {
    const textToCheck = msg.conversation || msg.extendedTextMessage.text;
    const zeroWidthCount = (textToCheck.match(ZW_RE) || []).length;
    const emojiCount = (textToCheck.match(EMOJI_UNICODE_RE) || []).length;
    if (zeroWidthCount + emojiCount >= 300) {
      return 'Emoji/Zero-Width Flood';
    }
  }
  if ((ctx.mentionedJid || []).filter(j => !/^\d+@s\.whatsapp\.net$/.test(j)).length > 50) {
    return 'Virus JID (Strange Mention)';
  }
  return null;
}

module.exports = { isBug };