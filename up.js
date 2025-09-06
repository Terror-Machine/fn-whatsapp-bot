require('dotenv').config();
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Ambil API key dari env
const apiKey = JSON.parse(process.env.GEMINI_API_KEY);
if (!apiKey) {
  console.error("Harap set GEMINI_API_KEY di environment variable.");
  process.exit(1);
}

// Argumen CLI (node ocr.cjs text.jpg)
const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node ocr.cjs <image-file>");
  process.exit(1);
}

// Load file gambar
const imageBuffer = fs.readFileSync(filePath);
const mimeType = filePath.endsWith(".png") ? "image/png" : filePath.endsWith(".webp") ? "image/webp" : "image/jpeg";

// Init Gemini
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // cukup cepat untuk OCR
  generationConfig: { responseModalities: ["TEXT"] },
});

(async () => {
  try {
    const result = await model.generateContent([
      { text: "Tolong lakukan OCR penuh. Hasil harus persis semua teks yang terlihat di gambar termasuk yang tidak jelas atau didalam logo. Jangan berikan penjelasan, hanya teks hasil OCR." },
      { inlineData: { mimeType, data: imageBuffer.toString("base64") } },
    ]);
    console.log(result.response.text());
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
