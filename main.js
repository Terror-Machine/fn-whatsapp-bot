require('dotenv').config();

const util = require('util');
const process = require('process');

const logTime         = () => new Date().toLocaleTimeString('id-ID');
const originalLog     = console.log.bind(console);
const originalError   = console.error.bind(console);
const blockedKeywords = [
  "Closing session:",
  "Closing open session in favor of incoming prekey bundle",
  "Decrypted message with closed session.",
  "Failed to decrypt message with any known session...",
  "Migrating session to:",
  "Opening session:",
  "Removing old closed session:",
  "Session already closed",
  "Session already open",
  "V1 session storage migration error:"
];

async function log(message, error = false) {
  const text = typeof message === 'string' ? message : util.inspect(message, { depth: 1 });
  if (blockedKeywords.some(keyword => text.includes(keyword))) return;
  if (error) {
    originalError('📝', logTime(), text);
    const stack = new Error().stack?.split('\n').slice(2).join('\n');
    if (stack) process.stderr.write(stack + '\n');
  } else {
    originalLog('📝', logTime(), text);
  }
};

console.log = (...args) => log(args.map(a => util.inspect(a, { depth: 1 })).join(' '));
console.info = (...args) => log(args.map(a => util.inspect(a, { depth: 1 })).join(' '));
console.warn = (...args) => log(args.map(a => util.inspect(a, { depth: 1 })).join(' '), true);
console.error = (...args) => log(args.map(a => util.inspect(a, { depth: 1 })).join(' '), true);

const spawn = require('child_process').spawn;
const exec = util.promisify(require('child_process').exec);
const isPm2 = process.env.pm_id !== undefined || process.env.NODE_APP_INSTANCE !== undefined;
const isSelfRestarted = process.env.RESTARTED_BY_SELF === '1';
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY_MS = 5000;

function logRestartInfo() {log(`Mode Jalankan: ${isPm2 ? 'PM2' : 'Manual'} | RestartedBySelf: ${isSelfRestarted}`)};
logRestartInfo();

process.on('uncaughtException', async (err) => {
  await log(`[uncaughtException] \n\n${err}`, true);
  await handleRestart('Uncaught Exception');
});
process.on('unhandledRejection', async (reason) => {
  await log(`[unhandledRejection] \n\n${reason}`, true);
  await handleRestart('Unhandled Rejection');
});

class EarlyExitSuccess extends Error {
  constructor(message) {
    super(message);
    this.name = "EarlyExitSuccess";
  }
};
class CrotToLive extends Map {
  set(key, value, ttl) {
    super.set(key, value);
    setTimeout(() => this.delete(key), ttl);
  }
}

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info ────────────────────────────────

const os = require('os');
const pukimaki = 'fnbots';
const pino = require('pino');
const path = require('path');
const dayjs = require('dayjs');
const fs = require('fs-extra');
const axios = require('axios');
const sharp = require('sharp');
const Fuse = require('fuse.js');
const Websocket = require("ws");
const sudoku = require('sudoku');
const bdr = require('rumus-bdr');
const crypto = require('crypto');
const cron = require('node-cron');
const Math_js = require('mathjs');
const cheerio = require('cheerio');
const mime = require("mime-types");
const { OpenAI } = require('openai');
const webp = require('node-webpmux');
const readline = require('readline');
const FormData = require('form-data');
const FileType = require('file-type');
const { Chess } = require('chess.js');
const { Boom } = require('@hapi/boom');
const translatte = require('translatte');
const ttsId = require('node-gtts')('id');
const qrcode = require("qrcode-terminal");
const speedTest = require('speedtest-net');
const { EventEmitter } = require('events');
const sizeOf = require('image-size').default;
const ffmpeg = require('@ts-ffmpeg/fluent-ffmpeg');
const { Downloader } = require('@tobyg74/tiktok-api-dl');
const { parsePhoneNumber } = require('awesome-phonenumber');
const { letterTrans, wordTrans } = require('custom-translate');
const { createCanvas, loadImage, registerFont } = require('canvas');
const { SpotifyDownloader, YoutubeDownloader } = require('yt-spotify-dl');
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require('@google/generative-ai');
const { generateTTP, attpBlinkGenerate, attpGradientGenerate, attpWalkingGenerate } = require('attp-generator');
const { generateQuote, generateMeme, generateFakeStory, generateFakeTweet, generateFakeChatIphone } = require('generator-fake');
const { QuoteGenerator, bratGenerator, bratVidGenerator, generateAnimatedBratVid, randomChoice } = require('qc-generator-whatsapp');
const { default: HyHy, generateWAMessage, useMultiFileAuthState, jidNormalizedUser, extractMessageContent, generateWAMessageFromContent,
  downloadContentFromMessage, jidDecode, jidEncode, getDevice, areJidsSameUser, Browsers, makeCacheableSignalKeyStore, WAMessageStubType,
  getBinaryNodeChildString, getBinaryNodeChildren, getBinaryNodeChild, isJidBroadcast, fetchLatestBaileysVersion, proto, isLidUser, delay
} = require("baileys");

registerFont('./src/fonts/Noto-Bold.ttf', { family: 'Noto', weight: 'bold' });
registerFont('./src/fonts/SF-Pro-Display-Medium.otf', { family: 'SF Pro' });
registerFont('./src/fonts/oldengl.ttf', { family: 'Old English Text MT' });
registerFont('./src/fonts/LicensePlate.ttf', { family: 'License Plate' });
registerFont('./src/fonts/Noto-Regular.ttf', { family: 'Noto' });

const pairingCode = process.argv.includes('--qr') ? false : process.argv.includes('--pairing-code') || process.env.PAIRING_CODE === 'true';
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
let pairingStarted = false;
let phoneNumber;

const { isBug } = require('./src/utils/security');
const ObfsMgr = require('./src/utils/obfuscator');
const { instagram } = require('./src/utils/igdl');
const generateCard = require('./src/utils/katepe');
const FileProcessor = require('./src/utils/beautify');
const { screenshotWeb } = require('./src/utils/screenshots.js');

const utc = require('dayjs/plugin/utc');
const duration = require('dayjs/plugin/duration');
const timezone = require('dayjs/plugin/timezone');
const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(localizedFormat);

global.tmpDir                   = './src/sampah';
global.ytDlpPath                = './venv/bin/yt-dlp';
global.randomSuffix             = randomByte(16);
global.filename                 = path.join(global.tmpDir, `input-${global.randomSuffix}.mp3`);
global.sendFile                 = path.join(global.tmpDir, `output-${global.randomSuffix}.mp3`);

let version;
let hfapi                       = randomChoice(JSON.parse(process.env.HUGGINGFACE_API_KEY));
let gemini                      = randomChoice(JSON.parse(process.env.GEMINI_API_KEY));
let openwather                  = process.env.OPENWEATHER_API_KEY;
let ownerNumber                 = JSON.parse(process.env.OWNER_NUMBER);
let spotify                     = new SpotifyDownloader();
let youtubeDownloader           = new YoutubeDownloader();
let obfuscator                  = new ObfsMgr();
let validCommands               = new Set();
let stickerspam                 = new Set();
let activeGame                  = new Set();
let recentcmd                   = new Set();
let fspamm                      = new Set();
let sban                        = new Set();
let stp                         = new Set();
let debounceTimers              = {};
let fileHashes                  = {};
let store                       = {};
let tebaklirik                  = {};
let tekateki                    = {};
let tebakkata                   = {};
let susunkata                   = {};
let tebakkimia                  = {};
let tebaknegara                 = {};
let tebakgambar                 = {};
let caklontong                  = {};
let sudokuGame                  = {};
let family100                   = {};
let hangman                     = {};
let chatBots                    = {};
let sessions                    = {};
let chessGame                   = {};
let othelloGame                 = {};
let tebakbendera                = {};
let ludoSessions                = {};
let game41Sessions              = {};
let gamematematika              = {};
let werewolfSessions            = {};
let minesweeperSessions         = {};
let ularTanggaSessions          = {};
let tictactoeSessions           = {};
let samgongSessions             = {};
let mygroupMembers              = {};
let tebakkalimat                = {};
let siapakahaku                 = {};
let ulartangga                  = {};
let tebakgame                   = {};
let otpSessions                 = {};
let mygroup                     = [];
let yts                         = [];
let chainingCommands            = [];
let timeStart                   = Date.now() / 1000;
let groupAfkCooldowns           = new Map();
let helphitungan                = new Map();
let helppremium                 = new Map();
let helpconvert                 = new Map();
let helpmanage                  = new Map();
let helpmaster                  = new Map();
let helpngaji                   = new Map();
let helpowner                   = new Map();
let helpmedia                   = new Map();
let helpgame0                   = new Map();
let helpgame1                   = new Map();
let helpgame2                   = new Map();
let helpgame3                   = new Map();
let helpimage                   = new Map();
let helpaudio                   = new Map();
let helpanime                   = new Map();
let helputil                    = new Map();
let helptext                    = new Map();
let helplist                    = new Map();
let helpbot                     = new Map();
let helpvip                     = new Map();
let helpfun                     = new Map();
let helpai                      = new Map();
let duplexM                     = new CrotToLive();
let ctype                       = "";
let counter                     = 0;
let debugs                      = false;
let suggested                   = false;
let disableWatcher              = false;
let interactiveHandled          = false;
let storeDirty                  = false;
let _checkVIP                   = false;
let _checkPremium               = false;
let _latestMessage              = null;
let _latestMessages             = null;
let _namaJSON                   = `./database/db/${pukimaki}.store.json`;
let SESSION_TIMEOUT             = 5 * 60 * 1000;
let GROUP_COOLDOWN_MS           = 5 * 60 * 1000;
let OTP_VALIDITY_MS             = 5 * 60 * 1000;
let MAX_ATTEMPTS                = 4;

let helpMap = {
  master: helpmaster,
  owner: helpowner,
  vip: helpvip,
  premium: helppremium,
  manage: helpmanage,
  media: helpmedia,
  haudio: helpaudio,
  htext: helptext,
  himage: helpimage,
  hgame: helpgame0,
  stateless: helpgame1,
  stateful: helpgame2,
  pvpgame: helpgame3,
  list: helplist,
  hitung: helphitungan,
  ai: helpai,
  anime: helpanime,
  convert: helpconvert,
  util: helputil,
  fun: helpfun,
  ngaji: helpngaji,
  hbot: helpbot
};
let helpLists = [
  helpmaster, helpowner, helpvip, helppremium, helpmanage,
  helpmedia, helpaudio, helptext, helpimage, helpgame0,
  helpgame1, helpgame2, helpgame3, helplist, helphitungan,
  helpai, helpanime, helpconvert, helputil, helpfun,
  helpngaji, helpbot
];
let safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];
let defaultDatabaseStructures = {
  'afk': [],
  'audio': { "audio": {} },
  'bacot': { "bacot": [] },
  'chat': { "chat": {} },
  'contact': { "contact": {} },
  'count': { "hitcount": [] },
  'filter': { "filter": [] },
  'groups': {
    "welcome": [],
    "leave": [],
    "antitagStory": [],
    "antiHidetag": [],
    "antilink": [],
    "warning": {},
    "verifyMember": []
  },
  'image': { "image": {} },
  'levels': [],
  'limit': { "limit": [] },
  'limitgame': { "limitgame": [] },
  'master': { "master": [] },
  'muted': {
    "muteuser": [],
    "mutechat": [],
    "blockedUser": []
  },
  'premium': [],
  'sticker': { "sticker": {} },
  'vip': [],
  'whitelist': { "whitelist": [] },
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info ────────────────────────────────

function replacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString() + 'n';
  };
  return value;
};
function reviver(key, value) {
  if (typeof value === 'string' && /^-?\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  };
  return value;
};
function createDefaultComs(validCommandsSet) {
  const newComs = {};
  const sortedCommands = [...validCommandsSet].sort();
  for (const commandName of sortedCommands) {
    newComs[commandName] = {
      coms: commandName,
      count: 0,
      description: "belum terdefinisikan..."
    };
  }
  return newComs;
};
async function getValidCommandsFromCode(handlerPath) {
  try {
    const codeAsString = await fs.readFile(handlerPath, 'utf-8');
    const commandRegex = /get(Coms|Prefix)\(txt, '([^']+)'\)/g
    let match;
    while ((match = commandRegex.exec(codeAsString)) !== null) {
      validCommands.add(match[2]);
    }
  } catch {
    return new Set();
  }
};
async function cachingCommands() {
  try {
    const codeAsString = await fs.readFile(path.resolve(__filename), 'utf-8');
    const lines = codeAsString.split('\n');
    const categoryRegex = /ctype\s*=\s*"([^"]+)"/;
    const commandRegex = /get(Coms|Prefix)\(txt, '([^']+)'\)/g;
    let currentCategory = '';
    for (const line of lines) {
      const categoryMatch = line.match(categoryRegex);
      if (categoryMatch) {
        currentCategory = categoryMatch[1];
      }
      let commandMatch;
      while ((commandMatch = commandRegex.exec(line)) !== null) {
        const commandName = commandMatch[2];
        if (helpMap[currentCategory]) {
          helpMap[currentCategory].set(commandName, commandName);
        }
      }
    }
  } catch (error) {
    log(`Error cachingCommands:\n${error}`, true);
  }
};

try {
  const dbPath = `./database/db/${pukimaki}.database.json`;
  const comsPath = `./database/coms/${pukimaki}.commands.json`;
  if (!fs.existsSync(dbPath)) {
    log(`Membuat database baru untuk ${pukimaki}...`);
    fs.copyFileSync('./database/db/db.json', dbPath);
  }
  if (!fs.existsSync(comsPath)) {
    log(`File 'coms' untuk ${pukimaki} tidak ditemukan. Membuat dan mengisi otomatis...`);
    const asu = createDefaultComs(validCommands);
    dumpFileImmediate('commands', asu, 'coms');
    log(`Berhasil membuat commands.json baru untuk ${pukimaki} dengan ${Object.keys(asu).length} perintah.`);
  }
} catch (error) {
  log(`Gagal membuat file database atau command awal!\n${error}`, true);
  process.exit(1);
};

const _dbStore = {
  async read() {
    let data;
    try {
      if (fs.existsSync(_namaJSON)) {
        try {
          const raw = await fs.readFile(_namaJSON, 'utf-8');
          data = JSON.parse(raw, reviver);
        } catch {
          await log(`File utama ${_namaJSON} rusak, mencoba pulihkan dari backup...`);
          if (fs.existsSync(_namaJSON + '.bak')) {
            const rawBak = await fs.readFile(_namaJSON + '.bak', 'utf-8');
            data = JSON.parse(rawBak, reviver);
            await fs.writeFile(_namaJSON, JSON.stringify(data, replacer, 2), 'utf-8');
          } else {
            await log(`Backup tidak ditemukan. Membuat file baru.`);
            data = {};
            await fs.writeFile(_namaJSON, JSON.stringify(data, replacer, 2), 'utf-8');
          }
        }
      } else {
        await log(`File store tidak ditemukan, membuat baru.`);
        data = {};
        await fs.writeFile(_namaJSON, JSON.stringify(data, replacer, 2), 'utf-8');
      }
    } catch (error) {
      await log(`Gagal memuat store:\n${error}`, true);
      data = {};
    }
    return data;
  },
  async write(data, force = false) {
    try {
      const jsonString = JSON.stringify(data, replacer, 2);
      const currentHash = crypto.createHash('md5').update(jsonString).digest('hex');
      if (!force && fileHashes[_namaJSON] === currentHash) return;
      try {
        const oldData = await fs.readFile(_namaJSON, 'utf-8');
        JSON.parse(oldData);
        await fs.copyFile(_namaJSON, _namaJSON + '.bak');
      } catch {
        await log(`Skip backup. File utama kemungkinan corrupt.`);
      }
      await fs.writeFile(_namaJSON, jsonString, 'utf-8');
      fileHashes[_namaJSON] = currentHash;
    } catch (error) {
      await log(`Gagal menulis data ke store:\n${error}`, true);
    }
  }
};

async function getBaileysVersion() {
  try {
    const { version } = await fetchLatestBaileysVersion();
    return version;
  } catch (error) {
    await log(`Failed to fetch Baileys version:\n${error}`, true);
    const { data } = await axios.get("https://raw.githubusercontent.com/wppconnect-team/wa-version/main/versions.json");
    const currentVersion = data.currentVersion;
    if (!currentVersion) throw new Error("Versi saat ini tidak ditemukan dalam data");
    const versionParts = currentVersion.split('.');
    if (versionParts.length < 3) throw new Error("Format versi tidak valid");
    const major = parseInt(versionParts[0]);
    const minor = parseInt(versionParts[1]);
    const build = parseInt(versionParts[2].split('-')[0]);
    if (isNaN(major) || isNaN(minor) || isNaN(build)) throw new Error("Komponen versi tidak valid");
    return [major, minor, build];
  }
};
async function scheduledStoreReset() {
  try {
    store = {
      ...store,
      presences: {},
      status: {},
      conversations: {},
      messages: {},
      groupMetadata: {},
    };
    storeDirty = true;
    await log(`Store berhasil di-reset (contacts dipertahankan).`);
  } catch (error) {
    await log(`Gagal reset store:\n${error}`, true);
  }
};

function pruneComs(currentComs, validCommandList) {
  const validCommandsSet = new Set(validCommandList);
  const cleanedComs = {};
  const deletedCommands = [];
  for (const commandName in currentComs) {
    if (validCommandsSet.has(commandName)) {
      cleanedComs[commandName] = currentComs[commandName];
    } else {
      deletedCommands.push(commandName);
    }
  }
  return { cleanedComs, deletedCount: deletedCommands.length, deletedCommands };
};
function runAutoPrune() {
  try {
    const handlerFilePath = path.resolve(__filename);
    const codeAsString = fs.readFileSync(handlerFilePath, 'utf-8');
    const commandRegex = /get(Coms|Prefix)\(txt, '([^']+)'\)/g
    const validCommands = new Set();
    let match;
    while ((match = commandRegex.exec(codeAsString)) !== null) {
      validCommands.add(match[2]);
    }
    let comsFromDb = loadFile('coms', 'commands');
    const cleaningResult = pruneComs(comsFromDb, [...validCommands]);
    if (cleaningResult.deletedCount > 0) {
      log(`Menemukan dan menghapus ${cleaningResult.deletedCount} perintah usang: ${cleaningResult.deletedCommands}`);
      dumpFileImmediate('commands', cleaningResult.cleanedComs, 'coms');
    }
    return cleaningResult.cleanedComs;
  } catch (error) {
    log(`Gagal menjalankan pembersihan otomatis:\n${error}`, true);
    return loadFile('coms', 'commands');
  }
};
function loadFile(dir, name) {
  const filePath = path.resolve(`./database/${dir}/${pukimaki}.${name}.json`);
  if (name === 'database' || name === 'commands') {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw, reviver);
    } catch (error) {
      log(`Error LoadFile:\n${error}`, true);
      handleRestart('Error LoadFile');
    }
  }
  const backupPath = filePath + '.bak';
  const defaultData = JSON.parse(JSON.stringify(defaultDatabaseStructures[name] || (Array.isArray(defaultDatabaseStructures[name]) ? [] : {})));
  let data = null;
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      data = JSON.parse(raw, reviver);
    } catch {
      if (fs.existsSync(backupPath)) {
        try {
          const rawBak = fs.readFileSync(backupPath, 'utf-8');
          data = JSON.parse(rawBak, reviver);
          fs.writeFileSync(filePath, JSON.stringify(data, replacer, 2), 'utf-8');
        } catch (error) {
          log(`File backup ${backupPath} juga rusak!\n${error}`, true);
        }
      }
    }
  } else if (fs.existsSync(backupPath)) {
    try {
      const rawBak = fs.readFileSync(backupPath, 'utf-8');
      data = JSON.parse(rawBak, reviver);
      fs.writeFileSync(filePath, JSON.stringify(data, replacer, 2), 'utf-8');
    } catch (error) {
      log(`Gagal membaca atau memulihkan dari file backup ${backupPath}:\n${error}`, true);
    }
  }
  if (data === null) {
    log(`File database '${name}' tidak ditemukan. Membuat file baru di: ${filePath}`);
    data = defaultData;
    try {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(data, replacer, 2), 'utf-8');
    } catch (error) {
      log(`Gagal membuat file database baru di ${filePath}:\n${error}`, true);
    }
  }
  if (Array.isArray(defaultData)) {
    return Array.isArray(data) ? data : defaultData;
  } else {
    return { ...defaultData, ...(data || {}) };
  }
};
function dumpFileImmediate(name, data, folder = 'db') {
  const filePath = path.resolve(`./database/${folder}/${pukimaki}.${name}.json`);
  safeWriteFileSync(filePath, data, name);
};
function dumpFile(name, data, folder = 'db') {
  const filePath = path.resolve(`./database/${folder}/${pukimaki}.${name}.json`);
  if (debounceTimers[filePath]) {
    clearTimeout(debounceTimers[filePath]);
  }
  debounceTimers[filePath] = setTimeout(async () => {
    try {
      await safeWriteFile(filePath, data, name);
    } catch (error) {
      await log(`Gagal menyimpan file '${name}' secara asynchronous:\n${error}`, true);
    } finally {
      delete debounceTimers[filePath];
    }
  }, 300);
};
function safeWriteFileSync(filePath, data, name) {
  try {
    const jsonStr = JSON.stringify(data, replacer, 2);
    const currentHash = crypto.createHash('md5').update(jsonStr).digest('hex');
    if (fileHashes[filePath] === currentHash) {
      log(`${filePath} tidak berubah, tidak disimpan.`);
      return;
    }
    if (name !== 'database' && name !== 'commands') {
      if (fs.existsSync(filePath)) {
        fs.copyFileSync(filePath, filePath + '.bak');
      }
    }
    fs.writeFileSync(filePath, jsonStr, 'utf-8');
    fileHashes[filePath] = currentHash;
  } catch (error) {
    log(`Gagal menulis file dengan aman ke ${filePath}:\n${error}`, true);
  }
};
async function safeWriteFile(filePath, data, name) {
  try {
    const jsonStr = JSON.stringify(data, replacer, 2);
    const currentHash = crypto.createHash('md5').update(jsonStr).digest('hex');
    if (fileHashes[filePath] === currentHash) return;
    if (name !== 'database' && name !== 'commands') {
      try {
        await fs.copyFile(filePath, filePath + '.bak');
      } catch (copyError) {
        if (copyError.code !== 'ENOENT') {
          throw copyError;
        }
      }
    }
    await fs.writeFile(filePath, jsonStr, 'utf-8');
    fileHashes[filePath] = currentHash;
  } catch (error) {
    await log(`Gagal menulis file dengan aman ke ${filePath}:\n${error}`, true);
  }
};

let coms          = runAutoPrune();
let dbSettings    = loadFile('db', 'database');
let dbMaster      = loadFile('db', 'master');
let dbImage       = loadFile('db', 'image');
let dbAudio       = loadFile('db', 'audio');
let dbContact     = loadFile('db', 'contact');
let dbChats       = loadFile('db', 'chat');
let dbStickers    = loadFile('db', 'sticker');
let dbBacots      = loadFile('db', 'bacot');
// ─── user databases ────────────────────────────────
let dbVIP         = loadFile('db', 'vip');
let dbPremium     = loadFile('db', 'premium');
let dbLimitGame   = loadFile('db', 'limitgame');
let dbLimits      = loadFile('db', 'limit');
let dbLevels      = loadFile('db', 'levels');
let dbCounts      = loadFile('db', 'count');
// ─── group databases ────────────────────────────────
let dbGroups      = loadFile('db', 'groups');
let dbMuted       = loadFile('db', 'muted');
let dbFilter      = loadFile('db', 'filter');
let dbWhitelist   = loadFile('db', 'whitelist');
let dbAFK         = loadFile('db', 'afk');

let dumpComs      = async () => dumpFile('commands', coms, 'coms');
let dumpSet       = async () => dumpFile('database', dbSettings);
let dumpMaster    = async () => dumpFile('master', dbMaster);
let dumpImage     = async () => dumpFile('image', dbImage);
let dumpAudio     = async () => dumpFile('audio', dbAudio);
let dumpContact   = async () => dumpFile('contact', dbContact);
let dumpChat      = async () => dumpFile('chat', dbChats);
let dumpSticker   = async () => dumpFile('sticker', dbStickers);
let dumpBacot     = async () => dumpFile('bacot', dbBacots);
// ─── users dumpers ────────────────────────────────
let dumpVIP       = async () => dumpFile('vip', dbVIP);
let dumpPrem      = async () => dumpFile('premium', dbPremium);
let dumpLimitGame = async () => dumpFile('limitgame', dbLimitGame);
let dumpLimit     = async () => dumpFile('limit', dbLimits);
let dumpLevels    = async () => dumpFile('levels', dbLevels);
let dumpCount     = async () => dumpFile('count', dbCounts);
// ─── groups dumpers ────────────────────────────────
let dumpGroupSet  = async () => dumpFile('groups', dbGroups);
let dumpMute      = async () => dumpFile('muted', dbMuted);
let dumpFilter    = async () => dumpFile('filter', dbFilter);
let dumpWhite     = async () => dumpFile('whitelist', dbWhitelist);
let dumpAfk       = async () => dumpFile('afk', dbAFK);

const watchedFiles = {
  coms:         { dir: 'coms',  name: 'commands', get: () => coms, set: val => { coms = val; } },
  dbSettings:   { dir: 'db',    name: 'database', get: () => dbSettings, set: val => { dbSettings = val; } },
  dbMaster:     { dir: 'db',    name: 'master', get: () => dbMaster, set: val => { dbMaster = val; } },
  dbImage:      { dir: 'db',    name: 'image', get: () => dbImage, set: val => { dbImage = val; } },
  dbAudio:      { dir: 'db',    name: 'audio', get: () => dbAudio, set: val => { dbAudio = val; } },
  dbContact:    { dir: 'db',    name: 'contact', get: () => dbContact, set: val => { dbContact = val; } },
  dbChats:      { dir: 'db',    name: 'chat', get: () => dbChats, set: val => { dbChats = val; } },
  dbStickers:   { dir: 'db',    name: 'sticker', get: () => dbStickers, set: val => { dbStickers = val; } },
  dbCounts:     { dir: 'db',    name: 'count', get: () => dbCounts, set: val => { dbCounts = val; } },
  dbMuted:      { dir: 'db',    name: 'muted', get: () => dbMuted, set: val => { dbMuted = val; } },
  dbGroups:     { dir: 'db',    name: 'groups', get: () => dbGroups, set: val => { dbGroups = val; } },
  dbBacots:     { dir: 'db',    name: 'bacot', get: () => dbBacots, set: val => { dbBacots = val; } },
  dbPremium:    { dir: 'db',    name: 'premium', get: () => dbPremium, set: val => { dbPremium = val; } },
  dbVIP:        { dir: 'db',    name: 'vip', get: () => dbVIP, set: val => { dbVIP = val; } },
  dbFilter:     { dir: 'db',    name: 'filter', get: () => dbFilter, set: val => { dbFilter = val; } },
  dbWhitelist:  { dir: 'db',    name: 'whitelist', get: () => dbWhitelist, set: val => { dbWhitelist = val; } },
  dbAFK:        { dir: 'db',    name: 'afk', get: () => dbAFK, set: val => { dbAFK = val; } },
};

const pinoLogger = pino({
  level: dbSettings.pinoLogger,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname',
      depthLimit: 10,
      maxExpandDepth: 10,
      showHidden: true
    }
  }
});

function watchFile(key) {
  const { dir, name, set } = watchedFiles[key];
  const filePath = path.resolve(`./database/${dir}/${pukimaki}.${name}.json`);
  try {
    fs.watchFile(filePath, { interval: 500 }, (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
        clearTimeout(debounceTimers[filePath]);
        debounceTimers[filePath] = setTimeout(() => {
          if (disableWatcher) return;
          try {
            const newData = loadFile(dir, name);
            set(newData);
          } catch (error) {
            log(`Error WatchFile LoadFile ${filePath}:\n${error}`, true);
          }
        }, 500);
      }
    });
  } catch (error) {
    log(`Error WatchFile ${filePath}:\n${error}`, true);
  }
};

Object.keys(watchedFiles).forEach(watchFile);

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info ────────────────────────────────

function clamp(v) {
  return Math.max(0, Math.min(255, v));
};
function wrapText(ctx, text, maxWidth) {
  return new Promise(resolve => {
    if (ctx.measureText(text).width < maxWidth) return resolve([text]);
    if (ctx.measureText('W').width > maxWidth) return resolve(null);
    const words = text.split(' ');
    const lines = [];
    let line = '';
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) {
          words[1] = `${temp.slice(-1)}${words[1]}`;
        } else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
        line += `${words.shift()} `;
      } else {
        lines.push(line.trim());
        line = '';
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return resolve(lines);
  })
};
function drawImageWithTint(ctx, image, color, x, y, width, height) {
  safeDraw(ctx, () => {
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.5;
    ctx.drawImage(image, x, y, width, height);
    ctx.fillRect(x, y, width, height);
  });
};
function applyPixelOperation(ctx, x, y, width, height, pixelFn) {
  const img = ctx.getImageData(x, y, width, height);
  const { data } = img;
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    const [nr, ng, nb, na] = pixelFn(r, g, b, a, i) || [r, g, b, a];
    data[i] = clamp(nr);
    data[i + 1] = clamp(ng);
    data[i + 2] = clamp(nb);
    data[i + 3] = clamp(na ?? a);
  }
  ctx.putImageData(img, x, y);
  return ctx;
};
function safeDraw(ctx, drawFn) {
  ctx.save();
  drawFn(ctx);
  ctx.restore();
};
function greyscale(ctx, x, y, width, height) {
  return applyPixelOperation(ctx, x, y, width, height, (r, g, b) => {
    const brightness = (0.34 * r) + (0.5 * g) + (0.16 * b);
    return [brightness, brightness, brightness];
  });
};
function contrast(ctx, x, y, width, height, contrastLevel = 100) {
  const factor = (259 * (contrastLevel + 255)) / (255 * (259 - contrastLevel));
  const intercept = 128 * (1 - factor);
  return applyPixelOperation(ctx, x, y, width, height, (r, g, b) => [
    (r * factor) + intercept,
    (g * factor) + intercept,
    (b * factor) + intercept
  ]);
};
function desaturate(ctx, level, x, y, width, height) {
  return applyPixelOperation(ctx, x, y, width, height, (r, g, b) => {
    const grey = (0.2125 * r) + (0.7154 * g) + (0.0721 * b);
    return [
      r + level * (grey - r),
      g + level * (grey - g),
      b + level * (grey - b)
    ];
  });
};
function distort(ctx, amplitude, x, y, width, height, strideLevel = 4) {
  const img = ctx.getImageData(x, y, width, height);
  const temp = ctx.getImageData(x, y, width, height);
  const stride = width * strideLevel;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const xs = Math.round(amplitude * Math.sin(2 * Math.PI * 3 * (j / height)));
      const ys = Math.round(amplitude * Math.cos(2 * Math.PI * 3 * (i / width)));
      const dest = (j * stride) + (i * strideLevel);
      const srcX = Math.max(0, Math.min(i + xs, width - 1));
      const srcY = Math.max(0, Math.min(j + ys, height - 1));
      const src = (srcY * stride) + (srcX * strideLevel);
      img.data[dest] = temp.data[src];
      img.data[dest + 1] = temp.data[src + 1];
      img.data[dest + 2] = temp.data[src + 2];
    }
  }
  ctx.putImageData(img, x, y);
  return ctx;
};
function fishEye(ctx, level, x, y, width, height) {
  const img = ctx.getImageData(x, y, width, height);
  const source = new Uint8ClampedArray(img.data);
  for (let i = 0; i < img.data.length; i += 4) {
    const sx = (i / 4) % img.width;
    const sy = Math.floor(i / 4 / img.width);
    const dx = Math.floor(img.width / 2) - sx;
    const dy = Math.floor(img.height / 2) - sy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const x2 = Math.round(img.width / 2 - dx * Math.sin(dist / (level * Math.PI) / 2));
    const y2 = Math.round(img.height / 2 - dy * Math.sin(dist / (level * Math.PI) / 2));
    const i2 = (y2 * img.width + x2) * 4;
    if (x2 >= 0 && x2 < img.width && y2 >= 0 && y2 < img.height) {
      img.data[i] = source[i2];
      img.data[i + 1] = source[i2 + 1];
      img.data[i + 2] = source[i2 + 2];
      img.data[i + 3] = source[i2 + 3];
    }
  }
  ctx.putImageData(img, x, y);
  return ctx;
};
async function prepareCanvas(buffer) {
  return loadImage(buffer).then(data => {
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    return { canvas, ctx, data };
  });
};
async function applyEffect(buffer, effectFn) {
  const { canvas, ctx, data } = await prepareCanvas(buffer);
  await effectFn(ctx, data.width, data.height);
  return canvas.toBuffer();
};
async function overlayImage(ctx, baseImagePath, data, position = 'center') {
  const base = await loadImage(await fs.readFile(baseImagePath));
  let x = 0, y = 0, width = base.width, height = base.height;
  const dataRatio = data.width / data.height;
  const baseRatio = base.width / base.height;
  if (baseRatio < dataRatio) {
    height = data.height;
    width = base.width * (height / base.height);
  } else {
    width = data.width;
    height = base.height * (width / base.width);
  }
  switch (position) {
    case 'center':
      x = (data.width - width) / 2;
      y = (data.height - height) / 2;
      break;
    case 'top-left':
      x = 0;
      y = 0;
      break;
    case 'bottom-left':
      x = 0;
      y = data.height - height;
      break;
    case 'bottom-right':
      x = data.width - width;
      y = data.height - height;
      break;
  }
  ctx.drawImage(base, x, y, width, height);
};

const deepfry = (buffer) => applyEffect(buffer, (ctx, w, h) => {
  desaturate(ctx, -20, 0, 0, w, h);
  contrast(ctx, 0, 0, w, h);
});
const glitch = (buffer) => applyEffect(buffer, (ctx, w, h) => {
  distort(ctx, 20, 0, 0, w, h, 5);
});
const mataikan = (buffer) => applyEffect(buffer, (ctx, w, h) => {
  fishEye(ctx, 15, 0, 0, w, h);
});
const mirror = (buffer) => applyEffect(buffer, (ctx, w, h) => {
  const type = randomChoice(['x', 'y', 'both']);
  safeDraw(ctx, () => {
    if (type === 'x') ctx.transform(-1, 0, 0, 1, w, 0);
    else if (type === 'y') ctx.transform(1, 0, 0, -1, 0, h);
    else ctx.transform(-1, 0, 0, -1, w, h);
    ctx.drawImage(ctx.canvas, 0, 0);
  });
});
const approved = (buffer) => applyEffect(buffer, async (ctx, w, h) => {
  await overlayImage(ctx, './src/image/approved.png', { width: w, height: h });
});
const rejected = (buffer) => applyEffect(buffer, async (ctx, w, h) => {
  await overlayImage(ctx, './src/image/rejected.png', { width: w, height: h });
});
const thuglife = (buffer) => applyEffect(buffer, async (ctx, w, h) => {
  greyscale(ctx, 0, 0, w, h);
  const base = await loadImage(await fs.readFile('./src/image/thug-life.png'));
  const ratio = base.width / base.height;
  const width = w / 2;
  const height = Math.round(width / ratio);
  ctx.drawImage(base, (w / 2) - (width / 2), h - height, width, height);
});
const tobecontinue = (buffer) => applyEffect(buffer, async (ctx, w, h) => {
  drawImageWithTint(ctx, ctx.canvas, '#704214', 0, 0, w, h);
  await overlayImage(ctx, './src/image/to-be-continued.png', { width: w, height: h }, 'bottom-left');
});
const subtitle = (buffer, text) => applyEffect(buffer, async (ctx, w, h) => {
  const fontSize = Math.round(h / 15);
  ctx.font = `${fontSize}px Noto`;
  ctx.fillStyle = 'yellow';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  const lines = await wrapText(ctx, text, w - 10);
  if (!lines) throw new Error('Not enough width to subtitle this image.');
  const startY = h - ((lines.length - 1) * fontSize) - (fontSize / 2) - ((lines.length - 1) * 10);
  lines.forEach((line, i) => {
    const y = startY + (i * fontSize) + (i * 10);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.max(1, Math.round(h / 100));
    ctx.strokeText(line, w / 2, y);
    ctx.fillText(line, w / 2, y);
  });
});
const burn = (text) => applyEffect('./src/image/spongebob-burn.png', async (ctx) => {
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'top';
  let fontSize = 35;
  ctx.font = `${fontSize}px Noto`;
  while (ctx.measureText(text).width > 400) {
    fontSize--;
    ctx.font = `${fontSize}px Noto`;
  }
  const lines = await wrapText(ctx, text, 180);
  ctx.fillText(lines.join('\n'), 55, 103);
});
const blur = async (buffer, kontol) => {
  try {
    const blurredImage = await sharp(buffer)
      .blur(parseInt(kontol))
      .toBuffer();
    return blurredImage;
  } catch (error) {
    throw new Error(`Error Blur:\n${error}`, true);
  }
};
const ghost = async (buffer) => {
  try {
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, data.width, data.height);
    ctx.globalAlpha = 0.25;
    ctx.drawImage(data, 0, 0);
    return canvas.toBuffer();
  } catch (error) {
    throw new Error(`Error ghost:\n${error}`, true);
  }
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info ────────────────────────────────

const localFilePrefix = 'local-file://';
const warna = ['white', 'teal', 'aqua', 'black', 'silver', 'gray', 'yellow', 'olive', 'lime', 'green', 'fuchsia', 'purple'];
const allCmds = helpLists.flatMap(helpList => [...helpList.values()]);
const fuseOptions = { includeScore: true, threshold: 0.25, minMatchCharLength: 2, distance: 25 };
const fuse = new Fuse(allCmds, fuseOptions);
const emoju = { "a": "🇦", "b": "🇧", "c": "🇨", "d": "🇩", "e": "🇪", "f": "🇫", "g": "🇬", "h": "🇭", "i": "🇮", "j": "🇯", "k": "🇰", "l": "🇱", "m": "🇲", "n": "🇳", "o": "🇴", "p": "🇵", "q": "🇶", "r": "🇷", "s": "🇸", "t": "🇹", "u": "🇺", "v": "🇻", "w": "🇼", "x": "🇽", "y": "🇾", "z": "🇿", "0": "0️⃣", "1": "1️⃣", "2": "2️⃣", "3": "3️⃣", "4": "4️⃣", "5": "5️⃣", "6": "6️⃣", "7": "7️⃣", "8": "8️⃣", "9": "9️⃣", "#": "#️⃣", "?": "❓", "!": "❗" };
const fancy = { "a": "𝔞", "b": "𝔟", "c": "𝔠", "d": "𝔡", "e": "𝔢", "f": "𝔣", "g": "𝔤", "h": "𝔥", "i": "𝔦", "j": "𝔧", "k": "𝔨", "l": "𝔩", "m": "𝔪", "n": "𝔫", "o": "𝔬", "p": "𝔭", "q": "𝔮", "r": "𝔯", "s": "𝔰", "t": "𝔱", "u": "𝔲", "v": "𝔳", "w": "𝔴", "x": "𝔵", "y": "𝔶", "z": "𝔷", "A": "𝔄", "B": "𝔅", "C": "ℭ", "D": "𝔇", "E": "𝔈", "F": "𝔉", "G": "𝔊", "H": "ℌ", "I": "ℑ", "J": "𝔍", "K": "𝔎", "L": "𝔏", "M": "𝔐", "N": "𝔑", "O": "𝔒", "P": "𝔓", "Q": "𝔔", "R": "ℜ", "S": "𝔖", "T": "𝔗", "U": "𝔘", "V": "𝔙", "W": "𝔚", "X": "𝔛", "Y": "𝔜", "Z": "ℨ", "1": "𝟙", "2": "ϩ", "3": "Ӡ", "4": "५", "5": "Ƽ", "6": "Ϭ", "7": "7", "8": "𝟠", "9": "९", "0": "⊘" };
const cursiv = { "a": "𝒶", "b": "𝒷", "c": "𝒸", "d": "𝒹", "e": "𝑒", "f": "𝒻", "g": "𝑔", "h": "𝒽", "i": "𝒾", "j": "𝒿", "k": "𝓀", "l": "𝓁", "m": "𝓂", "n": "𝓃", "o": "𝑜", "p": "𝓅", "q": "𝓆", "r": "𝓇", "s": "𝓈", "t": "𝓉", "u": "𝓊", "v": "𝓋", "w": "𝓌", "x": "𝓍", "y": "𝓎", "z": "𝓏", "A": "𝒜", "B": "𝐵", "C": "𝒞", "D": "𝒟", "E": "𝐸", "F": "𝐹", "G": "𝒢", "H": "𝐻", "I": "𝐼", "J": "𝒥", "K": "𝒦", "L": "𝐿", "M": "𝑀", "N": "𝒩", "O": "𝒪", "P": "𝒫", "Q": "𝒬", "R": "𝑅", "S": "𝒮", "T": "𝒯", "U": "𝒰", "V": "𝒱", "W": "𝒲", "X": "𝒳", "Y": "𝒴", "Z": "𝒵" };
const broni = { "hand": "hoof", "hands": "hooves", "foot": "hoof", "feet": "hooves", "ass": "flank", "asses": "flanks", "butt": "flank", "butts": "flanks", "anyone": "anypony", "cowboy": "cowpony", "cowboys": "cowponies", "cowgirl": "cowpony", "cowgirls": "cowponies", "person": "pony", "people": "ponies", "persons": "ponies", "hell": "hay", "heck": "hay", "nail": "hoof", "nails": "hooves", "arm": "hoof", "arms": "hooves", "brofist": "brohoof", "fist": "hoof", "fists": "hooves", "ladies": "mares", "lady": "mare", "gentlemen": "stallions", "gentleman": "stallion", "shit": "horseapples", "shits": "horseapples", "naysayer": "neigh-sayer", "naysayers": "neigh-sayers", "nay": "neigh", "noone": "nopony", "nobody": "nopony", "nobodies": "noponies", "fuck": "horseapples", "fucks": "horseapples", "fucking": "horseappling", "fucker": "horseappler", "fuckers": "horseapplers", "scaredy-cat": "scaredy-pony", "scaredy-cats": "scaredy-ponies", "single-handedly": "single-hoofedly", "singlehandedly": "singlehoofedly", "second-hand": "second-hoof", "secondhand": "secondhoof", "handed": "hoofed", "someone": "somepony", "somebody": "somepony", "somebodies": "someponies", "god": "Celestia", "world": "Ponyville", "fan": "brony", "fans": "bronies", "fap": "clop", "porn": "clopfic", "porno": "clopfic", "pornography": "clopfic", "empty-handed": "empty-hoofed", "emptyhanded": "emptyhoofed", "girlfriend": "fillyfriend", "girlfriends": "fillyfriends", "boyfriend": "coltfriend", "boyfriends": "coltfriends", "childhood": "fillyhood", "child": "filly", "children": "fillies", "kid": "filly", "kids": "fillies", "first-hand": "first-hoof", "firsthand": "firsthoof", "footsteps": "hoofsteps", "footstep": "hoofstep", "hair": "mane", "trolling": "paraspriting", "troll": "parasprite", "hater": "parasprite", "parasite": "parasprite", "mankind": "ponykind", "stalemate": "stalemare", "handjob": "hoofjob", "hand-job": "hoof-job", "gay": "coltcuddler", "gays": "coltcuddlers", "lesbian": "fillyfooler", "lesbians": "fillyfoolers", "adopt": "claim", "adoption": "claiming", "baby": "foal", "babies": "foals", "knuckle": "fetlock", "knuckles": "fetlocks", "girl": "filly", "girls": "fillies", "boy": "colt", "boys": "colts", "toddler": "yearling", "toddlers": "yearlings", "man": "stallion", "men": "stallions", "male": "stallion", "males": "stallions", "woman": "mare", "women": "mares", "female": "mare", "females": "mares", "teleport": "wink", "teleporting": "winking", "everybody": "everypony", "everyone": "everypony", "son": "colt", "sons": "colts", "daughter": "filly", "daughters": "fillies" };
const braille = { "a": "⠁", "b": "⠃", "c": "⠉", "d": "⠙", "e": "⠑", "f": "⠋", "g": "⠛", "h": "⠓", "i": "⠊", "j": "⠚", "k": "⠅", "l": "⠇", "m": "⠍", "n": "⠝", "o": "⠕", "p": "⠏", "q": "⠟", "r": "⠗", "s": "⠎", "t": "⠞", "u": "⠥", "v": "⠧", "w": "⠺", "x": "⠭", "y": "⠽", "z": "⠵", "A": "⠠⠁", "B": "⠠⠃", "C": "⠠⠉", "D": "⠠⠙", "E": "⠠⠑", "F": "⠠⠋", "G": "⠠⠛", "H": "⠠⠓", "I": "⠠⠊", "J": "⠠⠚", "K": "⠠⠅", "L": "⠠⠇", "M": "⠠⠍", "N": "⠠⠝", "O": "⠠⠕", "P": "⠠⠏", "Q": "⠠⠟", "R": "⠠⠗", "S": "⠠⠎", "T": "⠠⠞", "U": "⠠⠥", "V": "⠠⠧", "W": "⠠⠺", "X": "⠠⠭", "Y": "⠠⠽", "Z": "⠠⠵", "0": "⠼⠚", "1": "⠼⠁", "2": "⠼⠃", "3": "⠼⠉", "4": "⠼⠙", "5": "⠼⠑", "6": "⠼⠋", "7": "⠼⠛", "8": "⠼⠓", "9": "⠼⠊", ".": "⠲", ",": "⠂", "!": "⠖", "?": "⠦", "'": "⠄", "\"": "⠄⠶", ":": "⠒", ";": "⠆", "-": "⠤", "(": "⠐⠣", ")": "⠐⠜" };
const suuiper = { "a": "ᵃ", "b": "ᵇ", "c": "ᶜ", "d": "ᵈ", "e": "ᵉ", "f": "ᶠ", "g": "ᵍ", "h": "ʰ", "i": "ᶦ", "j": "ʲ", "k": "ᵏ", "l": "ˡ", "m": "ᵐ", "n": "ⁿ", "o": "ᵒ", "p": "ᵖ", "q": "ᑫ", "r": "ʳ", "s": "ˢ", "t": "ᵗ", "u": "ᵘ", "v": "ᵛ", "w": "ʷ", "x": "ˣ", "y": "ʸ", "z": "ᶻ", "A": "ᴬ", "B": "ᴮ", "C": "ᶜ", "D": "ᴰ", "E": "ᴱ", "F": "ᶠ", "G": "ᴳ", "H": "ᴴ", "I": "ᴵ", "J": "ᴶ", "K": "ᴷ", "L": "ᴸ", "M": "ᴹ", "N": "ᴺ", "O": "ᴼ", "P": "ᴾ", "R": "ᴿ", "S": "ˢ", "T": "ᵀ", "U": "ᵁ", "V": "ⱽ", "W": "ᵂ", "X": "ˣ", "Y": "ʸ", "Z": "ᶻ", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const zalgo = {
  "up": ["̍", "̎", "̄", "̅", "̿", "̑", "̆", "̐", "͒", "͗", "͑", "̇", "̈", "̊", "͂", "̓", "̈", "͊", "͋", "͌", "̃", "̂", "̌", "͐", "̀", "́", "̋", "̏", "̒", "̓", "̔", "̽", "̉", "ͣ", "ͤ", "ͥ", "ͦ", "ͧ", "ͨ", "ͩ", "ͪ", "ͫ", "ͬ", "ͭ", "ͮ", "ͯ", "̾", "͛", "͆", "̚"],
  "middle": ["̕", "̛", "̀", "́", "͘", "̡", "̢", "̧", "̨", "̴", "̵", "̶", "͜", "͝", "͞", "͟", "͠", "͢", "̸", "̷", "͡", "҉"],
  "down": ["̖", "̗", "̘", "̙", "̜", "̝", "̞", "̟", "̠", "̤", "̥", "̦", "̩", "̪", "̫", "̬", "̭", "̮", "̯", "̰", "̱", "̲", "̳", "̹", "̺", "̻", "̼", "ͅ", "͇", "͈", "͉", "͍", "͎", "͓", "͔", "͕", "͖", "͙", "͚", "̣"]
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info ────────────────────────────────

function cleanYoutubeUrl(url) {
  return url.replace(/(&|\?)list=[^&]*/i, '$1').replace(/(&|\?)index=[^&]*/i, '$1').replace(/[&?]$/, '');
}
function chunkArray(array, chunkSize) {
  const results = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }
  return results;
};
function bytesToSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
function parseImageSelection(selectionString, maxImages) {
  const indices = new Set();
  const parts = selectionString.split(',');
  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.trim().split('-').map(Number);
      if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start && start <= maxImages) {
        for (let i = start; i <= Math.min(end, maxImages); i++) {
          indices.add(i - 1);
        }
      }
    } else {
      const index = Number(part.trim());
      if (!isNaN(index) && index > 0 && index <= maxImages) {
        indices.add(index - 1);
      }
    }
  }
  return Array.from(indices).sort((a, b) => a - b);
};
function getServerIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
};
function color(text, color = 'green') {
  if (text === undefined || text === null) {
    return '';
  }
  if (typeof color === 'string' && color.startsWith('#')) {
    try {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `\x1b[38;2;${r};${g};${b}m${text}\x1b[0m`;
    } catch {
      return text;
    }
  }
  switch (color) {
    case 'red':
      return '\x1b[31m' + text + '\x1b[0m';
    case 'yellow':
      return '\x1b[33m' + text + '\x1b[0m';
    case 'blue':
      return '\x1b[34m' + text + '\x1b[0m';
    case 'magenta':
      return '\x1b[35m' + text + '\x1b[0m';
    case 'cyan':
      return '\x1b[36m' + text + '\x1b[0m';
    default:
      return '\x1b[32m' + text + '\x1b[0m';
  }
};
function waktu(seconds) {
  seconds = Number(seconds);
  var y = Math.floor(seconds % (60 * 60 * 24 * 30 * 12 * 256) / (60 * 60 * 24 * 30 * 12));
  var b = Math.floor(seconds % (60 * 60 * 24 * 30 * 12) / (60 * 60 * 24 * 30));
  var w = Math.floor(seconds % (60 * 60 * 24 * 7) / (60 * 60 * 24 * 7));
  var d = Math.floor(seconds % (60 * 60 * 24 * 30) / (60 * 60 * 24));
  var h = Math.floor(seconds % (60 * 60 * 24) / (60 * 60));
  var m = Math.floor(seconds % (60 * 60) / 60);
  var s = Math.floor(seconds % 60);
  var yDisplay = y > 0 ? y + (y == 1 ? " year, " : " years, ") : "";
  var bDisplay = b > 0 ? b + (b == 1 ? " month, " : " months, ") : "";
  var wDisplay = w > 0 ? w + (w == 1 ? " week, " : " weeks, ") : "";
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return yDisplay + bDisplay + wDisplay + dDisplay + hDisplay + mDisplay + sDisplay;
};
function formatDuration(durationStr) {
  const regex = /(\d+)(y|M|d|H|m|s)/g;
  let match;
  let years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
  while ((match = regex.exec(durationStr)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];
    if (unit === 'y') {
      years = value;
    } else if (unit === 'M') {
      months = value;
    } else if (unit === 'd') {
      days = value;
    } else if (unit === 'H') {
      hours = value;
    } else if (unit === 'm') {
      minutes = value;
    } else if (unit === 's') {
      seconds = value;
    }
  }
  return dayjs.duration({
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  });
};
function formatTimeAgo(timestamp) {
  if (!timestamp) return 'tidak diketahui';
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " tahun yang lalu";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " bulan yang lalu";
  }
  interval = seconds / 604800;
  if (interval > 1) {
    return Math.floor(interval) + " minggu yang lalu";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " hari yang lalu";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " jam yang lalu";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " menit yang lalu";
  }
  return Math.floor(seconds) + " detik yang lalu";
};
function formatTimestampToHourMinute(ts) {
  if (ts.toString().length === 13) ts = Math.floor(ts / 1000);
  let date = new Date(ts * 1000);
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}.${minutes}`;
};
function firstUpperCase(text, split = ' ') {
  return text.split(split).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
};
function formatNumber(number, minimumFractionDigits = 0) {
  if (typeof number === 'bigint') {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return Number.parseFloat(number).toLocaleString(undefined, {
      minimumFractionDigits,
      maximumFractionDigits: 2
    });
  }
};
function list(arr, conj = 'and') {
  const len = arr.length;
  if (len === 0) return '';
  if (len === 1) return arr[0];
  return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
};
function ulang(str, num) {
  return (new Array(num + 1)).join(str);
};
function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  })
};
function archimed(s, list) {
  const ln = list.length;
  const ls = new Set();
  for (let logic of s.split(',')) {
    if (logic.includes('>')) {
      const si = parseInt(logic.slice(1)) - 1;
      for (let i = si + 1; i < ln; i++) ls.add(i);
    } else if (logic.includes('<')) {
      const si = parseInt(logic.slice(1)) - 1;
      for (let i = 0; i <= si && i < ln; i++) ls.add(i);
    } else if (logic.includes('-')) {
      let [start, end] = logic.split('-').map(n => parseInt(n) - 1);
      for (let i = start; i <= end && i < ln; i++) ls.add(i);
    } else {
      const idx = parseInt(logic) - 1;
      if (idx >= 0 && idx < ln) ls.add(idx);
    }
  }
  return [...ls].map(i => list[i]);
};
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
function cleanupExpiredSessions() {
  const now = Date.now();
  let cleanedCount = 0;
  for (const jid in otpSessions) {
    if (now - otpSessions[jid].timestamp > OTP_VALIDITY_MS) {
      delete otpSessions[jid];
      cleanedCount++;
    }
  }
  if (cleanedCount > 0) {
    log(`Membersihkan ${cleanedCount} sesi OTP yang kedaluwarsa.`);
  }
};
async function parseNIK(nik) {
  try {
    const nikString = nik.toString();
    if (nikString.length !== 16) throw new Error('NIK tidak valid: Panjang NIK harus 16 digit.');
    const KODE_PROVINSI = nikString.slice(0, 2);
    const KODE_KABKOT = nikString.slice(0, 4);
    const KODE_KECAMATAN = nikString.slice(0, 6);
    const provincesRes = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/data/provinsi.json');
    const provinces = Object.fromEntries(provincesRes.data.map(p => [p.code, p.name.toUpperCase()]));
    if (!provinces[KODE_PROVINSI]) throw new Error('NIK tidak valid: Kode Provinsi tidak ditemukan.');
    const regenciesRes = await axios.get(`https://raw.githubusercontent.com/Terror-Machine/random/master/data/kabupaten.json`);
    const regencies = Object.fromEntries(regenciesRes.data.map(r => [r.full_code, r.name.toUpperCase()]));
    if (!regencies[KODE_KABKOT]) throw new Error('NIK tidak valid: Kode Kabupaten/Kota tidak ditemukan.');
    const districtsRes = await axios.get(`https://raw.githubusercontent.com/Terror-Machine/random/master/data/kecamatan.json`);
    const districts = Object.fromEntries(districtsRes.data.map(d => [d.full_code, d.name.toUpperCase()]));
    if (!districts[KODE_KECAMATAN]) throw new Error('NIK tidak valid: Kode Kecamatan tidak ditemukan.');
    const villagesRes = await axios.get(`https://raw.githubusercontent.com/Terror-Machine/random/master/data/kelurahan.json`);
    const daftarKelurahan = villagesRes.data
      .filter(village => village.full_code.startsWith(KODE_KECAMATAN))
      .map(village => ({
        nama: village.name.toUpperCase(),
        kodePos: village.pos_code
      }));
    let kelurahanTerpilih = null;
    if (daftarKelurahan.length > 0) {
      const randomIndex = Math.floor(Math.random() * daftarKelurahan.length);
      kelurahanTerpilih = daftarKelurahan[randomIndex];
    }
    let tanggalLahir = parseInt(nikString.slice(6, 8));
    const bulanLahirString = nikString.slice(8, 10);
    const bulanLahir = parseInt(bulanLahirString, 10);
    if (isNaN(bulanLahir) || bulanLahir < 1 || bulanLahir > 12) throw new Error(`NIK tidak valid`);
    const tahunLahirKode = nikString.slice(10, 12);
    const gender = tanggalLahir > 40 ? 'PEREMPUAN' : 'LAKI-LAKI';
    if (gender === 'PEREMPUAN') {
      tanggalLahir -= 40;
    }
    const abadSekarang = Math.floor(new Date().getFullYear() / 100);
    const tahunLahir = (parseInt(tahunLahirKode) > new Date().getFullYear() % 100) ? (abadSekarang - 1).toString() + tahunLahirKode : abadSekarang.toString() + tahunLahirKode;
    const tglLahirObj = new Date(tahunLahir, bulanLahir - 1, tanggalLahir);
    if (isNaN(tglLahirObj.getTime()) || tglLahirObj.getDate() !== tanggalLahir) throw new Error('NIK tidak valid: Tanggal lahir tidak valid.');
    const today = new Date();
    let usiaTahun = today.getFullYear() - tglLahirObj.getFullYear();
    let usiaBulan = today.getMonth() - tglLahirObj.getMonth();
    let usiaHari = today.getDate() - tglLahirObj.getDate();
    if (usiaHari < 0) {
      usiaBulan--;
      usiaHari += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (usiaBulan < 0) {
      usiaTahun--;
      usiaBulan += 12;
    }
    let hitungMundurTeks = '';
    const ultahBerikutnya = new Date(today.getFullYear(), bulanLahir - 1, tanggalLahir);
    if (ultahBerikutnya < today) {
      ultahBerikutnya.setFullYear(today.getFullYear() + 1);
    }
    if (ultahBerikutnya.toDateString() === today.toDateString()) {
      hitungMundurTeks = 'Selamat Ulang Tahun!';
    } else {
      const diff = ultahBerikutnya - today;
      const sisaHariTotal = Math.ceil(diff / (1000 * 60 * 60 * 24));
      const sisaBulan = Math.floor(sisaHariTotal / 30.44);
      const sisaHari = Math.floor(sisaHariTotal % 30.44);
      hitungMundurTeks = `${sisaBulan > 0 ? `${sisaBulan} Bulan ` : ''}${sisaHari > 0 ? `${sisaHari} Hari ` : ''}Lagi`.trim();
      if (!hitungMundurTeks) hitungMundurTeks = 'Besok!';
    }
    const pasaranNames = ['Pon', 'Wage', 'Kliwon', 'Legi', 'Pahing'];
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const diffDays = Math.floor((tglLahirObj - new Date('1900-01-01')) / (1000 * 60 * 60 * 24));
    const hariPasaran = pasaranNames[diffDays % 5];
    const hariLahir = dayNames[tglLahirObj.getDay()];
    const getZodiac = (day, month) => {
      const zodiacs = [
        { sign: 'Capricorn', start: [12, 22], end: [1, 19] }, { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
        { sign: 'Pisces', start: [2, 19], end: [3, 20] }, { sign: 'Aries', start: [3, 21], end: [4, 19] },
        { sign: 'Taurus', start: [4, 20], end: [5, 20] }, { sign: 'Gemini', start: [5, 21], end: [6, 21] },
        { sign: 'Cancer', start: [6, 22], end: [7, 22] }, { sign: 'Leo', start: [7, 23], end: [8, 22] },
        { sign: 'Virgo', start: [8, 23], end: [9, 22] }, { sign: 'Libra', start: [9, 23], end: [10, 23] },
        { sign: 'Scorpio', start: [10, 24], end: [11, 22] }, { sign: 'Sagittarius', start: [11, 23], end: [12, 21] }
      ];
      for (const z of zodiacs) {
        if ((month === z.start[0] && day >= z.start[1]) || (month === z.end[0] && day <= z.end[1])) return z.sign;
      }
    };
    const getGeneration = (year) => {
      if (year >= 2013) return 'Gen Alpha';
      if (year >= 1997) return 'Gen Z';
      if (year >= 1981) return 'Milenial';
      if (year >= 1965) return 'Gen X';
      if (year >= 1946) return 'Baby Boomer';
      return 'Generasi Terdahulu';
    };
    return {
      status: true,
      nik: nikString,
      jenisKelamin: gender,
      kelahiran: {
        tanggal: `${tanggalLahir.toString().padStart(2, '0')}-${bulanLahir.toString().padStart(2, '0')}-${tahunLahir}`,
        hari: `${hariLahir}, ${hariPasaran}`,
        zodiak: getZodiac(tanggalLahir, bulanLahir),
      },
      usia: {
        teks: `${usiaTahun} Tahun, ${usiaBulan} Bulan, ${usiaHari} Hari`,
        tahun: usiaTahun,
        kategori: usiaTahun < 17 ? 'Anak-anak/Remaja' : (usiaTahun < 65 ? 'Dewasa' : 'Lansia'),
        generasi: getGeneration(parseInt(tahunLahir)),
        ultah: hitungMundurTeks
      },
      lokasi: {
        provinsi: provinces[KODE_PROVINSI],
        kabupatenKota: regencies[KODE_KABKOT],
        kecamatan: districts[KODE_KECAMATAN],
        kelurahan: kelurahanTerpilih?.nama || 'Data Tidak Ditemukan',
        kodePos: kelurahanTerpilih?.kodePos || 'Tidak Ditemukan',
        kodeWilayah: `${KODE_PROVINSI}.${KODE_KABKOT.slice(2)}.${KODE_KECAMATAN.slice(4)}`
      },
    };
  } catch (error) {
    await log(`Error pada parseNIK:\n${error}`, true);
    return { status: false, nik: nik, error: error.message };
  }
};
async function jadwalSholat(kode_daerah) {
  try {
    const response = await axios.get('https://jadwalsholat.org/jadwal-sholat/daily.php?id=' + kode_daerah);
    const html = response.data;
    const $ = cheerio.load(html);
    let daerah = $('h1').text().trim();
    let bulan = $('h2').text().trim();
    const row = $('tr.table_light, tr.table_dark').find('td');
    const tanggal = $(row[0]).text().trim();
    const imsyak = $(row[1]).text().trim();
    const shubuh = $(row[2]).text().trim();
    const terbit = $(row[3]).text().trim();
    const dhuha = $(row[4]).text().trim();
    const dzuhur = $(row[5]).text().trim();
    const ashr = $(row[6]).text().trim();
    const maghrib = $(row[7]).text().trim();
    const isya = $(row[8]).text().trim();
    return {
      daerah,
      bulan,
      tanggal,
      imsyak,
      shubuh,
      terbit,
      dhuha,
      dzuhur,
      ashr,
      maghrib,
      isya
    };
  }
  catch (error) {
    await log(`Error jadwalSholat:\n${error}`, true);
    return {
      status: 'error',
      error: error.message
    };
  }
};
async function getZodiak(nama, tgl) {
  try {
    const url = `https://script.google.com/macros/exec?service=AKfycbw7gKzP-WYV2F5mc9RaR7yE3Ve1yN91Tjs91hp_jHSE02dSv9w&nama=${nama}&tanggal=${tgl}`;
    const response = await axios.get(url);
    const { lahir, usia, ultah, zodiak } = response.data.data;
    let text = `*Nama*: ${nama}\n`;
    text += `*Lahir*: ${lahir}\n`;
    text += `*Usia*: ${usia}\n`;
    text += `*Ultah*: ${ultah}\n`;
    text += `*Zodiak*: ${zodiak}`;
    return text;
  } catch (error) {
    await log(`Error getZodiak:\n${error}`, true);
    throw error;
  }
};
async function speedtest() {
  try {
    const result = await speedTest({ acceptLicense: true, acceptGdpr: true });
    const download = (result.download.bandwidth / 125000).toFixed(2);
    const upload = (result.upload.bandwidth / 125000).toFixed(2);
    return { download, upload, ping: result.ping.latency.toFixed(2) };
  } catch {
    return { download: 'N/A', upload: 'N/A', ping: 'N/A' };
  }
};
async function fetchJson(url, options = {}) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
      },
      ...options
    });
    return data;
  } catch (error) {
    await log(`Error fetchJson: ${url}.\n${error}`, true);
    throw error;
  }
};
async function deleteFile(path) {
  try {
    const fileExists = await fs.pathExists(path);
    if (fileExists) {
      await fs.unlink(path);
    }
  } catch (error) {
    await log(`Error deleteFile ${path}:\n${error}`, true);
  }
};
async function sendAndCleanupFile(fn, toId, localPath, m) {
  try {
    const ext = path.extname(localPath).toLowerCase();
    const stickerExtensions = new Set(['.gif', '.webp']);
    const mediaExtensions = new Set(['.png', '.jpg', '.jpeg', '.mp4']);
    if (stickerExtensions.has(ext)) {
      await fn.sendRawWebpAsSticker(toId, localPath, m, {
        packname: dbSettings.packName,
        author: dbSettings.packAuthor
      });
    } else if (mediaExtensions.has(ext)) {
      await fn.sendFilePath(toId, dbSettings.autocommand, localPath, { quoted: m });
    } else {
      await fn.sendReply(toId, `File generated at: ${localPath}`, { quoted: m });
    }
  } catch (error) {
    await log(`Error saat mengirim file hasil eval:\n${error}`, true);
    await fn.sendReply(toId, `Gagal mengirim file: ${error.message}`, { quoted: m });
  } finally {
    await deleteFile(localPath);
  }
};
async function loop(start, end, step, callback) {
  for (let i = start; i <= end; i += step) {
    await callback(i); await delay(200)
  }
};
async function saveFile(imageInput, prefix, toFile = "png") {
  let imageBuffer;
  if (typeof imageInput === 'string' && imageInput.startsWith('data:image')) {
    const base64Data = imageInput.split(';base64,').pop();
    imageBuffer = Buffer.from(base64Data, 'base64');
  } else if (Buffer.isBuffer(imageInput)) {
    imageBuffer = imageInput;
  } else {
    throw new Error('Input tidak valid. Harap berikan Buffer atau string Base64.');
  }
  const ext = toFile.toLowerCase() === "jpg" ? "jpg" : "png";
  const tmpPath = path.join(global.tmpDir, `${prefix}-${Date.now()}.${ext}`);
  if (ext === "jpg") {
    await sharp(imageBuffer).jpeg({ quality: 90, progressive: true, mozjpeg: true }).toFile(tmpPath);
  } else {
    await sharp(imageBuffer).png().toFile(tmpPath);
  }
  return tmpPath;
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info TTP ────────────────────────────

async function makeCircleSticker(buffer) {
  const img = await loadImage(buffer);
  const diameter = Math.min(img.width, img.height);
  const canvas = createCanvas(diameter, diameter);
  const ctx = canvas.getContext('2d');
  const sx = (img.width - diameter) / 2;
  const sy = (img.height - diameter) / 2;
  const radius = diameter / 2;
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, sx, sy, diameter, diameter, 0, 0, diameter, diameter);
  return canvas.toBuffer('image/png');
};
async function webpFormatter(buffer, formatFit) {
  return await sharp(buffer)
    .resize(512, 512, { 
      fit: formatFit 
    })
    .webp()
    .toBuffer()
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info Fake ──────────────────────

const colorNameMap = {
  'merah' : '#F44336',
  'pink'  : '#E91E63',
  'ungu'  : '#9C27B0',
  'biru'  : '#2196F3',
  'indigo': '#3F51B5',
  'toska' : '#009688',
  'hijau' : '#8BC34A',
  'kuning': '#FFEB3B',
  'oranye': '#FF9800',
  'putih' : '#FFFFFF',
  'hitam' : '#000000',
  'abu'   : '#424242'
};
function processAllTextFormatting(rawText, store, fn) {
  const combinedRegex = /@(\d{5,})|\*([^*]+)\*|_([^_]+)_|`([^`]+)`|\b((https?:\/\/|www\.)[^\s]+\/[^\s]*)/g;
  const matches = [];
  let match;
  while ((match = combinedRegex.exec(rawText)) !== null) {
    let type, originalText = match[0], replacementText;
    if (match[1]) {
      type = 'mention';
      const jid = match[1] + "@s.whatsapp.net";
      replacementText = "@" + (store.conversations[jid]?.name || fn.getName(jid) || "Unknown?");
    } else if (match[2]) {
      type = 'bold';
      replacementText = match[2];
    } else if (match[3]) {
      type = 'italic';
      replacementText = match[3];
    } else if (match[4]) {
      type = 'code';
      replacementText = match[4];
    } else if (match[5]) {
      type = 'code';
      replacementText = match[0];
    } else {
      continue;
    }
    matches.push({
      index: match.index,
      type: type,
      originalText: originalText,
      replacementText: replacementText,
    });
  }
  let finalCleanText = "";
  let allEntities = [];
  let lastIndex = 0;
  matches.forEach(m => {
    finalCleanText += rawText.substring(lastIndex, m.index);
    const entityStartOffset = finalCleanText.length;
    finalCleanText += m.replacementText;
    allEntities.push({
      type: m.type,
      offset: entityStartOffset,
      length: m.replacementText.length,
    });
    lastIndex = m.index + m.originalText.length;
  });
  finalCleanText += rawText.substring(lastIndex);
  return { text: finalCleanText, entities: allEntities };
};
function getContrastColor(hexColor) {
  if (!hexColor || typeof hexColor !== 'string') return '#FFFFFF';
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
  return luminance > 140 ? '#000000' : '#FFFFFF';
};
async function generateFakeChatWithQCGenerator(m, count, fn, store) {
  const jid = m.key.remoteJid;
  const chatData = store.conversations[jid];
  const sReply = (content, options = {}) => fn.sendReply(jid, content, { quoted: m, ...options });
  try {
    const filteredChats = chatData.array
      .filter(c => c.keyId !== m.key.id)
      .filter(c => !c.text.includes('sschat'));
    const selectedChats = filteredChats.slice(-count);
    if (selectedChats.length === 0) throw new Error("Tidak ada percakapan yang bisa diambil.");
    const defaultAvatar = null;
    const messages = [];
    const tempAvatars = [];
    for (let i = 0; i < selectedChats.length; i++) {
      await delay(1000);
      const msg = selectedChats[i];
      const senderJid = msg.sender;
      const senderName = store.conversations[senderJid]?.name || fn.getName(senderJid) || "Mukidi Slamet";
      let avatarBuffer;
      try {
        avatarBuffer = await fn.profilePictureUrl(senderJid, 'image');
      } catch {
        avatarBuffer = defaultAvatar;
      }
      tempAvatars.push(avatarBuffer);
      let { text: finalCleanText, entities: allEntities } = processAllTextFormatting(msg.text, store, fn);
      const messageObj = {
        entities: allEntities,
        avatar: true,
        from: {
          time: formatTimestampToHourMinute(msg.timestamp),
          number: "+" + senderJid.split('@')[0],
          id: senderJid.split('@')[0],
          photo: { buffer: avatarBuffer },
          name: senderName,
          first_name: senderName.split(' ')[0] || senderName
        },
        text: finalCleanText
      };
      if (msg.quoted) {
        const quotedSenderName = store.conversations[msg.quotedSender]?.name || fn.getName(msg.quotedSender) || "Yanto Baut";
        let { text: finalCleanQuotedText, entities: allQuotedEntities } = processAllTextFormatting(msg.quoted, store, fn);
        messageObj.replyMessage = {
          number: "+" + msg.quotedSender.split('@')[0],
          name: quotedSenderName,
          text: finalCleanQuotedText,
          chatId: msg.quotedSender.split('@')[0],
          entities: allQuotedEntities
        };
      }
      messages.push(messageObj);
    }
    const params = {
      width: 512,
      height: 768,
      type: 'image',
      format: 'png',
      backgroundColor: '#a8dffb',
      scale: 2,
      messages
    };
    const result = await QuoteGenerator(params);
    const finalImagePath = await saveFile(result.image, 'fake-chat', 'jpg');
    await fn.sendFilePath(jid, '', finalImagePath, { quoted: m });
    for (const tempAvatar of tempAvatars) {
      if (tempAvatar !== defaultAvatar) await deleteFile(tempAvatar);
    }
    await deleteFile(finalImagePath);
  } catch (error) {
    await log(`Error fakeConversation:\n${error}`, true);
    await sReply(error.message);
  }
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info ────────────────────────────────

function formatCommandList(commandCollection) {
  if (!commandCollection || commandCollection.size === 0) return '';
  const sortedCollection = [...commandCollection].sort();
  return sortedCollection.map(([commandName], i) => `\n${i + 1}. ${commandName}`).join('');
};
function randomByte(length = 32) {
  const chars = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};
function getMaintext(txt, word) {
  const command = coms[word]?.coms || word;
  let pattern = new RegExp(`^${command}\\s*`, 'i');
  if (pattern.test(txt)) {
    let args = txt.replace(pattern, '').trim();
    const splitChars = [';'];
    for (const char of splitChars) {
      if (args.includes(char)) {
        args = args.split(char)[0].trim();
        break;
      }
    }
    return args;
  }
  return '';
};
function mycmd(word) {
  if (word.includes(';')) {
    return word.split(/[;]+/).map(x => x.trim()).filter(Boolean);
  }
  return [word.trim()];
};
function getSession(jid) {
  if (!sessions[jid]) {
    try {
      const pythonPath = path.resolve('./venv/bin/python3');
      const pyScript = path.resolve('./src/utils/chat_bot.py');
      const py = spawn(pythonPath, [pyScript]);
      const sessionEmitter = new EventEmitter();
      sessionEmitter.setMaxListeners(2000);
      let stdoutBuffer = '';
      py.stdout.on('data', (data) => {
        stdoutBuffer += data.toString();
        if (stdoutBuffer.endsWith('\n')) {
          sessionEmitter.emit('message', stdoutBuffer.trim());
          stdoutBuffer = '';
        }
      });
      py.stderr.on('data', (data) => {
        sessionEmitter.emit('error_message', data.toString());
      });
      py.on('close', () => {
        clearTimeout(sessions[jid]?.timer);
        delete sessions[jid];
      });
      py.on('error', (error) => {
        log(`Gagal memulai/menjalankan proses Python untuk ${jid}:\n${error}`, true);
        clearTimeout(sessions[jid]?.timer);
        delete sessions[jid];
      });
      sessions[jid] = {
        py: py,
        emitter: sessionEmitter,
        timer: null
      };
    } catch (error) {
      log(`Error getSession untuk ${jid}:\n${error}`, true);
      return null;
    };
  };
  clearTimeout(sessions[jid].timer);
  sessions[jid].timer = setTimeout(() => {
    sessions[jid].py.kill();
  }, SESSION_TIMEOUT);
  return sessions[jid];
};
function msgs(a) {
  if (!a) return;
  return a.length >= 10 ? a.slice(0, 40) : a;
};
function isCount(id) {
  const user = dbCounts.hitcount.find(u => u.id === id);
  if (!user) {
    dbCounts.hitcount.push({ id, counts: 0 });
    dumpCount();
  };
  return false;
};
async function upComs(word, val) {
  if (Object.prototype.hasOwnProperty.call(coms, word)) {
    coms[word]["coms"] = val;
    await dumpComs();
  }
};
async function getComs(txt, word) {
  if (!Object.prototype.hasOwnProperty.call(coms, word)) {
    coms[word] = { coms: word, count: 0, description: "belum terdefinisikan..." };
    await dumpComs();
  }
  if (helpMap[ctype]) {
    helpMap[ctype].set(word, word); fuse.add(word);
  }
  const shouldRemove = txt === word || txt === coms[word].coms;
  if (txt === word || shouldRemove) {
    coms[word].count = (coms[word].count || 0) + 1;
    dbSettings.totalhitcount += 1;
    await dumpSet(); await dumpComs();
    return true;
  }
  return false;
};
async function getPrefix(txt, word) {
  txt = txt.trim();
  const firstWord = txt.split(/\s+/)[0];
  if (!Object.prototype.hasOwnProperty.call(coms, word)) {
    coms[word] = { coms: word, count: 0, description: "belum terdefinisikan..." };
    await dumpComs();
  }
  if (helpMap[ctype]) {
    helpMap[ctype].set(word, word); fuse.add(word);
  }
  const target = coms[word].coms;
  if (target === word) {
    const wordRegex = new RegExp(`^${target}\\b`);
    if (wordRegex.test(firstWord)) {
      coms[word].count = (coms[word].count || 0) + 1;
      dbSettings.totalhitcount += 1;
      await dumpSet(); await dumpComs();
      return true;
    }
  } else {
    const wordRegex = new RegExp(`^${word}\\b`);
    const targetRegex = new RegExp(`^${target}\\b`);
    if (wordRegex.test(firstWord) || targetRegex.test(firstWord)) {
      coms[word].count = (coms[word].count || 0) + 1;
      dbSettings.totalhitcount += 1;
      await dumpSet(); await dumpComs();
      return true;
    }
  }
  return false;
};
async function counthit(id) {
  const user = dbCounts.hitcount.find(u => u.id === id);
  if (user) {
    user.counts += 1;
    await dumpCount();
  };
};
async function textMatch1(fn, m, lt, toId) {
  const suggestions = [];
  const seenTypo = new Set();
  for (const typo of lt) {
    const firstWord = typo.trim().split(/\s+/)[0].toLowerCase();
    if (allCmds.includes(firstWord) || seenTypo.has(firstWord)) continue;
    seenTypo.add(firstWord);
    const results = fuse.search(firstWord);
    if (results.length > 0) {
      const bestMatch = results[0].item;
      if (bestMatch !== firstWord) {
        suggestions.push({ from: firstWord, to: bestMatch });
      }
    }
  }
  if (suggestions.length > 0) {
    const suggestionText = [
      "*Mungkinkah yang kamu maksud:*",
      ...suggestions.map(s => `• ${s.from} → ${s.to}`)
    ].join("\n");
    await fn.sendPesan(toId, suggestionText, m);
  }
};
async function textMatch2(lt) {
  const correctedCommands = [];
  let hasCorrections = false;
  for (const typo of lt) {
    const firstWord = typo.trim().split(/\s+/)[0].toLowerCase();
    const results = fuse.search(firstWord);
    if (results.length > 0) {
      const bestMatch = results[0].item;
      correctedCommands.push(bestMatch);
      if (firstWord.toLowerCase() !== bestMatch.toLowerCase()) {
        hasCorrections = true;
      }
    } else {
      correctedCommands.push(firstWord);
    }
  }
  const correctedString = correctedCommands.join(' | ');
  if (hasCorrections) {
    return correctedString;
  }
  return null;
};
async function getTxt(txt) {
  if (txt.startsWith(dbSettings.rname)) {
    txt = txt.replace(dbSettings.rname, "");
  } else if (txt.startsWith(dbSettings.sname)) {
    txt = txt.replace(dbSettings.sname, "");
  }
  txt = txt.trim();
  return txt;
};
async function groupImage(username, groupname, welcometext, profileImagePath) {
  const width = 600;
  const height = 300;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FF7F00';
  ctx.fillRect(0, 0, width, height);
  const darkAreaHeight = 60;
  const darkAreasY = [30, 120, 210];
  ctx.fillStyle = '#333333';
  for (const y of darkAreasY) {
    ctx.fillRect(0, y, width, darkAreaHeight);
  }
  let profileImage;
  try {
    profileImage = await loadImage(profileImagePath);
  } catch {
    await log(`Tidak bisa load gambar profil, fallback.`);
    profileImage = await loadImage(await fs.readFile('./src/media/apatar.png'));
  }
  const profileSize = 160;
  const profileX = 30;
  const profileY = (height - profileSize) / 2;
  ctx.drawImage(profileImage, profileX, profileY, profileSize, profileSize);
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 60;
  const gap = 30;
  const firstLineX = profileX + profileSize;
  const spacing = 90;
  for (let i = 0; i < 3; i++) {
    const offsetX = firstLineX + i * spacing;
    const startX = offsetX;
    const startY = height;
    const endX = offsetX + height;
    const endY = 0;
    ctx.beginPath();
    ctx.moveTo(startX + gap, startY + gap);
    ctx.lineTo(endX - gap, endY - gap);
    ctx.stroke();
  }
  function trimTextToWidth(text, maxWidth) {
    let trimmedText = text;
    while (ctx.measureText(trimmedText).width > maxWidth && trimmedText.length > 0) {
      trimmedText = trimmedText.slice(0, -1);
    }
    if (trimmedText.length < text.length) {
      trimmedText = trimmedText.slice(0, -3) + '...';
    }
    return trimmedText;
  }
  ctx.fillStyle = '#FF7F00';
  ctx.font = '30px sans-serif';
  ctx.textAlign = 'left';
  const textX = profileX + profileSize + 30;
  const maxWidth = width - textX - 20;
  ctx.fillText(trimTextToWidth(welcometext, maxWidth), textX, darkAreasY[0] + 40);
  ctx.fillText(trimTextToWidth('#' + groupname, maxWidth), textX, darkAreasY[1] + 40);
  ctx.fillText(trimTextToWidth('@' + username, maxWidth), textX, darkAreasY[2] + 40);
  return canvas.toBuffer('image/png');
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info RANK────────────────────────────

function truncateText(ctx, text, maxWidth) {
  let truncated = text;
  while (ctx.measureText(truncated).width > maxWidth) {
    truncated = truncated.slice(0, -1);
    if (truncated.length <= 3) {
      return '...';
    }
  }
  if (truncated !== text) {
    truncated = truncated.slice(0, -3) + '...';
  }
  return truncated;
};
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};
async function createBalanceCard({ username, discriminator, avatarUrl, balance }) {
  const width = 600;
  const height = 200;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1e1e2f');
  gradient.addColorStop(1, '#282841');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  function drawRoundedImage(ctx, img, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
  }
  const avatarSize = 80;
  let avatar;
  try {
    avatar = await loadImage(avatarUrl);
  } catch {
    avatar = await loadImage(await fs.readFile('./src/media/apatar.png'))
  }
  ctx.save();
  drawRoundedImage(ctx, avatar, 50, (height - avatarSize) / 2, avatarSize, avatarSize, 15);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px Sans';
  let usernameText = username;
  const maxWidth = 180;
  while (ctx.measureText(usernameText).width > maxWidth) {
    usernameText = usernameText.slice(0, -1);
  }
  ctx.fillText(usernameText, 170, 80);
  ctx.fillStyle = '#AAAAAA';
  ctx.font = '18px Sans';
  ctx.fillText(`Role: ${discriminator}`, 170, 105);
  ctx.fillStyle = '#00FF00';
  ctx.font = 'bold 16px Sans';
  const balanceStr = balance.toString()
  const maxBalanceWidth = 257;
  const truncatedBalance = truncateText(ctx, balanceStr, maxBalanceWidth);
  ctx.fillText(`Balance: $${truncatedBalance}`, 170, 140);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(170, 115);
  ctx.lineTo(500, 115);
  ctx.stroke();
  return canvas.toBuffer('image/png');
};
async function createRankCard({ username, discriminator, avatarUrl, level, currentXP, requiredXP, rank, pangkat }) {
  const width = 800;
  const height = 250;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const bg = await loadImage('./src/image/rank.png');
  ctx.drawImage(bg, 0, 0, width, height);
  const avatarSize = 180;
  let avatar;
  try {
    avatar = await loadImage(avatarUrl);
  } catch {
    avatar = await loadImage(await fs.readFile('./src/media/apatar.png'));
  }
  ctx.save();
  ctx.beginPath();
  ctx.arc(125, 125, avatarSize / 2, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, 35, 35, avatarSize, avatarSize);
  ctx.restore();
  const formatter = new Intl.NumberFormat('en-US');
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 4;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px Sans';
  let originalText = username.split(' ').slice(0, 4).join(' ');
  let usernameText = originalText;
  const maxWidth = 300;
  while (ctx.measureText(usernameText).width > maxWidth) {
    usernameText = usernameText.slice(0, -1);
    if (usernameText.endsWith(' ')) {
      usernameText = usernameText.trim();
    }
    if (usernameText.length === 0) break;
  }
  if (usernameText !== originalText) {
    usernameText = usernameText.trim() + '…';
  }
  ctx.fillText(usernameText, 250, 80);
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#AAAAAA';
  ctx.font = '28px Sans';
  ctx.fillText(discriminator, 250, 120);
  ctx.fillStyle = '#FFFF00';
  ctx.font = '24px Sans';
  ctx.fillText(`Role: ${pangkat}`, 250, 150);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '28px Sans';
  ctx.fillText(`Level: ${level}`, 630, 80);
  ctx.fillText(`Rank: #${rank}`, 630, 120);
  const progressWidth = 400;
  const progressHeight = 20;
  const progressX = 250;
  const progressY = 170;
  const progress = Math.min(currentXP / requiredXP, 1);
  ctx.fillStyle = '#555555';
  roundRect(ctx, progressX, progressY, progressWidth, progressHeight, 10);
  ctx.fill();
  let barColor = '#FF0000';
  const progressPercentage = progress * 100;
  if (progressPercentage > 30 && progressPercentage <= 60) barColor = '#00FF00';
  else if (progressPercentage > 60 && progressPercentage <= 90) barColor = '#FFFF00';
  else if (progressPercentage > 90) barColor = '#A8DFFB';
  ctx.fillStyle = barColor;
  roundRect(ctx, progressX, progressY, progressWidth * progress, progressHeight, 10);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '20px Sans';
  ctx.fillText(`${formatter.format(currentXP)} / ${formatter.format(requiredXP)} XP`, 250, 210);
  return canvas.toBuffer('image/png');
};

function getDescRank() {
  return dbLevels.slice().sort((a, b) => b.xp - a.xp);
};
function getScore() {
  return dbLevels.slice().sort((a, b) => {
    if (b.balance > a.balance) return 1;
    if (b.balance < a.balance) return -1;
    return 0;
  });
};
function rawLevel(id) {
  return {
    id: id,
    balance: 0n,
    xp: 0,
    level: 1,
    gacha: false,
    inventory: {}
  }
};
function hasLevel(id) {
  const i = dbLevels.findIndex(x => x.id === id);
  if (i !== -1) return i;
  const formatted = rawLevel(id);
  dbLevels.push(formatted);
  dumpLevels();
  return dbLevels.length - 1;
};
function parseCheatAmount(inputStr) {
  if (!inputStr) return null;
  let str = inputStr.toLowerCase().replace(',', '.').trim();
  const suffix = str.slice(-1);
  const multipliers = {
    k: 1000n,
    m: 1000000n,
    b: 1000000000n,
    t: 1000000000000n,
    q: 1000000000000000n,
    z: 1000000000000000000n
  };
  if (multipliers[suffix]) {
    const numPart = str.slice(0, -1);
    if (!/^\d*\.?\d*$/.test(numPart)) return null;
    if (numPart.includes('.')) {
      const parts = numPart.split('.');
      const integerPart = parts[0];
      const decimalPart = parts[1] || '';
      const decimalLength = decimalPart.length;
      const combined = integerPart + decimalPart;
      if (!combined.match(/^\d+$/)) return null;
      const base = BigInt(combined);
      const multiplier = multipliers[suffix];
      const divisor = 10n ** BigInt(decimalLength);
      const result = (base * multiplier) / divisor;
      return result > 0n ? result : null;
    } else {
      try {
        const base = BigInt(numPart);
        const result = base * multipliers[suffix];
        return result > 0n ? result : null;
      } catch {
        return null;
      }
    }
  }
  try {
    const val = BigInt(str);
    return val > 0n ? val : null;
  } catch {
    return null;
  }
};
function getMaxXp(level) {
  const xpThresholds = [0, 1250, 3800, 5400, 7600, 9300, 12000, 18000, 24000, 30000];
  return xpThresholds[level] || 50000;
};
function getLevelName(level) {
  const names = [null, 'Beginner', 'Intermediate', 'Public', 'Pro', 'Expert', 'Master', 'Grandmaster', 'Epic', 'Legend'];
  return names[level] || 'Mythic';
};
function rank() {
  const sortedXp = getDescRank();
  const top = sortedXp.slice(0, 20);
  const balanceRank = getScore();
  let ranks = `*✨ ${dbSettings.botname} LEADERBOARD ✨*\n\n`;
  ranks += `────────────────────────\n`;
  let counter = 1;
  for (let i of top) {
    const id = i.id.split('@')[0];
    const userBalanceData = balanceRank.find(u => u.id === i.id);
    const balance = userBalanceData ? userBalanceData.balance : 0;
    ranks += `*${counter++}. @${id}*\n`;
    ranks += `  🌟 *XP:* ${i.xp.toLocaleString()}/${getMaxXp(i.level).toLocaleString()}\n`;
    ranks += `  ⚡ *Rank:* ${getLevelName(i.level)}\n`;
    ranks += `  💰 *Balance:* ${formatNumber(balance)}\n`;
    ranks += `────────────────────────\n`;
  }
  ranks += `*Total Player:* ${sortedXp.length}`;
  return ranks;
};
function getMyRank(id) {
  const sorted = getDescRank();
  let anjay = sorted.findIndex(x => x.id == id);
  return anjay + 1;
};
function getLevelFormat(id) {
  let i = hasLevel(id);
  return {
    xp: `${dbLevels[i].xp}/${getMaxXp(dbLevels[i].level)}`,
    role: getLevelName(dbLevels[i].level),
    balance: `${formatNumber(dbLevels[i].balance)}`
  }
};
async function addBal(id, amount) {
  const i = hasLevel(id);
  if (i === -1) return;
  dbLevels[i].balance += BigInt(amount);
  await dumpLevels()
};
async function minBal(id, amount) {
  const i = hasLevel(id);
  if (i === -1) return;
  dbLevels[i].balance -= BigInt(amount);
  await dumpLevels()
};
async function addXp(fn, toId, id, m) {
  let levelData = [
    { level: 1, xpAdd: 5, threshold: 1250, role: "Intermediate" },
    { level: 2, xpAdd: 4, threshold: 3800, role: "Public" },
    { level: 3, xpAdd: 3, threshold: 5400, role: "Pro" },
    { level: 4, xpAdd: 2, threshold: 7600, role: "Expert" },
    { level: 5, xpAdd: 1, threshold: 9300, role: "Master" },
    { level: 6, xpAdd: 1, threshold: 12000, role: "Grandmaster" },
    { level: 7, xpAdd: 1, threshold: 18000, role: "Epic" },
    { level: 8, xpAdd: 1, threshold: 24000, role: "Legend" },
    { level: 9, xpAdd: 1, threshold: 30000, role: "Mythic" },
  ];
  let i = hasLevel(id);
  let current = dbLevels[i];
  let data = levelData.find(d => d.level === current.level);
  if (!data) return;
  current.xp += data.xpAdd;
  if (current.xp > data.threshold) {
    current.level += 1;
    const previousRole = levelData.find(d => d.level === current.level - 1)?.role || "Mythic";
    const newRole = levelData.find(d => d.level === current.level)?.role || "Mythic";
    if (newRole !== previousRole) {
      await fn.sendPesan(toId, `Congratulations, you are now ${newRole} grade!`, m);
    }
  }
  dumpLevels();
};
async function getMyLevel(id, username, buffer) {
  try {
    let i = hasLevel(id);
    const ajg = dbLevels[i];
    const rankCardBuffer = await createRankCard({
      username: username,
      discriminator: `#${String(id.split('@')[0])}`,
      avatarUrl: buffer,
      level: ajg.level,
      currentXP: ajg.xp,
      requiredXP: getMaxXp(ajg.level),
      rank: parseInt(getMyRank(ajg.id)),
      pangkat: getLevelName(ajg.level)
    });
    return {
      xp: `${ajg.xp}/${getMaxXp(ajg.level)}`,
      role: getLevelName(ajg.level),
      balance: formatNumber(ajg.balance),
      buffer: rankCardBuffer
    };
  } catch (error) {
    await log(`Error getMyLevel:\n${error}`, true);
    throw new Error('Error_membuat_rank_card');
  }
};
async function getMyBalance(id, username, buffer) {
  try {
    let i = hasLevel(id);
    const ajg = dbLevels[i];
    const rankCardBuffer = await createBalanceCard({
      username: username,
      discriminator: getLevelName(ajg.level),
      avatarUrl: buffer,
      balance: formatNumber(ajg.balance),
    });
    return {
      xp: `${ajg.xp}/${getMaxXp(ajg.level)}`,
      role: getLevelName(ajg.level),
      balance: formatNumber(ajg.balance),
      buffer: rankCardBuffer
    };
  } catch (error) {
    await log(`Error getMyBalance:\n${error}`, true);
    throw new Error('Error_membuat_rank_card');
  }
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info Game Math ──────────────────────

const modes = {
  noob:     [-5, 5, -5, 5, '+-', 30000, 5n],
  easy:     [-10, 10, -10, 10, '+-', 25000, 50n],
  medium:   [-50, 50, -50, 50, '*/+-', 20000, 100n],
  hard:     [-100, 100, -100, 100, '*/+-', 15000, 1000n],
  extreme:  [-999999, 999999, -999999, 999999, '*/', 10000, 100000n]
};
let operators = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
};
function genMath(mode) {
  let [a1, a2, b1, b2, ops, time, bonus] = modes[mode];
  let a = randomInt(a1, a2);
  let b = randomInt(b1, b2);
  let op = randomChoice([...ops]);
  let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))();
  if (op == '/') [a, result] = [result, a];
  return {
    str: `${a} ${operators[op]} ${b}`,
    mode,
    time,
    bonus,
    result
  };
};
function randomInt(from, to) {
  if (from > to) [from, to] = [to, from];
  from = Math.floor(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from + 1) + from);
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info Premium ────────────────────────

function getPremiumPosition(userId, _dir) {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      position = i;
    }
  })
  if (position !== null) {
    return position;
  }
};
function getPremiumExpired(userId, _dir) {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      position = i;
    }
  });
  if (position !== null) {
    return _dir[position].expired;
  };
};
async function addPremiumUser(userId, expired, _dir) {
  const now = dayjs().valueOf();
  const durationToAdd = formatDuration(expired);
  const msToAdd = durationToAdd.asMilliseconds();
  const userIndex = _dir.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    _dir[userIndex].expired += msToAdd;
  } else {
    _dir.push({
      id: userId,
      expired: now + msToAdd
    });
  }
  await dumpPrem();
};
async function expiredCheck(fn, _dir) {
  if (_checkPremium) return;
  _checkPremium = true;
  setInterval(async () => {
    let position = null;
    Object.keys(_dir).forEach((i) => {
      if (Date.now() >= _dir[i].expired) {
        position = i;
      }
    });
    if (position !== null && _latestMessages) {
      await fn.sendPesan(ownerNumber[0], `Premium expired: @${_dir[position].id.split('@')[0]}`, _latestMessages);
      _dir.splice(position, 1);
      await dumpPrem();
    }
  }, 1000);
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info VIP ────────────────────────────

function getVIPposition(userId, _dir) {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      position = i;
    }
  })
  if (position !== null) {
    return position;
  }
};
function getVIPexpired(userId, _dir) {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      position = i;
    }
  });
  if (position !== null) {
    return _dir[position].expired;
  }
};
async function addUserVIP(userId, expired, _dir) {
  const now = dayjs().valueOf();
  const durationToAdd = formatDuration(expired);
  const msToAdd = durationToAdd.asMilliseconds();
  const userIndex = _dir.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    _dir[userIndex].expired += msToAdd;
  } else {
    _dir.push({
      id: userId,
      expired: now + msToAdd
    });
  }
  await dumpVIP();
};
async function expiredVIPcheck(fn, _dir) {
  if (_checkVIP) return;
  _checkVIP = true;

  setInterval(async () => {
    let position = null;
    Object.keys(_dir).forEach((i) => {
      if (Date.now() >= _dir[i].expired) {
        position = i;
      }
    });
    if (position !== null && _latestMessage) {
      await fn.sendPesan(ownerNumber[0], `VIP expired: @${_dir[position].id.split('@')[0]}`, _latestMessage);
      _dir.splice(position, 1);
      await dumpVIP();
    }
  }, 1000);
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info AFK ────────────────────────────

function addAfkUser(toId, userId, time, reason, dbAFK) {
  const obj = {
    mid: toId,
    id: userId,
    time: time,
    reason: reason
  };
  dbAFK.push(obj);
  dumpAfk();
};
function checkAfkUser(toId, userId, dbAFK) {
  let status = false;
  Object.keys(dbAFK).forEach((i) => {
    if ((dbAFK[i].id === userId) && (dbAFK[i].mid === toId)) {
      status = true;
    }
  });
  return status;
};
function getAfkReason(toId, userId, dbAFK) {
  let position = null;
  Object.keys(dbAFK).forEach((i) => {
    if ((dbAFK[i].id === userId) && (dbAFK[i].mid === toId)) {
      position = i;
    }
  });
  if (position !== null) {
    return dbAFK[position].reason;
  };
};
function getAfkTime(toId, userId, dbAFK) {
  let position = null;
  Object.keys(dbAFK).forEach((i) => {
    if ((dbAFK[i].id === userId) && (dbAFK[i].mid === toId)) {
      position = i;
    }
  });
  if (position !== null) {
    return dbAFK[position].time;
  };
};
function getAfkId(toId, userId, dbAFK) {
  let position = null;
  Object.keys(dbAFK).forEach((i) => {
    if ((dbAFK[i].id === userId) && (dbAFK[i].mid === toId)) {
      position = i;
    }
  });
  if (position !== null) {
    return dbAFK[position].id;
  };
};
function getAfkPosition(toId, userId, dbAFK) {
  let position = null;
  Object.keys(dbAFK).forEach((i) => {
    if ((dbAFK[i].id === userId) && (dbAFK[i].mid === toId)) {
      position = i;
    }
  });
  return position;
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info PIXNOVA ────────────────────────

const IMAGE_URL = "https://oss-global.pixnova.ai/";
const SESSION = randomByte(5).slice(0, 9);
let wss;
let promise;

function _connect(ws_url) {
  return new Promise((resolve, reject) => {
    wss = new Websocket(ws_url);
    wss.on("open", () => {
      resolve();
    });
    wss.on("error", error => {
      log(`Error connect PixNova:\n${error}`, true);
      reject(error);
    });
    wss.on("message", chunk => {
      const data = JSON.parse(chunk.toString());
      if (promise && promise.once) {
        promise.call(data);
        promise = null;
      } else if (promise && !promise.once) {
        if (data?.code && data.code == 200 && data?.success && data.success == true) {
          let amba = data;
          amba.output.result.forEach((_, i) => {
            amba.output.result[i] = IMAGE_URL + amba.output.result[i];
          });
          promise.call(amba);
          promise = null;
        }
      }
    });
  });
};
function _send(payload, pr) {
  return new Promise(resolve => {
    wss.send(JSON.stringify(payload));
    if (pr) {
      promise = {
        once: true,
        call: resolve
      };
    } else {
      promise = {
        once: false,
        call: resolve
      };
    }
  });
};
async function PixNova(data, image, ws_url) {
  let base64Image;
  if (/^https?:\/\//i.test(image)) {
    const response = await axios.get(image, { responseType: 'arraybuffer' });
    base64Image = Buffer.from(response.data).toString("base64");
  } else if (Buffer.isBuffer(image)) {
    base64Image = image.toString("base64");
  } else {
    base64Image = image;
  }
  await _connect(ws_url);
  let payload = {
    session_hash: SESSION
  };
  await _send(payload, true);
  payload = {
    data: {
      source_image: `data:image/jpeg;base64,${base64Image}`,
      strength: data?.strength || 0.6,
      prompt: data.prompt,
      negative_prompt: data.negative,
      request_from: 2
    }
  };
  const out = await _send(payload, false);
  return out;
};
async function pomf2(filePath) {
  try {
    if (!fs.existsSync(filePath)) throw new Error("File tidak ditemukan");
    const contentType = mime.lookup(filePath) || "application/octet-stream";
    const fileName = path.basename(filePath);
    const form = new FormData();
    form.append("files[]", fs.createReadStream(filePath), {
      contentType,
      filename: fileName
    });
    const response = await axios.post("https://qu.ax/upload.php", form, {
      headers: {
        ...form.getHeaders()
      }
    });
    if (!response.data.success || !response.data.files?.length) throw new Error("Upload gagal");
    return response.data.files[0].url;
  } catch (error) {
    await log(`Error pomf2:\n${error}`, true);
    return null;
  }
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info TikDL ──────────────────────────

function buildBaseCaption(result) {
  return `🎬 *TikTok Downloader*\n\n` +
    `👤 *Author:* @${result.author?.username || 'N/A'}\n` +
    `❤️ *Likes:* ${result.statistics?.diggCount || 0}\n` +
    `💬 *Comments:* ${result.statistics?.commentCount || 0}\n` +
    `🔗 *Shares:* ${result.statistics?.shareCount || 0}\n\n` +
    `📝 *Deskripsi:* ${result.desc || '(Tidak ada deskripsi)'}`;
};
async function fetchTikTokData(url, version = 'v1') {
  if (!/^https?:\/\/(www\.|vt\.|vm\.|t\.)?tiktok\.com/.test(url)) {
    throw new Error("URL yang Kamu berikan sepertinya bukan link TikTok yang valid.");
  }
  const data = await Downloader(url, { version });
  if (data.status !== 'success' || !data.result) {
    throw new Error("Gagal memproses permintaan tiktok. API downloader mungkin bermasalah, link tidak valid, atau video bersifat pribadi.");
  }
  return data.result;
};
async function sendImages(fn, result, args, toId, m, baseCaption) {
  const imageSelection = args[1];
  let mediaToSend;
  if (imageSelection) {
    const indicesToDownload = parseImageSelection(imageSelection, result.images.length);
    if (indicesToDownload.length === 0) {
      throw new Error(`Format pemilihan gambar salah!\nTotal: ${result.images.length}\nContoh: \`.tt [url] 1,3,5\` atau \`.tt [url] 2-5\``);
    }
    mediaToSend = indicesToDownload.map(index => ({
      image: { url: result.images[index] },
      caption: `${baseCaption}\n\n📌 *Gambar Pilihan ${index + 1} dari ${result.images.length}*`
    }));
  } else {
    mediaToSend = result.images.map((url, index) => ({
      image: { url },
      caption: `${baseCaption}\n\n🖼️ *Gambar ${index + 1} dari ${result.images.length}*`
    }));
  }
  if (mediaToSend.length <= 1) {
    await fn.sendFileUrl(toId, mediaToSend[0].image.url, mediaToSend[0].caption, m);
  } else {
    const chunks = chunkArray(mediaToSend, 15);
    for (const [index, chunk] of chunks.entries()) {
      await fn.sendAlbum(toId, chunk, { quoted: m });
      if (chunks.length > 1 && index < chunks.length - 1) {
        await delay(1000);
      }
    }
  }
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info LUDO ───────────────────────────

const PLAYERS = ['BLUE', 'YELLOW', 'GREEN', 'RED'];
const BASE_POSITIONS = { BLUE: 500, YELLOW: 600, GREEN: 700, RED: 800 };
const START_POSITIONS = { BLUE: 0, YELLOW: 13, GREEN: 26, RED: 39 };
const HOME_POSITIONS = { BLUE: 305, YELLOW: 205, GREEN: 105, RED: 405 };
const TURNING_POINTS = { BLUE: 49, YELLOW: 10, GREEN: 23, RED: 36 };
const HOME_ENTRANCE = { BLUE: 300, YELLOW: 200, GREEN: 100, RED: 400 };
const SAFE_POSITIONS = [0, 8, 13, 21, 26, 34, 39, 47];
const COORDINATES_MAP = {
  0: [7.2, 15.5],
  1: [7.2, 14.3],
  2: [7.2, 13.2],
  3: [7.2, 12],
  4: [7.2, 10.8],
  5: [6.05, 9.6],
  6: [4.9, 9.6],
  7: [3.7, 9.6],
  8: [2.5, 9.6],
  9: [1.3, 9.6],
  10: [0.1, 9.6],
  11: [0.1, 8.4],
  12: [0.1, 7.25],
  13: [1.3, 7.25],
  14: [2.5, 7.25],
  15: [3.7, 7.25],
  16: [4.9, 7.25],
  17: [6.05, 7.25],
  18: [7.2, 6],
  19: [7.2, 4.9],
  20: [7.2, 3.7],
  21: [7.2, 2.5],
  22: [7.2, 1.3],
  23: [7.2, 0.1],
  24: [8.4, 0.1],
  25: [9.6, 0.1],
  26: [9.6, 1.3],
  27: [9.6, 2.5],
  28: [9.6, 3.7],
  29: [9.6, 4.9],
  30: [9.6, 6],
  31: [10.8, 7.25],
  32: [12, 7.25],
  33: [13.2, 7.25],
  34: [14.4, 7.25],
  35: [15.5, 7.25],
  36: [16.8, 7.25],
  37: [16.8, 8.4],
  38: [16.8, 9.6],
  39: [15.5, 9.6],
  40: [14.4, 9.6],
  41: [13.2, 9.6],
  42: [12, 9.6],
  43: [10.8, 9.6],
  44: [9.6, 10.8],
  45: [9.6, 12],
  46: [9.6, 13.2],
  47: [9.6, 14.3],
  48: [9.6, 15.5],
  49: [9.6, 16.8],
  50: [8.4, 16.8],
  51: [7.2, 16.8],
  100: [8.4, 0.1],
  101: [8.4, 1.3],
  102: [8.4, 2.5],
  103: [8.4, 3.7],
  104: [8.4, 4.9],
  105: [8.4, 6],
  200: [0.1, 8.4],
  201: [1.3, 8.4],
  202: [2.5, 8.4],
  203: [3.7, 8.4],
  204: [4.9, 8.4],
  205: [6, 8.4],
  300: [8.4, 16.8],
  301: [8.4, 15.5],
  302: [8.4, 14.4],
  303: [8.4, 13.2],
  304: [8.4, 12],
  305: [8.4, 10.8],
  400: [16.8, 8.4],
  401: [15.5, 8.4],
  402: [14.4, 8.4],
  403: [13.2, 8.4],
  404: [12, 8.4],
  405: [10.8, 8.4],
  500: [4.3, 14.9],
  600: [1.8, 4.2],
  700: [12.5, 2],
  800: [15, 12.5]
};

function startLudoTimeout(idGroup) {
  const gameDuration = 5 * 60 * 1000;
  const timeoutCallback = () => {
    if (ludoSessions[idGroup]) {
      delete ludoSessions[idGroup];
    }
  };
  if (ludoSessions[idGroup]) {
    if (ludoSessions[idGroup].timeoutId) {
      clearTimeout(ludoSessions[idGroup].timeoutId);
    }
    ludoSessions[idGroup].timeoutId = setTimeout(timeoutCallback, gameDuration);
  }
};
function calculateNewPosition(currentPos, roll, color) {
  if (currentPos >= 500) {
    return (roll === 6) ? START_POSITIONS[color] : currentPos;
  }
  if (currentPos >= 100) {
    const finishTarget = HOME_POSITIONS[color];
    if (currentPos + roll <= finishTarget) {
      return currentPos + roll;
    }
    return currentPos;
  }
  const turningPoint = TURNING_POINTS[color];
  const homeEntrance = HOME_ENTRANCE[color];
  let newPos = currentPos;
  for (let i = 0; i < roll; i++) {
    if (newPos === turningPoint) {
      newPos = homeEntrance;
    } else if (newPos >= 100) {
      newPos++;
    } else {
      newPos++;
      if (newPos > 51) {
        newPos = 0;
      }
    }
  }
  return newPos;
};
function checkForCapture(gameState, attackerColor, attackerNewPos) {
  let captureText = '';
  if (SAFE_POSITIONS.includes(attackerNewPos)) {
    return captureText;
  }
  for (const color of gameState.players) {
    if (color === attackerColor) continue;
    let opponentPawnPos = gameState.pawnPositions[color];
    if (opponentPawnPos === attackerNewPos) {
      gameState.pawnPositions[color] = BASE_POSITIONS[color];
      captureText += `⚔️ Pion *${attackerColor}* memakan pion *${color}*!\n`;
    }
  }
  return captureText;
};
async function runBotLudoTurns(toId, m, fn) {
  const sPesan = (text) => fn.sendPesan(toId, text, m);
  const gameState = ludoSessions[toId];
  if (!gameState || gameState.status !== 'BOTS_TURN') return;
  const botColor = gameState.players[gameState.turn];
  if (botColor === 'RED') return;
  await delay(2500);
  const roll = rollDice();
  let moveText = `🤖 Giliran Bot *${botColor}*...\n` + `Bot melempar dadu dan mendapat angka *${roll}*.\n`;
  const currentPos = gameState.pawnPositions[botColor];
  if (currentPos >= 500 && roll !== 6) {
    moveText += `Bot perlu angka 6 untuk keluar. Giliran dilewatkan.\n`;
  } else {
    const newPos = calculateNewPosition(currentPos, roll, botColor);
    gameState.pawnPositions[botColor] = newPos;
    if (currentPos >= 500) {
      moveText += `Bot keluar dari kandang.\n`;
    } else {
      moveText += `Pion *${botColor}* maju *${roll}* langkah...\n`;
    }
    const captureText = checkForCapture(gameState, botColor, newPos);
    if (captureText) {
      moveText += captureText;
    }
  }
  if (gameState.pawnPositions[botColor] === HOME_POSITIONS[botColor]) {
    moveText += `\nMaaf, Bot *${botColor}* MENANG! Permainan berakhir.`;
    const finalBoard = await generateLudoBoard(gameState);
    if (finalBoard) await sPesan({ image: finalBoard, caption: moveText });
    clearTimeout(gameState.timeoutId);
    delete ludoSessions[toId];
    return;
  }
  if (roll === 6) {
    await sPesan({ text: moveText + `\nBot dapat angka 6 dan bermain lagi!` });
    setTimeout(() => runBotLudoTurns(toId, m, fn), 2000);
  } else {
    gameState.turn = (gameState.turn + 1) % gameState.players.length;
    const nextPlayerColor = gameState.players[gameState.turn];
    if (nextPlayerColor !== 'RED') {
      await sPesan({ text: moveText });
      setTimeout(() => runBotLudoTurns(toId, m, fn), 2000);
    } else {
      gameState.status = 'WAITING_FOR_ROLL';
      const finalBoard = await generateLudoBoard(gameState);
      if (finalBoard) {
        moveText += `\nGiliranmu, @${gameState.playerJid.split('@')[0]}! Ketik *roll*.`;
        await sPesan({ image: finalBoard, caption: moveText, mentions: [gameState.playerJid] });
        startLudoTimeout(toId);
      }
    }
  }
};
async function generateLudoBoard(gameState) {
  try {
    const ludoLocalAssets = {
      board:    './src/games/ludo/ludo_board.jpg',
      pawns: {
        RED:    './src/games/ludo/pion_merah.png',
        GREEN:  './src/games/ludo/pion_hijau.png',
        YELLOW: './src/games/ludo/pion_kuning.png',
        BLUE:   './src/games/ludo/pion_biru.png'
      }
    };
    const squareSize = 30;
    const pionSize = 30;
    const pawnLayers = [];
    for (const color of gameState.players) {
      const pawnPath = ludoLocalAssets.pawns[color];
      const logicalPosition = gameState.pawnPositions[color];
      const gridCoords = COORDINATES_MAP[logicalPosition];
      if (gridCoords) {
        const resizedPawnBuffer = await sharp(pawnPath).resize(pionSize, pionSize).toBuffer();
        const [gridX, gridY] = gridCoords;
        const pixelX = gridX * squareSize;
        const pixelY = gridY * squareSize;
        const offsetX = Math.round((squareSize - pionSize) / 2);
        const offsetY = Math.round((squareSize - pionSize) / 2);
        pawnLayers.push({
          input: resizedPawnBuffer,
          top: Math.round(pixelY + offsetY),
          left: Math.round(pixelX + offsetX)
        });
      }
    }
    const finalBoardBuffer = await sharp(ludoLocalAssets.board).composite(pawnLayers).jpeg({ quality: 90, progressive: true, mozjpeg: true }).toBuffer();
    return finalBoardBuffer;
  } catch (error) {
    await log(`Error generateLudoBoard:\n${error}`, true);
    return null;
  }
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info TICTACTOE ──────────────────────

function formatTicTacToeBoard(board) {
  let boardText = '```\n';
  for (let i = 0; i < 3; i++) {
    boardText += ` ${board[i][0] || (i * 3 + 1)} | ${board[i][1] || (i * 3 + 2)} | ${board[i][2] || (i * 3 + 3)} \n`;
    if (i < 2) {
      boardText += '-----------\n';
    }
  }
  boardText += '```';
  return boardText;
};
function checkWinner(board) {
  const lines = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];
  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0];
    }
  }
  if (board.flat().every(cell => cell)) {
    return 'draw';
  }
  return null;
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info Chess ──────────────────────

async function generateBoardImage(fen, perspective = 'w') {
  const squareSize = 50;
  const boardSize = squareSize * 8;
  const canvasSize = boardSize;
  const canvas = createCanvas(canvasSize, canvasSize);
  const ctx = canvas.getContext('2d');
  const pieces = {
    'p': '♙', 'r': '♖', 'n': '♘', 'b': '♗', 'q': '♕', 'k': '♔',
    'P': '♟︎', 'R': '♜', 'N': '♞', 'B': '♝', 'Q': '♛', 'K': '♚'
  };
  let fileLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  let rankLabels = ['8', '7', '6', '5', '4', '3', '2', '1'];
  if (perspective === 'b') {
    fileLabels.reverse();
    rankLabels.reverse();
  };
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isLightSquare = (row + col) % 2 === 0;
      ctx.fillStyle = isLightSquare ? '#F0D9B5' : '#B58863';
      ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
      ctx.fillStyle = isLightSquare ? 'rgba(181, 136, 99, 0.8)' : 'rgba(240, 217, 181, 0.8)';
      ctx.font = 'bold 12px Arial';
      if (col === 0) {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(rankLabels[row], col * squareSize + 2, row * squareSize + 2);
      }
      if (row === 7) {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(fileLabels[col], (col + 1) * squareSize - 2, (row + 1) * squareSize - 2);
      }
    }
  }
  const [board] = fen.split(' ');
  const ranks = board.split('/');
  if (perspective === 'b') {
    ranks.reverse().forEach((rank, i) => ranks[i] = rank.split('').reverse().join(''));
  }
  ranks.forEach((rankStr, rank) => {
    let file = 0;
    for (const char of rankStr) {
      if (/\d/.test(char)) {
        file += parseInt(char, 10);
      } else {
        ctx.fillStyle = (char === char.toUpperCase()) ? '#FFFFFF' : '#000000';
        ctx.strokeStyle = (char === char.toUpperCase()) ? '#000000' : '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.font = '42px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const pieceChar = pieces[char.toUpperCase()];
        const x = file * squareSize + squareSize / 2;
        const y = rank * squareSize + squareSize / 2;
        ctx.strokeText(pieceChar, x, y);
        ctx.fillText(pieceChar, x, y);
        file++;
      }
    }
  });
  return canvas.toBuffer('image/png');
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info Minesweeper ────────────────────

function generateMinesweeperBoard(width, height, numMines) {
  let board = Array(height).fill(null).map(() => Array(width).fill('0'));
  let minesPlaced = 0;
  while (minesPlaced < numMines) {
    const row = Math.floor(Math.random() * height);
    const col = Math.floor(Math.random() * width);
    if (board[row][col] !== '*') {
      board[row][col] = '*';
      minesPlaced++;
    }
  }
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (board[row][col] === '*') continue;
      let adjacentMines = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newRow = row + i;
          const newCol = col + j;
          if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width && board[newRow][newCol] === '*') {
            adjacentMines++;
          }
        }
      }
      board[row][col] = adjacentMines.toString();
    }
  }
  return board;
};
function formatMinesweeperBoard(playerBoard, gameOver = false, solutionBoard = null) {
  const numberEmojis = ['🌀', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];
  let boardText = '```\n';
  boardText += '   ' + Array.from({ length: playerBoard[0].length }, (_, i) => String.fromCharCode(65 + i)).join(' ');
  boardText += '\n';
  playerBoard.forEach((row, rowIndex) => {
    boardText += (rowIndex + 1).toString().padStart(2, ' ') + ' ';
    row.forEach((cell, colIndex) => {
      if (gameOver && solutionBoard[rowIndex][colIndex] === '*') {
        boardText += '💣 ';
      } else if (cell.status === 'terbuka') {
        boardText += numberEmojis[parseInt(cell.value)] + ' ';
      } else if (cell.status === 'ditandai') {
        boardText += '🚩 ';
      } else {
        boardText += '⬜️ ';
      }
    });
    boardText += '\n';
  });
  boardText += '```';
  return boardText;
};
function revealCell(row, col, gameState) {
  const { solutionBoard, playerBoard } = gameState;
  const height = solutionBoard.length;
  const width = solutionBoard[0].length;
  if (row < 0 || row >= height || col < 0 || col >= width || playerBoard[row][col].status === 'terbuka') {
    return;
  }
  const cellValue = solutionBoard[row][col];
  playerBoard[row][col] = { status: 'terbuka', value: cellValue };
  if (cellValue === '0') {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        revealCell(row + i, col + j, gameState);
      }
    }
  }
};
function checkWinCondition(gameState) {
  let hiddenCount = 0;
  for (let row of gameState.playerBoard) {
    for (let cell of row) {
      if (cell.status === 'tertutup' || cell.status === 'ditandai') {
        hiddenCount++;
      }
    }
  }
  return hiddenCount === gameState.mineCount;
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info UlarTangga ─────────────────────

const turboBoard = {
  size: 50,
  ladders: {
    3: 21,
    8: 31,
    18: 44,
    28: 49
  },
  snakes: {
    47: 12,
    38: 20,
    26: 7,
    16: 4
  }
};
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
};
function createRandomMap() {
  const basePath = './src/games/images/map/';
  const mapsData = [
    { move: { 4: 56, 12: 50, 14: 55, 22: 58, 41: 79, 54: 88, 96: 42, 94: 71, 75: 32, 48: 16, 37: 3, 28: 10 } },
    { move: { 7: 36, 21: 58, 31: 51, 34: 84, 54: 89, 63: 82, 96: 72, 78: 59, 66: 12, 56: 20, 43: 24, 33: 5 } },
    { move: { 8: 29, 10: 32, 20: 39, 27: 85, 51: 67, 72: 91, 79: 100, 98: 65, 94: 75, 93: 73, 64: 60, 62: 19, 56: 24, 53: 50, 17: 7 } },
    { move: { 8: 29, 10: 32, 20: 39, 27: 85, 51: 67, 72: 91, 79: 100, 98: 65, 94: 75, 93: 73, 64: 60, 62: 19, 56: 24, 53: 50, 17: 7 } },
    { move: { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 51: 67, 72: 91, 80: 99, 98: 79, 94: 75, 93: 73, 87: 36, 64: 60, 62: 19, 54: 34, 17: 7 } },
    { move: { 4: 23, 13: 46, 33: 52, 42: 63, 50: 69, 62: 81, 74: 93, 99: 41, 95: 76, 89: 53, 66: 45, 54: 31, 43: 17, 40: 2, 27: 5 } },
    { move: { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 51: 67, 71: 91, 80: 100, 98: 79, 95: 75, 93: 73, 87: 24, 64: 60, 62: 19, 54: 34, 17: 7 } },
    { move: { 2: 38, 7: 14, 8: 31, 15: 26, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 78: 98, 87: 94, 99: 80, 95: 75, 92: 88, 89: 68, 74: 53, 64: 60, 62: 19, 49: 11, 46: 25, 16: 6 } }
  ];
  const randomIndex = Math.floor(Math.random() * mapsData.length);
  const selectedMap = mapsData[randomIndex];
  selectedMap.path = `${basePath}map${randomIndex + 1}.jpg`;
  selectedMap.size = 100;
  return selectedMap;
};
function startUlarTanggaTimeout(idGroup) {
  const gameDuration = 3 * 60 * 1000;
  const timeoutCallback = () => {
    if (ularTanggaSessions[idGroup]) {
      delete ularTanggaSessions[idGroup];
    }
  };
  if (ularTanggaSessions[idGroup]) {
    ularTanggaSessions[idGroup].timeoutId = setTimeout(timeoutCallback, gameDuration);
  }
};
async function generateUlarTanggaImage(gameState) {
  try {
    const boardSize = 1024;
    const tileSize = boardSize / 10;
    const players = [
      { id: gameState.playerJid, position: gameState.playerPos },
      { id: 'BOT', position: gameState.botPos }
    ];
    const pionImagesPath = './src/games/images/';
    const pionFiles = [`${pionImagesPath}player1.png`, `${pionImagesPath}player2.png`];
    const layers = [];
    for (let i = 0; i < players.length; i++) {
      const { position } = players[i];
      if (position === 0) continue;
      const row = Math.floor((position - 1) / 10);
      const col = (row % 2 === 0) ? (position - 1) % 10 : 9 - (position - 1) % 10;
      const x = col * tileSize;
      const y = (9 - row) * tileSize;
      const pionSize = Math.round(tileSize * 0.7);
      const pionBuffer = await sharp(pionFiles[i]).resize(pionSize, pionSize).toBuffer();
      const offsetX = (tileSize - pionSize) / 2;
      const offsetY = (tileSize - pionSize) / 2;
      layers.push({
        input: pionBuffer,
        top: Math.round(y + offsetY),
        left: Math.round(x + offsetX),
      });
    }
    const finalImageBuffer = await sharp(gameState.map.path).resize(boardSize, boardSize).composite(layers).jpeg({ quality: 90, progressive: true, mozjpeg: true }).toBuffer();
    return finalImageBuffer;
  } catch (error) {
    await log(`Error generateUlarTanggaImage:\n${error}`, true);
    return null;
  }
};
async function runBotUlarTanggaTurn(toId, m, fn) {
  const gameState = ularTanggaSessions[toId];
  if (!gameState) return;
  if (gameState.botDoublesCount === undefined) {
    gameState.botDoublesCount = 0;
  }
  await delay(1500);
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const totalMove = dice1 + dice2;
  const isDouble = dice1 === dice2;
  let botText = `🤖 Giliran Bot...\n`;
  botText += `Bot melempar dadu dan mendapat 🎲(${dice1}) + 🎲(${dice2}) = *${totalMove}*.\n`;
  const oldPos = gameState.botPos;
  gameState.botPos += totalMove;
  botText += `Bot maju dari kotak *${oldPos}* ke *${gameState.botPos}*.\n`;
  const board = gameState.board;
  if (board.ladders[gameState.botPos]) {
    const targetPos = board.ladders[gameState.botPos];
    botText += `Bot mendarat di tangga! 🪜 Bot naik ke kotak *${targetPos}*.\n`;
    gameState.botPos = targetPos;
  } else if (board.snakes[gameState.botPos]) {
    const targetPos = board.snakes[gameState.botPos];
    botText += `Bot mendarat di ular! 🐍 Bot turun ke kotak *${targetPos}*.\n`;
    gameState.botPos = targetPos;
  }
  if (gameState.botPos >= board.size) {
    botText += `\n🤖 Bot mencapai garis finis dan MENANG!`;
    await fn.sendPesan(toId, botText, m);
    clearTimeout(gameState.timeoutId);
    delete ularTanggaSessions[toId];
    return;
  }
  if (isDouble && gameState.botDoublesCount < 2) {
    gameState.botDoublesCount++;
    botText += `\nBot mendapat angka kembar dan berhak melempar lagi! (Bonus ke-${gameState.botDoublesCount})`;
    await fn.sendPesan(toId, botText, m);
    setTimeout(() => runBotUlarTanggaTurn(toId, m, fn), 2000);
  } else {
    if (isDouble && gameState.botDoublesCount >= 2) {
      botText += `\nBot sudah mendapat 3x giliran. Giliran bonus hangus.\n`;
    }
    gameState.botDoublesCount = 0;
    gameState.turn = 'player';
    botText += `\nSekarang giliranmu, @${gameState.playerJid.split('@')[0]}! Ketik *lempar*.`;
    await fn.sendPesan(toId, botText, m);
    startUlarTanggaTimeout(toId);
  }
};
async function runBotUlarTanggaTurnV2(toId, m, fn) {
  const sPesan = (text) => fn.sendPesan(toId, text, m);
  const gameState = ulartangga[toId];
  if (!gameState) return;
  await delay(2000);
  const roll = rollDice();
  const oldPos = gameState.botPos;
  gameState.botPos += roll;
  if (gameState.botPos > 100) gameState.botPos = 100 - (gameState.botPos - 100);
  let moveText = `🤖 *Giliran Bot...*\n` +
    `Bot melempar dadu dan mendapat angka *${roll}*.\n` +
    `Bot maju dari *${oldPos}* ke *${gameState.botPos}*.\n`;
  const moveEffect = gameState.map.move[gameState.botPos];
  if (moveEffect) {
    moveText += gameState.botPos > moveEffect ? `Bot Termakan Ular! 🐍 Turun ke *${moveEffect}*.\n` : `Bot Naik Tangga! 🪜 Naik ke *${moveEffect}*.\n`;
    gameState.botPos = moveEffect;
  }
  const newBoard = await generateUlarTanggaImage(gameState);
  if (!newBoard) return await sPesan('Gagal membuat gambar papan.');
  if (gameState.botPos === 100) {
    moveText += `\nMaaf, Bot MENANG!`;
    await sPesan({ image: newBoard, caption: moveText, mentions: [gameState.playerJid] });
    clearTimeout(gameState.timeoutId);
    delete ulartangga[toId];
    return;
  }
  gameState.turn = 'player';
  moveText += `\nGiliranmu, @${gameState.playerJid.split('@')[0]}! Ketik *roll* atau *kocok*.`;
  await sPesan({ image: newBoard, caption: moveText, mentions: [gameState.playerJid] });
  const gameDuration = 3 * 60 * 1000;
  gameState.timeoutId = setTimeout(async () => {
    if (ulartangga[toId]) {
      await sPesan(`⏰ *Waktu Habis!* Sesi Ular Tangga dihentikan.`);
      delete ulartangga[toId];
    }
  }, gameDuration);
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info Casino ─────────────────────────

const formatHandSimple = (hand) => hand.map(c => `[${c.rank}${c.suit}]`).join(' ');
const getHandDetails = (hand) => {
  const rankToValue = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
  const sortedHand = hand.slice().sort((a, b) => rankToValue[a.rank] - rankToValue[b.rank]);
  const values = sortedHand.map(c => rankToValue[c.rank]);
  const suits = sortedHand.map(c => c.suit);
  const isFlush = suits.every(s => s === suits[0]);
  const isStraight = (values[0] + 1 === values[1] && values[1] + 1 === values[2]) || (values[0] === 2 && values[1] === 3 && values[2] === 14);
  if (isStraight && isFlush) return { rankValue: 6, name: '🐉 DRAGON 🐉 (Straight Flush)' };
  if (values[0] === values[1] && values[1] === values[2]) return { rankValue: 5, name: 'Three of a Kind' };
  if (isStraight) return { rankValue: 4, name: 'Straight' };
  if (isFlush) return { rankValue: 3, name: 'Flush' };
  if (values[0] === values[1] || values[1] === values[2]) return { rankValue: 2, name: 'Pair' };
  const highCardRank = Object.keys(rankToValue).find(key => rankToValue[key] === values[2]);
  return { rankValue: 1, name: `High Card ${highCardRank}` };
};
const anteBonusMultipliers = {
  6: 52n, 5: 10n, 4: 5n, 3: 2n, 2: 1n
};
const specialHandRules = [
  { name: "Empat As dengan Kartu Kecil", check: isFourAcesWithLow },
  { name: "Empat As", check: isFourAces },
  { name: "Pure Samgong", check: isPureSamgong },
  { name: "7 Kartu Kecil", check: isSevenCardLow },
  { name: "Kartu Kecil", check: isLowCardsOnly },
];

function createDeck() {
  const suits = ['♠️', '♥️', '♦️', '♣️'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
  const deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      deck.push({ suit: suits[i], rank: ranks[j], value: values[j], display: `${ranks[j]} ${suits[i]}` });
    }
  }
  return deck;
};
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};
function formatKartu(hand) {
  if (!hand || hand.length === 0) return "Tangan kosong.";
  return hand.map((card, index) => `${index + 1}. [ ${card.display} ]`).join('\n');
};
function calculateScore(hand) {
  if (!hand || hand.length === 0) return 0;
  const scoresBySuit = {};
  for (const card of hand) {
    scoresBySuit[card.suit] = (scoresBySuit[card.suit] || 0) + card.value;
  }
  return Object.keys(scoresBySuit).length > 0 ? Math.max(...Object.values(scoresBySuit)) : 0;
};
function isFourAces(hand) {
  const aceCount = hand.filter(card => card.rank === 'A').length;
  return aceCount >= 4;
};
function isLowCardsOnly(hand) {
  return hand.every(card => ['2', '3', '4'].includes(card.rank));
};
function isFourAcesWithLow(hand) {
  const aceCount = hand.filter(card => card.rank === 'A').length;
  const otherCards = hand.filter(card => card.rank !== 'A');
  return aceCount >= 4 && otherCards.every(card => ['2', '3', '4'].includes(card.rank));
};
function isSevenCardLow(hand) {
  return hand.length === 7 && isLowCardsOnly(hand);
};
function isPureSamgong(hand) {
  return hand.every(card => ['K', 'Q', 'J'].includes(card.rank));
};
function calculateSamgongValue(hand) {
  let totalValue = 0;
  for (const card of hand) {
    if (['K', 'Q', 'J'].includes(card.rank)) {
      totalValue += 10;
    } else if (card.rank === 'A') {
      totalValue += 1;
    } else {
      totalValue += card.value;
    }
  }
  return totalValue;
};
function getSpecialHandName(hand) {
  for (const rule of specialHandRules) {
    if (rule.check(hand)) return rule.name;
  }
  return null;
};
async function runBotTurn41(toId, m, fn) {
  const gameState = game41Sessions[toId];
  if (!gameState) return;
  const personality = gameState.personality;
  let takenCard;
  const topDiscard = gameState.discardPile[gameState.discardPile.length - 1];
  if (personality === 'logis') {
    const suitCounts = gameState.botHand.reduce((acc, card) => ({ ...acc, [card.suit]: (acc[card.suit] || 0) + 1 }), {});
    const bestSuit = Object.keys(suitCounts).reduce((a, b) => suitCounts[a] > suitCounts[b] ? a : b, null);
    if (topDiscard && bestSuit && topDiscard.suit === bestSuit) takenCard = gameState.discardPile.pop();
    else takenCard = gameState.deck.shift();
  } else {
    const currentScore = calculateScore(gameState.botHand);
    const potentialScore = calculateScore([...gameState.botHand, topDiscard]);
    if (topDiscard && potentialScore > currentScore) takenCard = gameState.discardPile.pop();
    else takenCard = gameState.deck.shift() || gameState.discardPile.pop();
  }
  gameState.botHand.push(takenCard);
  const suitCounts = gameState.botHand.reduce((acc, card) => ({ ...acc, [card.suit]: (acc[card.suit] || 0) + 1 }), {});
  const mainSuit = Object.keys(suitCounts).reduce((a, b) => suitCounts[a] > suitCounts[b] ? a : b);
  let cardToDiscardIndex = -1;
  let lowestValue = Infinity;
  gameState.botHand.forEach((card, index) => {
    if (card.suit !== mainSuit) {
      if (card.value < lowestValue) { lowestValue = card.value; cardToDiscardIndex = index; }
    }
  });
  if (cardToDiscardIndex === -1) {
    lowestValue = Infinity;
    gameState.botHand.forEach((card, index) => {
      if (card.value < lowestValue) { lowestValue = card.value; cardToDiscardIndex = index; }
    });
  }
  const discardedCard = gameState.botHand.splice(cardToDiscardIndex, 1)[0];
  gameState.discardPile.push(discardedCard);
  const botFinalScore = calculateScore(gameState.botHand);
  let knockThreshold = 42;
  if (personality === 'logis') knockThreshold = 38;
  if (personality === 'pintar') knockThreshold = 36;
  if (personality === 'licik') knockThreshold = Math.floor(Math.random() * 6) + 33;
  if (personality === 'pintar_licik') knockThreshold = Math.floor(Math.random() * 5) + 34;
  if (botFinalScore >= knockThreshold) {
    const playerScore = calculateScore(gameState.playerHand);
    let resultText = `🤖 *Bot memutuskan untuk mengetuk!* 🤖\n\n` +
      `Tangan Bot (Skor: *${botFinalScore}*):\n${formatKartu(gameState.botHand)}\n\n` +
      `Tangan Kamu (Skor: *${playerScore}*):\n${formatKartu(gameState.playerHand)}\n\n`;
    if (botFinalScore > playerScore) resultText += `🤖 Bot menang!`;
    else if (playerScore > botFinalScore) resultText += `🎉 Selamat, kamu menang!`;
    else resultText += `🤝 Hasilnya seri!`;
    await fn.sendPesan(toId, resultText, m);
    delete game41Sessions[toId];
    return;
  }
  gameState.turn = 'player';
  const groupMessage = `Bot telah bergerak dan membuang kartu [ ${discardedCard.display} ].\n\n` +
    `Giliranmu, @${gameState.playerJid.split('@')[0]}! Cek DM untuk melihat kartumu.`;
  await fn.sendPesan(toId, groupMessage, m);
  const privateMessage = `Bot membuang [ ${discardedCard.display} ].\n\n` +
    `Kartu Kamu saat ini:\n${formatKartu(gameState.playerHand)}\n\n` +
    `Pilih aksimu di grup: *ambil dek* atau *ambil buangan*.`;
  await fn.sendPesan(gameState.playerJid, privateMessage, m);
};
async function runBotSamgongTurn(toId, m, fn) {
  const gameState = samgongSessions[toId];
  if (!gameState) return;
  let botTurnText = `Kartu awal Bandar adalah [ ${gameState.botHand.map(c => c.display).join(' | ')} ], ` +
    `Total nilai: *${calculateSamgongValue(gameState.botHand)}*.`;
  await fn.sendReply(toId, botTurnText, m);
  await delay(2000);
  while (calculateSamgongValue(gameState.botHand) <= 25) {
    const newCard = gameState.deck.shift();
    if (!newCard) break;
    gameState.botHand.push(newCard);
    botTurnText = `Bandar mengambil kartu... [ ${newCard.display} ].\n` +
      `Total nilai sekarang: *${calculateSamgongValue(gameState.botHand)}*`;
    await fn.sendReply(toId, botTurnText, m);
    await delay(2000);
  }
  const botScore = calculateSamgongValue(gameState.botHand);
  const playerScore = calculateSamgongValue(gameState.playerHand);
  const botSpecial = getSpecialHandName(gameState.botHand);
  const playerSpecial = getSpecialHandName(gameState.playerHand);
  let resultText = `*--- HASIL AKHIR ---*\n\n` +
    `Tangan Kamu (${playerSpecial ? playerSpecial : "Nilai: *" + playerScore + "*"})\n` +
    `Tangan Bandar (${botSpecial ? botSpecial : "Nilai: *" + botScore + "*"})\n\n`;
  if (botSpecial || playerSpecial) {
    const rank = specialHandRules.map(r => r.name);
    if (botSpecial && playerSpecial) {
      const botRank = rank.indexOf(botSpecial);
      const playerRank = rank.indexOf(playerSpecial);
      if (playerRank < botRank) {
        resultText += `⭐️ Kamu menang dengan *${playerSpecial}*!`;
      } else if (botRank < playerRank) {
        resultText += `🤖 Bot menang dengan *${botSpecial}*!`;
      } else {
        resultText += `🤝 Hasilnya seri, keduanya punya *${playerSpecial}*! (Bandar menang!)`;
      }
    } else if (playerSpecial) {
      resultText += `⭐️ Kamu menang dengan *${playerSpecial}*!`;
    } else {
      resultText += `🤖 Bot menang dengan *${botSpecial}*!`;
    }
  } else if (botScore > 30) {
    resultText += `💥 Bandar HANGUS! Kamu menang!`;
  } else if (playerScore > botScore) {
    resultText += `🎉 Selamat, Kamu menang!`;
  } else if (botScore > playerScore) {
    resultText += `🤖 Bot menang!`;
  } else {
    resultText += `🤝 Hasilnya seri (Bandar menang)!`;
  }
  await fn.sendPesan(toId, resultText, m);
  delete samgongSessions[toId];
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info WereWolf ───────────────────────

function emoji_role(role) {
  const roles = {
    warga: "👱‍♂️",
    seer: "👳",
    guardian: "👼",
    sorcerer: "🔮",
    werewolf: "🐺"
  };
  return roles[role] || "";
};
function roleAmount(playerCount) {
  if (playerCount <=  4) return { werewolf: 1, seer: 1, guardian: 1, warga: playerCount - 3, sorcerer: 0 };
  if (playerCount === 5) return { werewolf: 1, seer: 1, guardian: 1, warga: 2, sorcerer: 0 };
  if (playerCount === 6) return { werewolf: 2, seer: 1, guardian: 1, warga: 2, sorcerer: 0 };
  if (playerCount === 7) return { werewolf: 2, seer: 1, guardian: 1, warga: 3, sorcerer: 0 };
  if (playerCount === 8) return { werewolf: 2, seer: 1, guardian: 1, warga: 3, sorcerer: 1 };
  if (playerCount >=  9) return { werewolf: 3, seer: 1, guardian: 1, warga: playerCount - 6, sorcerer: 1 };
  return {};
};
function assignRoles(gameState) {
  const players = Object.keys(gameState.pemain);
  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [players[i], players[j]] = [players[j], players[i]];
  }
  const roles = roleAmount(players.length);
  let playerIndex = 0;
  const assign = (role, count) => {
    for (let i = 0; i < count; i++) {
      if (players[playerIndex]) {
        gameState.pemain[players[playerIndex]].role = role;
        playerIndex++;
      }
    }
  };
  assign('werewolf', roles.werewolf);
  assign('seer', roles.seer);
  assign('guardian', roles.guardian);
  assign('sorcerer', roles.sorcerer);
  assign('warga', roles.warga);
};
function checkPemenang(gameState) {
  const livingPlayers = Object.values(gameState.pemain).filter(p => p.isAlive);
  const livingWerewolves = livingPlayers.filter(p => ['werewolf', 'sorcerer'].includes(p.role)).length;
  const livingVillagers = livingPlayers.filter(p => ['warga', 'seer', 'guardian'].includes(p.role)).length;
  if (livingWerewolves === 0) return 'WARGA';
  if (livingWerewolves >= livingVillagers) return 'WEREWOLF';
  return null;
};
function initializeGameWW(toId, fn, m) {
  const gameState = werewolfSessions[toId];
  assignRoles(gameState);
  let startMessage = "Permainan dimulai! Peran telah dibagikan melalui pesan pribadi.\n\nPemain:\n";
  Object.keys(gameState.pemain).forEach(jid => {
    startMessage += `- @${jid.split('@')[0]}\n`;
  });
  fn.sendPesan(toId, startMessage, m);
  startNightPhase(toId, fn, m);
};
async function endGame(toId, reason, fn, m) {
  const gameState = werewolfSessions[toId];
  if (!gameState) return;
  clearTimeout(gameState.timeoutId);
  let endMessage = `GAME SELESAI!\nAlasan: ${reason}\n\n`;
  const allPlayers = Object.values(gameState.pemain);
  const teamWarga = allPlayers.filter(p => ['warga', 'seer', 'guardian'].includes(p.role));
  const teamWerewolf = allPlayers.filter(p => ['werewolf', 'sorcerer'].includes(p.role));
  endMessage += "Tim Warga:\n";
  teamWarga.forEach(p => {
    endMessage += `- @${p.id.split('@')[0]} (${p.role} ${emoji_role(p.role)})\n`;
  });
  endMessage += "\nTim Werewolf:\n";
  teamWerewolf.forEach(p => {
    endMessage += `- @${p.id.split('@')[0]} (${p.role} ${emoji_role(p.role)})\n`;
  });
  await fn.sendPesan(toId, endMessage, m);
  delete werewolfSessions[toId];
};
async function processVotingResult(toId, fn, m) {
  const gameState = werewolfSessions[toId];
  if (!gameState || gameState.status !== 'VOTING') return;
  const voteCounts = {};
  Object.values(gameState.votes).forEach(votedJid => {
    voteCounts[votedJid] = (voteCounts[votedJid] || 0) + 1;
  });
  let maxVotes = 0;
  let lynchedJid = null;
  let isTie = false;
  for (const jid in voteCounts) {
    if (voteCounts[jid] > maxVotes) {
      maxVotes = voteCounts[jid];
      lynchedJid = jid;
      isTie = false;
    } else if (voteCounts[jid] === maxVotes) {
      isTie = true;
    }
  }
  if (isTie || !lynchedJid) {
    await fn.sendPesan(toId, `Hasil voting seri atau tidak ada yang divote. Tidak ada yang dieksekusi malam ini.`, m);
  } else {
    gameState.pemain[lynchedJid].isAlive = false;
    const lynchedPlayer = gameState.pemain[lynchedJid];
    await fn.sendPesan(toId, `Warga desa telah sepakat untuk menggantung @${lynchedJid.split('@')[0]}. Dia adalah seorang *${lynchedPlayer.role}* ${emoji_role(lynchedPlayer.role)}.`, m);
  }
  const winner = checkPemenang(gameState);
  if (winner) {
    await endGame(toId, `Pemenangnya adalah Tim ${winner}!`, fn, m);
  } else {
    startNightPhase(toId, fn, m);
  }
};
async function startVotingPhase(toId, fn, m) {
  const gameState = werewolfSessions[toId];
  if (!gameState) return;
  gameState.status = 'VOTING';
  gameState.votes = {};
  let votingMessage = `Waktu voting telah tiba! Silakan pilih siapa yang akan dieksekusi.\nWaktu 90 detik.\n\nKetik .vote <nomor>\n\nPemain Hidup:\n`;
  Object.values(gameState.pemain).forEach((p, index) => {
    if (p.isAlive) {
      votingMessage += `${index + 1}. @${p.id.split('@')[0]}\n`;
    }
  });
  await fn.sendPesan(toId, votingMessage, m);
  gameState.phaseTimeout = setTimeout(() => processVotingResult(toId, fn, m), 90 * 1000);
};
async function startDayDiscussionPhase(toId, nightEvents, fn, m) {
  const gameState = werewolfSessions[toId];
  if (!gameState) return;
  gameState.status = 'DISCUSSION';
  gameState.day++;
  let dayMessage = `☀️ Hari ke-${gameState.day} telah tiba.\n\n${nightEvents}\n\nWarga desa punya waktu 90 detik untuk berdiskusi sebelum voting dimulai.`;
  await fn.sendPesan(toId, dayMessage, m)
  gameState.phaseTimeout = setTimeout(() => startVotingPhase(toId, fn, m), 90 * 1000);
};
async function processNightActions(toId, fn, m) {
  const gameState = werewolfSessions[toId];
  if (!gameState || gameState.status !== 'NIGHT') return;
  const { pilihanWerewolf, pilihanGuardian } = gameState.aksiMalam;
  let nightEvents = "Suasana pagi ini tenang, tidak ada yang terbunuh.";
  if (pilihanWerewolf && pilihanWerewolf !== pilihanGuardian) {
    gameState.pemain[pilihanWerewolf].isAlive = false;
    nightEvents = `Warga desa menemukan mayat @${pilihanWerewolf.split('@')[0]}! Dia telah dibunuh oleh werewolf.`;
  } else if (pilihanWerewolf && pilihanWerewolf === pilihanGuardian) {
    nightEvents = `Werewolf mencoba membunuh @${pilihanWerewolf.split('@')[0]}, tetapi seorang Guardian berhasil melindunginya!`;
  }
  const winner = checkPemenang(gameState);
  if (winner) {
    await endGame(toId, `Pemenangnya adalah Tim ${winner}!`, fn, m);
  } else {
    startDayDiscussionPhase(toId, nightEvents, fn, m);
  }
};
async function startNightPhase(toId, fn, m) {
  const gameState = werewolfSessions[toId];
  if (!gameState) return;
  gameState.status = 'NIGHT';
  gameState.aksiMalam = {};
  await fn.sendPesan(toId, `🌙 Malam telah tiba. Semua warga tertidur. Para peran khusus, silakan cek pesan pribadi untuk beraksi. Waktu 90 detik.`, m);
  const livingPlayersForDm = Object.values(gameState.pemain)
    .filter(p => p.isAlive)
    .map((p, i) => `${i + 1}. @${p.id.split('@')[0]}`)
    .join('\n');
  for (const playerJid in gameState.pemain) {
    const player = gameState.pemain[playerJid];
    if (player.isAlive) {
      let dmMessage = `Malam ke-${gameState.day}. Peranmu: *${player.role}* ${emoji_role(player.role)}.\n\n`;
      let commandInstruction = "";
      switch (player.role) {
        case 'werewolf':
          commandInstruction = "Ketik `.w kill <nomor>` untuk membunuh target.";
          break;
        case 'seer':
          commandInstruction = "Ketik `.w see <nomor>` untuk melihat peran target.";
          break;
        case 'guardian':
          commandInstruction = "Ketik `.w protect <nomor>` untuk melindungi target.";
          break;
        case 'sorcerer':
          commandInstruction = "Ketik `.w check <nomor>` untuk memeriksa peran target.";
          break;
        default:
          commandInstruction = "Berdoalah agar kamu selamat sampai pagi.";
          break;
      }
      if (['werewolf', 'seer', 'guardian', 'sorcerer'].includes(player.role)) {
        dmMessage += `Pilih targetmu:\n${livingPlayersForDm}\n\n${commandInstruction}`;
      } else {
        dmMessage += commandInstruction;
      }
      await fn.sendPesan(player.id, dmMessage, m);
    }
  }
  gameState.phaseTimeout = setTimeout(() => processNightActions(toId, fn, m), 90 * 1000);
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info Othello ────────────────────────

const PLAYER_BLACK = 1;
const PLAYER_WHITE = 2;
const fileLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rankLabels = ['1', '2', '3', '4', '5', '6', '7', '8'];

function createOthelloBoard() {
  const board = Array(8).fill(null).map(() => Array(8).fill(0));
  board[3][4] = PLAYER_BLACK;
  board[4][3] = PLAYER_BLACK;
  board[3][3] = PLAYER_WHITE;
  board[4][4] = PLAYER_WHITE;
  return board;
};
function getOthelloFlips(board, player, r, c) {
  if (board[r]?.[c] !== 0) return [];
  const opponent = player === PLAYER_BLACK ? PLAYER_WHITE : PLAYER_BLACK;
  const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  let allFlips = [];
  for (const [dr, dc] of directions) {
    let flipsInDir = [];
    let curr_r = r + dr;
    let curr_c = c + dc;
    while (curr_r >= 0 && curr_r < 8 && curr_c >= 0 && curr_c < 8) {
      if (board[curr_r][curr_c] === opponent) {
        flipsInDir.push([curr_r, curr_c]);
      } else if (board[curr_r][curr_c] === player) {
        allFlips.push(...flipsInDir);
        break;
      } else {
        break;
      }
      curr_r += dr;
      curr_c += dc;
    }
  }
  return allFlips;
};
function getValidOthelloMoves(board, player) {
  const validMoves = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const flips = getOthelloFlips(board, player, r, c);
      if (flips.length > 0) {
        validMoves.push({ move: [r, c], flips: flips.length });
      }
    }
  }
  return validMoves;
};
function makeOthelloMove(board, player, move) {
  const [r, c] = move;
  const flips = getOthelloFlips(board, player, r, c);
  if (flips.length === 0) return null;
  const newBoard = board.map(row => [...row]);
  newBoard[r][c] = player;
  for (const [fr, fc] of flips) {
    newBoard[fr][fc] = player;
  }
  return newBoard;
};
function calculateOthelloScore(board) {
  let black = 0, white = 0;
  board.forEach(row => row.forEach(cell => {
    if (cell === PLAYER_BLACK) black++;
    if (cell === PLAYER_WHITE) white++;
  }));
  return { black, white };
};
function parseOthelloMove(input) {
  const match = input.toLowerCase().match(/^([a-h])([1-8])$/);
  if (!match) return null;
  const col = match[1].charCodeAt(0) - 'a'.charCodeAt(0);
  const row = parseInt(match[2], 10) - 1;
  return [row, col];
};
async function generateOthelloBoardImage(board, validMoves = []) {
  const squareSize = 50;
  const boardSize = squareSize * 8;
  const canvas = createCanvas(boardSize, boardSize);
  const ctx = canvas.getContext('2d');
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      ctx.fillStyle = '#008037';
      ctx.fillRect(c * squareSize, r * squareSize, squareSize, squareSize);
      ctx.strokeStyle = '#004C28';
      ctx.strokeRect(c * squareSize, r * squareSize, squareSize, squareSize);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = 'bold 12px Arial';
      if (c === 0) {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(rankLabels[r], c * squareSize + 3, r * squareSize + 3);
      }
      if (r === 7) {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(fileLabels[c], (c + 1) * squareSize - 3, (r + 1) * squareSize - 3);
      }
    }
  }
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  for (const { move } of validMoves) {
    const [r, c] = move;
    const x = c * squareSize + squareSize / 2;
    const y = r * squareSize + squareSize / 2;
    ctx.beginPath();
    ctx.arc(x, y, squareSize * 0.15, 0, 2 * Math.PI);
    ctx.fill();
  }
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const player = board[r][c];
      if (player === 0) continue;
      const x = c * squareSize + squareSize / 2;
      const y = r * squareSize + squareSize / 2;
      ctx.fillStyle = (player === PLAYER_BLACK) ? 'black' : 'white';
      ctx.strokeStyle = (player === PLAYER_BLACK) ? '#555' : '#CCC';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, squareSize * 0.4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }
  return canvas.toBuffer('image/png');
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info Sudoku ─────────────────────────

function parseSudokuCoord(input) {
  const match = input.toLowerCase().match(/^([a-i])([1-9])$/);
  if (!match) return null;
  const col = match[1].charCodeAt(0) - 'a'.charCodeAt(0);
  const row = parseInt(match[2], 10) - 1;
  return row * 9 + col;
};
async function generateSudokuBoardImage(puzzle, board, errorIndices = []) {
  const squareSize = 45;
  const boardSize = squareSize * 9;
  const canvas = createCanvas(boardSize, boardSize);
  const ctx = canvas.getContext('2d');
  const colLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  const rowLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const index = r * 9 + c;
      const x = c * squareSize;
      const y = r * squareSize;
      ctx.fillStyle = 'white';
      ctx.fillRect(x, y, squareSize, squareSize);
      ctx.strokeStyle = '#DDDDDD';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, squareSize, squareSize);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.font = 'bold 12px Arial';
      if (c === 0) {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(rowLabels[r], x + 3, y + 3);
      }
      if (r === 8) {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(colLabels[c], x + squareSize - 3, y + squareSize - 3);
      }
      const playerNum = board[index];
      if (playerNum !== null) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const isPuzzleNum = puzzle[index] !== null;
        let numberColor = '#0055CC';
        if (isPuzzleNum) {
          numberColor = 'black';
        } else if (errorIndices.includes(index)) {
          numberColor = '#D32F2F';
        }
        ctx.fillStyle = numberColor;
        ctx.font = isPuzzleNum ? 'bold 28px Arial' : '26px Arial';
        ctx.fillText(playerNum + 1, x + squareSize / 2, y + squareSize / 2);
      }
    }
  }
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2.5;
  for (let i = 0; i <= 9; i++) {
    if (i % 3 === 0) {
      ctx.beginPath();
      ctx.moveTo(i * squareSize, 0);
      ctx.lineTo(i * squareSize, boardSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * squareSize);
      ctx.lineTo(boardSize, i * squareSize);
      ctx.stroke();
    }
  }
  return canvas.toBuffer('image/png');
};

// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info ────────────────────────────────

async function getSerial(m, store) {
  if (m.key?.fromMe) return;
  const sender = m.sender;
  if (sender?.endsWith('@lid') && store) {
    return await findJidByLid(store, sender) || sender;
  }
  return sender;
};
async function processContactUpdate(contact, store) {
  let trueJid;
  const idFromEvent = contact.id;
  if (idFromEvent.endsWith('@s.whatsapp.net')) {
    trueJid = jidNormalizedUser(idFromEvent);
  } else if (idFromEvent.endsWith('@lid')) {
    trueJid = await findJidByLid(store, idFromEvent);
  }
  if (!trueJid) return;
  const dataToUpdate = {};
  const nameToUpdate = contact.notify || contact.name;
  if (idFromEvent.endsWith('@lid')) {
    dataToUpdate.lid = idFromEvent;
  }
  if (nameToUpdate) {
    dataToUpdate.name = nameToUpdate;
  }
  if (Object.keys(dataToUpdate).length === 0) return;
  await updateContact(store, trueJid, dataToUpdate);
};
async function updateContact(store, jid, data = {}) {
  if (!jid || !jid.endsWith('@s.whatsapp.net')) return;
  const existingData = store.contacts[jid] || {};
  const newData = {
    ...existingData,
    id: jid,
    ...(data.lid ? { lid: data.lid } : {}),
    ...(data.name ? { name: data.name } : {})
  };
  const isChanged = Object.keys(newData).some(key => newData[key] !== existingData[key]);
  if (!isChanged) return;
  store.contacts[jid] = newData;
  storeDirty = true;
};
async function findJidByLid(store, lid) {
  if (!store || !store.contacts) {
    return null;
  }
  for (const contact of Object.values(store.contacts)) {
    if (contact.lid === lid) {
      return contact.id;
    }
  }
  return null;
};
async function updateMessageStore(storage, key, data, maxSize) {
  if (!key || !data) return;
  if (!storage[key]) {
    storage[key] = { array: [], keyId: new Set() };
  }
  if (!(storage[key].keyId instanceof Set)) {
    storage[key].keyId = new Set(storage[key].array.map(item => item?.key?.id || item?.keyId));
  }
  const dataId = data?.key?.id || data?.keyId;
  if (!dataId) return;
  if (storage[key].keyId.has(dataId)) {
    const existingIndex = storage[key].array.findIndex(item => (item?.key?.id || item?.keyId) === dataId);
    if (existingIndex !== -1) {
      storage[key].array[existingIndex].isDuplicate = true;
    }
    return;
  }
  const dataToStore = { ...data };
  if (dataToStore.metadata) {
    delete dataToStore.metadata;
  }
  storage[key].array.push(dataToStore);
  storage[key].keyId.add(dataId);
  if (storage[key].array.length > maxSize) {
    const removed = storage[key].array.shift();
    const removedId = removed?.key?.id || removed?.keyId;
    if (removedId) storage[key].keyId.delete(removedId);
  }
  storeDirty = true;
};
async function shutdown() {
  if (isPm2) {
    try {
      await exec(`pm2 stop ${process.env.pm_id}`);
    } catch {
      process.exit(1);
    }
  } else {
    process.exit(0);
  }
};
async function handleRestart(reason) {
  const currentRestarts = parseInt(process.env.RESTART_ATTEMPTS || '0', 10);
  const nextAttempt = currentRestarts + 1;
  if (currentRestarts >= MAX_RECONNECT_ATTEMPTS) {
    await log(`Gagal total setelah ${MAX_RECONNECT_ATTEMPTS} percobaan. Alasan: ${reason}`);
    process.exit(1);
  }
  await log(`Terjadi error: ${reason}`);
  await log(`Mencoba restart otomatis #${nextAttempt} dalam ${RECONNECT_DELAY_MS / 1000}s...`);
  await delay(RECONNECT_DELAY_MS);
  if (isPm2) {
    await log(`Dijalankan via PM2 → menyerahkan restart ke PM2`);
    process.exit(1);
  } else {
    await log(`Restart manual via spawn`);
    spawn(process.argv[0], process.argv.slice(1), {
      detached: true,
      stdio: 'inherit',
      env: {
        ...process.env,
        RESTART_ATTEMPTS: nextAttempt.toString(),
        RESTARTED_BY_SELF: '1'
      }
    });
    process.exit(0);
  }
};
async function handleGroupStubMessages(fn, m, store) {
  if (!m.chat) return;
  let needsMetadataRefresh = false;
  const normalizedTarget = m.messageStubParameters?.[0];
  if (!normalizedTarget) return;
  switch (m.messageStubType) {
    case 20:
    case 27:
    case 29:
    case 30:
      needsMetadataRefresh = true;
      break;
    case 28:
    case 32:
      if (m.fromMe && (jidNormalizedUser(fn.user.id) === normalizedTarget)) return;
      needsMetadataRefresh = true;
      break;
    case 172: {
      const pendingParticipants = await fn.groupRequestParticipantsList(m.key.remoteJid);
      for (const request of pendingParticipants) {
        let requesterJid;
        if (request.jid.endsWith('@lid')) {
          requesterJid = request.phone_number;
        } else {
          requesterJid = request.jid;
        }
        if (dbMuted.blockedUser.includes(requesterJid)) {
          await log(`${requesterJid} ditolak karena ada di daftar blokir.`);
          return;
        }
        if (otpSessions[requesterJid]) return;
        const verificationSetting = dbGroups.verifyMember.find(v => v.chatid === m.key.remoteJid);
        if (!verificationSetting || verificationSetting.state === false) return;
        const otp = generateOTP();
        otpSessions[requesterJid] = {
          otp: otp,
          gid: m.key.remoteJid,
          timestamp: Date.now(),
          attempts: 0
        };
        try {
          await fn.sendPesan(requesterJid, `🔒 *Kode Verifikasi Grup*\n\nUntuk melanjutkan proses persetujuan, silakan kirim kode berikut:\n\n*${otp}*`, m);
        } catch (error) {
          await log(`Gagal mengirim OTP ke ${requesterJid}\n${error}`, true);
        }
      }
      break;
    }
    default:
      if (m.messageStubType !== 2) {
        await log({ messageStubType: m.messageStubType, messageStubParameters: m.messageStubParameters, type: WAMessageStubType[m.messageStubType] });
      }
      break;
  }
  if (needsMetadataRefresh) {
    try {
      const freshMetadata = await fn.groupMetadata(m.chat);
      if (!freshMetadata) return;
      store.groupMetadata[m.chat] = freshMetadata;
      if (freshMetadata.participants) {
        for (const participant of freshMetadata.participants) {
          const contactJid = jidNormalizedUser(participant.id);
          const contactName = fn.getName(contactJid);
          await updateContact(store, contactJid, { lid: participant.lid, name: contactName });
        }
      }
      storeDirty = true;
    } catch (error) {
      await log(`Error handleGroupStubMessages ${m.chat}\n${error}`, true);
    }
  }
};
async function handleStatusBroadcast(m, store) {
  if (m.fromMe) return;
  const senderJid = m.key.participant;
  if (!senderJid) return;
  const statusContent = m.message && m.message[m.type] ? m.message[m.type] : m.message;
  if (m.type === 'protocolMessage' && statusContent?.type === 0) {
    const idToRevoke = statusContent.key.id;
    if (store.status?.[senderJid]) {
      const originalLength = store.status[senderJid].array.length;
      store.status[senderJid].array = store.status[senderJid].array.filter(
        statusMsg => statusMsg.key.id !== idToRevoke
      );
      if (store.status[senderJid].array.length !== originalLength) {
        storeDirty = true;
      }
    }
    return;
  }
  await updateMessageStore(store.status, senderJid, m, 20);
};
async function gifToWebp(media) {
  const tmpFileIn = path.join(global.tmpDir, `${global.randomSuffix}.gif`);
  const tmpFileOut = path.join(global.tmpDir, `${global.randomSuffix}.webp`);
  await fs.writeFile(tmpFileIn, media);
  await new Promise((resolve, reject) => {
    ffmpeg(tmpFileIn)
      .on('error', reject)
      .on('end', () => resolve(true))
      .addOutputOptions([
        '-vf', 'scale=512:512:force_original_aspect_ratio=decrease',
        '-loop', '0',
        '-preset', 'default',
        '-an', '-vsync', '0'
      ])
      .toFormat('webp')
      .save(tmpFileOut)
  });
  const buff = await fs.readFile(tmpFileOut);
  await deleteFile(tmpFileOut);
  await deleteFile(tmpFileIn);
  return buff;
};
async function imageToWebp(media) {
  const tmpFileOut = path.join(global.tmpDir, `${global.randomSuffix}.webp`);
  const tmpFileIn = path.join(global.tmpDir, `${global.randomSuffix}.png`);
  await fs.writeFile(tmpFileIn, media);
  await new Promise((resolve, reject) => {
    ffmpeg(tmpFileIn)
      .on('error', reject)
      .on('end', () => resolve(true))
      .addOutputOptions([
        '-vcodec', 'libwebp', '-vf',
        'scale=500:500:force_original_aspect_ratio=decrease,setsar=1, pad=500:500:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse',
        '-loop', '0', '-preset', 'default'
      ])
      .toFormat('webp')
      .save(tmpFileOut)
  });
  const buff = await fs.readFile(tmpFileOut);
  await deleteFile(tmpFileOut);
  await deleteFile(tmpFileIn);
  return buff;
};
async function videoToWebp(media) {
  const tmpFileOut = path.join(global.tmpDir, `${global.randomSuffix}.webp`);
  const tmpFileIn = path.join(global.tmpDir, `${global.randomSuffix}.mp4`);
  await fs.writeFile(tmpFileIn, media);
  await new Promise((resolve, reject) => {
    ffmpeg(tmpFileIn)
      .on('error', reject)
      .on('end', () => resolve(true))
      .addOutputOptions([
        '-vcodec',
        'libwebp',
        '-vf',
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
        '-loop',
        '0',
        '-ss',
        '00:00:00',
        '-t',
        '00:00:05',
        '-preset',
        'default',
        '-an',
        '-vsync',
        '0'
      ])
      .toFormat('webp')
      .save(tmpFileOut)
  });
  const buff = await fs.readFile(tmpFileOut);
  await deleteFile(tmpFileOut);
  await deleteFile(tmpFileIn);
  return buff;
};
async function writeExif(media, data) {
  const fileType = await FileType.fromBuffer(media);
  if (!fileType) throw new Error('Error_writeExif_FileType');
  let wMedia;
  if (/webp/.test(fileType.mime)) {
    wMedia = media;
  } else if (/image\/gif/.test(fileType.mime)) {
    wMedia = await gifToWebp(media);
  } else if (/jpeg|jpg|png/.test(fileType.mime)) {
    wMedia = await imageToWebp(media);
  } else if (/video/.test(fileType.mime)) {
    wMedia = await videoToWebp(media);
  } else {
    throw new Error('Error_writeExif');
  }
  const tmpFileIn = path.join(global.tmpDir, `${global.randomSuffix}.webp`);
  const tmpFileOut = path.join(global.tmpDir, `FN-${global.randomSuffix}.webp`);
  await fs.writeFile(tmpFileIn, wMedia);
  if (data) {
    const img = new webp.Image();
    const {
      wra = data.pack_id || dbSettings.packID,
      wrb = data.packname || dbSettings.packName,
      wrc = data.author || dbSettings.packAuthor,
      wrd = data.categories || [''],
      wre = data.isAvatar || 0,
      ...wrf
    } = data;
    const json = {
      'sticker-pack-id': wra,
      'sticker-pack-name': wrb,
      'sticker-pack-publisher': wrc,
      'emojis': wrd,
      'is-avatar-sticker': wre,
      ...wrf
    };
    const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
    const jsonBuff = Buffer.from(JSON.stringify(json), 'utf-8');
    const exif = Buffer.concat([exifAttr, jsonBuff]);
    exif.writeUIntLE(jsonBuff.length, 14, 4);
    await img.load(tmpFileIn);
    await deleteFile(tmpFileIn);
    img.exif = exif;
    await img.save(tmpFileOut);
    return tmpFileOut;
  } else {
    return tmpFileIn;
  };
};
async function getBuffer(url, options = {}) {
  try {
    const response = await axios.get(url, {
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      responseType: 'arraybuffer',
      ...options
    });
    return response.data;
  } catch (error) {
    await log(`Error getBuffer ${url}\n${error}`, true);
    throw error;
  }
};
async function updateMyGroup(fn) {
  try {
    const allGroups = await fn.groupFetchAllParticipating();
    mygroup = Object.keys(allGroups).filter(id => id.endsWith('@g.us'));
    mygroupMembers = {};
    for (const id of mygroup) {
      const meta = allGroups[id];
      mygroupMembers[id] = meta.participants.map(p => ({
        id: p.id,
        admin: p.admin === 'admin' || p.admin === 'superadmin',
      }));
    };
  } catch (error) {
    await log(`Error updateMyGroup:\n${error}`, true);
  };
};
async function getSizeMedia(crots) {
  return new Promise((resolve, reject) => {
    if (typeof crots === 'string' && /http/.test(crots)) {
      axios.get(crots).then((res) => {
        let length = parseInt(res.headers['content-length']);
        if (!isNaN(length)) resolve(bytesToSize(length, 3));
      });
    } else if (Buffer.isBuffer(crots)) {
      let length = Buffer.byteLength(crots);
      if (!isNaN(length)) resolve(bytesToSize(length, 3));
    } else {
      reject(0);
    };
  });
};
async function clientBot(fn, store) {
  fn.decodeJid = (jid = '') => {
    try {
      if (typeof jid !== 'string' || jid.length === 0) return jid;
      if (jid.includes(':')) {
        const decode = jidDecode(jid);
        if (decode?.user && decode?.server) {
          return `${decode.user}@${decode.server}`;
        };
      };
      return jid;
    } catch (error) {
      log(`Error decodeJid: ${jid}\n${error}`, true);
      return jid;
    };
  };
  let botNumber = fn.decodeJid(fn.user?.id);
  fn.getName = (jid) => {
    let id = jidNormalizedUser(jid);
    if (id === botNumber) {
      return fn.user?.name;
    }
    if (id.endsWith("g.us")) {
      let metadata = store.groupMetadata?.[id];
      return metadata ? metadata.subject : "none";
    } else {
      let metadata = store?.contacts?.[id];
      return (metadata?.name || metadata?.verifiedName || metadata?.notify || "Unknown?");
    }
  };
  fn.getFile = async (path, save) => {
    let res;
    let filename;
    let data = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : await fs.readFile(path) ? (filename = path, await fs.readFile(path)) : typeof path === 'string' ? path : Buffer.alloc(0)
    let type = await FileType.fromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin' }
    filename = path.join(global.tmpDir, new Date * 1 + '.' + type.ext)
    if (data && save) fs.writeFile(filename, data)
    return {
      res,
      filename,
      size: await getSizeMedia(data),
      ...type,
      data
    }
  };
  fn.sendMediaMessage = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
    const { mime, data, filename } = await fn.getFile(path, true);
    const isWebpSticker = options.asSticker || /webp/.test(mime);
    let type = 'document', mimetype = mime, pathFile = filename;
    if (isWebpSticker) {
      pathFile = await writeExif(data, {
        packname: options.packname || dbSettings.packName,
        author: options.author || dbSettings.packAuthor,
        categories: options.categories || [''],
      })
      await deleteFile(filename);
      type = 'sticker';
      mimetype = 'image/webp';
    } else if (/image|video|audio/.test(mime)) {
      type = mime.split('/')[0];
      mimetype = type == 'video' ? 'video/mp4' : type == 'audio' ? 'audio/mpeg' : mime
    }
    let anu = await fn.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ephemeralExpiration: quoted?.expiration ?? store?.messages?.[jid]?.array?.slice(-1)[0]?.expiration ?? 0, messageId: randomByte(32), ...options });
    await deleteFile(pathFile);
    return anu;
  };
  fn.sendPesan = async (chat, content, crot = {}) => {
    const isMessageObject = crot && (crot.expiration !== undefined || crot.chat !== undefined);
    const ephemeralExpiration = isMessageObject ? crot.expiration ?? store?.messages?.[crot.chat]?.array?.slice(-1)[0]?.expiration ?? 0 : store?.messages?.[chat]?.array?.slice(-1)[0]?.expiration ?? 0;
    const options = isMessageObject ? {} : crot || {};
    let mentions = [];
    if (typeof content === 'string' || typeof content?.text === 'string' || typeof content?.caption === 'string') {
      const textToParse = content.text || content.caption || content;
      mentions = [...textToParse.matchAll(/@(\d{0,16})(@lid|@s\.whatsapp\.net)?/g)]
        .map(v => v[1] + (v[2] || '@s.whatsapp.net'));
    }
    const opts = typeof content === 'object' ? { ...options, ...content } : { ...options, mentions };
    if (typeof content === 'object') {
      return await fn.sendMessage(chat, content, { ...opts, ephemeralExpiration, messageId: randomByte(32) });
    } else if (typeof content === 'string') {
      try {
        if (/^https?:\/\//.test(content)) {
          const data = await axios.get(content, { responseType: 'arraybuffer' });
          const mime = data.headers['content-type'] || (await FileType.fromBuffer(data.data))?.mime;
          const finalCaption = opts.caption || '';
          if (/gif|image|video|audio|pdf|stream/i.test(mime)) {
            return await fn.sendMediaMessage(chat, data.data, '', finalCaption, opts);
          } else {
            return await fn.sendMessage(chat, { text: content, ...opts }, { ephemeralExpiration, messageId: randomByte(32) });
          }
        } else {
          return await fn.sendMessage(chat, { text: content, ...opts }, { ephemeralExpiration, messageId: randomByte(32) });
        }
      } catch {
        return await fn.sendMessage(chat, { text: content, ...opts }, { ephemeralExpiration, messageId: randomByte(32) });
      }
    }
  };
  fn.sendReply = async (chat, content, options = {}) => {
    const quoted = options.quoted || options.m || null;
    const ephemeralExpiration = options?.quoted?.expiration ?? store?.messages?.[chat]?.array?.slice(-1)[0]?.expiration ?? 0;
    let mentions = [];
    if (typeof content === 'string' || typeof content?.text === 'string' || typeof content?.caption === 'string') {
      const textToParse = content.text || content.caption || content;
      mentions = [...textToParse.matchAll(/@(\d{0,16})(@lid|@s\.whatsapp\.net)?/g)]
        .map(v => v[1] + (v[2] || '@s.whatsapp.net'));
    }
    const opts = typeof content === 'object' ? { ...options, ...content } : { ...options, mentions };
    if (typeof content === 'object') {
      return await fn.sendMessage(chat, content, { ...opts, quoted, ephemeralExpiration, messageId: randomByte(32) });
    } else if (typeof content === 'string') {
      try {
        if (/^https?:\/\//.test(content)) {
          const data = await axios.get(content, { responseType: 'arraybuffer' });
          const mime = data.headers['content-type'] || (await FileType.fromBuffer(data.data))?.mime;
          const finalCaption = opts.caption || '';
          if (/gif|image|video|audio|pdf|stream/i.test(mime)) {
            return await fn.sendMediaMessage(chat, data.data, '', finalCaption, quoted, opts);
          } else {
            return await fn.sendMessage(chat, { text: content, ...opts }, { quoted, ephemeralExpiration, messageId: randomByte(32) });
          }
        } else {
          return await fn.sendMessage(chat, { text: content, ...opts }, { quoted, ephemeralExpiration, messageId: randomByte(32) });
        }
      } catch {
        return await fn.sendMessage(chat, { text: content, ...opts }, { quoted, ephemeralExpiration, messageId: randomByte(32) });
      }
    }
  };
  fn.sendAudioTts = async (jid, audioURL, quoted) => {
    const tempFilePath = path.join(global.tmpDir, `resId-${Date.now()}.mp3`);
    try {
      await new Promise((resolve, reject) => {
        ttsId.save(tempFilePath, audioURL, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      await fn.sendMessage(jid, { audio: { stream: fs.createReadStream(tempFilePath) }, mimetype: 'audio/mpeg', }, { quoted, ephemeralExpiration: quoted?.expiration ?? store?.messages?.[jid]?.array?.slice(-1)[0]?.expiration ?? 0, messageId: randomByte(32) });
    } catch (error) {
      await log(`Error sendAudioTts:\n${error}`, true);
    } finally {
      await deleteFile(tempFilePath);
    }
  };
  fn.sendContact = async (jid, displayName, contactName, nomor, quoted) => {
    const vcard =
      `BEGIN:VCARD\n` +
      `VERSION:3.0\n` +
      `N:${displayName}\n` +
      `FN:${contactName}\n` +
      `ORG:${contactName}\n` +
      `TEL;type=CELL;type=VOICE;waid=${nomor}:+${nomor}\n` +
      `END:VCARD`;
    await fn.sendMessage(jid, { contacts: { displayName: displayName, contacts: [{ vcard }] } }, { quoted, ephemeralExpiration: quoted?.expiration ?? store?.messages?.[jid]?.array?.slice(-1)[0]?.expiration ?? 0, messageId: randomByte(32) });
  };
  fn.sendMediaByType = async (jid, mime, dataBuffer, caption, quoted, options) => {
    const quotedOptions = {
      quoted,
      ephemeralExpiration: quoted?.expiration ?? store?.messages?.[jid]?.array?.slice(-1)[0]?.expiration ?? 0,
      messageId: randomByte(32),
      ...options
    };
    if (!mime) {
      return await fn.sendMessage(jid, { document: dataBuffer, mimetype: 'application/octet-stream', fileName: 'file', caption, ...options }, quotedOptions);
    }
    if (mime.includes('gif')) {
      return await fn.sendMessage(jid, { video: dataBuffer, caption, gifPlayback: true, ...options }, quotedOptions);
    } else if (mime.startsWith('image/')) {
      if (mime === 'image/webp') {
        return await fn.sendRawWebpAsSticker(jid, dataBuffer, quoted, options);
      }
      return await fn.sendMessage(jid, { image: dataBuffer, caption, ...options }, quotedOptions);
    } else if (mime.startsWith('video/')) {
      return await fn.sendMessage(jid, { video: dataBuffer, caption, mimetype: mime, ...options }, quotedOptions);
    } else if (mime.startsWith('audio/')) {
      return await fn.sendMessage(jid, { audio: dataBuffer, mimetype: mime, ...options }, quotedOptions);
    } else {
      return await fn.sendMessage(jid, { document: dataBuffer, mimetype: mime, fileName: `file.${mime.split('/')[1] || 'bin'}`, caption, ...options }, quotedOptions);
    }
  };
  fn.getMediaBuffer = async (message) => {
    try {
      if (!message) throw new Error('Input untuk getMediaBuffer kosong');
      let messageType;
      let mediaMessage = message;
      if (message.mimetype) {
        const type = message.mimetype.split('/')[0];
        if (type === 'audio') messageType = 'audio';
        else if (type === 'image') messageType = 'image';
        else if (type === 'video') messageType = 'video';
        else if (type === 'sticker') messageType = 'sticker';
        else messageType = 'document';
      } else {
        const foundKey = Object.keys(message).find((key) =>
          ["imageMessage", "videoMessage", "stickerMessage", "audioMessage", "documentMessage"].includes(key)
        );
        if (foundKey) {
          messageType = foundKey.replace("Message", "");
          mediaMessage = message[foundKey];
        }
      }
      if (!messageType) throw new Error('Error_getMediaBuffer_media_tidak_valid');
      const stream = await downloadContentFromMessage(
        mediaMessage,
        messageType
      );
      if (!stream) throw new Error("Error_getMediaBuffer_stream");
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      if (buffer.length === 0) throw new Error("Error_getMediaBuffer_buffer_kosong");
      return buffer;
    } catch (error) {
      await log(`Error getMediaBuffer:\n${error}`, true);
      return null;
    }
  };
  fn.removeParticipant = async (jid, target) => {
    await fn.groupParticipantsUpdate(jid, [target], "remove");
  };
  fn.promoteParticipant = async (jid, target) => {
    await fn.groupParticipantsUpdate(jid, [target], "promote");
  };
  fn.demoteParticipant = async (jid, target) => {
    await fn.groupParticipantsUpdate(jid, [target], "demote");
  };
  fn.sendRawWebpAsSticker = async (jid, path, quoted, options = {}) => {
    const buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : await fs.readFile(path) ? await fs.readFile(path) : Buffer.alloc(0);
    const result = await writeExif(buff, options);
    await fn.sendMessage(jid, { sticker: { url: result }, ...options }, { quoted, ephemeralExpiration: quoted?.expiration ?? store?.messages?.[jid]?.array?.slice(-1)[0]?.expiration ?? 0, messageId: randomByte(32), ...options });
    await deleteFile(result);
  };
  fn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
    const quotedOptions = {
      quoted,
      ephemeralExpiration: quoted?.expiration ?? store?.messages?.[jid]?.array?.slice(-1)[0]?.expiration ?? 0,
      messageId: randomByte(32),
      ...options
    };
    async function getFileUrl(res, mime) {
      const data = res.data;
      if (!mime) return;
      if (mime.includes('gif')) {
        return await fn.sendMessage(jid, { video: data, caption, gifPlayback: true, ...options }, quotedOptions);
      } else if (mime === 'application/pdf') {
        return await fn.sendMessage(jid, { document: data, mimetype: mime, caption, ...options }, quotedOptions);
      } else if (mime.startsWith('image/')) {
        return await fn.sendMessage(jid, { image: data, caption, ...options }, quotedOptions);
      } else if (mime.startsWith('video/')) {
        return await fn.sendMessage(jid, { video: data, caption, mimetype: mime, ...options }, quotedOptions);
      } else if (mime === 'image/webp') {
        return await fn.sendRawWebpAsSticker(jid, data, quoted, options);
      } else if (mime.startsWith('audio/')) {
        return await fn.sendMessage(jid, { audio: data, mimetype: mime, ptt: true, ...options }, quotedOptions);
      }
    }
    const res = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
      family: 4,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' }
    });
    let mime = res.headers['content-type'];
    if (!mime || mime.includes('octet-stream')) {
      const fileType = await FileType.fromBuffer(res.data);
      mime = fileType?.mime || null;
    }
    return await getFileUrl(res, mime);
  };
  fn.sendFileUrl2 = async (jid, url, caption, quoted, options = {}) => {
    try {
      if (url.startsWith('data:')) {
        const [meta, data] = url.split(',');
        const mime = meta.match(/:(.*?);/)[1];
        const buffer = Buffer.from(data, 'base64');
        const quotedOptions = { quoted, ...options };
        let messageContent = {};
        if (mime.includes('gif')) {
          return await fn.sendMessage(jid, { video: buffer, caption, gifPlayback: true, ...options }, quotedOptions);
        } else if (mime.startsWith('image/')) {
          messageContent = { image: buffer, caption, ...options };
        } else if (mime.startsWith('video/')) {
          messageContent = { video: buffer, caption, mimetype: mime, ...options };
        } else if (mime.startsWith('audio/')) {
          messageContent = { audio: buffer, mimetype: mime, ...options };
        } else {
          messageContent = { document: buffer, mimetype: mime, fileName: caption || 'file', ...options };
        }
        return await fn.sendMessage(jid, messageContent, quotedOptions);
      }
      const MAX_FILE_SIZE_BYTES = 1024 * 1024 * 1024;
      const headResponse = await axios({
        method: 'head',
        url: url,
        family: 4,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' }
      });
      const contentLength = headResponse.headers['content-length'];
      if (contentLength && parseInt(contentLength, 10) > MAX_FILE_SIZE_BYTES) throw new Error(`File terlalu besar (>${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB).`);
      const dataResponse = await axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer',
        family: 4,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' }
      });
      const dataBuffer = dataResponse.data;
      let mimeType = dataResponse.headers['content-type'];
      if (!mimeType || mimeType.includes('octet-stream')) {
        const fileType = await FileType.fromBuffer(dataBuffer);
        mimeType = fileType?.mime || null;
      }
      return await fn.sendMediaByType(jid, mimeType, dataBuffer, caption, quoted, options);
    } catch (error) {
      throw new Error(error.message || 'Gagal mengambil atau mengirim file.');
    }
  };
  fn.sendFilePath = async (jid, caption, localPath, options = {}) => {
    try {
      if (!fs.existsSync(localPath)) throw new Error(`File tidak ditemukan di path: ${localPath}`);
      let mentions = [];
      if (caption && typeof caption === 'string') {
        mentions = [...caption.matchAll(/@(\d+)/g)].map(v => v[1] + '@s.whatsapp.net');
      }
      const fileType = await FileType.fromFile(localPath);
      const mime = fileType?.mime || 'application/octet-stream';
      const fileSizeInBytes = fs.statSync(localPath).size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      const quoted = options.quoted || null;
      const ephemeralExpiration = options?.quoted?.expiration ?? store?.messages?.[jid]?.array?.slice(-1)[0]?.expiration ?? 0;
      const quotedOptions = {
        quoted,
        ephemeralExpiration,
        ...options
      };
      let messageContent = {};
      const fileName = path.basename(localPath);
      if (fileSizeInMB > 200) {
        messageContent = {
          document: { stream: fs.createReadStream(localPath) },
          mimetype: mime,
          fileName: fileName,
          mentions: mentions,
          ...options
        };
      } else {
        if (mime.includes('gif')) {
          messageContent = { video: { stream: fs.createReadStream(localPath) }, gifPlayback: true, mentions: mentions, ...options };
        } else if (mime.startsWith('image/')) {
          messageContent = { image: { stream: fs.createReadStream(localPath) }, caption: caption, mentions: mentions, ...options };
        } else if (mime.startsWith('video/')) {
          messageContent = { video: { stream: fs.createReadStream(localPath) }, caption: caption, mentions: mentions, ...options };
        } else if (mime.startsWith('audio/')) {
          messageContent = { audio: { stream: fs.createReadStream(localPath) }, mimetype: 'audio/mpeg', mentions: mentions, ptt: true, ...options };
        } else {
          messageContent = { document: { stream: fs.createReadStream(localPath) }, mimetype: mime, fileName: fileName, mentions: mentions, ...options };
        }
      }
      return await fn.sendMessage(jid, messageContent, quotedOptions);
    } catch (error) {
      await log(`Error sendFilePath ${localPath}:\n${error}`, true);
      throw error;
    }
  };
  fn.extractGroupMetadata = (result) => {
    const group = getBinaryNodeChild(result, 'group');
    const descChild = getBinaryNodeChild(group, 'description');
    const desc = descChild ? getBinaryNodeChildString(descChild, 'body') : undefined;
    const descId = descChild?.attrs?.id;
    const groupId = group.attrs.id.includes('@') ? group.attrs.id : jidEncode(group.attrs.id, 'g.us');
    const eph = getBinaryNodeChild(group, 'ephemeral')?.attrs?.expiration;
    const participants = getBinaryNodeChildren(group, 'participant') || [];
    return {
      id: groupId,
      addressingMode: group.attrs.addressing_mode,
      subject: group.attrs.subject,
      subjectOwner: group.attrs.s_o?.endsWith('@lid') ? group.attrs.s_o_pn : group.attrs.s_o,
      subjectOwnerPhoneNumber: group.attrs.s_o_pn,
      subjectTime: +group.attrs.s_t,
      creation: +group.attrs.creation,
      size: participants.length,
      owner: group.attrs.creator?.endsWith('@lid') ? group.attrs.creator_pn : group.attrs.creator,
      ownerPhoneNumber: group.attrs.creator_pn ? jidNormalizedUser(group.attrs.creator_pn) : undefined,
      desc,
      descId,
      linkedParent: getBinaryNodeChild(group, 'linked_parent')?.attrs?.jid,
      restrict: !!getBinaryNodeChild(group, 'locked'),
      announce: !!getBinaryNodeChild(group, 'announcement'),
      isCommunity: !!getBinaryNodeChild(group, 'parent'),
      isCommunityAnnounce: !!getBinaryNodeChild(group, 'default_sub_group'),
      joinApprovalMode: !!getBinaryNodeChild(group, 'membership_approval_mode'),
      memberAddMode: getBinaryNodeChildString(group, 'member_add_mode') === 'all_member_add',
      ephemeralDuration: eph ? +eph : undefined,
      participants: participants.map(({ attrs }) => ({
        id: attrs.jid.endsWith('@lid') ? attrs.phone_number : attrs.jid,
        jid: attrs.jid.endsWith('@lid') ? attrs.phone_number : attrs.jid,
        lid: attrs.jid.endsWith('@lid') ? attrs.jid : attrs.lid,
        admin: attrs.type || null
      }))
    };
  };
  fn.groupMetadata = async (jid) => {
    const result = await fn.query({
      tag: 'iq',
      attrs: {
        type: 'get',
        xmlns: 'w:g2',
        to: jid
      },
      content: [{ tag: 'query', attrs: { request: 'interactive' } }]
    });
    return fn.extractGroupMetadata(result);
  };
  fn.groupFetchAllParticipating = async () => {
    const result = await fn.query({
      tag: 'iq',
      attrs: { to: '@g.us', xmlns: 'w:g2', type: 'get' },
      content: [{
        tag: 'participating',
        attrs: {},
        content: [
          { tag: 'participants', attrs: {} },
          { tag: 'description', attrs: {} }
        ]
      }]
    });
    const data = {};
    const groupsChild = getBinaryNodeChild(result, 'groups');
    if (groupsChild) {
      const groups = getBinaryNodeChildren(groupsChild, 'group');
      for (const groupNode of groups) {
        const meta = fn.extractGroupMetadata({
          tag: 'result',
          attrs: {},
          content: [groupNode]
        });
        if (meta.isCommunity) {
          continue;
        }
        if (meta.announce) {
          continue;
        }
        data[meta.id] = meta;
      }
    }
    fn.ev.emit('groups.update', Object.values(data));
    return data;
  };
  fn.sendGroupInvite = async (jid, participant, inviteCode, inviteExpiration, groupName = 'Unknown Subject', caption = 'Invitation to join my WhatsApp group', jpegThumbnail = null, options = {}) => {
    const msg = proto.Message.fromObject({
      groupInviteMessage: {
        inviteCode,
        inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
        groupJid: jid,
        groupName,
        jpegThumbnail: Buffer.isBuffer(jpegThumbnail) ? jpegThumbnail : null,
        caption,
        contextInfo: {
          mentionedJid: options.mentions || []
        }
      }
    });
    const message = generateWAMessageFromContent(participant, msg, options);
    const invite = await fn.relayMessage(participant, message.message, { messageId: message.key.id })
    return invite
  };
  fn.deleteBugMessage = async (key, timestamp) => {
    if (key.remoteJid.endsWith('@g.us')) {
      await fn.chatModify({ deleteForMe: { key, timestamp, deleteMedia: true } }, key.remoteJid);
      await fn.sendMessage(key.remoteJid, { delete: key });
    }
    await fn.chatModify({ deleteForMe: { key, timestamp, deleteMedia: true } }, key.remoteJid);
  };
  fn.handleGroupEventImage = async (idGroup, eventDetails) => {
    const { memberJid, eventText, subject, messageText } = eventDetails;
    const memberNum = memberJid.split('@')[0];
    let profilePictureUrl;
    try {
      profilePictureUrl = await fn.profilePictureUrl(memberJid, 'image');
    } catch {
      profilePictureUrl = './src/media/apatar.png';
    }
    const imageBuffer = await groupImage(memberNum, subject, eventText, profilePictureUrl);
    const outputPath = `./src/sampah/${Date.now()}_${memberNum}.png`;
    await fs.writeFile(outputPath, imageBuffer);
    const caption = `@${memberNum}\n\n${messageText}`;
    await fn.sendFilePath(idGroup, caption, outputPath);
    await deleteFile(outputPath);
  };
  fn.sendAlbum = async (jid, array, options = {}) => {
    if (!Array.isArray(array) || array.length < 2) throw new RangeError("Parameter 'array' harus berupa array dengan minimal 2 media.");
    const messageContent = {
      messageContextInfo: {
        messageSecret: randomByte(32),
      },
      albumMessage: {
        expectedImageCount: array.filter((a) => a.image).length,
        expectedVideoCount: array.filter((a) => a.video).length,
      }
    };
    const generationOptions = {
      userJid: fn.user.id,
      upload: fn.waUploadToServer,
      quoted: options?.quoted || null,
      ephemeralExpiration: options?.quoted?.expiration ?? store?.messages?.[jid]?.array?.slice(-1)[0]?.expiration ?? 0
    };
    const album = generateWAMessageFromContent(jid, messageContent, generationOptions);
    await fn.relayMessage(album.key.remoteJid, album.message, {
      messageId: album.key.id,
    });
    for (const content of array) {
      const mediaMessage = await generateWAMessage(album.key.remoteJid, content, {
        upload: fn.waUploadToServer,
        ephemeralExpiration: options?.quoted?.expiration ?? store?.messages?.[jid]?.array?.slice(-1)[0]?.expiration ?? 0
      });
      mediaMessage.message.messageContextInfo = {
        messageSecret: randomByte(32),
        messageAssociation: {
          associationType: 1,
          parentMessageKey: album.key,
        },
      };
      await fn.relayMessage(mediaMessage.key.remoteJid, mediaMessage.message, {
        messageId: mediaMessage.key.id,
      });
    }
    return album;
  };
  const originalOnWhatsApp = fn.onWhatsApp.bind(fn);
  fn.onWhatsApp = async (ids) => {
    if (!ids) return [{ jid: ids, exists: false, lid: null }];
    const officialResults = await originalOnWhatsApp(ids);
    const primaryResult = (officialResults && officialResults.length > 0) ? officialResults[0] : null;
    if (primaryResult && primaryResult.exists) return [{ jid: primaryResult.jid, exists: true, lid: primaryResult.lid || null }];
    let contact = null;
    if (isLidUser(ids)) {
      const lidToContactMap = Object.values(store.contacts || {}).reduce((map, currentContact) => {
        if (currentContact.lid) {
          map[currentContact.lid] = currentContact;
        }
        return map;
      }, {});
      contact = lidToContactMap[ids];
    }
    if (contact) return [{ jid: contact.id, exists: true, lid: contact.lid }];
    return [];
  };
  return fn
};
async function updateMessageUpsert(fn, message, store) {
  try {
    if (!message?.messages?.[0]) {
      await log(`Pesan tidak valid: struktur message salah`);
      return;
    }
    const msg = message.messages[0];
    if (debugs) {
      await log(util.inspect(msg, false, null, true));
    };
    if (!msg.messageTimestamp) {
      await log(`Pesan diabaikan: tidak ada timestamp`);
      return;
    }
    const m = await serializeMessage(fn, msg, store);
    try {
      const bugType = isBug(m);
      if (bugType && m.key.fromMe === false) {
        const senderJid = m.sender;
        await log(`Bug terdeteksi: "${bugType}" dari ${senderJid}.`);
        if (['Invalid Sender JID', 'TAMA Concuerror Bomb', 'Null-Byte Injection'].includes(bugType)) {
          await fn.updateBlockStatus(senderJid, 'block');
        }
        await fn.deleteBugMessage(m.key, m.messageTimestamp);
        return;
      }
    } catch (error) {
      await log(`Error dalam deteksi bug:\n${error}`, true);
    }
    if (m.messageStubType && m.isGroup) {
      await handleGroupStubMessages(fn, m, store);
      return;
    }
    if (m.key.remoteJid === 'status@broadcast') {
      if (m.messageStubType === 2) return;
      try {
        if (m.key.remoteJid && m.key.participant) {
          if (dbSettings.autolikestory) {
            await fn.sendMessage(
              m.key.remoteJid,
              { react: { key: m.key, text: "💚" } },
              {
                statusJidList: [
                  m.key.participant,
                  jidNormalizedUser(fn.user.id)
                ]
              }
            );
          } else if (dbSettings.autoreadsw) {
            await fn.readMessages([m.key]);
          }
        }
        await handleStatusBroadcast(m, store);
      } catch (error) {
        await log(`Error handleStatusBroadcast:\n${error}`, true);
      }
      return;
    }
    try {
      if (dbSettings.autoread) {
        await fn.readMessages([m.key]);
      }
      if (m.type === 'conversation' || m.type === 'extendedTextMessage') {
        if (m.body?.trim()) {
          const conversationData = {
            sender: m.sender,
            text: m.body,
            name: m.pushName,
            timestamp: m.timestamp || Date.now(),
            quoted: m.isQuoted && m.quoted?.body ? m.quoted.body : null,
            quotedSender: m.quoted?.sender || null,
            keyId: m.key.id
          };
          await updateMessageStore(store.conversations, m.chat, conversationData, 10000);
        }
      }
      const maxMessages = typeof global.chatLength === 'number' ? global.chatLength : 10000;
      await updateMessageStore(store.messages, m.chat, m, maxMessages);
      if (duplexM.has(m.key.id)) return;
      duplexM.set(m.key.id, Date.now(), 60000);
      await arfine(fn, m, store, false);
    } catch (error) {
      await log(`Error updateMessageStore:\n${error}`, true);
    }
  } catch (globalError) {
    await log(`Error updateMessageUpsert:\n\n${globalError}`);
    if (globalError.message?.includes('rate-overlimit')) {
      await log(`Terkena rate limit, menunggu 5 detik...`);
      await delay(5000);
    }
    if (globalError.message?.includes('No matching sessions') ||
      globalError.message?.includes('Bad MAC')) {
      await log(`Error session, mencoba refresh...`);
      try {
        await fn.ev.emit('creds.update', { deleteSessions: [message.messages?.[0]?.key?.remoteJid] });
      } catch (error) {
        await log(`Error refresh session:\n${error}`, true);
      }
    }
  }
};
async function groupParticipantsUpdate({ id, participants, action }, store, fn) {
  try {
    const botJid = jidNormalizedUser(fn.user.id);
    const metadata = store.groupMetadata[id];
    if (!metadata) {
      const freshMetadata = await fn.groupMetadata(id);
      if (freshMetadata) {
        store.groupMetadata[id] = freshMetadata;
        if (freshMetadata.participants) {
          for (const participant of freshMetadata.participants) {
            const contactJid = jidNormalizedUser(participant.id);
            const contactName = fn.getName(contactJid);
            await updateContact(store, contactJid, { lid: participant.lid, name: contactName });
          }
        }
        storeDirty = true;
      }
      if (!store.groupMetadata[id]) return;
    }
    if (action === 'remove') {
      const leaveSettings = dbGroups.leave.find(v => v.chatid === id);
      if (leaveSettings?.state) {
        for (const userId of participants) {
          let leaveMemberJid;
          if (userId.endsWith('@lid')) {
            leaveMemberJid = await findJidByLid(store, userId);
          } else {
            leaveMemberJid = jidNormalizedUser(userId);
          }
          if (leaveMemberJid.includes(botJid)) return;
          if (leaveMemberJid) {
            await fn.handleGroupEventImage(id, {
              memberJid: leaveMemberJid,
              eventText: 'Selamat Tinggal!!',
              subject: metadata.subject,
              messageText: leaveSettings.pesan
            });
          } else {
            await log(`Gagal mengidentifikasi JID untuk anggota: ${userId}. Pesan dilewati.`);
          }
        }
      }
    }
    if (action === 'add' || action === 'remove') {
      if (action === 'remove') {
        for (const userId of participants) {
          let leaveMemberJid;
          if (userId.endsWith('@lid')) {
            leaveMemberJid = await findJidByLid(store, userId);
          } else {
            leaveMemberJid = jidNormalizedUser(userId);
          }
          if (leaveMemberJid.includes(botJid)) {
            delete store.conversations[id];
            delete store.groupMetadata[id];
            delete store.messages[id];
            delete store.presences[id];
            storeDirty = true;
            return;
          }
        }
      }
      const freshMetadata = await fn.groupMetadata(id);
      if (freshMetadata) {
        store.groupMetadata[id] = freshMetadata;
        if (freshMetadata.participants) {
          for (const participant of freshMetadata.participants) {
            const contactJid = jidNormalizedUser(participant.id);
            const contactName = fn.getName(contactJid);
            await updateContact(store, contactJid, { lid: participant.lid, name: contactName });
          }
        }
        storeDirty = true;
      }
    }
    if (action === 'add') {
      const welcomeSettings = dbGroups.welcome.find(v => v.chatid === id);
      if (welcomeSettings?.state) {
        const metadata = store.groupMetadata[id];
        for (const userId of participants) {
          let newMemberJid;
          if (userId.endsWith('@lid')) {
            newMemberJid = await findJidByLid(store, userId);
          } else {
            newMemberJid = jidNormalizedUser(userId);
          }
          if (newMemberJid) {
            await fn.handleGroupEventImage(id, {
              memberJid: newMemberJid,
              eventText: 'Selamat Datang Di',
              subject: metadata.subject,
              messageText: welcomeSettings.pesan
            });
          } else {
            await log(`Gagal menemukan JID untuk ${userId}. Pesan dilewati.`);
          }
        }
      }
    }
    if (action === 'promote' || action === 'demote') {
      const newStatus = action === 'promote' ? 'admin' : null;
      const currentMetadata = store.groupMetadata[id];
      currentMetadata.participants.forEach(p => {
        if (participants.includes(p.id)) {
          p.admin = newStatus;
        }
      });
      if (currentMetadata.participants) {
        for (const participant of currentMetadata.participants) {
          const contactJid = jidNormalizedUser(participant.id);
          const contactName = fn.getName(contactJid);
          await updateContact(store, contactJid, { lid: participant.lid, name: contactName });
        }
      }
      storeDirty = true;
    }
  } catch (error) {
    await log(`Error groupParticipantsUpdate:\n${error}`, true);
  }
};
async function serializeMessage(fn, msg, store) {
  let botNumber = fn.decodeJid(fn.user?.id);
  let groupAdmins = [];
  let mfrom = null;
  let mchat = null;
  const m = {};
  if (msg.key) {
    const key = { ...msg.key };
    m.isGroup = key.remoteJid.endsWith('@g.us');
    if (m.isGroup) {
      delete key.remoteJidAlt;
    } else {
      if (key.remoteJid !== "status@broadcast") {
        delete key.participant;
        delete key.participantAlt;
      }
    }
    m.key = key;
    m.fromMe = msg.key.fromMe;
    mfrom = msg.key.remoteJid.startsWith('status') ? jidNormalizedUser(msg.key.participant) : jidNormalizedUser(msg.key.remoteJid);
    mchat = msg.key.remoteJid;
  }
  const isStatus = mchat === 'status@broadcast';
  if (msg.messageStubType) {
    m.messageStubType = msg.messageStubType;
    const rawParams = msg.messageStubParameters || [];
    const resolvedParams = [];
    for (const param of rawParams) {
      if (typeof param === 'string' && param.endsWith('@lid')) {
        const jidFromStore = await findJidByLid(store, param);
        resolvedParams.push(jidFromStore || param);
      } else {
        resolvedParams.push(param);
      }
    }
    m.messageStubParameters = resolvedParams;
    return m;
  }
  const getContentType = (content) => {
    if (content) {
      const keys = Object.keys(content);
      const key = keys.find(k => (k === 'conversation' || k.endsWith('Message') || k.includes('V2') || k.includes('V3')) && k !== 'senderKeyDistributionMessage');
      return key;
    }
  };
  const unwrapMessage = (msg) => {
    if (!msg || typeof msg !== 'object') return null;
    if (msg.viewOnceMessageV2?.message) return unwrapMessage(msg.viewOnceMessageV2.message);
    if (msg.viewOnceMessageV2Extension?.message) return unwrapMessage(msg.viewOnceMessageV2Extension.message);
    if (msg.viewOnceMessage?.message) return unwrapMessage(msg.viewOnceMessage.message);
    if (msg.ephemeralMessage?.message) return unwrapMessage(msg.ephemeralMessage.message);
    if (msg.protocolMessage?.type === 14) {
      const contentType = getContentType(msg.protocolMessage);
      if (contentType && msg.protocolMessage[contentType]) return unwrapMessage(msg.protocolMessage[contentType]);
    }
    if (msg.contextInfo?.quotedMessage) msg.contextInfo.quotedMessage = unwrapMessage(msg.contextInfo.quotedMessage);
    if (msg.message) {
      const extracted = extractMessageContent(msg.message);
      if (extracted) msg.message = extracted;
    }
    return msg;
  };
  if (!msg || !msg.message) return null;
  m.message = unwrapMessage(msg.message);
  let senderJid, senderLid;
  if (isStatus) {
    const p = msg.key.participant;
    const pAlt = msg.key.remoteJidAlt;
    const authorJid = p?.endsWith('@s.whatsapp.net') ? jidNormalizedUser(p) : (pAlt?.endsWith('@s.whatsapp.net') ? jidNormalizedUser(pAlt) : null);
    const authorLid = p?.endsWith('@lid') ? p : (pAlt?.endsWith('@lid') ? pAlt : null);
    m.participant = authorJid || authorLid;
    mfrom = m.participant;
    mchat = m.participant;
    m.key.participant = authorJid;
    m.key.participantAlt = authorLid;
    if (authorJid && authorLid) {
      senderJid = authorJid;
      senderLid = authorLid;
    }
  } else if (m.isGroup) {
    const participant = jidNormalizedUser(msg.key.participant);
    const participantAlt = jidNormalizedUser(msg.key.participantAlt);
    senderJid = participant?.endsWith('@s.whatsapp.net') ? participant : (participantAlt?.endsWith('@s.whatsapp.net') ? participantAlt : null);
    senderLid = participant?.endsWith('@lid') ? participant : (participantAlt?.endsWith('@lid') ? participantAlt : null);
    m.participant = senderJid || participant;
    m.key.participant = senderJid;
    m.key.participantAlt = senderLid || senderJid;
  } else {
    const remoteJid = jidNormalizedUser(msg.key.remoteJid);
    const remoteJidAlt = jidNormalizedUser(msg.key.remoteJidAlt);
    senderJid = remoteJid?.endsWith('@s.whatsapp.net') ? remoteJid : (remoteJidAlt?.endsWith('@s.whatsapp.net') ? remoteJidAlt : null);
    senderLid = remoteJid?.endsWith('@lid') ? remoteJid : (remoteJidAlt?.endsWith('@lid') ? remoteJidAlt : null);
    mfrom = senderJid || remoteJid;
    mchat = mfrom;
    m.participant = mfrom;
    m.key.remoteJid = senderJid;
    m.key.remoteJidAlt = senderLid || senderJid;
  }
  if (senderJid && senderLid) {
    const contactName = msg.pushName || store.contacts[senderJid]?.name || fn.getName(senderJid);
    await updateContact(store, senderJid, { lid: senderLid, name: contactName });
  }
  if (m.isGroup) {
    let metadata = store.groupMetadata[mchat];
    m.metadata = metadata;
    if (m.metadata?.participants) {
      m.metadata.participants = m.metadata.participants.map(p => ({
        id: p.id,
        admin: p.admin || null
      }));
    }
    groupAdmins = m.metadata?.participants?.reduce((a, b) => {
      if (b.admin) a.push({ id: b.id, admin: b.admin });
      return a;
    }, []) || [];
  }
  m.from = mfrom;
  m.chat = mchat;
  m.sender = m.participant;
  m.botnumber = botNumber;
  if (m.isGroup) {
    m.isAdmin = groupAdmins.some(b => b.id === m.sender);
    m.isBotAdmin = !!groupAdmins.find(member => member.id === botNumber);
  }
  m.pushName = msg.pushName;
  if (m.message) {
    m.type = getContentType(m.message) || Object.keys(m.message)[0];
    const kamuCrot = m.message[m.type] || m.message;
    m.body = m.message?.conversation || kamuCrot?.text || kamuCrot?.conversation || kamuCrot?.caption || kamuCrot?.selectedButtonId || kamuCrot?.singleSelectReply?.selectedRowId || kamuCrot?.selectedId || kamuCrot?.contentText || kamuCrot?.selectedDisplayText || kamuCrot?.title || kamuCrot?.name || '';
    const rawMentionedJid = kamuCrot?.contextInfo?.mentionedJid || [];
    const resolvedJids = [];
    for (const mentionId of rawMentionedJid) {
      if (mentionId.endsWith('@lid')) {
        const jidFromStore = await findJidByLid(store, mentionId);
        resolvedJids.push(jidFromStore || mentionId);
      } else {
        resolvedJids.push(mentionId);
      }
    }
    m.mentionedJid = resolvedJids;
    m.device = getDevice(m.key.id);
    m.expiration = kamuCrot?.contextInfo?.expiration || 0;
    const parseTimestamp = (t) => typeof t === 'number' ? t : t?.low || t?.high || 0;
    m.timestamp = parseTimestamp(msg.messageTimestamp) || 0;
    m.isMedia = !!kamuCrot?.mimetype || !!kamuCrot?.thumbnailDirectPath;
    if (m.isMedia) {
      m.mime = kamuCrot?.mimetype;
      m.size = kamuCrot?.fileLength;
      m.height = kamuCrot?.height || '';
      m.width = kamuCrot?.width || '';
      if (/webp/i.test(m.mime)) m.isAnimated = kamuCrot?.isAnimated;
    }
    if (m.type === 'reactionMessage') { m.reaction = kamuCrot; m.reaction.sender = m.sender; m.reaction.chat = m.chat; }
    if (m.type === 'protocolMessage') { m.protocolMessage = kamuCrot; }
    if (m.type === 'buttonsResponseMessage') { m.selectedButtonId = kamuCrot.selectedButtonId; m.selectedButtonText = kamuCrot.selectedDisplayText || ''; }
    if (m.type === 'listResponseMessage') { m.selectedRowId = kamuCrot.singleSelectReply?.selectedRowId || ''; m.selectedRowTitle = kamuCrot.title || ''; m.selectedRowDescription = kamuCrot.description || ''; }
    if (m.type === 'pollCreationMessage') { m.poll = kamuCrot; }
    if (m.type === 'pollUpdateMessage') { m.pollUpdate = kamuCrot; }
    if (m.type === 'pollResponseMessage') { m.pollResponse = kamuCrot; }
    if (m.type === 'messageContextInfo' && kamuCrot?.edit) { m.editedMessage = kamuCrot.edit; }
    if (kamuCrot?.contextInfo?.participant?.endsWith('@lid')) {
      const participantLid = kamuCrot.contextInfo.participant;
      const jidFromStore = await findJidByLid(store, participantLid);
      if (jidFromStore) {
        kamuCrot.contextInfo.participant = jidFromStore;
      }
    }
    m.isQuoted = !!kamuCrot?.contextInfo?.quotedMessage;
    if (m.isQuoted) {
      const quotedInfo = kamuCrot.contextInfo;
      m.quoted = unwrapMessage(quotedInfo.quotedMessage);
      if (m.quoted) {
        m.quoted.type = getContentType(m.quoted) || Object.keys(m.quoted)[0];
        const akuCrot = m.quoted[m.quoted.type] || m.quoted;
        m.quoted.isMedia = !!akuCrot?.mimetype || !!akuCrot?.thumbnailDirectPath;
        m.quoted.key = {
          remoteJid: m.chat,
          participant: jidNormalizedUser(quotedInfo.participant),
          fromMe: areJidsSameUser(jidNormalizedUser(quotedInfo.participant), jidNormalizedUser(fn?.user?.id)),
          id: quotedInfo.stanzaId,
        };
        m.quoted.sender = jidNormalizedUser(m.quoted.key.participant);
        if (m.quoted.sender.endsWith('@lid')) {
          const jidFromStore = await findJidByLid(store, m.quoted.sender);
          if (jidFromStore) {
            m.quoted.key.participant = jidFromStore;
            m.quoted.sender = jidFromStore;
          }
        }
        if (akuCrot?.contextInfo) {
          const rawQuotedMentionedJid = akuCrot.contextInfo.mentionedJid || [];
          const lidToJidMap = new Map();
          const resolvedJids = await Promise.all(
            rawQuotedMentionedJid.map(async (mentionId) => {
              if (mentionId.endsWith('@lid')) {
                const jidFromStore = await findJidByLid(store, mentionId);
                if (jidFromStore) {
                  lidToJidMap.set(mentionId.split('@')[0], jidFromStore.split('@')[0]);
                  return jidFromStore;
                }
              }
              return mentionId;
            })
          );
          m.quoted.mentionedJid = resolvedJids;
          akuCrot.contextInfo.mentionedJid = resolvedJids;
          let quotedBody = akuCrot?.text || akuCrot?.caption || akuCrot?.conversation || akuCrot?.selectedButtonId || akuCrot?.singleSelectReply?.selectedRowId || akuCrot?.selectedId || akuCrot?.contentText || akuCrot?.selectedDisplayText || akuCrot?.title || akuCrot?.name || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || '';
          for (const [lid, jid] of lidToJidMap.entries()) {
            quotedBody = quotedBody.replace(new RegExp(`@${lid}`, 'g'), `@${jid}`);
          }
          akuCrot.text = quotedBody;
          m.quoted.body = quotedBody;
        } else {
          m.quoted.mentionedJid = [];
          m.quoted.body = akuCrot?.text || akuCrot?.caption || akuCrot?.conversation || akuCrot?.selectedButtonId || akuCrot?.singleSelectReply?.selectedRowId || akuCrot?.selectedId || akuCrot?.contentText || akuCrot?.selectedDisplayText || akuCrot?.title || akuCrot?.name || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || '';
        }
        m.quoted.expiration = akuCrot?.contextInfo?.expiration || 0;
        if (m.quoted.isMedia) {
          m.quoted.mime = akuCrot?.mimetype;
          m.quoted.size = akuCrot?.fileLength;
          m.quoted.height = akuCrot?.height || '';
          m.quoted.width = akuCrot?.width || '';
          if (/webp/i.test(m.quoted.mime)) m.quoted.isAnimated = akuCrot?.isAnimated || false;
        }
      }
    }
  }
  return m;
};
async function starts() {
  version = await getBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState(`./src/session`);
  try {
    const _loadStore = await _dbStore.read();
    if (!_loadStore || Object.keys(_loadStore).length === 0) {
      store = {
        contacts: {},
        presences: {},
        status: {},
        conversations: {},
        messages: {},
        groupMetadata: {},
      };
      await _dbStore.write(store, true);
    } else if (typeof _loadStore === 'object' && _loadStore !== null) {
      store = _loadStore;
    } else {
      store = {
        contacts: {},
        presences: {},
        status: {},
        conversations: {},
        messages: {},
        groupMetadata: {},
      };
    }
    setInterval(async () => {
      if (!storeDirty) return;
      try {
        await _dbStore.write(store, false);
        storeDirty = false;
      } catch (error) {
        await log(`Error autoSaveStore:\n${error}`, true);
      }
    }, 2500);
  } catch (error) {
    await log(`Error loadStore\n${error}`, true);
    await handleRestart('Gagal memuat database store');
  }

  store.loadMessage = function (remoteJid, id) {
    const jidStore = store.messages?.[remoteJid];
    return jidStore?.map?.[id] || jidStore?.array?.find(msg => msg?.key?.id === id) || null;
  };

  const fn = HyHy({
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: undefined,
    keepAliveIntervalMs: 6000,
    logger: pinoLogger,
    version: version,
    browser: Browsers.ubuntu('Chrome'),
    emitOwnEvents: true,
    retryRequestDelayMs: 1000,
    maxMsgRetryCount: 5,
    qrTimeout: 60000,
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pinoLogger) },
    transactionOpts: { maxCommitRetries: 5, delayBetweenTriesMs: 1000 },
    markOnlineOnConnect: true,
    linkPreviewImageThumbnailWidth: 192,
    syncFullHistory: true,
    fireInitQueries: true,
    generateHighQualityLinkPreview: true,
    shouldIgnoreJid: (jid) => { return isJidBroadcast(jid) && jid !== 'status@broadcast'; },
    appStateMacVerification: { patch: true, snapshot: true },
    enableAutoSessionRecreation: true,
    enableRecentMessageCache: true
  });

  if (pairingCode && !phoneNumber && !fn.authState.creds.registered) {
    let numberToValidate = dbSettings.botNumber ? dbSettings.botNumber : process.env.BOT_NUMBER;
    let isValid = false;
    while (!isValid) {
      if (!numberToValidate) {
        numberToValidate = await question('Please type your WhatsApp number : ');
      }
      const cleanedNumber = numberToValidate.replace(/[^0-9]/g, '');
      if (cleanedNumber.length >= 9 && parsePhoneNumber('+' + cleanedNumber).valid) {
        phoneNumber = cleanedNumber;
        dbSettings.botNumber = cleanedNumber;
        await dumpSet();
        isValid = true;
        await log('Phone number valid, continuing...\ntunggu sampai kodenya muncul. agak lama. tungguin aja..');
      } else {
        await log('Invalid number. Start with your country code and make sure it is correct, Example: 628123456789');
        numberToValidate = null;
      }
    }
    await exec('rm -rf ./src/session/*');
  };
  
  await clientBot(fn, store);

  fn.ev.on('creds.update', saveCreds);

  fn.ev.on('connection.update', async ({ connection, lastDisconnect, qr, isNewLogin }) => {
    const statusCode = lastDisconnect?.error ? new Boom(lastDisconnect.error).output.statusCode : 0;
    try {
      if ((connection === 'connecting' || !!qr) && pairingCode && phoneNumber && !fn.authState.creds.registered && !pairingStarted) {
        setTimeout(async () => {
          pairingStarted = true;
          await log('Requesting Pairing Code...')
          let code = await fn.requestPairingCode(phoneNumber);
          code = code?.match(/.{1,4}/g)?.join('-') || code;
          await log(`Your Pairing Code : ${code}`);
        }, 3000);
      }
      if (connection === 'open') {
        if (dbSettings.restartState) {
          dbSettings.restartState = false;
          await fn.sendPesan(dbSettings.restartId, `✅ Restart sukses..`, dbSettings.dataM);
          dbSettings.restartId = undefined;
          dbSettings.dataM = {};
          dumpSet();
        }
        await log(`Menghubungkan ke WhatsApp...`);
        await fn.groupFetchAllParticipating();
        await getValidCommandsFromCode(path.resolve(__filename));
        await cachingCommands();
        await log(`WA Version: ${version}`);
        await log(`BOT Number: ${jidNormalizedUser(fn.user.id).split('@')[0]}`);
        await log(`${dbSettings.botname} Berhasil tersambung ke whatsapp...`);
        if (process.env.RESTART_ATTEMPTS && parseInt(process.env.RESTART_ATTEMPTS, 10) > 0) {
          process.env.RESTART_ATTEMPTS = '0';
        }
        setInterval(cleanupExpiredSessions, 60 * 1000);
      }
      if (connection === 'close') {
        await log(`[DISCONNECTED] Connection closed. Code: ${statusCode}`);
        const code = [401, 402, 403, 411, 500];
        if (code.includes(statusCode)) {
          await exec('rm -rf ./src/session/*');
          process.exit(1);
        } else {
          await handleRestart(`Koneksi terputus dengan kode ${statusCode}`);
        }
      }
      if (isNewLogin) await log(`New device detected, session restarted!`);
      if (qr) {
        if (!pairingCode) {
          log('Scan QR berikut:');
          qrcode.generate(qr, { small: true }, (qrcodeString) => {
            const qrStr = String(qrcodeString);
            log(`\n${qrStr}`);
          });
        }
      }
    } catch (error) {
      await log(`Error connection.update:\n${error}`, true);
    }
  });
  fn.ev.on('messaging-history.set', async (event) => {
    for (const contact of event.contacts) {
      await processContactUpdate(contact, store);
    }
  });
  fn.ev.on('contacts.upsert', async (contacts) => {
    for (const contact of contacts) {
      await processContactUpdate(contact, store);
    }
  });
  fn.ev.on('contacts.update', async (updates) => {
    for (const contact of updates) {
      await processContactUpdate(contact, store);
    }
  });
  fn.ev.on('messages.upsert', async (message) => {
    await updateMessageUpsert(fn, message, store);
  });
  fn.ev.on('group-participants.update', async (update) => {
    await groupParticipantsUpdate(update, store, fn);
  });
  fn.ev.on('groups.update', async (updates) => {
    for (const newMeta of updates) {
      const id = jidNormalizedUser(newMeta.id);
      store.groupMetadata[id] = {
        ...(store.groupMetadata[id] || {}),
        ...newMeta
      };
      if (newMeta.participants) {
        for (const participant of newMeta.participants) {
          const contactJid = jidNormalizedUser(participant.id);
          const contactName = await fn.getName(contactJid);
          await updateContact(store, contactJid, { lid: participant.lid, name: contactName });
        }
      }
    }
    storeDirty = true;
  });
  fn.ev.on('presence.update', async ({ id, presences: update }) => {
    if (!id.endsWith('@g.us')) return;
    const resolvedPresences = {};
    for (const participantId in update) {
      let resolvedJid;
      if (participantId.endsWith('@lid')) {
        resolvedJid = await findJidByLid(store, participantId);
      } else {
        resolvedJid = jidNormalizedUser(participantId);
      }
      if (!resolvedJid) {
        continue;
      }
      resolvedPresences[resolvedJid] = {
        ...update[participantId],
        lastSeen: Date.now()
      };
    }
    store.presences[id] = store.presences?.[id] || {};
    Object.assign(store.presences[id], resolvedPresences);
    storeDirty = true;
  });
  fn.ev.on('groups.upsert', async (newMetas) => {
    for (const daget of newMetas) {
      const id = jidNormalizedUser(daget.id);
      store.groupMetadata[id] = daget;
      if (daget.participants) {
        for (const participant of daget.participants) {
          const contactJid = jidNormalizedUser(participant.id);
          const contactName = fn.getName(contactJid);
          await updateContact(store, contactJid, { lid: participant.lid, name: contactName });
        }
      }
    }
    storeDirty = true;
  });
  fn.ev.on('chats.update', async (updates) => {
    for (const chatUpdate of updates) {
      const lastMessage = chatUpdate.messages?.[0];
      if (!lastMessage || !lastMessage.key) continue;
      const key = lastMessage.key;
      const isGroup = key.remoteJid.endsWith('@g.us');
      if (isGroup) {
        delete key.remoteJidAlt;
      } else {
        delete key.participant;
        delete key.participantAlt;
      }
      let jid, lid;
      if (isGroup) {
        const participant = jidNormalizedUser(key.participant);
        const participantAlt = jidNormalizedUser(key.participantAlt);
        jid = participant?.endsWith('@s.whatsapp.net') ? participant : (participantAlt?.endsWith('@s.whatsapp.net') ? participantAlt : null);
        lid = participant?.endsWith('@lid') ? participant : (participantAlt?.endsWith('@lid') ? participantAlt : null);
      } else {
        const remoteJid = jidNormalizedUser(key.remoteJid);
        const remoteJidAlt = jidNormalizedUser(key.remoteJidAlt);
        jid = remoteJid?.endsWith('@s.whatsapp.net') ? remoteJid : (remoteJidAlt?.endsWith('@s.whatsapp.net') ? remoteJidAlt : null);
        lid = remoteJid?.endsWith('@lid') ? remoteJid : (remoteJidAlt?.endsWith('@lid') ? remoteJidAlt : null);
      }
      if (jid && lid) {
        const eName = lastMessage.pushName || fn.getName(jid);
        await updateContact(store, jid, { lid: lid, name: eName });
      }
    }
  });
  fn.ev.on("call", (call) => {
    const { id, status, from } = call[0];
    if (status === "offer" && dbSettings.anticall) return fn.rejectCall(id, from);
  });

  cron.schedule("0 0 21 * * *", async () => {
    dbLimits.limit.forEach(user => {
      const userId = user.id;
      const isVipOrHigher = dbVIP.some(v => v.id === userId) || dbMaster.master.includes(userId) || ownerNumber.includes(userId);
      if (isVipOrHigher) {
        user.limit = Infinity;
      } else {
        const isPremiumUser = dbPremium.some(user => user.id === userId);
        user.limit = isPremiumUser ? dbSettings.limitCountPrem : dbSettings.limitCount;
      }
      user.warnedLimit = false;
    });
    dbLimitGame.limitgame.forEach(user => {
      const userId = user.id;
      const isVipOrHigher = dbVIP.some(v => v.id === userId) || dbMaster.master.includes(userId) || ownerNumber.includes(userId);
      if (isVipOrHigher) {
        user.limit = Infinity;
      } else {
        const isPremiumUser = dbPremium.some(user => user.id === userId);
        user.limit = isPremiumUser ? dbSettings.limitCountPrem : dbSettings.limitGame;
      }
      user.warnedLimit = false;
    });
    dbLevels.forEach(user => { user.gacha = true });
    await dumpLimit(); await dumpLimitGame(); await dumpLevels();
    await log(`✅ Reset harian selesai.`);
  });
  cron.schedule('0 0 * * 0', async () => {
    await scheduledStoreReset();
  });

  setInterval(async () => {
    try {
      await fn.query({
        tag: "iq",
        attrs: { to: "s.whatsapp.net", type: "get", xmlns: "w:p" },
      });
    } catch {
      await starts();
    }
  }, 4 * 60 * 1000);
};
async function arfine(fn, m, store, asu) {
  // await log(util.inspect(m, false, null, true));
  suggested = !!asu
  _latestMessage = m;
  _latestMessages = m;
  await expiredCheck(fn, dbPremium);
  await expiredVIPcheck(fn, dbVIP);

  // ─── Basic info ───────────────────────
  const id = m.key.id;
  const t = m.timestamp;
  const pushname = m.pushName || 'Unknown';
  const fromBot = m.fromMe;
  let toId = "";
  toId = m.from;

  // ─── Quoted info ───────────────────────
  const quotedMsg = m.quoted ? m.quoted : false;
  const quotedParticipant = m.quoted?.sender || '';
  const mentionedJidList = Array.isArray(m.mentionedJid) ? m.mentionedJid : [];

  // ─── Validator Info ───────────────────────
  const serial = await getSerial(m, store);
  const botNumber = m.botnumber;
  const isSadmin = ownerNumber.includes(serial);
  const master = dbMaster.master.includes(serial);
  const vip = dbVIP.some(user => user.id === serial);
  const premium = dbPremium.some(user => user.id === serial);
  const isBanned = dbMuted.muteuser.includes(serial);
  const maintenance = Boolean(dbSettings.maintenance);
  const isMuted = dbMuted.mutechat.includes(toId);
  const isWhiteList = dbWhitelist.whitelist.includes(toId) && !dbMuted.mutechat.includes(toId) && !dbMuted.muteuser.includes(serial);
  const isWhite = (a) => dbWhitelist.whitelist.includes(a);
  const hakIstimewa = [isSadmin, master, vip, premium].some(Boolean);

  // ─── Group Info ───────────────────────
  const isBotGroupAdmins = m.isBotAdmin || false;
  const isGroupAdmins = m.isAdmin || false;

  // ─── Parsing info ───────────────────────
  const body = m?.body;
  const type = m?.type;

  const reactDone = async () => { await delay(1000); await fn.sendMessage(toId, { react: { text: '✅', key: m.key } }) };
  const reactFail = async () => { await delay(1000); await fn.sendMessage(toId, { react: { text: '❎', key: m.key } }) };
  const sendRawWebpAsSticker = async (_data, options = {}) => { await fn.sendRawWebpAsSticker(toId, _data, m, { ...options }) };
  const sReply = (content, options = {}) => fn.sendReply(toId, content, { quoted: m, ...options });
  const sPesan = (content) => fn.sendPesan(toId, content, m);

  function cleanFormattingText(text) {
    if (!text || typeof text !== 'string') return text;
    const patterns = [
      /\*~_([^~*_]+)_~*/g,
      /_\*~([^*~_]+)~\*_/g,
      /~_\*([^~*_]+)\*_~/g,
      /\*_~([^~*_]+)~_*/g,
      /_\*([^*_]+)\*_/g,
      /\*_([^*_]+)_*/g,

      /\*~([^~*]+)~\*/g,
      /~\*([^~*]+)\*~/g,
      /_~([^~_]+)~_/g,
      /~_([^~_]+)_~/g,

      /\*{1,2}([^*]+)\*{1,2}/g,
      /_{1,2}([^_]+)_{1,2}/g,
      /~{1,2}([^~]+)~{1,2}/g,
      /```([^`]+)```/g
    ];
    let cleanedText = text;
    patterns.forEach(pattern => {
      cleanedText = cleanedText.replace(pattern, '$1');
    });
    return cleanedText.trim();
  };
  function formatDurationMessage(duration) {
    let years = duration.years();
    let months = duration.months();
    let days = duration.days();
    let hours = duration.hours();
    let minutes = duration.minutes();
    let seconds = duration.seconds();
    let durationMessage = `*Expired*: `;
    if (years > 0) durationMessage += `${years} year(s) `;
    if (months > 0) durationMessage += `${months} month(s) `;
    if (days > 0) durationMessage += `${days} day(s) `;
    if (hours > 0) durationMessage += `${hours} hour(s) `;
    if (minutes > 0) durationMessage += `${minutes} minute(s) `;
    if (seconds > 0) durationMessage += `${seconds} second(s)`;
    return durationMessage;
  };

  async function handleAddPremiumUser(benet, duration, serial) {
    let durationParsed = formatDuration(duration);
    let durationMessage = formatDurationMessage(durationParsed);
    await addPremiumUser(benet, duration, dbPremium); await counthit(serial);
    await sReply(`*「 PREMIUM ADDED 」*\n\n➸ *ID*: @${benet.split('@')[0]}\n${durationMessage}`);
  };
  async function handleDeletePremiumUser(input, serial) {
    const targetList = archimed(input, dbPremium);
    if (!Array.isArray(targetList) || targetList.length === 0) throw new Error(`Incorrect format, example: ${dbSettings.rname}premium del 1,2,3 or @user`);
    for (let user of targetList) {
      const pos = dbPremium.findIndex(x => x.id === user.id);
      if (pos !== -1) dbPremium.splice(pos, 1);
    }
    await dumpPrem(); await counthit(serial); await reactDone();
  };
  async function handleListPremiumUsers(serial) {
    let ts = "*## " + dbSettings.botname + " Premium ##*\n";
    let no = 1;
    const surya12 = dbPremium.slice().sort((a, b) => b.expired - a.expired);
    for (let a of surya12) {
      const expiredDate = dayjs(a.expired);
      const now = dayjs();
      const durationLeft = dayjs.duration(expiredDate.diff(now));
      const durationMessage = formatDurationMessage(durationLeft);
      ts += `\n${no}. @${a.id.split('@')[0]}\n   ${durationMessage}\n`;
      no += 1;
    }
    ts += "\nRegards: *" + dbSettings.botname + "*";
    await sReply(ts); await counthit(serial);
  };
  async function handleAddVIPUser(benet, duration, serial) {
    const durationParsed = formatDuration(duration);
    const durationMessage = formatDurationMessage(durationParsed);
    await addUserVIP(benet, duration, dbVIP); await counthit(serial);
    await sReply(`*「 VIP ADDED 」*\n\n➸ *ID*: @${benet.split('@')[0]}\n${durationMessage}`);
  };
  async function handleDeleteVIPUser(input, serial) {
    const targetList = archimed(input, dbVIP);
    if (!Array.isArray(targetList) || targetList.length === 0) throw new Error(`Incorrect format, example: ${dbSettings.rname}vip del 1,2,3 or @user`);
    for (let user of targetList) {
      const pos = dbVIP.findIndex(x => x.id === user.id);
      if (pos !== -1) dbVIP.splice(pos, 1);
    }
    await dumpVIP(); await counthit(serial); await reactDone();
  };
  async function handleListVIPUsers(serial) {
    let ts = "*## " + dbSettings.botname + " VIP ##*\n";
    let no = 1;
    const surya12 = dbVIP.slice().sort((a, b) => b.expired - a.expired);
    for (let a of surya12) {
      const expiredDate = dayjs(a.expired);
      const now = dayjs();
      const durationLeft = dayjs.duration(expiredDate.diff(now));
      const durationMessage = formatDurationMessage(durationLeft);
      ts += `\n${no}. @${a.id.split('@')[0]}\n   ${durationMessage}\n`;
      no += 1;
    }
    ts += "\nRegards: *" + dbSettings.botname + "*";
    await sReply(ts); await counthit(serial);
  };
  async function limitAddGame(id) {
    if (isSadmin || master || vip || fromBot) return;
    const userIndex = dbLimitGame.limitgame.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      dbLimitGame.limitgame[userIndex].limit -= 1;
      await dumpLimitGame();
    }
  };
  async function limitAdd(id) {
    if (isSadmin || master || vip || fromBot) return;
    const userIndex = dbLimits.limit.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      dbLimits.limit[userIndex].limit -= 1;
      await dumpLimit();
    }
  };
  async function limitcok(id) {
    if (isSadmin || master || vip || fromBot) return;
    const userIndex = dbLimits.limit.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      dbLimits.limit[userIndex].limit -= 50;
      await dumpLimit();
    }
  };
  async function isLimit(id) {
    if (isSadmin || master || vip || fromBot) return false;
    const getLimit = () => dbLimits.limit.find(u => u.id === id);
    const createUserLimit = async (limit) => {
      dbLimits.limit.push({ id, limit, warnedLimit: false });
      await dumpLimit();
    };
    let user = getLimit();
    if (!user) {
      const limitDefault = premium ? dbSettings.limitCountPrem : dbSettings.limitCount;
      createUserLimit(limitDefault);
      user = getLimit();
    }
    if (user.limit <= 0) {
      if (!user.warnedLimit) {
        const msg = `limit Kamu telah habis, pergunakanlah bot dengan bijak sesuai kebutuhan Kamu\n` +
          `ketik ${dbSettings.sname}order untuk menambah limit\n` +
          `ketik ${dbSettings.rname}rules untuk mengetahui Term & Condition\n` +
          dbSettings.autocommand;
        await sReply(msg);
        user.warnedLimit = true;
        await dumpLimit();
      }
      return true;
    } else {
      if (user.warnedLimit) {
        user.warnedLimit = false;
        await dumpLimit();
      }
      return false;
    }
  };
  async function isLimitGame(id) {
    if (isSadmin || master || vip || fromBot) return false;
    const getLimit = () => dbLimitGame.limitgame.find(u => u.id === id);
    const createUserLimit = async (limit) => {
      dbLimitGame.limitgame.push({ id, limit, warnedLimit: false });
      await dumpLimitGame();
    };
    let user = getLimit();
    if (!user) {
      const limitDefault = premium ? dbSettings.limitCountPrem : dbSettings.limitGame;
      createUserLimit(limitDefault);
      user = getLimit();
    }
    if (user.limit <= 0) {
      if (!user.warnedLimit) {
        if (premium) {
          await sReply('Silakan bermain game kembali besok. Kamu telah mencapai batas.');
        } else {
          const msg = `Limit game Kamu telah habis, ketik ${dbSettings.sname}order untuk menambah limit.`;
          await sReply(msg);
        }
        user.warnedLimit = true;
        await dumpLimitGame();
      }
      return true;
    } else {
      if (user.warnedLimit) {
        user.warnedLimit = false;
        await dumpLimitGame();
      }
      return false;
    }
  };
  async function getCommonGroups(k) {
    let c = [];
    const d = Object.keys(store.groupMetadata).filter(id => id.endsWith('@g.us'));
    for (let e of d) {
      try {
        let a = store.groupMetadata[e];
        if (!a || !a.participants) {
          a = await fn.groupMetadata(e);
          store.groupMetadata[e] = a;
          if (a.participants) {
            for (const participant of a.participants) {
              const contactJid = jidNormalizedUser(participant.id);
              const contactName = fn.getName(contactJid);
              await updateContact(store, contactJid, { lid: participant.lid, name: contactName });
            }
          }
          storeDirty = true;
        };
        const b = a.participants.some(p => p.id === k);
        if (b) {
          c.push(a);
        };
      } catch (error) {
        await log(`Eror_CommonGroups\n${error}`, true);
      };
    };
    return c;
  };
  async function restartSelf(a, b) {
    dbSettings.restartState = true;
    dbSettings.restartId = a;
    dbSettings.dataM = b;
    await dumpSet(); await delay(1000); await fn.sendMessage(a, { react: { text: '✅', key: b.key } }); await handleRestart("Restarting...")
  };
  async function commandMenu({
    levela, isSadmin, master, vip, premium, isGroupAdmins,
    helpmaster, helpowner, helpvip, helppremium, helpmanage,
    helpmedia, helpaudio, helptext, helpimage, helpgame0,
    helpgame1, helpgame2, helpgame3, helplist, helphitungan,
    helpai, helpanime, helpconvert, helputil, helpfun,
    helpngaji, helpbot
  }) {
    let ts = `*── ${dbSettings.botname} ──*\n\n`;
    ts += "❏  ```I N F O R M A T I O N```\n";
    ts += "> rules [untuk melihat rules bot]\n\n";
    ts += "❏  ```Y O U R  L E V E L``` \n";
    ts += `> XP: ${levela.xp}\n`;
    ts += `> Role: ${levela.role}\n`;
    ts += `> Balance: $ ${levela.balance}`;
    ts += `\n\n*───────────────────*`;
    const menuSections = [
      { title: 'MASTER COMMANDS',     data: helpmaster,   required: isSadmin },
      { title: 'OWNER COMMANDS',      data: helpowner,    required: isSadmin || master },
      { title: 'MANAGE BOT',          data: helpbot,      required: isSadmin || master },
      { title: 'VIP COMMANDS',        data: helpvip,      required: isSadmin || master || vip },
      { title: 'PREMIUM COMMANDS',    data: helppremium,  required: isSadmin || master || vip || premium },
      { title: 'MANAGE GROUPS',       data: helpmanage,   required: isSadmin || master || vip || premium || isGroupAdmins },
      { title: 'MEDIA COMMANDS',      data: helpmedia,    required: true },
      { title: 'CONVERT COMMANDS',    data: helpconvert,  required: true },
      { title: 'AUDIO MANIPULATION',  data: helpaudio,    required: true },
      { title: 'TEXT MANIPULATION',   data: helptext,     required: true },
      { title: 'IMAGE MANIPULATION',  data: helpimage,    required: true },
      { title: 'AI COMMANDS',         data: helpai,       required: true },
      { title: 'ANIME COMMANDS',      data: helpanime,    required: true },
      { title: 'FUN COMMANDS',        data: helpfun,      required: true },
      { title: 'NGAJI COMMANDS',      data: helpngaji,    required: true },
      { title: 'GAME COMMANDS',       data: helpgame0,    required: true },
      { title: 'PVE STATELESS GAME',  data: helpgame1,    required: true },
      { title: 'PVE STATEFUL GAME',   data: helpgame2,    required: true },
      { title: 'PVP GAME',            data: helpgame3,    required: true },
      { title: 'MATH COMMANDS',       data: helphitungan, required: true },
      { title: 'UTIL COMMANDS',       data: helputil,     required: true },
      { title: 'LIST COMMANDS',       data: helplist,     required: true },
    ];
    for (const section of menuSections) {
      if (section.required) {
        const commandListString = await formatCommandList(section.data);
        if (commandListString) {
          ts += `\n\n*${section.title}*${commandListString}`;
        }
      }
    }
    ts += `\n\nRegards: *PEKI - VH - FN - HITORI*`;
    return ts;
  };
  async function isUserVerified(m, dbSettings, store, fn, sReply, hakIstimewa) {
    if (m.isGroup && !m.fromMe) return true;
    try {
      const metadata = store.groupMetadata[dbSettings.groupIdentity];
      if (!metadata) return false;
      const participant = metadata.participants.find(p => p.id === m.sender);
      if (!m.fromMe && participant || hakIstimewa) {
        return true;
      } else {
        const botParticipant = metadata.participants.find(p => p.id === m.botnumber);
        if (botParticipant && botParticipant.admin) {
          const inviteCode = await fn.groupInviteCode(dbSettings.groupIdentity);
          await sReply(`Untuk menggunakan bot ini, Anda harus bergabung ke grup kami terlebih dahulu. Silakan klik tautan berikut:\nhttps://chat.whatsapp.com/${inviteCode}`);
        } else {
          await sReply(`Untuk menggunakan bot ini, Anda harus bergabung ke grup kami terlebih dahulu. Silakan klik tautan berikut:\n${dbSettings.linkIdentity}`);
        }
        return false;
      }
    } catch {
      return false;
    }
  };
  async function getVideoDuration(filePath) {
    try {
      const { stdout } = await exec(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`);
      return parseFloat(stdout.trim()) || 10;
    } catch (error) {
      console.error('Error getting video duration:', error);
      return 10;
    }
  };

  if (body?.toLowerCase().trim() == "res") {
    if (isSadmin || master) {
      await restartSelf(toId, m);
    }
  } else if (body?.toLowerCase().trim() == "rname") {
    await sReply(dbSettings.rname);
  } else if (body?.toLowerCase().trim() == "sname") {
    await sReply(dbSettings.sname);
  } else if (["sname", "rname"].some(k => body?.toLowerCase().trim() === dbSettings[k] + "rules")) {
    let tx = "```Term of Services:```\n"
    tx += "1. BOT Cepat / Lambat Respon tergantung amal dan perbuatan.\n"
    tx += "2. BOT TIDAK AKAN MERESPON NAMA USER KOSONG TANPA NAMA!!!\n"
    tx += "3. Bot 24jam ON\n"
    tx += "4. Bot memiliki deteksi spam!\n"
    tx += "  a. jika kamu spam sticker/image/video, maka kamu akan dikick oleh bot.\n"
    tx += "  b. jika kamu spam commands, maka kamu akan di diamkan oleh bot selama 15 menit.\n"
    tx += "  c. jika kamu spam chat, maka kamu akan diblock oleh bot.\n"
    tx += "  d. jika kamu TELEPON bot, maka kamu akan diblokir oleh bot, dan TIDAK BISA diunblok.\n"
    tx += "5. Bot memiliki batasan perintah!\n"
    tx += "  • setiap user memiliki jumlah limit yang sama, " + dbSettings.limitCount + " limit penggunaan setiap hari dan akan direset setelah jam 21.00\n"
    tx += "  • setiap user premium memiliki jumlah limit " + dbSettings.limitCountPrem + " penggunaan setiap hari dan akan direset setelah jam 21.00\n"
    tx += "  • setiap user vip memiliki jumlah limit infinity(nolimit) penggunaan setiap hari\n"
    tx += "6. GUNAKAN BOT DENGAN BIJAK!\n"
    tx += "  bot mempunyai akses premium dan non premium dan mempunyai perintah khusus premium user\n"
    tx += "    a. jika kamu adalah termasuk user premium, maka limit kreditmu berkurang 1 setiap command\n"
    tx += "    b. jika kamu non user premium dan kamu gunain akses premium, maka limit kreditmu bakalan langsung habis\n"
    tx += "    c. jadi, untuk kamu yang non premium, tahu diri ya, gunakan fitur yang sesuai dengan statusmu, masih bisa trial kok, tapi dengan catatan, limit kamu bakalan langsung habis setelah itu. RESET OTOMATIS JAM 9 MALAM SETIAP HARI"
    await sReply(tx);
  } else if (["sname", "rname"].some(k => body?.toLowerCase().trim() === dbSettings[k] + "donasi")) {
    let tx = 'supaya bot bisa jalan terus, dan kamu bisa pakai terus ini bot, please bantu creator dengan donasi!\n\n'
    tx += '```GOPAY```: 085712453005\n\n'
    tx += 'Berapapun nominalnya, asalkan kamu ikhlas, creator jadi makin semangat buat berkarya.'
    await sReply(tx);
  } else if (["sname", "rname"].some(k => body?.toLowerCase().trim() === dbSettings[k] + "author")) {
    let a = '```NAMA: Fn```\n'
    a += '```INSTAGRAM:``` *https://instagram.com/fnbots*\n'
    a += '```GITHUB:``` *https://github.com/Terror-Machine*'
    await fn.sendFilePath(toId, a, `./src/media/fotobot.jpeg`, { quoted: m });
  } else if (["sname", "rname"].some(k => body?.toLowerCase().trim() === dbSettings[k] + "premium")) {
    let tx = 'apa itu premium?\n'
    tx += 'premium adalah filter khusus untuk user berbayar dengan fasilitas full.\n'
    tx += '1. anti banned bot ketika spam\n'
    tx += '2. anti mute/silent dari bot dimana aja\n'
    tx += '3. semua fitur terbuka untuk premium user\n'
    tx += '4. jika ketemu ' + dbSettings.botname + ' di grup lain, dan kebetulan ' + dbSettings.botname + ' adalah admin digrup tersebut, kamu bisa akses admin juga via bot!\n'
    tx += '5. prioritas diutamakan, bisa request feature, jika ada update, lebih didahulukan\n'
    tx += '6. discredit limit? berkurang 1, jadi 100x lipatnya free member, dan bisa 100x command premium dalam sehari!\n'
    tx += '7. bisa bawa pulang bot ke 1 grupmu juga loh!\n'
    tx += '8. didalam grup, jika kamu adalah premium, maka kastamu lebih tinggi daripada admin grup di system bot\n\n'
    tx += 'kenapa gak jadi premium aja dengan segala keuntungan? cuman seharga 20k/bulan kok. :D\n'
    tx += 'mau jadi premium? hubungi creator dengan ketik /order'
    await sReply(tx);
  } else if (["sname", "rname"].some(k => body?.toLowerCase().trim() === dbSettings[k] + "vip")) {
    let tx = 'apa itu VIP?\n'
    tx += 'VIP adalah upgrade dari PREMIUM\n'
    tx += '1. akses premium\n'
    tx += '2. unlimited limit\n'
    tx += '3. bisa gift limit ke user lain\n'
    tx += '4. jika di grup ketemu ' + dbSettings.botname + ' dan kebetulan ' + dbSettings.botname + ' jadi admin grup tersebut, kamu bisa promote diri kamu jadi admin juga!\n'
    tx += 'kenapa gak jadi VIP aja dengan segala keuntungan? cuman seharga 75k/bulan kok. :D\n'
    tx += 'mau jadi premium? hubungi creator dengan ketik /order'
    await sReply(tx);
  } else if (["sname", "rname"].some(k => body?.toLowerCase().trim() === dbSettings[k] + "order")) {
    let tx = 'kamu mau order bot?\n'
    tx += 'boleh banget kak! ini kak pricelistnya!\n\n'
    tx += '1. bawa pulang bot ke grupmu\n'
    tx += '   a. biaya 1x masuk grup, bayar 20k perbulan\n'
    tx += '      - kalo bot sudah masuk kegrupmu dan kemudian dikick / dikeluarin, maka hangus.\n'
    tx += '      - bot bisa ganti grup dengan catatan, konfirmasi ke creator dulu.\n'
    tx += '2. limit kamu habis?\n'
    tx += '   a. user premium, 20k perbulan\n'
    tx += '   b. user vip, 75k perbulan\n'
    tx += '   silakan ketik .vip atau .premium untuk info\n'
    tx += '3. mau akunmu jadi bot? (clone ' + dbSettings.botname + ')\n'
    tx += '   a. jadi owner aja, 250k perbulan\n'
    tx += '      - bebas mau masukin bot ke berapapun grupnya\n'
    tx += '      - unlimited limit dan bisa gift limit kesiapapun\n'
    tx += '      - bisa settings limit sendiri\n'
    tx += '      - full fitur dari ' + dbSettings.botname + '\n'
    tx += '      - bisa ganti nama sendiri\n'
    tx += '      - dll.\n'
    tx += 'minat? chat langsung creator/owner'
    await sReply(tx);
    await fn.sendContact(toId, "Creator", dbSettings.botname, ownerNumber[0].split('@')[0], m);
  } else if (["sname", "rname"].some(k => body?.toLowerCase().trim() === dbSettings[k] + "stay")) {
    let tx = 'kamu mau bikin botnya stay di group kamu?\n'
    tx += 'Bisa kak. Cukup bantu creator dengan bayar 20k/bulan aja kak.\n'
    tx += 'Nih chat langsung kontak yang dd kirim ya :D'
    await sReply(tx);
    await fn.sendContact(toId, "Creator", dbSettings.botname, ownerNumber[0].split('@')[0], m)
  };

  let mentiones = mentionedJidList
  let args = (body && body?.trim() !== "") ? (body?.slice(dbSettings.rname.length).trim().split(/ +/).slice(1) || body?.slice(dbSettings.sname.length).trim().split(/ +/).slice(1)) : [];
  let arg = body?.includes(' ') ? body?.trim().substring(body?.indexOf(' ') + 1) : '';
  let q = args.join(' ');
  let ar = args.map((v) => v.toLowerCase());
  let txt = body?.toLowerCase();
  let isCmd = txt?.startsWith(dbSettings.rname) || txt?.startsWith(dbSettings.sname);
  let gameDefinitions = [
    { name: 'Tebak Lirik', regex: /^Tebak Lirik:/i, store: tebaklirik },
    { name: 'Tebak Kalimat', regex: /^Tebak Kalimat:/i, store: tebaklirik },
    { name: 'Siapakah Aku', regex: /^Siapakah Aku:/i, store: tebaklirik },
    { name: 'Teka Teki', regex: /^Teka Teki:/i, store: tekateki },
    { name: 'Tebak Kata', regex: /^Tebak Kata:/i, store: tebakkata },
    { name: 'Susun Kata', regex: /^Susun Kata:/i, store: susunkata },
    { name: 'Tebak Kimia', regex: /^Tebak Kimia:/i, store: tebakkimia },
    { name: 'Tebak Negara', regex: /^Tebak Negara:/i, store: tebaknegara },
    { name: 'Tebak Bendera', regex: /^Tebak Bendera:/i, store: tebakbendera },
    { name: 'Tebak Gambar Berikut', regex: /^Tebak Gambar Berikut:/i, store: tebakgambar },
    { name: 'Tebak Game Berikut', regex: /^Tebak Game Berikut:/i, store: tebakgambar },
    { name: 'Kuis Caklontong', regex: /^Kuis Caklontong:/i, store: caklontong }
  ];

  if (m.isGroup) {
    if (checkAfkUser(toId, serial, dbAFK)) {
      const afkPosition = getAfkPosition(toId, serial, dbAFK);
      const afkData = dbAFK[afkPosition];
      let durationMessage = '';
      if (afkData && afkData.time) {
        const asu = t - afkData.time
        const timeAgo = waktu(asu);
        durationMessage = `setelah *${afkData.reason}* selama *${timeAgo}*`;
      }
      dbAFK.splice(afkPosition, 1);
      try {
        await dumpAfk();
      } catch (error) {
        await log(`Error_AFK_Recovery:\n${error}`, true);
      }
      await sPesan(`*${pushname}* telah kembali ${durationMessage}!`);
    }
  };
  if (!m.isGroup) {
    if (otpSessions[serial]) {
      if (otpSessions[serial].otp === body) {
        await sPesan('✅ Verifikasi berhasil!\n\nPermintaan Anda telah diteruskan ke Admin untuk persetujuan akhir. Mohon tunggu.');
        const adminNotification =
          `*Permintaan Bergabung Baru*\n\n` +
          `Pengguna: @${serial.split('@')[0]}\n\n` +
          `Telah berhasil verifikasi OTP. Untuk menyetujui, kirim perintah:\n\n\`${dbSettings.rname}requestjoin\``;
        await fn.sendPesan(otpSessions[serial].gid, adminNotification, m);
        delete otpSessions[serial];
      } else {
        otpSessions[serial].attempts++;
        if (otpSessions[serial].attempts > MAX_ATTEMPTS) {
          dbMuted.blockedUsers.push(serial);
          await dumpMute();
          await log(`User ${serial} diblokir karena gagal verifikasi OTP lebih dari ${MAX_ATTEMPTS}x.`, true);
          delete otpSessions[serial];
        } else {
          await sPesan(`Kode OTP salah. Percobaan ke-${otpSessions[serial].attempts}/${MAX_ATTEMPTS}.`);
        }
      }
      return;
    }
  };

  try {
    if (fromBot || (serial === botNumber)) return;
    if (isCmd) {
      if (dbSettings.verify === true) {
        const isVerified = await isUserVerified(m, dbSettings, store, fn, sReply, hakIstimewa);
        if (!isVerified) return;
      }
      if (txt.includes("r:")) {
        const [, fa] = txt.split("r:");
        const [numStr, ...rest] = fa.trim().split(" ");
        const index = parseInt(numStr) - 1;
        toId = mygroup[index];
        txt = rest.join(" ").trim();
      };
      chainingCommands = await mycmd(await getTxt(txt));
      async function executeCommandChain(commandList) {
        const failedCommands = [];
        for (const aa of commandList) {
          let commandFound = false;
          txt = aa;
          if (isSadmin) {
            ctype = "master";
            if (!commandFound && await getPrefix(txt, 'upsw')) {
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                const mediaObject = targetMsg?.imageMessage || targetMsg?.videoMessage || targetMsg?.audioMessage;
                let options = {};
                if (mediaObject) {
                  const mime = mediaObject.mimetype;
                  const buffer = await fn.getMediaBuffer(mediaObject);
                  if (mime.includes('image')) {
                    options = { image: buffer, caption: arg || '' };
                  } else if (mime.includes('video')) {
                    options = { video: buffer, caption: arg || '' };
                  } else if (mime.includes('audio')) {
                    options = { audio: buffer, mimetype: 'audio/mp4' };
                  } else {
                    throw new Error('Format media tidak didukung untuk status.');
                  }
                } else if (arg) {
                  options = { text: arg };
                } else {
                  throw new Error(`Perintah tidak valid. Kirim teks atau media (gambar/video/audio) dengan caption \`${dbSettings.rname}upsw\`.`);
                }
                await fn.sendMessage("status@broadcast", options, {
                  backgroundColor: "#0B5345",
                  font: 5,
                  statusJidList: Object.values(store.contacts).map(contact => contact.id)
                });
                await sReply('✅ Status berhasil diunggah!');
                commandFound = true;
              } catch (error) {
                await sReply(`Gagal: ${error.message}`);
                log(error);
              }
            } else if (!commandFound && await getComs(txt, 'shutdown')) {
              await counthit(serial); await reactDone();
              commandFound = true;
              await shutdown();
            } else if (!commandFound && await getComs(txt, 'clearsampah')) {
              try {
                const filePengecualian = 'a';
                const allFiles = await fs.readdir(global.tmpDir);
                const filesToDelete = allFiles.filter(file => file !== filePengecualian);
                if (filesToDelete.length === 0) throw new EarlyExitSuccess("Folder sampah sudah bersih (tidak ada file yang perlu dihapus)");
                const deletionPromises = filesToDelete.map(file =>
                  fs.unlink(path.join(global.tmpDir, file))
                );
                await Promise.all(deletionPromises);
                await sReply(`✅ Berhasil membersihkan dan menghapus *${filesToDelete.length}* file sampah.`); await counthit(serial);
                commandFound = true;
              } catch (error) {
                if (error instanceof EarlyExitSuccess) {
                  await sReply(error.message); await counthit(serial);
                  commandFound = true;
                } else {
                  let errorMessage = `Terjadi kesalahan: Gagal membersihkan folder sampah.`;
                  if (error.code === 'ENOENT') {
                    errorMessage = `Folder sampah di '${global.tmpDir}' tidak ditemukan.`;
                  } else {
                    errorMessage += `\n\n*Detail:* ${error.message}`;
                  }
                  await sReply(errorMessage); await counthit(serial);
                }
              }
            } else if (!commandFound && await getComs(txt, 'vpslist')) {
              try {
                const passwdPath = '/etc/passwd';
                const data = await fs.readFile(passwdPath, 'utf8');
                const users = data
                  .trim()
                  .split('\n')
                  .map(line => line.split(':'))
                  .filter(parts => {
                    const homeDir = parts[5];
                    return homeDir && homeDir.startsWith('/home/');
                  })
                  .map(parts => parts[0]);
                if (users.length > 0) {
                  let userListText = `*Daftar User di Server:*\n\n`;
                  userListText += users.map(user => `👤 ${user}`).join('\n');
                  await sReply(userListText);
                } else {
                  await sReply("Tidak ditemukan user normal di server.");
                }
                await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(`Gagal mendapatkan daftar user!\n\n${error.message}`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'vpsbuat')) {
              try {
                const username = args[0];
                const password = args[1];
                if (!username || !password) throw new Error("Format perintah salah.\nContoh: `.vpsbuat namauser passwordkuat`");
                const command = `sudo useradd -m -p $(openssl passwd -1 "${password}") ${username}`;
                const { stdout } = await exec(command);
                if (stdout) {
                  await sReply(`✅ Sukses!\n\nUser *${username}* berhasil dibuat di server ${getServerIp}.`); await counthit(serial);
                  commandFound = true;
                }
              } catch (error) {
                await sReply(`Gagal!\n\n${error.stderr || error.message}`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'vpshapus')) {
              try {
                const username = args[0];
                if (!username) throw new Error("Format perintah salah.\nContoh: `.vpshapus namauser`");
                const command = `sudo deluser --remove-home ${username}`;
                await exec(command);
                await sReply(`✅ Sukses!\n\nUser *${username}* telah dihapus dari server.`); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(`Gagal!\n\n${error.stderr || error.message}`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'ctes')) {
              try {
                let body = getMaintext(txt, 'ctes')
                if (!body) throw new Error()
                let args = body.trim().split(/\s+/)
                await sPesan(args[0]); await counthit(serial);
                commandFound = true;
              } catch {
                await counthit(serial); await reactFail();
              }
            } else if (!commandFound && await getPrefix(txt, 'debug')) {
              try {
                const mode = (args[0] || '').toLowerCase();
                if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}debug on/off`);
                debugs = mode === 'on';
                await counthit(serial); await reactDone();
                commandFound = true;
              } catch (error) {
                await sReply(`Error: ${error.message}`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'logger')) {
              try {
                const mode = (args[0] || '').toLowerCase();
                if (!['silent', 'trace', 'debug', 'info', 'warn', 'error', 'fatal'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}logger silent/trace/debug/info/warn/error/fatal`);
                dbSettings.pinoLogger = mode
                await dumpSet();
                await sReply(`pinoLogger sudah dirubah menjadi: \n\n- level: ${dbSettings.pinoLogger}`);
                commandFound = true;
              } catch (error) {
                await sReply(`Error: ${error.message}`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'maintenance')) {
              try {
                const mode = (args[0] || '').toLowerCase();
                if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}maintenance on/off`);
                dbSettings.maintenance = mode === 'on';
                await dumpSet(); await counthit(serial); await reactDone();
                commandFound = true;
              } catch (error) {
                await sReply(`Error: ${error.message}`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'spam')) {
              try {
                if (arg) {
                  let _num = parseInt(args[0]);
                  if (isNaN(_num) || _num < 1) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}spam 5 pesanmu`);
                  let _pesan = args.slice(1).join(' ');
                  for (let i = 0; i < _num; i++) {
                    await sPesan(_pesan);
                    await delay(500);
                  }
                  await counthit(serial);
                  commandFound = true;
                }
              } catch (error) {
                await sReply(`Error: ${error.message}`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'addowner')) {
              try {
                if (!arg && !quotedMsg) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}addowner @user atau reply pesan user`);
                if (mentiones.length != 0) {
                  for (let men of mentiones) {
                    if (!dbMaster.master.includes(men)) {
                      dbMaster.master.push(men); await dumpMaster(); await reactDone();
                    } else {
                      await reactFail();
                    }
                  }
                } else if (quotedMsg) {
                  if (!dbMaster.master.includes(quotedParticipant)) {
                    dbMaster.master.push(quotedParticipant); await dumpMaster(); await reactDone();
                  } else {
                    await reactFail();
                  }
                }
                await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(`Error: ${error.message}`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'delowner')) {
              try {
                if (!args.length) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}delowner @user1,@user2`);
                const targets = arg.split(",").map(s => s.trim()).filter(Boolean);
                const removed = archimed(targets, dbMaster.master);
                if (!removed.length) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}delowner @user1,@user2`);
                dbMaster.master = dbMaster.master.filter(owner => !removed.includes(owner));
                await dumpMaster();
                const expelledList = removed.map((user, i) => `${i + 1}. @${user.split('@')[0]}`).join('\n');
                await sReply(`Expeled List:\n${expelledList}`); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(`Error: ${error.message}`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'backup')) {
              let backupFilePath = '';
              try {
                let fileName = 'backup_file';
                if (arg) {
                  const sanitizedArg = args[0].replace(/[^a-zA-Z0-9_-]/g, '');
                  if (sanitizedArg) {
                    fileName = sanitizedArg;
                  }
                }
                backupFilePath = path.join(global.tmpDir, `${fileName}.zip`);
                const sourceDir = '.';
                const exclusions = [
                  `"${path.basename(backupFilePath)}"`,
                  '"venv/*"',
                  '"har_and_cookies/*"',
                  '"database/db/fnbots.store.json"',
                  '"database/db/*.bak"',
                  '"src/session/*.json"',
                  '"node_modules/*"',
                  '".git/*"',
                  '".*"'
                ];
                const excludeString = exclusions.map(ex => `-x ${ex}`).join(' ');
                const command = `zip -r ${backupFilePath} ${sourceDir} ${excludeString}`;
                await exec(command);
                await fn.sendFilePath(toId, dbSettings.autocommand, backupFilePath, { quoted: m }); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(`Gagal membuat atau mengirim backup!\n\n*Pesan Error:*\n${error.message}`); await counthit(serial);
              } finally {
                await deleteFile(backupFilePath);
              }
            }
            ctype = "list"
            if (!commandFound && await getComs(txt, 'listowner')) {
              const owners = dbMaster.master;
              let list = `This is list of owner number\nTotal: ${owners.length}\n`;
              owners.forEach((owner, i) => {
                list += `\n${i + 1}. @${owner.split('@')[0]}`;
              });
              await sReply(list); await counthit(serial);
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'listbacot')) {
              const listBacot = dbBacots.bacot;
              let text = "*📄 Daftar Bacot:*\n";
              listBacot.forEach((item, index) => {
                text += `\n${index + 1}. ${item}`;
              });
              await sReply(text); await counthit(serial);
              commandFound = true;
            }
          }
          if (!(await isLimitGame(serial) && await isLimit(serial)) && ((maintenance && (isWhiteList || hakIstimewa)) || (!maintenance && (hakIstimewa || (!isBanned && !isMuted)) && !isCount(serial)))) {
            if (isSadmin || master) {
              ctype = "owner"
              if (!commandFound && await getPrefix(txt, 'cheatsaldo')) {
                try {
                  const amountToCheat = parseCheatAmount(args[0]);
                  if (!arg || amountToCheat === null) throw new Error("Format jumlah tidak valid. Contoh: 10k, 1.5m, atau angka yang sangat besar.");
                  let targetId = quotedParticipant || mentionedJidList[0] || serial;
                  if (targetId) {
                    await sPesan(`✅ Sukses cheat saldo sebanyak *${formatNumber(amountToCheat)}* kepada @${targetId.split('@')[0]}`);
                    await counthit(serial); await addBal(targetId, amountToCheat);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'autochanger')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}autochanger on/off`);
                  dbSettings.changer = mode === 'on';
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'autoresend')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}autoresend on/off`);
                  dbSettings.antideleted = mode === 'on';
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'autojoin')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}autojoin on/off`);
                  dbSettings.autojoin = mode === 'on';
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'autorespon')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}autorespon on/off`);
                  dbSettings.chatbot = mode === 'on';
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'autosticker')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}autosticker on/off`);
                  dbSettings.autosticker = mode === 'on';
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'autocorrect')) {
                try {
                  if (arg) {
                    const mode = (args[0] || '').toLowerCase();
                    const modes = { on: 1, auto: 2, off: 0 };
                    if (!(mode in modes)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}autocorrect on/auto/off`);
                    dbSettings.autocorrect = modes[mode];
                    await dumpSet(); await counthit(serial); await reactDone();
                    commandFound = true;
                  }
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'autoreject')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}autoreject on/off`);
                  dbSettings.anticall = mode === 'on';
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'autoread')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}autoread on/off`);
                  dbSettings.autoread = mode === 'on';
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'autoreadsw')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}autoreadsw on/off`);
                  dbSettings.autoreadsw = mode === 'on';
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'autolikestory')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (dbSettings.autolikestory === undefined) {
                    dbSettings.autolikestory = false;
                  }
                  if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}autolikestory on/off`);
                  dbSettings.autolikestory = mode === 'on';
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'autodownload')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (dbSettings.autodownload === undefined) {
                    dbSettings.autodownload = false;
                  }
                  if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}autodownload on/off`);
                  dbSettings.autodownload = mode === 'on';
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'upcoms')) {
                try {
                  if (arg) {
                    await upComs(args[0], args[1]); await counthit(serial); await reactDone();
                    commandFound = true;
                  }
                } catch {
                  await counthit(serial); await reactFail();
                }
              } else if (!commandFound && await getPrefix(txt, 'upbotname')) {
                try {
                  if (arg) {
                    dbSettings.botname = arg;
                    await dumpSet(); await counthit(serial); await reactDone();
                    commandFound = true;
                  }
                } catch {
                  await counthit(serial); await reactFail();
                }
              } else if (!commandFound && await getPrefix(txt, 'uptext')) {
                try {
                  if (!arg) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}uptext teksbaru`);
                  dbSettings.autocommand = arg;
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'upsname')) {
                try {
                  if (!arg) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.sname}upsname prefixbaru`);
                  dbSettings.sname = arg;
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'uprname')) {
                try {
                  if (!arg) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}uprname prefixbaru`);
                  dbSettings.rname = arg;
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'verifyuser')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['on', 'off'].includes(mode)) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}verifyuser on/off`);
                  dbSettings.verify = mode === 'on';
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'verifyuser-setlink')) {
                try {
                  if (!arg) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}verifyuser-setlink link group baru`);
                  dbSettings.linkIdentity = args[0].trim();
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'verifyuser-setgid')) {
                try {
                  if (!arg) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}verifyuser-setgid groupId baru`);
                  dbSettings.groupIdentity = args[0].trim();
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'changelimit-member')) {
                try {
                  const limit = parseInt(args[0]);
                  if (!limit || limit < 1) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}changelimit-member 100`);
                  dbSettings.memberLimit = limit;
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'changelimit-premium')) {
                try {
                  const limit = parseInt(args[0]);
                  if (!limit || limit < 1) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}changelimit-premium 100`);
                  dbSettings.limitCountPrem = limit;
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'changelimit-user')) {
                try {
                  const limit = parseInt(args[0]);
                  if (!limit || limit < 1) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}changelimit-user 100`);
                  dbSettings.limitCount = limit;
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'changelimit-game')) {
                try {
                  const limit = parseInt(args[0]);
                  if (!limit || limit < 1) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}changelimit-game 100`);
                  dbSettings.limitGame = limit;
                  await dumpSet(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'changeexif')) {
                try {
                  if (arg) {
                    const name = arg.split('|')[0];
                    const author = arg.split('|')[1];
                    dbSettings.packName = name.trim();
                    dbSettings.packAuthor = author.trim();
                    await dumpSet();
                    await sReply(`dataExif sudah dirubah menjadi: \n\n- packname: ${dbSettings.packName}\n- author: ${dbSettings.packAuthor}`);
                    commandFound = true;
                  }
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'premium')) {
                try {
                  if (arg) {
                    if (ar[0] === 'add') {
                      if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                          await handleAddPremiumUser(benet, args[2], serial);
                        }
                      } else {
                        await handleAddPremiumUser(args[1] + '@s.whatsapp.net', args[2], serial);
                      }
                    } else if (ar[0] === 'del') {
                      if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) throw new Error(`Use the correct command, example: ${dbSettings.rname}premium del 1,2,3 or @user`);
                        dbPremium.splice(getPremiumPosition(mentionedJidList[0], dbPremium), 1);
                        await dumpPrem(); await counthit(serial); await reactDone();
                      } else {
                        const input = body.split("premium del ")[1]?.trim();
                        if (!input) throw new Error(`Use the correct command, example: ${dbSettings.rname}premium del 1,2,3 or @user`);
                        await handleDeletePremiumUser(input, serial);
                      }
                    } else if (ar[0] === 'list') {
                      await handleListPremiumUsers(serial);
                    }
                    commandFound = true;
                  }
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'vip')) {
                try {
                  if (arg) {
                    if (ar[0] === 'add') {
                      if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                          await handleAddVIPUser(benet, args[2], serial);
                        }
                      } else {
                        await handleAddVIPUser(args[1] + '@s.whatsapp.net', args[2], serial);
                      }
                    } else if (ar[0] === 'del') {
                      if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) throw new Error(`Use the correct command, example: ${dbSettings.rname}vip del 1,2,3 or @user`);
                        dbVIP.splice(getVIPposition(mentionedJidList[0], dbVIP), 1);
                        await dumpVIP(); await counthit(serial); await reactDone();
                      } else {
                        const input = body.split("vip del ")[1]?.trim();
                        if (!input) throw new Error(`Use the correct command, example: ${dbSettings.rname}vip del 1,2,3 or @user`);
                        await handleDeleteVIPUser(input, serial);
                      }
                    } else if (ar[0] === 'list') {
                      await handleListVIPUsers(serial);
                    }
                    commandFound = true;
                  }
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'whitelist')) {
                try {
                  const subcmd = args[0];
                  const target = args.slice(1).join(" ");
                  if (subcmd === "reset") {
                    dbWhitelist.whitelist = [];
                    await dumpWhite(); await counthit(serial); await reactDone();
                  } else if (subcmd === "add") {
                    if (target.match(/(chat.whatsapp.com)/gi)) {
                      const inviteCode = target.split("https://chat.whatsapp.com/")[1];
                      try {
                        const { restrict, joinApprovalMode, subject, id } = await fn.groupGetInviteInfo(inviteCode);
                        if (joinApprovalMode) throw new Error(`Bot tidak bisa masuk kedalam group yang membutuhkan approval ketika ingin join.`);
                        await fn.groupAcceptInvite(inviteCode);
                        if (!dbWhitelist.whitelist.includes(id)) {
                          dbWhitelist.whitelist.push(id);
                          if (!restrict) {
                            await fn.sendPesan(id, `Halo warga grup *${subject}*!\nTerima kasih sudah mengundang ${dbSettings.botname}. Ketik *.rules* untuk melihat peraturan.`, m);
                          }
                          await dumpWhite(); await counthit(serial);
                        } else {
                          await counthit(serial); await reactDone();
                        }
                      } catch (error) {
                        await log(`Error command Whitelist add\n${error}`, true);
                        await sReply(`Error: ${error.message}`); await counthit(serial);
                      }
                    } else if (target.includes("@g.us")) {
                      if (!dbWhitelist.whitelist.includes(target)) {
                        dbWhitelist.whitelist.push(target);
                        await dumpWhite(); await counthit(serial); await reactDone();
                      } else {
                        await counthit(serial); await reactFail();
                      }
                    } else {
                      const input = body.split("whitelist add ")[1]?.trim();
                      if (!input) {
                        if (m.isGroup) {
                          if (!dbWhitelist.whitelist.includes(m.key.remoteJid)) {
                            dbWhitelist.whitelist.push(m.key.remoteJid)
                            await dumpWhite(); await counthit(serial); await reactDone();
                          } else {
                            await counthit(serial); await reactFail();
                          }
                        }
                      } else {
                        const hasil = archimed(input, mygroup);
                        if (hasil.length !== 0) {
                          for (let group of hasil) {
                            if (!dbWhitelist.whitelist.includes(group)) dbWhitelist.whitelist.push(group);
                          }
                          await dumpWhite(); await counthit(serial); await reactDone();
                        }
                      }
                    }
                  } else if (subcmd === "del") {
                    if (target.includes("@g.us")) {
                      const idx = dbWhitelist.whitelist.indexOf(target);
                      if (idx !== -1) {
                        dbWhitelist.whitelist.splice(idx, 1);
                        await dumpWhite(); await counthit(serial); await reactDone();
                      } else {
                        await counthit(serial); await reactFail();
                      }
                    } else {
                      const input = body.split("whitelist del ")[1]?.trim();
                      if (!input) {
                        if (m.isGroup) {
                          if (dbWhitelist.whitelist.includes(m.key.remoteJid)) {
                            dbWhitelist.whitelist = dbWhitelist.whitelist.filter(jid => jid !== m.key.remoteJid);
                            await dumpWhite(); await counthit(serial); await reactDone();
                          } else {
                            await counthit(serial); await reactFail();
                          }
                        }
                      } else {
                        const hasil = archimed(input, mygroup);
                        if (hasil.length !== 0) {
                          for (let group of hasil) {
                            const idx = dbWhitelist.whitelist.indexOf(group);
                            if (idx !== -1) dbWhitelist.whitelist.splice(idx, 1);
                          }
                          await dumpWhite(); await counthit(serial); await reactDone();
                        }
                      }
                    }
                  } else {
                    let list = "📜 Daftar Whitelist:\n\n";
                    if (dbWhitelist.whitelist.length !== 0) {
                      let list = "📜 Daftar Whitelist:\n\n";
                      let i = 1;
                      for (const id of dbWhitelist.whitelist) {
                        try {
                          const a = await fn.groupMetadata(id);
                          list += `${i++}. ${a.subject} | ${id}\n`;
                        } catch {
                          list += `${i++}. ❎ Tidak dapat membaca metadata | ${id}\n`;
                        }
                      }
                      await sReply(list);
                    } else {
                      await sReply(list);
                    }
                    await counthit(serial);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'silent')) {
                try {
                  if (!arg && mentiones.length === 0 && !quotedMsg) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}silent @user atau reply pesan`);
                  let targets = [];
                  if (mentiones.length > 0) {
                    targets.push(...mentiones);
                  }
                  if (quotedMsg && quotedParticipant) {
                    targets.push(quotedParticipant);
                  }
                  if (targets.length === 0 && args.length > 0) {
                    targets.push(args[0]);
                  }
                  for (let jid of targets) {
                    if (!dbMuted.muteuser.includes(jid)) dbMuted.muteuser.push(jid);
                    if (!dbMuted.mutechat.includes(jid)) dbMuted.mutechat.push(jid);
                  }
                  await dumpMute(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'unsilent')) {
                try {
                  if (!arg && !mentiones.length && !quotedMsg) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}unsilent @user atau reply pesan`);
                  let targets = [];
                  if (mentiones.length > 0) {
                    targets.push(...mentiones);
                  }
                  if (quotedMsg && quotedParticipant) {
                    targets.push(quotedParticipant);
                  }
                  if (targets.length === 0 && args.length > 0) {
                    const query = args.join(" ").trim();
                    const combinedMuteList = [...new Set([...dbMuted.muteuser, ...dbMuted.mutechat])];
                    const result = archimed(query, combinedMuteList);
                    if (result.length > 0) {
                      targets.push(...result);
                    } else {
                      if (combinedMuteList.includes(query)) {
                        targets.push(query);
                      }
                    }
                  }
                  targets = [...new Set(targets)];
                  if (targets.length === 0) throw new Error(`gunakan perintah dengan benar, contoh: ${dbSettings.rname}unsilent 1,2,3, atau @user atau reply pesan`);
                  let removed = [];
                  for (let jid of targets) {
                    if (dbMuted.muteuser.includes(jid)) {
                      dbMuted.muteuser = arrayRemove(dbMuted.muteuser, jid);
                      if (dbMuted.mutechat.includes(jid)) {
                        dbMuted.mutechat = arrayRemove(dbMuted.mutechat, jid);
                      }
                      removed.push(jid);
                    }
                  }
                  if (removed.length > 0) {
                    await dumpMute();
                    let msg = "✅ Berhasil menghapus dari mute list:\n";
                    msg += removed.map((jid, i) => `${i + 1}. @${jid.split('@')[0]}`).join("\n");
                    await sReply(msg); await counthit(serial);
                  } else {
                    await counthit(serial); await reactFail();
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'delmute')) {
                try {
                  if (!arg && mentiones.length === 0) throw new Error("❎ Masukkan jid, mention, atau query.");
                  let removed = [];
                  const input = arg
                  if (input) {
                    const targets = archimed(input, dbMuted.muteuser);
                    for (let jid of targets) {
                      dbMuted.muteuser = arrayRemove(dbMuted.muteuser, jid);
                      removed.push(jid);
                    }
                  }
                  if (mentiones.length > 0) {
                    for (let jid of mentiones) {
                      if (dbMuted.muteuser.includes(jid)) {
                        dbMuted.muteuser = arrayRemove(dbMuted.muteuser, jid);
                        removed.push(jid);
                      }
                    }
                  }
                  if (!input && mentiones.length === 0) {
                    const jid = args[0];
                    if (dbMuted.muteuser.includes(jid)) {
                      dbMuted.muteuser = arrayRemove(dbMuted.muteuser, jid);
                      removed.push(jid);
                    } else {
                      await counthit(serial); await reactFail();
                    }
                  }
                  if (removed.length > 0) {
                    const text = "✅ Dihapus dari mute list:\n" + removed.map((jid, i) => `${i + 1}. @${jid.split('@')[0]}`).join('\n');
                    await sReply(text); await dumpMute(); await counthit(serial);
                  } else {
                    await counthit(serial); await reactFail();
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'delblack')) {
                try {
                  if (!arg && mentiones.length === 0) throw new Error("❎ Masukkan jid, mention, atau query.");
                  let removed = []
                  let targetList = dbMuted.mutechat
                  if (args.length > 0) {
                    const query = arg
                    const found = archimed(query, targetList)
                    for (let f of found) {
                      targetList = arrayRemove(targetList, f)
                      removed.push(f)
                    }
                  }
                  if (mentiones.length > 0) {
                    for (let men of mentiones) {
                      if (targetList.includes(men)) {
                        targetList = arrayRemove(targetList, men)
                        removed.push(men)
                      }
                    }
                  }
                  if (args.length === 1 && !removed.includes(args[0]) && targetList.includes(args[0])) {
                    targetList = arrayRemove(targetList, args[0])
                    removed.push(args[0])
                  }
                  dbMuted.mutechat = targetList
                  await dumpMute();
                  if (removed.length > 0) {
                    let msg = "*✅ Dihapus dari blacklist:*\n"
                    let no = 1
                    for (let r of removed) {
                      if (r.endsWith(/(@s\.whatsapp\.net|@lid)$/)) {
                        msg += `\n${no}. @${r.replace(/@(\+?\d[\d ]{0,20})(@lid|@s\.whatsapp\.net)?/g, "")}`
                      } else if (r.endsWith("@g.us")) {
                        const name = await fn.getName(r)
                        msg += `\n${no}. ${name}`
                      }
                      no++
                    }
                    await sReply(msg); await counthit(serial);
                  } else {
                    await counthit(serial); await reactFail();
                  };
                  commandFound = true;
                } catch (error) {
                  await log(`Error command delblack:\n${error}`, true);
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'ubah')) {
                try {
                  const a = parseInt(args[0]);
                  if (isNaN(a)) throw new Error(`Format jumlah tidak valid. Contoh: 10, 100, atau angka yang sangat besar.`);
                  const targetId = quotedMsg ? quotedParticipant : mentionedJidList[0];
                  if (!targetId) throw new Error(`Tidak ada user yang ditargetkan. Gunakan reply pesan atau mention user.`);
                  const userData = dbLimits.limit.find(entry => entry.id === targetId);
                  if (!userData) throw new Error(`User @${targetId.split('@')[0]} tidak ditemukan dalam database.`);
                  userData.limit = a;
                  await dumpLimit(); await counthit(serial);
                  await sReply(`Sukses ubah limit menjadi *${a}* untuk @${targetId.split('@')[0]}`);
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'stats')) {
                try {
                  const [npmVersionData, diskData, virtData, ipInfo, packageJson] = await Promise.all([
                    exec('npm -v').catch(() => ({ stdout: 'N/A' })),
                    exec('df -h /').catch(() => ({ stdout: '' })),
                    exec('systemd-detect-virt').catch(() => ({ stdout: 'N/A' })),
                    axios.get('https://ipinfo.io/json').catch(() => ({ data: {} })),
                    fs.readFile('./package.json', 'utf8').then(JSON.parse).catch(() => ({}))
                  ]);
                  const used = process.memoryUsage();
                  const cpus = os.cpus();
                  const cpuModel = cpus[0].model.trim();
                  const cpuCores = cpus.length;
                  const totalMem = os.totalmem();
                  const freeMem = os.freemem();
                  const usedMem = totalMem - freeMem;
                  const nodeVersion = process.version;
                  const hostname = os.hostname();
                  const platform = os.platform();
                  const release = os.release();
                  const arch = os.arch();
                  const load = os.loadavg().map(n => n.toFixed(2)).join(', ');
                  const networkInterfaces = os.networkInterfaces();
                  let ipv4Active = 'No', ipv6Active = 'No';
                  for (const iface in networkInterfaces) {
                    for (const details of networkInterfaces[iface]) {
                      if (!details.internal) {
                        if (details.family === 'IPv4') ipv4Active = 'Yes';
                        if (details.family === 'IPv6') ipv6Active = 'Yes';
                      }
                    }
                  }
                  const npmVersion = npmVersionData.stdout.trim();
                  let diskUsed = 'N/A', diskTotal = 'N/A', diskPercent = 'N/A';
                  const dfOutput = diskData.stdout.toString().split('\n')[1];
                  if (dfOutput) {
                    const df = dfOutput.trim().split(/\s+/);
                    diskTotal = df[1] || 'N/A';
                    diskUsed = df[2] || 'N/A';
                    diskPercent = df[4] || 'N/A';
                  }
                  let virtualization = virtData.stdout.toString().trim();
                  virtualization = virtualization.toLowerCase() === 'none' ? 'Dedicated' : virtualization;
                  const ip = (ipInfo.data.ip || 'N/A').replace(/^(\d+)\.\d+\.\d+\.\d+$/, '$1.x.x.x');
                  const region = ipInfo.data.country || 'N/A';
                  const isp = ipInfo.data.org || 'N/A';
                  const dependencies = packageJson.dependencies || {};
                  const devDependencies = packageJson.devDependencies || {};
                  const totalModules = Object.keys(dependencies).length + Object.keys(devDependencies).length;
                  let topCommandsText = '*❏ Top 3 Commands*\n';
                  if (typeof coms !== 'undefined' && Object.keys(coms).length > 0) {
                    const sortedResult = Object.values(coms)
                      .filter(c => c && Object.prototype.hasOwnProperty.call(c, 'coms') && Object.prototype.hasOwnProperty.call(c, 'count'))
                      .sort((a, b) => b.count - a.count)
                      .slice(0, 3);
                    if (sortedResult.length > 0) {
                      sortedResult.forEach((e, i) => {
                        topCommandsText += `> ${i + 1}. ${e.coms} - ${e.count}\n`;
                      });
                    } else {
                      topCommandsText += '> Belum ada data perintah.\n';
                    }
                  } else {
                    topCommandsText += '> Belum ada data perintah.\n';
                  }
                  let a = '';
                  a += `*❏ BOT STATISTICS*\n`;
                  a += `> WhatsApp Version: ${version?.join('.') || 'Unknown'}\n`;
                  a += `> Node.js: ${nodeVersion}\n`;
                  a += `> NPM: ${npmVersion}\n`;
                  a += `> Installed Modules: ${totalModules}\n`;
                  a += `> Total Perintah Dijalankan: ${dbSettings?.totalhitcount || 0}\n`;
                  a += `> Bot Version: ${packageJson.version || 'Unknown'}\n`;
                  a += `> Bot Uptime: ${waktu(process.uptime())}\n`;
                  a += `> System Uptime: ${waktu(os.uptime())}\n`;
                  a += `> Load Average (1m,5m,15m): ${load}\n\n`;
                  a += `*❏ Node.js Memory Usage*\n`;
                  a += Object.keys(used).map(key => `> ${key}: ${bytesToSize(used[key])}`).join('\n') + '\n\n';
                  a += `*❏ INFO SERVER*\n`;
                  a += `> Hostname: ${hostname}\n`;
                  a += `> CPU Model: ${cpuModel}\n`;
                  a += `> CPU Core/Threads: ${cpuCores}\n`;
                  a += `> Platform: ${platform}\n`;
                  a += `> OS: ${release}\n`;
                  a += `> Kernel Arch: ${arch}\n`;
                  a += `> Virtualization: ${virtualization}\n`;
                  a += `> IPv4 Active: ${ipv4Active}\n`;
                  a += `> IPv6 Active: ${ipv6Active}\n`;
                  const ramPercentage = totalMem > 0 ? ((usedMem / totalMem) * 100).toFixed(2) + '%' : 'N/A';
                  a += `> Ram: ${bytesToSize(usedMem)} / ${bytesToSize(totalMem)} (${ramPercentage})\n`;
                  a += `> Disk: ${diskUsed} / ${diskTotal} (${diskPercent})\n\n`;
                  a += `*❏ PROVIDER INFO*\n`;
                  a += `> IP: ${ip}\n`;
                  a += `> Region: ${region}\n`;
                  a += `> ISP: ${isp}\n\n`;
                  a += topCommandsText;
                  await sReply(a.trim()); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await log(`Error saat mengambil stats:\n${error}`, true);
                  await sReply(`Terjadi kesalahan saat mengambil data statistik:\n${error.message}`);
                }
              } else if (!commandFound && await getComs(txt, 'runtime')) {
                let tms = (Date.now() / 1000) - (timeStart)
                let cts = waktu(tms)
                await sReply(cts); await counthit(serial);
                commandFound = true;
              } else if (!commandFound && await getComs(txt, 'speedtest')) {
                const b = await speedtest();
                let a = '';
                a += `*❏ Internet Speed*\n`;
                a += `> Download: ${b.download} Mbps\n`;
                a += `> Upload: ${b.upload} Mbps\n`;
                a += `> Ping: ${b.ping} ms`;
                await sReply(a); await counthit(serial);
                commandFound = true;
              } else if (!commandFound && await getComs(txt, 'trialeave')) {
                const groups = await store.getAllGroups();
                const targetGroups = groups.map(g => g.id).filter(id => !isWhite(id));
                for (const idGroup of targetGroups) {
                  if (idGroup === toId) continue;
                  try {
                    await fn.sendPesan(idGroup, `Jika ingin bot tetap stay di group, admin silakan hubungi creator atau owner`, m);
                    await delay(1000);
                    await fn.groupLeave(idGroup);
                    delete store.conversations[idGroup];
                    delete store.groupMetadata[idGroup];
                    delete store.messages[idGroup];
                    delete store.presences[idGroup];
                    storeDirty = true;
                    await delay(2000);
                  } catch (error) {
                    await log(`Gagal keluar dari grup ${idGroup}:\n${error}`, true);
                  }
                }
                await counthit(serial); await reactDone();
                commandFound = true;
              } else if (!commandFound && await getComs(txt, 'resetmuteuser')) {
                dbMuted.muteuser = []
                await dumpMute(); await counthit(serial); await reactDone();
                commandFound = true;
              } else if (!commandFound && await getComs(txt, 'resetlimitall')) {
                const meki = dbLimits.limit.map(i => ({ id: i.id, limit: dbSettings.limitCount, warnedLimit: false }));
                const memek = dbLimitGame.limitgame.map(i => ({ id: i.id, limit: dbSettings.limitGame, warnedLimit: false }));
                dbLimits.limit = meki;
                dbLimitGame.limitgame = memek;
                await dumpLimitGame(); await dumpLimit(); await counthit(serial); await reactDone();
                commandFound = true;
              } else if (!commandFound && await getPrefix(txt, 'resetlimit')) {
                try {
                  if (arg) {
                    const targetId = mentionedJidList[0];
                    for (let i of dbLimits.limit) {
                      if (i.id === targetId) {
                        i.limit = dbSettings.limitCount;
                        i.warnedLimit = false;
                        break;
                      }
                    }
                    for (let i of dbLimitGame.limitgame) {
                      if (i.id === targetId) {
                        i.limit = dbSettings.limitGame;
                        i.warnedLimit = false;
                        break;
                      }
                    }
                    await dumpLimit(); await dumpLimitGame(); await counthit(serial); await reactDone();
                    commandFound = true;
                  }
                } catch {
                  await counthit(serial); await reactFail();
                }
              } else if (!commandFound && await getPrefix(txt, 'trialjoin')) {
                try {
                  if (!m.isGroup) {
                    if (arg) {
                      if (args[0].match(/(chat\.whatsapp\.com)/gi)) {
                        const inviteCode = args[0].split("https://chat.whatsapp.com/")[1];
                        if (inviteCode) {
                          const { restrict, joinApprovalMode, subject, participants, id } = await fn.groupGetInviteInfo(inviteCode);
                          if (joinApprovalMode) throw new Error('Grup memerlukan persetujuan admin!\n\nBot tidak bisa bergabung jika admin mengaktifkan "Join Approval Mode".');
                          if (!(isSadmin || master) && participants.length < dbSettings.memberLimit) throw new Error(`Grup terlalu kecil!\n\nMember: ${participants.length}\nMinimal: ${dbSettings.memberLimit}\nBot hanya bergabung ke grup dengan ${dbSettings.memberLimit}+ member.`);
                          await fn.groupAcceptInvite(inviteCode);
                          if (!restrict) {
                            const welcomeMessage = `👋 Halo *${subject}*!\n\n🤖 ${dbSettings.botname} siap membantu!\n📋 Ketik *.rules* untuk peraturan bot.\n💡 Ketik *.menu* untuk daftar fitur.`;
                            await fn.sendPesan(id, welcomeMessage, m);
                          }
                          await sReply(`*BERHASIL BERGABUNG!*\n\nNama Grup: ${subject}\nMember: ${participants.length}\nID: ${id}`); await limitAdd(serial); await counthit(serial);
                          commandFound = true;
                        }
                      } else {
                        throw new Error('Format link salah!\nContoh: https://chat.whatsapp.com/XXXXXX');
                      }
                    } else {
                      throw new Error('Link grup tidak ditemukan!\nKetik: *.trialjoin [link_grup]*');
                    }
                  }
                } catch (error) {
                  await log(`Error_trialjoin:\n${error}`, true);
                  let errorMessage = 'Gagal bergabung ke grup!\n\n';
                  if (error.message.includes('persetujuan admin')) errorMessage += error.message;
                  else if (error.message.includes('terlalu kecil')) errorMessage += error.message;
                  else if (error.message.includes('invalid') || error.message.includes('tidak valid')) {
                    errorMessage += 'Link tidak valid atau sudah kadaluarsa!';
                  } else {
                    errorMessage += `Error: ${error.message || 'Unknown error'}`;
                  }
                  await sReply(errorMessage); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'broadcast')) {
                try {
                  let broadcastMode = 'all';
                  let messageContent = args.join(' ');
                  if (args[0]?.toLowerCase() === '--whitelist') {
                    broadcastMode = 'whitelist';
                    messageContent = args.slice(1).join(' ');
                  } else if (args[0]?.toLowerCase() === '--nonwhitelist') {
                    broadcastMode = 'nonwhitelist';
                    messageContent = args.slice(1).join(' ');
                  }
                  if (!messageContent) throw new Error(
                    `Masukkan pesan untuk broadcast.\n\n` +
                    `*Penggunaan:*\n` +
                    `1. ${dbSettings.rname}broadcast [pesan]\n` +
                    `   (Kirim ke SEMUA grup)\n\n` +
                    `2. ${dbSettings.rname}broadcast --whitelist [pesan]\n` +
                    `   (Kirim HANYA ke grup whitelist)\n\n` +
                    `3. ${dbSettings.rname}broadcast --nonwhitelist [pesan]\n` +
                    `   (Kirim HANYA ke grup non-whitelist)`
                  );
                  const allGroups = await store.getAllGroups();
                  const allGroupIds = allGroups.map(group => group.id);
                  let targetGroups;
                  if (broadcastMode === 'whitelist') {
                    targetGroups = allGroupIds.filter(id => isWhite(id));
                  } else if (broadcastMode === 'nonwhitelist') {
                    targetGroups = allGroupIds.filter(id => !isWhite(id));
                  } else { 
                    targetGroups = allGroupIds;
                  }
                  if (targetGroups.length === 0) throw new Error('Tidak ada grup target yang ditemukan untuk mode ini.');
                  for (const idGroup of targetGroups) {
                    if (isWhite(idGroup)) {
                      await fn.sendFilePath(idGroup, `${dbSettings.botname} Broadcast\n\n${messageContent}`, './src/media/fotobot.jpeg', { quoted: m });
                    } else {
                      await fn.sendPesan(idGroup, messageContent, m);
                    }
                    await delay(1000);
                  }
                  await sReply(`Broadcast [Mode: ${broadcastMode}] berhasil dikirim ke ${targetGroups.length} grup.`);
                  await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              }
              ctype = "list"
              if (!commandFound && await getComs(txt, 'liststory')) {
                try {
                  const statusStore = store.status;
                  const usersWithStories = Object.entries(statusStore);
                  if (!usersWithStories || usersWithStories.length === 0) throw new Error('Saat ini tidak ada pengguna yang memiliki story aktif.');
                  let replyText = '*Daftar Story Pengguna Aktif*\n\n';
                  const mentions = [];
                  let count = 0;
                  for (const [jid, statusData] of usersWithStories) {
                    const storyCount = statusData.array.length;
                    if (storyCount > 0) {
                      count++;
                      const userNumber = jid.split('@')[0];
                      replyText += `${count}. @${userNumber} || ${storyCount} story\n`;
                      mentions.push(jid);
                    }
                  }
                  if (count === 0) throw new Error('Saat ini tidak ada pengguna yang memiliki story aktif.');
                  await sReply(replyText); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'listblock')) {
                const blockNumber = await fn.fetchBlocklist();
                await sReply(`Total Number Blocked: ${blockNumber.length}\n\n` + blockNumber.map((num, i) => `${i + 1}. @${num.split('@')[0]}`).join('\n')); await counthit(serial);
                commandFound = true;
              } else if (!commandFound && await getComs(txt, 'listadmin')) {
                const metadata = await fn.groupMetadata(toId);
                const groupAdmins = metadata?.participants?.reduce((a, b) => {
                  if (b.admin) a.push({ id: b.id, admin: b.admin });
                  return a;
                }, []) || [];
                const adminListText = groupAdmins.map((admin, i) => `${i + 1}. @${admin.id.split('@')[0]}`).join('\n');
                await fn.sendPesan(toId, `Daftar Admin Group: ${groupAdmins.length}\n\n` + adminListText, m); await counthit(serial);
                commandFound = true;
              } else if (!commandFound && await getComs(txt, 'listmute')) {
                const list = dbMuted.muteuser;
                await sReply(`Daftar Hitam Orang:\n\n` + list.map((id, i) => `${i + 1}. @${id.split('@')[0]}`).join('\n')); await counthit(serial);
                commandFound = true;
              } else if (!commandFound && await getComs(txt, 'listblack')) {
                const udud = dbMuted.mutechat
                let anu = "*📄 Blacklist Group & User:*\n"
                let nom = 1
                for (let i of udud) {
                  const name = await fn.getName(i)
                  if (i.endsWith("@g.us")) {
                    anu += `\n${nom}. Group ${name}`
                  } else {
                    const tag = "@" + i.split('@')[0]
                    anu += `\n${nom}. ${tag}`
                  }
                  nom += 1
                }
                await sReply(anu); await counthit(serial);
                commandFound = true;
              } else if (!commandFound && await getComs(txt, 'listgc')) {
                try {
                  const allGroupMetadata = Object.values(store.groupMetadata);
                  if (!allGroupMetadata || allGroupMetadata.length === 0) throw new Error('Saat ini saya tidak berada di grup manapun.');
                  let replyText = `● *LIST GROUP CHAT*\n\nTotal Group : ${allGroupMetadata.length} Group\n\n`;
                  const mentions = [];
                  for (const metadata of allGroupMetadata) {
                    if (!metadata.subject) continue;
                    let ownerJid = metadata.owner || '';
                    let ownerMention = ownerJid ? `@${ownerJid.split('@')[0]}` : '-';
                    if (ownerJid) {
                      mentions.push(ownerJid);
                    }
                    const creationDate = dayjs.unix(metadata.creation).format('DD/MM/YYYY HH:mm:ss');
                    replyText += `*Nama :* ${metadata.subject}\n` +
                      `*Admin Utama :* ${ownerMention}\n` +
                      `*ID :* ${metadata.id}\n` +
                      `*Dibuat :* ${creationDate}\n` +
                      `*Member :* ${metadata.participants.length}\n\n` +
                      `=====================\n\n`;
                  }
                  await sReply(replyText); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'listpc')) {
                try {
                  const messageStore = store.messages;
                  if (!messageStore || Object.keys(messageStore).length === 0) throw new Error('Database pesan kosong.');
                  const userMessageCounts = {};
                  const mentions = [];
                  for (const chatId in messageStore) {
                    const chatHistory = messageStore[chatId]?.array || [];
                    for (const msg of chatHistory) {
                      if (msg.fromMe || !msg.sender || !msg.sender.endsWith('@s.whatsapp.net')) continue;
                      if (['protocolMessage', 'reactionMessage'].includes(msg.type)) continue;
                      const senderJid = msg.sender;
                      if (!userMessageCounts[senderJid]) {
                        userMessageCounts[senderJid] = 0;
                      }
                      userMessageCounts[senderJid]++;
                    }
                  }
                  if (Object.keys(userMessageCounts).length === 0) throw new Error('Tidak ada pesan dari pengguna yang bisa dihitung.');
                  const sortedUsers = Object.entries(userMessageCounts).sort(([, countA], [, countB]) => countB - countA);
                  let replyText = '*Daftar Jumlah Pesan per Pengguna*\n\n';
                  sortedUsers.forEach(([jid, count], index) => {
                    const userNumber = jid.split('@')[0];
                    replyText += `${index + 1}. @${userNumber} || ${count} pesan\n`;
                    mentions.push(jid);
                  });
                  await sReply(replyText); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error: ${error.message}`); await counthit(serial);
                }
              }
              ctype = "hbot"
              if (!commandFound && await getComs(txt, 'updateprofilepicture')) {
                try {
                  const targetMsg = quotedMsg ? m.quoted || m : m.message;
                  const mimeType = targetMsg?.imageMessage?.mimetype;
                  if (!mimeType || !mimeType.startsWith('image/')) throw new Error(`Silakan balas pesan gambar atau kirim gambar untuk mengubah foto profil bot.`);
                  const resBuffer = await fn.getMediaBuffer(targetMsg);
                  if (!resBuffer) throw new Error(`Gagal mendapatkan gambar dari pesan yang dibalas.`);
                  const filename = await saveFile(resBuffer, "tmp_group_icon");
                  await fn.updateProfilePicture(botNumber, { url: filename });
                  await deleteFile(filename); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'deleteprofilepicture')) {
                try {
                  await fn.removeProfilePicture(botNumber);
                  await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'updateprofilestatus')) {
                try {
                  if (!arg) throw new Error(`gunakan argumen yang valid seperti ${dbSettings.rname}updateprofilestatus Sedang Liburan!`);
                  await fn.updateProfileStatus(arg.trim()); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'updateprofilename')) {
                try {
                  if (!arg) throw new Error(`gunakan argumen yang valid seperti ${dbSettings.rname}updateprofilename Udah Yappingnya?`);
                  await fn.updateProfileName(arg.trim()); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'savekontak')) {
                try {
                  let targetJid;
                  let contactName;
                  const mentioned = mentionedJidList[0];
                  if (mentioned) {
                    targetJid = mentioned;
                    contactName = arg.replace(/@\d+/g, '').trim();
                    if (!contactName) throw new Error(`Saat menggunakan mention, nama harus disertakan.\nContoh: ${dbSettings.rname}savekontak Yanto Baut @62812...`);
                  } else if (quotedMsg) {
                    targetJid = quotedParticipant;
                    contactName = arg;
                    if (!contactName) throw new Error(`Saat membalas pesan, nama harus disertakan.\nContoh: ${dbSettings.rname}savekontak Yanto Kopling`);
                  } else {
                    const parts = arg.split('|').map(s => s.trim());
                    if (parts.length < 2 || !parts[0] || !parts[1]) throw new Error(`Format salah.\nGunakan: ${dbSettings.rname}savekontak Nama|Nomor\nContoh: ${dbSettings.rname}savekontak Yanto Ngocok | 6281234567890`);
                    contactName = parts[0];
                    const sanitizedNumber = parts[1].replace(/[^0-9]/g, '');
                    targetJid = `${sanitizedNumber}@s.whatsapp.net`;
                  }
                  if (!targetJid || !contactName) throw new Error('Gagal menentukan target atau nama kontak.');
                  const contactData = {
                    fullName: contactName,
                    saveOnPrimaryAddressbook: true
                  };
                  await fn.addOrEditContact(targetJid, contactData);
                  await sReply(`✅ Sukses!\n\nKontak "${contactName}" untuk nomor ${targetJid.split('@')[0]} berhasil disimpan.`); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'hapuskontak')) {
                try {
                  let targetJid;
                  const mentioned = mentionedJidList[0];
                  if (mentioned) {
                    targetJid = mentioned;
                  } else if (quotedMsg) {
                    targetJid = quotedParticipant;
                  } else if (arg) {
                    const sanitizedNumber = arg.replace(/[^0-9]/g, '');
                    if (!sanitizedNumber) throw new Error("Nomor tidak valid. Berikan nomor, mention, atau balas pesan.");
                    targetJid = `${sanitizedNumber}@s.whatsapp.net`;
                  } else {
                    throw new Error(`Anda harus menunjuk target!\nBalas pesan, mention, atau berikan nomor.\nContoh: ${dbSettings.rname}hapuskontak @user`);
                  }
                  await fn.removeContact(targetJid);
                  await sReply(`✅ Sukses!\n\nNama untuk kontak ${targetJid.split('@')[0]} telah dihapus.`); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'buatgroup')) {
                try {
                  const args = arg.split('|');
                  const groupSubject = args[0]?.trim();
                  if (!groupSubject) throw new Error(`Anda harus memberikan nama grup.\nContoh: ${dbSettings.rname}buatgroup Nama Yanto | @user1 @user2`);
                  const participantSet = new Set();
                  participantSet.add(serial);
                  const mentioned = mentionedJidList;
                  if (mentioned.length > 0) {
                    mentioned.forEach(jid => participantSet.add(jid));
                  } else if (quotedMsg) {
                    participantSet.add(quotedParticipant);
                  } else if (args.length > 1 && args[1]) {
                    const numbers = args[1].split(',').map(num => num.trim());
                    for (const num of numbers) {
                      const sanitizedNumber = num.replace(/[^0-9]/g, '');
                      if (sanitizedNumber) {
                        participantSet.add(`${sanitizedNumber}@s.whatsapp.net`);
                      }
                    }
                  }
                  const participants = [...participantSet];
                  if (participants.length < 2) throw new Error(`Grup memerlukan minimal 2 anggota. Silakan mention, balas pesan, atau berikan nomor.`);
                  await fn.groupCreate(groupSubject, participants); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'getstory')) {
                try {
                  const args = arg.trim().split(/\s+/);
                  if (args.length < 2) throw new Error(`Format salah.\nContoh: ${dbSettings.rname}getstory 1 1-3`);
                  const userIndex = parseInt(args[0]);
                  const ruleString = args.slice(1).join(' ');
                  if (isNaN(userIndex) || userIndex <= 0) throw new Error('Nomor urut harus angka valid > 0.');
                  const statusStore = store.status;
                  const usersWithStories = Object.keys(statusStore).filter(jid => statusStore[jid]?.array?.length > 0);
                  if (usersWithStories.length === 0) throw new Error('Tidak ada pengguna dengan story aktif.');
                  const targetUserIndex = userIndex - 1;
                  if (targetUserIndex >= usersWithStories.length) throw new Error(`Nomor urut ${userIndex} tidak valid.`);
                  const targetJid = usersWithStories[targetUserIndex];
                  const allStories = statusStore[targetJid].array;
                  const selectedStories = archimed(ruleString, allStories);
                  if (selectedStories.length === 0) throw new Error(`Tidak ada story yang cocok dengan aturan "${ruleString}".`);
                  for (const story of selectedStories) {
                    const storyType = story.type;
                    let success = false;
                    if (storyType === 'extendedTextMessage') {
                      let tempImagePath = '';
                      try {
                        const authorJid = story.sender;
                        const authorName = store.contacts?.[authorJid]?.name || story.pushName || 'Nama Tidak Diketahui';
                        const textContent = story.body;
                        let profilePicBuffer;
                        try {
                          profilePicBuffer = await fn.profilePictureUrl(authorJid, 'image');
                        } catch {
                          profilePicBuffer = await fs.readFile('./src/media/fotobot.jpeg');
                        }
                        const resBuffer = await generateFakeStory({
                          caption: textContent,
                          username: authorName,
                          profilePicBuffer: profilePicBuffer
                        });
                        tempImagePath = await saveFile(resBuffer, "getstory", 'jpg');
                        await fn.sendFilePath(toId, '', tempImagePath, { quoted: m });
                        success = true;
                      } finally {
                        await deleteFile(tempImagePath);
                      }
                    } else if (storyType === 'imageMessage' || storyType === 'videoMessage' || storyType === 'audioMessage') {
                      let stream = await fn.getMediaBuffer(story.message);
                      const mediaType = storyType.replace('Message', '');
                      const messageToSend = { caption: story.body || '', [mediaType]: stream };
                      if (storyType === 'audioMessage') messageToSend.mimetype = 'audio/mp4';
                      await fn.sendMessage(toId, messageToSend, { quoted: m });
                      success = true;
                    }
                    if (success) {
                      const originalStoreArray = store.status[targetJid].array;
                      const storyIndex = originalStoreArray.findIndex(s => s.key.id === story.key.id);
                      if (storyIndex > -1) {
                        originalStoreArray.splice(storyIndex, 1);
                        storeDirty = true;
                      }
                    }
                    await delay(1500);
                  }
                  await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'checkgroup')) {
                try {
                  const parts = txt.trim().split(/\s+/);
                  if (parts.length < 3) throw new Error(`Penggunaan:\n• ${dbSettings.rname}checkgroup <nomor> member\n• ${dbSettings.rname}checkgroup <nomor> admins\n• ${dbSettings.rname}checkgroup <nomor> user <nomor_hp>\n• ${dbSettings.rname}checkgroup <nomor> info <nomor_member>\n\nGunakan ${dbSettings.rname}mygroup untuk melihat daftar group`);
                  const nomorGroup = parseInt(parts[1]);
                  const subcommand = parts[2].toLowerCase();
                  const args = parts.slice(3);
                  if (isNaN(nomorGroup) || nomorGroup < 1 || nomorGroup > mygroup.length) throw new Error(`Nomor group tidak valid!\n\nRange yang tersedia: 1 - ${mygroup.length}\nGunakan ${dbSettings.rname}mygroup untuk melihat daftar lengkap`);
                  const idGroup = mygroup[nomorGroup - 1];
                  const members = mygroupMembers[idGroup];
                  if (!members || members.length === 0) throw new Error('Data member belum tersedia atau group kosong.\n\nCoba refresh data group terlebih dahulu.');
                  if (subcommand === 'member') {
                    const mentions = members.map(m => m.id);
                    const memberList = mentions.map((m, index) => `${index + 1}. @${m.split('@')[0]}`).join('\n');
                    await sReply(`*DAFTAR MEMBER GROUP*\n\n${memberList}\n\nTotal: ${members.length} member`); await counthit(serial);
                  } else if (subcommand === 'admins') {
                    const admins = members.filter(m => m.admin);
                    if (admins.length === 0) throw new Error('Tidak ada admin di group ini.');
                    const adminList = admins.map((admin, index) => `${index + 1}. @${admin.id.split('@')[0]}`).join('\n');
                    await sReply(`*DAFTAR ADMIN GROUP*\n\n${adminList}\n\nTotal: ${admins.length} admin`); await counthit(serial);
                  } else if (subcommand === 'user') {
                    if (args.length < 1) throw new Error(`Format salah!\n\nContoh penggunaan:\n${dbSettings.rname}checkgroup 1 user 6281234567890`);
                    const targetNumber = args[0].replace(/[^0-9]/g, '');
                    const user = members.find(member => {
                      const phone = member.id.split('@')[0];
                      phone.endsWith(targetNumber) || phone === targetNumber;
                    });
                    if (user) {
                      const userInfo = `*USER DITEMUKAN*\n\nNama: ${user.name || 'Tidak diketahui'}\nNomor: ${user.id.split('@')[0]}\nID: ${user.id}\nStatus: ${user.admin ? 'Admin' : 'Member'}`;
                      await sReply(userInfo); await counthit(serial);
                    } else {
                      await sReply(`User dengan nomor *${targetNumber}* tidak ditemukan di grup ini.\n\nPastikan nomor yang dicari benar dan user masih ada di grup.`); await counthit(serial);
                    }
                  } else if (subcommand === 'info') {
                    if (args.length < 1) throw new Error(`Format salah!\n\nContoh penggunaan:\n${dbSettings.rname}checkgroup 1 info 1 3 5\n\nGunakan nomor urut member dari daftar member`);
                    for (const arg of args) {
                      const nomorMember = parseInt(arg);
                      if (isNaN(nomorMember) || nomorMember < 1 || nomorMember > members.length) {
                        await sReply(`Nomor member tidak valid: *${arg}*\n\nRange yang tersedia: 1 - ${members.length}`); await counthit(serial); continue;
                      }
                      const user = members[nomorMember - 1];
                      const name = await fn.getName(user.id);
                      try {
                        let ppUrl;
                        try {
                          ppUrl = await fn.profilePictureUrl(user.id, 'image');
                        } catch {
                          ppUrl = await loadImage(await fs.readFile('./src/media/apatar.png'));
                        }
                        const caption = `*INFO MEMBER #${nomorMember}*\n\nNama: ${name || 'Tidak diketahui'}\nNomor: ${user.id.split('@')[0]}\nStatus: ${user.admin ? 'Admin' : 'Member'}\nID: ${user.id}`;
                        await fn.sendFileUrl(toId, ppUrl, caption, m); await counthit(serial);
                      } catch {
                        await sReply(`Gagal mengambil info user @${user.id.split('@')[0]}\n\nCoba lagi dalam beberapa saat.`); await counthit(serial);
                      }
                    }
                  } else {
                    await sReply('Subcommand tidak dikenal!\n\nPilihan yang tersedia:\n• member - Lihat semua member\n• admins - Lihat admin group\n• user - Cari user berdasarkan nomor\n• info - Info detail member'); await counthit(serial);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'mygroup')) {
                try {
                  await updateMyGroup(fn);
                  if (mygroup.length !== 0) {
                    let teks = `📋 List Group ${dbSettings.botname}:\n`;
                    let nom = 1;
                    for (const id of mygroup) {
                      const meta = store.groupMetadata[id] || { subject: 'Tidak diketahui', participants: [] };
                      teks += `\n${nom}. ${meta.subject || 'Tidak diketahui'} || ${mygroupMembers[id]?.length || 0}`;
                      nom++;
                    }
                    await sReply(teks); await counthit(serial);
                    commandFound = true;
                  }
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'unblockall')) {
                try {
                  const blockNumber = await fn.fetchBlocklist();
                  await Promise.all(blockNumber.map(number => fn.updateBlockStatus(number, 'unblock'))); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'clearchat')) {
                const messageTimestamp = m.timestamp && m.timestamp !== 0 ? m.timestamp : Date.now();
                const modifyOptions = {
                  lastMessages: [{
                    key: m.key,
                    messageTimestamp: messageTimestamp
                  }]
                };
                if (m.isGroup) {
                  modifyOptions.clear = true;
                } else {
                  modifyOptions.delete = true;
                }
                try {
                  await fn.chatModify(modifyOptions, toId);
                  if (m.isGroup) delete store.groupMetadata[toId];
                  delete store.conversations[toId];
                  delete store.messages[toId];
                  delete store.presences[toId];
                  storeDirty = true;
                  await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'getprivacysettings')) {
                try {
                  const privacySettings = await fn.fetchPrivacySettings(true);
                  let privacyMessage = '*Pengaturan Privasi:*\n\n';
                  privacyMessage += `- *Read Receipts*: ${privacySettings.readreceipts}\n`;
                  privacyMessage += `- *Profil*: ${privacySettings.profile}\n`;
                  privacyMessage += `- *Status*: ${privacySettings.status}\n`;
                  privacyMessage += `- *Online*: ${privacySettings.online}\n`;
                  privacyMessage += `- *Last Seen*: ${privacySettings.last}\n`;
                  privacyMessage += `- *Groups*: ${privacySettings.groupadd}\n`;
                  privacyMessage += `- *Calls?*: ${privacySettings.calladd}\n`;
                  privacyMessage += `- *Stiker*: ${privacySettings.stickers}\n`;
                  privacyMessage += `- *Pesan*: ${privacySettings.messages}\n`;
                  await sReply(privacyMessage); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'setprivacy-lastseen')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['all', 'contacts', 'contact_blacklist', 'none'].includes(mode)) throw new Error(`gunakan argumen seperti all, contacts, contact_blacklist, none`);
                  await fn.updateLastSeenPrivacy(mode); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'setprivacy-online')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['all', 'match_last_seen'].includes(mode)) throw new Error(`gunakan argumen seperti all, match_last_seen`);
                  await fn.updateOnlinePrivacy(mode); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'setprivacy-picture')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['all', 'contacts', 'contact_blacklist', 'none'].includes(mode)) throw new Error(`gunakan argumen seperti all, contacts, contact_blacklist, none`);
                  await fn.updateProfilePicturePrivacy(mode); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'setprivacy-status')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['all', 'contacts', 'contact_blacklist', 'none'].includes(mode)) throw new Error(`gunakan argumen seperti all, contacts, contact_blacklist, none`);
                  await fn.updateStatusPrivacy(mode); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'setprivacy-readreceipts')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['all', 'none'].includes(mode)) throw new Error(`gunakan argumen seperti all, none`);
                  await fn.updateReadReceiptsPrivacy(mode); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'setprivacy-groups')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['all', 'contacts', 'contact_blacklist'].includes(mode)) throw new Error(`gunakan argumen seperti all, contacts, contact_blacklist`);
                  await fn.updateGroupsAddPrivacy(mode); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'setprivacy-calls')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['all', 'known'].includes(mode)) throw new Error(`gunakan argumen seperti all, known`);
                  await fn.updateCallPrivacy(mode); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'setprivacy-messages')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['all', 'contacts'].includes(mode)) throw new Error(`gunakan argumen seperti all, contacts`);
                  await fn.updateMessagesPrivacy(mode); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'default-ephemeral')) {
                try {
                  const _waktu = args[0]
                  if (_waktu === '90d') {
                    await fn.updateDefaultDisappearingMode(7776000);
                  } else if (_waktu === '7d') {
                    await fn.updateDefaultDisappearingMode(604800);
                  } else if (_waktu === '1d' || _waktu === '24jam') {
                    await fn.updateDefaultDisappearingMode(86400);
                  } else if (_waktu === 'off') {
                    await fn.updateDefaultDisappearingMode(0);
                  } else if (args.length > 1) {
                    throw new Error('gunakan argument:\n90d, 7d, 1d, 24jam, off')
                  } else {
                    throw new Error('gunakan argument:\n90d, 7d, 1d, 24jam, off')
                  };
                  await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'leaveallgroup')) {
                try {
                  let mode = 'all';
                  let farewellText = '';
                  if (args.length > 0) {
                    if (args[0] === '--free') {
                      mode = 'free';
                      farewellText = args.slice(1).join(' ').trim();
                    } else if (args[0] === '--paid') {
                      mode = 'paid';
                      farewellText = args.slice(1).join(' ').trim();
                    } else {
                      farewellText = args.join(' ').trim();
                    }
                  }
                  await sReply(`Mode terdeteksi: *${mode}*. Memulai proses...`);
                  const allGroupIds = Object.keys(store.groupMetadata);
                  const whitelistIds = dbWhitelist.whitelist;
                  let targetGroupIds = [];
                  if (mode === 'free') {
                    targetGroupIds = allGroupIds.filter(id => !whitelistIds.includes(id));
                  } else if (mode === 'paid') {
                    targetGroupIds = allGroupIds.filter(id => whitelistIds.includes(id));
                  } else {
                    targetGroupIds = allGroupIds;
                  }
                  if (targetGroupIds.length === 0) throw new Error('Tidak ada grup target yang sesuai dengan mode yang dipilih.');
                  let leftCount = 0;
                  let failedCount = 0;
                  for (const idGroup of targetGroupIds) {
                    if (idGroup === toId) continue;
                    try {
                      if (farewellText) {
                        await fn.sendPesan(idGroup, farewellText, m);
                        await delay(1000);
                      }
                      await fn.groupLeave(idGroup);
                      delete store.conversations[idGroup];
                      delete store.groupMetadata[idGroup];
                      delete store.messages[idGroup];
                      delete store.presences[idGroup];
                      storeDirty = true;
                      leftCount++;
                      await delay(2000);
                    } catch (error) {
                      failedCount++;
                      await log(`Gagal keluar dari grup ${idGroup}:\n${error}`, true);
                    }
                  }
                  await sReply(`Proses selesai.\n\nBerhasil keluar dari *${leftCount}* grup.\nGagal pada *${failedCount}* grup.`);
                  await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'chat-archive')) {
                try {
                  const mode = (args[0] || '').toLowerCase();
                  if (!['on', 'off'].includes(mode)) throw new Error(`Gunakan perintah dengan benar, contoh: ${dbSettings.rname}chat-archive on/off`);
                  const arsip = mode === 'on';
                  const messageTimestamp = m.timestamp && m.timestamp !== 0 ? m.timestamp : Date.now();
                  const modifyOptions = {
                    archive: arsip,
                    lastMessages: [{
                      key: m.key,
                      messageTimestamp: messageTimestamp
                    }]
                  };
                  await fn.chatModify(modifyOptions, toId);
                  await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              }
            }
            if (isSadmin || master || vip) {
              ctype = "vip"
              if (!commandFound && await getPrefix(txt, 'checkvip')) {
                let targetId;
                try {
                  targetId = mentionedJidList[0] || serial;
                  const expireTimestamp = getVIPexpired(targetId, dbVIP);
                  if (!expireTimestamp || expireTimestamp < Date.now()) throw new Error(`@${targetId.split('@')[0]} tidak memiliki status VIP aktif.`);
                  const remainingMs = expireTimestamp - Date.now();
                  const durationLeft = dayjs.duration(remainingMs);
                  const durationMessage = formatDurationMessage(durationLeft);
                  await sReply(`「 *VIP EXPIRE* 」\n\n➸ *ID*: @${targetId.split('@')[0]}\n➸ ${durationMessage}`);
                  await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(`@${targetId ? targetId.split('@')[0] : 'ID'} tidak memiliki status VIP aktif.`);
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'giftlimit')) {
                try {
                  const limitValue = parseInt(args[0]);
                  if (isNaN(limitValue)) throw new Error(`Nilai limit tidak valid!\n\nCara penggunaan:\n${dbSettings.rname}giftlimit <jumlah>\n\nContoh: ${dbSettings.rname}giftlimit 10\n(Reply pesan target atau mention user)`);
                  if (limitValue > 50) throw new Error(`Jumlah limit terlalu besar!\n\nMaksimal gift limit: 50\nGunakan nilai antara 1-50.`);
                  if (limitValue < 1) throw new Error(`Jumlah limit terlalu kecil!\n\nMinimal gift limit: 1\nMasukkan nilai positif untuk memberikan limit.`);
                  let targetId;
                  if (quotedMsg) {
                    targetId = quotedParticipant;
                  } else if (mentionedJidList && mentionedJidList.length > 0) {
                    targetId = mentionedJidList[0];
                  }
                  if (!targetId) throw new Error(`Target user tidak ditemukan!\n\nCara penggunaan:\n• Reply pesan user yang ingin diberi limit, atau\n• Mention user dengan @username\n\nContoh: ${dbSettings.rname}giftlimit 10 @user`);
                  if (targetId === serial) throw new Error('Tidak bisa memberikan limit kepada diri sendiri!\n\nGunakan command ini untuk memberikan limit kepada user lain.');
                  let userLimit = dbLimits.limit.find(u => u.id === targetId);
                  const previousLimit = userLimit ? userLimit.limit : 0;
                  if (userLimit) {
                    userLimit.limit += limitValue;
                  } else {
                    dbLimits.limit.push({ id: targetId, limit: limitValue });
                  }
                  await dumpLimit();
                  const successMessage = `*GIFT LIMIT BERHASIL!*\n\nJumlah diberikan: ${limitValue} limit\nPenerima: @${targetId.split('@')[0]}\nLimit sebelumnya: ${previousLimit}\nLimit sekarang: ${previousLimit + limitValue}\n\nSelamat! Limit telah berhasil diberikan.`;
                  await sReply(successMessage); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'checklimit')) {
                try {
                  const targetId = mentionedJidList[0];
                  if (!targetId) throw new Error(`Tidak ada user yang ditargetkan!\n\nCara penggunaan:\n• Reply pesan user yang ingin dicek limitnya, atau\n• Mention user dengan @username\n\n Contoh: ${dbSettings.rname}checklimit @user`);
                  const userLimit = dbLimits.limit.find(u => u.id === targetId);
                  if (userLimit) {
                    await sReply(`Sisa credit penggunaan bot untuk @${targetId.split('@')[0]} adalah: *${userLimit.limit}*`); await counthit(serial);
                  } else {
                    await counthit(serial); await reactFail();
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'find')) {
                try {
                  if (mentionedJidList.length !== 0) {
                    for (let a of mentionedJidList) {
                      const groupsFound = await getCommonGroups(a);
                      let list = '';
                      for (let grp of groupsFound) {
                        list += `${grp.subject || grp.formattedTitle || 'Unnamed Group'}\n`;
                      }
                      await sReply(`Hasil pencarian untuk:\n@${a.split('@')[0]}\n\n${list || 'Tidak ditemukan grup.'}`); await counthit(serial);
                    }
                  } else if (args && args[0]) {
                    const a = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                    const groupsFound = await getCommonGroups(a);
                    let list = '';
                    for (let grp of groupsFound) {
                      list += `${grp.subject || grp.formattedTitle || 'Unnamed Group'}\n`;
                    }
                    await sReply(`Hasil pencarian untuk:\n@${a.split('@')[0]}\n\n${list || 'Tidak ditemukan grup.'}`); await counthit(serial);
                  } else {
                    throw new Error(`Tolong tag user atau masukkan nomor untuk dicari.\n\nContoh: ${dbSettings.rname}find @user1 @user2\natau ${dbSettings.rname}find 6281234567890`);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'addsticker')) {
                try {
                  const key = arg.trim();
                  if (!key || dbStickers.sticker[key] || /chat\.whatsapp\.com|instagram\.com|youtube\.com|youtu\.be|tiktok\.com/i.test(key)) throw new Error(`Nama stiker tidak valid atau sudah ada.\n\nGunakan nama unik untuk stiker.`);
                  const targetMsg = quotedMsg ? m.quoted || m : m.message;
                  const mime = targetMsg?.imageMessage?.mimetype || targetMsg?.videoMessage?.mimetype || targetMsg?.stickerMessage?.mimetype;
                  const buffer = await fn.getMediaBuffer(targetMsg);
                  if (!mime || !buffer) throw new Error('Gagal mendapatkan media.');
                  if ((mime === "video/mp4" || mime === "image/gif") && quotedMsg.seconds > 10) throw new Error(`Durasi video terlalu panjang. Maksimal 10 detik.`);
                  if (/^(image\/|video\/mp4|image\/webp)/.test(mime)) {
                    dbStickers.sticker[key] = buffer.toString("base64");
                    await dumpSticker(); await counthit(serial); await reactDone();
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'addaudio')) {
                try {
                  if (quotedMsg && quotedMsg?.type === "audioMessage") {
                    const mimeType = quotedMsg?.audioMessage?.mimetype
                    if (!arg || !mimeType || /chat\.whatsapp\.com|instagram\.com|youtube\.com|youtu\.be|tiktok\.com/i.test(arg) || dbAudio.audio[arg]) throw new Error(`Nama audio tidak valid atau sudah ada.\n\nGunakan nama unik untuk audio.`);
                    const result = await fn.getMediaBuffer(quotedMsg);
                    if (!result) throw new Error('Gagal mendapatkan media audio.');
                    const filename = `./database/audio/${arg}.mp3`;
                    await fs.writeFile(filename, result);
                    dbAudio.audio[arg] = filename;
                    await dumpAudio(); await counthit(serial); await reactDone();
                  } else {
                    throw new Error(`Balas pesan audio atau kirim audio dengan format yang benar.\n\nContoh: ${dbSettings.rname}addaudio nama_audio`);
                  };
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'delsticker')) {
                try {
                  const keys = Object.keys(dbStickers.sticker);
                  if (!arg || !keys.length) throw new Error(`Tidak ada stiker yang tersedia untuk dihapus.\n\nGunakan ${dbSettings.rname}addsticker untuk menambahkan stiker baru.`);
                  const parts = arg.split(",").map(s => s.trim()).filter(Boolean);
                  const toDelete = new Set();
                  for (const part of parts) {
                    const match = archimed(part, keys);
                    if (match.length) match.forEach(name => toDelete.add(name));
                    else if (keys.includes(part)) toDelete.add(part);
                  }
                  if (!toDelete.size) throw new Error(`Tidak ada stiker yang cocok dengan nama "${arg}".\n\nGunakan ${dbSettings.rname}addsticker untuk menambahkan stiker baru.`);
                  for (const name of toDelete) {
                    if (dbStickers.sticker[name]) {
                      delete dbStickers.sticker[name];
                    }
                  }
                  await dumpSticker(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'delaudio')) {
                try {
                  const keys = Object.keys(dbAudio.audio);
                  if (!arg || !keys.length) throw new Error(`Tidak ada audio yang tersedia untuk dihapus.\n\nGunakan ${dbSettings.rname}addaudio untuk menambahkan audio baru.`);
                  const parts = arg.split(",").map(s => s.trim()).filter(Boolean);
                  const toDelete = new Set();
                  for (const part of parts) {
                    const match = archimed(part, keys);
                    if (match.length) match.forEach(name => toDelete.add(name));
                    else if (keys.includes(part)) toDelete.add(part);
                  }
                  if (!toDelete.size) throw new Error(`Tidak ada audio yang cocok dengan nama "${arg}".\n\nGunakan ${dbSettings.rname}addaudio untuk menambahkan audio baru.`);
                  for (const name of toDelete) {
                    if (dbAudio.audio[name]) {
                      await deleteFile(dbAudio.audio[name]);
                      delete dbAudio.audio[name];
                    }
                  }
                  await dumpAudio(); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              }
              ctype = "hbot"
              if (!commandFound && await getPrefix(txt, 'block')) {
                try {
                  let targets = [];
                  if (quotedMsg) {
                    targets.push(quotedParticipant);
                  } else if (mentionedJidList.length > 0) {
                    targets.push(...mentionedJidList);
                  } else if (arg) {
                    targets.push(arg.replace(/[^0-9]/g, '') + '@s.whatsapp.net');
                  } else {
                    throw new Error(`Tidak ada user yang ditargetkan!\n\nCara penggunaan:\n• Reply pesan user yang ingin diblokir, atau\n• Mention user dengan @username\n\nContoh: ${dbSettings.rname}block @user`);
                  }
                  const blocked = [];
                  const failed = [];
                  const metadata = await fn.groupMetadata(toId);
                  const groupAdmins = metadata?.participants?.reduce((a, b) => {
                    if (b.admin) a.push({ id: b.id, admin: b.admin });
                    return a;
                  }, []) || [];
                  for (let jid of targets) {
                    if (groupAdmins && groupAdmins.some(admin => admin.id === jid)) {
                      failed.push(jid);
                      continue;
                    }
                    await fn.updateBlockStatus(jid, 'block');
                    blocked.push(jid);
                  }
                  let response = '';
                  if (blocked.length > 0) {
                    response += `✅ Berhasil block:\n` + blocked.map((j, i) => `${i + 1}. @${j.split('@')[0]}`).join('\n') + '\n\n';
                  }
                  if (failed.length > 0) {
                    response += `❎ Gagal (admin?):\n` + failed.map((j, i) => `${i + 1}. @${j.split('@')[0]}`).join('\n');
                  }
                  await sReply(response); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'unblock')) {
                const blockNumber = await fn.fetchBlocklist();
                try {
                  let targets = [];
                  if (quotedMsg) {
                    targets.push(quotedParticipant);
                  } else if (mentionedJidList.length > 0) {
                    targets.push(...mentionedJidList);
                  } else if (arg && /^\d/.test(arg)) {
                    const selected = archimed(arg, blockNumber);
                    if (selected.length === 0) throw new Error(`Tidak ada nomor yang cocok dengan "${arg}".\n\nGunakan ${dbSettings.rname}unblock <nomor> untuk unblock nomor tertentu.`);
                    targets.push(...selected);
                  } else if (arg) {
                    targets.push(arg.replace(/[^0-9]/g, '') + '@s.whatsapp.net');
                  } else {
                    throw new Error(`Tidak ada user yang ditargetkan untuk di-unblock!\n\nCara penggunaan:\n• Reply pesan user yang ingin di-unblock, atau\n• Mention user dengan @username\n• Atau gunakan nomor urut dari daftar blocklist\n\nContoh: ${dbSettings.rname}unblock @user atau .unblock 1`);
                  }
                  const unblocked = [];
                  for (let jid of targets) {
                    await fn.updateBlockStatus(jid, 'unblock');
                    const index = blockNumber.indexOf(jid);
                    if (index !== -1) blockNumber.splice(index, 1);
                    unblocked.push(jid);
                  }
                  const response = `Berhasil unblock:\n` + unblocked.map((j, i) => `${i + 1}. @${j.split('@')[0]}`).join('\n');
                  await sReply(response); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              }
            }
            if (isSadmin || master || vip || premium) {
              ctype = "premium"
              if (!commandFound && await getPrefix(txt, 'checkpremium')) {
                let targetId;
                try {
                  targetId = mentionedJidList[0] || serial;
                  const expireTimestamp = getPremiumExpired(targetId, dbPremium);
                  if (!expireTimestamp || expireTimestamp < Date.now()) throw new Error(`@${targetId.split('@')[0]} tidak memiliki status Premium aktif.`);
                  const remainingMs = expireTimestamp - Date.now();
                  const durationLeft = dayjs.duration(remainingMs);
                  const durationMessage = formatDurationMessage(durationLeft);
                  await sReply(`「 *PREMIUM EXPIRE* 」\n\n➸ *ID*: @${targetId.split('@')[0]}\n➸ ${durationMessage}`);
                  await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch {
                  await sReply(`@${targetId ? targetId.split('@')[0] : 'ID'} tidak memiliki status Premium aktif.`);
                  await limitAdd(serial); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'addcontact')) {
                try {
                  if (quotedMsg) {
                    const namaKontak = arg;
                    const nomorKontak = quotedParticipant.split('@')[0];
                    if (!namaKontak) throw new Error(`Kamu harus memberikan nama untuk kontak.\nContoh: ${dbSettings.rname}addcontact Budi`);
                    if (dbContact.contact[namaKontak]) throw new Error(`Nama kontak "${namaKontak}" sudah ada di database.`);
                    if (/chat\.whatsapp\.com|instagram\.com|youtube\.com|youtu\.be|tiktok\.com/i.test(namaKontak)) throw new Error("Nama kontak tidak boleh mengandung link.");
                    dbContact.contact[namaKontak] = nomorKontak;
                    await dumpContact();
                    await sReply(`Sukses!\n\nKontak "${namaKontak}" dengan nomor ${nomorKontak} berhasil disimpan.`); await limitAdd(serial); await counthit(serial);
                  } else {
                    const parts = arg.split('|').map(s => s.trim());
                    if (parts.length < 2 || !parts[0] || !parts[1]) throw new Error(`Format yang Kamu masukkan salah.\nGunakan: ${dbSettings.rname}addcontact Nama|Nomor\nContoh: ${dbSettings.rname}addcontact Budi|6281234567890`);
                    const namaKontak = parts[0];
                    const nomorKontak = parts[1];
                    if (dbContact.contact[namaKontak]) throw new Error(`Nama kontak "${namaKontak}" sudah ada di database.`);
                    dbContact.contact[namaKontak] = nomorKontak;
                    await dumpContact();
                    await sReply(`Sukses!\n\nKontak "${namaKontak}" dengan nomor ${nomorKontak} berhasil disimpan.`); await limitAdd(serial); await counthit(serial);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(`${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'addchat')) {
                try {
                  const isQuotedText = quotedMsg && (quotedMsg.type === 'extendedTextMessage' || quotedMsg.type === 'conversation');
                  let keyword = '';
                  let balasan = '';
                  if (isQuotedText) {
                    keyword = arg.trim();
                    balasan = quotedMsg.body.trim();
                    if (!keyword) throw new Error(`Kamu harus memberikan keyword untuk teks yang dibalas.\nContoh: ${dbSettings.rname}addchat sapaan`);
                  } else {
                    if (!arg) throw new Error(`Perintah tidak lengkap.\n\nCara Penggunaan:\n1. Balas pesan teks dengan ${dbSettings.rname}addchat <keyword>\n2. Ketik langsung ${dbSettings.rname}addchat <keyword>|<balasan>`);
                    const parts = arg.replace(/\s*\|\s*/g, '|').split('|');
                    keyword = parts[0]?.trim();
                    balasan = parts[1]?.trim();
                    if (!keyword || !balasan) throw new Error(`Format yang Kamu masukkan salah.\nGunakan: ${dbSettings.rname}addchat keyword|teks balasan\nContoh: ${dbSettings.rname}addchat hai|Halo juga kawan!`);
                  }
                  if (dbChats.chat[keyword]) throw new Error(`Keyword "${keyword}" sudah ada dan terdaftar.`);
                  if (/chat\.whatsapp\.com|instagram\.com|youtube\.com|youtu\.be|tiktok\.com/i.test(keyword) || /chat\.whatsapp\.com|instagram\.com|youtube\.com|youtu\.be|tiktok\.com/i.test(balasan)) throw new Error("Keyword atau Teks Balasan tidak boleh mengandung link.");
                  dbChats.chat[keyword] = balasan;
                  await dumpChat();
                  await sReply(`Sukses!\n\nKeyword baru berhasil disimpan:\n*${keyword}*`); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(`${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'addimage')) {
                try {
                  const add = arg.trim();
                  if (!add || /chat\.whatsapp\.com|instagram\.com|youtube\.com|youtu\.be|tiktok\.com/i.test(add) || dbImage.image[add]) throw new Error(`Nama gambar tidak valid atau sudah ada.\n\nGunakan nama unik untuk gambar.`);
                  const targetMsg = quotedMsg ? m.quoted || m : m.message;
                  const mimeType = targetMsg?.imageMessage?.mimetype;
                  const image = await fn.getMediaBuffer(targetMsg);
                  if (!mimeType || !mimeType.startsWith('image/') || !image) throw new Error(`Gagal mendapatkan gambar dari pesan.\nPastikan pesan yang dibalas adalah gambar atau kirim gambar dengan format yang benar.`);
                  const filename = `./database/image/${add}.png`;
                  await fs.writeFile(filename, image);
                  dbImage.image[add] = filename;
                  await dumpImage(); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'delcontact')) {
                try {
                  const keys = Object.keys(dbContact.contact);
                  if (!keys.length || !arg) throw new Error(`Tidak ada kontak yang tersedia untuk dihapus.\n\nGunakan ${dbSettings.rname}addcontact untuk menambahkan kontak baru.`);
                  const parts = arg.split(",").map(s => s.trim()).filter(Boolean);
                  const toDelete = new Set();
                  for (const part of parts) {
                    const match = archimed(part, keys);
                    if (match.length) match.forEach(name => toDelete.add(name));
                    else if (keys.includes(part)) toDelete.add(part);
                  }
                  if (!toDelete.size) throw new Error(`Tidak ada kontak yang cocok dengan nama "${arg}".\n\nGunakan ${dbSettings.rname}addcontact untuk menambahkan kontak baru.`);
                  for (const name of toDelete) {
                    delete dbContact.contact[name];
                  }
                  await dumpContact(); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'delchat')) {
                try {
                  const keys = Object.keys(dbChats.chat);
                  if (!keys.length || !arg) throw new Error(`Tidak ada chat yang tersedia untuk dihapus.\n\nGunakan ${dbSettings.rname}addchat untuk menambahkan chat baru.`);
                  const parts = arg.split(",").map(s => s.trim()).filter(Boolean);
                  const toDelete = new Set();
                  for (const part of parts) {
                    const match = archimed(part, keys);
                    if (match.length) match.forEach(name => toDelete.add(name));
                    else if (keys.includes(part)) toDelete.add(part);
                  }
                  if (!toDelete.size) throw new Error(`Tidak ada chat yang cocok dengan nama "${arg}".\n\nGunakan ${dbSettings.rname}addchat untuk menambahkan chat baru.`);
                  for (const name of toDelete) {
                    delete dbChats.chat[name];
                  }
                  await dumpChat(); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'delimage')) {
                try {
                  const keys = Object.keys(dbImage.image);
                  if (!keys.length || !arg) throw new Error(`Tidak ada gambar yang tersedia untuk dihapus.\n\nGunakan ${dbSettings.rname}addimage untuk menambahkan gambar baru.`);
                  const inputParts = arg.split(",").map(s => s.trim()).filter(Boolean);
                  const toDelete = new Set();
                  for (const part of inputParts) {
                    const match = archimed(part, keys);
                    if (match.length > 0) {
                      match.forEach(name => toDelete.add(name));
                    } else if (keys.includes(part)) {
                      toDelete.add(part);
                    }
                  }
                  if (!toDelete.size) throw new Error(`Tidak ada gambar yang cocok dengan nama "${arg}".\n\nGunakan ${dbSettings.rname}addimage untuk menambahkan gambar baru.`);
                  for (const imageName of toDelete) {
                    if (dbImage.image[imageName]) {
                      await deleteFile(dbImage.image[imageName]);
                      delete dbImage.image[imageName];
                    }
                  }
                  await dumpImage(); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'banchat')) {
                try {
                  const status = args[0]?.toLowerCase()
                  if (status === "on") {
                    if (dbMuted.mutechat.includes(toId)) throw new Error(`Chat ini sudah dimatikan notifikasinya.\n\nGunakan ${dbSettings.rname}banchat off untuk mengaktifkan kembali notifikasi.`);
                    dbMuted.mutechat.push(toId);
                    await dumpMute(); await limitAdd(serial); await counthit(serial); await reactDone();
                  } else if (status === "off") {
                    if (!dbMuted.mutechat.includes(toId)) throw new Error(`Chat ini belum dimatikan notifikasinya.\n\nGunakan ${dbSettings.rname}banchat on untuk mematikan notifikasi.`);
                    const index = dbMuted.mutechat.indexOf(toId);
                    dbMuted.mutechat.splice(index, 1);
                    await dumpMute(); await limitAdd(serial); await counthit(serial); await reactDone();
                  } else if (status === "reset") {
                    dbMuted.mutechat = []
                    await dumpMute(); await counthit(serial); await reactDone();
                    commandFound = true;
                  } else {
                    throw new Error(`Gunakan:\n${dbSettings.rname}banchat on untuk mematikan notifikasi.\n${dbSettings.rname}banchat off untuk mengaktifkan kembali notifikasi.\n${dbSettings.rname}banchat reset untuk mereset semua notifikasi.`);
                  };
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'filter')) {
                try {
                  if (!m.isGroup || !arg) throw new Error(`Gunakan ${dbSettings.rname}filter on/off untuk mengaktifkan atau menonaktifkan filter.`);
                  const cmd = args[0].toLowerCase();
                  if (cmd === 'on') {
                    if (dbFilter.filter.includes(toId)) throw new Error(`Filter ini sudah aktif.\n\nGunakan ${dbSettings.rname}filter off untuk menonaktifkan filter.`);
                    dbFilter.filter.push(toId);
                    await dumpFilter(); await limitAdd(serial); await counthit(serial); await reactDone();
                  } else if (cmd === 'off') {
                    if (!dbFilter.filter.includes(toId)) throw new Error(`Filter ini belum aktif.\n\nGunakan ${dbSettings.rname}filter on untuk mengaktifkan filter.`);
                    const index = dbFilter.filter.indexOf(toId);
                    dbFilter.filter.splice(index, 1);
                    await dumpFilter(); await limitAdd(serial); await counthit(serial); await reactDone();
                  } else {
                    throw new Error(`Gunakan ${dbSettings.rname}filter on untuk mengaktifkan filter atau ${dbSettings.rname}filter off untuk menonaktifkan filter.`);
                  };
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              }
            }
            if (isSadmin || master || vip || premium || isGroupAdmins) {
              ctype = "manage"
              if (!commandFound && await getComs(txt, 'settings')) {
                try {
                  const messageParts = [];
                  const globalFlags = [
                    { label: "Limit Harian", value: dbSettings.limitCount },
                    { label: "Limit Game", value: dbSettings.limitGame },
                    { label: "Limit Premium", value: dbSettings.limitCountPrem },
                    { label: "Limit Member", value: dbSettings.memberLimit },
                    { label: "Maintenance", value: dbSettings.maintenance },
                    { label: "Verify Users", value: dbSettings.verify },
                    { label: "Auto Correct", value: dbSettings.autocorrect === "off" ? false : dbSettings.autocorrect },
                    { label: "Auto Join", value: dbSettings.autojoin },
                    { label: "Auto Download", value: dbSettings.autodownload },
                    { label: "Auto Sticker", value: dbSettings.autosticker },
                    { label: "Auto Respon", value: dbSettings.chatbot },
                    { label: "Auto Resend", value: dbSettings.antideleted },
                    { label: "Auto Read", value: dbSettings.autoread },
                    { label: "Auto Read Story", value: dbSettings.autoreadsw },
                    { label: "Auto Like Story", value: dbSettings.autolikestory },
                    { label: "Auto Reject Call", value: dbSettings.anticall },
                    { label: "Auto Changer Voice", value: dbSettings.changer },
                  ];
                  let globalSettingsText = "*- Bot Config -*\n";
                  for (const { label, value } of globalFlags) {
                    const icon = value ? "⚙" : "⚔";
                    const valueText = (typeof value === 'string' || typeof value === 'number') ? ` : ${value}` : '';
                    globalSettingsText += `\n${icon} ${label}${valueText}`;
                  }
                  if (m.isGroup) {
                    let groupSettingsText = "*- Group Config -*\n";
                    const groupFeatures = [
                      { label: "Welcome", db: dbGroups.welcome },
                      { label: "Leave", db: dbGroups.leave },
                      { label: "Anti Tag Story", db: dbGroups.antitagStory },
                      { label: "Anti Link", db: dbGroups.antilink },
                      { label: "Anti Hidetag", db: dbGroups.antiHidetag },
                      { label: "Verify Member", db: dbGroups.verifyMember }
                    ];
                    for (const feature of groupFeatures) {
                      const setting = feature.db.find(v => v.chatid === toId);
                      const icon = setting?.state ? "⚙" : "⚔";
                      groupSettingsText += `\n${icon} ${feature.label}`;
                    }
                    const warningConfig = dbGroups.warning[toId];
                    const warnIcon = warningConfig?._state ? "⚙" : "⚔";
                    const warnThreshold = warningConfig?._count;
                    let warnText = "Auto Kick Warn";
                    if (warnIcon === "⚙" && warnThreshold) {
                      warnText += ` (${warnThreshold})`;
                    }
                    groupSettingsText += `\n${warnIcon} ${warnText}`;
                    messageParts.push(groupSettingsText);
                  }
                  globalSettingsText += "\n\n" + dbSettings.autocommand;
                  messageParts.push(globalSettingsText);
                  const finalReply = messageParts.join('\n\n');
                  await sReply(finalReply); await counthit(serial); await limitAdd(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'welcome')) {
                try {
                  if (!m.isGroup) throw new Error(`Perintah ini hanya bisa digunakan di grup.`);
                  let command = ar[0];
                  let chatid = toId;
                  let data = dbGroups.welcome.find(v => v.chatid === chatid);
                  if (command === 'on') {
                    if (data) {
                      data.state = true;
                      if (!data.pesan) data.pesan = "Selamat Datang";
                    } else {
                      dbGroups.welcome.push({ chatid, state: true, pesan: "Selamat Datang" });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else if (command === 'off') {
                    if (data) {
                      data.state = false;
                    } else {
                      dbGroups.welcome.push({ chatid, state: false, pesan: "Selamat Datang" });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else if (command === 'msg') {
                    let pesan = q.split(' ').slice(1).join(' ').trim();
                    if (!pesan || !data) throw new Error(`Pesan tidak boleh kosong atau fitur welcome belum diaktifkan.`);
                    data.pesan = pesan;
                    await dumpGroupSet(); await limitAdd(serial);
                    await sReply(pesan); await counthit(serial);
                  } else {
                    throw new Error(`Format salah. Gunakan:\n${dbSettings.rname}welcome on\n${dbSettings.rname}welcome off\n${dbSettings.rname}welcome msg teks_pesan`);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'leave')) {
                try {
                  if (!m.isGroup) throw new Error(`Perintah ini hanya bisa digunakan di grup.`);
                  let command = ar[0];
                  let chatid = toId;
                  let data = dbGroups.leave.find(v => v.chatid === chatid);
                  if (command === 'on') {
                    if (data) {
                      data.state = true;
                      if (!data.pesan) data.pesan = "😭😭";
                    } else {
                      dbGroups.leave.push({ chatid, state: true, pesan: "😭😭" });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else if (command === 'off') {
                    if (data) {
                      data.state = false;
                    } else {
                      dbGroups.leave.push({ chatid, state: false, pesan: "😭😭" });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else if (command === 'msg') {
                    let pesan = q.split(' ').slice(1).join(' ').trim();
                    if (!pesan || !data) throw new Error(`Pesan tidak boleh kosong atau fitur leave belum diaktifkan.`);
                    data.pesan = pesan;
                    await dumpGroupSet(); await limitAdd(serial);
                    await sReply(pesan); await counthit(serial);
                  } else {
                    throw new Error(`Format salah. Gunakan:\n${dbSettings.rname}leave on\n${dbSettings.rname}leave off\n${dbSettings.rname}leave msg teks_pesan`);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'antitagsw')) {
                try {
                  if (!m.isGroup) throw new Error(`Perintah ini hanya bisa digunakan di grup.`);
                  let command = ar[0];
                  let chatid = toId;
                  let data = dbGroups.antitagStory.find(v => v.chatid === chatid);
                  if (command === 'on') {
                    if (data) {
                      data.state = true;
                    } else {
                      dbGroups.antitagStory.push({ chatid, state: true });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else if (command === 'off') {
                    if (data) {
                      data.state = false;
                    } else {
                      dbGroups.antitagStory.push({ chatid, state: false });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else {
                    throw new Error(`Format salah. Gunakan:\n${dbSettings.rname}antitagsw on\n${dbSettings.rname}antitagsw off`);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'antilink')) {
                try {
                  if (!m.isGroup) throw new Error(`Perintah ini hanya bisa digunakan di grup.`);
                  let command = ar[0];
                  let chatid = toId;
                  let data = dbGroups.antilink.find(v => v.chatid === chatid);
                  if (command === 'on') {
                    if (data) {
                      data.state = true;
                    } else {
                      dbGroups.antilink.push({ chatid, state: true });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else if (command === 'off') {
                    if (data) {
                      data.state = false;
                    } else {
                      dbGroups.antilink.push({ chatid, state: false });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else {
                    throw new Error(`Format salah. Gunakan:\n${dbSettings.rname}antilink on\n${dbSettings.rname}antilink off`);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'antihidetag')) {
                try {
                  if (!m.isGroup) throw new Error(`Perintah ini hanya bisa digunakan di grup.`);
                  let command = ar[0];
                  let chatid = toId;
                  let data = dbGroups.antiHidetag.find(v => v.chatid === chatid);
                  if (command === 'on') {
                    if (data) {
                      data.state = true;
                    } else {
                      dbGroups.antiHidetag.push({ chatid, state: true });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else if (command === 'off') {
                    if (data) {
                      data.state = false;
                    } else {
                      dbGroups.antiHidetag.push({ chatid, state: false });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else {
                    throw new Error(`Format salah. Gunakan:\n${dbSettings.rname}antihidetag on\n${dbSettings.rname}antihidetag off`);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'verifymember')) {
                try {
                  if (!m.isGroup) throw new Error(`Perintah ini hanya bisa digunakan di grup.`);
                  let command = ar[0];
                  let chatid = toId;
                  let data = dbGroups.verifyMember.find(v => v.chatid === chatid);
                  if (command === 'on') {
                    if (data) {
                      data.state = true;
                    } else {
                      dbGroups.verifyMember.push({ chatid, state: true });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else if (command === 'off') {
                    if (data) {
                      data.state = false;
                    } else {
                      dbGroups.verifyMember.push({ chatid, state: false });
                    }
                    await dumpGroupSet(); await counthit(serial); await limitAdd(serial); await reactDone();
                  } else {
                    throw new Error(`Format salah. Gunakan:\n${dbSettings.rname}verifymember on\n${dbSettings.rname}verifymember off`);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'bye')) {
                await counthit(serial); await limitAdd(serial); await reactDone();
                await fn.groupLeave(toId);
                delete store.conversations[toId];
                delete store.groupMetadata[toId];
                delete store.messages[toId];
                delete store.presences[toId];
                storeDirty = true;
                commandFound = true;
              } else if (!commandFound && await getComs(txt, 'mentionall')) {
                const groupMetadata = await fn.groupMetadata(toId);
                const mentions = groupMetadata.participants.map(member => member.id);
                let message = "📢 MENTIONALL MEMBER\n";
                mentions.forEach((jid, idx) => {
                  message += `\n${idx + 1}. @${jid.split('@')[0]}`;
                });
                await fn.sendPesan(toId, message, m); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } else if (!commandFound && await getComs(txt, 'unsend')) {
                try {
                  if (!m.isGroup || !quotedMsg || !quotedMsg?.key?.fromMe && !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup, harus membalas pesan bot dan bot harus menjadi admin grup.`);
                  await fn.sendMessage(toId, { delete: { remoteJid: toId, fromMe: m.isBotAdmin ? false : true, id: quotedMsg?.key.id, participant: quotedParticipant } }); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'cleanse')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup dan bot harus menjadi admin grup.`);
                  const groupMetadata = await fn.groupMetadata(toId);
                  const allMembers = groupMetadata.participants.map(p => p.id);
                  const groupAdmins = groupMetadata?.participants?.reduce((a, b) => {
                    if (b.admin) a.push({ id: b.id, admin: b.admin });
                    return a;
                  }, []) || [];
                  const botId = botNumber
                  await sReply('Bot sedang melakukan pembersihan grup. Hubungi owner jika ingin kembali.');
                  let removed = 0;
                  for (let member of allMembers) {
                    if (member === botId || groupAdmins.includes(member) || (ownerNumber && ownerNumber.includes(member)) || (dbMaster.master && dbMaster.master.includes(member)) || (dbVIP.vip && dbVIP.vip.includes(member)) || (dbPremium.premium && dbPremium.premium.includes(member))) {
                      continue;
                    }
                    try {
                      await fn.removeParticipant(toId, member);
                      removed++;
                      await delay(1500);
                    } catch (error) {
                      await log(`Error_kick ${member}:\n${error}`, true);
                    }
                  }
                  await sReply(`✅ Selesai, ${removed} anggota non-admin & non-whitelist telah dikeluarkan.`); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'grouplink')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan jika bot menjadi admin grup.`);
                  let response = await fn.groupInviteCode(toId)
                  await sReply(`https://chat.whatsapp.com/${response}`); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'changegrouplink')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan jika bot menjadi admin grup.`);
                  await fn.groupRevokeInvite(toId)
                  let response = await fn.groupInviteCode(toId)
                  await sReply(`https://chat.whatsapp.com/${response}`); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'checklastseen')) {
                try {
                  if (!m.isGroup || !store.presences || !store.presences[toId]) throw new Error('Tidak ada data kehadiran yang tercatat di grup ini.');
                  const presences = store.presences[toId];
                  const seenList = Object.entries(presences).filter(([, data]) => data && data.lastSeen);
                  if (!seenList.length) throw new Error('Tidak ada data kehadiran yang tercatat di grup ini.');
                  seenList.sort(([, a], [, b]) => b.lastSeen - a.lastSeen);
                  const resultText = `📶 *Check Lastseen Member:*\n\n` +
                    seenList.map(([jid, data], i) => {
                      const timeAgo = formatTimeAgo(data.lastSeen);
                      return `${i + 1}. @${jid.split('@')[0]} - ${timeAgo}`;
                    }).join('\n');
                  await sPesan(resultText); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'checkactivity')) {
                try {
                  if (!m.isGroup) throw new Error('Perintah ini hanya bisa digunakan di dalam grup.');
                  const metadata = store.groupMetadata?.[toId];
                  if (!metadata?.participants) throw new Error('Gagal mendapatkan data anggota grup.');
                  const participants = metadata.participants;
                  const messages = store.messages?.[toId]?.array || [];
                  const presences = store.presences?.[toId] || {};
                  const messageCount = {};
                  messages.forEach(mes => {
                    if (mes.key?.participant) {
                      messageCount[mes.key.participant] = (messageCount[mes.key.participant] || 0) + 1;
                    }
                  });
                  let activityList = participants.map(p => ({
                    id: p.id,
                    msgCount: messageCount[p.id] || 0,
                    lastSeen: presences[p.id]?.lastSeen || 0
                  }));
                  activityList.sort((a, b) => b.msgCount - a.msgCount);
                  const resultText = `*Laporan Aktifitas Group:*\n_${metadata.subject}_\n\n` +
                    activityList.map((user, i) => {
                      const jid = user.id;
                      const count = user.msgCount;
                      const timeAgo = user.lastSeen ? formatTimeAgo(user.lastSeen) : 'tidak diketahui';
                      return `${i + 1}. @${jid.split('@')[0]}\n   - Pesan: ${count}\n   - Terakhir Dilihat: ${timeAgo}`;
                    }).join('\n\n');
                  await sReply(resultText); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await m.reply(error.message || 'Terjadi error saat memeriksa aktivitas.'); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'checksider')) {
                try {
                  if (!m.isGroup) throw new Error('Perintah ini hanya bisa digunakan di dalam grup.');
                  const metadata = store.groupMetadata?.[toId];
                  if (!metadata?.participants) throw new Error('Gagal mendapatkan data anggota grup.');
                  const participants = metadata.participants;
                  const messages = store.messages?.[toId]?.array || [];
                  const presences = store.presences?.[toId] || {};
                  const messageCount = {};
                  messages.forEach(mes => {
                    if (mes.key?.participant) {
                      messageCount[mes.key.participant] = (messageCount[mes.key.participant] || 0) + 1;
                    }
                  });
                  let activityList = participants.map(p => ({
                    id: p.id,
                    msgCount: messageCount[p.id] || 0,
                    lastSeen: presences[p.id]?.lastSeen || 0
                  }));
                  const inactiveUsers = activityList.filter(user => user.msgCount === 0);
                  inactiveUsers.sort((a, b) => a.lastSeen - b.lastSeen);
                  if (!inactiveUsers.length) throw new Error('Tidak ada anggota yang belum mengirim pesan sama sekali.');
                  const resultText = `*Daftar Anggota Non-Aktif:*\n_${metadata.subject}_\n\n` +
                    inactiveUsers.map((user, i) => {
                      const jid = user.id;
                      const timeAgo = user.lastSeen ? formatTimeAgo(user.lastSeen) : 'tidak pernah online';
                      return `${i + 1}. @${jid.split('@')[0]}\n   - Terakhir Dilihat: ${timeAgo}`;
                    }).join('\n\n');
                  await sReply(resultText); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message || 'Terjadi error saat memeriksa aktivitas.'); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'groupinfo')) {
                const groupchat = await fn.groupMetadata(toId);
                const { subject, subjectOwner, subjectOwnerPhoneNumber, creation, desc } = groupchat;
                let creator;
                if (subjectOwnerPhoneNumber === undefined) {
                  creator = subjectOwner;
                } else {
                  creator = subjectOwnerPhoneNumber;
                }
                const memberCount = groupchat.participants.length;
                const subjectName = subject || 'Tidak diketahui';
                const createdTime = new Date(creation * 1000);
                const createdDate = createdTime.toLocaleString();
                const elapsed = Math.floor(Date.now() / 1000) - creation;
                let result = `📌 *Informasi Grup*\n`;
                result += `📝 Nama Grup: ${subjectName}\n`;
                result += `👑 Pembuat: @${creator.split('@')[0]}\n`;
                result += `👥 Jumlah Member: ${memberCount}\n`;
                if (desc) result += `📝 Deskripsi:\n${desc}\n`;
                result += `📅 Dibuat: ${createdDate} (${waktu(elapsed)} yang lalu)`;
                await fn.sendPesan(toId, result, m); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } else if (!commandFound && await getComs(txt, 'groupclose')) {
                try {
                  if (!isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan jika bot menjadi admin grup.`);
                  await fn.groupSettingUpdate(toId, 'announcement'); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'groupopen')) {
                try {
                  if (!isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan jika bot menjadi admin grup.`);
                  await fn.groupSettingUpdate(toId, 'not_announcement'); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'grouppermission')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup dan bot harus menjadi admin grup.`);
                  const mode = (args[0] || '').toLowerCase();
                  if (!['locked', 'unlocked'].includes(mode)) throw new Error(`gunakan argumen seperti locked atau unlocked`);
                  await fn.groupSettingUpdate(toId, mode); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'groupaddmode')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup dan bot harus menjadi admin grup.`);
                  const modeInput = (args[0] || '').toLowerCase();
                  const modeMap = {
                    'member': 'all_member_add',
                    'admin': 'admin_add'
                  };
                  if (!Object.prototype.hasOwnProperty.call(modeMap, modeInput)) throw new Error(`Gunakan argumen "member" atau "admin"`);
                  const mode = modeMap[modeInput];
                  await fn.groupMemberAddMode(toId, mode); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'pin')) {
                try {
                  if (quotedMsg) {
                    if (m.isGroup && !isBotGroupAdmins) throw new Error("Bot tidak menjadi admin grup.");
                    const arg1 = args[0]?.toLowerCase();
                    let actionType = 1;
                    let durationInSeconds = 2592000;
                    let actionText = "disematkan";
                    const durationMap = {
                      '24h': 86400,
                      '7d': 604800,
                      '30d': 2592000,
                    };
                    if (arg1 === 'off') {
                      actionType = 2;
                      durationInSeconds = 0;
                      actionText = "sematannya telah dilepaskan";
                    } else if (durationMap[arg1]) {
                      durationInSeconds = durationMap[arg1];
                    }
                    await fn.sendMessage(toId, {
                      pin: quotedMsg?.key,
                      type: actionType,
                      time: durationInSeconds,
                    });
                    if (actionType === 2) {
                      await sReply(`📌 Pesan ${actionText}.`);
                    }
                    await limitAdd(serial); await counthit(serial);
                    commandFound = true;
                  }
                } catch (error) {
                  await sReply(`Gagal melakukan aksi pin/unpin: ${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'invite')) {
                try {
                  if (!isBotGroupAdmins) throw new Error("Saya harus menjadi admin di grup ini untuk bisa mengundang orang lain.");
                  let numbersOnly;
                  if (quotedMsg) {
                    numbersOnly = quotedParticipant;
                  } else if (arg) {
                    const sanitizedNumber = arg.replace(/\D/g, '');
                    if (!sanitizedNumber) throw new Error("Nomor yang Kamu masukkan tidak valid.");
                    numbersOnly = sanitizedNumber + '@s.whatsapp.net';
                  } else {
                    throw new Error(`Cara penggunaan: Balas (reply) pesan target atau ketik nomornya.\nContoh: ${dbSettings.rname}invite 6281234567890`);
                  }
                  const results = await fn.groupParticipantsUpdate(toId, [numbersOnly], 'add');
                  if (!results || results.length === 0) throw new Error("Gagal mendapatkan status penambahan dari WhatsApp");
                  const result = results[0];
                  const targetUserMention = `@${numbersOnly.split('@')[0]}`;
                  switch (result.status.toString()) {
                    case '200':
                      await sReply(`Berhasil menambahkan ${targetUserMention} ke dalam grup!`); await limitAdd(serial);
                      break;
                    case '409':
                      await sReply(`Info: ${targetUserMention} sudah menjadi anggota grup ini.`);
                      break;
                    case '403': {
                      await sReply(`Info: ${targetUserMention} tidak dapat ditambahkan karena pengaturan privasi.\n\nUndangan akan dikirimkan secara pribadi.`);
                      const inviteData = result.content.content[0].attrs;
                      await fn.sendGroupInvite(toId, numbersOnly, inviteData.code, inviteData.expiration, m.metadata.subject, `Admin: @${serial.split('@')[0]} mengundang Kamu untuk bergabung.`, null, { mentions: [serial] });
                      break;
                    }
                    case '408': {
                      await sReply(`Info: ${targetUserMention} baru saja keluar dari grup.\n\nKarena privasi, undangan akan dikirimkan secara pribadi.`);
                      const inviteCode = await fn.groupInviteCode(toId);
                      await fn.sendPesan(numbersOnly, `Kamu diundang kembali ke grup, silahkan klik link berikut untuk bergabung: https://chat.whatsapp.com/${inviteCode}`, m);
                      break;
                    }
                    case '401':
                      throw new Error(`Gagal: ${targetUserMention} telah memblokir bot ini.`);
                    case '500':
                      throw new Error("Gagal: Grup sudah penuh.");
                    default:
                      throw new Error(`Gagal menambahkan user dengan status kode tidak dikenal: ${result.status}`);
                  }
                  await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(`Error:\n\n${error.message}`); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'kick')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup dan bot harus menjadi admin grup.`);
                  if (quotedMsg) {
                    await fn.removeParticipant(toId, quotedParticipant); await limitAdd(serial); await counthit(serial); await reactDone();
                  } else {
                    if (mentionedJidList.length === 0) throw new Error(`Gunakan perintah ini dengan membalas pesan atau tag @user yang ingin di-kick.`);
                    let failedUsers = [];
                    const metadata = await fn.groupMetadata(toId);
                    const groupAdmins = metadata?.participants?.reduce((a, b) => {
                      if (b.admin) a.push({ id: b.id, admin: b.admin });
                      return a;
                    }, []) || [];
                    for (const jid of mentionedJidList) {
                      if (groupAdmins.some(admin => admin.id === jid) || dbMaster.master.includes(jid)) {
                        failedUsers.push(jid);
                        continue;
                      }
                      await fn.removeParticipant(toId, jid);
                    }
                    if (failedUsers.length > 0) {
                      await sReply(`❎ Gagal kick beberapa user karena mereka privilege: ${failedUsers.join(', ')}`);
                    }
                    await limitAdd(serial); await counthit(serial); await reactDone();
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'ban')) {
                try {
                  let targets = [];
                  if (quotedMsg) {
                    targets.push(quotedParticipant);
                  } else if (mentionedJidList.length > 0) {
                    targets = mentionedJidList;
                  } else {
                    throw new Error(`Gunakan perintah ini dengan membalas pesan atau tag @user yang ingin di-ban.`);
                  };
                  let failed = [];
                  let updated = false;
                  const metadata = await fn.groupMetadata(toId);
                  const groupAdmins = metadata?.participants?.reduce((a, b) => {
                    if (b.admin) a.push({ id: b.id, admin: b.admin });
                    return a;
                  }, []) || [];
                  for (const userId of targets) {
                    if (groupAdmins.some(admin => admin.id === userId)) {
                      failed.push(userId);
                      continue;
                    }
                    if (!dbMuted.muteuser.includes(userId)) {
                      dbMuted.muteuser.push(userId);
                      updated = true;
                    }
                    if (!dbMuted.mutechat.includes(userId)) {
                      dbMuted.mutechat.push(userId);
                      updated = true;
                    }
                  }
                  if (updated) {
                    await dumpMute();
                  }
                  if (failed.length > 0) {
                    await sReply(`❎ Gagal menambahkan user berikut ke mute karena admin: ${failed.join(', ')}`); await counthit(serial);
                  } else {
                    await sReply("✅ User berhasil ditambahkan ke daftar mute."); await limitAdd(serial); await counthit(serial);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'unban')) {
                try {
                  let targets = [];
                  if (quotedMsg) {
                    targets.push(quotedParticipant);
                  } else if (mentionedJidList.length > 0) {
                    targets = mentionedJidList;
                  } else {
                    throw new Error(`Gunakan perintah ini dengan membalas pesan atau tag @user yang ingin dihapus dari daftar mute.`);
                  };
                  let updated = false;
                  for (const userId of targets) {
                    if (dbMuted.muteuser.includes(userId)) {
                      dbMuted.muteuser = arrayRemove(dbMuted.muteuser, userId);
                      updated = true;
                    }
                    if (dbMuted.mutechat.includes(userId)) {
                      const index = dbMuted.mutechat.indexOf(userId);
                      if (index !== -1) {
                        dbMuted.mutechat.splice(index, 1);
                        updated = true;
                      }
                    }
                  }
                  if (updated) {
                    await dumpMute();
                    await sReply("✅ User berhasil dihapus dari daftar mute."); await limitAdd(serial); await counthit(serial);
                  } else {
                    await sReply("❎ User tidak ditemukan di daftar mute."); await counthit(serial);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'warn')) {
                try {
                  if (!m.isGroup) throw new Error('perintah hanya bisa digunakan didalam group!');
                  if (!arg) throw new Error(`Gagal. Balas atau mention pengguna untuk memberi peringatan, atau gunakan ${dbSettings.rname}warn set on/off untuk mengatur fitur.`);
                  const subCommand = ar[0]?.toLowerCase();
                  if (!dbGroups.warning[toId]) {
                    dbGroups.warning[toId] = {
                      "_state": true,
                      "_count": 5
                    };
                  }
                  const groupWarningData = dbGroups.warning[toId];
                  if (subCommand === 'set') {
                    const action = ar[1]?.toLowerCase();
                    const limit = parseInt(ar[2]) || 5;
                    if (action !== 'on' && action !== 'off') throw new Error(`Gunakan: ${dbSettings.rname}warn set on [jumlah] atau ${dbSettings.rname}warn set off`);
                    groupWarningData._state = (action === 'on');
                    groupWarningData._count = limit;
                    await dumpGroupSet(); await sReply(`✅ Fitur auto-kick saat ${limit} kali warning telah diatur ke: ${action.toUpperCase()}`); await limitAdd(serial); await counthit(serial);
                  }
                  let targets = [];
                  if (quotedMsg) {
                    targets.push(quotedParticipant);
                  } else if (mentionedJidList.length > 0) {
                    targets = mentionedJidList;
                  }
                  const isAutoKickActive = groupWarningData._state === true;
                  const kickThreshold = groupWarningData._count || 5;
                  let warnedUsers = [];
                  let failedAdmins = [];
                  const metadata = await fn.groupMetadata(toId);
                  const groupAdmins = metadata?.participants?.reduce((a, b) => {
                    if (b.admin) a.push({ id: b.id, admin: b.admin });
                    return a;
                  }, []) || [];
                  for (const userId of targets) {
                    if (groupAdmins.some(admin => admin.id === userId)) {
                      failedAdmins.push(userId);
                      continue;
                    }
                    const newCount = (groupWarningData[userId] || 0) + 1;
                    groupWarningData[userId] = newCount;
                    warnedUsers.push({ id: userId, count: newCount });
                    if (isAutoKickActive && newCount >= kickThreshold) {
                      await sReply(`⚠️ Peringatan Terakhir! @${userId.split('@')[0]} telah mencapai batas ${kickThreshold} peringatan dan akan dikeluarkan.`, [userId]);
                      await fn.removeParticipant(toId, [userId]);
                      warnedUsers = warnedUsers.filter(u => u.id !== userId);
                      delete groupWarningData[userId];
                      continue;
                    }
                  }
                  if (warnedUsers.length > 0 || failedAdmins.length > 0) {
                    await dumpGroupSet();
                  }
                  let replyText = "";
                  if (warnedUsers.length > 0) {
                    const successList = warnedUsers.map(user => `› @${user.id.split('@')[0]} (Total: ${user.count} ⚠️)`).join('\n');
                    replyText += `✅ Peringatan!!!\n${successList}`;
                  }
                  if (failedAdmins.length > 0) {
                    const adminList = failedAdmins.map(id => `› @${id.split('@')[0]}`).join('\n');
                    replyText += `\n\n❎ Gagal memberi peringatan kepada admin:\n${adminList}`;
                  }
                  if (replyText) await sReply(replyText);
                  await counthit(serial); await limitAdd(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'unwarn')) {
                try {
                  if (!m.isGroup) throw new Error('perintah hanya bisa digunakan didalam group!');
                  let targets = [];
                  if (quotedMsg) {
                    targets.push(quotedParticipant);
                  } else if (mentionedJidList.length > 0) {
                    targets = mentionedJidList;
                  } else {
                    throw new Error("Gagal. Balas atau mention pengguna untuk mengurangi peringatan.");
                  };
                  const groupWarningData = dbGroups.warning[toId];
                  const userWarningKeys = groupWarningData ? Object.keys(groupWarningData).filter(key => !key.startsWith('_')) : [];
                  if (!groupWarningData || userWarningKeys.length === 0) throw new Error("Tidak ada pengguna yang memiliki peringatan di grup ini.");
                  let unwarnedUsers = [];
                  let failedAdmins = [];
                  let noWarningUsers = [];
                  const metadata = await fn.groupMetadata(toId);
                  const groupAdmins = metadata?.participants?.reduce((a, b) => {
                    if (b.admin) a.push({ id: b.id, admin: b.admin });
                    return a;
                  }, []) || [];
                  for (const userId of targets) {
                    if (groupAdmins.some(admin => admin.id === userId)) {
                      failedAdmins.push(userId);
                      continue;
                    }
                    if (groupWarningData[userId] && groupWarningData[userId] > 0) {
                      groupWarningData[userId]--;
                      const newCount = groupWarningData[userId];
                      if (newCount === 0) {
                        delete groupWarningData[userId];
                      }
                      unwarnedUsers.push({ id: userId, count: newCount });
                    } else {
                      noWarningUsers.push(userId);
                    }
                  }
                  if (unwarnedUsers.length > 0) {
                    await dumpGroupSet();
                  }
                  let replyText = "";
                  if (unwarnedUsers.length > 0) {
                    const successList = unwarnedUsers.map(user => `› @${user.id.split('@')[0]} (Sisa: ${user.count} ⚠️)`).join('\n');
                    replyText += `✅ Peringatan berhasil dikurangi untuk:\n${successList}`;
                  }
                  if (noWarningUsers.length > 0) {
                    const noWarningList = noWarningUsers.map(id => `› @${id.split('@')[0]}`).join('\n');
                    replyText += `\n\nℹ️ Pengguna berikut sudah tidak memiliki peringatan:\n${noWarningList}`;
                  }
                  if (failedAdmins.length > 0) {
                    const adminList = failedAdmins.map(id => `› @${id.split('@')[0]}`).join('\n');
                    replyText += `\n\n❎ Gagal mengurangi peringatan admin:\n${adminList}`;
                  }
                  if (replyText) await sReply(replyText);
                  else await sReply("Tidak ada pengguna yang dapat di-unwarn.");
                  await counthit(serial); await limitAdd(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'promote')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup dan bot harus menjadi admin grup.`);
                  let targetId = null;
                  if (quotedMsg) {
                    targetId = quotedParticipant;
                  } else if (mentionedJidList.length === 1) {
                    targetId = mentionedJidList[0];
                  } else if (mentionedJidList.length > 1) {
                    throw new Error(`Gunakan perintah ini dengan membalas pesan atau tag @user yang ingin dijadikan admin.`);
                  } else {
                    throw new Error(`Gunakan perintah ini dengan membalas pesan atau tag @user yang ingin dijadikan admin.`);
                  };
                  const metadata = await fn.groupMetadata(toId);
                  const groupAdmins = metadata?.participants?.reduce((a, b) => {
                    if (b.admin) a.push({ id: b.id, admin: b.admin });
                    return a;
                  }, []) || [];
                  if (groupAdmins.some(admin => admin.id === targetId)) throw new Error(`@${targetId.split('@')[0]} sudah menjadi admin.`);
                  if (getPremiumPosition(serial, dbPremium) && getPremiumPosition(targetId, dbPremium)) await sReply(`@${targetId.split('@')[0]} menjadi admin privilege.`);
                  await fn.promoteParticipant(toId, targetId);
                  await sReply(`✅ Sukses menambahkan @${targetId.split('@')[0]} sebagai admin.`); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'demote')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup dan bot harus menjadi admin grup.`);
                  let targetId = null;
                  if (quotedMsg) {
                    targetId = quotedParticipant;
                  } else if (mentionedJidList.length === 1) {
                    targetId = mentionedJidList[0];
                  } else if (mentionedJidList.length > 1) {
                    throw new Error(`Gunakan perintah ini dengan membalas pesan atau tag @user yang ingin dihapus dari admin.`);
                  } else {
                    throw new Error(`Gunakan perintah ini dengan membalas pesan atau tag @user yang ingin dihapus dari admin.`);
                  };
                  const metadata = await fn.groupMetadata(toId);
                  const groupAdmins = metadata?.participants?.reduce((a, b) => {
                    if (b.admin) a.push({ id: b.id, admin: b.admin });
                    return a;
                  }, []) || [];
                  if (!groupAdmins.some(admin => admin.id === targetId)) throw new Error(`@${targetId.split('@')[0]} bukan admin grup.`);
                  await fn.demoteParticipant(toId, targetId);
                  await sReply(`✅ Sukses menghapus @${targetId.split('@')[0]} dari admin.`); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'tendang')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup dan bot harus menjadi admin grup.`);
                  let targets = [];
                  if (quotedMsg) {
                    targets.push(quotedParticipant);
                  } else if (mentionedJidList.length > 0) {
                    targets = mentionedJidList;
                  } else {
                    throw new Error(`Gunakan perintah ini dengan membalas pesan atau tag @user yang ingin ditendang.`);
                  }
                  const metadata = await fn.groupMetadata(toId);
                  const groupAdmins = metadata?.participants?.reduce((a, b) => {
                    if (b.admin) a.push({ id: b.id, admin: b.admin });
                    return a;
                  }, []) || [];
                  const targetsToKick = [];
                  const adminTargets = [];
                  for (const target of targets) {
                    if (groupAdmins.some(admin => admin.id === target)) {
                      adminTargets.push(target);
                    } else {
                      targetsToKick.push(target);
                    }
                  }
                  if (adminTargets.length > 0) {
                    const adminMentions = adminTargets.map(id => `@${id.split('@')[0]}`).join(', ');
                    await fn.sendPesan(toId, `Tidak bisa menendang ${adminMentions} karena mereka adalah admin.`, m);
                  }
                  if (targetsToKick.length > 0) {
                    let addedMute = false;
                    for (const target of targetsToKick) {
                      if (!dbMuted.muteuser.includes(target)) {
                        dbMuted.muteuser.push(target);
                        addedMute = true;
                      }
                      if (!dbMuted.mutechat.includes(target)) {
                        dbMuted.mutechat.push(target);
                        addedMute = true;
                      }
                    }
                    if (addedMute) {
                      await dumpMute();
                    }
                    const kickMentions = targetsToKick.map(id => `@${id.split('@')[0]}`).join(', ');
                    await fn.sendPesan(toId, `Akang gendang, mari kita tendang: ${kickMentions}`, m);
                    await fn.removeParticipant(toId, targetsToKick); await limitAdd(serial); await counthit(serial);
                  }
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'disappear')) {
                try {
                  const _waktu = args[0]?.toLowerCase()
                  if (_waktu === '90d') {
                    await fn.sendMessage(toId, { disappearingMessagesInChat: 7776000 });
                  } else if (_waktu === '7d') {
                    await fn.sendMessage(toId, { disappearingMessagesInChat: 604800 });
                  } else if (_waktu === '1d' || _waktu === '24jam') {
                    await fn.sendMessage(toId, { disappearingMessagesInChat: 86400 });
                  } else if (_waktu === 'off') {
                    await fn.sendMessage(toId, { disappearingMessagesInChat: 0 });
                  } else if (args.length > 1) {
                    throw new Error('gunakan argument:\n90d, 7d, 1d, 24jam, off')
                  } else {
                    throw new Error('gunakan argument:\n90d, 7d, 1d, 24jam, off')
                  };
                  await counthit(serial); await limitAdd(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'setgroupname')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup dan bot harus menjadi admin grup.`);
                  const groupchat = await fn.groupMetadata(toId);
                  const oldName = groupchat.subject || 'Tidak diketahui';
                  const newName = arg.trim();
                  if (!newName || newName.length > 100) throw new Error(`Nama grup harus diisi dan maksimal 100 karakter.`);
                  await fn.groupUpdateSubject(toId, newName); await limitAdd(serial); await counthit(serial);
                  await sReply(`✅ Nama grup telah diubah!\n👤 Pelaku: @${serial.split('@')[0]}\n\n• Sebelumnya: ${oldName}\n• Sekarang: ${newName}`);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'setgroupdesc')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup dan bot harus menjadi admin grup.`);
                  const groupchat = await fn.groupMetadata(toId);
                  const oldDesc = groupchat.desc || 'Tidak diketahui';
                  const newDesc = arg.trim();
                  if (!newDesc || newDesc.length > 2048) throw new Error(`Deskripsi grup harus diisi dan maksimal 2048 karakter.`);
                  await fn.groupUpdateDescription(toId, newDesc);
                  await sReply(`✅ Deskripsi grup telah diubah!\n👤 Pelaku: @${serial.split('@')[0]}\n\n• Sebelumnya:\n${oldDesc}\n\n• Sekarang:\n${newDesc}`); await limitAdd(serial); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'setgroupicon')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup dan bot harus menjadi admin grup.`);
                  const targetMsg = quotedMsg ? m.quoted || m : m.message;
                  const mimeType = targetMsg?.imageMessage?.mimetype;
                  if (!mimeType || !mimeType.startsWith('image/')) throw new Error(`Balas pesan gambar atau kirim gambar dengan perintah ini.`);
                  const resBuffer = await fn.getMediaBuffer(targetMsg);
                  if (!resBuffer) throw new Error(`Gagal mendapatkan gambar dari pesan yang dibalas.`);
                  const filename = await saveFile(resBuffer, "tmp_group_icon");
                  await fn.updateProfilePicture(toId, { url: filename });
                  await deleteFile(filename); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'deletegroupicon')) {
                try {
                  if (!m.isGroup || !isBotGroupAdmins) throw new Error(`Perintah ini hanya bisa digunakan di grup dan bot harus menjadi admin grup.`);
                  await fn.removeProfilePicture(toId); await limitAdd(serial); await counthit(serial); await reactDone();
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'requestjoin')) {
                try {
                  if (m.isGroup && isBotGroupAdmins) {
                    const pendingList = await fn.groupRequestParticipantsList(toId).then(a => a.map(b => b.jid));
                    if (pendingList.length > 0) {
                      const listPromises = pendingList.map(async (p, index) => {
                        let jid;
                        if (p.endsWith('@lid')) {
                          jid = await findJidByLid(store, p);
                        } else {
                          jid = p
                        }
                        return `${index + 1}. @${(jid).split('@')[0]}`;
                      });
                      const listText = (await Promise.all(listPromises)).join('\n');
                      await sReply(`*Daftar Permintaan Bergabung yang Tertunda:*\n\n${listText}\n\nUntuk menyetujui, gunakan perintah *${dbSettings.rname}accept nomor urut*.`);
                    } else {
                      await sReply('Saat ini tidak ada permintaan bergabung yang tertunda.');
                    }
                    await limitAdd(serial); await counthit(serial);
                    commandFound = true;
                  }
                } catch (error) {
                  await log(`Error pada perintah requestjoin:\n${error}`, true); await counthit(serial); await reactFail();
                }
              } else if (!commandFound && await getPrefix(txt, 'accept')) {
                try {
                  if (m.isGroup && isBotGroupAdmins) {
                    const pendingList = await fn.groupRequestParticipantsList(toId).then(a => a.map(b => b.jid));
                    if (pendingList.length > 0) {
                      const selector = args[0];
                      if (!selector) {
                        const listPromises = pendingList.map(async (p, index) => {
                          let jid;
                          if (p.endsWith('@lid')) {
                            jid = await findJidByLid(store, p);
                          } else {
                            jid = p
                          }
                          return `${index + 1}. @${(jid).split('@')[0]}`;
                        });
                        const listText = (await Promise.all(listPromises)).join('\n');
                        throw new Error(`*Daftar Permintaan Bergabung:*\n${listText}\n\n*Gunakan:*\n- ${dbSettings.rname}accept all\n- ${dbSettings.rname}accept <nomor> (contoh: ${dbSettings.rname}accept 1,3)`);
                      }
                      let jidsToApprove = [];
                      if (selector.toLowerCase() === 'all' || selector.toLowerCase() === 'semua') {
                        jidsToApprove = pendingList;
                      } else {
                        jidsToApprove = archimed(selector, pendingList);
                      }
                      if (jidsToApprove.length > 0) {
                        await fn.groupRequestParticipantsUpdate(toId, jidsToApprove, 'approve');
                        let mentionParts = [];
                        for (const lid of jidsToApprove) {
                          let jid;
                          if (lid.endsWith('@lid')) {
                            jid = await findJidByLid(store, lid);
                          } else {
                            jid = lid
                          }
                          const numberToMention = jid.split('@')[0];
                          mentionParts.push(`@${numberToMention}`);
                        }
                        const approvedText = mentionParts.join(', ');
                        await sReply(`✅ Berhasil menyetujui: ${approvedText}`); await limitAdd(serial); await counthit(serial);
                        commandFound = true;
                      }
                    } else {
                      await sReply('Saat ini tidak ada permintaan bergabung yang tertunda.');
                    }
                  }
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              } else if (!commandFound && await getPrefix(txt, 'reject')) {
                try {
                  if (m.isGroup && isBotGroupAdmins) {
                    const pendingList = await fn.groupRequestParticipantsList(toId).then(a => a.map(b => b.jid));
                    if (pendingList.length > 0) {
                      const selector = args[0];
                      if (!selector) {
                        const listPromises = pendingList.map(async (p, index) => {
                          let jid;
                          if (p.endsWith('@lid')) {
                            jid = await findJidByLid(store, p);
                          } else {
                            jid = p
                          }
                          return `${index + 1}. @${(jid).split('@')[0]}`;
                        });
                        const listText = (await Promise.all(listPromises)).join('\n');
                        throw new Error(`*Daftar Permintaan Bergabung:*\n${listText}\n\n*Gunakan:*\n- ${dbSettings.rname}reject all\n- ${dbSettings.rname}reject <nomor> (contoh: ${dbSettings.rname}reject 1,3)`);
                      }
                      let jidsToApprove = [];
                      if (selector.toLowerCase() === 'all' || selector.toLowerCase() === 'semua') {
                        jidsToApprove = pendingList;
                      } else {
                        jidsToApprove = archimed(selector, pendingList);
                      }
                      if (jidsToApprove.length > 0) {
                        await fn.groupRequestParticipantsUpdate(toId, jidsToApprove, 'reject');
                        let mentionParts = [];
                        for (const lid of jidsToApprove) {
                          let jid;
                          if (lid.endsWith('@lid')) {
                            jid = await findJidByLid(store, lid);
                          } else {
                            jid = lid
                          }
                          const numberToMention = jid.split('@')[0];
                          mentionParts.push(`@${numberToMention}`);
                        }
                        const approvedText = mentionParts.join(', ');
                        await sReply(`✅ Berhasil Menolak: ${approvedText}`); await limitAdd(serial); await counthit(serial);
                        commandFound = true;
                      }
                    } else {
                      await sReply('Saat ini tidak ada permintaan bergabung yang tertunda.');
                    }
                  }
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                }
              }
              ctype = "util"
              if (!commandFound && await getPrefix(txt, 'hidetag')) {
                try {
                  if (m.isGroup && arg) {
                    const groupMetadata = await fn.groupMetadata(toId);
                    const mentions = groupMetadata.participants.map(member => member.id);
                    await fn.sendMessage(toId, { text: arg, mentions: mentions }, { ephemeralExpiration: m?.expiration ?? store?.messages?.[toId]?.array?.slice(-1)[0]?.expiration ?? 0, messageId: randomByte(32) });
                    await counthit(serial); await limitAdd(serial);
                    commandFound = true;
                  }
                } catch {
                  await reactFail(); await counthit(serial);
                }
              } else if (!commandFound && await getComs(txt, 'totag')) {
                try {
                  if (m.isGroup && quotedMsg) {
                    await fn.sendMessage(toId, 
                      { 
                        forward: proto.WebMessageInfo.fromObject({
                          key: m.quoted.key,
                          message: m.quoted,
                          ...(m.isGroup ? { participant: m.quoted.sender } : {})
                        }), 
                        mentions: m.metadata.participants.map(a => a.id) 
                      },
                      { 
                        ephemeralExpiration: m?.expiration ?? store?.messages?.[toId]?.array?.slice(-1)[0]?.expiration ?? 0,
                        messageId: randomByte(32) 
                      }
                    )
                    await counthit(serial); await limitAdd(serial);
                    commandFound = true;
                  }
                } catch {
                  await reactFail(); await counthit(serial);
                }
              }
            }
            ctype = "hitung"
            if (!commandFound && await getPrefix(txt, 'calc')) {
              try {
                if (!arg) throw new Error(`Masukkan ekspresi matematika yang ingin dihitung.`);
                const expressionToEvaluate = arg.replace(/x/gi, '*').replace(/:/g, '/');
                const result = Math_js.evaluate(expressionToEvaluate);
                if (typeof result !== "number") {
                  throw new Error(`Hasil dari "${arg}" bukan angka!`);
                } else {
                  await sReply(`${arg} = ${result}`); await limitAdd(serial); await counthit(serial);
                }
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'rumus-kelilingpersegipanjang')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang dan lebar persegi panjang, contoh: ${dbSettings.sname}rumus-kelilingpersegipanjang 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.datar.keliling.persegiPanjang(res, ret, false)
                const caraPersegi = bdr.datar.keliling.persegiPanjang(res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'rumus-luaspersegipanjang')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang dan lebar persegi panjang, contoh: ${dbSettings.sname}rumus-luaspersegipanjang 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.datar.luas.persegiPanjang(res, ret, false)
                const caraPersegi = bdr.datar.luas.persegiPanjang(res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-kelilingbelahketupat')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi belah ketupat, contoh: ${dbSettings.sname}hasil-kelilingbelahketupat 5`);
                const res = args[0]
                const persegi = bdr.datar.keliling.belahKetupat(res, false)
                const caraPersegi = bdr.datar.keliling.belahKetupat(res, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-luasbelahketupat')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi dan diagonal belah ketupat, contoh: ${dbSettings.sname}hasil-luasbelahketupat 5 10`);
                const q = args[0]
                const a = args[1]
                const luaspersegi = bdr.datar.luas.belahKetupat(q, a, false)
                const luaspersegis = bdr.datar.luas.belahKetupat(q, a, true)
                await sReply(`*Hasil*: ${luaspersegi}\n\n${luaspersegis}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-kelilingtrapesium')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi trapesium, contoh: ${dbSettings.sname}hasil-kelilingtrapesium 5 10 7 3`);
                const a = args[0]
                const b = args[1]
                const c = args[2]
                const d = args[3]
                const persegi = bdr.datar.keliling.trapesium(a, b, c, d, false)
                const caraPersegi = bdr.datar.keliling.trapesium(a, b, c, d, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-luastrapesium')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi trapesium, contoh: ${dbSettings.sname}hasil-luastrapesium 5 10 7`);
                const a = args[0]
                const b = args[1]
                const c = args[2]
                const persegi = bdr.datar.luas.trapesium(a, b, c, false)
                const caraPersegi = bdr.datar.luas.trapesium(a, b, c, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-kelilingpersegi')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi persegi, contoh: ${dbSettings.sname}hasil-kelilingpersegi 5`);
                const res = args[0]
                const persegi = bdr.datar.keliling.persegi(res, false)
                const caraPersegi = bdr.datar.keliling.persegi(res, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-luaspersegi')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi persegi, contoh: ${dbSettings.sname}hasil-luaspersegi 5`);
                const q = args[0]
                const luaspersegi = bdr.datar.luas.persegi(q, false)
                const luaspersegis = bdr.datar.luas.persegi(q, true)
                await sReply(`*Hasil*: ${luaspersegi}\n\n${luaspersegis}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-kelilingsegitiga')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi segitiga, contoh: ${dbSettings.sname}hasil-kelilingsegitiga 5 10 7`);
                const res = args[0]
                const ret = args[1]
                const rea = args[2]
                const persegi = bdr.datar.keliling.segitiga(res, ret, rea, false)
                const caraPersegi = bdr.datar.keliling.segitiga(res, ret, rea, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-luassegitiga')) {
              try {
                if (!arg) throw new Error(`Masukkan alas dan tinggi segitiga, contoh: ${dbSettings.sname}hasil-luassegitiga 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.datar.luas.segitiga(res, ret, false)
                const caraPersegi = bdr.datar.luas.segitiga(res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-kelilinglingkaran')) {
              try {
                if (!arg) throw new Error(`Masukkan jari-jari lingkaran, contoh: ${dbSettings.sname}hasil-kelilinglingkaran 5`);
                const res = args[0]
                const persegi = bdr.datar.keliling.lingkaran(res, false)
                const caraPersegi = bdr.datar.keliling.lingkaran(res, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-luaslingkaran')) {
              try {
                if (!arg) throw new Error(`Masukkan jari-jari lingkaran, contoh: ${dbSettings.sname}hasil-luaslingkaran 5`);
                const res = args[0]
                const persegi = bdr.datar.luas.lingkaran(res, false)
                const caraPersegi = bdr.datar.luas.lingkaran(res, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-kelilinglayang')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang diagonal 1 dan diagonal 2 layang-layang, contoh: ${dbSettings.sname}hasil-kelilinglayang 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.datar.keliling.layang(res, ret, false)
                const caraPersegi = bdr.datar.keliling.layang(res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-luaslayang')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang diagonal 1 dan diagonal 2 layang-layang, contoh: ${dbSettings.sname}hasil-luaslayang 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.datar.luas.layang(res, ret, false)
                const caraPersegi = bdr.datar.luas.layang(res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-luasjajargenjang')) {
              try {
                if (!arg) throw new Error(`Masukkan alas dan tinggi jajargenjang, contoh: ${dbSettings.sname}hasil-luasjajargenjang 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.datar.luas.jajarGenjang(res, ret, false)
                const caraPersegi = bdr.datar.luas.jajarGenjang(res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-kelilingjajargenjang')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi dan tinggi jajargenjang, contoh: ${dbSettings.sname}hasil-kelilingjajargenjang 5 10 7 3`);
                const res = args[0]
                const ret = args[1]
                const rea = args[2]
                const rex = args[3]
                const persegi = bdr.datar.keliling.jajarGenjang(res, ret, rea, rex, false)
                const caraPersegi = bdr.datar.keliling.jajarGenjang(res, ret, rea, rex, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hasil-luaslimassegitigasisi')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi segitiga, contoh: ${dbSettings.sname}hasil-luaslimassegitigasisi 5`);
                const res = args[0]
                const ret = args[1]
                const rets = args[2]
                const persegi = bdr.ruang.limas.segitiga.luasPermukaan(res, ret, rets, false)
                const caraPersegi = bdr.ruang.limas.segitiga.luasPermukaan(res, ret, rets, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-luasbalok')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang, lebar, dan tinggi balok, contoh: ${dbSettings.sname}hitung-luasbalok 5 10 7`);
                const res = args[0]
                const ret = args[1]
                const rea = args[2]
                const persegi = bdr.ruang.balok('luas', res, ret, rea, false)
                const caraPersegi = bdr.ruang.balok('luas', res, ret, rea, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-volumebalok')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang, lebar, dan tinggi balok, contoh: ${dbSettings.sname}hitung-volumebalok 5 10 7`);
                const res = args[0]
                const ret = args[1]
                const rea = args[2]
                const persegi = bdr.ruang.balok('volume', res, ret, rea, false)
                const caraPersegi = bdr.ruang.balok('volume', res, ret, rea, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-volumekubus')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi kubus, contoh: ${dbSettings.sname}hitung-volumekubus 5`);
                const res = args[0]
                const persegi = bdr.ruang.kubus('volume', res, false)
                const caraPersegi = bdr.ruang.kubus('volume', res, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-luaskubus')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi kubus, contoh: ${dbSettings.sname}hitung-luaskubus 5`);
                const res = args[0]
                const persegi = bdr.ruang.kubus('luas', res, false)
                const caraPersegi = bdr.ruang.kubus('luas', res, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-volumekerucut')) {
              try {
                if (!arg) throw new Error(`Masukkan jari-jari dan tinggi kerucut, contoh: ${dbSettings.sname}hitung-volumekerucut 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.ruang.kerucut('volume', res, ret, false)
                const caraPersegi = bdr.ruang.kerucut('volume', res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-luaskerucut')) {
              try {
                if (!arg) throw new Error(`Masukkan jari-jari dan tinggi kerucut, contoh: ${dbSettings.sname}hitung-luaskerucut 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.ruang.kerucut('luas', res, ret, false)
                const caraPersegi = bdr.ruang.kerucut('luas', res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-volumetabung')) {
              try {
                if (!arg) throw new Error(`Masukkan jari-jari dan tinggi tabung, contoh: ${dbSettings.sname}hitung-volumetabung 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.ruang.tabung('volume', res, ret, false)
                const caraPersegi = bdr.ruang.tabung('volume', res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-luastabung')) {
              try {
                if (!arg) throw new Error(`Masukkan jari-jari dan tinggi tabung, contoh: ${dbSettings.sname}hitung-luastabung 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.ruang.tabung('luas', res, ret, false)
                const caraPersegi = bdr.ruang.tabung('luas', res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-volumebola')) {
              try {
                if (!arg) throw new Error(`Masukkan jari-jari bola, contoh: ${dbSettings.sname}hitung-volumebola 5`);
                const res = args[0]
                const persegi = bdr.ruang.bola('volume', res, false)
                const caraPersegi = bdr.ruang.bola('volume', res, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-luasbola')) {
              try {
                if (!arg) throw new Error(`Masukkan jari-jari bola, contoh: ${dbSettings.sname}hitung-luasbola 5`);
                const res = args[0]
                const persegi = bdr.ruang.bola('luas', res, false)
                const caraPersegi = bdr.ruang.bola('luas', res, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-volumelimassegitigasisi')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi limas segitiga, contoh: ${dbSettings.sname}hitung-volumelimassegitigasisi 5 10 7`);
                const res = args[0]
                const ret = args[1]
                const rets = args[2]
                const persegi = bdr.ruang.limas.segitiga.volume(res, ret, rets, false)
                const caraPersegi = bdr.ruang.limas.segitiga.volume(res, ret, rets, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-volumelimassegiempat')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi dan tinggi limas segi empat, contoh: ${dbSettings.sname}hitung-volumelimassegiempat 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.ruang.limas.segiempat('volume', res, ret, false)
                const caraPersegi = bdr.ruang.limas.segiempat('volume', res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-luaslimassegiempat')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi dan tinggi limas segi empat, contoh: ${dbSettings.sname}hitung-luaslimassegiempat 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.ruang.limas.segiempat('lp', res, ret, false)
                const caraPersegi = bdr.ruang.limas.segiempat('lp', res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-volumeprisma')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang alas, tinggi, dan sisi prisma segitiga, contoh: ${dbSettings.sname}hitung-volumeprisma 5 10 7`);
                const res = args[0]
                const ret = args[1]
                const rets = args[2]
                const persegi = bdr.ruang.prisma.volume.segitiga(res, ret, rets, false)
                const caraPersegi = bdr.ruang.prisma.volume.segitiga(res, ret, rets, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-luasprisma')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang alas, tinggi, dan sisi prisma segitiga, contoh: ${dbSettings.sname}hitung-luasprisma 5 10 7 3 4 6`);
                const a = args[0]
                const b = args[1]
                const c = args[2]
                const d = args[3]
                const e = args[4]
                const f = args[5]
                const persegi = bdr.ruang.prisma.luasPermukaan.segitiga(a, b, c, d, e, f, false)
                const caraPersegi = bdr.ruang.prisma.luasPermukaan.segitiga(a, b, c, d, e, f, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-kuadrat')) {
              try {
                if (!arg) throw new Error(`Masukkan angka yang ingin dihitung kuadratnya, contoh: ${dbSettings.sname}hitung-kuadrat 5`);
                const res = args[0]
                const persegi = bdr.rdb.kuadrat(res)
                await sReply(`*Hasil*: ${persegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-kubik')) {
              try {
                if (!arg) throw new Error(`Masukkan angka yang ingin dihitung kubiknya, contoh: ${dbSettings.sname}hitung-kubik 5`);
                const res = args[0]
                const persegi = bdr.rdb.kubik(res)
                await sReply(`*Hasil*: ${persegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-miringpythagoras')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi segitiga siku-siku, contoh: ${dbSettings.sname}hitung-miringpythagoras 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.rdb.pyhtagoras('miring', res, ret, false)
                const caraPersegi = bdr.rdb.pyhtagoras('miring', res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-alaspythagoras')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi segitiga siku-siku, contoh: ${dbSettings.sname}hitung-alaspythagoras 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.rdb.pyhtagoras('alas', res, ret, false)
                const caraPersegi = bdr.rdb.pyhtagoras('alas', res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hitung-tinggipythagoras')) {
              try {
                if (!arg) throw new Error(`Masukkan panjang sisi segitiga siku-siku, contoh: ${dbSettings.sname}hitung-tinggipythagoras 5 10`);
                const res = args[0]
                const ret = args[1]
                const persegi = bdr.rdb.pyhtagoras('tinggi', res, ret, false)
                const caraPersegi = bdr.rdb.pyhtagoras('tinggi', res, ret, true)
                await sReply(`*Hasil*: ${persegi}\n\n${caraPersegi}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "manage"
            if (!commandFound && await getPrefix(txt, 'number')) {
              try {
                const targetId = quotedMsg ? quotedParticipant : mentionedJidList[0];
                if (!targetId) throw new Error(`Silakan balas pesan atau sebut nomor yang ingin kamu ambil nomornya.`);
                await sReply(targetId.split('@')[0]); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'wame')) {
              try {
                const targetId = quotedMsg ? quotedParticipant : mentionedJidList[0];
                if (!targetId) throw new Error(`Silakan balas pesan atau sebut nomor yang ingin kamu ubah nomornya menjadi link wa.me/`);
                await sReply(`wa.me/${targetId.split('@')[0]}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'gcreator')) {
              try {
                if (!m.isGroup) throw new Error(`Perintah ini hanya bisa digunakan di grup.`);
                const groupchat = await fn.groupMetadata(toId);
                const { subject, subjectOwner, subjectOwnerPhoneNumber } = groupchat;
                let creatorId;
                if (subjectOwnerPhoneNumber === undefined) {
                  creatorId = subjectOwner;
                } else {
                  creatorId = subjectOwnerPhoneNumber;
                }
                if (!creatorId) throw new Error(`Tidak dapat menemukan ID pembuat grup.`);
                const creatorNumber = creatorId.split('@')[0];
                await fn.sendContact(toId, "Group Creator", subject, creatorNumber, m); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'gid')) {
              try {
                if (!m.isGroup) throw new Error(`Perintah ini hanya bisa digunakan di grup.`);
                const groupchat = await fn.groupMetadata(toId);
                const { id } = groupchat
                await sReply(id); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'join')) {
              try {
                if (dbSettings.autojoin === true) throw new Error(`Fitur join grup otomatis sedang aktif, silakan matikan terlebih dahulu dengan perintah ${dbSettings.sname}autojoin`);
                if (!arg) {
                  throw new Error(`Silakan berikan link undangan grup WhatsApp yang ingin Kamu masuki.\nContoh: ${dbSettings.sname}join https://chat.whatsapp.com/abc123xyz`);
                } else if (args[0].match(/(chat.whatsapp.com)/gi)) {
                  const inviteCode = args[0].split("https://chat.whatsapp.com/")[1];
                  if (!inviteCode) throw new Error(`Silakan berikan link undangan grup WhatsApp yang valid.\nContoh: ${dbSettings.sname}join https://chat.whatsapp.com/abc123xyz`);
                  const { restrict, joinApprovalMode, subject, participants, id } = await fn.groupGetInviteInfo(inviteCode);
                  if (!(isSadmin || master) && participants.length < dbSettings.memberLimit) throw new Error(`Grup terlalu kecil!\n\nMember: ${participants.length}\nMinimal: ${dbSettings.memberLimit}\nBot hanya bergabung ke grup dengan ${dbSettings.memberLimit}+ member.`);
                  if (!joinApprovalMode) {
                    await fn.groupAcceptInvite(inviteCode);
                    if (!restrict) await fn.sendPesan(id, `Halo warga grup *${subject}*!\nTerima kasih sudah mengundang ${dbSettings.botname}. Ketik *.rules* untuk melihat peraturan.`, m);
                    await sReply("✅ Berhasil join grup."); await limitAdd(serial); await counthit(serial);
                  }
                }
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "media"
            if (!commandFound && await getPrefix(txt, 'ig')) {
              try {
                let url;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  url = quotedMsg?.body.trim();
                } else if (args.length > 0) {
                  url = args[0];
                } else {
                  throw new Error(`Silakan balas pesan berisi link Instagram atau kirim linknya langsung.\nContoh: ${dbSettings.rname}ig https://...`);
                }
                if (!/^https?:\/\/(www\.)?instagram\.com/.test(url)) throw new Error("URL yang Kamu berikan sepertinya bukan link Instagram yang valid.");
                const data = await instagram(url);
                if (!data) throw new Error("Gagal mengambil data dari Instagram. Pastikan link valid dan tidak private.");
                if (data.post_info) {
                  const postInfo = data.post_info;
                  const mediaUrls = data.url_list;
                  const baseCaption =
                    `📷 *Instagram Downloader*\n\n` +
                    `👤 *Username:* ${postInfo.owner_username}\n` +
                    `❤️ *Likes:* ${postInfo.likes}\n` +
                    `📝 *Caption:* ${postInfo.caption || '(Tidak ada caption)'}`;
                  if (mediaUrls.length <= 1) {
                    await fn.sendFileUrl(toId, mediaUrls[0], baseCaption, m);
                  } else {
                    const createMediaObjectFromUrl = (url, caption) => {
                      if (url.includes('.mp4')) {
                        return { video: { url: url }, caption: caption };
                      } else {
                        return { image: { url: url }, caption: caption };
                      }
                    };
                    const selection = args[1];
                    let mediaToSend;
                    if (selection) {
                      const indicesToDownload = parseImageSelection(selection, mediaUrls.length);
                      if (indicesToDownload.length === 0) throw new Error(`Format pemilihan slide salah!\nTotal: ${mediaUrls.length}\nContoh: ${dbSettings.rname}ig [url] 1,3,5 atau ${dbSettings.rname}ig [url] 2-5`);
                      mediaToSend = indicesToDownload.map(index => {
                        const url = mediaUrls[index];
                        const caption = `${baseCaption}\n\n📌 *File Pilihan ${index + 1} dari ${mediaUrls.length}*`;
                        return createMediaObjectFromUrl(url, caption);
                      });
                    } else {
                      mediaToSend = mediaUrls.map((url, index) => {
                        const caption = `${baseCaption}\n\n🖼️ *File ${index + 1} dari ${mediaUrls.length}*`;
                        return createMediaObjectFromUrl(url, caption);
                      });
                    }
                    const chunks = chunkArray(mediaToSend, 15);
                    for (const [index, chunk] of chunks.entries()) {
                      await fn.sendAlbum(toId, chunk, { quoted: m });
                      if (chunks.length > 1 && index < chunks.length - 1) {
                        await delay(1000);
                      }
                    }
                  }
                } else if (data.media_details && data.media_details.length > 0) {
                  if (data.media_details.length === 1) {
                    await fn.sendFileUrl(toId, data.media_details[0].url, dbSettings.autocommand, m);
                  } else {
                    const mediaDetails = data.media_details;
                    const selection = args[1];
                    let mediaToSend;
                    const createMediaObject = (media, caption) => {
                      if (media.type === 'video') {
                        return { video: { url: media.url }, caption: caption };
                      } else {
                        return { image: { url: media.url }, caption: caption };
                      }
                    };
                    if (selection) {
                      const indicesToDownload = parseImageSelection(selection, mediaDetails.length);
                      if (indicesToDownload.length === 0) throw new Error(`Format pemilihan salah!\nTotal: ${mediaDetails.length}\nContoh: ${dbSettings.rname}ig [url] 1,3,5 atau ${dbSettings.rname}ig [url] 2-5`);
                      mediaToSend = indicesToDownload.map(index => {
                        const mediaItem = mediaDetails[index];
                        const caption = `📸 *Instagram*\n\n📌 *Item Pilihan ${index + 1} dari ${mediaDetails.length}*`;
                        return createMediaObject(mediaItem, caption);
                      });
                    } else {
                      mediaToSend = mediaDetails.map((mediaItem, index) => {
                        const caption = `📸 *Instagram*\n\n🖼️ *Item ${index + 1} dari ${mediaDetails.length}*`;
                        return createMediaObject(mediaItem, caption);
                      });
                    }
                    const chunks = chunkArray(mediaToSend, 15);
                    for (const [index, chunk] of chunks.entries()) {
                      await fn.sendAlbum(toId, chunk, { quoted: m });
                      if (chunks.length > 1 && index < chunks.length - 1) {
                        await delay(1000);
                      }
                    }
                  }
                } else {
                  throw new Error("Gagal memproses media. Pastikan link benar dan tidak private.");
                }
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                await counthit(serial); await reactDone();
                commandFound = true;
              } catch (error) {
                await log(`Error command ig:\n${error}`, true);
                const errorMessage = error.message || "Terjadi error saat memproses request.";
                await sReply(errorMessage); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'tt')) {
              try {
                let url;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  url = quotedMsg?.body.trim();
                } else if (args.length > 0) {
                  url = args[0];
                } else {
                  throw new Error(`Silakan balas pesan berisi link TikTok atau kirim linknya langsung.\nContoh: ${dbSettings.rname}tt https://...`);
                }
                let result;
                try {
                  result = await fetchTikTokData(url, 'v1');
                } catch {
                  try {
                    result = await fetchTikTokData(url, 'v2');
                  } catch {
                    result = await fetchTikTokData(url, 'v3');
                  }
                }
                const baseCaption = buildBaseCaption(result);
                if (result.type === 'video' && result.video?.playAddr) {
                  await fn.sendFileUrl(toId, result.video.playAddr, baseCaption, m);
                } else if (result.type === 'image' && result.images?.length > 0) {
                  await sendImages(fn, result, args, toId, m, baseCaption);
                } else {
                  throw new Error("Gagal menemukan media video atau gambar yang dapat diunduh dari link ini.");
                }
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                await counthit(serial); await reactDone();
                commandFound = true;
              } catch (error) {
                await log(`Error command tt:\n${error}`, true);
                await sReply(`Error:\n\n${error.message || "Terjadi error saat memproses request."}`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'play')) {
              let downloadedFilePath = '';
              try {
                const query = arg;
                if (!query) throw new Error(`Silakan berikan judul lagu atau link YouTube.\nContoh: ${dbSettings.rname}play Never Gonna Give You Up`);
                const search = await youtubeDownloader.searchVideos(query, 1);
                const video = search[0];
                if (!video) throw new Error(`Lagu dengan judul "${query}" tidak ditemukan.`);
                const videoTitle = video.title;
                const videoUrl = video.url;
                downloadedFilePath = await youtubeDownloader.download(videoUrl, null, global.tmpDir, null, '0');
                const caption = `*Title:* ${videoTitle}\n*URL:* ${videoUrl}`;
                await fn.sendFilePath(toId, caption, downloadedFilePath, { quoted: m });
                await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply(`Error:\n\n${error.message}`); await counthit(serial);
              } finally {
                await deleteFile(downloadedFilePath);
              }
            } else if (!commandFound && await getPrefix(txt, 'ytsearch')) {
              try {
                const query = arg;
                if (!query) throw new Error(`Silakan berikan judul lagu atau kata kunci pencarian.\nContoh: ${dbSettings.rname}ytsearch Never Gonna Give You Up`);
                const videos = await youtubeDownloader.searchVideos(query, 5);
                let teks = '*Hasil Pencarian YouTube:*\n\n';
                for (let i = 0; i < videos.length; i++) {
                  teks += `${i + 1}. 🔍 *${videos[i].title}*\n` +
                    `👤 ${videos[i].author.name}\n` +
                    `⏰ ${videos[i].timestamp}\n` +
                    `🔗 ${videos[i].url}\n\n`;
                  yts.push(videos[i].url);
                }
                await sReply(teks); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'ytdl')) {
              let downloadedFilePath = '';
              try {
                let input;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  input = quotedMsg?.body.trim();
                } else if (arg.length > 0) {
                  input = args[0];
                } else {
                  throw new Error(`Perintah ini memerlukan input. Balas pesan berisi link/indeks, atau ketik langsung.\nContoh: ${dbSettings.rname}ytdl https://... atau ${dbSettings.rname}ytdl 1 (setelah ${dbSettings.rname}ytsearch)`);
                }
                let url = '';
                let videoTitle = 'Audio dari YouTube';
                if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(input)) {
                  url = cleanYoutubeUrl(input);
                  const metadata = await youtubeDownloader.getVideoMetadata(url);
                  videoTitle = metadata.filename.replace(/_/g, ' ');
                } else {
                  if (!yts || yts.length === 0) throw new Error(`Tidak ada hasil pencarian sebelumnya. Silakan lakukan pencarian (misal: dengan ${dbSettings.rname}ytsearch) sebelum menggunakan indeks.`);
                  const index = parseInt(input) - 1;
                  if (isNaN(index) || index < 0 || index >= yts.length) throw new Error(`Indeks tidak valid. Pilih nomor antara 1 dan ${yts.length}.`);
                  const video = yts[index];
                  url = video.url;
                  videoTitle = video.title;
                }
                downloadedFilePath = await youtubeDownloader.download(url, null, global.tmpDir, null, '0');
                await fn.sendFilePath(toId, videoTitle, downloadedFilePath, { quoted: m });
                await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply(`Error:\n\n${error.message}`); await counthit(serial);
              } finally {
                await deleteFile(downloadedFilePath);
              }
            } else if (!commandFound && await getPrefix(txt, 'ytvid')) {
              let downloadedFilePath = '';
              try {
                let input;
                let resolution = null;
                let url = '';
                if (args.length > 0) {
                  const firstArg = args[0];
                  if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(firstArg)) {
                    input = cleanYoutubeUrl(firstArg);
                  } else {
                    if (!yts || yts.length === 0) throw new Error(`Tidak ada hasil pencarian sebelumnya. Silakan lakukan pencarian (misal: dengan ${dbSettings.rname}ytsearch) sebelum menggunakan indeks.`);
                    const index = parseInt(firstArg, 10) - 1;
                    if (isNaN(index) || index < 0 || index >= yts.length) throw new Error("Indeks video tidak valid.");
                    input = yts[index].url;
                  }
                  if (args.length > 1) { resolution = args[1].toLowerCase(); }
                } else if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  input = quotedMsg?.body;
                } else {
                  throw new Error("Silakan berikan URL YouTube atau pilih dari hasil pencarian.");
                }
                url = input;
                downloadedFilePath = await youtubeDownloader.downloadVideo(url, {
                  customDir: global.tmpDir,
                  resolution: resolution
                });
                await fn.sendFilePath(toId, dbSettings.autocommand, downloadedFilePath, { quoted: m });
                await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply(error.message || 'Terjadi kesalahan tak terduga.'); await counthit(serial);
              } finally {
                await deleteFile(downloadedFilePath);
              }
            } else if (!commandFound && await getPrefix(txt, 'fb')) {
              const tempVideoPath = `./src/sampah/temp_video_${Date.now()}.mp4`;
              const tempAudioPath = `./src/sampah/temp_audio_${Date.now()}.m4a`;
              const finalOutputPath = `./src/sampah/download_${Date.now()}.mp4`;
              try {
                let input;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  input = quotedMsg?.body;
                } else if (args.length > 0) {
                  input = args[0];
                } else {
                  throw new Error("Silakan berikan URL Facebook atau balas pesan yang berisi URL.");
                }
                if (!/^https?:\/\/(www\.)?(m\.)?(web\.)?facebook\.com/.test(input)) throw new Error("URL yang Kamu berikan bukan URL Facebook yang valid.");
                const downloadVideoCmd = `${global.ytDlpPath} -f "bestvideo[ext=mp4]" -o "${tempVideoPath}" "${input}"`;
                const downloadAudioCmd = `${global.ytDlpPath} -f "bestaudio[ext=m4a]" -o "${tempAudioPath}" "${input}"`;
                await exec(downloadVideoCmd, { shell: '/bin/bash' });
                await exec(downloadAudioCmd, { shell: '/bin/bash' });
                const ffmpegCmd = `ffmpeg -i "${tempVideoPath}" -i "${tempAudioPath}" -c:v libx264 -pix_fmt yuv420p -c:a aac -movflags +faststart "${finalOutputPath}"`;
                await exec(ffmpegCmd, { shell: '/bin/bash' });
                await fs.access(finalOutputPath);
                await fn.sendFilePath(toId, dbSettings.autocommand, finalOutputPath, { quoted: m }); await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) {
                if (error.stderr) {
                  await log(`FFMPEG/YTDLP Error:\n\n${error.stderr}`);
                  await sReply("Gagal memproses video. Pastikan URL valid, video bersifat publik, dan tidak dibatasi.");
                } else {
                  await sReply(error.message);
                }
                await counthit(serial);
              } finally {
                await deleteFile(tempVideoPath); await deleteFile(tempAudioPath); await deleteFile(finalOutputPath);
              }
            } else if (!commandFound && await getPrefix(txt, 'twt')) {
              const tempVideoPath = `./src/sampah/temp_video_${Date.now()}.mp4`;
              const tempAudioPath = `./src/sampah/temp_audio_${Date.now()}.m4a`;
              const finalOutputPath = `./src/sampah/download_${Date.now()}.mp4`;
              try {
                let input;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  input = quotedMsg?.body;
                } else if (args.length > 0) {
                  input = args[0];
                } else {
                  throw new Error("Silakan berikan URL Twitter/X atau balas pesan yang berisi URL.");
                }
                if (!/^https?:\/\/(www\.)?(mobile\.)?(twitter\.com|x\.com)/.test(input)) throw new Error("URL yang Kamu berikan bukan URL Twitter/X yang valid.");
                const downloadVideoCmd = `${global.ytDlpPath} -f "bestvideo[ext=mp4]" -o "${tempVideoPath}" "${input}"`;
                const downloadAudioCmd = `${global.ytDlpPath} -f "bestaudio[ext=m4a]" -o "${tempAudioPath}" "${input}"`;
                await exec(downloadVideoCmd, { shell: '/bin/bash' });
                await exec(downloadAudioCmd, { shell: '/bin/bash' });
                const ffmpegCmd = `ffmpeg -i "${tempVideoPath}" -i "${tempAudioPath}" -c:v libx264 -pix_fmt yuv420p -c:a aac -movflags +faststart "${finalOutputPath}"`;
                await exec(ffmpegCmd, { shell: '/bin/bash' });
                await fs.access(finalOutputPath);
                await fn.sendFilePath(toId, dbSettings.autocommand, finalOutputPath, { quoted: m }); await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) {
                if (error.stderr) {
                  await log(`FFMPEG/YTDLP Error:\n\n${error.stderr}`);
                  await sReply("Gagal memproses video. Pastikan URL valid, tweet bersifat publik, dan berisi video.");
                } else {
                  await sReply(error.message);
                }
                await counthit(serial);
              } finally {
                await deleteFile(tempVideoPath); await deleteFile(tempAudioPath); await deleteFile(finalOutputPath);
              }
            } else if (!commandFound && await getPrefix(txt, 'spotifydl')) {
              try {
                let input;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  input = quotedMsg?.body.trim();
                } else if (args.length > 0) {
                  input = args[0];
                } else {
                  throw new Error(`Perintah ini memerlukan input. Balas pesan berisi link, atau ketik langsung.\nContoh: ${dbSettings.rname}spotifydl https://open.spotify.com/track/...`);
                }
                if (!/^https?:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+/i.test(input)) throw new Error(`URL TIDAK VALID!\nContoh: ${dbSettings.rname}spotifydl https://open.spotify.com/track/...`);
                const result = await spotify.downloadTrackOrCollection(input, global.tmpDir);
                await delay(2000);
                if (Array.isArray(result)) {
                  for (const filePath of result) {
                    await fn.sendFilePath(toId, dbSettings.autocommand, filePath, { quoted: m });
                    await deleteFile(filePath);
                  }
                } else {
                  await fn.sendFilePath(toId, dbSettings.autocommand, result, { quoted: m });
                  await deleteFile(result);
                }
                await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) {
                await log(`Error: ${error}`); await sReply(error.message); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'spotifysearch')) {
              try {
                const query = arg;
                if (!query) throw new Error(`Silakan berikan judul lagu atau kata kunci pencarian.\n\n*Contoh:* ${dbSettings.rname}spotifysearch Boombastic`);
                const searchResults = await spotify.search(query);
                if (searchResults.length === 0) throw new Error(`Lagu dengan kata kunci "${query}" tidak ditemukan.`);
                const tracks = searchResults.slice(0, 5);
                let teks = '✨ *Hasil Pencarian Spotify:*\n\n';
                for (let i = 0; i < tracks.length; i++) {
                  const track = tracks[i];
                  const totalSeconds = Math.floor(track.duration_ms / 1000);
                  const minutes = Math.floor(totalSeconds / 60);
                  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
                  const duration = `${minutes}:${seconds}`;
                  teks += `*${i + 1}.* 🎵 *${track.name}*\n` +
                    `   👤 *Artis:* ${track.artists}\n` +
                    `   ⏰ *Durasi:* ${duration}\n` +
                    `   🔗 *Link:* ${track.link}\n\n`;
                }
                await sReply(teks); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'spotifyplay')) {
              try {
                const query = arg;
                if (!query) throw new Error(`Silakan berikan judul lagu atau kata kunci pencarian.\n\n*Contoh:* ${dbSettings.rname}spotifyplay Boombastic`);
                const searchResults = await spotify.search(query);
                if (searchResults.length === 0) throw new Error(`Lagu dengan kata kunci "${query}" tidak ditemukan.`);
                const result = await spotify.downloadTrackOrCollection(searchResults[0].link, global.tmpDir);
                await delay(2000);
                if (Array.isArray(result)) {
                  for (const filePath of result) {
                    await fn.sendFilePath(toId, dbSettings.autocommand, filePath, { quoted: m });
                    await deleteFile(filePath);
                  }
                } else {
                  await fn.sendFilePath(toId, dbSettings.autocommand, result, { quoted: m });
                  await deleteFile(result);
                }
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "ai"
            if (!commandFound && await getPrefix(txt, 'ai')) {
              try {
                let input;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  input = quotedMsg?.body;
                } else if (args.length > 0) {
                  input = args.join(' ');
                } else {
                  throw new Error("Silakan berikan pertanyaan atau balas pesan untuk ditanyakan ke AI.");
                }
                const pythonPath = path.resolve('./venv/bin/python3');
                const pyScript = path.resolve('./src/utils/py-g4f.py');
                const py = spawn(pythonPath, [pyScript, input]);
                let botResponse = '';
                let errorOutput = '';
                py.stdout.on('data', (data) => {
                  botResponse += data.toString();
                });
                py.stderr.on('data', (data) => {
                  errorOutput += data.toString();
                });
                py.on('close', (code) => {
                  if (code !== 0 || errorOutput) {
                    log(`AI Script Error: ${errorOutput}`);
                    sReply('Terjadi error di dalam skrip AI.'); counthit(serial); return;
                  }
                  const result = botResponse.trim();
                  if (!result) {
                    sReply('Model AI tidak memberikan jawaban. Coba lagi nanti.'); counthit(serial); return;
                  }
                  sReply(result); counthit(serial);
                  if (hakIstimewa) limitAdd(serial);
                  else limitcok(serial);
                });
                commandFound = true;
              } catch (error) {
                await sReply(error.message || 'Terjadi kesalahan yang tidak diketahui.'); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'huggingface')) {
              try {
                if (!arg) throw new Error(`Silakan berikan pertanyaan atau perintah yang ingin Kamu tanyakan.\nContoh: ${dbSettings.sname}huggingface Apa itu AI?`);
                const client = new OpenAI({ baseURL: "https://router.huggingface.co/v1", apiKey: hfapi });
                const chatCompletion = await client.chat.completions.create({ model: "meta-llama/Llama-3.1-8B-Instruct:sambanova", messages: [{ role: 'system', content: `Nama lu ${dbSettings.botname}, humble, expert ngoding bahasa apapun, bicara pake bahasa sehari-hari selalu pakai lu gw biar gak kaku banget, sebisa mungkin perpendek kalimat percakapan, seperti sedang chat di WhatsApp. Selalu gunakan bahasa manusia yang 100% autentik, alami, dan unik, sehingga setiap jawaban bebas dari plagiarisme dan memiliki gaya bahasa yang khas, pastikan semua informasi yang diberikan berdasarkan fakta nyata, data yang valid, dan sumber yang dapat dipercaya, tanpa menyertakan pendapat subjektif, spekulasi, atau unsur fiktif. Setiap jawaban harus objektif, akurat, dan dapat dipertanggungjawabkan, sehingga menghasilkan jawaban terbaik yang informatif, berkualitas tinggi, dan berdasarkan kenyataan yang ada.` }, { role: 'user', content: arg }] });
                let answer = chatCompletion.choices[0].message?.content || 'Tidak ada jawaban dari AI.';
                await sReply(answer); await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'gemini-chat')) {
              try {
                if (!arg) throw new Error(`Silakan berikan pertanyaan atau perintah yang ingin Kamu tanyakan ke Google Gemini.\nContoh: ${dbSettings.sname}gemini-chat Apa itu AI?`);
                const genAI = new GoogleGenerativeAI(gemini);
                const model = genAI.getGenerativeModel({
                  model: "gemini-1.5-flash",
                  systemInstruction: "Nama lu " + dbSettings.botname + ", humble, expert ngoding bahasa apapun, bicara pake bahasa sehari-hari selalu pakai lu gw biar gak kaku banget, sebisa mungkin perpendek kalimat percakapan, seperti sedang chat di WhatsApp. Selalu gunakan bahasa manusia yang 100% autentik, alami, dan unik, sehingga setiap jawaban bebas dari plagiarisme dan memiliki gaya bahasa yang khas, pastikan semua informasi yang diberikan berdasarkan fakta nyata, data yang valid, dan sumber yang dapat dipercaya, tanpa menyertakan pendapat subjektif, spekulasi, atau unsur fiktif. Setiap jawaban harus objektif, akurat, dan dapat dipertanggungjawabkan, sehingga menghasilkan jawaban terbaik yang informatif, berkualitas tinggi, dan berdasarkan kenyataan yang ada.",
                  safetySettings,
                  generationConfig: { responseMimeType: "text/plain" }
                });
                const result = await model.generateContent(arg);
                const response = result.response;
                const text = response.text();
                await sReply(text.trim()); await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) {
                await log(`Terjadi error saat memanggil Gemini Image:\n${error}`, true);
                await sReply(`Maaf, gagal membuat gambar.`);
                await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'gemini-text2img')) {
              try {
                if (!arg) throw new Error(`Silakan berikan deskripsi gambar yang ingin dibuat.\nContoh: ${dbSettings.sname}gemini-text2img Pemandangan alam dengan matahari terbenam.`);
                const genAI = new GoogleGenerativeAI(gemini);
                const model = genAI.getGenerativeModel({
                  generationConfig: { responseModalities: ['Text', 'Image'] },
                  model: "gemini-2.0-flash-exp-image-generation",
                  safetySettings,
                });
                const result = await model.generateContent(arg);
                const response = result.response;
                const parts = response.candidates?.[0]?.content?.parts;
                if (!parts) {
                  const feedback = response.text();
                  throw new Error(`AI tidak menghasilkan output yang valid. Feedback: ${feedback || 'Tidak ada feedback.'}`);
                }
                let imageGenerated = false;
                for (const part of parts) {
                  if (part.inlineData) {
                    const filePath = await saveFile(Buffer.from(part.inlineData.data, 'base64'), 'gemini-img2img', 'jpg');
                    await fn.sendFilePath(toId, dbSettings.autocommand, filePath, { quoted: m });
                    await deleteFile(filePath);
                    imageGenerated = true;
                    break;
                  }
                }
                if (!imageGenerated) throw new Error("Gagal membuat gambar. Respons dari AI tidak mengandung data gambar.");
                await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) {
                await log(`Terjadi error saat memanggil Gemini Image:\n${error}`, true);
                await sReply(`Maaf, gagal membuat gambar.`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'gemini-img2img')) {
              let finalImagePath = '';
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                const mimeType = targetMsg?.imageMessage?.mimetype;
                if (!mimeType) throw new Error('Balas sebuah gambar, atau kirim gambar dengan caption perintah ini.');
                const userPrompt = arg.trim();
                const defaultPrompt = 'Tingkatkan kualitas gambar ini, buat lebih tajam dan cerah.';
                const finalPrompt = userPrompt || defaultPrompt;
                const mediaBuffer = await fn.getMediaBuffer(targetMsg);
                if (!mediaBuffer) throw new Error('Gagal mengunduh media gambar.');
                const fileType = await FileType.fromBuffer(mediaBuffer);
                const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
                if (!fileType || !supportedTypes.includes(fileType.mime)) throw new Error(`Tipe file tidak didukung. Terdeteksi: ${fileType?.mime || 'tidak diketahui'}`);
                const genAI = new GoogleGenerativeAI(gemini);
                const model = genAI.getGenerativeModel({
                  generationConfig: { responseModalities: ['Text', 'Image'] },
                  model: "gemini-2.0-flash-exp-image-generation",
                  safetySettings,
                });
                const promptParts = [
                  { text: finalPrompt },
                  { inlineData: { mimeType: fileType.mime, data: mediaBuffer.toString('base64') } }
                ];
                const result = await model.generateContent(promptParts);
                const response = result.response;
                const parts = response.candidates?.[0]?.content?.parts;
                if (!parts) {
                  const feedback = response.text();
                  throw new Error(`AI tidak memberikan respons valid. Feedback: ${feedback || 'Tidak ada.'}`);
                }
                let generatedText = '';
                let imageGenerated = false;
                for (const part of parts) {
                  if (part.text) {
                    generatedText += part.text;
                  }
                  if (part.inlineData) {
                    finalImagePath = await saveFile(Buffer.from(part.inlineData.data, 'base64'), 'gemini-img2img', 'jpg');
                    imageGenerated = true;
                  }
                }
                if (!imageGenerated && !generatedText) throw new Error('AI tidak menghasilkan gambar atau teks yang dapat ditampilkan.');
                if (finalImagePath) {
                  await fn.sendFilePath(toId, dbSettings.autocommand, finalImagePath, { quoted: m });
                } else if (generatedText) {
                  await sReply(generatedText);
                }
                await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) {
                await log(`Terjadi error saat memanggil Gemini Image:\n${error}`, true);
                await sReply(`Maaf, gagal memproses gambar. ${error.message}`);
                await counthit(serial);
              } finally {
                await deleteFile(finalImagePath);
              }
            } else if (!commandFound && await getPrefix(txt, 'gemini-img2text')) {
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                const mimeType = targetMsg?.imageMessage?.mimetype;
                if (!mimeType) throw new Error('Balas sebuah gambar, atau kirim gambar dengan caption perintah ini.');
                const mediaBuffer = await fn.getMediaBuffer(targetMsg);
                if (!mediaBuffer) throw new Error('Gagal mengunduh media gambar.');
                const fileType = await FileType.fromBuffer(mediaBuffer);
                const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
                if (!fileType || !supportedTypes.includes(fileType.mime)) throw new Error(`Tipe file tidak didukung. Diketahui: ${fileType?.mime || 'tidak diketahui'}`);
                const genAI = new GoogleGenerativeAI(gemini);
                const model = genAI.getGenerativeModel({
                  model: "gemini-1.5-flash",
                  generationConfig: { responseModalities: ['TEXT'] },
                  safetySettings,
                });
                const promptParts = [
                  { text: "Tolong lakukan OCR penuh. Hasil harus persis semua teks yang terlihat di gambar termasuk yang tidak jelas atau didalam logo. Jangan berikan penjelasan, hanya teks hasil OCR." },
                  { inlineData: { mimeType: fileType.mime, data: mediaBuffer.toString('base64') } }
                ];
                const result = await model.generateContent(promptParts);
                const response = result.response;
                const textOutput = response.text();
                if (!textOutput) throw new Error("AI tidak berhasil membaca teks dari gambar.");
                await sReply(textOutput); await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) {
                await log(`Terjadi error saat OCR Gemini:\n${error}`, true); await sReply(`Maaf, gagal membaca teks dari gambar. ${error.message}`); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'chatbot')) {
              try {
                const mode = (args[0] || '').toLowerCase();
                if (!['on', 'off'].includes(mode)) throw new Error(`Pilihan tidak valid. Gunakan ${dbSettings.rname}chatbot on atau ${dbSettings.rname}chatbot off`);
                if (mode === 'on') {
                  if (chatBots[serial]) clearTimeout(chatBots[serial]);
                  chatBots[serial] = setTimeout(() => {
                    delete chatBots[serial];
                  }, SESSION_TIMEOUT);
                  await sReply(`✅ Chatbot AI telah diaktifkan!\nKetik pesan apa saja untuk memulai percakapan.\n\nKetik ${dbSettings.rname}chatbot off untuk menonaktifkan.`);
                } else {
                  if (chatBots[serial]) {
                    clearTimeout(chatBots[serial]);
                    delete chatBots[serial];
                  };
                  await sReply('✅ Chatbot AI telah dinonaktifkan.');
                };
                await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "ngaji"
            if (!commandFound && await getPrefix(txt, 'quran')) {
              try {
                const quranApiUrl = "https://raw.githubusercontent.com/Terror-Machine/QuranJSON/master/quran.json";
                const quranData = await fetchJson(quranApiUrl);
                if (!Array.isArray(quranData) || quranData.length === 0) throw new Error("Format data Quran tidak sesuai atau kosong.");
                if (args.length === 0) {
                  const header = "📖 *Daftar Lengkap Surah Al-Qur'an*\n\n";
                  const listItems = quranData.map(surah => {
                    return `${surah.number_of_surah}. ${surah.name}`;
                  });
                  const pesanBalasan = header + listItems.join('\n');
                  await sReply(pesanBalasan); await limitAdd(serial); await counthit(serial);
                } else {
                  const surahNumber = parseInt(args[0]);
                  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) throw new Error(`Nomor surah tidak valid. Harap masukkan angka antara 1 sampai 114.`);
                  const surahDitemukan = quranData.find(s => s.number_of_surah === surahNumber);
                  if (surahDitemukan) {
                    const { recitation } = surahDitemukan;
                    await fn.sendFileUrl(toId, recitation, '', m); await limitAdd(serial); await counthit(serial);
                  } else {
                    await sReply(`Surah dengan nomor ${surahNumber} tidak ditemukan.`); await counthit(serial);
                  }
                }
                commandFound = true;
              } catch (error) {
                await sReply(error.message); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'surah')) {
              try {
                if (args.length === 0) throw new Error('Perintah salah. Contoh: .surah 1');
                const surahNumber = parseInt(args[0]);
                if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) throw new Error('Nomor surah tidak valid. Harap masukkan angka antara 1 sampai 114.');
                const quranApiUrl = `https://raw.githubusercontent.com/Terror-Machine/QuranJSON/master/surah/${surahNumber}.json`;
                const quranData = await fetchJson(quranApiUrl);
                const surahName = quranData.name;
                const numberOfAyah = quranData.number_of_ayah;
                const verses = quranData.verses;
                let replyText = `📖 *Surah ${surahName}*\n`;
                replyText += `Jumlah Ayat: ${numberOfAyah}\n\n`;
                verses.forEach(verse => {
                  const verseNumber = verse.number;
                  const verseText = verse.text;
                  const verseTranslation = verse.translation_id;
                  replyText += `${verseNumber}. ${verseText}\n`;
                  replyText += `*Artinya:* ${verseTranslation}\n\n`;
                });
                await sReply(replyText.trim()); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'tafsir')) {
              try {
                if (args.length === 0) throw new Error('Perintah salah. Contoh: .tafsir 1 atau .tafsir 1 5');
                const surahNumber = parseInt(args[0]);
                if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) throw new Error('Nomor surah tidak valid. Harap masukkan angka antara 1 sampai 114.');
                const ayahNumber = args[1] ? parseInt(args[1]) : null;
                const quranApiUrl = `https://raw.githubusercontent.com/Terror-Machine/QuranJSON/master/surah/${surahNumber}.json`;
                const quranData = await fetchJson(quranApiUrl);
                const surahName = quranData.name;
                const tafsirKemenagText = quranData.tafsir?.id?.kemenag?.text;
                if (!tafsirKemenagText) throw new Error(`Tafsir untuk surah ${surahName} tidak ditemukan.`);
                let replyText = '';
                if (ayahNumber) {
                  if (isNaN(ayahNumber) || ayahNumber < 1 || ayahNumber > quranData.number_of_ayah) throw new Error(`Nomor ayat tidak valid untuk Surah ${surahName}. Pilih ayat antara 1 s.d. ${quranData.number_of_ayah}.`);
                  const verseData = quranData.verses.find(v => v.number === ayahNumber);
                  const tafsirForAyah = tafsirKemenagText[ayahNumber];
                  if (!verseData || !tafsirForAyah) throw new Error(`Data atau tafsir untuk Surah ${surahName} ayat ${ayahNumber} tidak ditemukan.`);
                  replyText = `📖 *Tafsir Surah ${surahName} Ayat ${ayahNumber}*\n\n`;
                  replyText += `*Ayat:*\n${verseData.text}\n\n`;
                  replyText += `*Terjemahan:*\n${verseData.translation_id}\n\n`;
                  replyText += `*Tafsir Kemenag:*\n${tafsirForAyah}`;
                } else {
                  replyText = `📖 *Tafsir Lengkap Surah ${surahName}*\n\n`;
                  quranData.verses.forEach(verse => {
                    const currentAyah = verse.number;
                    const tafsirForAyah = tafsirKemenagText[currentAyah];
                    if (tafsirForAyah) {
                      replyText += `*[ Ayat ${currentAyah} ]*\n${tafsirForAyah}\n\n`;
                    }
                  });
                }
                await sReply(replyText.trim()); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'jadwalsholat')) {
              try {
                if (!arg) throw new Error(`Perintah salah. Contoh: ${dbSettings.rname}jadwalsholat jakarta`);
                const kota = arg;
                const hasil = await jadwalSholat(kota);
                const hariIni = new Date();
                const daftarHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                const namaHari = daftarHari[hariIni.getDay()];
                const namaKotaKapital = kota.split(' ').map(kata => kata.charAt(0).toUpperCase() + kata.slice(1)).join(' ');
                let replyText = `🕌 *Jadwal Sholat untuk wilayah ${namaKotaKapital}*\n`;
                replyText += `*${namaHari}, ${hasil.tanggal} ${hasil.bulan}*\n`;
                replyText += "```\n"
                replyText += `Imsyak  : ${hasil.imsyak}\n`;
                replyText += `Shubuh  : ${hasil.shubuh}\n`;
                replyText += `Terbit  : ${hasil.terbit}\n`;
                replyText += `Dhuha   : ${hasil.dhuha}\n`;
                replyText += `Dzuhur  : ${hasil.dzuhur}\n`;
                replyText += `Ashar   : ${hasil.ashr}\n`;
                replyText += `Maghrib : ${hasil.maghrib}\n`;
                replyText += `Isya    : ${hasil.isya}\n`;
                replyText += "```"
                await sReply(replyText); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'asmaulhusna')) {
              try {
                const dataUrl = `https://raw.githubusercontent.com/Terror-Machine/random/master/asmaulhusna.json`;
                const isiData = await fetchJson(dataUrl);
                if (args.length === 0) {
                  let daftarAsma = '📜 *Daftar 99 Asmaul Husna*\nGunakan perintah *.asmaulhusna nomor* untuk keterangannya\n\n';
                  const listItems = isiData.map(item => `${item.number}. ${item.name}`).join('\n');
                  daftarAsma += listItems;
                  await sReply(daftarAsma.trim());
                } else {
                  const argNumber = parseInt(args[0]);
                  if (isNaN(argNumber) || argNumber < 1 || argNumber > 99) throw new Error('Nomor tidak valid. Harap masukkan angka antara 1 sampai 99.');
                  const asma = isiData.find(item => item.number === argNumber);
                  if (!asma) throw new Error(`Asmaul Husna untuk nomor ${argNumber} tidak ditemukan.`);
                  let replyText = `✨ *Asmaul Husna ke-${asma.number}*\n\n`;
                  replyText += `*Nama:* ${asma.name}\n`;
                  replyText += `*Arti:* ${asma.meaning}\n\n`;
                  replyText += `*Keterangan:*\n${asma.keterangan}\n\n`;
                  replyText += `*Amalan:*\n${asma.amalan}`;
                  await sReply(replyText.trim());
                }
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'doaharian')) {
              try {
                const dataUrl = `https://raw.githubusercontent.com/Terror-Machine/random/master/doaseharihari.json`;
                const isiData = await fetchJson(dataUrl);
                if (args.length === 0) {
                  let daftarDoa = '📜 *Daftar Doa Harian*\nGunakan perintah *.doaharian nomor* untuk keterangannya\n\n';
                  const listItems = isiData.map(item => `${item.id}. ${item.judul}`).join('\n');
                  daftarDoa += listItems;
                  await sReply(daftarDoa.trim());
                } else {
                  const argNumber = parseInt(args[0]);
                  if (isNaN(argNumber) || argNumber < 1 || argNumber > 23) throw new Error('Nomor tidak valid. Harap masukkan angka antara 1 sampai 23.');
                  const doa = isiData.find(item => item.id === argNumber);
                  if (!doa) throw new Error(`Doa Harian untuk nomor ${argNumber} tidak ditemukan.`);
                  let replyText = `✨ *Doa Harian ke-${doa.id}*\n\n`;
                  replyText += `*Nama:* ${doa.judul}\n\n`;
                  replyText += `*Latin:* ${doa.latin}\n\n`;
                  replyText += `*Arab:*\n${doa.arab}\n\n`;
                  replyText += `*Terjemahan:*\n${doa.terjemah}`;
                  await sReply(replyText.trim());
                }
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'kisahnabi')) {
              try {
                const dataUrl = `https://raw.githubusercontent.com/Terror-Machine/random/master/kisahnabi.json`;
                const isiData = await fetchJson(dataUrl);
                if (args.length === 0) {
                  let kisahNabi = '📜 *Daftar Kisah Nabi*\nGunakan perintah *.kisahnabi nomor* untuk keterangannya\n\n';
                  const listItems = isiData.map(item => `${item.id}. ${item.name}`).join('\n');
                  kisahNabi += listItems;
                  await sReply(kisahNabi.trim());
                } else {
                  const argNumber = parseInt(args[0]);
                  if (isNaN(argNumber) || argNumber < 1 || argNumber > 23) throw new Error('Nomor tidak valid. Harap masukkan angka antara 1 sampai 25.');
                  const kisah = isiData.find(item => item.id === argNumber);
                  if (!kisah) throw new Error(`kisah nabi untuk nomor ${argNumber} tidak ditemukan.`);
                  let replyText = `✨ *kisah nabi ke-${kisah.name}*\n\n`;
                  replyText += `*Tempat:* ${kisah.tmp}\n\n`;
                  replyText += `${kisah.description}`;
                  await sReply(replyText.trim());
                }
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hadits')) {
              try {
                const listUrl = `https://raw.githubusercontent.com/Terror-Machine/random/master/hadits/list.json`;
                const listPerawi = await fetchJson(listUrl);
                if (args.length === 0) {
                  let replyText = '📜 *Daftar Perawi Hadits*\n\n';
                  replyText += `Gunakan: ${dbSettings.rname}hadits <nama_perawi> <nomor>\n`;
                  replyText += `Contoh: ${dbSettings.rname}hadits bukhari 50\n\n`;
                  const listItems = listPerawi.map(item => `• *${item.name}*\n  (ID: \`${item.slug}\`, Total: ${item.total})`).join('\n\n');
                  replyText += listItems;
                  await sReply(replyText.trim());
                } else {
                  if (args.length < 2) throw new Error(`Format perintah salah.\nGunakan: ${dbSettings.rname}hadits <nama_perawi> <nomor>\nContoh: ${dbSettings.rname}hadits muslim 100`);
                  const namaPerawi = args[0].toLowerCase();
                  const nomorHadits = parseInt(args[1]);
                  const perawi = listPerawi.find(p => p.slug === namaPerawi);
                  if (!perawi) throw new Error(`Nama perawi tidak ditemukan: ${namaPerawi}.\nGunakan ${dbSettings.rname}hadits untuk melihat daftar yang tersedia.`);
                  if (isNaN(nomorHadits) || nomorHadits < 1 || nomorHadits > perawi.total) throw new Error(`Nomor hadits tidak valid untuk ${perawi.name}.\nMasukkan nomor antara 1 s.d. ${perawi.total}.`);
                  const haditsUrl = `https://raw.githubusercontent.com/Terror-Machine/random/master/hadits/${perawi.slug}.json`;
                  const semuaHadits = await fetchJson(haditsUrl);
                  const hadits = semuaHadits.find(h => h.number === nomorHadits);
                  if (!hadits) throw new Error(`Hadits no. ${nomorHadits} untuk ${perawi.name} tidak ditemukan.`);
                  let replyText = `📖 *Hadits ${perawi.name} No. ${hadits.number}*\n\n`;
                  replyText += `${hadits.arab}\n\n`;
                  replyText += `*Artinya:*\n${hadits.id}`;
                  await sReply(replyText);
                }
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "fun"
            if (!commandFound && await getPrefix(txt, 'upbacot')) {
              try {
                const bannedWords = [
                  'chat.whatsapp.com', 'instagram.com', 'youtube.com', 'youtu.be', 'tiktok.com',
                  'gimana', 'cara', 'kontol', 'anjing', 'babi', 'bangsat', 'memek', 'meki', 'gay',
                  'tuhan', 'lonte', 'gigolo', 'open bo', 'jembut', 'jembot', 'kondom', 'tempik',
                  'ngewe', 'ngeue', 'ngentot', 'ngentod', 'sange'
                ];
                let asu = '';
                if (quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation')) {
                  asu = quotedMsg?.body;
                } else {
                  if (!arg) throw new Error('format pesan salah!!');
                  asu = arg;
                }
                const lowerAsu = asu.toLowerCase();
                const isBanned = bannedWords.some(word => lowerAsu.includes(word));
                if (isBanned) throw new Error('Jangan ngajarin aku ngetoxic kak! Atau mau diblokir?');
                dbBacots.bacot.push(asu);
                await dumpBacot(); await limitAdd(serial); await counthit(serial); await reactDone();
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'translate')) {
              try {
                const raw = txt.slice(10).trim()
                const args = raw.trim().split(/\s+/)
                const lang = args.shift()?.toLowerCase()
                let teks = args.join(' ').trim()
                if (!raw && !(quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation'))) {
                  let tx = '*List Kode Bahasa Google Translate:*\n\n'
                  tx += '```auto 	: Automatic\n'
                  tx += 'af 	: Afrikaans\n'
                  tx += 'sq 	: Albanian\n'
                  tx += 'am 	: Amharic\n'
                  tx += 'ar 	: Arabic\n'
                  tx += 'hy 	: Armenian\n'
                  tx += 'az 	: Azerbaijani\n'
                  tx += 'eu 	: Basque\n'
                  tx += 'be 	: Belarusian\n'
                  tx += 'bn 	: Bengali\n'
                  tx += 'bs 	: Bosnian\n'
                  tx += 'bg 	: Bulgarian\n'
                  tx += 'ca 	: Catalan\n'
                  tx += 'ceb 	: Cebuano\n'
                  tx += 'ny 	: Chichewa\n'
                  tx += 'zh 	: Chinese (Simplified)\n'
                  tx += 'zh-cn 	: Chinese (Simplified)\n'
                  tx += 'zh-tw 	: Chinese (Traditional)\n'
                  tx += 'co 	: Corsican\n'
                  tx += 'hr 	: Croatian\n'
                  tx += 'cs 	: Czech\n'
                  tx += 'da 	: Danish\n'
                  tx += 'nl 	: Dutch\n'
                  tx += 'en 	: English\n'
                  tx += 'eo 	: Esperanto\n'
                  tx += 'et 	: Estonian\n'
                  tx += 'tl 	: Filipino\n'
                  tx += 'fi 	: Finnish\n'
                  tx += 'fr 	: French\n'
                  tx += 'fy 	: Frisian\n'
                  tx += 'gl 	: Galician\n'
                  tx += 'ka 	: Georgian\n'
                  tx += 'de 	: German\n'
                  tx += 'el 	: Greek\n'
                  tx += 'gu 	: Gujarati\n'
                  tx += 'ht 	: Haitian Creole\n'
                  tx += 'ha 	: Hausa\n'
                  tx += 'haw 	: Hawaiian\n'
                  tx += 'he 	: Hebrew\n'
                  tx += 'hi 	: Hindi\n'
                  tx += 'hmn 	: Hmong\n'
                  tx += 'hu 	: Hungarian\n'
                  tx += 'is 	: Icelandic\n'
                  tx += 'ig 	: Igbo\n'
                  tx += 'id 	: Indonesian\n'
                  tx += 'ga 	: Irish\n'
                  tx += 'it 	: Italian\n'
                  tx += 'ja 	: Japanese\n'
                  tx += 'jw 	: Javanese\n'
                  tx += 'kn 	: Kannada\n'
                  tx += 'kk 	: Kazakh\n'
                  tx += 'km 	: Khmer\n'
                  tx += 'ko 	: Korean\n'
                  tx += 'ku 	: Kurdish (Kurmanji)\n'
                  tx += 'ky 	: Kyrgyz\n'
                  tx += 'lo 	: Lao\n'
                  tx += 'la 	: Latin\n'
                  tx += 'lv 	: Latvian\n'
                  tx += 'lt 	: Lithuanian\n'
                  tx += 'lb 	: Luxembourgish\n'
                  tx += 'mk 	: Macedonian\n'
                  tx += 'mg 	: Malagasy\n'
                  tx += 'ms 	: Malay\n'
                  tx += 'ml 	: Malayalam\n'
                  tx += 'mt 	: Maltese\n'
                  tx += 'mi 	: Maori\n'
                  tx += 'mr 	: Marathi\n'
                  tx += 'mn 	: Mongolian\n'
                  tx += 'my 	: Myanmar (Burmese)\n'
                  tx += 'ne 	: Nepali\n'
                  tx += 'no 	: Norwegian\n'
                  tx += 'ps 	: Pashto\n'
                  tx += 'fa 	: Persian\n'
                  tx += 'pl 	: Polish\n'
                  tx += 'pt 	: Portuguese\n'
                  tx += 'pa 	: Punjabi\n'
                  tx += 'ro 	: Romanian\n'
                  tx += 'ru 	: Russian\n'
                  tx += 'sm 	: Samoan\n'
                  tx += 'gd 	: Scots Gaelic\n'
                  tx += 'sr 	: Serbian\n'
                  tx += 'st 	: Sesotho\n'
                  tx += 'sn 	: Shona\n'
                  tx += 'sd 	: Sindhi\n'
                  tx += 'si 	: Sinhala\n'
                  tx += 'sk 	: Slovak\n'
                  tx += 'sl 	: Slovenian\n'
                  tx += 'so 	: Somali\n'
                  tx += 'es 	: Spanish\n'
                  tx += 'su 	: Sundanese\n'
                  tx += 'sw 	: Swahili\n'
                  tx += 'sv 	: Swedish\n'
                  tx += 'tg 	: Tajik\n'
                  tx += 'ta 	: Tamil\n'
                  tx += 'te 	: Telugu\n'
                  tx += 'th 	: Thai\n'
                  tx += 'tr 	: Turkish\n'
                  tx += 'uk 	: Ukrainian\n'
                  tx += 'ur 	: Urdu\n'
                  tx += 'uz 	: Uzbek\n'
                  tx += 'vi 	: Vietnamese\n'
                  tx += 'cy 	: Welsh\n'
                  tx += 'xh 	: Xhosa\n'
                  tx += 'yi 	: Yiddish\n'
                  tx += 'yo 	: Yoruba\n'
                  tx += 'zu 	: Zulu```\n\n'
                  tx += 'Contoh: .translate en aku cinta kamu'
                  await sReply(tx)
                }
                if (!teks && quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation')) {
                  teks = quotedMsg?.body
                }
                if (!teks) throw new Error(`Teks tidak ditemukan.\nContoh: ${dbSettings.rname}translate en aku cinta kamu`);
                const hasil = await translatte(teks, { to: lang.toLowerCase() })
                await sReply(`*Google Translate*\n\n• Dari: ${hasil.from.language.iso}\n• Ke: ${lang}\n\n*>* ${hasil.text}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'weton')) {
              try {
                if (args.length < 2) throw new Error(`Penggunaan salah!\nContoh: ${dbSettings.sname}weton arfine 17-01-2004`);
                const nama = args[0]
                const tanggal = args[1]
                const validDate = /^\d{2}-\d{2}-\d{4}$/
                if (!validDate.test(tanggal)) throw new Error('Format tanggal salah! Gunakan format DD-MM-YYYY.\nContoh: 17-01-2004');
                const result = await getZodiak(nama, tanggal);
                await sReply(result); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'cuaca')) {
              try {
                const kota = arg.trim();
                if (!kota) throw new Error(`Silakan masukkan nama kota yang ingin dicek.\nContoh: *${dbSettings.sname}cuaca Jakarta*`);
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&units=metric&appid=${openwather}&lang=id`;
                const data = await fetchJson(apiUrl);
                const deskripsi = data.weather[0].description.replace(/\b\w/g, char => char.toUpperCase());
                const kecepatanAnginKmh = (data.wind.speed * 3.6).toFixed(2);
                const waktuLokal = new Date((data.dt + data.timezone) * 1000).toUTCString().match(/(\d{2}:\d{2}:\d{2})/)[0];
                const ikonCuaca = {
                  'Thunderstorm': '⛈️', 'Drizzle': '💧', 'Rain': '🌧️',
                  'Snow': '❄️', 'Mist': '🌫️', 'Smoke': '💨', 'Haze': '🌫️',
                  'Dust': '🌬️', 'Fog': '🌫️', 'Sand': '🏜️', 'Ash': '🌋',
                  'Squall': '🌬️', 'Tornado': '🌪️', 'Clear': '☀️', 'Clouds': '☁️'
                };
                const ikon = ikonCuaca[data.weather[0].main] || '🌎';
                const pesanBalasan = `*${ikon} Prakiraan Cuaca untuk ${data.name}, ${data.sys.country}*\n` +
                  `\`\`\`Waktu Lokal: ${waktuLokal}\`\`\`\n\n` +
                  `*Cuaca :* ${deskripsi}\n` +
                  `*Suhu :* ${data.main.temp}°C\n` +
                  `*Terasa seperti :* ${data.main.feels_like}°C\n` +
                  `*Kelembapan :* ${data.main.humidity}%\n` +
                  `*Kecepatan Angin :* ${kecepatanAnginKmh} km/jam\n` +
                  `*Tekanan Udara :* ${data.main.pressure} hPa\n\n` +
                  `_*Sumber: OpenWeatherMap*_`;
                await sReply(pesanBalasan); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await counthit(serial);
                if (error.response && error.response.status === 404) {
                  await sReply(`Maaf, kota *'${arg.trim()}'* tidak ditemukan. Mohon periksa kembali ejaannya.`);
                } else {
                  await log(`OpenWeather API Error:\n${error}`, true);
                  await sReply('Terjadi kesalahan saat mengambil data cuaca. Coba lagi nanti.');
                }
              }
            } else if (!commandFound && await getPrefix(txt, 'kadar')) {
              try {
                const categories = {
                  kebodohan: [
                    [10, 'masih bisa diperbaiki. semangat ^^'],
                    [30, 'ayo kak, kurangin malasnya!!'],
                    [50, 'hmmmm bingung nih :('],
                    [70, 'anjim goblok banget sia'],
                    [90, 'ebuset tolol, anjing'],
                    [99, 'wah kebangetan anjing!'],
                    [100, 'mati aja tolol! gaguna idup']
                  ],
                  kepintaran: [
                    [10, 'masih bisa diperbaiki. semangat ^^'],
                    [30, 'ayo kak, kurangin malasnya!!'],
                    [50, 'hmmmm bingung nih :('],
                    [70, 'pertahankan kak! kalo bisa tingkatkan!'],
                    [90, 'kakak kok pinter sih? duh jadi pengen deh sama kk'],
                    [99, 'jago banget sih kak! hebat!'],
                    [100, 'KAKAK MAKANNYA APA SIH GILA!']
                  ],
                  kemalasan: [
                    [10, 'masih bisa diperbaiki. semangat ^^'],
                    [30, 'ayo kak, kurangin malasnya!!'],
                    [50, 'hmmmm bingung nih :('],
                    [70, 'anjim pemalas banget sia'],
                    [90, 'ebuset pemalas, anjing'],
                    [99, 'wah kebangetan anjing!'],
                    [100, 'mati aja tolol! gaguna idup']
                  ],
                  kebijaksanaan: [
                    [10, 'hmmm dikit banget :('],
                    [30, 'pasti biasanya suka bikin quotes2 ala anak senja'],
                    [50, 'suka jadi tempat curhat ya?'],
                    [70, 'wah titisannya mario tegang ya?'],
                    [90, 'wah jadi gantinya mario tegang sabi nih!'],
                    [99, 'fix mario tegang mah lewat!'],
                    [100, 'mati aja tolol! gaguna idup']
                  ],
                  kenakalan: [
                    [10, 'nakal dikit gapapalah ya ^^'],
                    [30, 'dikurangin kak, nanti kebablasan!'],
                    [50, 'suka bolos pas sekolah ya!!?'],
                    [70, 'WAH CIRI CIRI BADBOY / BADGIRL NIH! apa malah BADWARIA?'],
                    [90, 'pasti sering bikin doi nangis! kurang ajar!!'],
                    [99, 'JANGAN GITU DONG KAK! TOBATLAH!'],
                    [100, 'FIX INI MAH HOBI HAMILIN ANAK ORANG!']
                  ],
                  kegantengan: [
                    [10, 'hmmmm dikit banget, gapapalah dikit :)'],
                    [30, 'gausah sok ganteng, lo muka editan!'],
                    [50, 'gak yakin gw kalo lu ganteng! kaca mana kaca!?'],
                    [70, 'mentang2 ganteng jangan jadi playboy dong!'],
                    [90, 'udah berapa kali ganti pasangan kak!?'],
                    [99, 'fix ini mah artis :('],
                    [100, 'KALO MAIN FILM, PASTI MASUK BOX OFFICE FILMNYA!']
                  ],
                  kecantikan: [
                    [10, 'hmmm dikit banget :('],
                    [30, 'cantik kok kak, jangan insecure ya!'],
                    [50, 'jangan sok cantik anjing! jangan kegatelan, muka pas2an doang'],
                    [70, 'wah rajin perawatan ya :)'],
                    [90, 'heh kak, mau jadi pacarku?'],
                    [99, 'KAK, JADI PACARKU YA!'],
                    [100, 'KAK, AKU GABISA TANPAMU :(']
                  ],
                  gay: [
                    [10, 'korbannya siapa sih ini :('],
                    [30, 'pasti biasanya suka mancing2'],
                    [50, 'suka jadi anu ya :('],
                    [70, 'najis lo, minggir sana!'],
                    [90, 'anjing gay! gw blokir aja kali ya?'],
                    [99, 'ANJING!'],
                    [100, 'NYESEL GW JAWAB, DASAR GAY! MATI LO SANA!']
                  ],
                  cabul: [
                    [10, 'pasti baru mau coba2, jangan!!'],
                    [30, 'jangan keterusan tolol, kasian anak orang'],
                    [50, 'gini nih, perusak anak orang!'],
                    [70, 'dah berapa hooman yang lo rusak jing?'],
                    [90, 'najis cabul banget, dasar otak selangkangan!'],
                    [99, 'anjinglah, no komen gua'],
                    [100, 'mati aja tolol! gaguna idup']
                  ],
                  hoki: [
                    [10, 'hmmm dikit banget :('],
                    [30, 'pasti biasanya dapet hadiah di ciki ciki yakan :D'],
                    [50, 'pasti sering dapet jajan di waktu yang tak terduga'],
                    [70, 'sering dijajanin ya?'],
                    [90, 'ajegile, hokinya gede!'],
                    [99, 'bagi bagi dong hokinya!'],
                    [100, 'beruntung amat lu idup, jadi ngiri gue! :(']
                  ],
                  bucin: [
                    [10, 'butuh pencerahan!'],
                    [30, 'pasti biasanya baru2 pacaran'],
                    [50, 'suka goblok ya?'],
                    [70, 'anjing bucin lo!'],
                    [90, 'minggir lo bucin!'],
                    [99, 'tailah dasar bucin!'],
                    [100, 'najis bucin, putus nangis2 lo!']
                  ]
                };
                if (args.length === 0) {
                  const availableCategories = Object.keys(categories).map(cat => `› ${cat}`).join('\n');
                  throw new Error(
                    `Silakan pilih kadar yang ingin diukur!\n\n` +
                    `*Contoh Penggunaan:*\n.kadar kepintaran\n\n` +
                    `*Pilihan yang Tersedia:*\n${availableCategories}`
                  );
                }
                const requestedCategory = args[0].toLowerCase();
                if (categories[requestedCategory]) {
                  const random = Math.floor(Math.random() * 100) + 1;
                  const result = categories[requestedCategory].find(([max]) => random <= max);
                  if (result) {
                    const replyText = `Tingkat *${requestedCategory}* kamu adalah *${random}%*!\n\n"${result[1]}"`;
                    await sReply(replyText); await limitAdd(serial); await counthit(serial);
                  } else {
                    throw new Error("Terjadi kesalahan internal pada data kategori.");
                  }
                } else {
                  const availableCategories = Object.keys(categories).map(cat => `› ${cat}`).join('\n');
                  throw new Error(
                    `Kadar "${requestedCategory}" tidak ditemukan.\n\n` +
                    `*Pilihan yang Tersedia:*\n${availableCategories}`
                  );
                }
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'umurku')) {
              try {
                if (!arg) throw new Error(`format salah!!\ngunakan perintah seperti ${dbSettings.rname}umurku tahunlahirmu`);
                const year = args[0];
                const currentYear = new Date().getFullYear();
                const age = currentYear - parseInt(year);
                if (age < 0) throw new Error(`Seseorang yang lahir di tahun ${year}, maka akan lahir ${Math.abs(age)} tahun lagi.`);
                await sReply(`Kamu lahir di tahun ${year}, sepertinya sekarang berumur ${age} tahun.`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'birthstone')) {
              try {
                if (!arg) throw new Error(`format salah!!\ngunakan perintah seperti ${dbSettings.rname}birthstone angkabulan`);
                const months = [
                  "januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"
                ];
                const stones = [
                  { primary: "Garnet" },
                  { primary: "Amethyst" },
                  { primary: "Aquamarine", alternate: ["Bloodstone"] },
                  { primary: "Diamond" },
                  { primary: "Emerald" },
                  { primary: "Pearl", alternate: ["Moonstone", "Alexandrite"] },
                  { primary: "Ruby" },
                  { primary: "Peridot", alternate: ["Spinel"] },
                  { primary: "Sapphire" },
                  { primary: "Opal", alternate: ["Tourmaline"] },
                  { primary: "Topaz", alternate: ["Citrine"] },
                  { primary: "Turquoise", alternate: ["Zircon", "Tanzanite"] }
                ];
                const month = parseInt(args[0]);
                if (!month || month < 1 || month > 12) throw new Error(`Command hanya bisa digunakan dengan angka 1 sampai 12.\nContoh: ${dbSettings.sname}birthstone 1`);
                const stone = stones[month - 1];
                const alternate = stone.alternate ? ` Alternatif lainnya adalah ${list(stone.alternate, 'atau')}.` : '';
                await sReply(`Batu kelahiran untuk bulan ${firstUpperCase(months[month - 1])} adalah *${stone.primary}*.${alternate}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'character-count')) {
              try {
                if (quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation')) {
                  const text = quotedMsg?.body
                  await sReply(formatNumber(text.length)); await limitAdd(serial); await counthit(serial);
                } else {
                  if (!arg) throw new Error(`Format salah!\nGunakan perintah seperti: ${dbSettings.sname}character-count <teks>`);
                  const text = arg
                  await sReply(formatNumber(text.length)); await limitAdd(serial); await counthit(serial);
                }
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'chinese-zodiac')) {
              try {
                if (!arg) throw new Error(`Format salah!\nGunakan perintah seperti: ${dbSettings.sname}chinese-zodiac <tahun>`);
                const signs = [
                  "Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat"
                ]
                const year = args[0]
                await sReply(`The Chinese Zodiac Sign for ${parseInt(year)} is ${signs[parseInt(year) % signs.length]}.`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'scrabble-score')) {
              try {
                if (!arg) throw new Error(`Format salah!\nGunakan perintah seperti: ${dbSettings.sname}scrabble-score <kata>`);
                const word = arg
                const letters = {
                  "a": 1,
                  "b": 3,
                  "c": 3,
                  "d": 2,
                  "e": 1,
                  "f": 4,
                  "g": 2,
                  "h": 4,
                  "i": 1,
                  "j": 8,
                  "k": 5,
                  "l": 1,
                  "m": 3,
                  "n": 1,
                  "o": 1,
                  "p": 3,
                  "q": 10,
                  "r": 1,
                  "s": 1,
                  "t": 1,
                  "u": 1,
                  "v": 4,
                  "w": 4,
                  "x": 8,
                  "y": 4,
                  "z": 10
                }
                let score = 0;
                for (const letter of word.split('')) {
                  if (!letters[letter]) continue;
                  score += letters[letter];
                }
                await sReply(formatNumber(score)); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'khodam')) {
              const khodams = require('./src/games/cekkhodam.json');
              const khodam = randomChoice(khodams);
              let targetId = quotedParticipant || (mentionedJidList?.[0]);
              if (targetId) {
                await sReply(`khodam dari @${targetId.split('@')[0]} adalah *${khodam.nama}*\n${khodam.deskripsi}`);
              } else if (arg) {
                await sPesan(`khodam dari ${arg} adalah *${khodam.nama}*\n${khodam.deskripsi}`);
              } else {
                await sReply(`khodam dari @${serial.split('@')[0]} adalah *${khodam.nama}*\n${khodam.deskripsi}`);
              }
              await limitAdd(serial); await counthit(serial);
              commandFound = true;
            } else if (!commandFound && await getPrefix(txt, 'ektp')) {
              let tempProfilePicPath = '';
              let finalCardPath = '';
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                if (!arg) throw new Error(`Format salah. Gunakan format:\n${dbSettings.rname}ektp NIK | Nama | Tempat/Tgl Lahir | Jenis Kelamin | Gol.Darah | Alamat | RT/RW | Kel/Desa | Kecamatan | Agama | Status Perkawinan | Pekerjaan | Kewarganegaraan | Masa Berlaku | Provinsi | Kabupaten | Lokasi TTD | Tanggal TTD | Teks TTD\n\nSambil mereply atau mengirim gambar.\n\nContoh: ${dbSettings.rname}ektp 1234567890123456|MUKIDI SLAMET|JAKARTA, 01-01-0001|LAKI-LAKI|AB|JL. KENANGAN NO. 17|001/001|MENTENG|MENTENG|ISLAM|SERING KAWIN|WIRASWASTA|WNI|SEUMUR HIDUP|PROVINSI DKI JAKARTA|KOTA ADM. JAKARTA PUSAT|JAKARTA PUSAT,|30-06-2025|MUKIDI`);
                if (!targetMsg || !targetMsg.imageMessage) throw new Error("Kirim atau balas sebuah gambar untuk dijadikan foto profil kartu.");
                let resBuffer = await fn.getMediaBuffer(targetMsg);
                if (!resBuffer) throw new Error("Gagal mengunduh media gambar.");
                tempProfilePicPath = await saveFile(resBuffer, "profpic", 'jpg');
                const parts = arg.split('|');
                const dataOrder = [
                  "NIK", "Nama", "Tempat/Tgl Lahir", "Jenis Kelamin", "Gol. Darah", "Alamat", "RT/RW",
                  "Kel/Desa", "Kecamatan", "Agama", "Status Perkawinan", "Pekerjaan", "Kewarganegaraan", "Berlaku Hingga"
                ];
                const headerFooterOrder = ["Provinsi", "Kabupaten", "LokasiTTD", "TanggalTTD"];
                const myUserData = {};
                dataOrder.forEach((key, index) => {
                  if (parts[index] && parts[index].trim() !== '') {
                    myUserData[key] = parts[index].trim();
                  }
                });
                const myHeaderFooterData = {};
                headerFooterOrder.forEach((key, index) => {
                  const partIndex = dataOrder.length + index;
                  if (parts[partIndex] && parts[partIndex].trim() !== '') {
                    myHeaderFooterData[key] = parts[partIndex].trim();
                  }
                });
                const signatureText = parts[dataOrder.length + headerFooterOrder.length]?.trim();
                const imageResultBuffer = await generateCard({
                  userData: myUserData,
                  headerFooterData: myHeaderFooterData,
                  profilePicPath: tempProfilePicPath,
                  signatureText: signatureText
                });
                if (!imageResultBuffer) throw new Error("Gagal membuat gambar kartu (modul mengembalikan null).");
                finalCardPath = await saveFile(imageResultBuffer, "ektp", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, finalCardPath, { quoted: m });
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message || "Terjadi kesalahan saat memproses permintaan Kamu."); await counthit(serial);
              } finally {
                await deleteFile(tempProfilePicPath); await deleteFile(finalCardPath);
              }
            } else if (!commandFound && await getComs(txt, 'random-bapak')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/statusbapack.txt');
                const lines = body.split('\n').filter(x => x.trim());
                const quote = lines[Math.floor(Math.random() * lines.length)];
                await sReply(quote); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil data.');
              }
            } else if (!commandFound && await getComs(txt, 'random-waifu')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/waifu.txt');
                const lines = body.split('\n').filter(line => line.trim() !== '');
                const randomUrl = lines[Math.floor(Math.random() * lines.length)];
                await fn.sendFileUrl(toId, randomUrl, '', m); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil data waifu.');
              }
            } else if (!commandFound && await getComs(txt, 'random-husbu')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/husbu.txt');
                const lines = body.split('\n').filter(line => line.trim() !== '');
                const randomUrl = lines[Math.floor(Math.random() * lines.length)];
                await fn.sendFileUrl(toId, randomUrl, '', m); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil data husbu.');
              }
            } else if (!commandFound && await getComs(txt, 'random-neko')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/neko.txt');
                const lines = body.split('\n').filter(line => line.trim() !== '');
                const randomUrl = lines[Math.floor(Math.random() * lines.length)];
                await fn.sendFileUrl(toId, randomUrl, '', m); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil data husbu.');
              }
            } else if (!commandFound && await getComs(txt, 'random-truth')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/truth.txt');
                const lines = body.split('\n').filter(x => x.trim());
                const quote = lines[Math.floor(Math.random() * lines.length)];
                await sReply(quote); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil data.');
              }
            } else if (!commandFound && await getComs(txt, 'random-dare')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/dare.txt');
                const lines = body.split('\n').filter(x => x.trim());
                const quote = lines[Math.floor(Math.random() * lines.length)];
                await sReply(quote); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil data.');
              }
            } else if (!commandFound && await getComs(txt, 'random-fakta')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/fakta.txt');
                const lines = body.split('\n').filter(x => x.trim());
                const quote = lines[Math.floor(Math.random() * lines.length)];
                await sReply(quote); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil data.');
              }
            } else if (!commandFound && await getComs(txt, 'random-pantun')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/pantun.txt');
                const lines = body.split('\n').filter(x => x.trim());
                const quote = lines[Math.floor(Math.random() * lines.length)];
                await sReply(quote); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil data.');
              }
            } else if (!commandFound && await getComs(txt, 'random-puisi')) {
              try {
                const { data: allPuisi } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/puisi.json');
                const randomPoem = allPuisi[Math.floor(Math.random() * allPuisi.length)];
                await sReply(randomPoem.puisi_with_header); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply("Maaf, terjadi kesalahan saat mengambil puisi acak.");
              }
            } else if (!commandFound && await getComs(txt, 'random-gombal')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/gombal.txt');
                const lines = body.split('\n').filter(x => x.trim());
                const quote = lines[Math.floor(Math.random() * lines.length)];
                await sReply(quote); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil data.');
              }
            } else if (!commandFound && await getComs(txt, 'random-receh')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/receh.txt');
                const lines = body.split('\n').filter(x => x.trim());
                const quote = lines[Math.floor(Math.random() * lines.length)];
                await sReply(quote); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil data.');
              }
            } else if (!commandFound && await getComs(txt, 'random-quotes')) {
              try {
                const data = await fs.readFile('./src/games/quotes.json', 'utf-8');
                const jsonData = JSON.parse(data);
                const rand = jsonData[Math.floor(Math.random() * jsonData.length)];
                await sReply(`${rand.quote} - ${rand.by}`); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan pada fitur quotes.');
              }
            } else if (!commandFound && await getComs(txt, 'random-joke')) {
              try {
                const { data: allJokes } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/darkjoke.json');
                const randomJoke = allJokes[Math.floor(Math.random() * allJokes.length)];
                const imageUrl = randomJoke.image;
                await fn.sendFileUrl(toId, imageUrl, '', m); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply("Maaf, gagal memuat dark joke, coba lagi nanti.");
              }
            } else if (!commandFound && await getComs(txt, 'quotes-anime')) {
              const quotes = require('./src/games/animequotes.json')
              const data = randomChoice(quotes)
              let text = `🎌 *Anime*: ${data.anime}\n👤 *Name*: ${data.name}\n💬 *Quote*: ${data.quote}`;
              await sReply(text); await limitAdd(serial); await counthit(serial);
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'quotes-cinta')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/cinta.txt');
                const lines = body.split('\n').filter(x => x.trim());
                const quote = lines[Math.floor(Math.random() * lines.length)];
                await sReply(quote); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil kutipan cinta.');
              }
            } else if (!commandFound && await getComs(txt, 'quotes-motivasi')) {
              try {
                const { data: body } = await axios.get('https://raw.githubusercontent.com/Terror-Machine/random/master/pquotes.txt');
                const lines = body.split('\n').filter(x => x.trim());
                const quote = lines[Math.floor(Math.random() * lines.length)];
                await sReply(quote); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply('Maaf, terjadi kesalahan saat mengambil kutipan motivasi.');
              }
            } else if (!commandFound && await getPrefix(txt, 'halah')) {
              try {
                let toMsg = '';
                if (quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation')) {
                  toMsg = quotedMsg?.body;
                } else {
                  if (!arg) throw new Error('format pesan salah!!');
                  toMsg = arg;
                }
                const halahMsg = toMsg.replace(/[aiueo]/gi, 'a');
                await sReply(halahMsg); await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hilih')) {
              try {
                let toMsg = '';
                if (quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation')) {
                  toMsg = quotedMsg?.body;
                } else {
                  if (!arg) throw new Error('format pesan salah!!');
                  toMsg = arg;
                }
                const halahMsg = toMsg.replace(/[aiueo]/gi, 'i');
                await sReply(halahMsg); await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'heleh')) {
              try {
                let toMsg = '';
                if (quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation')) {
                  toMsg = quotedMsg?.body;
                } else {
                  if (!arg) throw new Error('format pesan salah!!');
                  toMsg = arg;
                }
                const halahMsg = toMsg.replace(/[aiueo]/gi, 'e');
                await sReply(halahMsg); await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'huluh')) {
              try {
                let toMsg = '';
                if (quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation')) {
                  toMsg = quotedMsg?.body;
                } else {
                  if (!arg) throw new Error('format pesan salah!!');
                  toMsg = arg;
                }
                const halahMsg = toMsg.replace(/[aiueo]/gi, 'u');
                await sReply(halahMsg); await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'holoh')) {
              try {
                let toMsg = '';
                if (quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation')) {
                  toMsg = quotedMsg?.body;
                } else {
                  if (!arg) throw new Error('format pesan salah!!');
                  toMsg = arg;
                }
                const halahMsg = toMsg.replace(/[aiueo]/gi, 'o');
                await sReply(halahMsg); await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "util"
            if (!commandFound && await getPrefix(txt, 'get')) {
              try {
                if (!arg) throw new Error(`Perintah ${dbSettings.rname}get membutuhkan argumen.`);
                const argsArray = arg.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
                if (argsArray.length === 0) throw new Error("Argumen tidak boleh kosong.");
                const { stdoutData } = await new Promise((resolve, reject) => {
                  const nodePath = 'node';
                  const scrapScript = path.resolve('./src/utils/get.js');
                  const child = spawn(nodePath, [scrapScript, ...argsArray]);
                  let stdout = '';
                  let stderr = '';
                  child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
                  child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
                  child.on('error', (error) => {
                    reject(error);
                  });
                  child.on('close', (code) => {
                    if (code !== 0) {
                      const errorMessage = stderr.trim() || `Skrip selesai dengan kode error ${code}`;
                      reject(new Error(errorMessage));
                    } else {
                      resolve({ stdoutData: stdout, stderrData: stderr });
                    }
                  });
                });
                const cleaned = stdoutData.trim();
                const localFilePrefix = 'LOCAL_FILE::';
                const mediaUrlPrefix = 'MEDIA_URL::';
                if (cleaned.startsWith(localFilePrefix)) {
                  const localPath = cleaned.substring(localFilePrefix.length);
                  const tempPath = path.join(global.tmpDir, `${global.randomSuffix}.ogg`);
                  try {
                    if ((path.extname(localPath).toLowerCase() === '.gif') || (path.extname(localPath).toLowerCase() === '.webp')) {
                      await fn.sendRawWebpAsSticker(toId, localPath, m, { packname: dbSettings.packName, author: dbSettings.packAuthor });
                    } else if (path.extname(localPath).toLowerCase() === '.webm') {
                      try {
                        try {
                          await exec(`ffprobe -i "${localPath}" -show_streams -select_streams a -loglevel error`);
                          await exec(`ffmpeg -y -i "${localPath}" -vn -acodec libopus -b:a 128k -ar 48000 -ac 1 -application voip -compression_level 10 -frame_duration 20 -packet_loss 1 -vbr on -avoid_negative_ts make_zero -write_xing 0 -fflags +bitexact -flags +bitexact -id3v2_version 0 -map_metadata -1 -map_chapters -1 -write_bext 0 -f ogg "${tempPath}"`);
                        } catch {
                          const duration = await getVideoDuration(localPath);
                          await exec(`ffmpeg -y -i "${localPath}" -f lavfi -i anullsrc=channel_layout=mono:sample_rate=48000:duration=${duration} -c:a libopus -b:a 128k -ar 48000 -ac 1 -shortest -application voip -compression_level 10 -frame_duration 20 -packet_loss 1 -vbr on -avoid_negative_ts make_zero -write_xing 0 -fflags +bitexact -flags +bitexact -id3v2_version 0 -map_metadata -1 -map_chapters -1 -write_bext 0 -f ogg "${tempPath}"`);
                        }
                        if (fs.existsSync(tempPath) && fs.statSync(tempPath).size > 0) {
                          await fn.sendMessage(m.chat, { audio: { stream: fs.createReadStream(tempPath) }, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: m });
                        }
                      } catch (error) {
                        console.error('Error processing WebM file:', error);
                        if (fs.existsSync(localPath) && fs.statSync(localPath).size > 0) {
                          await fn.sendMessage(m.chat, { document: fs.createReadStream(localPath), mimetype: 'video/webm' }, { quoted: m });
                        }
                      }
                    } else {
                      await fn.sendFilePath(toId, dbSettings.autocommand, localPath, { quoted: m });
                    }
                  } finally {
                    await deleteFile(localPath); await deleteFile(tempPath);
                  }
                } else if (cleaned.startsWith(mediaUrlPrefix)) {
                  const mediaUrl = cleaned.substring(mediaUrlPrefix.length);
                  await fn.sendFileUrl2(toId, mediaUrl, dbSettings.autocommand, m);
                } else if (cleaned) {
                  await sReply(cleaned);
                } else {
                  throw new Error("Skrip tidak menghasilkan output.");
                }
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message || 'Terjadi kesalahan tak terduga.'); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'getbio')) {
              try {
                const targetId = quotedMsg ? quotedParticipant : mentionedJidList[0];
                if (!targetId) throw new Error(`Silakan balas pesan atau tag nomor yang ingin ambil bio nya.`);
                const status = await fn.fetchStatus(targetId);
                if (status && status.status && status.status.status !== '' && status.status.status !== '1970-01-01T00:00:00.000Z') {
                  await sReply(`Bio dari ${targetId}: ${status.status.status}`);
                } else {
                  await sReply(`User ID: ${targetId}\nTidak ada bio atau privasi user tidak menginginkan bio nya dilihat oleh orang lain.`);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'carinik')) {
              try {
                if (!arg || args.length > 1) throw new Error(`Format perintah salah. Gunakan: ${dbSettings.rname}carinik <nomor_nik>`);
                const nikToSearch = args[0];
                const res = await parseNIK(nikToSearch);
                if (!res.status) throw new Error(res.error || 'NIK tidak valid atau tidak ditemukan.');
                let responseText = `*🔍 Hasil Pencarian NIK*\n\n`;
                responseText += `*NIK :* \`\`\`${res.nik}\`\`\`\n`;
                responseText += `*Jenis Kelamin :* ${res.jenisKelamin}\n`;
                responseText += `\n`;
                responseText += `*📅 Kelahiran*\n`;
                responseText += `  - *Tanggal :* ${res.kelahiran.tanggal}\n`;
                responseText += `  - *Hari Lahir :* ${res.kelahiran.hari}\n`;
                responseText += `  - *Zodiak :* ${res.kelahiran.zodiak}\n`;
                responseText += `\n`;
                responseText += `*📊 Usia & Generasi*\n`;
                responseText += `  - *Saat Ini :* ${res.usia.teks}\n`;
                responseText += `  - *Kategori :* ${res.usia.kategori}\n`;
                responseText += `  - *Generasi :* ${res.usia.generasi}\n`;
                responseText += `  - *Ulang Tahun :* ${res.usia.ultah}\n`;
                responseText += `\n`;
                responseText += `*📍 Lokasi Terdaftar*\n`;
                responseText += `  - *Provinsi :* ${res.lokasi.provinsi}\n`;
                responseText += `  - *Kab/Kota :* ${res.lokasi.kabupatenKota}\n`;
                responseText += `  - *Kecamatan :* ${res.lokasi.kecamatan}\n`;
                responseText += `  - *Kelurahan :* ${res.lokasi.kelurahan}\n`;
                responseText += `  - *Kode Pos :* ${res.lokasi.kodePos}\n`;
                await sReply(responseText); await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message); await counthit(serial);
              }
            } else if (!commandFound && await getComs(txt, 'jadibot')) {
              let tx = 'mau akunmu jadi bot? (clone ' + dbSettings.botname + ')\n'
              tx += '   jadi owner aja, 250k perbulan\n'
              tx += '      - bebas mau masukin bot ke berapapun grupnya\n'
              tx += '      - unlimited limit dan bisa gift limit kesiapapun\n'
              tx += '      - bisa settings limit sendiri\n'
              tx += '      - full fitur dari ' + dbSettings.botname + '\n'
              tx += '      - bisa ganti nama sendiri\n'
              tx += '      - dll.\n'
              tx += 'minat? chat langsung creator/owner'
              await sReply(tx); await counthit(serial); await limitAdd(serial);
              commandFound = true;
            } else if (!commandFound && await getPrefix(txt, 'afk')) {
              try {
                const isAfkOn = checkAfkUser(toId, serial, dbAFK);
                if (!m.isGroup || isAfkOn) throw new Error(`Kamu sudah terdaftar sebagai AFK di grup ini atau bukan grup.`);
                const reason = q ? q : 'sibuk'
                const timen = dayjs.unix(t).format('DD/MM/YYYY HH:mm:ss');
                addAfkUser(toId, serial, t, reason, dbAFK)
                let tx = `┌ ❏ AFK : REGISTERED\n`
                tx += `│ ├ USER : ${pushname}\n`
                tx += `│ ├ TIME : ${timen}\n`
                tx += `└ └ REASON : ${reason}`
                await sReply(tx); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'limit')) {
              if (isSadmin || master || vip) {
                await sReply(`Status: ${vip ? 'VIP' : (master ? 'Master' : 'SAdmin')}\nCredit Penggunaan: *Tak Terbatas*`); await counthit(serial);
              } else {
                const userLimit = dbLimits.limit.find(lmt => lmt.id === serial);
                const userGameLimit = dbLimitGame.limitgame.find(lmt => lmt.id === serial);
                if (!userLimit) {
                  const limitDefault = premium ? dbSettings.limitCountPrem : dbSettings.limitCount;
                  dbLimits.limit.push({ id: serial, limit: limitDefault, warnedLimit: false });
                  await dumpLimit();
                }
                if (!userGameLimit) {
                  const limitGameDefault = premium ? dbSettings.limitCountPrem : dbSettings.limitGame;
                  dbLimitGame.limitgame.push({ id: serial, limit: limitGameDefault, warnedLimit: false });
                  await dumpLimitGame();
                }
                const finalUserLimit = dbLimits.limit.find(lmt => lmt.id === serial);
                const finalUserGameLimit = dbLimitGame.limitgame.find(lmt => lmt.id === serial);
                const replyMsg =
                  `Sisa credit kamu:\n\n` +
                  `┠ Usage Limit: *${finalUserLimit.limit}*\n` +
                  `┖ Game Limit: *${finalUserGameLimit.limit}*`;
                await sReply(replyMsg); await counthit(serial);
              }
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'count')) {
              const user = dbCounts.hitcount.find(lmt => lmt.id === serial);
              if (user) {
                await sReply(`Jumlah penggunaan bot kamu adalah: *${user.counts}*`); await limitAdd(serial); await counthit(serial);
              } else {
                const newUser = { id: serial, counts: 0 };
                dbCounts.hitcount.push(newUser);
                await dumpCount(); await sReply(`Jumlah penggunaan bot kamu adalah: *0*`); await limitAdd(serial); await counthit(serial);
              }
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'rvo')) {
              try {
                if (quotedMsg) {
                  const akuCrot = m.quoted[m.quoted.type] || m.quoted;
                  if (akuCrot.viewOnce) {
                    if (quotedMsg?.imageMessage || quotedMsg?.videoMessage || quotedMsg?.audioMessage) {
                      let mediaType;
                      let extension;
                      if (quotedMsg.imageMessage) {
                        mediaType = 'gambar';
                        extension = '.png';
                      } else if (quotedMsg.videoMessage) {
                        mediaType = 'video';
                        extension = '.mp4';
                      } else if (quotedMsg.audioMessage) {
                        mediaType = 'audio';
                        extension = '.mp3';
                      }
                      const buffer = await fn.getMediaBuffer(quotedMsg);
                      if (!buffer) throw new Error(`Gagal mengunduh ${mediaType}.`);
                      const tempPath = path.join(global.tmpDir, `${global.randomSuffix}${extension}`);
                      await fs.writeFile(tempPath, buffer);
                      await fn.sendFilePath(toId, dbSettings.autocommand, tempPath, { quoted: m });
                      await deleteFile(tempPath); await counthit(serial); await limitAdd(serial);
                    } else { throw new Error(`Media yang direply bukan media. Harap reply gambar, video, atau audio.`); }
                  } else { throw new Error(`Media yang direply bukan view once. Harap reply media view once.`); }
                }
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'obfuscate')) {
              try {
                let level = 'medium';
                let pass = dbSettings.botname +'-Obfuscator';
                let codeToObfuscate = '';
                let outputFileName = 'obfuscated.js';
                const validLevels = ['low', 'medium', 'high', 'extreme'];
                if (quotedMsg && quotedMsg?.documentMessage) {
                  const mime = quotedMsg?.documentMessage?.mimetype || '';
                  if (!mime.startsWith('application/javascript')) throw new Error("Tipe media tidak didukung. Harap reply file .js");
                  const buffer = await fn.getMediaBuffer(quotedMsg);
                  codeToObfuscate = buffer.toString('utf8');
                  outputFileName = `obfuscated-${quotedMsg?.documentMessage.title || 'file.js'}`;
                  if (args[0] && validLevels.includes(args[0].toLowerCase())) {
                    level = args[0].toLowerCase();
                    pass = args.slice(1).join(' ') || pass;
                  } else if (args.length > 0) {
                    pass = args.join(' ');
                  }
                } else {
                  if (quotedMsg) {
                    if (args[0] && validLevels.includes(args[0].toLowerCase())) {
                      level = args[0].toLowerCase();
                      pass = args.slice(1).join(' ') || pass;
                    } else if (args.length > 0) {
                      pass = args.join(' ');
                    }
                    if (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation') {
                      codeToObfuscate = quotedMsg?.body;
                    }
                  } else {
                    if (args.length >= 3 && validLevels.includes(args[0].toLowerCase())) {
                      level = args[0].toLowerCase();
                      pass = args[1];
                      codeToObfuscate = args.slice(2).join(' ');
                    } else if (args.length > 0) {
                      codeToObfuscate = arg;
                    }
                  }
                }
                if (!codeToObfuscate || !codeToObfuscate.trim()) {
                  const usage = `*Perintah Obfuscator JavaScript*\n\n` +
                    `*Cara 1: Reply File*\n.obfuscate <level?> <pass?>\n\n` +
                    `*Cara 2: Reply Teks*\n.obfuscate <level?> <pass?>\n\n` +
                    `*Cara 3: Teks Langsung*\n.obfuscate <level?> <pass?> <kode...>\n\n` +
                    `*Level:* low, medium, high, extreme`;
                  throw new Error(usage);
                }
                const obfuscatedCode = await obfuscator.obfs({
                  code: codeToObfuscate,
                  level: level,
                  pass: pass,
                });
                let tempFilePath = '';
                try {
                  tempFilePath = path.join(global.tmpDir, outputFileName);
                  await fs.writeFile(tempFilePath, obfuscatedCode, 'utf-8');
                  const caption = `✅ Obfuskasi Berhasil!\n\n*Level:* ${level}\n*Password/Tag:* ${pass}`;
                  await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m });
                } finally {
                  await deleteFile(tempFilePath);
                }
                await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) {
                await log(`OBFUSCATE Flow/Error:\n${error}`, true); await counthit(serial); await sReply(`${error.message || "Terjadi kesalahan yang tidak diketahui."}`);
              }
            } else if (!commandFound && await getPrefix(txt, 'beautify')) {
              try {
                if (quotedMsg && quotedMsg?.documentMessage) {
                  const mime = quotedMsg?.documentMessage?.mimetype || '';
                  const supportedMimes = ['application/javascript', 'text/html', 'text/css', 'application/json', 'application/zip', 'text/plain'];
                  if (!supportedMimes.some(supportedMime => mime.startsWith(supportedMime))) throw new Error("Tipe media tidak didukung. Harap reply file .js, .json, .html, .css, atau .zip");
                  const buffer = await fn.getMediaBuffer(quotedMsg);
                  const originalFileName = quotedMsg?.documentMessage.title || 'replied-file';
                  let beautifiedBuffer, outputFileName;
                  if (mime.includes('zip')) {
                    const tempZipPath = path.join(global.tmpDir, `temp_${Date.now()}.zip`);
                    await fs.writeFile(tempZipPath, buffer);
                    try {
                      const processor = await FileProcessor.fromPath(tempZipPath);
                      beautifiedBuffer = await processor.processZip();
                      outputFileName = processor.getOutputFileName(originalFileName, 'zip');
                    } finally {
                      await deleteFile(tempZipPath);
                    }
                  } else {
                    const fileContent = buffer.toString('utf8');
                    const processor = FileProcessor.fromText(fileContent, originalFileName);
                    beautifiedBuffer = await processor.processSingleFile();
                    const detectedType = processor.determineFileType(originalFileName);
                    outputFileName = processor.getOutputFileName(originalFileName, detectedType);
                  }
                  let tempFilePath = '';
                  try {
                    tempFilePath = path.join(global.tmpDir, outputFileName);
                    await fs.writeFile(tempFilePath, beautifiedBuffer);
                    const caption = `✅ Kode Berhasil Dirapikan!`;
                    await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m });
                  } finally {
                    await deleteFile(tempFilePath);
                  }
                } else {
                  let codeToProcess = '';
                  if (quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation')) {
                    codeToProcess = quotedMsg?.body;
                  } else {
                    codeToProcess = arg;
                  }
                  if (!codeToProcess || !codeToProcess.trim()) {
                    const usage = `*Perintah Beautifier Universal*\n\n` +
                      `Gunakan untuk merapikan kode JS, JSON, HTML, & CSS.\n\n` +
                      `*Cara 1: Reply File*\n` +
                      `Balas file (.js, .json, .html, .css, .zip) dengan perintah:\n*.beautify*\n\n` +
                      `*Cara 2: Reply Teks*\n` +
                      `Balas pesan teks yang berisi kode dengan perintah:\n*.beautify*\n\n` +
                      `*Cara 3: Teks Langsung*\n` +
                      `Ketik perintah diikuti dengan kode Kamu:\n*.beautify function hello(){...}*`;
                    throw new Error(usage);
                  }
                  let beautifiedBuffer, outputFileName;
                  try {
                    const parsedJson = JSON.parse(codeToProcess);
                    const beautifiedJson = JSON.stringify(parsedJson, null, 2);
                    beautifiedBuffer = Buffer.from(beautifiedJson, 'utf8');
                    outputFileName = 'beautified.json';
                  } catch {
                    try {
                      const processor = FileProcessor.fromText(codeToProcess, 'input.js');
                      beautifiedBuffer = await processor.processSingleFile('js');
                      outputFileName = processor.getOutputFileName('beautified-code', 'js');
                    } catch (error) {
                      await log(`Beautify failed for both JSON and JS:\n${error}`, true);
                      throw new Error("Gagal memformat kode. Pastikan sintaks JavaScript atau JSON Kamu sudah benar.");
                    }
                  }
                  if (!beautifiedBuffer) throw new Error("Gagal memproses konten.");
                  const beautifiedText = beautifiedBuffer.toString('utf8');
                  if (beautifiedText.length < 10000) {
                    const detectedType = outputFileName.endsWith('.json') ? 'json' : 'javascript';
                    const replyText = `\`\`\`${detectedType}\n${beautifiedText}\n\`\`\``;
                    await sReply(replyText);
                  } else {
                    let tempFilePath = '';
                    try {
                      tempFilePath = path.join(global.tmpDir, outputFileName);
                      await fs.writeFile(tempFilePath, beautifiedBuffer);
                      const caption = `✅ Kode Berhasil Dirapikan! (Hasil terlalu panjang, dikirim sebagai file)`;
                      await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m });
                    } finally {
                      await deleteFile(tempFilePath);
                    }
                  }
                }
                await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) {
                await log(`BEAUTIFY Flow/Error:\n${error}`, true); await counthit(serial); await sReply(`${error.message || "Terjadi kesalahan yang tidak diketahui."}`);
              }
            } else if (!commandFound && await getPrefix(txt, 'npmjs')) {
              try {
                let packageName = arg
                if (!packageName) throw new Error(`Gagal. Mohon berikan nama paket.\n\nContoh:\n${dbSettings.rname}npmjs baileys`);
                const { data: stalk } = await axios.get(`https://registry.npmjs.org/${packageName}`);
                const latestVersion = stalk['dist-tags']?.latest;
                const initialVersion = Object.keys(stalk.time).find(v => v !== 'created' && v !== 'modified');
                if (!latestVersion) throw new Error(`Paket "${packageName}" ditemukan, tetapi tidak memiliki versi rilis 'latest'.`);
                const latestPackageData = stalk.versions[latestVersion];
                const initialPackageData = stalk.versions[initialVersion];
                const dependenciesCountLatest = Object.keys(latestPackageData?.dependencies || {}).length;
                const dependenciesCountInitial = Object.keys(initialPackageData?.dependencies || {}).length;
                let replyText = `📦 *Informasi Paket: ${stalk.name}*\n\n`;
                replyText += `📝 *Deskripsi:* ${stalk.description || 'Tidak ada deskripsi'}\n\n`;
                replyText += `*Version*\n` + "```";
                replyText += `> Versi Terbaru : ${latestVersion}\n`;
                replyText += `> Versi Awal    : ${initialVersion || 'N/A'}\n`;
                replyText += `> Total Rilis   : ${Object.keys(stalk.versions).length}\n\n`;
                replyText += `Dependencies\n`;
                replyText += `> Dep. Terbaru  : ${dependenciesCountLatest}\n`;
                replyText += `> Dep. Awal     : ${dependenciesCountInitial}\n\n`;
                replyText += `Waktu\n`;
                replyText += `> Dibuat        : ${new Date(stalk.time.created).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}\n`;
                replyText += `> Rilis Terbaru : ${new Date(stalk.time[latestVersion]).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}\n\n` + "```";
                replyText += `🔗 *Link:* https://www.npmjs.com/package/${packageName}`;
                await sReply(replyText); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                if (error.response && error.response.status === 404) {
                  await sReply(`❎ Paket "${arg}" tidak ditemukan di NPM registry.`);
                } else {
                  await log(`NPMJS_ERROR:\n${error}`, true); await sReply(`❎ Terjadi kesalahan saat mengambil data paket.`);
                }
                await counthit(serial);
              }
            } else if (!commandFound && await getComs(txt, 'ping')) {
              const current = new Date().getTime();
              const est = Math.floor(current - (t * 1000));
              await sPesan(`Response time: ${est}ms`); await counthit(serial);
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'commands')) {
              const levela = getLevelFormat(serial);
              const menuData = {
                levela, isSadmin, master, vip, premium, isGroupAdmins,
                helpmaster, helpowner, helpvip, helppremium, helpmanage,
                helpmedia, helpaudio, helptext, helpimage, helpgame0,
                helpgame1, helpgame2, helpgame3, helplist, helphitungan,
                helpai, helpanime, helpconvert, helputil, helpfun,
                helpngaji, helpbot
              };
              await sReply(`${await commandMenu(menuData)}\n\n@${serial.split('@')[0]}`);
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'totalcommands')) {
              const allCommands = Object.keys(coms).length;
              await sReply(`total commands yang dimiliki oleh ${dbSettings.botname} adalah ${allCommands}.`); await limitAdd(serial); await counthit(serial);
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'topcommands')) {
              let topCommandsText = '*❏ Top 17 Commands*\n';
              if (typeof coms !== 'undefined' && Object.keys(coms).length > 0) {
                const sortedResult = Object.values(coms)
                  .filter(c => c && Object.prototype.hasOwnProperty.call(c, 'coms') && Object.prototype.hasOwnProperty.call(c, 'count'))
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 17);
                if (sortedResult.length > 0) {
                  sortedResult.forEach((e, i) => {
                    topCommandsText += `> ${i + 1}. ${e.coms} - ${e.count}\n`;
                  });
                } else {
                  topCommandsText += '> Belum ada data perintah.\n';
                }
              } else {
                topCommandsText += '> Belum ada data perintah.\n';
              }
              await sReply(topCommandsText); await limitAdd(serial); await counthit(serial);
              commandFound = true;
            }
            ctype = "anime";
            if (!commandFound && await getComs(txt, 'toanime')) {
              try {
                const WS_URL = "wss://pixnova.ai/demo-photo2anime/queue/join";
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                if (!targetMsg) throw new Error(`gunakan perintah seperti ${dbSettings.rname}toanime dengan mengirim foto atau mereply gambar!`);
                const mimeType = targetMsg?.imageMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('image/')) throw new Error(`terdeteksi bukan gambar!`)
                const resBuffer = await fn.getMediaBuffer(targetMsg);
                if (!resBuffer) throw new Error(`gagal mendapatkan metadata!`);
                const filename = await saveFile(resBuffer, "toanime", 'jpg');
                const IMAGE = await pomf2(filename);
                const DATA = {
                  prompt: "(masterpiece), best quality",
                  negative: "(worst quality, low quality:1.4), (greyscale, monochrome:1.1), cropped, lowres , username, blurry, trademark, watermark, title, multiple view, Reference sheet, curvy, plump, fat, strabismus, clothing cutout, side slit,worst hand, (ugly face:1.2), extra leg, extra arm, bad foot, text, name",
                  strength: 0.6
                };
                const result = await PixNova(DATA, IMAGE, WS_URL);
                await fn.sendFileUrl(toId, result.output.result, dbSettings.autocommand, m);
                await deleteFile(filename); await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "list"
            if (!commandFound && await getComs(txt, 'listchat')) {
              const chats = dbChats.chat || {};
              const keys = Object.keys(chats);
              let msg = "*💬 Daftar Chat:*\n";
              if (keys.length === 0) {
                msg += "_(kosong)_\n";
              } else {
                keys.forEach((name, idx) => {
                  msg += `${idx + 1}. ${name}\n`;
                });
              }
              msg += `\nKetik: *delchat <nomor atau nama>*\nContoh:\n• delchat 1-3\n• delchat grup1,teman`;
              await sReply(msg); await limitAdd(serial); await counthit(serial);
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'listcontact')) {
              const contacts = dbContact.contact || {};
              const keys = Object.keys(contacts);
              let msg = "*👤 Daftar Kontak:*\n";
              if (keys.length === 0) {
                msg += "_(kosong)_\n";
              } else {
                keys.forEach((name, idx) => {
                  msg += `${idx + 1}. ${name}\n`;
                });
              }
              msg += `\nKetik: *delcontact <nomor atau nama>*\nContoh:\n• delcontact 1,3-5\n• delcontact admin,user1`;
              await sReply(msg); await limitAdd(serial); await counthit(serial);
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'listimage')) {
              const images = dbImage.image || {};
              const keys = Object.keys(images);
              let msg = "*🖼️ Daftar Gambar:*\n";
              if (keys.length === 0) {
                msg += "_(kosong)_\n";
              } else {
                keys.forEach((name, idx) => {
                  msg += `${idx + 1}. ${name}\n`;
                });
              }
              msg += `\nKetik: *delimage <nomor atau nama>*\nContoh:\n• delimage 1,3\n• delimage banner,ikon`;
              await sReply(msg); await limitAdd(serial); await counthit(serial);
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'liststicker')) {
              const stickers = dbStickers.sticker || {};
              const keys = Object.keys(stickers);
              let msg = "*🧷 Daftar Sticker:*\n";
              if (keys.length === 0) {
                msg += "_(kosong)_\n";
              } else {
                keys.forEach((name, idx) => {
                  msg += `${idx + 1}. ${name}\n`;
                });
              }
              msg += `\nKetik: *delsticker <nomor atau nama>*\nContoh:\n• delsticker 2-4\n• delsticker lucu.sedih`;
              await sReply(msg); await limitAdd(serial); await counthit(serial);
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'listaudio')) {
              const audios = dbAudio.audio || {};
              const keys = Object.keys(audios);
              let msg = "*🎵 Daftar Audio:*\n";
              if (keys.length === 0) {
                msg += "_(kosong)_\n";
              } else {
                keys.forEach((name, idx) => {
                  msg += `${idx + 1}. ${name}\n`;
                });
              }
              msg += `\nKetik: *delaudio <nomor atau nama>*\nContoh:\n• delaudio 2-4\n• delaudio opening,intro`;
              await sReply(msg); await limitAdd(serial); await counthit(serial);
              commandFound = true;
            }
            ctype = "htext"
            if (!commandFound && await getPrefix(txt, 'reverse')) {
              try {
                let a
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  a = quotedMsg?.body
                } else if (arg.length > 0) {
                  a = arg
                } else {
                  throw new Error(`Mohon berikan teks yang ingin dibalik.`);
                }
                await sReply(a.split('').reverse().join('')); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'zalgo')) {
              try {
                let text
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  text = quotedMsg?.body
                } else if (arg.length > 0) {
                  text = arg
                } else {
                  throw new Error(`Mohon berikan teks yang ingin di-zalgo.`);
                }
                let result = '';
                for (let i = 0; i < text.length; i++) {
                  result += text[i];
                  for (const chars of Object.values(zalgo)) {
                    let count = Math.floor(Math.random() * 5)
                    while (count--) result += chars[Math.floor(Math.random() * chars.length)];
                  }
                }
                await sReply(result); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'braille')) {
              try {
                let b
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  b = quotedMsg?.body
                } else if (arg.length > 0) {
                  b = arg
                } else {
                  throw new Error(`Mohon berikan teks yang ingin diubah ke Braille.`);
                }
                await sReply(letterTrans(b, braille)); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'cursive')) {
              try {
                let c
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  c = quotedMsg?.body
                } else if (arg.length > 0) {
                  c = arg
                } else {
                  throw new Error(`Mohon berikan teks yang ingin diubah ke Cursive.`);
                }
                await sReply(letterTrans(c, cursiv)); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'emojify')) {
              try {
                let d
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  d = quotedMsg?.body
                } else if (arg.length > 0) {
                  d = arg
                } else {
                  throw new Error(`Mohon berikan teks yang ingin diubah ke Emojify.`);
                }
                await sReply(letterTrans(d, emoju)); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'fancy')) {
              try {
                let e
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  e = quotedMsg?.body
                } else if (arg.length > 0) {
                  e = arg
                } else {
                  throw new Error(`Mohon berikan teks yang ingin diubah ke Fancy.`);
                }
                await sReply(letterTrans(e, fancy)); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'superscript')) {
              try {
                let f
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  f = quotedMsg?.body
                } else if (arg.length > 0) {
                  f = arg
                } else {
                  throw new Error(`Mohon berikan teks yang ingin diubah ke Superscript.`);
                }
                await sReply(letterTrans(f, suuiper)); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'brony')) {
              try {
                let g
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  g = quotedMsg?.body
                } else if (arg.length > 0) {
                  g = arg
                } else {
                  throw new Error(`Mohon berikan teks yang ingin diubah ke Brony Talk.`);
                }
                await sReply(wordTrans(g, broni)); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "himage"
            if (!commandFound && await getComs(txt, 'distort')) {
              try {
                let bufferMedia;
                let caption = dbSettings.autocommand;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  let profilePicBuffer;
                  try {
                    profilePicBuffer = await fn.profilePictureUrl(targetJid, "image");
                  } catch {
                    profilePicBuffer = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                  bufferMedia = profilePicBuffer;
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk di-distort.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const resBuffer = await deepfry(bufferMedia);
                const tempFilePath = await saveFile(resBuffer, "distort-in", 'jpg');
                await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'tobecontinue')) {
              try {
                let bufferMedia;
                let caption = dbSettings.autocommand;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  let profilePicBuffer;
                  try {
                    profilePicBuffer = await fn.profilePictureUrl(targetJid, "image");
                  } catch {
                    profilePicBuffer = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                  bufferMedia = profilePicBuffer;
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk di-tobecontinue.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const resBuffer = await tobecontinue(bufferMedia);
                const tempFilePath = await saveFile(resBuffer, "tobecontinue-in", 'jpg');
                await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'thuglife')) {
              try {
                let bufferMedia;
                let caption = dbSettings.autocommand;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  let profilePicBuffer;
                  try {
                    profilePicBuffer = await fn.profilePictureUrl(targetJid, "image");
                  } catch {
                    profilePicBuffer = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                  bufferMedia = profilePicBuffer;
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk di-thuglife.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const resBuffer = await thuglife(bufferMedia);
                const tempFilePath = await saveFile(resBuffer, "thuglife-in", 'jpg');
                await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'approve')) {
              try {
                let bufferMedia;
                let caption = dbSettings.autocommand;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  let profilePicBuffer;
                  try {
                    profilePicBuffer = await fn.profilePictureUrl(targetJid, "image");
                  } catch {
                    profilePicBuffer = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                  bufferMedia = profilePicBuffer;
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk di-approve.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const resBuffer = await approved(bufferMedia);
                const tempFilePath = await saveFile(resBuffer, "approve-in", 'jpg');
                await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'glitch')) {
              try {
                let bufferMedia;
                let caption = dbSettings.autocommand;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  let profilePicBuffer;
                  try {
                    profilePicBuffer = await fn.profilePictureUrl(targetJid, "image");
                  } catch {
                    profilePicBuffer = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                  bufferMedia = profilePicBuffer;
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk di-glitch.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const resBuffer = await glitch(bufferMedia);
                const tempFilePath = await saveFile(resBuffer, "glitch-in", 'jpg');
                await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'ghost')) {
              try {
                let bufferMedia;
                let caption = dbSettings.autocommand;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  let profilePicBuffer;
                  try {
                    profilePicBuffer = await fn.profilePictureUrl(targetJid, "image");
                  } catch {
                    profilePicBuffer = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                  bufferMedia = profilePicBuffer;
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk di-ghost.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const resBuffer = await ghost(bufferMedia);
                const tempFilePath = await saveFile(resBuffer, "ghost-in", 'jpg');
                await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'mirror')) {
              try {
                let bufferMedia;
                let caption = dbSettings.autocommand;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  let profilePicBuffer;
                  try {
                    profilePicBuffer = await fn.profilePictureUrl(targetJid, "image");
                  } catch {
                    profilePicBuffer = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                  bufferMedia = profilePicBuffer;
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk di-mirror.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const resBuffer = await mirror(bufferMedia);
                const tempFilePath = await saveFile(resBuffer, "mirror-in", 'jpg');
                await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'reject')) {
              try {
                let bufferMedia;
                let caption = dbSettings.autocommand;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  let profilePicBuffer;
                  try {
                    profilePicBuffer = await fn.profilePictureUrl(targetJid, "image");
                  } catch {
                    profilePicBuffer = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                  bufferMedia = profilePicBuffer;
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk di-reject.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const resBuffer = await rejected(bufferMedia);
                const tempFilePath = await saveFile(resBuffer, "reject-in", 'jpg');
                await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'fisheye')) {
              try {
                let bufferMedia;
                let caption = dbSettings.autocommand;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  let profilePicBuffer;
                  try {
                    profilePicBuffer = await fn.profilePictureUrl(targetJid, "image");
                  } catch {
                    profilePicBuffer = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                  bufferMedia = profilePicBuffer;
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk di-fisheye.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const resBuffer = await mataikan(bufferMedia);
                const tempFilePath = await saveFile(resBuffer, "fisheye-in", 'jpg');
                await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'blur')) {
              try {
                let kontol = !arg ? 5 : (() => {
                  const num = parseInt(args[0], 10);
                  if (isNaN(num)) throw new Error('Argumen pertama harus angka.');
                  if (num > 10) throw new Error('Angka tidak boleh lebih dari 10.');
                  return num;
                })();
                let bufferMedia;
                let caption = dbSettings.autocommand;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  let profilePicBuffer;
                  try {
                    profilePicBuffer = await fn.profilePictureUrl(targetJid, "image");
                  } catch {
                    profilePicBuffer = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                  bufferMedia = profilePicBuffer;
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk di-blur.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const resBuffer = await blur(bufferMedia, kontol);
                const tempFilePath = await saveFile(resBuffer, "blur-in", 'jpg');
                await fn.sendFilePath(toId, caption, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'burn')) {
              try {
                if (!arg) throw new Error(`Mohon berikan teks yang ingin di burn.`);
                const resBuffer = await burn(arg);
                const tempFilePath = await saveFile(resBuffer, "burn-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'certificate')) {
              try {
                if (!arg) throw new Error(`Mohon berikan teks dengan format "Nama | Alasan".`);
                const name = arg.split('|')[0].trim();
                const reason = arg.split('|')[1].trim();
                const base = await loadImage(await fs.readFile('./src/image/certificate.png'));
                const canvas = createCanvas(base.width, base.height)
                const ctx = canvas.getContext('2d')
                ctx.drawImage(base, 0, 0)
                ctx.font = '30px Old English Text MT';
                ctx.textBaseline = 'top';
                ctx.textAlign = 'center';
                ctx.fillText(reason, 518, 273);
                ctx.fillText(name, 518, 419);
                ctx.fillText(dayjs().format('MM/DD/YYYY'), 309, 503);
                const resBuffer = canvas.toBuffer();
                const tempFilePath = await saveFile(resBuffer, "certificate-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'danger')) {
              try {
                if (!arg) throw new Error(`Mohon berikan teks yang ingin diubah ke Danger.`);
                const text = arg
                const base = await loadImage(await fs.readFile('./src/image/danger.png'))
                const canvas = createCanvas(base.width, base.height)
                const ctx = canvas.getContext('2d')
                ctx.drawImage(base, 0, 0)
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.font = 'normal bold 60px Noto';
                let fontSize = 60;
                while (ctx.measureText(text).width > 2520) {
                  fontSize--;
                  ctx.font = `normal bold ${fontSize}px Noto`;
                }
                const lines = await wrapText(ctx, text.toUpperCase(), 840)
                const topMost = 510 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2))
                for (let i = 0; i < lines.length; i++) {
                  const height = topMost + ((fontSize + 20) * i)
                  ctx.fillText(lines[i], base.width / 2, height)
                }
                const resBuffer = canvas.toBuffer();
                const tempFilePath = await saveFile(resBuffer, "danger-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'caution')) {
              try {
                if (!arg) throw new Error(`Mohon berikan teks yang ingin diubah ke Caution.`);
                const text = arg
                const base = await loadImage(await fs.readFile('./src/image/caution.png'))
                const canvas = createCanvas(base.width, base.height)
                const ctx = canvas.getContext('2d')
                ctx.drawImage(base, 0, 0)
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.font = 'normal bold 60px Noto';
                let fontSize = 60;
                while (ctx.measureText(text).width > 3311) {
                  fontSize--;
                  ctx.font = `normal bold ${fontSize}px Noto`;
                }
                const lines = await wrapText(ctx, text.toUpperCase(), 895)
                const topMost = 470 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2))
                for (let i = 0; i < lines.length; i++) {
                  const height = topMost + ((fontSize + 20) * i)
                  ctx.fillText(lines[i], base.width / 2, height)
                }
                const resBuffer = canvas.toBuffer();
                const tempFilePath = await saveFile(resBuffer, "caution-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'license')) {
              try {
                if (!arg) throw new Error(`Mohon berikan teks yang ingin diubah ke License Plate.`);
                const text = arg
                const base = await loadImage(await fs.readFile('./src/image/license-plate.png'))
                const canvas = createCanvas(base.width, base.height)
                const ctx = canvas.getContext('2d')
                ctx.drawImage(base, 0, 0)
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '180px License Plate';
                ctx.fillText(text.toUpperCase(), base.width / 2, base.height / 2, 700);
                const resBuffer = canvas.toBuffer();
                const tempFilePath = await saveFile(resBuffer, "license-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'nowplaying')) {
              try {
                if (!arg) throw new Error(`Mohon berikan teks dengan format "Nama Lagu | Artis".`);
                const name = arg.split('|')[0]
                const artist = arg.split('|')[1]
                const base = await loadImage(await fs.readFile('./src/image/spotify-now-playing.png'))
                const data = await loadImage(await fs.readFile('./src/image/fnbots.jpeg'))
                const canvas = createCanvas(base.width, base.height)
                const ctx = canvas.getContext('2d')
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, base.width, base.height)
                const height = 504 / data.width;
                ctx.drawImage(data, 66, 132, 504, height * data.height)
                ctx.drawImage(base, 0, 0)
                ctx.textBaseline = 'top';
                ctx.textAlign = 'center';
                ctx.font = 'normal bold 25px Noto';
                ctx.fillStyle = 'white';
                ctx.fillText(name, base.width / 2, 685)
                ctx.fillStyle = '#bdbec2';
                ctx.font = '20px Noto';
                ctx.fillText(artist, base.width / 2, 720)
                ctx.fillText('FNBot\'s Picks', base.width / 2, 65);
                const resBuffer = canvas.toBuffer();
                const tempFilePath = await saveFile(resBuffer, "nowplaying-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'subtitle')) {
              try {
                if (!arg) throw new Error(`Mohon berikan teks yang ingin dijadikan subtitle.`);
                let bufferMedia;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  try {
                    bufferMedia = await fn.profilePictureUrl(targetJid, 'image');
                  } catch {
                    bufferMedia = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk dijadikan subtitle.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const resBuffer = await subtitle(bufferMedia, arg);
                const tempFilePath = await saveFile(resBuffer, "subtitle-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'alert')) {
              try {
                if (!arg) throw new Error(`Mohon berikan teks yang ingin dijadikan alert.`);
                const base = await loadImage(await fs.readFile('./src/image/alert.png'))
                const canvas = createCanvas(base.width, base.height)
                const ctx = canvas.getContext('2d')
                ctx.drawImage(base, 0, 0)
                ctx.font = '30px SF Pro';
                ctx.fillStyle = '#1f1f1f';
                ctx.textBaseline = 'top';
                let text = await wrapText(ctx, arg, 540)
                text = text.length > 3 ? `${text.slice(0, 3).join('\n')}...` : text.join('\n')
                ctx.fillText(text, 48, 178)
                const resBuffer = canvas.toBuffer();
                const tempFilePath = await saveFile(resBuffer, "alert-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, tempFilePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(tempFilePath);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'removebg')) {
              let command = '';
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                if (!targetMsg) throw new Error("Media tidak ditemukan.");
                const mime = targetMsg?.imageMessage?.mimetype;
                if (!mime || !mime.startsWith('image/')) throw new Error("Kirim atau balas sebuah GAMBAR.");
                const buffer = await fn.getMediaBuffer(targetMsg);
                if (!buffer) throw new Error("Gagal mengunduh media.");
                const inputPath = path.join(global.tmpDir, `${global.randomSuffix}.jpg`);
                const outputPath = path.join(global.tmpDir, `rembg-${global.randomSuffix}.jpg`);
                const sendPath = path.join(global.tmpDir, `send-rembg-${global.randomSuffix}.jpg`);
                const scriptPath = path.join(__dirname, 'src', 'utils', 'rembege.py');
                const venvPythonPath = path.join(__dirname, 'venv', 'bin', 'python3');
                try {
                  await fs.writeFile(inputPath, buffer);
                  if (arg) {
                    command = `"${venvPythonPath}" "${scriptPath}" "${inputPath}" "${outputPath}" "${arg.toUpperCase()}"`;
                  } else {
                    command = `"${venvPythonPath}" "${scriptPath}" "${inputPath}" "${outputPath}"`;
                  }
                  await exec(command);
                  await sharp(outputPath).jpeg({ quality: 90, progressive: true, mozjpeg: true }).toFile(sendPath);
                  await fn.sendFilePath(toId, dbSettings.autocommand, sendPath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                } finally {
                  await deleteFile(inputPath); await deleteFile(outputPath); await deleteFile(sendPath);
                }
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'makecircle')) {
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                if (!targetMsg) throw new Error("Media tidak ditemukan.");
                const mime = targetMsg?.imageMessage?.mimetype
                if (!mime) throw new Error("Kirim atau balas gambar untuk dijadikan lingkaran.");
                const resBuffer = await makeCircleSticker(await fn.getMediaBuffer(targetMsg));
                const patH = await saveFile(resBuffer, "makecircle", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, patH, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(patH);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "haudio"
            if (!commandFound && await getPrefix(txt, 'to-tts')) {
              try {
                let inputText;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  inputText = quotedMsg?.body;
                } else if (args.length > 0) {
                  inputText = args.join(' ');
                } else {
                  throw new Error("Silakan berikan teks atau balas pesan yang ingin diubah menjadi suara.");
                }
                if (inputText.length >= 500) throw new Error('Teks terlalu panjang! Maksimal 500 karakter untuk menghindari spam.');
                const tempFilePath = path.join(global.tmpDir, `tts-${Date.now()}.mp3`);
                const saveTtsAsync = util.promisify(ttsId.save);
                await saveTtsAsync(tempFilePath, inputText);
                await fn.sendFilePath(toId, `tts-${Date.now()}.mp3`, tempFilePath, { quoted: m });
                await deleteFile(tempFilePath); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await counthit(serial); await sReply(error.message || "Terjadi kesalahan saat memproses Text-to-Speech.");
              }
            } else if (!commandFound && await getComs(txt, 'to-bass')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af equalizer=f=54:width_type=o:width=2:g=20 ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); counthit(global.serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-blown')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af acrusher=.1:1:64:0:log ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-deep')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af atempo=4/4,asetrate=44500*2/3 ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-earrape')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af volume=12 ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-fast')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -filter:a "atempo=1.63,asetrate=44100" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-fat')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -filter:a "atempo=1.6,asetrate=22100" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-nightcore')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -filter:a atempo=1.06,asetrate=44100*1.25 ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-reverse')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -filter_complex "areverse" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-robot')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -filter_complex "afftfilt=real=hypot(re,im)*sin(0):imag=hypot(re,im)*cos(0):win_size=512:overlap=0.75" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-slow')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -filter:a "atempo=0.7,asetrate=44100" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-smooth')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -filter:v "minterpolate=mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-chipchunk')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -filter:a "atempo=0.5,asetrate=65100" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-echo')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "aecho=0.8:0.9:1000:0.3" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-vibrato')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "vibrato=f=5" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-dizzy')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "aphaser=in_gain=0.4" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-haunted')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "afftfilt=real='hypot(re,im)':imag='0'" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-tremolo')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "tremolo=f=5.0:d=0.8" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-radio')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "highpass=f=200, lowpass=f=3000" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-telephone')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "bandpass=f=1000:width_type=h:width=200" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-underwater')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "aecho=0.6:0.3:1000:0.5, lowpass=f=300" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-ghost')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "aecho=0.8:0.88:60:0.4" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-spooky')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "asetrate=44100*0.8, atempo=1.1" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-demonic')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "asetrate=44100*0.7, atempo=1.2" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-nightmare')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "afftfilt=real='hypot(re,im)*cos(0.5)':imag='hypot(re,im)*sin(0.5)'" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-alien')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "asetrate=44100*0.5, atempo=2" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'to-8d')) {
              try {
                if (!quotedMsg) throw new Error(`Mohon balas pesan audio yang ingin diubah.`);
                const mimeType = quotedMsg?.audioMessage?.mimetype;
                if (!mimeType || !mimeType.startsWith('audio/')) throw new Error(`Kirim atau balas pesan audio untuk diubah.`);
                const audio = await fn.getMediaBuffer(quotedMsg);
                if (!audio) throw new Error(`Gagal mendapatkan media.`);
                await fs.writeFile(global.filename, audio);
                await exec(`ffmpeg -i ${global.filename} -af "apulsator=hz=0.3" ${global.sendFile}`);
                await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m }); await limitAdd(serial); await counthit(serial);
                await deleteFile(global.filename); await deleteFile(global.sendFile);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "hgame"
            if (!commandFound && await getComs(txt, 'gameshop')) {
              let datax;
              try {
                datax = await fn.profilePictureUrl(serial, "image");
              } catch {
                datax = await fs.readFile('./src/image/default-dp.jpeg');
              }
              const prefix = dbSettings.rname;
              const buylimitItems = [
                { limit: 50, price: 1500 }, { limit: 100, price: 3000 }, { limit: 150, price: 4500 },
                { limit: 200, price: 6000 }, { limit: 250, price: 7500 }, { limit: 300, price: 9000 },
                { limit: 350, price: 10500 }, { limit: 400, price: 12000 }, { limit: 450, price: 13500 },
                { limit: 500, price: 15000 }, { limit: 1500, price: 150000 }, { limit: 15000, price: 1500000 },
              ];
              let text = `❏  \`\`\`G A M E S H O P\`\`\`\n`;
              for (const item of buylimitItems) {
                text += `> ${prefix}buylimit ${item.limit} [harga: $ ${item.price.toLocaleString()}]\n`;
              }
              for (const item of buylimitItems) {
                text += `> ${prefix}buylimitgame ${item.limit} [harga: $ ${item.price.toLocaleString()}]\n`;
              }
              text += `> ${prefix}buypremium [harga: $ 100.000.000.000]\n`;
              text += `> ${prefix}buyvip [harga: $ 100.000.000.000.000]\n\n`;
              text += `❏  \`\`\`N O T E\`\`\`\n`;
              text += `> premium dan vip berlaku 1bulan\n`;
              text += `> limit hanya berlaku 1 hari sampai jam 21.00 serta tunduk kepada syarat dan ketentuan penggunaan bot!\n\n`;
              text += `ketik ${prefix}rules untuk syarat dan ketentuan penggunaan bot`;
              const { buffer } = await getMyBalance(serial, pushname, datax);
              const tempFilePath = await saveFile(buffer, "gameshop", 'jpg');
              await fn.sendFilePath(toId, text, tempFilePath, { quoted: m });
              await deleteFile(tempFilePath); await counthit(serial);
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'leaderboard')) {
              try {
                if (!m.isGroup) throw new Error('This command can only be used in groups.');
                await sReply(rank()); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'level')) {
              let datax;
              try {
                datax = await fn.profilePictureUrl(serial, 'image');
              } catch {
                datax = await fs.readFile('./src/media/apatar.png');
              }
              const { buffer } = await getMyLevel(serial, pushname, datax);
              const tempFilePath = await saveFile(buffer, "rankcard", 'jpg');
              await fn.sendFilePath(toId, dbSettings.autocommand, tempFilePath, { quoted: m });
              await deleteFile(tempFilePath); await counthit(serial);
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'saldo')) {
              const datax = await fs.readFile('./src/media/apatar.png');
              getMyLevel(serial, pushname, datax).then(async (res) => {
                await sReply(`Your current balance: $` + res.balance); await counthit(serial);
              })
              commandFound = true;
            } else if (!commandFound && await getComs(txt, 'daily')) {
              try {
                if (activeGame.has(serial)) throw new Error('Kamu masih memiliki sesi game yang aktif!')
                activeGame.add(serial);
                try {
                  if (!activeGame.has(serial)) throw new Error(`Kamu masih memiliki sesi game yang aktif!`);
                  const user = dbLevels.find(u => u.id === serial);
                  if (!user) throw new Error("Kamu siapa????");
                  if (!user.gacha) throw new Error("Kamu sudah mengambil daily-claim hari ini. Tunggu hingga jam 21:00!");
                  const randomValue = Math.random();
                  let reward;
                  if (randomValue < 0.03) {
                    reward = 1000000000;
                  } else if (randomValue < 0.07) {
                    reward = 1000000;
                  } else if (randomValue < 0.65) {
                    reward = 1000 * 5;
                  } else if (randomValue < 0.95) {
                    reward = 1000 * 3;
                  } else {
                    reward = 1000;
                  }
                  user.gacha = false;
                  await sReply(`🎉 Kamu mendapatkan: ${formatNumber(reward)}!`); await addBal(user.id, reward);
                  await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'buypremium')) {
              try {
                const premiumPrice = 100000000000n;
                const premiumName = "Premium";
                const user = getScore().find(u => u.id === serial);
                if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                const userBalance = BigInt(user.balance);
                if (userBalance >= premiumPrice) {
                  if ((getPremiumPosition(serial, dbPremium))) throw new Error(`Kamu sudah menjadi anggota Premium.`);
                  await minBal(serial, premiumPrice); await addPremiumUser(serial, '30d', dbPremium); await counthit(serial);
                  const newBalance = userBalance - premiumPrice;
                  await sReply(`🎉 Selamat, @${serial.split('@')[0]}!\nAnda berhasil membeli akses ${premiumName} selama 30 hari dengan menukarkan ${formatNumber(premiumPrice)} poin.\n\n💰 Saldo akhir: ${formatNumber(newBalance)}`);
                } else {
                  await counthit(serial); throw new Error(`Poin balancemu tidak cukup untuk membeli ${premiumName}.\nButuh: ${formatNumber(premiumPrice)}\nKamu punya: ${formatNumber(userBalance)}`);
                }
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'buyvip')) {
              try {
                const vipPrice = 100000000000000n;
                const vipName = "VIP";
                const user = getScore().find(u => u.id === serial);
                if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                const userBalance = BigInt(user.balance);
                if (userBalance >= vipPrice) {
                  if ((getVIPposition(serial, dbVIP))) throw new Error("Kamu sudah menjadi anggota VIP.");
                  await minBal(serial, vipPrice); await addUserVIP(serial, '30d', dbVIP); await counthit(serial);
                  await sReply(`🎉 Selamat, @${serial.split('@')[0]}!\nAnda berhasil membeli akses ${vipName} selama 30 hari dengan menukarkan ${formatNumber(vipPrice)} poin.`);
                } else {
                  throw new Error(`Poin balancemu tidak cukup untuk membeli ${vipName}.\nButuh: ${formatNumber(vipPrice)}\nKamu punya: ${formatNumber(userBalance)}`);
                }
                commandFound = true;
              } catch (error) {
                await counthit(serial); await sReply(error.message)
              }
            } else if (!commandFound && await getPrefix(txt, 'buylimitgame')) {
              try {
                if (!arg || args.length > 1) throw new Error(`Pilihan limit tidak valid!`);
                const limitOptions = {
                  '50': 1500n, '100': 3000n, '150': 4500n, '200': 6000n,
                  '250': 7500n, '300': 9000n, '350': 10500n, '400': 12000n,
                  '450': 13500n, '500': 15000n, '1500': 150000n, '15000': 1500000n
                };
                const amountStr = args[0];
                const price = limitOptions[amountStr];
                if (!amountStr || !price) throw new Error(`Pilihan limit tidak valid! Pilih salah satu: ${Object.keys(limitOptions).join(', ')}`);
                const user = getScore().find(u => u.id === serial);
                if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                const userBalance = BigInt(user.balance);
                if (userBalance >= price) {
                  const userLimitData = dbLimitGame.limitgame.find(u => u.id === serial);
                  if (userLimitData) {
                    userLimitData.limitgame += parseInt(amountStr);
                    await dumpLimitGame();
                  } else {
                    throw new Error("Data limit Kamu tidak ditemukan.");
                  }
                  await minBal(serial, price); await counthit(serial);
                  const newBalance = userBalance - price;
                  await sReply(`🎉 Selamat, @${serial.split('@')[0]}!\nKamu berhasil membeli +${amountStr} limit dengan harga ${formatNumber(price)}.\n\n💰 Saldo akhir: ${formatNumber(newBalance)}`);
                } else {
                  throw new Error(`Poin balancemu tidak cukup.\nButuh: ${formatNumber(price)}\nKamu punya: ${formatNumber(userBalance)}`);
                }
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'buylimit')) {
              try {
                if (!arg || args.length > 1) throw new Error(`Pilihan limit tidak valid!`);
                const limitOptions = {
                  '50': 1500n, '100': 3000n, '150': 4500n, '200': 6000n,
                  '250': 7500n, '300': 9000n, '350': 10500n, '400': 12000n,
                  '450': 13500n, '500': 15000n, '1500': 150000n, '15000': 1500000n
                };
                const amountStr = args[0];
                const price = limitOptions[amountStr];
                if (!amountStr || !price) throw new Error(`Pilihan limit tidak valid! Pilih salah satu: ${Object.keys(limitOptions).join(', ')}`);
                const user = getScore().find(u => u.id === serial);
                if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                const userBalance = BigInt(user.balance);
                if (userBalance >= price) {
                  const userLimitData = dbLimits.limit.find(u => u.id === serial);
                  if (userLimitData) {
                    userLimitData.limit += parseInt(amountStr);
                    await dumpLimit();
                  } else {
                    throw new Error(`Data limit Kamu tidak ditemukan.`);
                  }
                  await minBal(serial, price); await counthit(serial);
                  const newBalance = userBalance - price;
                  await sReply(`🎉 Selamat, @${serial.split('@')[0]}!\nKamu berhasil membeli +${amountStr} limit dengan harga ${formatNumber(price)}.\n\n💰 Saldo akhir: ${formatNumber(newBalance)}`);
                } else {
                  throw new Error(`Poin balancemu tidak cukup.\nButuh: ${formatNumber(price)}\nKamu punya: ${formatNumber(userBalance)}`);
                }
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "stateless"
            if (!commandFound && await getComs(txt, 'chop')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  const earnedAmount = Math.floor(Math.random() * (500 - 1) + 1);
                  const reward = BigInt(earnedAmount);
                  await sReply('Kamu mendapatkan $' + earnedAmount + ' dari memotong rumput milik tetangga.');
                  await addXp(fn, toId, serial, m); await addBal(serial, reward); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch {
                  await counthit(serial); await reactFail();
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'fish')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  const earnedAmount = Math.floor(Math.random() * (500 - 1) + 1);
                  const reward = BigInt(earnedAmount);
                  await sReply('Kamu mendapatkan $' + earnedAmount + ' dari memancing di kolam renang? malah mancing!');
                  await addXp(fn, toId, serial, m); await addBal(serial, reward); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch {
                  await counthit(serial); await reactFail();
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) {
                await counthit(serial); await sReply(error.message)
              }
            } else if (!commandFound && await getComs(txt, 'hunt')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  const earnedAmount = Math.floor(Math.random() * (500 - 1) + 1);
                  const reward = BigInt(earnedAmount);
                  await sReply('Kamu mendapatkan $' + earnedAmount + ' dari berburu janda? walawe aku juga mau!.');
                  await addXp(fn, toId, serial, m); await addBal(serial, reward); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch {
                  await counthit(serial); await reactFail();
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) {
                await counthit(serial); await sReply(error.message)
              }
            } else if (!commandFound && await getComs(txt, 'mine')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  const earnedAmount = Math.floor(Math.random() * (500 - 1) + 1);
                  const reward = BigInt(earnedAmount);
                  await sReply('Kamu mendapatkan $' + earnedAmount + ' dari menambang di gua kenikmatan? ehh?');
                  await addXp(fn, toId, serial, m); await addBal(serial, reward); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch {
                  await counthit(serial); await reactFail();
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'ngelonte')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  const earnedAmount = Math.floor(Math.random() * (500 - 1) + 1);
                  const reward = BigInt(earnedAmount);
                  await sReply('Kamu mendapatkan $' + earnedAmount + ' dari hasil ngelonte!? ka-kamu jual diri??');
                  await addXp(fn, toId, serial, m); await addBal(serial, reward); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch {
                  await counthit(serial); await reactFail();
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'work')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  const earnedAmount = Math.floor(Math.random() * (500 - 1) + 1);
                  const reward = BigInt(earnedAmount);
                  await sReply('Kamu mendapatkan $' + earnedAmount + ' dari bekerja keras! semangat terus ya kak.:)');
                  await addXp(fn, toId, serial, m); await addBal(serial, reward); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch {
                  await counthit(serial); await reactFail();
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'dadu')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  const dirPath = './src/games/images/dice';
                  const allFiles = (await fs.readdir(dirPath)).filter(file => file.endsWith('.webp'));
                  const randomFile = allFiles[Math.floor(Math.random() * allFiles.length)];
                  const filePath = path.join(dirPath, randomFile);
                  const match = randomFile.match(/roll-(\d)\.webp/);
                  const diceValue = match ? parseInt(match[1], 10) : 1;
                  const fileBuffer = await fs.readFile(filePath);
                  await fn.sendRawWebpAsSticker(toId, fileBuffer, m);
                  if (diceValue === 6) {
                    const reward = 1500n;
                    await sPesan(`🎉 Jackpot! Kamu mendapatkan ${formatNumber(reward)} dari hasil dadu angka 6!`);
                    await addXp(fn, toId, serial, m); await addBal(serial, reward); await counthit(serial); await limitAddGame(serial);
                  } else {
                    await addXp(fn, toId, serial, m); await counthit(serial); await reactFail(); await limitAddGame(serial);
                  }
                  commandFound = true;
                } catch {
                  await sReply("Terjadi error saat memutar dadu.");
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'suit')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  if (!arg) throw new Error(`Gunakan ${dbSettings.rname}suit batu | gunting | kertas`);
                  const player = args[0].toLowerCase();
                  const valid = ["batu", "gunting", "kertas"];
                  if (!valid.includes(player)) throw new Error(`Pilihan tidak valid. Gunakan batu, gunting, atau kertas.`);
                  const bot = valid[Math.floor(Math.random() * 3)];
                  let tx = `🤖 Bot memilih: *${bot.toUpperCase()}*\n`;
                  tx += `👤 Kamu memilih: *${player.toUpperCase()}*\n\n`;
                  if (player === bot) {
                    tx += "⚖️ Hasilnya seri!";
                  } else if (
                    (player === "batu" && bot === "gunting") ||
                    (player === "gunting" && bot === "kertas") ||
                    (player === "kertas" && bot === "batu")
                  ) {
                    const rewardAmount = Math.floor(Math.random() * 349) + 1;
                    const reward = BigInt(rewardAmount);
                    await addBal(serial, reward);
                    tx += `🎉 Selamat, kamu menang dan mendapatkan +${formatNumber(reward)}!`;
                  } else {
                    tx += "😢 Sayang sekali, kamu kalah dari bot!";
                  }
                  await sReply(tx); await limitAddGame(serial);
                  await addXp(fn, toId, serial, m); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'flip')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  if (!args[0]) throw new Error(`Gunakan .flip muka | gambar`);
                  const pilihanInput = args[0].toLowerCase();
                  let pilihanPemain;
                  if (['h', 'head', 'heads', 'muka', 'depan'].includes(pilihanInput)) {
                    pilihanPemain = 'muka';
                  } else if (['t', 'tail', 'tails', 'gambar', 'belakang'].includes(pilihanInput)) {
                    pilihanPemain = 'gambar';
                  } else {
                    throw new Error("Pilihan tidak valid. Gunakan 'muka' atau 'gambar'.");
                  }
                  const bot = Math.random() < 0.5 ? 'muka' : 'gambar';
                  let tx = `🤖 Bot memilih: *${bot.toUpperCase()}*\n`;
                  tx += `👤 Kamu memilih: *${pilihanPemain.toUpperCase()}*\n\n`;
                  if (pilihanPemain === bot) {
                    const rewardAmount = Math.floor(Math.random() * 499) + 1;
                    const reward = BigInt(rewardAmount);
                    await addBal(serial, reward);
                    tx += `🎉 Selamat, kamu menang dan mendapatkan +${formatNumber(reward)}!`;
                  } else {
                    tx += "😢 Sayang sekali, kamu kalah dari bot!";
                  }
                  await sReply(tx); await limitAddGame(serial);
                  await addXp(fn, toId, serial, m); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await sReply(error.message); await counthit(serial);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) {
                await counthit(serial); await sReply(error.message);;
              }
            } else if (!commandFound && await getPrefix(txt, 'slot')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  const gameModes = {
                    easy: {
                      cost: 0,
                      count: 5,
                      rewardText: "Menang!",
                      getReward: (cost, maxSame) => {
                        if (maxSame >= 3) {
                          return Math.floor(Math.random() * (500 - 100) + 100);
                        }
                        return 0;
                      }
                    },
                    normal: {
                      cost: 2000,
                      count: 7,
                      rewardText: "Menang!",
                      getReward: (cost, maxSame) => {
                        if (maxSame >= 7) return Math.floor(cost * 3);
                        if (maxSame >= 5) return Math.floor(cost * 2.5);
                        if (maxSame >= 3) return Math.floor(cost * 2.3);
                        return 0;
                      }
                    },
                    hard: {
                      cost: 20000,
                      count: 10,
                      rewardText: "Menang!",
                      getReward: (cost, maxSame) => {
                        if (maxSame >= 10) return Math.floor(cost * 4);
                        if (maxSame >= 7) return Math.floor(cost * 2.7);
                        if (maxSame >= 5) return Math.floor(cost * 2.5);
                        return 0;
                      }
                    },
                    extreme: {
                      cost: 200000,
                      count: 20,
                      rewardText: "Menang!",
                      getReward: (cost, maxSame) => {
                        if (maxSame >= 20) return Math.floor(cost * 10);
                        if (maxSame >= 13) return Math.floor(cost * 4.7);
                        if (maxSame >= 10) return Math.floor(cost * 4.5);
                        if (maxSame >= 7) return Math.floor(cost * 4.3);
                        return 0;
                      }
                    }
                  };
                  if (args.length > 1) throw new Error("pesan tidak valid, contoh: .slot, .slot normal, .slot extreme");
                  const mode = args[0] ? args[0].toLowerCase() : 'easy';
                  const config = gameModes[mode];
                  if (!config) throw new Error(`Mode "${mode}" tidak ditemukan. Pilihan: easy, normal, hard, extreme.`);
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = user ? BigInt(user.balance) : 0n;
                  if (saldoAwal < BigInt(config.cost)) throw new Error(`Saldomu tidak cukup untuk bermain mode ${mode} (butuh ${formatNumber(config.cost)}).`);
                  let { key } = await sReply('🎰 Slot Machine🎰\n⏳ Rolling...');
                  const slotSymbols = ['💎', '❄️', '☠️', '⚡', '❤️'];
                  const rollResult = [];
                  let display = `🎰 Slot Machine 🎰\n`;
                  for (let i = 0; i < config.count; i++) {
                    const rand = Math.floor(Math.random() * slotSymbols.length);
                    rollResult.push(slotSymbols[rand]);
                    if (i % 1 === 0 || i === config.count - 1) {
                      await fn.sendReply(toId, display + rollResult.join(' '), { edit: key });
                      await delay(500);
                    }
                  }
                  const counts = {};
                  for (let icon of rollResult) {
                    counts[icon] = (counts[icon] || 0) + 1;
                  }
                  const maxSame = Object.values(counts).length > 0 ? Math.max(...Object.values(counts)) : 0;
                  const biayaMain = BigInt(config.cost);
                  const hadiah = BigInt(config.getReward(config.cost, maxSame));
                  const selisih = hadiah - biayaMain;
                  if (selisih !== 0n) {
                    await addBal(serial, selisih);
                  }
                  const saldoAkhir = saldoAwal + selisih;
                  let finalText = `🎰 Slot Machine 🎰\n` + rollResult.join(' ') + '\n\n';
                  finalText += `🔎 » *${maxSame}* Repetisi Symbols\n`;
                  if (hadiah > 0n) {
                    finalText += `🎉 ${config.rewardText} Reward: (+${formatNumber(hadiah)})\n`;
                    if (config.cost > 0) {
                      finalText += `💰 You Get: ${selisih >= 0 ? '+' : ''}${formatNumber(selisih)}\n\n`;
                    }
                  } else {
                    finalText += `😢 Nice Try!\n`;
                    if (config.cost > 0) {
                      finalText += `💸 You Lost: -${formatNumber(config.cost)}\n\n`;
                    }
                  }
                  finalText += `💰 Saldo akhir: ${formatNumber(saldoAkhir)}`;
                  await delay(1500); fn.sendReply(toId, finalText, { edit: key });
                  await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'spin')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  if (args.length > 1) throw new Error("pesan tidak valid, contoh: .spin 10k, .spin all, .spin 50%");
                  let bi0 = args[0] ? args[0].toLowerCase() : '';
                  if (!bi0) throw new Error("Masukkan jumlah taruhan, contoh: .spin 10k, .spin all, .spin 50%");
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance);
                  let bid = 0n;
                  if (bi0 === 'all' || bi0 === 'allin') {
                    bid = saldoAwal;
                  } else if (bi0.endsWith('%')) {
                    const sanitizedPercent = bi0.replace(',', '.');
                    const percentValue = parseFloat(sanitizedPercent.replace('%', ''));
                    if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) throw new Error("Input persen tidak valid (1-100).");
                    bid = (saldoAwal * BigInt(Math.floor(percentValue * 100))) / 10000n;
                  } else {
                    let multiplier = 1n;
                    let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitizedNumPart = numPart.replace(',', '.');
                    const numValue = Number(sanitizedNumPart);
                    if (isNaN(numValue) || !isFinite(numValue) || numValue <= 0) throw new Error("Input jumlah taruhan tidak valid. Gunakan format seperti: 50k, 1.5m, 2,2t");
                    if (sanitizedNumPart.includes('.')) {
                      const parts = sanitizedNumPart.split('.');
                      const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces;
                      const numberWithoutDecimal = BigInt(sanitizedNumPart.replace('.', ''));
                      bid = (numberWithoutDecimal * multiplier) / divisor;
                    } else {
                      bid = BigInt(sanitizedNumPart) * multiplier;
                    }
                  }
                  if (bid <= 0n) throw new Error("Jumlah taruhan harus lebih dari 0.");
                  if (saldoAwal < bid) throw new Error(`😅 Saldo tidak cukup. Kamu perlu: ${formatNumber(bid)}`);
                  const slotItems = ['🍒', '🍊', '🍇', '🍉', '🍋', '🔔', '❄️', '💎', '☠️', ' 7️⃣'];
                  const rolls = [];
                  for (let i = 0; i < 3; i++) {
                    rolls.push(slotItems[Math.floor(Math.random() * slotItems.length)]);
                  }
                  const [a, b, c] = rolls;
                  let reward = 0n;
                  let winType = "";
                  let multiplier;
                  if (a === ' 7️⃣' && b === ' 7️⃣' && c === ' 7️⃣') {
                    multiplier = 10n
                    reward = bid * multiplier;
                    winType = "Jackpot 777!";
                  } else if (a === '💎' && b === '💎' && c === '💎') {
                    multiplier = 7n
                    reward = bid * multiplier;
                    winType = "Jackpot Diamond!";
                  } else if (a === b && b === c) {
                    multiplier = 4n
                    reward = bid * multiplier;
                    winType = "TRIPLE!";
                  } else if (a === b || b === c || a === c) {
                    multiplier = 2n
                    reward = bid * multiplier;
                    winType = "DOUBLE!";
                  }
                  const selisih = reward - bid;
                  await addBal(serial, selisih);
                  const saldoAkhir = saldoAwal + selisih;
                  let resultText = `🎰 Spin Machine 🎰\n${a} ${b} ${c}\n\n`;
                  if (reward > 0) {
                    resultText += `🎉 *${winType}* 🎉\n😍 WIn: +${formatNumber(bid)} x${multiplier}`;
                  } else {
                    resultText += `😢 Lost: -${formatNumber(bid)}`;
                  }
                  resultText += `\n💰 Saldo akhir: ${formatNumber(saldoAkhir)}`;
                  await sReply(resultText); await limitAddGame(serial);
                  await addXp(fn, toId, serial, m); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'aduq')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  if (args.length > 1) throw new Error("Pesan tidak valid, contoh: .aduq 10k, .aduq all, .aduq 50%");
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance);
                  let bi0 = args[0] ? args[0].toLowerCase() : '';
                  if (!bi0) throw new Error("Masukkan jumlah taruhan, contoh: .aduq 10k, .aduq all, .aduq 50%");
                  let bid = 0n;
                  if (bi0 === 'all' || bi0 === 'allin') {
                    bid = saldoAwal;
                  } else if (bi0.endsWith('%')) {
                    const sanitizedPercent = bi0.replace(',', '.');
                    const percentValue = parseFloat(sanitizedPercent.replace('%', ''));
                    if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) throw new Error("Input persen tidak valid (1-100).");
                    bid = (saldoAwal * BigInt(Math.floor(percentValue * 100))) / 10000n;
                  } else {
                    let multiplier = 1n;
                    let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitizedNumPart = numPart.replace(',', '.');
                    const numValue = Number(sanitizedNumPart);
                    if (isNaN(numValue) || !isFinite(numValue) || numValue <= 0) throw new Error("Input jumlah taruhan tidak valid. Gunakan format seperti: 50k, 1.5m, 2,2t");
                    if (sanitizedNumPart.includes('.')) {
                      const parts = sanitizedNumPart.split('.');
                      const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces;
                      const numberWithoutDecimal = BigInt(sanitizedNumPart.replace('.', ''));
                      bid = (numberWithoutDecimal * multiplier) / divisor;
                    } else {
                      bid = BigInt(sanitizedNumPart) * multiplier;
                    }
                  }
                  if (bid <= 0n) throw new Error("Jumlah taruhan harus lebih dari 0.");
                  if (saldoAwal < bid) throw new Error(`😅 Saldo tidak cukup. Kamu perlu: ${formatNumber(bid)}`);
                  let { key } = await sReply(`🀄 *ADUQ* 🀄\nAnda bertaruh sebesar ${formatNumber(bid)}.\n\nMengocok kartu domino...`)
                  const createDominoDeck = () => {
                    let deck = [];
                    for (let i = 0; i <= 6; i++) {
                      for (let j = i; j <= 6; j++) {
                        deck.push({ a: i, b: j, isBalak: i === j });
                      }
                    }
                    return deck.sort(() => Math.random() - 0.5);
                  };
                  const getHandValue = (hand) => (hand[0].a + hand[0].b + hand[1].a + hand[1].b) % 10;
                  const getHighestBalakValue = (hand) => {
                    let highest = -1;
                    if (hand[0].isBalak) highest = Math.max(highest, hand[0].a);
                    if (hand[1].isBalak) highest = Math.max(highest, hand[1].a);
                    return highest;
                  };
                  const formatDominoHand = (hand) => hand.map(c => `[${c.a}|${c.b}]`).join(' ');
                  let deck = createDominoDeck();
                  const playerHand = [deck.pop(), deck.pop()];
                  const botHand = [deck.pop(), deck.pop()];
                  const playerValue = getHandValue(playerHand);
                  const botValue = getHandValue(botHand);
                  let winner = null;
                  if (playerValue > botValue) {
                    winner = 'player';
                  } else if (botValue > playerValue) {
                    winner = 'bot';
                  } else {
                    const playerBalak = getHighestBalakValue(playerHand);
                    const botBalak = getHighestBalakValue(botHand);
                    if (playerBalak > botBalak) {
                      winner = 'player';
                    } else if (botBalak > playerBalak) {
                      winner = 'bot';
                    } else {
                      winner = 'push';
                    }
                  }
                  let selisih = 0n;
                  let winText = "";
                  if (winner === 'player') {
                    selisih = bid;
                    winText = `🎉 *Kamu Menang!* 🎉\nKeuntungan bersih: +${formatNumber(selisih)}`;
                  } else if (winner === 'bot') {
                    selisih = -bid;
                    winText = `😢 *Kamu Kalah.* 😢\nKerugian: -${formatNumber(bid)}`;
                  } else {
                    selisih = 0n;
                    winText = `⚖️ *Seri!* ⚖️\nTaruhan Kamu sebesar ${formatNumber(bid)} dikembalikan.`;
                  }
                  if (selisih !== 0n) {
                    await addBal(serial, selisih);
                  }
                  const saldoAkhir = saldoAwal + selisih;
                  let hasil = `🀄 *ADUQ* 🀄\n\n`;
                  hasil += `Tangan Kamu: ${formatDominoHand(playerHand)} (Nilai: *${playerValue}*)\n`;
                  hasil += `Tangan Bot: ${formatDominoHand(botHand)} (Nilai: *${botValue}*)\n\n`;
                  hasil += `${winText}\n\n`;
                  hasil += `💰 Saldo Akhir: ${formatNumber(saldoAkhir)}`;
                  await delay(1000);
                  await fn.sendReply(toId, hasil, { edit: key }); await limitAddGame(serial);
                  await addXp(fn, toId, serial, m); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'baccarat')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  if (args.length > 2) throw new Error("Pesan tidak valid, contoh: .baccarat 10k banker, .baccarat all tie, .baccarat 50% player");
                  const PilihanTaruhan = args[1] ? args[1].toLowerCase() : '';
                  if (!['player', 'banker', 'tie'].includes(PilihanTaruhan)) throw new Error("Format salah! Pilih taruhan: player, banker, atau tie.\nContoh: .baccarat 1k player");
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance);
                  let bi0 = args[0] ? args[0].toLowerCase() : '';
                  if (!bi0) throw new Error("Masukkan jumlah taruhan.");
                  let bid = 0n;
                  if (bi0 === 'all' || bi0 === 'allin') {
                    bid = saldoAwal;
                  } else if (bi0.endsWith('%')) {
                    const sanitizedPercent = bi0.replace(',', '.');
                    const percentValue = parseFloat(sanitizedPercent.replace('%', ''));
                    if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) throw new Error("Input persen tidak valid (1-100).");
                    bid = (saldoAwal * BigInt(Math.floor(percentValue * 100))) / 10000n;
                  } else {
                    let multiplier = 1n;
                    let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitizedNumPart = numPart.replace(',', '.');
                    const numValue = Number(sanitizedNumPart);
                    if (isNaN(numValue) || !isFinite(numValue) || numValue <= 0) throw new Error("Input jumlah taruhan tidak valid. Gunakan format seperti: 50k, 1.5m, 2,2t");
                    if (sanitizedNumPart.includes('.')) {
                      const parts = sanitizedNumPart.split('.');
                      const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces;
                      const numberWithoutDecimal = BigInt(sanitizedNumPart.replace('.', ''));
                      bid = (numberWithoutDecimal * multiplier) / divisor;
                    } else {
                      bid = BigInt(sanitizedNumPart) * multiplier;
                    }
                  }
                  if (bid <= 0n) throw new Error("Jumlah taruhan harus lebih dari 0.");
                  if (saldoAwal < bid) throw new Error(`😅 Saldo tidak cukup. Kamu perlu: ${formatNumber(bid)}`);
                  let { key } = await sReply(`🂡 *BACCARAT* 🂡\nAnda bertaruh ${formatNumber(bid)} pada *${PilihanTaruhan.toUpperCase()}*.\n\n⏳ Membagikan kartu...`)
                  const suits = ['♠️', '♥️', '♦️', '♣️'];
                  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
                  let deck = [];
                  for (let i = 0; i < 4; i++) {
                    for (const suit of suits) {
                      for (const rank of ranks) {
                        deck.push({ rank, suit });
                      }
                    }
                  }
                  deck.sort(() => Math.random() - 0.5);
                  const getCardValue = (card) => {
                    if (['10', 'J', 'Q', 'K'].includes(card.rank)) return 0;
                    if (card.rank === 'A') return 1;
                    return parseInt(card.rank);
                  };
                  const calculateHandValue = (hand) => {
                    return hand.reduce((sum, card) => sum + getCardValue(card), 0) % 10;
                  };
                  const drawCard = () => deck.pop();
                  const formatHand = (hand) => hand.map(c => `[${c.rank}${c.suit}]`).join(' ');
                  let playerHand = [drawCard(), drawCard()];
                  let bankerHand = [drawCard(), drawCard()];
                  let playerValue = calculateHandValue(playerHand);
                  let bankerValue = calculateHandValue(bankerHand);
                  let playerThirdCard = null;
                  let log = `Tangan Awal:\n`;
                  log += `> Player: ${formatHand(playerHand)} (Total: ${playerValue})\n`;
                  log += `> Banker: ${formatHand(bankerHand)} (Total: ${bankerValue})\n\n`;
                  if (playerValue < 8 && bankerValue < 8) {
                    if (playerValue <= 5) {
                      playerThirdCard = drawCard();
                      playerHand.push(playerThirdCard);
                      playerValue = calculateHandValue(playerHand);
                      log += `Player menarik kartu ketiga: ${formatHand([playerThirdCard])}\n`;
                    } else {
                      log += `Player bertahan (stand).\n`;
                    }
                    const playerDrew = !!playerThirdCard;
                    let bankerDraws = false;
                    if (!playerDrew) {
                      if (bankerValue <= 5) bankerDraws = true;
                    } else {
                      const p3Value = getCardValue(playerThirdCard);
                      if (bankerValue <= 2) bankerDraws = true;
                      else if (bankerValue === 3 && p3Value !== 8) bankerDraws = true;
                      else if (bankerValue === 4 && p3Value >= 2 && p3Value <= 7) bankerDraws = true;
                      else if (bankerValue === 5 && p3Value >= 4 && p3Value <= 7) bankerDraws = true;
                      else if (bankerValue === 6 && p3Value >= 6 && p3Value <= 7) bankerDraws = true;
                    }
                    if (bankerDraws) {
                      const bankerThirdCard = drawCard();
                      bankerHand.push(bankerThirdCard);
                      bankerValue = calculateHandValue(bankerHand);
                      log += `Banker menarik kartu ketiga: ${formatHand([bankerThirdCard])}\n`;
                    } else {
                      log += `Banker bertahan (stand).\n`;
                    }
                  } else {
                    log += "Natural Win! Permainan berhenti.\n";
                  }
                  let pemenang = '';
                  if (playerValue > bankerValue) pemenang = 'player';
                  else if (bankerValue > playerValue) pemenang = 'banker';
                  else pemenang = 'tie';
                  let reward = 0n;
                  let multiplierText = "";
                  let menang = (PilihanTaruhan === pemenang);
                  if (menang) {
                    if (pemenang === 'player') {
                      reward = bid;
                      multiplierText = "(Payout 1:1)";
                    } else if (pemenang === 'banker') {
                      reward = (bid * 95n) / 100n;
                      multiplierText = "(Payout 0.95:1, 5% Komisi)";
                    } else if (pemenang === 'tie') {
                      reward = bid * 8n;
                      multiplierText = "(Payout 8:1)";
                    }
                  }
                  const selisih = menang ? reward : -bid;
                  await addBal(serial, selisih);
                  const saldoAkhir = saldoAwal + selisih;
                  let hasil = `🂡 *BACCARAT* 🂡\n\n`;
                  hasil += `${log}\n`;
                  hasil += `Hasil Akhir:\n`;
                  hasil += `> Player: ${formatHand(playerHand)} (Total: *${playerValue}*)\n`;
                  hasil += `> Banker: ${formatHand(bankerHand)} (Total: *${bankerValue}*)\n\n`;
                  hasil += `Pemenangnya adalah *${pemenang.toUpperCase()}*!\n\n`;
                  if (menang) {
                    hasil += `✅ Selamat, taruhanmu pada "${PilihanTaruhan.toUpperCase()}" menang!\n`;
                    hasil += `Taruhan Kamu: ${formatNumber(bid)}\n`;
                    hasil += `Payout: ${multiplierText}\n`;
                    hasil += `Keuntungan Bersih: *+${formatNumber(reward)}*\n`;
                  } else {
                    hasil += `❌ Sayang sekali, taruhanmu pada "${PilihanTaruhan}" kalah.\n`;
                    hasil += `💸 Kamu kehilangan: -${formatNumber(bid)}\n`;
                  }
                  hasil += `\n💰 Saldo Akhir: ${formatNumber(saldoAkhir)}`;
                  await delay(1000);
                  await fn.sendReply(toId, hasil, { edit: key }); await limitAddGame(serial);
                  await addXp(fn, toId, serial, m); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'bid')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance);
                  let bi0 = args[0] ? args[0].toLowerCase() : '';
                  if (!bi0) throw new Error("Masukkan jumlah taruhan. Contoh: .bid 1k big");
                  let bid = 0n;
                  let isAllIn = false;
                  let isPercent = false;
                  if (bi0 === 'all' || bi0 === 'allin') {
                    isAllIn = true;
                  } else if (bi0.endsWith('%')) {
                    isPercent = true;
                  } else {
                    let multiplier = 1n;
                    let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitizedNumPart = numPart.replace(',', '.');
                    const numValue = Number(sanitizedNumPart);
                    if (isNaN(numValue) || !isFinite(numValue) || numValue <= 0) throw new Error("Input jumlah taruhan tidak valid. Gunakan format seperti: 50k, 1.5m, 2,2t");
                    if (sanitizedNumPart.includes('.')) {
                      const parts = sanitizedNumPart.split('.');
                      const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces;
                      const numberWithoutDecimal = BigInt(sanitizedNumPart.replace('.', ''));
                      bid = (numberWithoutDecimal * multiplier) / divisor;
                    } else {
                      bid = BigInt(sanitizedNumPart) * multiplier;
                    }
                  }
                  const taruhanInput = q.substring(bi0.length).trim();
                  if (!taruhanInput) throw new Error("Format salah! Pilih taruhan setelah jumlah bid (Contoh: big, small, 5, 2-7, >8).");
                  const taruhanData = taruhanInput.split(/[, ]+/).filter(a => a.trim() !== '');
                  if (taruhanData.length === 0) throw new Error("Pilihan taruhan tidak boleh kosong.");
                  let taruhanList = [];
                  taruhanData.forEach(item => {
                    const cleanedItem = item.toLowerCase();
                    if (cleanedItem.includes('-')) {
                      let [start, end] = cleanedItem.split('-').map(n => parseInt(n.trim(), 10));
                      if (!isNaN(start) && !isNaN(end) && start <= end && start >= 1 && end <= 12) {
                        for (let i = start; i <= end; i++) taruhanList.push(i.toString());
                      }
                    } else if (cleanedItem.includes('>')) {
                      let min = parseInt(cleanedItem.replace('>', ''), 10);
                      if (!isNaN(min) && min < 12) {
                        for (let i = min + 1; i <= 12; i++) taruhanList.push(i.toString());
                      }
                    } else if (cleanedItem.includes('<')) {
                      let max = parseInt(cleanedItem.replace('<', ''), 10);
                      if (!isNaN(max) && max > 1) {
                        for (let i = 1; i < max; i++) taruhanList.push(i.toString());
                      }
                    } else if (["big", "small", "besar", "kecil"].includes(cleanedItem)) {
                      taruhanList.push(cleanedItem);
                    } else {
                      const num = parseInt(cleanedItem, 10);
                      if (!isNaN(num) && num >= 1 && num <= 12) {
                        taruhanList.push(num.toString());
                      }
                    }
                  });
                  taruhanList = [...new Set(taruhanList)];
                  if (taruhanList.length === 0) throw new Error("Tidak ada taruhan valid yang ditemukan.");
                  const hasBig = taruhanList.includes('big') || taruhanList.includes('besar');
                  const hasSmall = taruhanList.includes('small') || taruhanList.includes('kecil');
                  const hasNumericBet = taruhanList.some(t => !isNaN(parseInt(t, 10)));
                  if ((hasBig || hasSmall) && hasNumericBet) throw new Error("Dilarang mencampur taruhan 'big'/'small' dengan taruhan angka spesifik.");
                  if (hasBig && hasSmall) throw new Error("Dilarang bertaruh pada 'big' dan 'small' secara bersamaan.");
                  const totalTaruhan = BigInt(taruhanList.length);
                  let tot = 0n;
                  if (isAllIn) {
                    if (totalTaruhan > 1n) throw new Error("'all' hanya bisa digunakan untuk 1 jenis taruhan.");
                    bid = saldoAwal;
                    tot = saldoAwal;
                  } else if (isPercent) {
                    const sanitizedPercent = bi0.replace(',', '.');
                    const percentValue = parseFloat(sanitizedPercent.replace('%', ''));
                    if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) throw new Error("Input persen tidak valid (1-100).");
                    let totalPercent = (saldoAwal * BigInt(Math.floor(percentValue * 100))) / 10000n;
                    if (totalPercent === 0n) throw new Error("Jumlah taruhan dari persentase terlalu kecil.");
                    bid = totalPercent / totalTaruhan;
                    if (bid === 0n) throw new Error(`Jumlah taruhan per bet terlalu kecil, coba naikkan persentase.`);
                    tot = bid * totalTaruhan;
                  } else {
                    tot = bid * totalTaruhan;
                  }
                  if (saldoAwal < tot) throw new Error(`😅 Saldo tidak cukup. Kamu perlu: ${formatNumber(tot)}`);
                  if (tot <= 0n) throw new Error("Jumlah total taruhan harus lebih dari 0.");
                  let betInfo = `🎲 Taruhan: ${taruhanList.join(', ')}\n💰 Bet per taruhan: ${formatNumber(bid)}\n💸 Total bet: ${formatNumber(tot)}\n\n⏳ Memutar dadu...`;
                  let { key } = await sReply(betInfo);
                  const dice1 = Math.floor(Math.random() * 6) + 1;
                  const dice2 = Math.floor(Math.random() * 6) + 1;
                  const totalDice = dice1 + dice2;
                  let hasil = `🎲 Dadu A: ${dice1} | 🎲 Dadu B: ${dice2}\n✨ Total: *${totalDice}*\n\n`;
                  let totalReward = 0n;
                  taruhanList.forEach(taruhan => {
                    let menang = false;
                    let multiplier = 0.0;
                    const isBig = taruhan === 'big' || taruhan === 'besar';
                    const isSmall = taruhan === 'small' || taruhan === 'kecil';
                    const numTaruhan = parseInt(taruhan, 10);
                    if (isBig && totalDice > 7) {
                      menang = true;
                      multiplier = 2;
                    } else if (isSmall && totalDice < 7) {
                      menang = true;
                      multiplier = 2;
                    } else if (!isNaN(numTaruhan) && totalDice === numTaruhan) {
                      menang = true;
                      multiplier = (taruhanList.length === 1) ? 10.0 : 2;
                    }
                    if (menang) {
                      const reward = (bid * BigInt(Math.floor(multiplier * 10))) / 10n;
                      totalReward += reward;
                      hasil += `✅ "${taruhan}" » ${formatNumber(bid)} x${multiplier.toFixed(1)}\n`;
                    } else {
                      hasil += `❌ "${taruhan}" » -${formatNumber(bid)}\n`;
                    }
                  });
                  const selisih = totalReward - tot;
                  await addBal(serial, selisih);
                  const saldoAkhir = saldoAwal + selisih;
                  hasil += `\n💰 Saldo Akhir: ${formatNumber(saldoAkhir)}`;
                  await delay(1000);
                  await fn.sendReply(toId, hasil, { edit: key }); await limitAddGame(serial);
                  await addXp(fn, toId, serial, m); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'roll')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance);
                  let bi0 = args[0] ? args[0].toLowerCase() : '';
                  if (!bi0) throw new Error("Masukkan jumlah taruhan. Contoh: .roll 1k red");
                  let bid = 0n;
                  let isAllIn = false;
                  let isPercent = false;
                  if (bi0 === 'all' || bi0 === 'allin') {
                    isAllIn = true;
                  } else if (bi0.endsWith('%')) {
                    isPercent = true;
                  } else {
                    let multiplier = 1n;
                    let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitizedNumPart = numPart.replace(',', '.');
                    const numValue = Number(sanitizedNumPart);
                    if (isNaN(numValue) || !isFinite(numValue) || numValue <= 0) throw new Error("Input jumlah taruhan tidak valid. Gunakan format seperti: 1k, 50k, 1.5m, 2,2t");
                    if (sanitizedNumPart.includes('.')) {
                      const parts = sanitizedNumPart.split('.');
                      const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces;
                      const numberWithoutDecimal = BigInt(sanitizedNumPart.replace('.', ''));
                      bid = (numberWithoutDecimal * multiplier) / divisor;
                    } else {
                      bid = BigInt(sanitizedNumPart) * multiplier;
                    }
                  }
                  const taruhanInput = q.substring(bi0.length).trim();
                  if (!taruhanInput) throw new Error("Format salah! Pilih taruhan setelah jumlah bid.\nContoh: .roll 1k red, 25, 5-10");
                  const taruhanData = taruhanInput.split(/[, ]+/).filter(a => a.trim() !== '');
                  if (taruhanData.length === 0) throw new Error("Pilihan taruhan tidak boleh kosong.");
                  const validKeywords = new Set(['red', 'merah', 'black', 'hitam', 'green', 'hijau', 'odd', 'ganjil', 'even', 'genap']);
                  let taruhanList = [];
                  taruhanData.forEach(item => {
                    const cleanedItem = item.toLowerCase();
                    if (validKeywords.has(cleanedItem)) {
                      taruhanList.push(cleanedItem);
                    } else if (/^\d+$/.test(cleanedItem) && parseInt(cleanedItem) >= 0 && parseInt(cleanedItem) <= 36) {
                      taruhanList.push(cleanedItem);
                    } else if (cleanedItem.includes('-')) {
                      let [start, end] = cleanedItem.split('-').map(n => parseInt(n.trim(), 10));
                      if (!isNaN(start) && !isNaN(end) && start <= end && start > 0 && end <= 36) {
                        for (let i = start; i <= end; i++) taruhanList.push(i.toString());
                      }
                    } else if (cleanedItem.startsWith('>')) {
                      let min = parseInt(cleanedItem.slice(1), 10);
                      if (!isNaN(min) && min < 36 && min > 0) {
                        for (let i = min + 1; i <= 36; i++) taruhanList.push(i.toString());
                      }
                    } else if (cleanedItem.startsWith('<')) {
                      let max = parseInt(cleanedItem.slice(1), 10);
                      if (!isNaN(max) && max > 1 && max <= 36) {
                        for (let i = 1; i < max; i++) taruhanList.push(i.toString());
                      }
                    }
                  });
                  taruhanList = [...new Set(taruhanList)];
                  if (taruhanList.length === 0) throw new Error("Tidak ada taruhan valid yang ditemukan.");
                  const betSet = new Set(taruhanList);
                  if ((betSet.has('red') || betSet.has('merah')) && (betSet.has('black') || betSet.has('hitam'))) throw new Error("Dilarang bertaruh pada 'red' dan 'black' bersamaan.");
                  if ((betSet.has('red') || betSet.has('merah') || betSet.has('black') || betSet.has('hitam')) && (betSet.has('green') || betSet.has('hijau'))) throw new Error("Dilarang bertaruh pada 'red/black' dan 'green' bersamaan.");
                  if ((betSet.has('odd') || betSet.has('ganjil')) && (betSet.has('even') || betSet.has('genap'))) throw new Error("Dilarang bertaruh pada 'odd' dan 'even' bersamaan.");
                  if (betSet.has('0') && taruhanList.length > 1) throw new Error("Taruhan '0' hanya boleh 1 angka saja.");
                  const totalTaruhan = BigInt(taruhanList.length);
                  let tot = 0n;
                  if (isAllIn) {
                    if (totalTaruhan > 1n) throw new Error("'all' hanya untuk 1 jenis taruhan.");
                    bid = saldoAwal; tot = saldoAwal;
                  } else if (isPercent) {
                    const sanitizedPercent = bi0.replace(',', '.');
                    const percentValue = parseFloat(sanitizedPercent.replace('%', ''));
                    if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) throw new Error("Input persen tidak valid (1-100).");
                    let totalPercent = (saldoAwal * BigInt(Math.floor(percentValue * 100))) / 10000n;
                    if (totalPercent === 0n) throw new Error("Jumlah taruhan dari persentase terlalu kecil.");
                    bid = totalPercent / totalTaruhan;
                    if (bid === 0n) throw new Error(`Jumlah taruhan per bet terlalu kecil.`);
                    tot = bid * totalTaruhan;
                  } else {
                    tot = bid * totalTaruhan;
                  }
                  if (saldoAwal < tot) throw new Error(`😅 Saldo tidak cukup. Kamu perlu: ${formatNumber(tot)}`);
                  if (tot <= 0n) throw new Error("Jumlah total taruhan harus lebih dari 0.");
                  let betInfo = `Taruhan: ${taruhanList.join(', ')}\n💰 Bet per taruhan: ${formatNumber(bid)}\n💸 Total bet: ${formatNumber(tot)}\n\n⏳ Roda berputar...`;
                  let { key } = await sReply(betInfo);
                  const ROULETTE_POCKETS = [
                    { num: 0, color: 'green' }, { num: 1, color: 'red' }, { num: 2, color: 'black' }, { num: 3, color: 'red' }, { num: 4, color: 'black' },
                    { num: 5, color: 'red' }, { num: 6, color: 'black' }, { num: 7, color: 'red' }, { num: 8, color: 'black' }, { num: 9, color: 'red' },
                    { num: 10, color: 'black' }, { num: 11, color: 'black' }, { num: 12, color: 'red' }, { num: 13, color: 'black' }, { num: 14, color: 'red' },
                    { num: 15, color: 'black' }, { num: 16, color: 'red' }, { num: 17, color: 'black' }, { num: 18, color: 'red' }, { num: 19, color: 'red' },
                    { num: 20, color: 'black' }, { num: 21, color: 'red' }, { num: 22, color: 'black' }, { num: 23, color: 'red' }, { num: 24, color: 'black' },
                    { num: 25, color: 'red' }, { num: 26, color: 'black' }, { num: 27, color: 'red' }, { num: 28, color: 'black' }, { num: 29, color: 'black' },
                    { num: 30, color: 'red' }, { num: 31, color: 'black' }, { num: 32, color: 'red' }, { num: 33, color: 'black' }, { num: 34, color: 'red' },
                    { num: 35, color: 'black' }, { num: 36, color: 'red' }
                  ];
                  const winningPocket = ROULETTE_POCKETS[Math.floor(Math.random() * ROULETTE_POCKETS.length)];
                  const winningNumber = winningPocket.num;
                  const winningColor = winningPocket.color;
                  let hasil = `Angka Keluar: *${winningNumber} ${winningColor.charAt(0).toUpperCase() + winningColor.slice(1)}*\n\n`;
                  let totalReward = 0n;
                  taruhanList.forEach(taruhan => {
                    let menang = false;
                    let multiplier = 0;
                    const num = parseInt(taruhan, 10);
                    if (!isNaN(num)) {
                      if (num === winningNumber) {
                        menang = true;
                        if (num === 0 && taruhanList.length === 1) {
                          multiplier = 3600;
                        } else if (taruhanList.length === 1) {
                          multiplier = 18;
                        } else {
                          multiplier = 1.8;
                        }
                      }
                    } else if (taruhan === 'red' || taruhan === 'merah') {
                      if (winningColor === 'red') { menang = true; multiplier = 2; }
                    } else if (taruhan === 'black' || taruhan === 'hitam') {
                      if (winningColor === 'black') { menang = true; multiplier = 2; }
                    } else if (taruhan === 'even' || taruhan === 'genap') {
                      if (winningNumber !== 0 && winningNumber % 2 === 0) { menang = true; multiplier = 2; }
                    } else if (taruhan === 'odd' || taruhan === 'ganjil') {
                      if (winningNumber !== 0 && winningNumber % 2 !== 0) { menang = true; multiplier = 2; }
                    }
                    if (menang) {
                      const finalMultiplier = Math.floor(multiplier * 100) / 100;
                      const reward = (bid * BigInt(Math.floor(finalMultiplier * 100))) / 100n;
                      totalReward += reward;
                      hasil += `✅ "${taruhan}" » ${formatNumber(bid)} x${finalMultiplier.toFixed(2)} » +${formatNumber(reward)}\n`;
                    } else {
                      hasil += `❌ "${taruhan}" » -${formatNumber(bid)}\n`;
                    }
                  });
                  const selisih = totalReward - tot;
                  await addBal(serial, selisih);
                  const saldoAkhir = saldoAwal + selisih;
                  hasil += `\n💰 Saldo Akhir: ${formatNumber(saldoAkhir)}`;
                  await delay(1000);
                  await fn.sendReply(toId, hasil, { edit: key }); await limitAddGame(serial);
                  await addXp(fn, toId, serial, m); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'totobet')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  if (args.length < 3) throw new Error("Format salah!\n\nContoh:\n.totobet 1k 4D 1234\n.totobet 1k 2D 56\n.totobet 1k colok 8");
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance);
                  let bi0 = args[0] ? args[0].toLowerCase() : '';
                  if (!bi0) throw new Error("Masukkan jumlah taruhan.");
                  let bid = 0n;
                  if (bi0 === 'all' || bi0 === 'allin') {
                    bid = saldoAwal;
                  } else if (bi0.endsWith('%')) {
                    const sanitizedPercent = bi0.replace(',', '.');
                    const percentValue = parseFloat(sanitizedPercent.replace('%', ''));
                    if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) throw new Error("Input persen tidak valid (1-100).");
                    bid = (saldoAwal * BigInt(Math.floor(percentValue * 100))) / 10000n;
                  } else {
                    let multiplier = 1n;
                    let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitizedNumPart = numPart.replace(',', '.');
                    const numValue = Number(sanitizedNumPart);
                    if (isNaN(numValue) || !isFinite(numValue) || numValue <= 0) throw new Error("Input jumlah taruhan tidak valid. Gunakan format seperti: 50k, 1.5m, 2,2t");
                    if (sanitizedNumPart.includes('.')) {
                      const parts = sanitizedNumPart.split('.');
                      const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces;
                      const numberWithoutDecimal = BigInt(sanitizedNumPart.replace('.', ''));
                      bid = (numberWithoutDecimal * multiplier) / divisor;
                    } else {
                      bid = BigInt(sanitizedNumPart) * multiplier;
                    }
                  }
                  if (bid <= 0n) throw new Error("Jumlah taruhan harus lebih dari 0.");
                  if (saldoAwal < bid) throw new Error(`😅 Saldo tidak cukup. Kamu perlu: ${formatNumber(bid)}`);
                  const betType = args[1].toLowerCase();
                  const betNumbers = args[2];
                  if (!['4d', '3d', '2d', 'colok'].includes(betType)) throw new Error("Jenis taruhan tidak valid. Pilih: 4d, 3d, 2d, colok.");
                  if (!/^\d+$/.test(betNumbers)) throw new Error("Angka tebakan hanya boleh berisi digit.");
                  if (betType === '4d' && betNumbers.length !== 4) throw new Error("Taruhan 4D harus 4 digit.");
                  if (betType === '3d' && betNumbers.length !== 3) throw new Error("Taruhan 3D harus 3 digit.");
                  if (betType === '2d' && betNumbers.length !== 2) throw new Error("Taruhan 2D harus 2 digit.");
                  if (betType === 'colok' && betNumbers.length !== 1) throw new Error("Taruhan Colok harus 1 digit.");
                  let { key } = await sReply(`🎟️ Taruhan Kamu pada *${betType.toUpperCase()}* dengan angka *${betNumbers}* sebesar ${formatNumber(bid)} telah diterima.\n\nMengundi hasil...`);
                  const winningNumberStr = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                  let menang = false;
                  let multiplier = 0.0;
                  if (betType === '4d' && betNumbers === winningNumberStr) { menang = true; multiplier = 4000; }
                  else if (betType === '3d' && betNumbers === winningNumberStr.slice(1)) { menang = true; multiplier = 400; }
                  else if (betType === '2d' && betNumbers === winningNumberStr.slice(2)) { menang = true; multiplier = 70; }
                  else if (betType === 'colok') {
                    const occurrences = winningNumberStr.split(betNumbers).length - 1;
                    if (occurrences > 0) {
                      menang = true;
                      if (occurrences === 1) multiplier = 1.5;
                      else if (occurrences === 2) multiplier = 3;
                      else if (occurrences === 3) multiplier = 4.5;
                      else if (occurrences === 4) multiplier = 6;
                    }
                  }
                  let untungBersih = 0n;
                  let totalMenang = 0n;
                  if (menang) {
                    totalMenang = (bid * BigInt(Math.floor(multiplier * 100))) / 100n;
                    untungBersih = totalMenang;
                  }
                  const selisih = menang ? untungBersih : -bid;
                  await addBal(serial, selisih);
                  const saldoAkhir = saldoAwal + selisih;
                  let hasil = `🎟️ *HASIL TOTOBET* 🎟️\n\n`;
                  hasil += `Angka Keluar:  *${winningNumberStr.split('').join(' ')}*\n`;
                  hasil += `Taruhan Kamu: *${betType.toUpperCase()} - ${betNumbers}*\n\n`;
                  if (menang) {
                    hasil += `🎉 *Selamat, Kamu Menang!* 🎉\n`;
                    hasil += `Modal Taruhan: -${formatNumber(bid)}\n`;
                    hasil += `Hadiah Kemenangan: +${formatNumber(totalMenang)}\n`;
                    hasil += `Untung Bersih: *+${formatNumber(untungBersih)}*\n`;
                  } else {
                    hasil += `😢 *Kamu Kalah* 😢\n`;
                    hasil += `Kerugian: -${formatNumber(bid)}\n`;
                  }
                  hasil += `\n💰 Saldo Akhir: ${formatNumber(saldoAkhir)}`;
                  await delay(1000);
                  await fn.sendReply(toId, hasil, { edit: key }); await limitAddGame(serial);
                  await addXp(fn, toId, serial, m); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'lotre')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  let count = 1;
                  let pricePerTicket = 500000n;
                  if (!args[0] || !args[0].toLowerCase().endsWith('x')) throw new Error("Format perintah salah.\nContoh: `.lotre 10x` atau `.lotre 5x 1m`");
                  count = parseInt(args[0].toLowerCase().replace('x', ''));
                  if (isNaN(count) || count <= 0 || count > 10) throw new Error("Jumlah tiket tidak valid (1-10).");
                  if (args[1]) {
                    let bi0 = args[1].toLowerCase();
                    let multiplier = 1n;
                    let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitized = numPart.replace(',', '.');
                    const numVal = Number(sanitized);
                    if (isNaN(numVal) || !isFinite(numVal) || numVal <= 0) throw new Error("Format harga tiket tidak valid.");
                    if (sanitized.includes('.')) {
                      const parts = sanitized.split('.');
                      const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces;
                      const numberNoDecimal = BigInt(sanitized.replace('.', ''));
                      pricePerTicket = (numberNoDecimal * multiplier) / divisor;
                    } else {
                      pricePerTicket = BigInt(sanitized) * multiplier;
                    }
                  }
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance)
                  const totalCost = BigInt(count) * pricePerTicket;
                  if (saldoAwal < totalCost) throw new Error(`Saldo tidak cukup. Total: ${formatNumber(totalCost)}`);
                  await addBal(user.id, -totalCost);
                  const tickets = [];
                  for (let i = 0; i < count; i++) {
                    const numbers = new Set();
                    while (numbers.size < 5) numbers.add(Math.floor(Math.random() * 69) + 1);
                    const powerball = Math.floor(Math.random() * 26) + 1;
                    tickets.push({ numbers: [...numbers].sort((a, b) => a - b), powerball });
                  }
                  let { key } = await sReply(`🎟️ Membeli ${count} tiket lotre`);
                  const undian = new Set();
                  while (undian.size < 5) undian.add(Math.floor(Math.random() * 69) + 1);
                  const powerballUndian = Math.floor(Math.random() * 26) + 1;
                  const hasilUndian = [...undian].sort((a, b) => a - b);
                  await delay(500);
                  let hasilMsg = `Sedang mengundi angka...\n\n`;
                  for (let i = 0; i < 5; i++) {
                    hasilMsg += hasilUndian[i] + ' ';
                    await fn.sendReply(toId, hasilMsg, { edit: key });
                    await delay(500);
                  }
                  hasilMsg += '- PB: ' + powerballUndian; await fn.sendReply(toId, hasilMsg, { edit: key });
                  let totalMenang = 0n;
                  const finalTickets = tickets.map(t => {
                    const match = t.numbers.filter(n => hasilUndian.includes(n)).length;
                    const powerMatch = t.powerball === powerballUndian;
                    let multiplier = 0n;
                    if (match === 5 && powerMatch) multiplier = 100000n;
                    else if (match === 5) multiplier = 1000n;
                    else if (match === 4 && powerMatch) multiplier = 100n;
                    else if (match === 4) multiplier = 20n;
                    else if (match === 3 && powerMatch) multiplier = 10n;
                    else if (match === 3) multiplier = 7n;
                    else if (match === 2 && powerMatch) multiplier = 5n;
                    else if (match === 1 && powerMatch) multiplier = 3n;
                    else if (powerMatch) multiplier = 2n;
                    const payout = pricePerTicket * multiplier;
                    totalMenang += payout
                    return { ...t, match, powerMatch, payout };
                  });
                  if (totalMenang > 0n) await addBal(user.id, totalMenang);
                  let final = `🎟️ Hasil Akhir 🎟️\n[${hasilUndian.join(', ')}]-[${powerballUndian}]\n\n`;
                  final += `🎟️ Tiket:\n`;
                  finalTickets.forEach((t) => {
                    final += `> [${t.numbers.join(', ')}]-[${t.powerball}] » ` + `${t.payout > 0n ? '✅ +' + formatNumber(t.payout) : '❌'}\n`;
                  });
                  const netResult = totalMenang - totalCost;
                  final += `\nModal: ${formatNumber(totalCost)}`;
                  final += `\nHadiah: ${formatNumber(totalMenang)}\n`;
                  if (netResult >= 0) {
                    final += `\n✅ Keuntungan Bersih: ${formatNumber(netResult)}`;
                  } else {
                    final += `\n❌ Kerugian Bersih: ${formatNumber(netResult)}`;
                  }
                  final += `\n💰 Saldo Akhir: ${formatNumber(saldoAwal + netResult)}`;
                  await delay(1000);
                  await fn.sendReply(toId, final, { edit: key }); await limitAddGame(serial);
                  await addXp(fn, toId, serial, m); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'hilo')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  if (args.length !== 2) throw new Error("Format perintah tidak valid.\nContoh: .hilo 10k high");
                  const pilihan = args[1].toLowerCase();
                  if (!['high', 'low'].includes(pilihan)) throw new Error("Pilihan taruhan tidak valid. Gunakan 'high' atau 'low'.");
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance);
                  let bi0 = args[0]?.toLowerCase();
                  if (!bi0) throw new Error("Masukkan jumlah taruhan.");
                  let bid = 0n;
                  if (bi0 === 'all' || bi0 === 'allin') {
                    bid = saldoAwal;
                  } else if (bi0.endsWith('%')) {
                    const percentValue = parseFloat(bi0.replace('%', '').replace(',', '.'));
                    if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) throw new Error("Input persen tidak valid (1-100).");
                    bid = (saldoAwal * BigInt(Math.floor(percentValue * 100))) / 10000n;
                  } else {
                    let multiplier = 1n;
                    let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitized = numPart.replace(',', '.');
                    const num = Number(sanitized);
                    if (isNaN(num) || num <= 0) throw new Error("Input jumlah taruhan tidak valid.");
                    if (sanitized.includes('.')) {
                      const parts = sanitized.split('.');
                      const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces;
                      const numberWithoutDecimal = BigInt(sanitized.replace('.', ''));
                      bid = (numberWithoutDecimal * multiplier) / divisor;
                    } else {
                      bid = BigInt(num) * multiplier;
                    }
                  }
                  if (bid <= 0n) throw new Error("Jumlah taruhan harus lebih dari 0.");
                  if (saldoAwal < bid) throw new Error(`Saldo tidak cukup. Diperlukan: ${formatNumber(bid)}`);
                  const currentCard = Math.floor(Math.random() * 13) + 1;
                  const nextCard = Math.floor(Math.random() * 13) + 1;
                  const cardToEmoji = (val) => ['A🂡', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', 'J🂫', 'Q🂭', 'K🂮'][val - 1];
                  let selisih = 0n;
                  let resultText = "";
                  if (nextCard === currentCard) {
                    selisih = 0n;
                    resultText = `⚖️ SERI! Kartu kedua nilainya sama. Taruhan Kamu dikembalikan.\n`;
                  } else if ((pilihan === 'high' && nextCard > currentCard) || (pilihan === 'low' && nextCard < currentCard)) {
                    selisih = bid;
                    resultText = `✅ Kamu MENANG! Keuntungan bersih: +${formatNumber(bid)}\n`;
                  } else {
                    selisih = -bid;
                    resultText = `❌ Kamu KALAH! Kerugian: -${formatNumber(bid)}\n`;
                  }
                  if (selisih !== 0n) {
                    await addBal(serial, selisih);
                  }
                  const saldoAkhir = saldoAwal + selisih;
                  let hasil = `🎰 *HI-LO GAME* 🎰\n\n`;
                  hasil += `Kartu Awal: ${cardToEmoji(currentCard)}\n`;
                  hasil += `Taruhan Kamu: *${pilihan.toUpperCase()}*\n`;
                  hasil += `Kartu Berikutnya: ${cardToEmoji(nextCard)}\n\n`;
                  hasil += resultText;
                  hasil += `\n💰 Saldo Akhir: ${formatNumber(saldoAkhir)}`;
                  await fn.sendReply(toId, hasil); await limitAddGame(serial);
                  await addXp(fn, toId, serial, m); await counthit(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'blackjack')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung. Harap tunggu hingga selesai.");
                activeGame.add(serial);
                try {
                  if (args.length > 1) throw new Error("Format tidak valid. Contoh: .blackjack 10k");
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance);
                  let bi0 = args[0]?.toLowerCase();
                  if (!bi0) throw new Error("Masukkan jumlah taruhan.");
                  let bid = 0n;
                  if (bi0 === 'all' || bi0 === 'allin') {
                    bid = saldoAwal;
                  } else if (bi0.endsWith('%')) {
                    const percentValue = parseFloat(bi0.replace('%', '').replace(',', '.'));
                    if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) throw new Error("Input persen tidak valid (1-100).");
                    bid = (saldoAwal * BigInt(Math.floor(percentValue * 100))) / 10000n;
                  } else {
                    let multiplier = 1n;
                    let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitized = numPart.replace(',', '.');
                    const num = Number(sanitized);
                    if (isNaN(num) || num <= 0) throw new Error("Input jumlah taruhan tidak valid.");
                    if (sanitized.includes('.')) {
                      const parts = sanitized.split('.');
                      const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces;
                      const numberWithoutDecimal = BigInt(sanitized.replace('.', ''));
                      bid = (numberWithoutDecimal * multiplier) / divisor;
                    } else {
                      bid = BigInt(num) * multiplier;
                    }
                  }
                  if (bid <= 0n) throw new Error("Jumlah taruhan harus lebih dari 0.");
                  if (saldoAwal < bid) throw new Error(`Saldo tidak cukup. Diperlukan: ${formatNumber(bid)}`);
                  const { key } = await sReply(`🃏 *BLACKJACK* 🃏\nAnda bertaruh sebesar ${formatNumber(bid)}.\n\nDealer sedang membagikan kartu...`);
                  const RISKY_HIT_CHANCE = 0.001;
                  const deck = [];
                  const suits = ['♠️', '♥️', '♦️', '♣️'];
                  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
                  for (let i = 0; i < 4; i++) {
                    for (const suit of suits) {
                      for (const rank of ranks) {
                        deck.push({ rank, suit });
                      }
                    }
                  }
                  deck.sort(() => Math.random() - 0.5);
                  const draw = () => deck.pop();
                  const formatHand = (cards) => cards.map(c => `[${c.rank}${c.suit}]`).join(' ');
                  const calculateHandValue = (hand) => {
                    let value = 0;
                    let aceCount = 0;
                    for (const card of hand) {
                      if (card.rank === 'A') {
                        aceCount++;
                        value += 11;
                      } else if (['J', 'Q', 'K', '10'].includes(card.rank)) {
                        value += 10;
                      } else {
                        value += parseInt(card.rank);
                      }
                    }
                    while (value > 21 && aceCount > 0) {
                      value -= 10;
                      aceCount--;
                    }
                    return value;
                  };
                  let playerHand = [draw(), draw()];
                  let dealerHand = [draw(), draw()];
                  let log = ``;
                  const playerHasBlackjack = calculateHandValue(playerHand) === 21 && playerHand.length === 2;
                  const dealerHasBlackjack = calculateHandValue(dealerHand) === 21 && dealerHand.length === 2;
                  let menang = false, seri = false, blackjackWin = false;
                  if (playerHasBlackjack) {
                    blackjackWin = true;
                    if (dealerHasBlackjack) {
                      seri = true;
                      log += `⚖️ Kamu dan Dealer sama-sama BLACKJACK! Hasilnya seri (Push).\n`;
                    } else {
                      menang = true;
                      log += `🎉 NATURAL BLACKJACK! Kemenangan instan!\n`;
                    }
                  } else {
                    log += `Kamu bermain dengan strategi standar...\n`;
                    while (calculateHandValue(playerHand) < 17) {
                      playerHand.push(draw());
                    }
                    let playerVal = calculateHandValue(playerHand);
                    if (playerVal >= 17 && playerVal <= 20 && Math.random() < RISKY_HIT_CHANCE) {
                      log += `\n🤯 *LANGKAH GILA!* Kamu merasakan dorongan nekat untuk menarik satu kartu lagi...\n`;
                      playerHand.push(draw());
                      playerVal = calculateHandValue(playerHand);
                    }
                    log += `\n👤 Tangan final Kamu: ${formatHand(playerHand)} (Total: *${playerVal}*)\n`;
                    if (playerVal > 21) {
                      log += `❌ Kamu *bust*! Nilai melebihi 21.\n`;
                    } else {
                      log += `\n🤖 Dealer membuka kartunya...\n`;
                      while (calculateHandValue(dealerHand) < 17) {
                        dealerHand.push(draw());
                      }
                      let dealerVal = calculateHandValue(dealerHand);
                      if (dealerVal >= 17 && dealerVal <= 20 && Math.random() < RISKY_HIT_CHANCE) {
                        log += `\n🤖🌀 *DEALER NEKAT!* Tiba-tiba, Dealer menarik satu kartu lagi secara membabi buta...\n`;
                        dealerHand.push(draw());
                        dealerVal = calculateHandValue(dealerHand);
                      }
                      log += `\n🤖 Tangan final Dealer: ${formatHand(dealerHand)} (Total: *${dealerVal}*)\n\n`;
                      if (dealerVal > 21) {
                        log += `✅ Dealer bust! Kamu menang.\n`;
                        menang = true;
                      } else if (playerVal > dealerVal) {
                        log += `✅ Kamu menang dengan nilai lebih tinggi.\n`;
                        menang = true;
                      } else if (playerVal < dealerVal) {
                        log += `❌ Kamu kalah, dealer lebih tinggi.\n`;
                      } else {
                        log += `⚖️ Seri, nilai sama (Push).\n`;
                        seri = true;
                      }
                    }
                  }
                  let selisih = 0n;
                  if (blackjackWin) {
                    selisih = (bid * 3n) / 2n;
                    log += `\nKeuntungan Spesial: *+${formatNumber(selisih)}* (Payout 3:2)\n`;
                  } else if (menang) {
                    selisih = bid;
                    log += `\nKeuntungan: *+${formatNumber(selisih)}*\n`;
                  } else if (!seri) {
                    selisih = -bid;
                    log += `\nKerugian: *-${formatNumber(bid)}*\n`;
                  }
                  if (selisih !== 0n) {
                    await addBal(serial, selisih);
                  }
                  const saldoAkhir = saldoAwal + selisih;
                  log += `\n💰 Saldo Akhir: ${formatNumber(saldoAkhir)}`;
                  await delay(1000); fn.sendReply(toId, `🃏 *BLACKJACK* 🃏\n\nTaruhan: ${formatNumber(bid)}\n${log}`, { edit: key });
                  await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'poker')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung.");
                activeGame.add(serial);
                try {
                  if (args.length > 1) throw new Error("Format tidak valid. Contoh: .poker 10k");
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance);
                  let bi0 = args[0] ? args[0].toLowerCase() : '';
                  if (!bi0) throw new Error("Format tidak valid. Contoh: .poker 10k");
                  let bid = 0n;
                  if (bi0 === 'all' || bi0 === 'allin') { bid = saldoAwal; }
                  else if (bi0.endsWith('%')) {
                    const percentValue = parseFloat(bi0.replace('%', '').replace(',', '.'));
                    if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) throw new Error("Input persen tidak valid (1-100).");
                    bid = (saldoAwal * BigInt(Math.floor(percentValue * 100))) / 10000n;
                  } else {
                    let multiplier = 1n; let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitized = numPart.replace(',', '.'); const num = Number(sanitized);
                    if (isNaN(num) || !isFinite(num) || num <= 0) throw new Error("Format tidak valid. Contoh: .poker 10k");
                    if (sanitized.includes('.')) {
                      const parts = sanitized.split('.'); const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces; const numberWithoutDecimal = BigInt(sanitized.replace('.', ''));
                      bid = (numberWithoutDecimal * multiplier) / divisor;
                    } else { bid = BigInt(sanitized) * multiplier; }
                  }
                  if (bid <= 0n) throw new Error("Jumlah taruhan harus lebih dari 0.");
                  if (saldoAwal < bid) throw new Error(`Saldo tidak cukup. Diperlukan: ${formatNumber(bid)}`);
                  let { key } = await sReply(`🃏 *THREE CARD POKER* 🃏\nAnda bertaruh sebesar ${formatNumber(bid)}.\n\nDealer sedang membagikan kartu...`);
                  const deck = createDeck();
                  shuffleDeck(deck);
                  const playerHand = [deck.pop(), deck.pop(), deck.pop()];
                  const dealerHand = [deck.pop(), deck.pop(), deck.pop()];
                  const playerDetails = getHandDetails(playerHand);
                  const dealerDetails = getHandDetails(dealerHand);
                  const menang = playerDetails.rankValue > dealerDetails.rankValue;
                  const isSeri = playerDetails.rankValue === dealerDetails.rankValue;
                  const hasilTaruhan = menang ? bid : -bid;
                  let anteBonus = 0n;
                  let bonusText = "";
                  if (menang) {
                    const bonusMultiplier = anteBonusMultipliers[playerDetails.rankValue];
                    if (bonusMultiplier) {
                      anteBonus = bid * bonusMultiplier;
                      bonusText = `\n🎁 *BONUS* (${playerDetails.name}): +${formatNumber(anteBonus)} (x${bonusMultiplier})`;
                    }
                  }
                  const selisih = hasilTaruhan + anteBonus;
                  if (selisih !== 0n) {
                    await addBal(serial, selisih);
                  }
                  const saldoAkhir = saldoAwal + selisih;
                  let hasil = `🃏 *HASIL THREE CARD POKER* 🃏\n\n`;
                  hasil += `👤 *Tangan Kamu*: ${formatHandSimple(playerHand)}\n   └ Peringkat: *${playerDetails.name}*\n\n`;
                  hasil += `🤖 *Tangan Dealer*: ${formatHandSimple(dealerHand)}\n   └ Peringkat: *${dealerDetails.name}*\n\n`;
                  hasil += `---HASIL TARUHAN---\n`;
                  if (menang) {
                    hasil += `✅ *MENANG vs Dealer!* Keuntungan: +${formatNumber(bid)}`;
                  } else {
                    if (isSeri) {
                      hasil += `⚖️ *KALAH (SERI)!* Taruhan hangus. Kerugian: -${formatNumber(bid)}`;
                    } else {
                      hasil += `😢 *KALAH vs Dealer.* Kerugian: -${formatNumber(bid)}`;
                    }
                  }
                  hasil += bonusText;
                  hasil += `\n\n💰 Saldo Akhir: ${formatNumber(saldoAkhir)}`;
                  await delay(1000); fn.sendReply(toId, hasil, { edit: key });
                  await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'pacuankuda')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung.");
                activeGame.add(serial);
                try {
                  const horseData = [
                    { id: 1, name: 'Yanto', emoji: '🐎' },
                    { id: 2, name: 'Gobel', emoji: '🐴' },
                    { id: 3, name: 'Mukidi', emoji: '🏇' },
                    { id: 4, name: 'Setro', emoji: '🦓' },
                    { id: 5, name: 'Slamet', emoji: '🦄' },
                    { id: 6, name: 'Cokro', emoji: '🦌' }
                  ];
                  const horseNames = horseData.map(h => h.name.toLowerCase());
                  if (args.length < 2) throw new Error(`Format salah!\nContoh: .pacuankuda 10k Yanto`);
                  const playerBetOnName = args[1].toLowerCase();
                  if (!horseNames.includes(playerBetOnName)) throw new Error(`Nama kuda tidak valid.\nPilih: ${horseData.map(h => h.name).join(', ')}`);
                  const chosenHorse = horseData.find(h => h.name.toLowerCase() === playerBetOnName);
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance);
                  let bi0 = args[0] ? args[0].toLowerCase() : '';
                  if (!bi0) throw new Error(`Format salah!\nContoh: .pacuankuda 10k Yanto`);
                  let bid = 0n;
                  if (bi0 === 'all' || bi0 === 'allin') { bid = saldoAwal; }
                  else if (bi0.endsWith('%')) {
                    const percentValue = parseFloat(bi0.replace('%', '').replace(',', '.'));
                    if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) throw new Error("Input persen tidak valid (1-100).");
                    bid = (saldoAwal * BigInt(Math.floor(percentValue * 100))) / 10000n;
                  } else {
                    let multiplier = 1n; let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitized = numPart.replace(',', '.'); const num = Number(sanitized);
                    if (isNaN(num) || !isFinite(num) || num <= 0) throw new Error(`Format salah!\nContoh: .pacuankuda 10k Yanto`);
                    if (sanitized.includes('.')) {
                      const parts = sanitized.split('.'); const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces; const numberWithoutDecimal = BigInt(sanitized.replace('.', ''));
                      bid = (numberWithoutDecimal * multiplier) / divisor;
                    } else { bid = BigInt(sanitized) * multiplier; }
                  }
                  if (bid <= 0n) throw new Error("Jumlah taruhan harus lebih dari 0.");
                  if (saldoAwal < bid) throw new Error(`Saldo tidak cukup. Diperlukan: ${formatNumber(bid)}`);
                  const trackLength = 13;
                  let horses = JSON.parse(JSON.stringify(horseData));
                  horses.forEach(h => h.progress = 0);
                  const generateTrackDisplay = (horseList) => {
                    let display = '🏇 *PACUAN KUDA DIMULAI* 🏇\n\n';
                    horseList.forEach(h => {
                      const track = '─'.repeat(h.progress);
                      const remaining = '·'.repeat(Math.max(0, trackLength - h.progress));
                      display += `*${h.name}*: ${track}${h.emoji}${remaining}🏁\n`;
                    });
                    return display;
                  };
                  let { key } = await sReply(`Taruhan ${formatNumber(bid)} pada *${chosenHorse.name}* diterima.\n\n${generateTrackDisplay(horses)}`);
                  await delay(2000);
                  let winner = null;
                  while (!winner) {
                    for (let horse of horses) {
                      if (winner) continue;
                      const move = Math.floor(Math.random() * 3) + 1;
                      horse.progress += move;
                      if (horse.progress >= trackLength) {
                        horse.progress = trackLength;
                        winner = horse;
                      }
                    }
                    horses.sort((a, b) => b.progress - a.progress);
                    await fn.sendReply(toId, generateTrackDisplay(horses), { edit: key });
                    await delay(1000);
                  }
                  const menang = winner.id === chosenHorse.id;
                  const payoutMultiplier = 5n;
                  const keuntunganBersih = menang ? (bid * payoutMultiplier) - bid : 0n;
                  const selisih = menang ? keuntunganBersih : -bid;
                  if (selisih !== 0n) {
                    await addBal(serial, selisih);
                  }
                  const saldoAkhir = saldoAwal + selisih;
                  let hasilFinal = generateTrackDisplay(horses);
                  hasilFinal += `\n--- HASIL AKHIR ---\n`;
                  hasilFinal += `🏆 Pemenangnya adalah *${winner.name}* (${winner.emoji})!\n\n`;
                  if (menang) {
                    hasilFinal += `✅ Selamat! Taruhanmu pada *${chosenHorse.name}* menang!\n`;
                    hasilFinal += `Keuntungan Bersih: +${formatNumber(selisih)}\n`;
                  } else {
                    hasilFinal += `😢 Maaf, taruhanmu pada *${chosenHorse.name}* kalah.\n`;
                    hasilFinal += `Kerugian: -${formatNumber(bid)}\n`;
                  }
                  hasilFinal += `\n💰 Saldo Akhir: ${formatNumber(saldoAkhir)}`;
                  await delay(1000); fn.sendReply(toId, hasilFinal, { edit: key });
                  await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) {
                await counthit(serial); await sReply(error.message);;
              }
            } else if (!commandFound && await getPrefix(txt, 'tambang')) {
              try {
                if (activeGame.has(serial)) throw new Error("⏳ Kamu masih memiliki permainan yang sedang berlangsung.");
                activeGame.add(serial);
                try {
                  const layers = [
                    {
                      name: "Permukaan Tanah", depth: 50, collapseChance: 0.15, opCostMultiplier: 0.05, rewards: [
                        { name: "Batu Kapur", payout: -0.5, message: "hanya menemukan Batu Kapur tak berharga." },
                        { name: "Batu Bara", payout: 1.5, message: "menemukan lapisan Batu Bara tipis." }]
                    },
                    {
                      name: "Kerak Bumi", depth: 150, collapseChance: 0.25, opCostMultiplier: 0.10, rewards: [
                        { name: "Gipsum", payout: -1.0, message: "membuang waktu menggali Gipsum." },
                        { name: "Bijih Besi", payout: 1.5, message: "menemukan urat Bijih Besi yang solid." },
                        { name: "Bauksit", payout: 2.0, message: "menemukan deposit Bauksit!" }]
                    },
                    {
                      name: "Mantel Bumi", depth: 300, collapseChance: 0.50, opCostMultiplier: 0.20, rewards: [
                        { name: "Belerang", payout: -1.0, message: "terkena semburan gas Belerang beracun!" },
                        { name: "Marmer", payout: 2.0, message: "menemukan lempengan Marmer yang indah." },
                        { name: "Tembaga", payout: 3.0, message: "melihat kilauan Tembaga di dinding gua!" }]
                    },
                    {
                      name: "Inti Luar", depth: 500, collapseChance: 0.75, opCostMultiplier: 0.40, rewards: [
                        { name: "Fosfat", payout: -1.0, message: "merusak peralatan karena lapisan Fosfat yang rapuh." },
                        { name: "Timah", payout: 5.0, message: "menemukan bongkahan Timah murni!" },
                        { name: "Uranium", payout: 20.0, message: "menemukan bijih Uranium yang sangat berharga!" }]
                    },
                    {
                      name: "Inti Dalam", depth: 1000, collapseChance: 0.85, opCostMultiplier: 0.80, rewards: [
                        { name: "Kecapekan", payout: -1.0, message: "kamu kecapekan" },
                        { name: "Perak", payout: 10.0, message: "menemukan urat PERAK murni!" },
                        { name: "Emas", payout: 50.0, message: "menemukan urat EMAS MURNI!" },
                        { name: "Berlian", payout: 100.0, message: "menemukan sebuah BERLIAN raksasa!" },
                        { name: "Adamantium", payout: 3600.0, message: "menemukan logam mitos, ADAMANTIUM!" }]
                    }
                  ];
                  const generateMineDisplay = (currentLayerIndex, targetLayerIndex, status = 'digging') => {
                    let display = "⛏️ *EKSPEDISI TAMBANG* ⛏️\n\n";
                    layers.forEach((layer, index) => {
                      if (index > targetLayerIndex && status !== 'failed') return;
                      let icon = "❓"; let suffix = "";
                      if (index < currentLayerIndex) { icon = "✅"; }
                      else if (index === currentLayerIndex) {
                        if (status === 'digging') { icon = "⛏️"; suffix = "  <-- Kamu di sini"; }
                        else if (status === 'failed') { icon = "💥"; suffix = "  <-- Runtuh!"; }
                        else if (status === 'success') { icon = "💎"; suffix = "  <-- Selesai!"; }
                      }
                      display += `[${layer.depth}m] ${icon} ${layer.name}${suffix}\n`;
                    });
                    return display;
                  };
                  if (args.length < 1) throw new Error("Format salah!\nContoh: .tambang 10k hard\nMode: easy, normal, hard, extreme, ultra (default)");
                  const modeMap = { 'easy': 0, 'normal': 1, 'hard': 2, 'extreme': 3, 'ultra': 4 };
                  const modeInput = args[1] ? args[1].toLowerCase() : 'ultra';
                  if (!Object.prototype.hasOwnProperty.call(modeMap, modeInput)) throw new Error("Mode tidak valid. Pilih: easy, normal, hard, extreme, ultra.");
                  const targetLayerIndex = modeMap[modeInput];
                  const user = getScore().find(u => u.id === serial);
                  if (!user || user.balance <= 0) throw new Error("User tidak ditemukan atau saldo 0.\nsilakan gunakan permainan mode grinding dulu seperti .chop, .mine, .fish, .hunt, .ngelonte, .work atau gunakan perintah .daily jika kamu belum daily claim hari ini.");
                  const saldoAwal = BigInt(user.balance);
                  let bi0 = args[0] ? args[0].toLowerCase() : '';
                  let bid = 0n;
                  if (bi0 === 'all' || bi0 === 'allin') { bid = saldoAwal; }
                  else if (bi0.endsWith('%')) {
                    const percentValue = parseFloat(bi0.replace('%', '').replace(',', '.'));
                    if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) throw new Error("Input persen tidak valid (1-100).");
                    bid = (saldoAwal * BigInt(Math.floor(percentValue * 100))) / 10000n;
                  } else {
                    let multiplier = 1n; let numPart = bi0;
                    if (bi0.endsWith('k')) { multiplier = 1000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('m')) { multiplier = 1000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('b')) { multiplier = 1000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('t')) { multiplier = 1000000000000n; numPart = bi0.slice(0, -1); }
                    else if (bi0.endsWith('q')) { multiplier = 1000000000000000n; numPart = bi0.slice(0, -1); }
                    const sanitized = numPart.replace(',', '.'); const num = Number(sanitized);
                    if (isNaN(num) || !isFinite(num) || num <= 0) throw new Error("Input jumlah taruhan tidak valid.");
                    if (sanitized.includes('.')) {
                      const parts = sanitized.split('.'); const decimalPlaces = BigInt(parts[1].length);
                      const divisor = 10n ** decimalPlaces; const numberWithoutDecimal = BigInt(sanitized.replace('.', ''));
                      bid = (numberWithoutDecimal * multiplier) / divisor;
                    } else { bid = BigInt(sanitized) * multiplier; }
                  }
                  if (bid <= 0n) throw new Error("Jumlah taruhan harus lebih dari 0.");
                  if (saldoAwal < bid) throw new Error(`Saldo tidak cukup. Diperlukan: ${formatNumber(bid)}`);
                  let { key } = await sReply(`Memulai Ekspedisi Tambang menuju *${layers[targetLayerIndex].name}*...`);
                  let totalWinnings = 0n;
                  let totalOpCost = 0n;
                  let expeditionFailed = false;
                  let finalLayerIndex = -1;
                  let eventLog = "\n--- Laporan Ekspedisi ---\n";
                  for (let i = 0; i <= targetLayerIndex; i++) {
                    finalLayerIndex = i;
                    const layer = layers[i];
                    await fn.sendReply(toId, generateMineDisplay(i, targetLayerIndex, 'digging') + eventLog, { edit: key });
                    await delay(2500);
                    if (Math.random() < layer.collapseChance) {
                      expeditionFailed = true;
                      eventLog += `💥 BENCANA di ${layer.depth}m! Tambang runtuh!\n`;
                      await fn.sendReply(toId, generateMineDisplay(i, targetLayerIndex, 'failed') + eventLog, { edit: key });
                      break;
                    }
                    const currentOpCost = (bid * BigInt(Math.floor(layer.opCostMultiplier * 100))) / 100n;
                    totalOpCost += currentOpCost;
                    eventLog += `🔧 Biaya di ${layer.depth}m: -${formatNumber(currentOpCost)}\n`;
                    const rewardItem = layer.rewards[Math.floor(Math.random() * layer.rewards.length)];
                    const currentReward = (bid * BigInt(Math.floor(rewardItem.payout * 100))) / 100n;
                    totalWinnings += currentReward;
                    const icon = currentReward >= 0n ? "✅" : "⚠️";
                    const valueText = currentReward >= 0n ? `+${formatNumber(currentReward)}` : `${formatNumber(currentReward)}`;
                    eventLog += `${icon} Kamu ${rewardItem.message} (Nilai: ${valueText})\n`;
                  }
                  if (!expeditionFailed) {
                    await fn.sendReply(toId, generateMineDisplay(targetLayerIndex, targetLayerIndex, 'success') + eventLog, { edit: key });
                    await delay(1000);
                  }
                  let selisih;
                  if (expeditionFailed) {
                    selisih = -bid;
                  } else {
                    const keuntunganBersih = totalWinnings - totalOpCost;
                    selisih = keuntunganBersih - bid;
                    if (selisih < -bid) {
                      selisih = -bid;
                    }
                  }
                  if (selisih !== 0n) {
                    await addBal(serial, selisih);
                  }
                  const saldoAkhir = saldoAwal + selisih;
                  const finalStatus = expeditionFailed ? 'failed' : 'success';
                  let finalMessage = generateMineDisplay(finalLayerIndex, targetLayerIndex, finalStatus);
                  finalMessage += eventLog;
                  if (!expeditionFailed) finalMessage += `\n✨ Ekspedisi ke *${layers[targetLayerIndex].name}* selesai dengan selamat!\n`;
                  finalMessage += `\n--- RINGKASAN AKHIR ---\n`;
                  finalMessage += `Modal Awal: ${formatNumber(bid)}\n`;
                  if (!expeditionFailed) {
                    finalMessage += `Total Nilai Temuan: ${formatNumber(totalWinnings)}\n`;
                    finalMessage += `Total Biaya Operasional: -${formatNumber(totalOpCost)}\n`;
                  }
                  finalMessage += `*Hasil Bersih: ${selisih >= 0n ? 'Untung +' : 'Rugi '}${formatNumber(selisih > 0n ? selisih : -selisih)}*\n`;
                  finalMessage += `\n💰 Saldo Akhir: ${formatNumber(saldoAkhir)}`;
                  await delay(500); fn.sendReply(toId, finalMessage, { edit: key });
                  await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                  commandFound = true;
                } catch (error) {
                  await counthit(serial); await sReply(`${error.message}`);
                } finally {
                  activeGame.delete(serial);
                }
              } catch (error) {
                await counthit(serial); await sReply(error.message);;
              }
            }
            ctype = "stateful"
            if (!commandFound && await getComs(txt, 'g-caklontong')) {
              try {
                if (toId in caklontong) throw new Error('Masih ada soal belum terjawab di chat ini', caklontong[toId][0]);
                const soal = require('./src/games/caklontong.json')
                const hasil = randomChoice(soal)
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonusBigInt = BigInt(bonusAmount);
                let msg = await sPesan(`Kuis Caklontong:\n\n${hasil.soal}\nCluenya Adalah: ${hasil.deskripsi}\n\nTimeout: 90 detik\nPoint Jawaban Benar: +${formatNumber(bonusBigInt)} Saldo`);
                caklontong[toId] = [
                  msg,
                  {
                    jawaban: hasil.jawaban.toLowerCase(),
                    bonus: bonusBigInt
                  },
                  2,
                  setTimeout(async () => {
                    if (caklontong[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete caklontong[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial);; }
            } else if (!commandFound && await getComs(txt, 'g-siapaaku')) {
              try {
                if (toId in siapakahaku) throw new Error('Masih ada soal belum terjawab di chat ini', siapakahaku[toId][0]);
                const soal = require('./src/games/siapakahaku.json')
                const hasil = randomChoice(soal)
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonus = BigInt(bonusAmount);
                let msg = await sPesan(`Siapakah Aku:\n\n${hasil.soal}\n\nTimeout: 90 detik\nPoint Jawaban Benar: +${formatNumber(bonus)} Saldo`)
                siapakahaku[toId] = [
                  msg,
                  {
                    jawaban: hasil.jawaban.toLowerCase(),
                    bonus: bonus
                  },
                  2,
                  setTimeout(async () => {
                    if (siapakahaku[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete siapakahaku[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial);; }
            } else if (!commandFound && await getComs(txt, 'g-susunkata')) {
              try {
                if (toId in susunkata) throw new Error('Masih ada soal belum terjawab di chat ini', susunkata[toId][0]);
                const soal = require('./src/games/susunkata.json')
                const hasil = randomChoice(soal)
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonus = BigInt(bonusAmount);
                let msg = await sPesan(`Susun Kata:\n\n${hasil.soal}\nTipe Soal: ${hasil.tipe}\n\nTimeout: 90 detik\nPoint Jawaban Benar: +${formatNumber(bonus)} Saldo`)
                susunkata[toId] = [
                  msg,
                  {
                    jawaban: hasil.jawaban.toLowerCase(),
                    bonus: bonus
                  },
                  2,
                  setTimeout(async () => {
                    if (susunkata[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete susunkata[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-tebakbendera')) {
              try {
                if (toId in tebakbendera) throw new Error('Masih ada soal belum terjawab di chat ini', tebakbendera[toId][0]);
                const soal = require('./src/games/tebakbendera.json')
                const hasil = randomChoice(soal)
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonus = BigInt(bonusAmount);
                let msg = await sPesan(`Tebak Bendera:\n\n${hasil.bendera}\n\nTimeout: 90 detik\nPoint Jawaban Benar: +${formatNumber(bonus)} Saldo`)
                tebakbendera[toId] = [
                  msg,
                  {
                    jawaban: hasil.negara.toLowerCase(),
                    bonus: bonus
                  },
                  2,
                  setTimeout(async () => {
                    if (tebakbendera[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete tebakbendera[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-tebakgambar')) {
              try {
                if (toId in tebakgambar) throw new Error('Masih ada soal belum terjawab di chat ini', tebakgambar[toId][0]);
                const soal = require('./src/games/tebakgambar.json')
                const hasil = randomChoice(soal)
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonus = BigInt(bonusAmount);
                let msg = await fn.sendFileUrl(toId, hasil.img, `Tebak Gambar Berikut:\n\n${hasil.deskripsi}\n\nWaktu : 60s\nHadiah ${formatNumber(bonus)}`, m)
                tebakgambar[toId] = [
                  msg,
                  {
                    jawaban: hasil.jawaban.toLowerCase(),
                    bonus: bonus
                  },
                  2,
                  setTimeout(async () => {
                    if (tebakgambar[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete tebakgambar[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-tebakgame')) {
              try {
                if (toId in tebakgame) throw new Error('Masih ada soal belum terjawab di chat ini', tebakgame[toId][0]);
                const soal = require('./src/games/tebakgame.json')
                const hasil = randomChoice(soal)
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonus = BigInt(bonusAmount);
                let msg = await fn.sendFileUrl(toId, hasil.img, `Tebak Game Berikut:\n\nWaktu : 60s\nHadiah ${formatNumber(bonus)}`, m)
                tebakgame[toId] = [
                  msg,
                  {
                    jawaban: hasil.jawaban.toLowerCase(),
                    bonus: bonus
                  },
                  2,
                  setTimeout(async () => {
                    if (tebakgame[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete tebakgame[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-tebakkalimat')) {
              try {
                if (toId in tebakkalimat) throw new Error('Masih ada soal belum terjawab di chat ini', tebakkalimat[toId][0]);
                const soal = require('./src/games/tebakkalimat.json');
                const hasil = randomChoice(soal);
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonus = BigInt(bonusAmount);
                let msg = await sPesan(`Tebak Kalimat:\n\n${hasil.soal}\n\nTimeout: 90 detik\nPoint Jawaban Benar: +${formatNumber(bonus)} Saldo`)
                tebakkalimat[toId] = [
                  msg,
                  {
                    jawaban: hasil.jawaban.toLowerCase(),
                    bonus: bonus
                  },
                  2,
                  setTimeout(async () => {
                    if (tebakkalimat[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete tebakkalimat[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-tebakkata')) {
              try {
                if (toId in tebakkata) throw new Error('Masih ada soal belum terjawab di chat ini', tebakkata[toId][0]);
                const soal = require('./src/games/tebakkata.json')
                const hasil = randomChoice(soal)
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonus = BigInt(bonusAmount);
                let msg = await sPesan(`Tebak Kata:\n\n${hasil.soal}\n\nTimeout: 90 detik\nPoint Jawaban Benar: +${formatNumber(bonus)} Saldo`)
                tebakkata[toId] = [
                  msg,
                  {
                    jawaban: hasil.jawaban.toLowerCase(),
                    bonus: bonus
                  },
                  2,
                  setTimeout(async () => {
                    if (tebakkata[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete tebakkata[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-tebakkimia')) {
              try {
                if (toId in tebakkimia) throw new Error('Masih ada soal belum terjawab di chat ini', tebakkimia[toId][0]);
                const soal = require('./src/games/tebakkimia.json')
                const hasil = randomChoice(soal)
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonus = BigInt(bonusAmount);
                let msg = await sPesan(`Tebak Kimia:\n\n${hasil.unsur}\n\nTimeout: 90 detik\nPoint Jawaban Benar: +${formatNumber(bonus)} Saldo`)
                tebakkimia[toId] = [
                  msg,
                  {
                    jawaban: hasil.lambang.toLowerCase(),
                    bonus: bonus
                  },
                  2,
                  setTimeout(async () => {
                    if (tebakkimia[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete tebakkimia[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-tebaklirik')) {
              try {
                if (toId in tebaklirik) throw new Error('Masih ada soal belum terjawab di chat ini', tebaklirik[toId][0]);
                const soal = require('./src/games/tebaklirik.json')
                const hasil = randomChoice(soal)
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonus = BigInt(bonusAmount);
                let msg = await sPesan(`Tebak Lirik:\n\n${hasil.soal}\n\nTimeout: 90 detik\nPoint Jawaban Benar: +${formatNumber(bonus)} Saldo`)
                tebaklirik[toId] = [
                  msg,
                  {
                    jawaban: hasil.jawaban.toLowerCase(),
                    bonus: bonus
                  },
                  2,
                  setTimeout(async () => {
                    if (tebaklirik[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete tebaklirik[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-tebaknegara')) {
              try {
                if (toId in tebaknegara) throw new Error('Masih ada soal belum terjawab di chat ini', tebaknegara[toId][0]);
                const soal = require('./src/games/tebaknegara.json')
                const hasil = randomChoice(soal)
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonus = BigInt(bonusAmount);
                let msg = await sPesan(`Tebak Negara:\n\n${hasil.tempat}\n\nTimeout: 90 detik\nPoint Jawaban Benar: +${formatNumber(bonus)} Saldo`)
                tebaknegara[toId] = [
                  msg,
                  {
                    jawaban: hasil.negara.toLowerCase(),
                    bonus: bonus
                  },
                  2,
                  setTimeout(async () => {
                    if (tebaknegara[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete tebaknegara[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-tekateki')) {
              try {
                if (toId in tekateki) throw new Error('Masih ada soal belum terjawab di chat ini', tekateki[toId][0]);
                const soal = require('./src/games/tekateki.json')
                const hasil = randomChoice(soal)
                const bonusAmount = Math.floor(Math.random() * 491) + 10;
                const bonus = BigInt(bonusAmount);
                let msg = await sPesan(`Teka Teki:\n\n${hasil.soal}\n\nTimeout: 90 detik\nHadiah: +${formatNumber(bonus)} Saldo`)
                tekateki[toId] = [
                  msg,
                  {
                    jawaban: hasil.jawaban.toLowerCase(),
                    bonus: bonus
                  },
                  2,
                  setTimeout(async () => {
                    if (tekateki[toId]) {
                      await sReply(`Waktu habis!\nJawaban: ${hasil.jawaban}`);
                      delete tekateki[toId];
                    }
                  }, 90000)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-chess')) {
              try {
                if (!m.isGroup) throw new Error('Perintah catur hanya bisa digunakan di dalam grup.');
                if (chessGame[toId]) throw new Error("Masih ada sesi game yang berjalan di grup ini. Hentikan dengan mengetik *menyerah*.");
                const gameDuration = 15 * 60 * 1000;
                const timeoutCallback = () => {
                  if (chessGame[toId]) {
                    delete chessGame[toId];
                  }
                };
                const timeoutId = setTimeout(timeoutCallback, gameDuration);
                const playerJid = serial;
                const gameInstance = new Chess();
                chessGame[toId] = {
                  mode: 'pve',
                  game: gameInstance,
                  players: {
                    white: playerJid,
                    black: 'BOT'
                  },
                  timeoutId: timeoutId
                };
                const boardBuffer = await generateBoardImage(gameInstance.fen(), "w");
                let caption = `🤖 *Mode PvE: Kamu Melawan Bot!* 🤖\n\n`;
                caption += `⚪️ Kamu (Putih): @${await fn.getName(serial)}\n`;
                caption += `⚫️ Lawan (Hitam): Bot\n\n`;
                caption += `Giliran Kamu untuk bergerak. Sesi ini akan berakhir otomatis dalam 15 menit.\n`;
                caption += `Ketik gerakan Kamu langsung di chat.\n`;
                caption += `Format: <dari> <ke> (Contoh: e2 e4)`;
                const outputPath = await saveFile(boardBuffer, "g-chess", 'jpg');
                await fn.sendFilePath(toId, caption, outputPath, { quoted: m });
                await deleteFile(outputPath);
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-41')) {
              try {
                if (!m.isGroup) throw new Error('Permainan 41 hanya bisa dimulai di dalam grup.');
                if (game41Sessions[toId]) throw new Error('Sudah ada permainan kartu 41 yang sedang berjalan di grup ini.');
                const gameDuration = 10 * 60 * 1000;
                const timeoutCallback = () => {
                  if (game41Sessions[toId]) {
                    delete game41Sessions[toId];
                  }
                };
                const timeoutId = setTimeout(timeoutCallback, gameDuration);
                const personalities = ['logis', 'pintar', 'licik', 'pintar_licik'];
                const chosenPersonality = personalities[Math.floor(Math.random() * personalities.length)];
                const deck = createDeck();
                shuffleDeck(deck);
                const playerHand = deck.splice(0, 4);
                const botHand = deck.splice(0, 4);
                const discardPile = deck.splice(0, 1);
                const playerId = serial;
                game41Sessions[toId] = {
                  playerJid: playerId, deck, discardPile, playerHand, botHand,
                  turn: 'player',
                  status: 'playing',
                  personality: chosenPersonality,
                  timeoutId: timeoutId
                };
                const groupMessage = `Permainan Kartu 41 (4 Kartu) melawan Bot dimulai oleh @${playerId.split('@')[0]}!\n\n` +
                  `Kepribadian Bot: *${chosenPersonality.replace('_', ' & ')}*\n` +
                  `Kartu buangan pertama adalah [ ${discardPile[0].display} ].\n` +
                  `Sesi ini akan berakhir dalam 10 menit.\n\n` +
                  `Giliranmu! Kartu sudah saya kirim via DM.`;
                await fn.sendPesan(toId, groupMessage, m);
                const privateMessage = `Ini kartumu untuk game di grup:\n\n${formatKartu(playerHand)}\n\n` +
                  `Pilih aksimu di grup: *ambil dek* atau *ambil buangan*.`;
                await fn.sendPesan(playerId, privateMessage, m);
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-samgong')) {
              try {
                if (!m.isGroup) throw new Error('Permainan Samgong hanya bisa dimulai di dalam grup.');
                if (samgongSessions[toId]) throw new Error('Sesi Samgong sudah berjalan di grup ini.');
                const startTimeout = (idGroup) => {
                  const gameDuration = 5 * 60 * 1000;
                  const timeoutCallback = () => {
                    if (samgongSessions[idGroup]) {
                      delete samgongSessions[idGroup];
                    }
                  };
                  samgongSessions[idGroup].timeoutId = setTimeout(timeoutCallback, gameDuration);
                };
                const deck = createDeck();
                shuffleDeck(deck);
                const playerHand = deck.splice(0, 2);
                const botHand = deck.splice(0, 2);
                const playerId = serial;
                samgongSessions[toId] = { playerJid: playerId, deck, playerHand, botHand, status: 'player_turn', timeoutId: null };
                startTimeout(toId);
                const groupMessage = `Permainan Samgong (Gaya Hit/Stand) dimulai oleh @${playerId.split('@')[0]}!\n\n` +
                  `Satu kartu Bandar terbuka: [ ${botHand[0].display} ]\n\n` +
                  `Giliranmu, @${playerId.split('@')[0]}! Cek DM. Sesi akan berakhir dalam 5 menit jika tidak aktif.`;
                await fn.sendPesan(toId, groupMessage, m);
                const privateMessage = `Ini kartumu (Total: *${calculateSamgongValue(playerHand)}*):\n${formatKartu(playerHand)}\n\n` +
                  `Ketik *hit* untuk menambah kartu, atau *stand* untuk berhenti.`;
                await fn.sendPesan(playerId, privateMessage, m);
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-tictactoe')) {
              try {
                if (!m.isGroup) throw new Error("Permainan ini hanya bisa dimainkan di grup.");
                if (tictactoeSessions[toId]) throw new Error("Sudah ada permainan yang sedang berjalan di grup ini.");
                const startTTTTimeout = (idGroup) => {
                  const gameDuration = 3 * 60 * 1000;
                  const timeoutCallback = () => {
                    if (tictactoeSessions[idGroup]) {
                      delete tictactoeSessions[idGroup];
                    }
                  };
                  tictactoeSessions[idGroup].timeoutId = setTimeout(timeoutCallback, gameDuration);
                };
                const initialBoard = [['', '', ''], ['', '', ''], ['', '', '']];
                const playerJid = serial;
                tictactoeSessions[toId] = {
                  board: initialBoard,
                  playerJid: playerJid,
                  playerSymbol: 'X',
                  botSymbol: 'O',
                  turn: 'player',
                  timeoutId: null
                };
                startTTTTimeout(toId);
                let introText = `Permainan Tic-Tac-Toe dimulai antara @${playerJid.split('@')[0]} (X) dan Bot (O)!\n\n` +
                  `Kamu mendapat giliran pertama. Sesi akan berakhir dalam 3 menit jika tidak aktif.\n` +
                  `Ketik angka (1-9) untuk menempatkan 'X' Kamu.\n`;
                introText += formatTicTacToeBoard(initialBoard);
                await fn.sendPesan(toId, introText, m);
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-ulartangga-turbo')) {
              try {
                if (!m.isGroup) throw new Error("Permainan ini hanya bisa dimainkan di grup.");
                if (ularTanggaSessions[toId]) throw new Error("Sudah ada permainan yang sedang berjalan. Ketik `stop` untuk berhenti.");
                const startUlarTanggaTimeout = (idGroup) => {
                  const gameDuration = 3 * 60 * 1000;
                  const timeoutCallback = () => {
                    if (ularTanggaSessions[idGroup]) {
                      delete ularTanggaSessions[idGroup];
                    }
                  };
                  if (ularTanggaSessions[idGroup]) {
                    ularTanggaSessions[idGroup].timeoutId = setTimeout(timeoutCallback, gameDuration);
                  }
                };
                const playerId = serial;
                ularTanggaSessions[toId] = {
                  board: turboBoard, playerJid: playerId, playerPos: 0, botPos: 0, turn: 'player', timeoutId: null
                };
                startUlarTanggaTimeout(toId);
                const welcomeMessage = `🐍 *Ular Tangga Turbo Dimulai!* 🪜\n\n` +
                  `Pemain: @${playerId.split('@')[0]}\nLawan: Bot\n\n` +
                  `*Aturan Turbo:*\n` +
                  `▫️ Papan *50 Kotak*.\n▫️ Menggunakan *2 Dadu*.\n` +
                  `▫️ Dapat giliran lagi jika dadu *kembar*.\n` +
                  `▫️ Menang dengan *mencapai atau melewati* kotak 50.\n` +
                  `▫️ Sesi berakhir dalam 3 menit jika tidak aktif.\n\n` +
                  `Kamu mendapat giliran pertama! Ketik *lempar* untuk melempar dadu.`;
                await fn.sendPesan(toId, welcomeMessage, m);
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-ulartangga')) {
              try {
                if (!m.isGroup) throw new Error("Permainan ini hanya bisa dimainkan di grup.");
                if (ulartangga[toId]) throw new Error("Sudah ada permainan yang berjalan. Ketik `stop` untuk berhenti.");
                const playerId = serial;
                const newMap = createRandomMap();
                ulartangga[toId] = {
                  playerJid: playerId,
                  playerPos: 0,
                  botPos: 0,
                  map: newMap,
                  turn: 'player',
                  timeoutId: null
                };
                const gameDuration = 3 * 60 * 1000;
                const timeoutCallback = () => {
                  if (ulartangga[toId]) {
                    delete ulartangga[toId];
                  }
                };
                ulartangga[toId].timeoutId = setTimeout(timeoutCallback, gameDuration);
                const initialBoard = await generateUlarTanggaImage(ulartangga[toId]);
                if (!initialBoard) throw new Error("Gagal membuat papan permainan.");
                const welcomeMessage = `🐍🪜 *Permainan Ular Tangga Dimulai!* 🪜🐍\n\n` +
                  `Pemain: @${playerId.split('@')[0]} (Pion Merah)\n` +
                  `Lawan: Bot (Pion Biru Muda)\n` +
                  `Sesi akan berakhir dalam 3 menit jika tidak aktif.\n\n` +
                  `Giliran Kamu! Ketik *roll* atau *kocok* untuk melempar dadu.`;
                await sPesan({ image: initialBoard, caption: welcomeMessage, mentions: [playerId] });
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'g-othello')) {
              try {
                if (othelloGame[toId]) throw new Error("Masih ada sesi Othello yang berjalan. Hentikan dengan mengetik *menyerah*.");
                const playerJid = serial;
                const board = createOthelloBoard();
                const playerValidMoves = getValidOthelloMoves(board, PLAYER_BLACK);
                const gameDuration = 10 * 60 * 1000;
                const timeoutCallback = () => {
                  if (othelloGame[toId]) {
                    delete othelloGame[toId];
                  }
                };
                const timeoutId = setTimeout(timeoutCallback, gameDuration);
                othelloGame[toId] = {
                  board: board,
                  players: {
                    black: playerJid,
                    white: 'BOT'
                  },
                  turn: PLAYER_BLACK,
                  validMoves: playerValidMoves,
                  timeoutId: timeoutId
                };
                const boardBuffer = await generateOthelloBoardImage(board, playerValidMoves);
                const score = calculateOthelloScore(board);
                let caption = `⚫️ *Game Othello Dimulai!* ⚪️\n\n`;
                caption += `Kamu (Hitam): @${playerJid.split('@')[0]}\n`;
                caption += `Lawan (Putih): Bot\n\n`;
                caption += `Skor: Hitam ${score.black} - ${score.white} Putih\n\n`;
                caption += `Giliran Kamu. Ketik koordinat untuk bergerak (contoh: *f5*).`;
                await sReply({ image: boardBuffer, caption: caption, mentions: [playerJid] });
                await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'g-minesweeper')) {
              try {
                if (minesweeperSessions[toId]) throw new Error("Sudah ada game Minesweeper berjalan di grup ini.");
                const level = args[0] || 'mudah';
                const startMinesweeperTimeout = (idGroup) => {
                  const gameDuration = 10 * 60 * 1000;
                  const timeoutCallback = () => {
                    if (minesweeperSessions[idGroup]) {
                      delete minesweeperSessions[idGroup];
                    }
                  };
                  minesweeperSessions[idGroup].timeoutId = setTimeout(timeoutCallback, gameDuration);
                };
                let width, height, numMines;
                if (level === 'sedang') { width = 12; height = 12; numMines = 20; }
                else if (level === 'sulit') { width = 15; height = 15; numMines = 40; }
                else { width = 9; height = 9; numMines = 10; }
                const solutionBoard = generateMinesweeperBoard(width, height, numMines);
                const playerBoard = Array(height).fill(null).map(() => Array(width).fill({ status: 'tertutup', value: '' }));
                minesweeperSessions[toId] = {
                  playerJid: serial,
                  solutionBoard,
                  playerBoard,
                  gameStatus: 'playing',
                  mineCount: numMines,
                  timeoutId: null
                };
                startMinesweeperTimeout(toId);
                let introText = `Game Minesweeper level *${level}* dimulai!\n\n` +
                  `Total Bom: ${numMines}\n` +
                  `Sesi akan berakhir dalam 10 menit jika tidak aktif.\n\n` +
                  `Gunakan perintah:\n` +
                  `▫️ *buka <koordinat>* (contoh: buka c5)\n` +
                  `▫️ *tandai <koordinat>* (contoh: tandai a1)\n` +
                  `▫️ *batal <koordinat>* (contoh: batal a1)`;
                introText += formatMinesweeperBoard(playerBoard);
                await sReply(introText); await limitAddGame(serial);
                await addXp(fn, toId, serial, m); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'g-ludo')) {
              try {
                if (!m.isGroup) throw new Error("Permainan Ludo hanya bisa dimainkan di grup.");
                if (ludoSessions[toId]) throw new Error("Sudah ada permainan Ludo berjalan. Ketik `stop` untuk berhenti.");
                let botCount = 1;
                if (args[0] === '3p') botCount = 2;
                if (args[0] === '4p') botCount = 3;
                const activePlayers = ['RED', ...PLAYERS.slice(0, botCount)];
                const pawnPositions = {};
                activePlayers.forEach(color => {
                  pawnPositions[color] = BASE_POSITIONS[color];
                });
                const newGameState = {
                  playerJid: serial,
                  players: activePlayers,
                  pawnPositions: pawnPositions,
                  turn: activePlayers.indexOf('RED'),
                  status: 'WAITING_FOR_ROLL',
                  timeoutId: null
                };
                ludoSessions[toId] = newGameState;
                const botColors = activePlayers.filter(c => c !== 'RED').join(', ');
                const welcomeMessage = `🎲 *Ludo Cepat (1 Pion) Dimulai!* 🎲\n\n` +
                  `Kamu bermain sebagai *Merah*.\n` +
                  `Lawan: *${botCount} Bot* (${botColors}).\n` +
                  `Semua pion mulai di kandang. Dadu 6 untuk keluar.\n` +
                  `Sesi akan berakhir dalam 5 menit jika tidak aktif.\n\n` +
                  `Giliran Kamu pertama! Ketik *roll* atau *kocok*.`;
                const initialBoard = await generateLudoBoard(newGameState);
                if (!initialBoard) throw new Error("Gagal membuat papan permainan.");
                await sReply({ image: initialBoard, caption: welcomeMessage, mentions: [serial] });
                startLudoTimeout(toId);
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'g-sudoku')) {
              try {
                if (sudokuGame[toId]) throw new Error("Masih ada sesi Sudoku yang berjalan. Hentikan dengan mengetik *menyerah*.");
                const difficultyArg = args[0] ? args[0].toLowerCase() : 'easy';
                const difficultyMap = {
                  easy: 45,
                  normal: 38,
                  hard: 31,
                  extreme: 24
                };
                const cellsToKeep = difficultyMap[difficultyArg] || difficultyMap['easy'];
                const difficultyName = Object.keys(difficultyMap).find(key => difficultyMap[key] === cellsToKeep);
                const base_puzzle = sudoku.makepuzzle();
                const solution = sudoku.solvepuzzle(base_puzzle);
                const puzzle = [...solution];
                const indices = Array.from(Array(81).keys()).sort(() => Math.random() - 0.5);
                const cellsToRemove = 81 - cellsToKeep;
                for (let i = 0; i < cellsToRemove; i++) {
                  puzzle[indices[i]] = null;
                }
                const playerBoard = [...puzzle];
                const gameDuration = 5 * 60 * 1000;
                const timeoutCallback = () => {
                  if (sudokuGame[toId]) {
                    delete sudokuGame[toId];
                  }
                };
                const timeoutId = setTimeout(timeoutCallback, gameDuration);
                sudokuGame[toId] = {
                  puzzle,
                  solution,
                  board: playerBoard,
                  player: serial,
                  timeoutId: timeoutId,
                  hintsUsed: 0
                };
                const boardBuffer = await generateSudokuBoardImage(puzzle, playerBoard);
                let caption = `🧩 *Game Sudoku Dimulai!* 🧩\n\n`;
                caption += `Level: *${difficultyName.charAt(0).toUpperCase() + difficultyName.slice(1)}*\n\n`;
                caption += `Isi kotak yang kosong dengan angka 1-9.\n\n`;
                caption += `➡️ *a1 5* untuk mengisi angka.\n`;
                caption += `➡️ *a1 0* untuk menghapus angka.\n`;
                caption += `➡️ *hint* untuk bantuan jawaban.\n`;
                caption += `➡️ *cek* untuk memeriksa jawabanmu.\n`;
                caption += `➡️ *menyerah* untuk mengakhiri game.`;
                await sReply({ image: boardBuffer, caption: caption }); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            }
            ctype = "pvpgame"
            if (!commandFound && await getComs(txt, 'p-family100')) {
              try {
                if (family100[toId]) throw new Error('Masih ada sesi Family100 yang belum diselesaikan.');
                const soal = require('./src/games/family100.json')
                const hasil = randomChoice(soal)
                family100[toId] = [
                  hasil.soal,
                  hasil.jawaban,
                  Array(hasil.jawaban.length).fill(false),
                  {
                    benar: {},
                    salah: {}
                  },
                  setTimeout(async () => {
                    if (family100[toId]) {
                      const [, jawaban, status] = family100[toId];
                      const belum = jawaban.map((j, i) => status[i] ? null : `❎ ${j}`).filter(Boolean).join('\n');
                      await sReply(`⏰ Waktu habis!\n\nJawaban:\n- ${jawaban.join('\n')}\n\nYang belum terjawab:\n${belum}`);
                      delete family100[toId];
                    }
                  }, 300000),
                  await sPesan(`Tebak kuis berikut ini:\n\n📌 ${hasil.soal}\n⏳ Waktu: 5 menit\n🏆 Hadiah total: *600*\n\nKetik jawabanmu satu per satu.`)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
                /*
                function _checkData(data) {
                  const result = {};
                  for (const key in data) {
                    const [soal, jawaban, status, contribs, , msg] = data[key];
                    result[key] = [soal, jawaban, status, contribs, msg];
                  }
                  return result;
                }
                await log(JSON.stringify(_checkData(family100)));
                */
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'p-math')) {
              try {
                if (!arg) throw new Error('Mode: noob | easy | medium | hard | extreme\n\nContoh penggunaan: ' + dbSettings.sname + 'game-math noob');
                let mode = args[0].toLowerCase();
                if (!(mode in modes)) throw new Error('Mode: noob | easy | medium | hard | extreme\n\nContoh penggunaan: ' + dbSettings.rname + 'game-math noob');
                if (toId in gamematematika) throw new Error('Masih ada soal belum terjawab di chat ini', gamematematika[toId][0]);
                let math = genMath(mode);
                gamematematika[toId] = [
                  await sPesan(`Berapa hasil dari *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed()} detik\nPoint Jawaban Benar: ${formatNumber(math.bonus)} Saldo`),
                  math,
                  4,
                  setTimeout(async () => {
                    if (gamematematika[toId]) await sReply(`Waktu habis!\nJawabannya adalah ${math.result}`, gamematematika[toId][0]);
                    delete gamematematika[toId];
                  }, math.time)
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'p-hangman')) {
              try {
                if (!arg) throw new Error(`Gunakan perintah: ${dbSettings.rname}p-hangman <normal|expert>`);
                const mode = args[0]?.toLowerCase();
                if (!['normal', 'expert'].includes(mode)) throw new Error('Gunakan perintah: p-hangman <normal|expert>');
                if (hangman[toId]) throw new Error('Masih ada sesi Hangman yang belum selesai.');
                const soalData = require('./src/games/hangman.json')
                const kategori = randomChoice(Object.keys(soalData))
                const soal = randomChoice(soalData[kategori])
                const hiddenWord = soal.jawaban.toLowerCase()
                const display = hiddenWord.replace(/[a-z]/gi, (huruf) => huruf === ' ' ? ' ' : '•')
                const benar = {}
                const salah = {}
                const reward = mode === 'normal' ? 500n : 2000n
                const duration = mode === 'normal' ? 5 * 60 * 1000 : 3 * 60 * 1000
                const timeout = setTimeout(async () => {
                  const [,,,, modeNow,, soalAkhir] = hangman[toId];
                  let teks = `⏰ *Waktu habis!*\n`;
                  teks += `🧩 Jawaban: *${soalAkhir.jawaban.toUpperCase()}*\n📖 Deskripsi: ${soalAkhir.deskripsi}\n\n`;
                  teks += modeNow === 'normal' ? '💸 Tidak ada reward karena tidak diselesaikan.' : '📉 Tidak ada reward karena game tidak diselesaikan.';
                  delete hangman[toId];
                  await sPesan(teks);
                }, duration);
                hangman[toId] = [
                  hiddenWord,
                  display.split(''),
                  kategori, {
                    benar,
                    salah,
                    menyerah: {}
                  },
                  mode,
                  timeout,
                  soal
                ];
                await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                await sPesan(
                  '🎮 *Hangman - ' + mode.toUpperCase() + ' MODE*\n' +
                  '📌 Clue: ' + kategori + '\n' +
                  '🧩 Kata: ' + display + '\n' +
                  '💰 Reward: ' + formatNumber(reward) + ' Saldo\n' +
                  '⏳ Waktu: ' + (duration / 60000) + ' menit\n\n' +
                  'Ketik satu huruf untuk mulai menebak.'
                );
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'p-werewolf')) {
              try {
                if (!arg) throw new Error(`Format pesan salah, gunakan perintah:\n\n${dbSettings.rname}p-werewolf create (untuk membuat sesi)\n${dbSettings.rname}p-werewolf join (untuk bergabung dalam sesi permainan)\n${dbSettings.rname}p-werewolf start (untuk memulai permainan)\n${dbSettings.rname}p-werewolf stop (untuk menghentikan permainan)\n\nNB: \n1. hanya host yang bisa mengentikan permainan untuk mencegah anomali yang suka rusuh...\n2. minimal pemain berjumlah 4 orang.`)
                const command = args[0]?.toLowerCase();
                if (!m.isGroup) throw new Error("Game Werewolf hanya bisa dimainkan di dalam grup.");
                if (command === 'create') {
                  if (werewolfSessions[toId]) throw new Error('Sesi Werewolf sudah ada di grup ini.');
                  werewolfSessions[toId] = {
                    status: 'LOBBY',
                    host: serial,
                    pemain: {},
                    day: 0,
                    timeoutId: null
                  };
                  const lobbyTimeout = setTimeout(async () => {
                    if (werewolfSessions[toId] && werewolfSessions[toId].status === 'LOBBY') {
                      await sPesan("Lobby Werewolf ditutup karena tidak ada aktivitas.");
                      delete werewolfSessions[toId];
                    }
                  }, 15 * 60 * 1000);
                  werewolfSessions[toId].timeoutId = lobbyTimeout;
                  await sPesan('🐺 Lobby Werewolf telah dibuat! Ketik `.p-werewolf join` untuk bergabung. Host bisa memulai dengan `.p-werewolf start`');
                  await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                } else if (command === 'join') {
                  const gameState = werewolfSessions[toId];
                  if (!gameState || gameState.status !== 'LOBBY') throw new Error('Tidak ada lobby Werewolf yang aktif.');
                  if (gameState.pemain[serial]) throw new Error('Kamu sudah bergabung.');
                  gameState.pemain[serial] = { id: serial, nama: pushname, isAlive: true, role: null };
                  await sPesan(`@${serial.split('@')[0]} telah bergabung! Total pemain: ${Object.keys(gameState.pemain).length}`);
                  await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                } else if (command === 'start') {
                  const gameState = werewolfSessions[toId];
                  if (!gameState || gameState.status !== 'LOBBY') throw new Error('Tidak ada lobby Werewolf yang aktif.');
                  if (gameState.host !== serial) throw new Error('Hanya host yang bisa memulai game.');
                  if (Object.keys(gameState.pemain).length < 4) throw new Error('Pemain minimal 4 orang untuk memulai.');
                  clearTimeout(gameState.timeoutId);
                  const gameTimeout = setTimeout(() => {
                    endGame(toId, "Game dihentikan karena tidak ada aktivitas selama 30 menit.", fn, m);
                  }, 30 * 60 * 1000);
                  gameState.timeoutId = gameTimeout;
                  initializeGameWW(toId, fn, m);
                  await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                } else if (command === 'stop') {
                  const gameState = werewolfSessions[toId];
                  if (!gameState) throw new Error('Tidak ada game yang sedang berlangsung.');
                  if (gameState.host !== serial) throw new Error('Hanya host yang bisa menghentikan game.');
                  endGame(toId, "Game dihentikan oleh host.", fn, m);
                  await addXp(fn, toId, serial, m); await counthit(serial); await limitAddGame(serial);
                }
                commandFound = true;
              } catch (error) {
                await log(error); await sReply(error.message); await counthit(serial);
              }
            }
            ctype = "convert";
            if (!commandFound && await getPrefix(txt, 'tahta')) {
              try {
                const text = (args[0] || '').toUpperCase();
                if (!text) throw new Error(`Teks tidak boleh kosong.\nGunakan format: ${dbSettings.sname}tahta NAMA`);
                if (text.length > 8) throw new Error(`Teks terlalu panjang! Maksimal 8 huruf.`);
                if (/[^A-Z]/.test(text)) throw new Error(`Teks hanya boleh berisi huruf A-Z.`);
                const outputPath = `./src/sampah/tahta-${id}.jpg`;
                const convertArgs = [
                  '-size', '512x512',
                  '-background', 'black',
                  'xc:black',
                  '-pointsize', '90',
                  '-font', './src/fonts/harta.ttf',
                  '-gravity', 'center',
                  '-tile', './src/image/rainbow.jpg',
                  '-annotate', '+0+0', `HARTA\nTAHTA\n${text}`,
                  '-wave', '4.5x64',
                  outputPath
                ];
                await new Promise((resolve, reject) => {
                  const child = spawn('convert', convertArgs);
                  let stderr = '';
                  child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
                  child.on('error', (error) => {
                    reject(error);
                  });
                  child.on('close', (code) => {
                    if (code !== 0) {
                      const errorMessage = stderr.trim() || `ImageMagick keluar dengan kode error ${code}`;
                      reject(new Error(errorMessage));
                    } else {
                      resolve();
                    }
                  });
                });
                await fn.sendFilePath(toId, dbSettings.autocommand, outputPath, { quoted: m });
                await deleteFile(outputPath); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message || 'Terjadi kesalahan saat membuat gambar.'); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'harta')) {
              try {
                if (args.length === 0) throw new Error(`Teks tidak boleh kosong.\nGunakan format: ${dbSettings.sname}harta NAMA`);
                const text = args[0].toUpperCase();
                if (text.length > 8) throw new Error(`Teks terlalu panjang! Maksimal 8 huruf.`);
                if (/[^A-Z]/.test(text)) throw new Error(`Teks hanya boleh berisi huruf A-Z.`);
                const outputPath = `./src/sampah/harta-${id}.jpg`;
                const convertArgs = [
                  '-size', '512x512',
                  '-background', 'black',
                  'xc:black',
                  '-pointsize', '90',
                  '-font', './src/fonts/harta.ttf',
                  '-gravity', 'center',
                  '-tile', './src/image/rainbow.jpg',
                  '-annotate', '+0+0', `HARTA\nTAHTA\n${text}`,
                  '-wave', '4.5x64',
                  outputPath
                ];
                await new Promise((resolve, reject) => {
                  const child = spawn('convert', convertArgs);
                  let stderr = '';
                  child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
                  child.on('error', reject);
                  child.on('close', (code) => {
                    if (code !== 0) {
                      const errorMessage = stderr.trim() || `ImageMagick keluar dengan kode error ${code}`;
                      reject(new Error(errorMessage));
                    } else {
                      resolve();
                    }
                  });
                });
                const buffer = await sharp(outputPath).webp().toBuffer();
                await sendRawWebpAsSticker(buffer);
                await deleteFile(outputPath); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message || 'Terjadi kesalahan saat membuat stiker.'); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'create')) {
              try {
                if (!arg || args.length !== 3) throw new Error('Gunakan format: .create KATA1 KATA2 KATA3\nContoh: .create HARTA TAHTA ANIME');
                const text1 = args[0].toUpperCase();
                const text2 = args[1].toUpperCase();
                const text3 = args[2].toUpperCase();
                if ([text1, text2, text3].some(t => t.length > 8)) throw new Error('Setiap kata tidak boleh lebih dari 8 huruf.');
                const outputPath = `./src/sampah/create-${id}.jpg`;
                const convertArgs = [
                  '-size', '512x512',
                  '-background', 'black',
                  'xc:black',
                  '-pointsize', '90',
                  '-font', './src/fonts/harta.ttf',
                  '-gravity', 'center',
                  '-tile', './src/image/rainbow.jpg',
                  '-annotate', '+0+0', `${text1}\n${text2}\n${text3}`,
                  '-wave', '4.5x64',
                  outputPath
                ];
                await new Promise((resolve, reject) => {
                  const child = spawn('convert', convertArgs);
                  let stderr = '';
                  child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
                  child.on('error', reject);
                  child.on('close', (code) => {
                    if (code !== 0) {
                      const errorMessage = stderr.trim() || `ImageMagick keluar dengan kode error ${code}`;
                      reject(new Error(errorMessage));
                    } else {
                      resolve();
                    }
                  });
                });
                const buffer = await sharp(outputPath).webp().toBuffer();
                await sendRawWebpAsSticker(buffer);
                await deleteFile(outputPath); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message || 'Terjadi kesalahan saat membuat stiker kustom.'); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'toimg')) {
              try {
                if (quotedMsg && quotedMsg?.type === "stickerMessage") {
                  const mediaData = await fn.getMediaBuffer(quotedMsg);
                  let isAnimated = false;
                  try {
                    const metadata = await sharp(mediaData).metadata();
                    if ((metadata.pages && metadata.pages > 1) || (metadata.frames && metadata.frames > 1)) {
                      isAnimated = true;
                    }
                  } catch {
                    const animChunkIndex = mediaData.indexOf('ANIM', 12);
                    if (animChunkIndex !== -1) {
                      isAnimated = true;
                    }
                  }
                  if (isAnimated) {
                    const inputGifPath = path.join(global.tmpDir, `sticker_in-${Date.now()}.gif`);
                    const outputMp4Path = path.join(global.tmpDir, `video_out-${Date.now()}.mp4`);
                    try {
                      const gifBuffer = await sharp(mediaData, { animated: true }).gif().toBuffer();
                      await fs.writeFile(inputGifPath, gifBuffer);
                      const ffmpegCommand = `ffmpeg -i "${inputGifPath}" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -movflags +faststart "${outputMp4Path}"`;
                      await exec(ffmpegCommand);
                      await fn.sendFilePath(toId, dbSettings.autocommand, outputMp4Path, { quoted: m });
                    } finally {
                      await deleteFile(inputGifPath); await deleteFile(outputMp4Path);
                    }
                  } else {
                    const tmpPath = path.join(global.tmpDir, `sticker-${Date.now()}.webp`);
                    await fs.writeFile(tmpPath, mediaData);
                    await fn.sendFilePath(toId, dbSettings.autocommand, tmpPath, { quoted: m });
                    await deleteFile(tmpPath);
                  }
                } else {
                  let inputText;
                  if (quotedMsg && (quotedMsg?.type === "extendedTextMessage" || quotedMsg?.type === "conversation")) {
                    inputText = quotedMsg?.body;
                  } else if (args.length > 0) {
                    inputText = args.join(' ');
                  } else {
                    throw new Error("Berikan teks atau balas stiker/teks yang ingin diubah menjadi gambar.");
                  }
                  if (inputText.length > 200) throw new Error("Teks terlalu panjang! Maksimal 200 karakter.");
                  const buffer = await bratGenerator(inputText);
                  const tmpImagePath = await saveFile(buffer, "brat", 'jpg');
                  await fn.sendFilePath(toId, dbSettings.autocommand, tmpImagePath, { quoted: m });
                  await deleteFile(tmpImagePath);
                }
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message || "Terjadi kesalahan yang tidak diketahui."); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'toaudio')) {
              let inputPath = '';
              let outputPath = '';
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                const mime = targetMsg?.videoMessage?.mimetype || targetMsg?.documentMessage?.mimetype;
                if (!mime || !mime.includes('video')) throw new Error("Silakan balas video atau kirim video dengan caption `.toaudio`.");
                const buffer = await fn.getMediaBuffer(targetMsg);
                if (!buffer) throw new Error("Gagal mendapatkan data media dari pesan.");
                const timestamp = Date.now();
                const videoExtension = mime.split('/')[1] || 'mp4';
                inputPath = path.join(global.tmpDir, `toaudio_in-${timestamp}.${videoExtension}`);
                outputPath = path.join(global.tmpDir, `toaudio_out-${timestamp}.mp3`);
                await fs.writeFile(inputPath, buffer);
                const ffmpegCommand = `ffmpeg -i "${inputPath}" -vn -c:a libmp3lame -q:a 2 "${outputPath}"`;
                await exec(ffmpegCommand);
                await fn.sendFilePath(toId, global.filename, outputPath, { quoted: m });
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message || "Terjadi kesalahan saat mengonversi video ke audio."); await counthit(serial);
              } finally {
                await deleteFile(inputPath); await deleteFile(outputPath);
              }
            } else if (!commandFound && await getPrefix(txt, 'bratvid')) {
              let tempFrameDir = '';
              let outputPath = '';
              try {
                let bgColor = "#FFFFFF";
                let inputText = '';
                const stickerOptions = { packname: dbSettings.packName, author: dbSettings.packAuthor };
                const hexColorRegex = /^#([0-9A-F]{3,4}){1,2}$/i;
                if (arg.includes('|')) {
                  const parts = arg.split('|');
                  const colorArg = parts[0].trim().toLowerCase();
                  inputText = parts.slice(1).join('|').trim();
                  if (colorNameMap[colorArg]) {
                    bgColor = colorNameMap[colorArg];
                  } else if (hexColorRegex.test(colorArg)) {
                    bgColor = colorArg;
                  } else {
                    throw new Error(`Warna "${parts[0].trim()}" tidak dikenali. Gunakan nama warna dasar (merah, pink, ungu, biru, indigo, toska, hijau, kuning, oranye, putih, hitam, abu) atau kode hex (#RRGGBB).`);
                  }
                } else {
                  inputText = arg;
                }
                if (!inputText && quotedMsg) {
                  if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                    inputText = quotedMsg?.body;
                  }
                }
                if (!inputText) throw new Error(`Format salah.\n\nContoh:\n1. ${dbSettings.rname}bratvid teks kamu\n2. ${dbSettings.rname}bratvid biru | teks kamu\n3. ${dbSettings.rname}bratvid #FF9800 | teks kamu`);
                if (inputText.length > 200) throw new Error("Teks terlalu panjang! Maksimal 200 karakter.");
                let textColor = getContrastColor(bgColor);
                const highlightRegex = /(?:--|—)\S+/g;
                const matches = inputText.match(highlightRegex) || [];
                const cleanedArray = matches.map(word => {
                  return word.startsWith('--') ? word.slice(2) : word.slice(1);
                });
                const cleanedString = inputText.replace(highlightRegex, (match) => {
                  return match.startsWith('--') ? match.slice(2) : match.slice(1);
                });
                let frames = await bratVidGenerator(cleanedString, 512, 512, bgColor, textColor, cleanedArray);
                tempFrameDir = await fs.mkdtemp(path.join(global.tmpDir, 'bratvid-frames-'));
                outputPath = path.join(tempFrameDir, `${global.randomSuffix}.webp`);
                let frameFiles = [];
                for (let i = 0; i < frames.length; i++) {
                  let framePath = path.join(tempFrameDir, `frame_${i}.png`);
                  await fs.writeFile(framePath, frames[i]);
                  frameFiles.push(framePath);
                }
                await generateAnimatedBratVid(tempFrameDir, outputPath);
                await fn.sendRawWebpAsSticker(toId, await fs.readFile(outputPath), m, stickerOptions);
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await counthit(serial); await log(`Error pada perintah bratvid:\n${error}`, true);
                await sReply(error.message || "Terjadi kesalahan.");
              } finally {
                if (tempFrameDir) {
                  await fs.rm(tempFrameDir, { recursive: true, force: true });
                }
              }
            } else if (!commandFound && await getPrefix(txt, 'brat')) {
              try {
                let inputText;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  inputText = quotedMsg?.body;
                } else if (arg.length > 0) {
                  inputText = arg;
                } else {
                  throw new Error("Teks input tidak ditemukan. Balas sebuah pesan atau ketik teks setelah perintah.");
                }
                if (inputText.length > 200) throw new Error("Teks terlalu panjang (maksimal 200 karakter).");
                const highlightRegex = /(?:--|—)\S+/g;
                const matches = inputText.match(highlightRegex) || [];
                const cleanedArray = matches.map(word => {
                  return word.startsWith('--') ? word.slice(2) : word.slice(1);
                });
                const cleanedString = inputText.replace(highlightRegex, (match) => {
                  return match.startsWith('--') ? match.slice(2) : match.slice(1);
                });
                const buffer = await bratGenerator(cleanedString, cleanedArray);
                const webpSticker = await webpFormatter(buffer, "contain");
                await sendRawWebpAsSticker(webpSticker); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message || "Terjadi kesalahan saat membuat stiker brat.");
                await counthit(serial);
                if (!error.message.includes("Input tidak ditemukan") && !error.message.includes("Teks terlalu panjang")) {
                  await log(error);
                }
              }
            } else if (!commandFound && await getPrefix(txt, 'ttp')) {
              try {
                const randomStyle = { color: randomChoice(warna) };
                let inputText
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  inputText = quotedMsg?.body
                } else if (arg.length > 0) {
                  inputText = arg
                } else {
                  throw new Error("!Error");
                }
                if (inputText.length > 200) throw new Error("!Error");
                let randomFonts = ["SpicyRice", "Bangers"];
                let hasilRandomFonts = randomChoice(randomFonts);
                const result = await generateTTP(inputText, randomStyle, hasilRandomFonts);
                const webpSticker = await webpFormatter(result, "contain");
                await sendRawWebpAsSticker(webpSticker); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'attp-blink')) {
              try {
                let text = '';
                const textLimit = 100;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  text = quotedMsg?.body;
                } else if (arg) {
                  text = arg;
                }
                if (!text || text.length >= textLimit) throw new Error(`Teks tidak boleh kosong atau lebih dari ${textLimit} karakter.`);
                let randomFonts = ["SpicyRice", "Bangers"];
                let hasilRandomFonts = randomChoice(randomFonts);
                const result = await attpBlinkGenerate(text, hasilRandomFonts);
                await sendRawWebpAsSticker(result); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'attp-gradient')) {
              try {
                let text = '';
                const textLimit = 100;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  text = quotedMsg?.body;
                } else if (arg) {
                  text = arg;
                }
                if (!text || text.length >= textLimit) throw new Error(`Teks tidak boleh kosong atau lebih dari ${textLimit} karakter.`);
                let randomFonts = ["SpicyRice", "Bangers"];
                let hasilRandomFonts = randomChoice(randomFonts);
                let fireColors = ['#FF4E50', '#F9D423', '#FF2400'];
                let oceanColors = ['#1D2B64', '#3F51B1', '#2196F3', '#4CAF50'];
                let synthwaveColors = ['#F72585', '#B5179E', '#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0'];
                let pastelColors = ['#FADADD', '#FAD3E8', '#E6E6FA', '#D4F0F0', '#B0E0E6'];
                let rainbowColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
                let colors = [
                  "#26c4dc", "#792138",
                  "#8b6990", "#f0b330",
                  "#ae8774", "#5696ff",
                  "#ff7b6b", "#57c9ff",
                  "#243640", "#b6b327",
                  "#c69fcc", "#54c265",
                  "#6e257e", "#c1a03f",
                  "#90a841", "#7acba5",
                  "#8294ca", "#a62c71",
                  "#ff8a8c", "#7e90a3",
                  "#74676a"
                ];
                let randomColors = [fireColors, oceanColors, synthwaveColors, pastelColors, rainbowColors, colors]
                let hasilRandomColors = randomChoice(randomColors);
                const result = await attpGradientGenerate(text, hasilRandomFonts, hasilRandomColors);
                await sendRawWebpAsSticker(result); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'attp-walking')) {
              try {
                let text = '';
                const textLimit = 100;
                if ((quotedMsg && quotedMsg?.type === "extendedTextMessage") || (quotedMsg && quotedMsg?.type === "conversation")) {
                  text = quotedMsg?.body;
                } else if (arg) {
                  text = arg;
                }
                if (!text || text.length >= textLimit) throw new Error(`Teks tidak boleh kosong atau lebih dari ${textLimit} karakter.`);
                let randomFonts = ["SpicyRice", "Bangers"];
                let hasilRandomFonts = randomChoice(randomFonts);
                const result = await attpWalkingGenerate(text, hasilRandomFonts);
                await sendRawWebpAsSticker(result); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getComs(txt, 'upscale')) {
              let inputPath = '';
              let outputPath = '';
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                const mimeType = targetMsg?.imageMessage?.mimetype;
                if (!mimeType) throw new Error(`Kirim atau balas pesan gambar untuk diubah.`);
                const media = await fn.getMediaBuffer(targetMsg);
                if (!media) throw new Error('Gagal mengunduh media.');
                const dimensions = sizeOf(media);
                const { width, height } = dimensions;
                inputPath = await saveFile(media, "upscale", 'jpg');
                outputPath = path.join(global.tmpDir, `upscale-out-${Date.now()}.jpg`);
                const TARGET_RESOLUTION = 4096;
                if (width >= TARGET_RESOLUTION || height >= TARGET_RESOLUTION) throw new Error("Gambar ini sudah memiliki resolusi tinggi, tidak perlu di-HD.");
                const scaleX = TARGET_RESOLUTION / width;
                const scaleY = TARGET_RESOLUTION / height;
                const scaleFactor = Math.min(scaleX, scaleY, 9);
                const command = `ffmpeg -i "${inputPath}" -vf "scale=iw*${scaleFactor}:ih*${scaleFactor}:flags=lanczos" -q:v 1 "${outputPath}"`;
                await exec(command);
                await fn.sendFilePath(toId, dbSettings.autocommand, outputPath, { quoted: m }); await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) {
                await log(`HD Command Error:\n${error}`, true);
                await sReply('Terjadi kesalahan saat memproses gambar. Coba lagi.'); await counthit(serial);
              } finally {
                await deleteFile(inputPath); await deleteFile(outputPath);
              }
            } else if (!commandFound && await getComs(txt, 'circle')) {
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                if (!targetMsg) throw new Error("Media tidak ditemukan.");
                const mime = targetMsg?.imageMessage?.mimetype || targetMsg?.videoMessage?.mimetype
                if (!mime) throw new Error("Kirim atau balas gambar/video untuk dijadikan stiker.");
                const buffer = await fn.getMediaBuffer(targetMsg)
                const isVideo = mime === "video/mp4" || mime === "image/gif"
                const duration = targetMsg?.videoMessage?.seconds || 0
                if (!buffer) throw new Error("Gagal mengunduh media.");
                if (isVideo && duration > 20) throw new Error("❎ Durasi video terlalu panjang. Maksimal 10 detik untuk stiker.");
                if (isVideo) {
                  const inputPath = path.join(__dirname, `temp_${Date.now()}_input.mp4`);
                  const outputPath = path.join(__dirname, `temp_${Date.now()}_output.webp`);
                  try {
                    await fs.writeFile(inputPath, buffer);
                    await new Promise((resolve, reject) => {
                      ffmpeg(inputPath)
                        .complexFilter([
                          '[0:v]scale=512:512:force_original_aspect_ratio=increase,crop=512:512,setsar=1,format=rgba[main]',
                          'color=black:s=512x512,format=gray[b];[b]geq=\'if(lte(sqrt(pow(X-256,2)+pow(Y-256,2)),256),255,0)\'[mask]',
                          '[main][mask]alphamerge[out]'
                        ])
                        .outputOptions([
                          '-map', '[out]',
                          '-vcodec', 'libwebp',
                          '-lossless', '0',
                          '-q:v', '70',
                          '-loop', '0',
                          '-an',
                          '-t', '10',
                          '-preset', 'default'
                        ])
                        .toFormat('webp')
                        .save(outputPath)
                        .on('end', () => {
                          resolve(true);
                        })
                        .on('error', (err) => {
                          reject(err);
                        });
                    });
                    const buffs = await fs.readFile(outputPath);
                    await sendRawWebpAsSticker(buffs);
                  } catch {
                    throw new Error("Gagal membuat stiker video.");
                  } finally {
                    await deleteFile(inputPath); await deleteFile(outputPath);
                  }
                } else {
                  const buffs = await makeCircleSticker(buffer);
                  await sendRawWebpAsSticker(buffs);
                }
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'snobg')) {
              let command = '';
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                if (!targetMsg) throw new Error("Media tidak ditemukan.");
                const mime = targetMsg?.imageMessage?.mimetype;
                if (!mime || !mime.startsWith('image/')) throw new Error("Kirim atau balas sebuah GAMBAR untuk dijadikan stiker.");
                const buffer = await fn.getMediaBuffer(targetMsg);
                if (!buffer) throw new Error("Gagal mengunduh media.");
                const inputPath = path.join(global.tmpDir, `${global.randomSuffix}.jpg`);
                const outputPath = path.join(global.tmpDir, `rembg${global.randomSuffix}.jpg`);
                let finalStickerBuffer;
                try {
                  await fs.writeFile(inputPath, buffer);
                  if (arg) {
                    command = `./venv/bin/python3 ./src/utils/rembege.py "${inputPath}" "${outputPath}" "${arg.toUpperCase()}"`;
                  } else {
                    command = `./venv/bin/python3 ./src/utils/rembege.py "${inputPath}" "${outputPath}"`;
                  }
                  await exec(command);
                  finalStickerBuffer = await fs.readFile(outputPath);
                } finally {
                  await deleteFile(inputPath); await deleteFile(outputPath);
                }
                await sendRawWebpAsSticker(finalStickerBuffer); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'smeme')) {
              let tmpInPath = '';
              try {
                if (!arg) throw new Error(`Mohon berikan teks yang ingin dijadikan sticker meme.`);
                arg = cleanFormattingText(arg);
                let textTop = '';
                let textBot = '';
                let square = true;
                if (arg.includes('--full')) {
                  square = false;
                  arg = arg.replace('--full', '').trim();
                }
                if (arg.includes('|')) {
                  const parts = arg.split('|').map(x => cleanFormattingText(x.trim()));
                  textBot = parts[0] || '';
                  textTop = parts[1] || '';
                } else {
                  textTop = '';
                  textBot = arg.trim();
                }
                let bufferMedia;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message);
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg);
                } else if (quotedMsg?.stickerMessage) {
                  const mediaData = await fn.getMediaBuffer(quotedMsg);
                  let isAnimated = false;
                  try {
                    const metadata = await sharp(mediaData).metadata();
                    if ((metadata.pages && metadata.pages > 1) || (metadata.frames && metadata.frames > 1)) {
                      isAnimated = true;
                    }
                  } catch {
                    const animChunkIndex = mediaData.indexOf('ANIM', 12);
                    if (animChunkIndex !== -1) {
                      isAnimated = true;
                    }
                  }
                  if (!isAnimated) {
                    bufferMedia = mediaData
                  }
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  try {
                    bufferMedia = await fn.profilePictureUrl(targetJid, 'image');
                  } catch {
                    bufferMedia = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk dijadikan sticker meme.`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                tmpInPath = await saveFile(bufferMedia, "smeme-in");
                const resBuffer = await generateMeme(tmpInPath, textTop, textBot, {
                  topPadding: 60,
                  bottomPadding: 30,
                  fontSize: 45,
                  square,
                });
                await sendRawWebpAsSticker(resBuffer); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message); await counthit(serial);
              } finally {
                await deleteFile(tmpInPath);
              }
            } else if (!commandFound && await getPrefix(txt, 'sline')) {
              const inputDir = './input';
              const outputDir = './output';
              const tmpDir = './tmp_apng_frames';
              try {
                if (!arg) throw new Error('Masukkan URL sticker LINE setelah perintah.');
                const lineUrl = arg;
                await fs.ensureDir(inputDir);
                await fs.ensureDir(outputDir);
                await fs.ensureDir(tmpDir);
                await exec(`./venv/bin/sticker-convert --download-line "${lineUrl}" --no-confirm --no-progress --no-compress --input-dir "${inputDir}"`);
                await delay(2000);
                const files = await fs.readdir(inputDir);
                const pngFiles = files.filter(f => f.endsWith('.png'));
                if (!pngFiles.length) throw new Error('❌ Tidak ada file stiker ditemukan.');
                for (const file of pngFiles) {
                  const inputPath = path.join(inputDir, file);
                  const outputPath = path.join(outputDir, file.replace('.png', '.webp'));
                  await exec(`rm -rf ${tmpDir}/*`);
                  await exec(`ffmpeg -i "${inputPath}" "${tmpDir}/frame_%04d.png"`);
                  await exec(`ffmpeg -framerate 15 -i "${tmpDir}/frame_%04d.png" -plays 0 -lossless 1 "${outputPath}"`);
                  try {
                    await fs.access(outputPath);
                    await fn.sendRawWebpAsSticker(toId, outputPath);
                  } catch {
                    await log(`File WebP tidak ditemukan: ${outputPath}`);
                  }
                }
                await fs.rm(inputDir, { recursive: true, force: true });
                await fs.rm(outputDir, { recursive: true, force: true });
                await fs.rm(tmpDir, { recursive: true, force: true });
                await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) {
                await sReply('⚠ Gagal memproses stiker LINE: ' + error.message); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'stele')) {
              const inputDir = './input';
              const tmpDir = './tmp_apng_frames';
              try {
                if (!arg) throw new Error('Masukkan URL sticker TELEGRAM setelah perintah.');
                const telegramUrl = arg;
                await fs.ensureDir(inputDir);
                await fs.ensureDir(tmpDir);
                await exec(`./venv/bin/sticker-convert --download-telegram "${telegramUrl}" --telegram-token "${process.env.TELE_TOKEN}" --telegram-userid "${process.env.TELE_USERID}" --no-confirm --no-progress --no-compress --input-dir "${inputDir}"`);
                await delay(2000);
                const files = await fs.readdir(inputDir);
                const webpFiles = files.filter(f => f.endsWith('.webp'));
                if (!webpFiles.length) throw new Error('❌ Tidak ada file stiker ditemukan.');
                for (const file of webpFiles) {
                  const inputPath = path.join(inputDir, file);
                  try {
                    await fs.access(inputPath);
                    await fn.sendRawWebpAsSticker(toId, inputPath);
                  } catch (error) {
                    await log(`File WebP tidak ditemukan: ${inputPath}\n${error}`, true);
                  }
                }
                await fs.rm(inputDir, { recursive: true, force: true });
                await fs.rm(tmpDir, { recursive: true, force: true });
                await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) {
                await sReply('⚠ Gagal memproses stiker TELEGRAM: ' + error.message); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'sticker')) {
              try {
                const [name, author] = (arg || '').split('|').map(str => str?.trim().substring(0, 10));
                const pack = { packname: (name || dbSettings.packName || '').substring(0, 10), author: (author || dbSettings.packAuthor || '').substring(0, 10) };
                let buffer;
                if (args[0]?.match(/^https?:\/\//)) {
                  try {
                    const response = await axios.get(args[0], { responseType: 'arraybuffer', timeout: 10000, maxContentLength: 5 * 1024 * 1024 });
                    const contentType = response.headers['content-type'];
                    if (!contentType.startsWith('image/') && !contentType.startsWith('video/')) throw new Error('URL harus mengarah ke gambar/video yang valid');
                    buffer = response.data;
                  } catch (error) {
                    throw new Error(`Gagal memproses URL: ${error.message.includes('timeout') ? 'Waktu unduh habis' : 'URL tidak valid'}`);
                  }
                } else {
                  const targetMsg = quotedMsg ? m.quoted || m : m.message;
                  if (!targetMsg) throw new Error("Balas gambar/video atau kirim media dengan caption .sticker");
                  const mime = [targetMsg.imageMessage?.mimetype, targetMsg.videoMessage?.mimetype, targetMsg.stickerMessage?.mimetype, targetMsg.documentMessage?.mimetype].find(Boolean) || '';
                  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'image/webp', 'image/gif'];
                  if (!allowedTypes.some(type => mime.includes(type))) throw new Error(`Format ${mime} tidak didukung. Gunakan: ${allowedTypes.join(', ')}`);
                  try {
                    buffer = await Promise.race([fn.getMediaBuffer(targetMsg), new Promise((_, reject) => setTimeout(() => reject(new Error('Waktu unduh habis')), 15000))]);
                  } catch (error) {
                    throw new Error(`Gagal mengambil media: ${error.message}`);
                  }
                  if (mime.includes('video') || mime.includes('gif')) {
                    const duration = targetMsg.videoMessage?.seconds || (targetMsg.documentMessage?.fileLength || 0) / 1000;
                    if (duration > 20) throw new Error("Durasi melebihi 10 detik");
                  }
                }
                if (!buffer || buffer.length < 100 || buffer.length > 5 * 1024 * 1024) throw new Error("Ukuran media tidak valid (min 100B, max 5MB)");
                try {
                  await fn.sendRawWebpAsSticker(toId, buffer, m, pack);
                } catch (error) {
                  log(`Conversion Error ${error.stack}`);
                  throw new Error("Gagal membuat stiker. Coba media lain.");
                }
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(`${error.message}`); await counthit(serial);
                log(`Conversion Error ${error}`);
              }
            } else if (!commandFound && await getPrefix(txt, 'fakestory')) {
              let tmpImagePath = '';
              try {
                const caption = arg;
                if (!caption) throw new Error("Silakan berikan teks untuk story.");
                if (caption.length > 2048) throw new Error("Teks terlalu panjang!");
                const username = pushname;
                let ppBuffer;
                try {
                  const ppUrl = await fn.profilePictureUrl(serial, 'image');
                  const response = await axios.get(ppUrl, { responseType: 'arraybuffer' });
                  ppBuffer = response.data;
                } catch {
                  ppBuffer = await fs.readFile('./src/media/fotobot.jpeg');
                }
                const resultBuffer = await generateFakeStory({
                  caption: caption,
                  username: username,
                  profilePicBuffer: ppBuffer
                });
                tmpImagePath = await saveFile(resultBuffer, "fakestory-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, tmpImagePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message || "Gagal membuat story."); await counthit(serial);
                await log(`Error pada perintah fakestory:\n${error}`, true);
              } finally {
                await deleteFile(tmpImagePath);
              }
            } else if (!commandFound && await getPrefix(txt, 'faketweet')) {
              let tempAvatarPath = '';
              let tmpImagePath = '';
              try {
                let bgColor;
                let inputText = arg;
                const hexColorRegex = /^#([0-9A-F]{3,4}){1,2}$/i;
                if (arg.includes('|')) {
                  const parts = arg.split('|');
                  const colorArg = parts[0].trim().toLowerCase();
                  const potentialText = parts.slice(1).join('|').trim();
                  if (colorNameMap[colorArg]) {
                    bgColor = colorNameMap[colorArg];
                    inputText = potentialText;
                  } else if (hexColorRegex.test(colorArg)) {
                    bgColor = colorArg;
                    inputText = potentialText;
                  }
                }
                if (!inputText && quotedMsg) {
                  inputText = quotedMsg?.body;
                }
                if (!inputText) throw new Error(`Format salah.\n\nContoh:\n.faketweet [warna] | [teks]\n\nAnda juga bisa membalas pesan.`);
                if (inputText.length > 2048) throw new Error("Teks terlalu panjang!");
                let ppBuffer;
                let userPP;
                try {
                  if (quotedMsg) {
                    userPP = quotedParticipant
                    ppBuffer = await fn.profilePictureUrl(userPP, 'image');
                  } else {
                    ppBuffer = await fn.profilePictureUrl(serial, 'image');
                  }
                } catch {
                  ppBuffer = await fs.readFile('./src/media/fotobot.jpeg');
                }
                let username = pushname;
                let userid = null;
                if (quotedMsg) {
                  userid = quotedParticipant;
                  username = fn.getName(userid);
                }
                const resultBuffer = await generateFakeTweet({
                  avatarUrl: ppBuffer,
                  user: {
                    displayName: username,
                    username: username.toLowerCase().replace(/\s/g, '_')
                  },
                  comment: inputText,
                  verified: true,
                  backgroundColor: bgColor
                });
                if (!resultBuffer) throw new Error("Gagal membuat gambar tweet (modul mengembalikan null).");
                tmpImagePath = await saveFile(resultBuffer, "faketweet-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, tmpImagePath, { quoted: m });
                await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message || "Gagal membuat faketweet."); await counthit(serial);
                await log(`Error pada perintah faketweet:\n${error}`, true);
              } finally {
                await deleteFile(tmpImagePath); await deleteFile(tempAvatarPath);
              }
            } else if (!commandFound && await getPrefix(txt, 'fakechat')) {
              let tmpImagePath = '';
              try {
                let caption = '';
                if (quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation')) {
                  caption = quotedMsg?.body;
                } else {
                  if (!arg) throw new Error(`gunakan perintah seperti ${dbSettings.rname}fakechat teksnya atau balas pesan dengan perintah ${dbSettings.rname}fakechat`);
                  caption = arg;
                }
                const resultBuffer = await generateFakeChatIphone({
                  text: caption,
                  chatTime: formatTimestampToHourMinute(m.timestamp),
                  statusBarTime: "11:02"
                });
                tmpImagePath = await saveFile(resultBuffer, "fakechat-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, tmpImagePath, { quoted: m }); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await sReply(error.message || "Gagal membuat IQC."); await counthit(serial);
                await log(`Error pada perintah IQC:\n${error}`, true);
              } finally {
                await deleteFile(tmpImagePath);
              }
            } else if (!commandFound && await getPrefix(txt, 'fakequotes')) {
              let tmpImagePath = '';
              try {
                if (!arg) throw new Error(`Mohon berikan teks yang ingin dibuatkan quotes..`);
                let bufferMedia;
                if (m.message?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(m.message)
                } else if (quotedMsg?.imageMessage) {
                  bufferMedia = await fn.getMediaBuffer(quotedMsg)
                } else if (mentionedJidList && mentionedJidList.length > 0) {
                  let targetJid = mentionedJidList[0];
                  try {
                    bufferMedia = await fn.profilePictureUrl(targetJid, 'image');
                  } catch {
                    bufferMedia = await fs.readFile('./src/image/default-dp.jpeg');
                  }
                } else {
                  throw new Error(`Mohon balas atau kirim gambar untuk dibuatkan quotes..`);
                }
                if (!bufferMedia) throw new Error(`Gagal mendapatkan media.`);
                const img = await loadImage(bufferMedia);
                const width = img.width;
                const height = img.height;
                const base = Math.min(width, height);
                const fontSize = Math.max(20, Math.floor(base * 0.06));
                const maxWidth = Math.floor(width * 0.5);
                const resBuffer = await generateQuote(bufferMedia, arg, {
                  fontSize,
                  maxWidth,
                });
                tmpImagePath = await saveFile(resBuffer, "fakequotes-in", 'jpg');
                await limitAdd(serial); await counthit(serial);
                await fn.sendFilePath(toId, dbSettings.autocommand, tmpImagePath, { quoted: m });
                commandFound = true;
              } catch (error) {
                await sReply(error.message || "Gagal membuat fakequotes.");
                await counthit(serial); await log(`Error pada perintah fakequotes:\n${error}`, true);
              } finally {
                await deleteFile(tmpImagePath);
              }
            } else if (!commandFound && await getPrefix(txt, 'sschat')) {
              try {
                const count = parseInt(args[0]) || 5;
                if (count > 20) throw new Error("Jumlah percakapan tidak boleh lebih dari 20.");
                await generateFakeChatWithQCGenerator(m, count, fn, store); await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
                commandFound = true;
              } catch (error) { await sReply(error.message); await counthit(serial); }
            } else if (!commandFound && await getPrefix(txt, 'qcimage')) {
              let finalImagePath = '';
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                if (!targetMsg) throw new Error("Media tidak ditemukan.");
                const mime = targetMsg?.imageMessage?.mimetype || targetMsg?.stickerMessage?.mimetype
                if (!mime) throw new Error("Kirim atau balas gambar!");
                let buffer = await fn.getMediaBuffer(targetMsg);
                if (!buffer) throw new Error("Gagal mengunduh media.");
                let bufferMedia = await sharp(buffer).png().toBuffer();
                let profilePicUrl = null;
                try {
                  profilePicUrl = await fn.profilePictureUrl(serial, 'image');
                } catch {
                  // log("lanjut");
                }
                let { text: finalCleanText, entities: allEntities } = processAllTextFormatting(arg, store, fn);
                const params = {
                  type: 'image',
                  format: 'png',
                  scale: 2,
                  backgroundColor: '#1a1a1a',
                  messages: [{
                    avatar: true,
                    from: {
                      id: 1,
                      name: pushname,
                      photo: { buffer: profilePicUrl }
                    },
                    text: finalCleanText,
                    entities: allEntities,
                    media: { buffer: bufferMedia }
                  }]
                };
                const result = await QuoteGenerator(params);
                finalImagePath = await saveFile(result.image, 'qc-image', 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, finalImagePath, { quoted: m });
                await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply(error.message || "Terjadi error saat membuat quote."); await counthit(serial);
              } finally {
                await deleteFile(finalImagePath);
              }
            } else if (!commandFound && await getPrefix(txt, 'qcstory')) {
              let finalImagePath = '';
              try {
                const targetMsg = quotedMsg ? m.quoted || m : m.message;
                if (!targetMsg) throw new Error("Media tidak ditemukan.");
                const mime = targetMsg?.imageMessage?.mimetype;
                if (!mime) throw new Error("Kirim atau balas gambar!");
                let buffer = await fn.getMediaBuffer(targetMsg);
                if (!buffer) throw new Error("Gagal mengunduh media.");
                let bufferMedia = await sharp(buffer).png().toBuffer();
                let profilePicUrl = null;
                try {
                  profilePicUrl = await fn.profilePictureUrl(serial, 'image');
                } catch {
                  // log("lanjut");
                }
                let { text: finalCleanText, entities: allEntities } = processAllTextFormatting(arg, store, fn);
                const params = {
                  type: 'stories',
                  format: 'png',
                  scale: 2,
                  backgroundColor: '#1a1a1a',
                  messages: [{
                    avatar: true,
                    from: {
                      id: 1,
                      name: pushname,
                      photo: { buffer: profilePicUrl }
                    },
                    text: finalCleanText,
                    entities: allEntities,
                    media: { buffer: bufferMedia }
                  }]
                };
                const result = await QuoteGenerator(params);
                finalImagePath = await saveFile(result.image, 'qc-image', 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, finalImagePath, { quoted: m });
                await counthit(serial); await limitAdd(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply(error.message || "Terjadi error saat membuat quote."); await counthit(serial);
              } finally {
                await deleteFile(finalImagePath);
              }
            } else if (!commandFound && await getPrefix(txt, 'qc')) {
              try {
                const isQuotedText = quotedMsg && (quotedMsg?.type === 'extendedTextMessage' || quotedMsg?.type === 'conversation');
                const getProfilePic = async (fine) => {
                  try {
                    const imageUrl = await fn.profilePictureUrl(fine, 'image');
                    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                    return Buffer.from(response.data);
                  } catch {
                    return null;
                  }
                };
                const processAllEntities = (textToProcess) => {
                  let { text: finalCleanText, entities: allEntities } = processAllTextFormatting(textToProcess, store, fn);
                  return { text: finalCleanText, entities: allEntities };
                };
                const params = {
                  type: 'quote',
                  format: 'png',
                  backgroundColor: '#1a1a1a',
                  width: 512,
                  height: 768,
                  messages: []
                };
                let message = {
                  avatar: true,
                  from: {},
                  text: ''
                };
                if (isQuotedText) {
                  let targetSender = quotedParticipant;
                  let quotedText = quotedMsg?.body;
                  const processedQuoted = processAllEntities(quotedText);
                  if (arg) {
                    const processedArg = processAllEntities(arg);
                    message.from = {
                      id: 1,
                      name: pushname,
                      photo: { buffer: await getProfilePic(serial) },
                      number: "+" + serial.split('@')[0],
                      time: formatTimestampToHourMinute(m.timestamp),
                    };
                    message.text = processedArg.text;
                    message.entities = processedArg.entities;
                    message.replyMessage = {
                      chatId: 2,
                      name: fn.getName(targetSender),
                      text: processedQuoted.text,
                      entities: processedQuoted.entities,
                      number: "+" + targetSender.split('@')[0]
                    };
                  } else {
                    message.from = {
                      id: 1,
                      name: fn.getName(targetSender),
                      photo: { buffer: await getProfilePic(targetSender) },
                      number: "+" + targetSender.split('@')[0],
                      time: formatTimestampToHourMinute(m.timestamp),
                    };
                    message.text = processedQuoted.text;
                    message.entities = processedQuoted.entities;
                  }
                } else {
                  if (arg) {
                    const processedArg = processAllEntities(arg);
                    message.from = {
                      id: 1,
                      name: pushname,
                      photo: { buffer: await getProfilePic(serial) },
                      number: "+" + serial.split('@')[0]
                    };
                    message.text = processedArg.text;
                    message.entities = processedArg.entities;
                  } else {
                    throw new Error("Perintah tidak lengkap. Mohon sertakan teks atau balas sebuah pesan.");
                  }
                }
                params.messages.push(message);
                const result = await QuoteGenerator(params);
                const imageBuffer = Buffer.from(result.image, 'base64');
                await sendRawWebpAsSticker(imageBuffer); await limitAdd(serial); await counthit(serial);
                commandFound = true;
              } catch (error) {
                await log(error); await sReply(error.message || "Terjadi error saat membuat quote."); await counthit(serial);
              }
            } else if (!commandFound && await getPrefix(txt, 'ssweb')) {
              try {
                if (!arg) throw new Error(`Harap berikan URL. Contoh: \`${dbSettings.rname}ssweb https://github/Terror-Machine/fnbots/ --mobile --full\``);
                const urlRegex = /(https?:\/\/[^\s]+)/;
                const urlMatch = txt.match(urlRegex);
                if (!urlMatch) throw new Error('URL tidak valid. Pastikan menggunakan http:// atau https://');
                const url = urlMatch[0];
                const options = {
                  fullPage: txt.includes('--full')
                };
                if (txt.includes('--mobile')) {
                  options.device = 'iPhone 15 Pro';
                }
                const buffer = await screenshotWeb(url, options);
                if (!buffer) throw new Error(`Error! silakan coba lagi beberapa tahun lagi?`);
                const outputPath = await saveFile(buffer, "ssweb-in", 'jpg');
                await fn.sendFilePath(toId, dbSettings.autocommand, outputPath, { quoted: m }); await counthit(serial); await limitAdd(serial);
                await deleteFile(outputPath);
                commandFound = true;
              } catch (error) {
                console.error('Error pada perintah ssweb:', error);
                await sReply(`Terjadi kesalahan: ${error.message}`); await counthit(serial);
              }
            }
            // ─── Info ────────────────────────────────
            /*
              * Created with ❤️ and 💦 By FN
              * Follow https://github.com/Terror-Machine
              * Feel Free To Use
            */
            // ─── Info ────────────────────────────────
          }
          if (!commandFound) {
            failedCommands.push(aa);
          }
          if (commandFound) {
            const msgPreview = msgs(aa);
            if (msgPreview === undefined) continue;
            const parts = [color(msgPreview, "#32CD32"), color('from', "#a8dffb"), color(pushname, '#FFA500'), ...(m.isGroup ? [color('in', '#a8dffb'), color(m.metadata?.subject, "#00FFFF")] : [])];
            const formatted = parts.join(' ');
            log(formatted);
          }
          await delay(500);
        }
        return failedCommands;
      }
      if (counter <= 25) {
        counter++;
        if (botNumber === serial) return
        const usr = serial;
        if ((recentcmd.has(usr) || sban.has(usr)) && !hakIstimewa) {
          if (!(fspamm.has(usr) || sban.has(usr))) {
            await sReply(`*Hei @${usr.split('@')[0]} you are on cooldown!*`);
            fspamm.add(usr);
          } else if (!sban.has(usr)) {
            await sReply(`*Hei @${usr.split('@')[0]}*\n*COMMAND SPAM DETECTED*\n*Command banned for 15 minutes*`);
            sban.add(usr);
          }
        } else {
          setTimeout(() => { counter--; }, 1500);
          recentcmd.add(usr);
          setTimeout(() => { recentcmd.delete(usr); fspamm.delete(usr); }, 3000);
          setTimeout(() => { sban.delete(usr); }, 900000);
          const failedCommands = await executeCommandChain(chainingCommands);
          if (failedCommands.length > 0 && dbSettings.autocorrect === 2 && !suggested) {
            const correctedText = await textMatch2(failedCommands);
            if (correctedText) {
              await executeCommandChain(await mycmd(await getTxt(correctedText)));
            }
          } else if (failedCommands.length > 0 && dbSettings.autocorrect === 1 && !m._textmatch_done) {
            await textMatch1(fn, m, failedCommands, toId);
            m._textmatch_done = true;
          }
        }
      } else {
        await sReply("🏃💨 Bot sedang sibuk, coba lagi dalam beberapa saat...");
        setTimeout(() => { counter = 0; }, 6000);
      }
    } else {
      if (!(await isLimitGame(serial) && await isLimit(serial)) && ((maintenance && (isWhiteList || hakIstimewa)) || (!maintenance && (hakIstimewa || (!isBanned && !isMuted)) && !isCount(serial)))) {
        if (m.isGroup) {
          const isPrivileged = isBotGroupAdmins && [isSadmin, master, vip, premium, isGroupAdmins, isBotGroupAdmins].some(Boolean);
          const _antihidetag = dbGroups.antiHidetag.find(v => v.chatid === id)?.state === true;
          const _antitagsw = dbGroups.antitagStory.find(v => v.chatid === id)?.state === true;
          const _antilink = dbGroups.antilink.find(v => v.chatid === id)?.state === true;
          const currentTime = Date.now();
          const lastResponseTimeInGroup = groupAfkCooldowns.get(toId);
          if (!lastResponseTimeInGroup || (currentTime - lastResponseTimeInGroup >= GROUP_COOLDOWN_MS)) {
            const afkUsersToSend = [];
            const uniqueMentionedJidList = [...new Set(mentionedJidList)];
            for (const ment of uniqueMentionedJidList) {
              if (checkAfkUser(toId, ment, dbAFK)) {
                const id = getAfkId(toId, ment, dbAFK);
                const reason = getAfkReason(toId, id, dbAFK);
                const time = getAfkTime(toId, id, dbAFK);
                const waktu = dayjs.unix(time).format('DD/MM/YYYY HH:mm:ss');
                const userTag = fn.getName(id);
                afkUsersToSend.push({ userTag, waktu, reason, jid: id });
              }
            }
            if (afkUsersToSend.length > 0) {
              groupAfkCooldowns.set(toId, Date.now());
              let groupMessage = '┌ ❏ *PENGGUNA SEDANG AFK*\n│\n';
              afkUsersToSend.forEach(user => {
                groupMessage += `│ • Pengguna: ${user.userTag}\n`;
                groupMessage += `│   └ Sejak: ${user.waktu}\n`;
                groupMessage += `│   └ Alasan: ${user.reason}\n│\n`;
              });
              groupMessage += '└─ Mohon untuk tidak mengganggu.';
              await sReply(groupMessage);
              for (const user of afkUsersToSend) {
                try {
                  const groupName = fn.getName(toId) || 'sebuah grup';
                  const currentTime = dayjs().format('DD/MM/YYYY HH:mm:ss');
                  const notificationMsg = `📢 *Notifikasi AFK*\n\n` +
                    `Seseorang men-tag kamu di grup *${groupName}*:\n` +
                    `• Pengirim: @${serial.split('@')[0]}\n` +
                    `• Waktu: ${currentTime}\n` +
                    `• Pesan: "${m.body}"\n\n` +
                    `_Kamu sedang AFK dengan alasan: ${user.reason}_\n` +
                    `⏳ AFK sejak: ${user.waktu}`;
                  await fn.sendMessage(
                    user.jid,
                    {
                      text: notificationMsg,
                      contextInfo: {
                        mentionedJid: [serial, user.jid]
                      }
                    }
                  );
                } catch (error) {
                  await log(`Gagal mengirim notifikasi ke ${user.jid}: ${error}`);
                }
              }
            }
          }
          if (_antihidetag) {
            if (m.mentionedJid?.length === m.metadata.participants.length && !isPrivileged) {
              await fn.sendMessage(toId, { delete: { remoteJid: toId, fromMe: false, id: id, participant: serial } });
            }
          }
          if (_antitagsw) {
            if (m.type === 'groupStatusMentionMessage' || m.message?.groupStatusMentionMessage || m.message?.protocolMessage?.type === 25 || (Object.keys(m.message).length === 1 && Object.keys(m.message)[0] === 'messageContextInfo')) {
              if (!isPrivileged && !fromBot) {
                try {
                  await fn.sendMessage(toId, { delete: { remoteJid: toId, fromMe: false, id: id, participant: serial } });
                  await fn.removeParticipant(toId, [serial]);
                } catch (error) {
                  await log(`Error_kick_antitagSW:\n${error}`, true);
                }
              }
            }
          }
          if (_antilink) {
            if (body?.includes('chat.whatsapp.com') && !isPrivileged) {
              await fn.sendMessage(toId, { delete: { remoteJid: toId, fromMe: false, id: id, participant: serial } });
              if (!dbMuted.muteuser.includes(serial)) dbMuted.muteuser.push(serial), await dumpMute();
              if (!dbMuted.mutechat.includes(serial)) dbMuted.mutechat.push(serial), await dumpMute();
              await fn.removeParticipant(toId, [serial]);
            }
          }
        };
        if (dbSettings.chatbot === true) {
          if ((body == "bct") || (body == "bacot") || (body == dbSettings.sname + "bacot") || (body == dbSettings.rname + "bacot")) {
            await sReply(randomChoice(dbBacots.bacot))
          } else if ((body == "bot") || (body == "hi") || (body == "Bot") || (body == "Hi")) {
            await fn.sendFilePath(toId, 'hi.oga', `./src/media/hi.oga`, { quoted: m });
            await sReply('ada yang bisa dibantu? silakan ketik ' + randomChoice([dbSettings.sname, dbSettings.rname]) + 'commands')
          }
          if (Object.prototype.hasOwnProperty.call(dbImage.image, txt)) {
            await fn.sendFilePath(toId, dbSettings.autocommand, dbImage.image[txt], { quoted: m });
          }
          if (Object.prototype.hasOwnProperty.call(dbAudio.audio, txt)) {
            await fn.sendFilePath(toId, '', dbAudio.audio[txt], { quoted: m });
          }
          if (Object.prototype.hasOwnProperty.call(dbContact.contact, txt)) {
            const name = txt;
            const number = dbContact.contact[txt];
            fn.sendContact(toId, name, dbSettings.botname, number, m)
          }
          if (Object.prototype.hasOwnProperty.call(dbChats.chat, txt)) {
            const message = dbChats.chat[txt];
            const emoticons = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "🙄", "😧", "🥱", "🤤", "😪", "🥴", "🤢", "🤮", "🤧", "😷", "🤕", "😽", "😻"];
            const randomEmot = ulang(
              emoticons[Math.floor(Math.random() * emoticons.length)],
              Math.floor(Math.random() * 5)
            );
            if (message.includes('@')) {
              await fn.sendPesan(toId, message + randomEmot, m);
            } else {
              const chance = Math.floor(Math.random() * 5);
              if (chance === 0) {
                fn.sendAudioTts(toId, message, m);
              } else {
                await sReply(message + randomEmot);
              }
            }
          }
          if (Object.prototype.hasOwnProperty.call(dbStickers.sticker, txt)) {
            const buffer = Buffer.from(dbStickers.sticker[txt], 'base64')
            await sendRawWebpAsSticker(buffer)
          }
        };
        if (dbSettings.changer === true) {
          const mimetype = quotedMsg ? (quotedMsg?.mime || '') : (m.isMedia ? (m.mime || '') : '');
          const audioTypes = [
            'audio/ogg; codecs=opus',
            'audio/mpeg',
            'audio/mp4',
            'audio/m4a',
            'audio/aac',
            'audio/wav',
            'audio/amr'
          ];
          if (audioTypes.includes(mimetype)) {
            const ffmpegFilters = [
              { filter: "equalizer=f=54:width_type=o:width=2:g=20", flag: '-af' },
              { filter: "acrusher=.1:1:64:0:log", flag: '-af' },
              { filter: "atempo=4/4,asetrate=44500*2/3", flag: '-af' },
              { filter: "volume=12", flag: '-af' },
              { filter: "atempo=1.63,asetrate=44100", flag: '-af' },
              { filter: "atempo=1.6,asetrate=22100", flag: '-af' },
              { filter: "atempo=1.06,asetrate=44100*1.25", flag: '-af' },
              { filter: "areverse", flag: '-filter_complex' },
              { filter: "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75", flag: '-filter_complex' },
              { filter: "atempo=0.7,asetrate=44100", flag: '-af' },
              { filter: "atempo=0.5,asetrate=65100", flag: '-af' },
              { filter: "aecho=0.8:0.9:1000:0.3", flag: '-af' },
              { filter: "vibrato=f=5", flag: '-af' },
              { filter: "aphaser=in_gain=0.4", flag: '-af' },
              { filter: "afftfilt=real='hypot(re,im)':imag='0'", flag: '-filter_complex' },
              { filter: "tremolo=f=5.0:d=0.8", flag: '-af' },
              { filter: "highpass=f=200, lowpass=f=3000", flag: '-af' },
              { filter: "bandpass=f=1000:width_type=h:width=200", flag: '-af' },
              { filter: "aecho=0.6:0.3:1000:0.5, lowpass=f=300", flag: '-af' },
              { filter: "aecho=0.8:0.88:60:0.4", flag: '-af' },
              { filter: "asetrate=44100*0.8, atempo=1.1", flag: '-af' },
              { filter: "asetrate=44100*0.7, atempo=1.2", flag: '-af' },
              { filter: "afftfilt=real='hypot(re,im)*cos(0.5)':imag='hypot(re,im)*sin(0.5)'", flag: '-af' },
              { filter: "asetrate=44100*0.5, atempo=2", flag: '-af' },
              { filter: "apulsator=hz=0.3", flag: '-af' }
            ];
            const randomFilter = ffmpegFilters[Math.floor(Math.random() * ffmpegFilters.length)];
            try {
              const mediaData = await fn.getMediaBuffer(m.message);
              await fs.writeFile(global.filename, mediaData);
              await exec(`ffmpeg -i "${global.filename}" ${randomFilter.flag} "${randomFilter.filter}" "${global.sendFile}"`);
              await fn.sendFilePath(toId, global.filename, global.sendFile, { quoted: m });
            } catch (error) {
              await log(`Error_Changer:\n${error}`, true);
              await sPesan('Gagal memproses audio.');
            } finally {
              await deleteFile(global.filename); await deleteFile(global.sendFile);
            }
          }
        };
        if (dbSettings.autojoin === true) {
          if (body?.match(/(chat.whatsapp.com)/gi)) {
            const inviteCode = body.split("https://chat.whatsapp.com/")[1];
            if (!inviteCode) {
              await sReply("Link undangan tidak valid.");
            } else {
              try {
                const { restrict, joinApprovalMode, subject, participants, id } = await fn.groupGetInviteInfo(inviteCode);
                if (isSadmin || master) {
                  if (!joinApprovalMode) {
                    await fn.groupAcceptInvite(inviteCode);
                    if (!restrict) {
                      await fn.sendPesan(id, `Halo warga grup *${subject}*!\nTerima kasih sudah mengundang ${dbSettings.botname}. Ketik *.rules* untuk melihat peraturan.`, m);
                    }
                    await sReply("✅ Berhasil join grup."); await limitAdd(serial); await counthit(serial);
                  }
                } else {
                  if (participants.length > dbSettings.memberLimit) {
                    if (!joinApprovalMode) {
                      await fn.groupAcceptInvite(inviteCode);
                      if (!restrict) {
                        await fn.sendPesan(id, `Halo warga grup *${subject}*!\nTerima kasih sudah mengundang ${dbSettings.botname}. Ketik *.rules* untuk melihat peraturan.`, m);
                      }
                      await sReply("✅ Berhasil join grup."); await limitAdd(serial); await counthit(serial);
                    }
                  } else {
                    await sReply('Group yang ingin kamu masukkan bot tidak memiliki member melebihi ' + dbSettings.memberLimit + '\nBot tidak bisa masuk ke grup, silakan hubungi owner.');
                  }
                }
              } catch {
                await sReply("Gagal join, mungkin link salah atau bot pernah di-kick.");
              }
            }
          }
        };
        if (dbSettings.autodownload === true) {
          if (body?.match(/https?:\/\/(www\.)?instagram\.com\/(s|p|reel|stories|tv)\/([a-zA-Z0-9\-_]+)/i)) {
            try {
              const urlMatch = body.match(/https?:\/\/(www\.)?instagram\.com\/[^\s]+/);
              if (urlMatch) {
                const url = urlMatch[0];
                const data = await instagram(url);
                if (data) {
                  if (data.post_info) {
                    const postInfo = data.post_info;
                    const mediaUrls = data.url_list;
                    const baseCaption =
                      `📷 *Instagram Downloader*\n\n` +
                      `👤 *Username:* ${postInfo.owner_username}\n` +
                      `❤️ *Likes:* ${postInfo.likes}\n` +
                      `📝 *Caption:* ${postInfo.caption || '(Tidak ada caption)'}`;
                    if (mediaUrls.length <= 1) {
                      await fn.sendFileUrl(toId, mediaUrls[0], baseCaption, m);
                    } else {
                      const createMediaObjectFromUrl = (url, caption) => {
                        return url.includes('.mp4') ? { video: { url: url }, caption: caption } : { image: { url: url }, caption: caption };
                      };
                      const mediaToSend = mediaUrls.map((url, index) => {
                        const caption = `${baseCaption}\n\n🖼️ *File ${index + 1} dari ${mediaUrls.length}*`;
                        return createMediaObjectFromUrl(url, caption);
                      });
                      const chunks = chunkArray(mediaToSend, 15);
                      for (const [index, chunk] of chunks.entries()) {
                        await fn.sendAlbum(toId, chunk, { quoted: m });
                        if (chunks.length > 1 && index < chunks.length - 1) {
                          await delay(1000);
                        }
                      }
                    }
                  } else if (data.media_details && data.media_details.length > 0) {
                    const mediaDetails = data.media_details;
                    if (mediaDetails.length === 1) {
                      await fn.sendFileUrl(toId, mediaDetails[0].url, dbSettings.autocommand, m);
                    } else {
                      const createMediaObject = (media, caption) => {
                        return media.type === 'video' ? { video: { url: media.url }, caption: caption } : { image: { url: media.url }, caption: caption };
                      };
                      const mediaToSend = mediaDetails.map((mediaItem, index) => {
                        const caption = `📸 *Instagram*\n\n🖼️ *Item ${index + 1} dari ${mediaDetails.length}*`;
                        return createMediaObject(mediaItem, caption);
                      });
                      const chunks = chunkArray(mediaToSend, 15);
                      for (const [index, chunk] of chunks.entries()) {
                        await fn.sendAlbum(toId, chunk, { quoted: m });
                        if (chunks.length > 1 && index < chunks.length - 1) {
                          await delay(1000);
                        }
                      }
                    }
                  }
                  if (hakIstimewa) await limitAdd(serial);
                  else await limitcok(serial);
                  await counthit(serial);
                }
              }
            } catch (error) {
              await log(`Error autodownload ig:\n${error}`, true);
            }
          } else if (body?.match(/https?:\/\/(www\.|vm\.|vt\.)?tiktok\.com\//i)) {
            try {
              const urlMatch = body.match(/https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/);
              if (urlMatch) {
                const url = urlMatch[0];
                let result;
                try {
                  result = await fetchTikTokData(url, 'v1');
                } catch {
                  try {
                    result = await fetchTikTokData(url, 'v2');
                  } catch {
                    result = await fetchTikTokData(url, 'v3');
                  }
                }
                if (result) {
                  const baseCaption = buildBaseCaption(result);
                  if (result.type === 'video' && result.video?.playAddr) {
                    await fn.sendFileUrl(toId, result.video.playAddr, baseCaption, m);
                  } else if (result.type === 'image' && result.images?.length > 0) {
                    const emptyArgs = [];
                    await sendImages(fn, result, emptyArgs, toId, m, baseCaption);
                  }
                  if (hakIstimewa) await limitAdd(serial);
                  else await limitcok(serial);
                  await counthit(serial);
                }
              }
            } catch (error) {
              await log(`Error autodownload tt:\n${error}`, true);
            }
          } else if (body?.match(/https?:\/\/(?:www\.|m\.|web\.)?facebook\.com\/(?:watch|video\.php|story\.php|[a-zA-Z0-9.]+\/(videos|reels))\//i)) {
            const tempVideoPath = `./src/sampah/temp_video_${Date.now()}.mp4`;
            const tempAudioPath = `./src/sampah/temp_audio_${Date.now()}.m4a`;
            const finalOutputPath = `./src/sampah/download_${Date.now()}.mp4`;
            try {
              const urlMatch = body.match(/https?:\/\/(?:www\.|m\.|web\.)?facebook\.com\/[^\s]+/);
              if (urlMatch) {
                const input = urlMatch[0];
                const downloadVideoCmd = `${global.ytDlpPath} -f "bestvideo[ext=mp4]" -o "${tempVideoPath}" "${input}"`;
                const downloadAudioCmd = `${global.ytDlpPath} -f "bestaudio[ext=m4a]" -o "${tempAudioPath}" "${input}"`;
                await exec(downloadVideoCmd, { shell: '/bin/bash' });
                await exec(downloadAudioCmd, { shell: '/bin/bash' });
                const ffmpegCmd = `ffmpeg -i "${tempVideoPath}" -i "${tempAudioPath}" -c:v libx264 -pix_fmt yuv420p -c:a aac -movflags +faststart "${finalOutputPath}"`;
                await exec(ffmpegCmd, { shell: '/bin/bash' });
                await fs.access(finalOutputPath);
                await fn.sendFilePath(toId, dbSettings.autocommand, finalOutputPath, { quoted: m });
                await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
              }
            } catch (error) {
              if (error.stderr) {
                await log(`FFMPEG/YTDLP Error (autodownload fb):\n\n${error.stderr}`);
              } else {
                await log(`Error autodownload fb:\n\n${error.message}`);
              }
            } finally {
              await deleteFile(tempVideoPath);
              await deleteFile(tempAudioPath);
              await deleteFile(finalOutputPath);
            }
          } else if (body?.match(/https?:\/\/(?:www\.|mobile\.)?(?:twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/\d+/i)) {
            const tempVideoPath = `./src/sampah/temp_video_${Date.now()}.mp4`;
            const tempAudioPath = `./src/sampah/temp_audio_${Date.now()}.m4a`;
            const finalOutputPath = `./src/sampah/download_${Date.now()}.mp4`;
            try {
              const urlMatch = body.match(/https?:\/\/(?:www\.|mobile\.)?(?:twitter\.com|x\.com)\/[^\s]+/);
              if (urlMatch) {
                const input = urlMatch[0];
                const downloadVideoCmd = `${global.ytDlpPath} -f "bestvideo[ext=mp4]" -o "${tempVideoPath}" "${input}"`;
                const downloadAudioCmd = `${global.ytDlpPath} -f "bestaudio[ext=m4a]" -o "${tempAudioPath}" "${input}"`;
                await exec(downloadVideoCmd, { shell: '/bin/bash' });
                await exec(downloadAudioCmd, { shell: '/bin/bash' });
                const ffmpegCmd = `ffmpeg -i "${tempVideoPath}" -i "${tempAudioPath}" -c:v libx264 -pix_fmt yuv420p -c:a aac -movflags +faststart "${finalOutputPath}"`;
                await exec(ffmpegCmd, { shell: '/bin/bash' });
                await fs.access(finalOutputPath);
                await fn.sendFilePath(toId, dbSettings.autocommand, finalOutputPath, { quoted: m });
                await counthit(serial);
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
              }
            } catch (error) {
              if (error.stderr) {
                await log(`FFMPEG/YTDLP Error (autodownload twt):\n\n${error.stderr}`);
              } else {
                await log(`Error autodownload twt:\n\n${error.message}`);
              }
            } finally {
              await deleteFile(tempVideoPath);
              await deleteFile(tempAudioPath);
              await deleteFile(finalOutputPath);
            }
          } else if (body?.match(/https?:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+/i)) {
            try {
              const urlMatch = body.match(/https?:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+/i);
              if (urlMatch) {
                const url = urlMatch[0];
                const result = await spotify.downloadTrackOrCollection(url, global.tmpDir);
                await delay(2000);
                if (Array.isArray(result)) {
                  for (const filePath of result) {
                    await fn.sendFilePath(toId, dbSettings.autocommand, filePath, { quoted: m });
                    await deleteFile(filePath); await counthit(serial);
                  }
                } else {
                  await fn.sendFilePath(toId, dbSettings.autocommand, result, { quoted: m });
                  await deleteFile(result); await counthit(serial);
                }
                if (hakIstimewa) await limitAdd(serial);
                else await limitcok(serial);
              };
            } catch (error) {
              await log(`Error autodownload spotify:\n${error.message}`, true);
            }
          }
        };
        if (dbFilter.filter.includes(toId)) {
          const mediaTypes = new Set(['stickerMessage', 'imageMessage', 'videoMessage', 'audioMessage']);
          if (mediaTypes.has(type)) {
            if (stickerspam.has(serial) && !stp.has(serial) && m.isGroup && isBotGroupAdmins) {
              stp.add(serial);
              const mention = '@' + serial.split('@')[0];
              if (isSadmin) {
                await fn.sendPesan(toId, `creatorku yang ganteng ${mention}\ngaboleh spam ya...`, m);
              } else if (master) {
                await fn.sendPesan(toId, `wah ini nih! ${mention}\nHei Owner, jangan ngajarin membernya buat spam! 🤦‍♂️🤦‍♂️😤🧐`, m);
              } else if (vip) {
                await fn.sendPesan(toId, `hmmmmm gitu ya ${mention}\nvip bebas spam. 😒🙃😏`, m);
              } else if (premium) {
                await fn.sendPesan(toId, `wadooooh si ${mention}\nasik nih premium bisa spam. 😒🙃😏`, m);
              } else if (isGroupAdmins) {
                await fn.sendPesan(toId, `yaela ${mention}\njangan mentang-mentang jadi admin spam terus terusan ya!`, m);
              } else {
                await fn.sendPesan(toId, `member bangsat ya ${mention}\nspam anjeng! 😡😡😡😡`, m);
                setTimeout(async () => {
                  if (!dbMuted.muteuser.includes(serial)) dbMuted.muteuser.push(serial);
                  if (!dbMuted.mutechat.includes(serial)) dbMuted.mutechat.push(serial);
                  await dumpMute();
                  fn.removeParticipant(toId, serial);
                }, 1000);
              }
            }
          }
          stickerspam.add(serial);
          setTimeout(() => {
            stickerspam.delete(serial);
            stp.delete(serial);
          }, 1000);
        };
        if (dbSettings.autosticker === true) {
          if ((m.message?.imageMessage?.mimetype || m.message?.videoMessage?.mimetype) && !m.body.toLowerCase().includes("sticker")) {
            try {
              const buffer = await fn.getMediaBuffer(m.message)
              if (buffer) {
                if ((mime === "video/mp4" || mime === "image/gif") && (m.message?.videoMessage?.seconds || 0) > 10) {
                  await sReply("❎ Durasi video terlalu panjang. Maksimal 10 detik untuk stiker.")
                } else {
                  await sendRawWebpAsSticker(buffer); await limitAdd(serial); await counthit(serial);
                }
              } else {
                await sReply("Gagal mengunduh media.")
              }
            } catch (error) {
              await log(`Error_autosticker:\n${error}`, true);
            }
          }
        };
        if (dbSettings.antideleted === true) {
          if (m.type === 'protocolMessage' && m.protocolMessage.type === 0) {
            try {
              const deletedMsgId = m.protocolMessage.key.id;
              const remoteJid = toId;
              const originalMessage = store.loadMessage(remoteJid, deletedMsgId);
              if (originalMessage && !originalMessage.fromMe) {
                if (originalMessage.type === 'imageMessage') {
                  const buffer = await fn.getMediaBuffer(originalMessage.message);
                  if (buffer) await fn.sendMessage(toId, { image: buffer, caption: originalMessage.body });
                } else if (originalMessage.type === 'videoMessage') {
                  const buffer = await fn.getMediaBuffer(originalMessage.message);
                  if (buffer) await fn.sendMessage(toId, { video: buffer, caption: originalMessage.body });
                } else if (originalMessage.type === 'stickerMessage') {
                  const buffer = await fn.getMediaBuffer(originalMessage.message);
                  if (buffer) await fn.sendMessage(toId, { sticker: buffer });
                } else if (originalMessage.type === 'audioMessage') {
                  const buffer = await fn.getMediaBuffer(originalMessage.message);
                  if (buffer) await fn.sendMessage(toId, { audio: buffer, mimetype: 'audio/mp4', ptt: originalMessage.message.ptt });
                } else if (originalMessage.type === 'documentMessage') {
                  const buffer = await fn.getMediaBuffer(originalMessage.message);
                  if (buffer) await fn.sendMessage(toId, { document: buffer, mimetype: originalMessage.mime, fileName: originalMessage.message.fileName });
                } else if (originalMessage.type === 'locationMessage') {
                  await fn.sendMessage(toId, {
                    location: {
                      degreesLatitude: originalMessage.message.degreesLatitude,
                      degreesLongitude: originalMessage.message.degreesLongitude,
                      name: originalMessage.message.name,
                      address: originalMessage.message.address
                    }
                  });
                } else if (originalMessage.type === 'contactMessage') {
                  await fn.sendMessage(toId, { contacts: { displayName: originalMessage.message.contactMessage.displayName, contacts: [{ vcard: originalMessage.message.contactMessage.vcard }] } });
                } else if (originalMessage.type === 'extendedTextMessage' || originalMessage.type === 'conversation') {
                  if (originalMessage.body) {
                    await fn.sendMessage(toId, { text: `*Isi Pesan Teks:* ${originalMessage.body}` });
                  }
                }
              }
            } catch (error) {
              await log(`Error pada fitur Anti-Delete:\n${error}`, true);
            }
          }
        };
      };
    };
    if (quotedMsg) {
      for (const { regex, store } of gameDefinitions) {
        if (!regex.test(quotedMsg?.body)) continue;
        const game = store?.[toId];
        const addStat = async () => { await addXp(fn, toId, serial, m); await counthit(serial); };
        if (!game || quotedMsg?.id !== game[0]?.id) {
          await sReply(`Soal itu sudah berakhir`); addStat(); return;
        }
        const gameData = game[1];
        let chances = game[2];
        if (body.toLowerCase() === gameData.jawaban) {
          await sReply(`*Jawaban Benar!*\nSelamat kamu mendapatkan ${gameData.bonus} saldo`);
          await addBal(serial, gameData.bonus);
          clearTimeout(game[3]);
          delete store[toId];
        } else {
          if (--chances <= 0) {
            await sReply(`*Kesempatan habis!*\nJawaban: *${gameData.jawaban}*`);
            clearTimeout(game[3]);
            delete store[toId];
          } else {
            game[2] = chances;
            await sReply(`*Jawaban Salah!*\nMasih ada ${chances} kesempatan`);
          }
        }
        addStat(); return;
      }
    };
    if (hangman[toId] && !isCmd) {
      const huruf = m.body?.toLowerCase()?.trim();
      const isValidHangmanInput = (huruf && huruf.length === 1 && /^[a-z]$/i.test(huruf)) || (huruf === 'menyerah');
      if (isValidHangmanInput) {
        interactiveHandled = true;
        const user = serial
        const dataGame = hangman[toId]
        const [jawaban, display, clue, data, mode, timeout,] = dataGame
        const rewardNormal = 500
        const rewardExpert = 2000
        if (huruf === 'menyerah') {
          if (data.menyerah[user]) return
          data.menyerah[user] = true
          return await sPesan(`@${user.split('@')[0]} telah menyerah.`);
        }
        if (data.menyerah[user]) return
        if ((data.benar[user]?.includes(huruf)) || (data.salah[user]?.includes(huruf))) {
          return await sPesan(`Huruf '${huruf.toUpperCase()}' sudah pernah kamu tebak sebelumnya.`);
        }
        const salahUser = data.salah[user] || []
        if (mode === 'expert' && salahUser.length >= 13) {
          return await sPesan(`Nyawa tebakanmu sudah habis!`);
        }
        let found = false
        for (let i = 0; i < jawaban.length; i++) {
          if (jawaban[i].toLowerCase() === huruf) {
            display[i] = huruf.toUpperCase()
            found = true
          }
        }
        if (found) {
          data.benar[user] = [...(data.benar[user] || []), huruf]
          await sPesan(display.join(''))
          const selesai = !display.includes('•')
          if (selesai) {
            clearTimeout(timeout)
            let totalReward = mode === 'normal' ? rewardNormal : rewardExpert
            const pemainAktif = Object.keys(data.benar).filter(u => !data.menyerah[u])
            const kontribusi = {}
            pemainAktif.forEach(u => {
              kontribusi[u] = data.benar[u].length || 0
            })
            const totalKontribusi = Object.values(kontribusi).reduce((a, b) => a + b, 0) || 1
            const rewardPerPlayer = {}
            if (mode === 'normal') {
              pemainAktif.forEach(u => rewardPerPlayer[u] = Math.floor(totalReward / pemainAktif.length))
            } else {
              pemainAktif.forEach(u => {
                rewardPerPlayer[u] = Math.floor(totalReward * (kontribusi[u] / totalKontribusi))
              })
            }
            for (const u of pemainAktif) {
              const point = rewardPerPlayer[u]
              if (point > 0) {
                await addBal(u, point)
              }
            }
            let pesanAkhir = `🎉 *Permainan selesai!*\n\n`
            pesanAkhir += `🧩 Kata: ${jawaban.toUpperCase()}\n`
            pesanAkhir += `📌 Deskripsi: ${clue}\n\n`
            pesanAkhir += `💰 *Reward dibagikan sebagai berikut:*`
            pemainAktif.forEach(u => {
              pesanAkhir += `\n- @${u.split('@')[0]}: ${rewardPerPlayer[u]} Saldo`
            })
            const pemainMenyerah = Object.keys(data.menyerah)
            if (pemainMenyerah.length) {
              pesanAkhir += `\nPemain yang menyerah tidak mendapat reward:`
              for (const u of pemainMenyerah) {
                pesanAkhir += `\n- @${u.split('@')[0]}`
              }
            }
            delete hangman[toId]
            await fn.sendPesan(toId, pesanAkhir, m); await counthit(serial);
            await addXp(fn, toId, serial, m); return;
          }
        } else {
          data.salah[user] = [...salahUser, huruf]
          await reactFail()
          if (mode === 'expert' && data.salah[user].length === 13) {
            const penalti = 100
            await addXp(fn, toId, serial, m); await minBal(user, penalti); await counthit(serial);
            await fn.sendPesan(toId, `😵 @${user.split('@')[0]} kehabisan nyawa!\n💸 Penalti: -${penalti} saldo`, m);
          }
        }
        return;
      }
    };
    if (chessGame[toId] && !isCmd) {
      const gameState = chessGame[toId];
      const messageText = m.body?.toLowerCase().trim();
      if (serial !== gameState.players.white) return;
      const stopKeywords = ['menyerah', 'stop', 'surrender', 'endgame'];
      if (stopKeywords.includes(messageText)) {
        clearTimeout(gameState.timeoutId);
        await sReply(`Kamu telah menyerah. Bot memenangkan permainan. 🤖`);
        delete chessGame[toId];
        return;
      };
      const moveRegex = /^[a-h][1-8]\s[a-h][1-8]$/;
      if (moveRegex.test(messageText)) {
        if (gameState.game.turn() !== 'w') return;
        const [from, to] = messageText.split(' ');
        try {
          const playerMove = gameState.game.move({ from, to, promotion: 'q' });
          if (playerMove === null) return await sReply("Gerakan tidak valid!");
        } catch { return await sReply("Gerakan tidak valid!"); }
        if (gameState.game.isCheckmate()) {
          clearTimeout(gameState.timeoutId);
          const boardBuffer = await generateBoardImage(gameState.game.fen(), 'w');
          const caption = `🎉 *SKAKMAT!* 🎉\n\nSelamat, Kamu memenangkan permainan melawan Bot!`;
          const outputPath = await saveFile(boardBuffer, "output-checkmate", 'jpg');
          await fn.sendFilePath(toId, caption, outputPath, { quoted: m });
          await deleteFile(outputPath);
          delete chessGame[toId];
          await addXp(fn, toId, serial, m); await counthit(serial);
          return;
        }
        await delay(1000);
        const possibleMoves = gameState.game.moves({ verbose: true });
        const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9 };
        let bestMove = null;
        let maxCaptureValue = -1;
        for (const move of possibleMoves) {
          if (move.flags.includes('c')) {
            const capturedPiece = move.captured;
            const value = pieceValues[capturedPiece.toLowerCase()] || 0;
            if (value > maxCaptureValue) {
              maxCaptureValue = value;
              bestMove = move;
            }
          }
        }
        let botMove = bestMove ? bestMove : possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        gameState.game.move(botMove);
        const finalFen = gameState.game.fen();
        const boardBuffer = await generateBoardImage(finalFen, 'w');
        const outputPath = await saveFile(boardBuffer, "output-chess", 'jpg');
        let caption = `Langkah Kamu: *${from.toUpperCase()} → ${to.toUpperCase()}*\n`;
        caption += `Langkah Bot: *${botMove.from.toUpperCase()} → ${botMove.to.toUpperCase()}*\n\n`;
        if (gameState.game.isCheckmate()) {
          clearTimeout(gameState.timeoutId);
          caption += `🤖 *SKAKMAT!* 🤖\n\nBot memenangkan permainan.`;
          await fn.sendFilePath(toId, caption, outputPath, { quoted: m });
          await deleteFile(outputPath);
          delete chessGame[toId];
          await addXp(fn, toId, serial, m); await counthit(serial);
          return;
        }
        if (gameState.game.isDraw()) {
          clearTimeout(gameState.timeoutId);
          caption += `🤝 *REMIS!* Permainan berakhir seri.`;
          await fn.sendFilePath(toId, caption, outputPath, { quoted: m });
          await deleteFile(outputPath);
          delete chessGame[toId];
          await addXp(fn, toId, serial, m); await counthit(serial);
          return;
        }
        caption += `Giliran Kamu selanjutnya.`;
        if (gameState.game.isCheck()) {
          caption += `\n\n*ANDA SEDANG DI-SKAK!*`;
        }
        await fn.sendFilePath(toId, caption, outputPath, { quoted: m });
        await deleteFile(outputPath);
        await addXp(fn, toId, serial, m); await counthit(serial);
        return;
      };
    };
    if (ulartangga[toId] && !isCmd) {
      const gameState = ulartangga[toId];
      const messageText = m.body?.toLowerCase()?.trim();
      if (serial !== gameState.playerJid) return;
      if (['stop', 'menyerah', 'end', 'leave'].includes(messageText)) {
        clearTimeout(gameState.timeoutId);
        delete ulartangga[toId];
        await addXp(fn, toId, serial, m); await counthit(serial);
        return await sReply("Permainan Ular Tangga telah dihentikan.");
      }
      if (['roll', 'kocok'].includes(messageText)) {
        if (gameState.turn !== 'player') return await sReply("Bukan giliranmu!");
        clearTimeout(gameState.timeoutId);
        const roll = rollDice();
        const oldPos = gameState.playerPos;
        gameState.playerPos += roll;
        if (gameState.playerPos > 100) gameState.playerPos = 100 - (gameState.playerPos - 100);
        let moveText = `Kamu melempar dadu dan mendapat angka *${roll}*.\n` +
          `Maju dari kotak *${oldPos}* ke *${gameState.playerPos}*.\n`;
        const moveEffect = gameState.map.move[gameState.playerPos];
        if (moveEffect) {
          moveText += gameState.playerPos > moveEffect ? `Kamu Termakan Ular! 🐍 Turun ke *${moveEffect}*.\n` : `Kamu Naik Tangga! 🪜 Naik ke *${moveEffect}*.\n`;
          gameState.playerPos = moveEffect;
        }
        if (gameState.playerPos === 100) {
          const finalBoard = await generateUlarTanggaImage(gameState);
          if (finalBoard) await sReply({ image: finalBoard, caption: moveText + `\n🎉 Selamat, Kamu MENANG!`, mentions: [serial] });
          delete ulartangga[toId];
          await addXp(fn, toId, serial, m); await counthit(serial);
          return;
        }
        gameState.turn = 'bot';
        await sReply(moveText + `\nSekarang giliran Bot...`);
        await addXp(fn, toId, serial, m); await counthit(serial);
        setTimeout(() => runBotUlarTanggaTurnV2(toId, m, fn), 1000);
      }
    };
    if (othelloGame[toId] && !isCmd) {
      const gameState = othelloGame[toId];
      const messageText = m.body?.toLowerCase().trim();
      if (serial !== gameState.players.black) return;
      if (gameState.turn !== PLAYER_BLACK) return;
      const stopKeywords = ['menyerah', 'stop', 'surrender'];
      if (stopKeywords.includes(messageText)) {
        await counthit(serial);
        await sReply(`Kamu telah menyerah. Bot memenangkan permainan Othello. 🤖`);
        clearTimeout(gameState.timeoutId);
        delete othelloGame[toId];
        return;
      }
      const moveCoords = parseOthelloMove(messageText);
      if (!moveCoords) return;
      const isValid = gameState.validMoves.some(valid => valid.move[0] === moveCoords[0] && valid.move[1] === moveCoords[1]);
      if (!isValid) {
        return await sReply("Gerakan tidak valid! Pilih salah satu kotak yang ditandai.");
      }
      clearTimeout(gameState.timeoutId);
      const gameDuration = 5 * 60 * 1000;
      const newTimeoutCallback = async () => {
        if (othelloGame[toId]) {
          delete othelloGame[toId];
          await sReply(`Sesi game Othello di grup ini telah berakhir karena tidak ada aktivitas selama ${gameDuration / 60000} menit.`);
        }
      };
      gameState.timeoutId = setTimeout(newTimeoutCallback, gameDuration);
      let currentBoard = makeOthelloMove(gameState.board, PLAYER_BLACK, moveCoords);
      let gameCaption = "";
      let botValidMoves = getValidOthelloMoves(currentBoard, PLAYER_WHITE);
      if (botValidMoves.length > 0) {
        botValidMoves.sort((a, b) => b.flips - a.flips);
        const botMove = botValidMoves[0].move;
        currentBoard = makeOthelloMove(currentBoard, PLAYER_WHITE, botMove);
        const botMoveStr = `${fileLabels[botMove[1]]}${rankLabels[botMove[0]]}`;
        gameCaption += `Langkah Kamu: *${messageText.toUpperCase()}*\nLangkah Bot: *${botMoveStr.toUpperCase()}*\n\n`;
      } else {
        gameCaption += `Langkah Kamu: *${messageText.toUpperCase()}*\nBot tidak bisa bergerak dan melewati gilirannya!\n\n`;
      }
      let playerNextMoves = getValidOthelloMoves(currentBoard, PLAYER_BLACK);
      botValidMoves = getValidOthelloMoves(currentBoard, PLAYER_WHITE);
      gameState.board = currentBoard;
      gameState.validMoves = playerNextMoves;
      const finalScore = calculateOthelloScore(currentBoard);
      gameCaption += `Skor: Hitam ${finalScore.black} - ${finalScore.white} Putih\n\n`;
      if (playerNextMoves.length === 0 && botValidMoves.length === 0) {
        gameCaption += `*PERMAINAN SELESAI!*\n\n`;
        if (finalScore.black > finalScore.white) {
          gameCaption += `🎉 Selamat, Kamu (Hitam) memenangkan permainan!`;
        } else if (finalScore.white > finalScore.black) {
          gameCaption += `🤖 Bot (Putih) memenangkan permainan!`;
        } else {
          gameCaption += `🤝 Permainan berakhir seri!`;
        }
        const boardBuffer = await generateOthelloBoardImage(currentBoard);
        await sReply({ image: boardBuffer, caption: gameCaption, mentions: [serial] });
        clearTimeout(gameState.timeoutId);
        delete othelloGame[toId];
        await addXp(fn, toId, serial, m); await counthit(serial);
        return;
      }
      if (playerNextMoves.length > 0) {
        gameState.turn = PLAYER_BLACK;
        gameCaption += `Giliranmu`;
      } else {
        gameState.turn = PLAYER_WHITE;
        gameCaption += `Kamu tidak memiliki langkah valid! Giliran dilewati.`;
      }
      const boardBuffer = await generateOthelloBoardImage(currentBoard, playerNextMoves);
      await sReply({ image: boardBuffer, caption: gameCaption, mentions: [serial] });
    };
    if (ludoSessions[toId] && !isCmd) {
      const gameState = ludoSessions[toId];
      const messageText = m.body?.toLowerCase()?.trim();
      if (serial !== gameState.playerJid) return;
      const stopKeywords = ['stop', 'menyerah', 'end', 'stop ludo'];
      if (stopKeywords.includes(messageText)) {
        clearTimeout(gameState.timeoutId);
        delete ludoSessions[toId];
        return await sReply("Permainan Ludo telah dihentikan.");
      }
      if (gameState.players[gameState.turn] !== 'RED') return;
      if (['roll', 'kocok'].includes(messageText)) {
        if (gameState.status !== 'WAITING_FOR_ROLL') {
          return await sReply("Bukan giliran Kamu atau Kamu harus menunggu bot selesai.");
        }
        clearTimeout(gameState.timeoutId);
        const roll = rollDice();
        const playerColor = 'RED';
        const currentPos = gameState.pawnPositions[playerColor];
        let moveText = `Kamu melempar dadu dan mendapat angka *${roll}*.\n`;
        if (currentPos >= 500 && roll !== 6) {
          await sReply(`Kamu perlu angka 6 untuk keluar dari kandang. Giliran dilewatkan.`);
          gameState.turn = (gameState.turn + 1) % gameState.players.length;
          gameState.status = 'BOTS_TURN';
          setTimeout(() => runBotLudoTurns(toId, m, fn), 2000);
          return;
        }
        const newPos = calculateNewPosition(currentPos, roll, playerColor);
        gameState.pawnPositions[playerColor] = newPos;
        if (currentPos >= 500) {
          moveText += `Kamu keluar dari kandang!\n`;
        } else {
          moveText += `Pion Kamu maju *${roll}* langkah...\n`;
        }
        const captureText = checkForCapture(gameState, playerColor, newPos);
        if (captureText) moveText += captureText;
        if (newPos === HOME_POSITIONS[playerColor]) {
          const finalBoard = await generateLudoBoard(gameState);
          await sReply({ image: finalBoard, caption: moveText + `\n🎉 Selamat, Kamu MENANG!`, mentions: [serial] });
          delete ludoSessions[toId];
          return;
        }
        const newBoard = await generateLudoBoard(gameState);
        if (roll === 6) {
          gameState.status = 'WAITING_FOR_ROLL';
          await sReply({ image: newBoard, caption: moveText + `\nAnda dapat angka 6! Silakan *roll* lagi.` });
          startLudoTimeout(toId);
        } else {
          gameState.status = 'BOTS_TURN';
          await sReply({ image: newBoard, caption: moveText + `\nSekarang giliran Bot...` });
          gameState.turn = (gameState.turn + 1) % gameState.players.length;
          setTimeout(() => runBotLudoTurns(toId, m, fn), 2000);
        }
      }
    };
    if (game41Sessions[toId] && !isCmd) {
      const gameState = game41Sessions[toId];
      const messageText = m.body?.toLowerCase()?.trim();
      if (serial !== gameState.playerJid || gameState.turn !== 'player') return;
      const stopKeywords = ['menyerah', 'stop', 'surrender'];
      if (stopKeywords.includes(messageText)) {
        clearTimeout(gameState.timeoutId);
        await sReply(`Kamu telah menyerah. Bot memenangkan permainan. 🤖`);
        delete game41Sessions[toId];
        await addXp(fn, toId, serial, m); await counthit(serial);
        return;
      }
      if (['ambil dek', 'ambil buangan'].includes(messageText) && gameState.playerHand.length === 4) {
        let takenCard = messageText === 'ambil dek' ? gameState.deck.shift() : gameState.discardPile.pop();
        if (!takenCard) return await sReply("Tumpukan tersebut kosong!");
        gameState.playerHand.push(takenCard);
        const privateMessage = `Kamu mengambil [ ${takenCard.display} ].\n\n` +
          `Kartu Kamu sekarang:\n${formatKartu(gameState.playerHand)}\n\n` +
          `Ketik *buang <nomor kartu>* (1-5) di grup untuk membuang kartu.`;
        await fn.sendPesan(gameState.playerJid, privateMessage, m);
        await addXp(fn, toId, serial, m); await counthit(serial);
        return;
      }
      if (messageText.startsWith('buang ') && gameState.playerHand.length === 5) {
        const cardIndex = parseInt(messageText.split(' ')[1]) - 1;
        if (isNaN(cardIndex) || cardIndex < 0 || cardIndex >= 5) return await sReply('Nomor kartu tidak valid. Pilih dari 1 sampai 5.');
        const discardedCard = gameState.playerHand.splice(cardIndex, 1)[0];
        gameState.discardPile.push(discardedCard);
        gameState.turn = 'bot';
        await sReply(`Kamu membuang kartu [ ${discardedCard.display} ]. Giliran Bot...`);
        await addXp(fn, toId, serial, m); await counthit(serial);
        setTimeout(() => runBotTurn41(toId, m, fn), 2000);
        return;
      }
      if (['ketuk', 'tutup'].includes(messageText)) {
        clearTimeout(gameState.timeoutId);
        const playerScore = calculateScore(gameState.playerHand);
        const botScore = calculateScore(gameState.botHand);
        let resultText = `*RONDE SELESAI!*\n\n` +
          `Tangan Kamu (Skor: *${playerScore}*):\n${formatKartu(gameState.playerHand)}\n\n` +
          `Tangan Bot (Skor: *${botScore}*):\n${formatKartu(gameState.botHand)}\n\n`;
        if (playerScore > botScore) resultText += `🎉 Selamat, Kamu menang!`;
        else if (botScore > playerScore) resultText += `🤖 Bot menang!`;
        else resultText += `🤝 Hasilnya seri!`;
        await sReply(resultText);
        delete game41Sessions[toId];
        await addXp(fn, toId, serial, m); await counthit(serial);
        return;
      }
    };
    if (samgongSessions[toId] && !isCmd) {
      const gameState = samgongSessions[toId];
      const messageText = m.body?.toLowerCase()?.trim();
      if (serial !== gameState.playerJid) return;
      const stopKeywords = ['stop', 'berhenti', 'menyerah', 'stopsamgong'];
      const startTimeout = (idGroup) => {
        const gameDuration = 5 * 60 * 1000;
        const timeoutCallback = () => {
          if (samgongSessions[idGroup]) {
            delete samgongSessions[idGroup];
          }
        };
        samgongSessions[idGroup].timeoutId = setTimeout(timeoutCallback, gameDuration);
      };
      if (stopKeywords.includes(messageText)) {
        clearTimeout(gameState.timeoutId);
        delete samgongSessions[toId];
        await sReply('Kamu telah berdiri dari meja Samgong. Sesi dihentikan.');
        await addXp(fn, toId, serial, m); await counthit(serial);
        return;
      };
      if (gameState.status !== 'player_turn') return;
      if (messageText === 'hit') {
        clearTimeout(gameState.timeoutId);
        const newCard = gameState.deck.shift();
        if (!newCard) return await sReply("Dek sudah habis!");
        gameState.playerHand.push(newCard);
        const playerScore = calculateSamgongValue(gameState.playerHand);
        let privateMessage = `Kamu mengambil [ ${newCard.display} ].\n\n` +
          `Tangan Kamu sekarang (Total: *${playerScore}*):\n${formatKartu(gameState.playerHand)}`;
        if (playerScore > 30) {
          await fn.sendPesan(gameState.playerJid, privateMessage, m);
          await sReply(`💥 *HANGUS!* Nilai kartu Kamu (*${playerScore}*) melebihi 30. Bot menang!`);
          delete samgongSessions[toId];
          await addXp(fn, toId, serial, m); await counthit(serial);
          return;
        } else {
          privateMessage += `\n\nKetik *hit* lagi atau *stand*.`;
          await fn.sendPesan(gameState.playerJid, privateMessage, m);
          startTimeout(toId);
          await addXp(fn, toId, serial, m); await counthit(serial);
          return;
        };
      };
      if (messageText === 'stand') {
        clearTimeout(gameState.timeoutId);
        gameState.status = 'bot_turn';
        const playerScore = calculateSamgongValue(gameState.playerHand);
        await sReply(`Kamu *STAND* dengan nilai akhir *${playerScore}*.\nBandar akan membuka kartu...`);
        setTimeout(() => runBotSamgongTurn(toId, m, fn), 2000);
      };
    };
    if (werewolfSessions[toId] && !isCmd) {
      const gameState = werewolfSessions[toId];
      const playerState = gameState.pemain[serial];
      const text = m.body?.toLowerCase()?.trim();
      if (!playerState || !playerState.isAlive) return;
      if (gameState.status === 'NIGHT' && m.isBaileys && text.startsWith('.w ')) {
        try {
          const [, action, targetIndexStr] = text.split(' ');
          const targetIndex = parseInt(targetIndexStr) - 1;
          const livingPlayers = Object.values(gameState.pemain).filter(p => p.isAlive);
          if (isNaN(targetIndex) || targetIndex < 0 || targetIndex >= livingPlayers.length) throw new Error("Nomor target tidak valid.");
          const targetPlayer = livingPlayers[targetIndex];
          if (action === 'kill' && playerState.role === 'werewolf') {
            gameState.aksiMalam.pilihanWerewolf = targetPlayer.id;
            await sReply(`Kamu memilih untuk membunuh @${targetPlayer.id.split('@')[0]}.`);
          } else if (action === 'see' && playerState.role === 'seer') {
            gameState.aksiMalam.pilihanSeer = targetPlayer.id;
            await sReply(`Kamu melihat peran @${targetPlayer.id.split('@')[0]}. Dia adalah seorang *${targetPlayer.role}* ${emoji_role(targetPlayer.role)}.`);
          } else if (action === 'protect' && playerState.role === 'guardian') {
            gameState.aksiMalam.pilihanGuardian = targetPlayer.id;
            await sReply(`Kamu melindungi @${targetPlayer.id.split('@')[0]} malam ini.`);
          } else if (action === 'check' && playerState.role === 'sorcerer') {
            gameState.aksiMalam.pilihanSorcerer = targetPlayer.id;
            await sReply(`Kamu memeriksa @${targetPlayer.id.split('@')[0]}. Dia adalah seorang *${targetPlayer.role}* ${emoji_role(targetPlayer.role)}.`);
          }
          await addXp(fn, toId, serial, m); await counthit(serial);
        } catch (error) {
          await sReply(error.message);
        }
      }
      if (gameState.status === 'VOTING' && text.startsWith('.vote ')) {
        try {
          const targetIndexStr = text.split(' ')[1];
          const targetIndex = parseInt(targetIndexStr) - 1;
          const livingPlayers = Object.values(gameState.pemain).filter(p => p.isAlive);
          if (isNaN(targetIndex) || targetIndex < 0 || targetIndex >= livingPlayers.length) throw new Error("Nomor target tidak valid.");
          const targetPlayer = livingPlayers[targetIndex];
          if (targetPlayer.id === serial) throw new Error("Kamu tidak bisa vote diri sendiri.");
          gameState.votes[serial] = targetPlayer.id;
          await addXp(fn, toId, serial, m); await counthit(serial);
        } catch (error) {
          await sReply(error.message);
        }
      }
    };
    if (tictactoeSessions[toId] && !isCmd) {
      const gameState = tictactoeSessions[toId];
      const playerMove = parseInt(m.body?.toLowerCase()?.trim());
      if (serial !== gameState.playerJid) return;
      const stopKeywords = ['stop', 'berhenti', 'menyerah', 'stoptictactoe'];
      const startTTTTimeout = (idGroup) => {
        const gameDuration = 3 * 60 * 1000;
        const timeoutCallback = () => {
          if (tictactoeSessions[idGroup]) {
            delete tictactoeSessions[idGroup];
          }
        };
        tictactoeSessions[idGroup].timeoutId = setTimeout(timeoutCallback, gameDuration);
      };
      if (stopKeywords.includes(m.body?.toLowerCase()?.trim())) {
        clearTimeout(gameState.timeoutId);
        delete tictactoeSessions[toId];
        await sReply('Permainan Tic-Tac-Toe dihentikan.');
        await addXp(fn, toId, serial, m); await counthit(serial);
        return;
      }
      if (gameState.turn !== 'player') return;
      if (isNaN(playerMove) || playerMove < 1 || playerMove > 9) return;
      const row = Math.floor((playerMove - 1) / 3);
      const col = (playerMove - 1) % 3;
      if (gameState.board[row][col]) {
        return await sReply("Kotak itu sudah terisi! Pilih kotak lain.");
      }
      clearTimeout(gameState.timeoutId);
      gameState.board[row][col] = gameState.playerSymbol;
      gameState.turn = 'bot';
      let winner = checkWinner(gameState.board);
      if (winner) {
        let endText = winner === 'draw' ? 'Permainan berakhir SERI!\n' : `Selamat, Kamu MENANG!\n`;
        endText += formatTicTacToeBoard(gameState.board);
        await sReply(endText);
        delete tictactoeSessions[toId];
        await addXp(fn, toId, serial, m); await counthit(serial);
        return;
      }
      await sReply("Langkah Kamu diterima. Bot sedang berpikir...");
      await delay(1000);
      let botMove = null;
      for (let symbol of [gameState.botSymbol, gameState.playerSymbol]) {
        if (botMove) break;
        for (let i = 0; i < 3; i++) {
          if (botMove) break;
          for (let j = 0; j < 3; j++) {
            if (!gameState.board[i][j]) {
              gameState.board[i][j] = symbol;
              if (checkWinner(gameState.board) === symbol) botMove = { row: i, col: j };
              gameState.board[i][j] = '';
              if (botMove) break;
            }
          }
        }
      }
      if (!botMove) {
        if (!gameState.board[1][1]) botMove = { row: 1, col: 1 };
        else {
          const corners = [{ row: 0, col: 0 }, { row: 0, col: 2 }, { row: 2, col: 0 }, { row: 2, col: 2 }];
          const emptyCorners = corners.filter(c => !gameState.board[c.row][c.col]);
          if (emptyCorners.length > 0) botMove = emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
          else {
            const sides = [{ row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 2 }, { row: 2, col: 1 }];
            const emptySides = sides.filter(s => !gameState.board[s.row][s.col]);
            if (emptySides.length > 0) botMove = emptySides[Math.floor(Math.random() * emptySides.length)];
          }
        }
      }
      if (botMove) {
        gameState.board[botMove.row][botMove.col] = gameState.botSymbol;
      }
      let updateText = `Bot menempatkan 'O' di kotak ${botMove.row * 3 + botMove.col + 1}.\n\nGiliran Kamu!\n`;
      updateText += formatTicTacToeBoard(gameState.board);
      await sReply(updateText);
      winner = checkWinner(gameState.board);
      if (winner) {
        let endText = winner === 'draw' ? 'Permainan berakhir SERI!\n' : `Maaf, Bot MENANG!\n`;
        endText += formatTicTacToeBoard(gameState.board);
        await sReply(endText);
        delete tictactoeSessions[toId];
        await addXp(fn, toId, serial, m); await counthit(serial);
        return;
      }
      gameState.turn = 'player';
      startTTTTimeout(toId);
    };
    if (ularTanggaSessions[toId] && !isCmd) {
      const startUlarTanggaTimeout = (idGroup) => {
        const gameDuration = 3 * 60 * 1000;
        const timeoutCallback = () => {
          if (ularTanggaSessions[idGroup]) {
            delete ularTanggaSessions[idGroup];
          }
        };
        if (ularTanggaSessions[idGroup]) {
          ularTanggaSessions[idGroup].timeoutId = setTimeout(timeoutCallback, gameDuration);
        }
      };
      const gameState = ularTanggaSessions[toId];
      const messageText = m.body?.toLowerCase()?.trim();
      if (serial !== gameState.playerJid) return;
      const stopKeywords = ['stop', 'berhenti', 'menyerah', 'stopular'];
      if (stopKeywords.includes(messageText)) {
        clearTimeout(gameState.timeoutId);
        delete ularTanggaSessions[toId];
        await sReply('Sesi Ular Tangga berhasil dihentikan.');
        await addXp(fn, toId, serial, m); await counthit(serial);
        return;
      }
      if (gameState.turn !== 'player') return;
      if (messageText === 'lempar' || messageText === 'roll') {
        clearTimeout(gameState.timeoutId);
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const totalMove = dice1 + dice2;
        const isDouble = dice1 === dice2;
        let playerText = `Kamu melempar dadu dan mendapat 🎲(${dice1}) + 🎲(${dice2}) = *${totalMove}*.\n`;
        const oldPos = gameState.playerPos;
        gameState.playerPos += totalMove;
        playerText += `Kamu maju dari kotak *${oldPos}* ke *${gameState.playerPos}*.\n`;
        const board = gameState.board;
        if (board.ladders[gameState.playerPos]) {
          const targetPos = board.ladders[gameState.playerPos];
          playerText += `Kamu mendarat di tangga! 🪜 Kamu naik ke kotak *${targetPos}*.\n`;
          gameState.playerPos = targetPos;
        } else if (board.snakes[gameState.playerPos]) {
          const targetPos = board.snakes[gameState.playerPos];
          playerText += `Kamu mendarat di ular! 🐍 Kamu turun ke kotak *${targetPos}*.\n`;
          gameState.playerPos = targetPos;
        }
        if (gameState.playerPos >= board.size) {
          playerText += `\n🎉 Selamat, Kamu mencapai garis finis dan MENANG!`;
          await sReply(playerText);
          delete ularTanggaSessions[toId];
          await addXp(fn, toId, serial, m); await counthit(serial);
          return;
        }
        if (isDouble) {
          playerText += `\nAnda mendapat angka kembar! Lempar dadu lagi.`;
          startUlarTanggaTimeout(toId);
        } else {
          playerText += `\nSekarang giliran Bot...`;
          gameState.turn = 'bot';
          setTimeout(() => runBotUlarTanggaTurn(toId, m, fn), 2000);
        }
        await sReply(playerText);
        await addXp(fn, toId, serial, m); await counthit(serial);
      }
    };
    if (minesweeperSessions[toId] && !isCmd) {
      const gameState = minesweeperSessions[toId];
      const messageText = m.body?.toLowerCase()?.trim();
      const parts = messageText.split(' ');
      const action = parts[0];
      const coord = parts[1];
      const startMinesweeperTimeout = (idGroup) => {
        const gameDuration = 10 * 60 * 1000;
        const timeoutCallback = () => {
          if (minesweeperSessions[idGroup]) {
            delete minesweeperSessions[idGroup];
          }
        };
        minesweeperSessions[idGroup].timeoutId = setTimeout(timeoutCallback, gameDuration);
      };
      if (serial !== gameState.playerJid || gameState.gameStatus !== 'playing') return;
      if (!['buka', 'tandai', 'batal', 'stop', 'menyerah'].includes(action) || (action !== 'stop' && action !== 'menyerah' && !coord)) return;
      clearTimeout(gameState.timeoutId);
      if (action === 'stop' || action === 'menyerah') {
        delete minesweeperSessions[toId];
        await addXp(fn, toId, serial, m); await counthit(serial);
        return await sReply("Permainan Minesweeper dihentikan.");
      }
      const col = coord.charCodeAt(0) - 97;
      const row = parseInt(coord.slice(1)) - 1;
      if (row < 0 || row >= gameState.playerBoard.length || col < 0 || col >= gameState.playerBoard[0].length) {
        startMinesweeperTimeout(toId);
        return await sReply("Koordinat tidak valid.");
      }
      if (action === 'buka') {
        if (gameState.playerBoard[row][col].status === 'terbuka') {
          startMinesweeperTimeout(toId);
          await addXp(fn, toId, serial, m); await counthit(serial);
          return await sReply("Kotak itu sudah terbuka.");
        }
        if (gameState.playerBoard[row][col].status === 'ditandai') {
          startMinesweeperTimeout(toId);
          await addXp(fn, toId, serial, m); await counthit(serial);
          return await sReply("Kotak ini ditandai dengan bendera. Gunakan 'batal' terlebih dahulu jika ingin membukanya.");
        }
        if (gameState.solutionBoard[row][col] === '*') {
          gameState.gameStatus = 'lost';
          const finalBoard = formatMinesweeperBoard(gameState.playerBoard, true, gameState.solutionBoard);
          await sReply("💣 BOOM! Kamu menginjak bom. Game Selesai.\n" + finalBoard);
          delete minesweeperSessions[toId];
          await addXp(fn, toId, serial, m); await counthit(serial);
          return;
        }
        revealCell(row, col, gameState);
        if (checkWinCondition(gameState)) {
          gameState.gameStatus = 'won';
          const finalBoard = formatMinesweeperBoard(gameState.playerBoard, true, gameState.solutionBoard);
          await sReply("🎉 Selamat! Kamu menemukan semua bom dan MEMENANGKAN permainan!\n" + finalBoard);
          delete minesweeperSessions[toId];
          await addXp(fn, toId, serial, m); await counthit(serial);
          return;
        }
      }
      else if (action === 'tandai') {
        if (gameState.playerBoard[row][col].status === 'tertutup') {
          gameState.playerBoard[row][col] = { status: 'ditandai', value: '' };
        }
      }
      else if (action === 'batal') {
        if (gameState.playerBoard[row][col].status === 'ditandai') {
          gameState.playerBoard[row][col] = { status: 'tertutup', value: '' };
        }
      }
      await sReply("Langkah diterima:\n" + formatMinesweeperBoard(gameState.playerBoard));
      startMinesweeperTimeout(toId);
      await addXp(fn, toId, serial, m); await counthit(serial);
    };
    if (quotedMsg && /^Berapa hasil dari/i.test(quotedMsg?.body)) {
      if ((toId in gamematematika) && quotedMsg?.id === gamematematika[toId]?.[0]?.key?.id) {
        const userAnswer = parseInt(body.trim());
        if (isNaN(userAnswer)) {
          await addXp(fn, toId, serial, m); await counthit(serial);
          return;
        }
        let math = gamematematika[toId][1]
        if (userAnswer == math.result) {
          await sReply(`*Jawaban Benar!*\nSelamat kamu mendapatkan ${math.bonus} saldo`);
          await addBal(serial, math.bonus);
          clearTimeout(gamematematika[toId][3]);
          delete gamematematika[toId];
          await addXp(fn, toId, serial, m); await counthit(serial);
          return;
        } else {
          if (--gamematematika[toId][2] == 0) {
            await sReply(`*Kesempatan habis!*\nJawaban: *${math.result}*`);
            clearTimeout(gamematematika[toId][3]);
            delete gamematematika[toId];
            await addXp(fn, toId, serial, m); await counthit(serial);
            return;
          } else {
            await addXp(fn, toId, serial, m); await counthit(serial);
            await sReply(`*Jawaban Salah!*\nMasih ada ${gamematematika[toId][2]} kesempatan`);
            return;
          }
        }
      } else {
        await sReply(`Soal itu sudah berakhir`);
        await addXp(fn, toId, serial, m); await counthit(serial);
        return;
      }
    };
    if (quotedMsg && /^Tebak kuis berikut ini/i.test(quotedMsg?.body)) {
      const addStat = async () => { await addXp(fn, toId, serial, m); await counthit(serial); };
      if ((toId in family100) && quotedMsg?.id === family100[toId]?.[5]?.key?.id) {
        const [, jawaban, status, contribs, timeout] = family100[toId];
        const userAnswer = txt.toLowerCase().trim();
        const total = 600;
        const scorePerJawaban = Math.floor(total / jawaban.length);
        const bagiSaldo = async () => {
          let teks = '';
          let hadiahFinal = 0;
          for (const user of new Set([...Object.keys(contribs.benar), ...Object.keys(contribs.salah)])) {
            const benar = contribs.benar[user] || 0;
            const salah = contribs.salah[user] || 0;
            const net = Math.max((benar * scorePerJawaban) - (salah * scorePerJawaban), 0);
            if (net > 0) await addBal(user, net);
            teks += `• @${user.split('@')[0]} ➜ +${net} saldo (✅${benar} ❎${salah})\n`;
            hadiahFinal += net;
          }
          const sisa = total - hadiahFinal;
          teks += `\n💰 *Total Hadiah Dibagikan:* ${hadiahFinal}\n`;
          if (sisa > 0) teks += `🎁 *Sisa Tidak Terbagi:* ${sisa} (karena pembulatan atau tidak ada penalti dari jawaban ganda)\n`;
          return teks;
        };
        if (/^(menyerah|giveup)$/i.test(userAnswer)) {
          clearTimeout(timeout);
          const benarCount = status.filter(Boolean).length;
          let teks = `📢 Game *Family100* dihentikan oleh pemain.\n\n`;
          if (benarCount > 0) teks += bagiSaldo();
          const belum = jawaban.map((j, i) => status[i] ? null : `❎ ${j}`).filter(Boolean);
          if (belum.length) {
            teks += `\n❗ *Jawaban yang belum tertebak:*\n${belum.join('\n')}`;
          }
          delete family100[toId];
          await fn.sendPesan(toId, teks, m); addStat(); return;
        }
        const idx = jawaban.findIndex((j, i) => j.toLowerCase() === userAnswer && !status[i]);
        if (idx >= 0) {
          status[idx] = true;
          contribs.benar[serial] = (contribs.benar[serial] || 0) + 1;
          await sReply(`✅ Jawaban *${jawaban[idx]}* benar!\n📊 Progress: ${status.filter(Boolean).length}/${jawaban.length}`);
          if (status.every(Boolean)) {
            clearTimeout(timeout);
            let teks = `🎉 Semua jawaban ditemukan!\n\n🏆 *Total Hadiah Awal:* ${total}\n`;
            teks += bagiSaldo();
            delete family100[toId];
            await fn.sendPesan(toId, teks, m); addStat(); return;
          }
        } else if (jawaban.findIndex(j => j.toLowerCase() === userAnswer) >= 0) {
          await sReply(`⚠️ Jawaban *${txt}* sudah ditebak oleh pemain lain.\n📊 Progress: ${status.filter(Boolean).length}/${jawaban.length}`, m);
        } else {
          contribs.salah[serial] = (contribs.salah[serial] || 0) + 1;
          await sReply(`❎ Jawaban *${txt}* tidak ada.\n📊 Progress: ${status.filter(Boolean).length}/${jawaban.length}\n\nBalas *menyerah* jika ingin menyerah.`);
        }
        addStat(); return;
      } else {
        await sReply('Soal itu sudah berakhir atau tidak valid.');
        addStat(); return;
      }
    };
    if (sudokuGame[toId] && sudokuGame[toId].player === serial && !isCmd) {
      const gameState = sudokuGame[toId];
      const messageText = m.body?.toLowerCase().trim();
      try {
        if (messageText === 'menyerah') {
          const solutionBoardBuffer = await generateSudokuBoardImage(gameState.puzzle, gameState.solution);
          await sReply({ image: solutionBoardBuffer, caption: "Baiklah, game telah dihentikan. Ini adalah jawaban yang benar." });
          await counthit(serial);
          clearTimeout(gameState.timeoutId);
          delete sudokuGame[toId];
          return;
        }
        if (messageText === 'cek') {
          const errorIndices = [];
          let isFull = true;
          for (let i = 0; i < 81; i++) {
            if (gameState.puzzle[i] === null) {
              if (gameState.board[i] === null) {
                isFull = false;
              } else if (gameState.board[i] !== gameState.solution[i]) {
                errorIndices.push(i);
              }
            }
          }
          if (errorIndices.length > 0) {
            const boardBuffer = await generateSudokuBoardImage(gameState.puzzle, gameState.board, errorIndices);
            await sReply({
              image: boardBuffer,
              caption: `🤔 Ditemukan ${errorIndices.length} angka yang salah dan ditandai dengan warna merah. Coba perbaiki!`
            });
          } else if (isFull) {
            await sReply("🎉 *Luar Biasa!* 🎉\n\nSemua jawabanmu benar dan papan telah terisi penuh. Anda menang!");
            clearTimeout(gameState.timeoutId);
            delete sudokuGame[toId];
          } else {
            await sReply("✅ Sejauh ini semua angkamu benar. Lanjutkan mengisi!");
          }
          return;
        }
        if (messageText === 'hint') {
          if (gameState.hintsUsed >= 3) {
            return await sReply("Maaf, kamu sudah menggunakan semua jatah bantuan (3/3).");
          }
          const emptyCells = [];
          gameState.board.forEach((cell, index) => {
            if (cell === null) {
              emptyCells.push(index);
            }
          });
          if (emptyCells.length === 0) {
            return await sReply("Papan sudah terisi penuh, tidak ada bantuan yang bisa diberikan.");
          }
          gameState.hintsUsed++;
          const hintsLeft = 3 - gameState.hintsUsed;
          const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          const solutionValue = gameState.solution[randomIndex];
          gameState.board[randomIndex] = solutionValue;
          const colLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
          const rowLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
          const row = Math.floor(randomIndex / 9);
          const col = randomIndex % 9;
          const coordStr = `${colLabels[col].toUpperCase()}${rowLabels[row]}`;
          const boardBuffer = await generateSudokuBoardImage(gameState.puzzle, gameState.board);
          await sReply({ image: boardBuffer, caption: `💡 *Bantuan:* Angka *${solutionValue + 1}* telah ditempatkan di *${coordStr}*.\n\nSisa bantuan: *${hintsLeft}/3*` });
          return;
        }
        const moveRegex = /^([a-i][1-9])\s+([0-9])$/i;
        const match = messageText.match(moveRegex);
        if (match) {
          clearTimeout(gameState.timeoutId);
          const gameDuration = 5 * 60 * 1000;
          const newTimeoutCallback = async () => {
            if (sudokuGame[toId]) {
              delete sudokuGame[toId];
            }
          };
          gameState.timeoutId = setTimeout(newTimeoutCallback, gameDuration);
          const coord = match[1];
          const value = parseInt(match[2], 10);
          const index = parseSudokuCoord(coord);
          if (index === null) throw new Error("Koordinat tidak valid. Gunakan a1 - i9.");
          if (gameState.puzzle[index] !== null) throw new Error("Kotak ini adalah bagian dari puzzle dan tidak bisa diubah.");
          let replyCaption = "";
          if (value === 0) {
            gameState.board[index] = null;
            replyCaption = `🗑️ Angka di *${coord.toUpperCase()}* berhasil dihapus.`;
          } else {
            gameState.board[index] = value - 1;
            replyCaption = `✅ Angka *${value}* berhasil diletakkan di *${coord.toUpperCase()}*.`;
          }
          const boardBuffer = await generateSudokuBoardImage(gameState.puzzle, gameState.board);
          await sReply({ image: boardBuffer, caption: replyCaption });
          if (value !== 0 && !gameState.board.includes(null)) {
            const isSolved = JSON.stringify(gameState.board) === JSON.stringify(gameState.solution);
            if (isSolved) {
              await sReply("🎉 *Luar Biasa!* 🎉\n\nPapan sudah terisi penuh dan semua jawabanmu BENAR! Anda berhasil menyelesaikan puzzle ini!");
            } else {
              const errorIndices = [];
              for (let i = 0; i < 81; i++) {
                if (gameState.puzzle[i] === null && gameState.board[i] !== gameState.solution[i]) {
                  errorIndices.push(i);
                }
              }
              const errorBoardBuffer = await generateSudokuBoardImage(gameState.puzzle, gameState.board, errorIndices);
              await sReply({ image: errorBoardBuffer, caption: "Papan sudah penuh, namun masih ada jawaban yang salah (ditandai merah)." });
            }
            await addXp(fn, toId, serial, m); await counthit(serial);
            clearTimeout(gameState.timeoutId);
            delete sudokuGame[toId];
          }
          return;
        }
      } catch (error) { await sReply(error.message); }
    };
    if (chatBots[serial] && !interactiveHandled && !isCmd) {
      clearTimeout(chatBots[serial]);
      chatBots[serial] = setTimeout(() => {
        delete chatBots[serial];
      }, SESSION_TIMEOUT);
      const userMessage = body.trim();
      const imageRequestRegex = /\b(gambar|lukiskan)\b/i;
      if (imageRequestRegex.test(userMessage)) {
        const promptForImage = userMessage.replace(imageRequestRegex, '').trim();
        const genAI = new GoogleGenerativeAI(gemini);
        const model = genAI.getGenerativeModel({
          generationConfig: { responseModalities: ['Text', 'Image'] },
          model: "gemini-2.0-flash-exp-image-generation",
          safetySettings,
        });
        const result = await model.generateContent(promptForImage);
        const response = result.response;
        const parts = response.candidates?.[0]?.content?.parts;
        if (!parts) {
          const feedback = response.text();
          await sReply(`AI tidak menghasilkan output yang valid. Feedback: ${feedback || 'Tidak ada feedback.'}`);
        }
        let imageGenerated = false;
        for (const part of parts) {
          if (part.inlineData) {
            const filePath = await saveFile(Buffer.from(part.inlineData.data, 'base64'), 'gemini-img2img', 'jpg');
            await fn.sendFilePath(toId, dbSettings.autocommand, filePath, { quoted: m });
            await deleteFile(filePath);
            imageGenerated = true;
            break;
          }
        }
        if (!imageGenerated) await sReply("Gagal membuat gambar. Respons dari AI tidak mengandung data gambar.");
      } else {
        const session = getSession(serial);
        if (!session) return await sReply("Maaf, sesi chatbot sedang bermasalah. Coba `.chatbot off` lalu `.chatbot on` lagi.");
        let messageListener, errorListener, timeoutHandler;
        const cleanupListeners = () => {
          session.emitter.removeListener('message', messageListener);
          session.emitter.removeListener('error_message', errorListener);
          clearTimeout(timeoutHandler);
        };
        messageListener = async (reply) => {
          cleanupListeners();
          try {
            const obj = JSON.parse(reply);
            await sReply(obj.assistant);
          } catch {
            await sReply(reply);
          };
        };
        errorListener = async (errorMsg) => {
          cleanupListeners();
          await sReply(`[AI ERROR]\n${errorMsg}`);
        };
        timeoutHandler = setTimeout(async () => {
          cleanupListeners();
          await sReply("Maaf, AI tidak merespons dalam waktu yang ditentukan. Coba lagi.");
        }, 90000);
        session.emitter.on('message', messageListener);
        session.emitter.on('error_message', errorListener);
        session.py.stdin.write(userMessage + '\n');
      };
    };
  } catch (error) {
    await log(`!!! ERROR DI DALAM ARFINE !!!\n${error}`, true);
  };
  if (body?.startsWith('>')) {
    if (!isSadmin) return;
    try {
      const evaled = /await/i.test(body?.slice(2)) ? await eval('(async () => { ' + body?.slice(2) + ' })()') : await eval(body?.slice(2));
      if (typeof evaled === 'string' && evaled.startsWith(localFilePrefix)) {
        const localPath = evaled.substring(localFilePrefix.length);
        await sendAndCleanupFile(fn, toId, localPath, m);
      } else {
        let outputText;
        if (typeof evaled === 'object' && evaled !== null) {
          outputText = JSON.stringify(evaled, null, 2);
        } else {
          outputText = util.format(evaled);
        }
        if (outputText === 'undefined') {
          // await sReply('proses selesai.');
        } else {
          await sReply(outputText);
        }
      }
    } catch (error) {
      const errorText = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
      await sReply(errorText);
    }
  } else if (body?.startsWith('$')) {
    if (!isSadmin) return;
    try {
      const { stdout, stderr } = await exec(body?.slice(2).trim());
      const combinedOutput = (stdout || stderr || "").trim();
      if (combinedOutput) {
        await sReply(util.format(combinedOutput));
      } else {
        await sReply("Perintah berhasil dieksekusi, namun tidak ada output yang dihasilkan.");
      }
    } catch (error) {
      await sReply(util.format(error));
    }
  }
};
// ─── Info ────────────────────────────────
/*
  * Created with ❤️ and 💦 By FN
  * Follow https://github.com/Terror-Machine
  * Feel Free To Use
*/
// ─── Info ────────────────────────────────

async function cleanup(signal) {
  await log(`[${signal}] Menyimpan database sebelum keluar...`);
  try {
    if (store) await _dbStore.write(store, true);
    dumpFileImmediate('commands', coms, 'coms');
    dumpFileImmediate('database', dbSettings);
    dumpFileImmediate('master', dbMaster);
    dumpFileImmediate('image', dbImage);
    dumpFileImmediate('audio', dbAudio);
    dumpFileImmediate('contact', dbContact);
    dumpFileImmediate('chat', dbChats);
    dumpFileImmediate('sticker', dbStickers);
    dumpFileImmediate('bacot', dbBacots);
    dumpFileImmediate('vip', dbVIP);
    dumpFileImmediate('premium', dbPremium);
    dumpFileImmediate('limitgame', dbLimitGame);
    dumpFileImmediate('limit', dbLimits);
    dumpFileImmediate('levels', dbLevels);
    dumpFileImmediate('count', dbCounts);
    dumpFileImmediate('groups', dbGroups);
    dumpFileImmediate('muted', dbMuted);
    dumpFileImmediate('filter', dbFilter);
    dumpFileImmediate('whitelist', dbWhitelist);
    dumpFileImmediate('afk', dbAFK);
    await log(`[OK] Database berhasil disimpan.`);
  } catch (error) {
    await log(`Error_menyimpan_database:\n${error}`, true);
  }
  process.exit(0);
};
process.on('SIGINT', () => cleanup('SIGINT'));
process.on('SIGTERM', () => cleanup('SIGTERM'));
(async () => {
  try {
    await starts();
  } catch (error) {
    await log(`🚨 Fatal error during bot startup:\n${error}`, true);
    process.exit(1);
  }
})();