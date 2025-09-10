const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

try {
  registerFont(path.join(__dirname, '../ktp/Ocr.ttf'), { family: 'DataFont' });
  registerFont(path.join(__dirname, '../ktp/Sign.ttf'), { family: 'SignatureFont' });
} catch (error) {
  console.error('Gagal mendaftarkan font:', error);
}

const defaultUserData = {
  "NIK":                "1234567890123456",
  "Nama":               "YANTO OLI GARDAN",
  "Tempat/Tgl Lahir":   "Zimbabwe, 69-69-6969",
  "Jenis Kelamin":      "LAKI-LAKI",
  "Gol. Darah":         "O",
  "Alamat":             "JL. Kemana Aja",
  "RT/RW":              "001/002",
  "Kel/Desa":           "JOLODONG",
  "Kecamatan":          "KECIMITIN",
  "Agama":              "KEPO",
  "Status Perkawinan":  "SERING KAWIN",
  "Pekerjaan":          "PENGANGGURAN BANYAK ACARA",
  "Kewarganegaraan":    "PMO",
  "Berlaku Hingga":     "SAMPE MENINGGOY",
};

const defaultHeaderFooterData = {
  "Provinsi":   "PROVINSI",
  "Kabupaten":  "KABUPATEN",
  "LokasiTTD":  "KONTOLODON",
  "TanggalTTD": "12-34-5678"
};

const coordinates = {
  "NIK":              { x: 195, y: 139, fontSize: 34, fontWeight: 'bold' },
  "Nama":             { x: 215, y: 174, fontSize: 19, fontWeight: 'bold' },
  "Tempat/Tgl Lahir": { x: 215, y: 200, fontSize: 19, fontWeight: 'bold' },
  "Jenis Kelamin":    { x: 215, y: 224, fontSize: 19, fontWeight: 'bold' },
  "Gol. Darah":       { x: 520, y: 224, fontSize: 19, fontWeight: 'bold' },
  "Alamat":           { x: 215, y: 249, fontSize: 19, fontWeight: 'bold' },
  "RT/RW":            { x: 215, y: 274, fontSize: 19, fontWeight: 'bold' },
  "Kel/Desa":         { x: 215, y: 298, fontSize: 19, fontWeight: 'bold' },
  "Kecamatan":        { x: 215, y: 322, fontSize: 19, fontWeight: 'bold' },
  "Agama":            { x: 215, y: 348, fontSize: 19, fontWeight: 'bold' },
  "Status Perkawinan":{ x: 215, y: 372, fontSize: 19, fontWeight: 'bold' },
  "Pekerjaan":        { x: 215, y: 397, fontSize: 19, fontWeight: 'bold' },
  "Kewarganegaraan":  { x: 215, y: 422, fontSize: 19, fontWeight: 'bold' },
  "Berlaku Hingga":   { x: 215, y: 446, fontSize: 19, fontWeight: 'bold' },
};

const headerFooterCoordinates = {
  "Provinsi":   { y: 55, fontSize: 34, fontWeight: 'bold', align: 'center' },
  "Kabupaten":  { y: 90, fontSize: 30, fontWeight: 'bold', align: 'center' },
  "LokasiTTD":  { x: 690, y: 410, fontSize: 19, fontWeight: 'bold', align: 'center' },
  "TanggalTTD": { x: 690, y: 430, fontSize: 16, fontWeight: 'bold', align: 'center' }
};

async function generateCard(options = {}) {
  const {
    userData: providedUserData = {},
    headerFooterData: providedHeaderFooterData = {},
    profilePicPath,
    signatureText
  } = options;
  const finalUserData = { ...defaultUserData, ...providedUserData };
  const finalHeaderFooterData = { ...defaultHeaderFooterData, ...providedHeaderFooterData };
  if (!profilePicPath || !fs.existsSync(profilePicPath)) {
    console.error('Error: Path foto profil tidak valid.', profilePicPath);
    return null;
  }
  try {
    const background = await loadImage(path.join(__dirname, '../ktp/output.png'));
    const profilePic = await loadImage(profilePicPath);
    const canvas = createCanvas(background.width, background.height);
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'alphabetic';
    ctx.drawImage(background, 0, 0, background.width, background.height);
    ctx.drawImage(profilePic, 584, 136, 201, 251);
    for (const [label, value] of Object.entries(finalUserData)) {
      const style = coordinates[label];
      if (style) {
        ctx.textAlign = 'left';
        const weight = style.fontWeight || 'normal';
        const size = style.fontSize || 30;
        ctx.font = `${weight} ${size}px DataFont`;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        ctx.strokeText(String(value).toUpperCase(), style.x, style.y);
        ctx.fillText(String(value).toUpperCase(), style.x, style.y);
      }
    }
    for (const [label, value] of Object.entries(finalHeaderFooterData)) {
      const style = headerFooterCoordinates[label];
      if (style) {
        const xPos = style.x || (background.width / 2);
        ctx.textAlign = style.align || 'left';
        const weight = style.fontWeight || 'normal';
        const size = style.fontSize || 30;
        ctx.font = `${weight} ${size}px DataFont`;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeText(String(value).toUpperCase(), xPos, style.y);
        ctx.fillText(String(value).toUpperCase(), xPos, style.y);
      }
    }
    const finalSignatureText = signatureText || finalUserData.Nama.split(' ')[0];
    ctx.textAlign = 'center';
    ctx.font = '23px SignatureFont';
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeText(finalSignatureText.toUpperCase(), 660, 450);
    ctx.fillText(finalSignatureText.toUpperCase(), 660, 450);
    return canvas.toBuffer('image/png');
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat kartu:", error);
    return null;
  }
}

module.exports = generateCard;