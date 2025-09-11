<h1 align="center">FNBots WhatsApp - Multi-Function Bot</h1>

![Setup Status](https://img.shields.io/badge/setup-ready-brightgreen) ![Node Version](https://img.shields.io/badge/node-%3E%3D20.x-blue) ![Python Version](https://img.shields.io/badge/python-3.12-blue)

FNBots adalah sebuah bot multi-fungsi yang dirancang untuk WhatsApp, menggunakan arsitektur modular dengan tipe kode `If-Else Ladder` dalam bahasa pemrograman `JavaScript` dan `Python`. Bot ini menyediakan berbagai utilitas WhatsApp mulai dari pembuatan sticker, pengaturan user, chat atau group, permainan interaktif, media downloader, hingga integrasi AI generatif.

## **⚠️ Disclaimer**

**FNBOTS** merupakan proyek independen yang **TIDAK BERAFILIASI, DISETUJUI, ATAU DIDUKUNG OLEH WhatsApp atau Meta Platforms.**  

Ini adalah proyek **open-source tidak resmi** yang dikembangkan untuk tujuan:  
- Edukasi  
- Eksperimen pengembangan bot  
- Penelitian teknologi chat automation  

Proyek ini menggunakan library [Baileys](https://www.npmjs.com/package/baileys) dari repositori GitHub [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys) sebagai dasar implementasi WhatsApp Web API.

---

## **✨ Fitur Utama**

| Commands | Worked |
| -------- | ------ |
| Fuzzy Commands |  ✅  |
| Archimed Commands |  ✅  |
| Remote Commands |  ✅  |
| Multi Commands |  ✅  |
| AI Commands |  ✅  |
| Image Manipulation |  ✅  |
| Audio Manipulation |  ✅  |
| Text Manipulation |   ✅  |
| Convert Commands |  ✅  |
| Fun Commands |  ✅  |
| Media Downloader |  ✅  |
| Game Commands |  ✅  |
| Stateless PVE Game |  ✅  |
| Statefull PVE Game |  ✅  |
| Statefull PVP Game |  ✅  |
| Math Commands |  ✅  |
| Util Commands |  ✅  |

---

## **⚠️ Persyaratan Sistem**

### **Core Stack**
- **Node.js v20**
- **Baileys**
- **Python 3.12**

### **Media Processing**
- **FFmpeg**
- **ImageMagick**
- **Sharp**
- **yt-dlp**
- **Pillow**
- **rembg**

### **AI & Machine Learning & OCR**
- **Gemini Google Generative AI**
- **Hugging Face**
- **g4f**

### **Utilities**
- **Canvas**
- **Cheerio** / **Playwright**
- **Fuse.js**
- **Chess.js**
- **Sudoku**

---

## **🚀 Instalasi Lengkap**

### **1. Persiapan Sistem**
```bash
git clone https://github.com/Terror-Machine/fnbots
cd fnbots

chmod +x install.sh
./install.sh
```

### **2. Setup Environment**
1. Salin template environment:
```bash
cp .env.example .env
```
2. Edit file `.env` nya. Pastikan kamu isi dengan benar agak bot bekerja dengan baik.

---

## **🛠️ Cara Penggunaan**

### **Menjalankan sebagai Background Process Menggunakan PM2**
#### **1. Mode Normal**
```bash
pm2 start main.js --name bot
```
#### **2. Mode Development**
```bash
pm2 start main.js --name bot --watch --ignore-watch="database downloads har_and_cookies node_modules src venv"
```

---

## **📜 Lisensi**

Proyek ini menggunakan lisensi [MIT](LICENSE).

---

## **🙏 Special Thanks To**

- [Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
- [@MbahDon](https://github.com/mbahdon16) - Kontributor Ide dan Testing
- [@FckVeza](https://github.com/fckveza) - Kontributor Ide dan Testing
- Kamu...

---

## **🔴 IMPORTANT NOTE!**

- Gunakan **akun kedua** untuk bot, dan **akun pertama** untuk memerintah
- Penggunaan Bot berpotensi menyebabkan akun terbanned - gunakan dengan kesadaran penuh akan resiko
- Untuk pertanyaan/bantuan, buka issue di GitHub
- Dilarang keras memperjualbelikan script ini
- Jika seseorang mencoba menjual skrip ini atau membagikan skrip yang bersumber dari skrip ini dalam bentuk terenkripsi, atau sesuatu yang membuat orang lain merasa dirugikan. ITU BUKAN TANGGUNG JAWAB SAYA. 

**PERINGATAN:** Script ini hanya untuk tujuan edukasi dan pengembangan. Penggunaan adalah tanggung jawab pengguna sepenuhnya.

---

## **Troubleshooting**

1. **Error Python packages**:
   Aktifkan virtual environment terlebih dahulu:
   ```bash
   source venv/bin/activate
   ```

2. **Error dependensi Node.js**:
   Hapus dan install ulang:
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

3. **Error Playwright**:
   Jalankan:
   ```bash
   npx playwright install-deps
   npx playwright install
   ```

---

Dibuat dengan ❤️ dan 💦 oleh [Terror-Machine](https://github.com/Terror-Machine)