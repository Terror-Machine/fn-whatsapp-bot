#!/usr/bin/env bash

set -e

if [ "$(id -u)" -ne 0 ]; then
  echo "Script harus dijalankan sebagai root/sudo"
  exit 1
fi

ORIGINAL_USER=$(logname)
USER_HOME=$(getent passwd "$ORIGINAL_USER" | cut -d: -f6)
UBUNTU_VERSION=$(grep ^VERSION= /etc/os-release | cut -d= -f2 | tr -d '"')
UBUNTU_CODENAME=$(grep ^UBUNTU_CODENAME= /etc/os-release | cut -d= -f2)

echo "🔧 Memulai setup untuk sistem Ubuntu $UBUNTU_VERSION ($UBUNTU_CODENAME)..."
echo "📦 Mengupdate daftar paket dan mengupgrade sistem..."
apt-get update -y && apt-get upgrade -y

echo ""
echo "🔧 Memperbaiki broken packages..."
apt-get install -f -y
dpkg --configure -a
apt-get autoremove -y

echo ""
echo "🐍 Menambahkan PPA deadsnakes untuk versi Python modern..."
apt-get install -y software-properties-common

if [[ "$UBUNTU_VERSION" == *"20.04"* ]]; then
  echo "🔧 Menerapkan perbaikan khusus untuk Ubuntu 20.04..."
  apt-get install -y python3-apt python3-gi
  
  if [ -f "/usr/lib/python3/dist-packages/apt_pkg.cpython-38-x86_64-linux-gnu.so" ]; then
    ln -sf /usr/lib/python3/dist-packages/apt_pkg.cpython-38-x86_64-linux-gnu.so /usr/lib/python3/dist-packages/apt_pkg.so
  fi
  
  echo "🔧 Menambahkan PPA deadsnakes dengan metode alternatif..."
  apt-get install -y gnupg apt-transport-https ca-certificates
  gpg --keyserver hkps://keyserver.ubuntu.com:443 --recv-keys F23C5A6CF475977595C89F51BA6932366A755776
  gpg --export F23C5A6CF475977595C89F51BA6932366A755776 | tee /etc/apt/trusted.gpg.d/deadsnakes.gpg > /dev/null
  echo "deb http://ppa.launchpad.net/deadsnakes/ppa/ubuntu focal main" > /etc/apt/sources.list.d/deadsnakes-ppa.list
  echo "deb-src http://ppa.launchpad.net/deadsnakes/ppa/ubuntu focal main" >> /etc/apt/sources.list.d/deadsnakes-ppa.list
  
elif [[ "$UBUNTU_VERSION" == *"22.04"* ]] || [[ "$UBUNTU_VERSION" == *"24.04"* ]]; then
  echo "🔧 Menambahkan PPA untuk Ubuntu 22.04/24.04..."
  apt-get install -y python3-gi
  add-apt-repository -y ppa:deadsnakes/ppa
else
  echo "🔧 Menambahkan PPA dengan metode umum..."
  apt-get install -y python3-gi
  add-apt-repository -y ppa:deadsnakes/ppa
fi

apt-get update -y

echo ""
echo "🛠️ Menginstall dependencies yang diperlukan terlebih dahulu..."
apt-get install -y \
  libglib2.0-dev \
  libharfbuzz-dev \
  libjpeg-dev \
  libpng-dev \
  libtiff-dev \
  libgif-dev \
  libicu-dev \
  libffi-dev \
  libssl-dev

echo ""
echo "🛠️ Menginstall tools dasar dan library development..."
apt-get install -y \
  mc curl zip unzip webp \
  ffmpeg imagemagick neofetch tree \
  gcc g++ make \
  libpango1.0-dev \
  libcairo2-dev \
  python3.12 python3.12-venv python3.12-dev python3-pip

echo ""
echo "🌐 Menginstall Node.js v20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

if [[ "$UBUNTU_VERSION" == *"20.04"* ]]; then
  echo ""
  echo "🌐 Sistem mendeteksi Ubuntu 20.04, menyesuaikan beberapa langkah..."
  curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash
  apt-get update -y
  apt-get install speedtest -y
  
elif [[ "$UBUNTU_VERSION" == *"22.04"* ]]; then
  echo ""
  echo "🌐 Sistem mendeteksi Ubuntu 22.04, menyesuaikan beberapa langkah..."
  curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash
  apt-get update -y
  apt-get install speedtest -y
  
elif [[ "$UBUNTU_VERSION" == *"24.04"* ]]; then
  echo ""
  echo "🌐 Sistem mendeteksi Ubuntu 24.04, menyesuaikan repositori speedtest..."
  curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash
  if [ -f /etc/apt/sources.list.d/ookla_speedtest-cli.list ]; then
    sed -i 's/noble/jammy/g' /etc/apt/sources.list.d/ookla_speedtest-cli.list
  else
    echo ""
    echo "⚠️ File repositori Speedtest-cli tidak ditemukan, melanjutkan tanpa modifikasi."
  fi
  apt-get update -y
  apt-get install speedtest -y
else
  echo ""
  echo "⚠️ Sistem tidak dikenali atau versi Ubuntu lainnya. Melanjutkan dengan pengaturan default."
fi

echo ""
echo "⏰ Mengatur zona waktu ke Asia/Jakarta..."
ln -sf /usr/share/zoneinfo/Asia/Jakarta /etc/localtime
echo "Asia/Jakarta" > /etc/timezone
export TZ=Asia/Jakarta

echo ""
echo "🐍 Membuat virtual environment Python 3.12 di folder 'venv'..."
if [ ! -d "venv" ]; then
  python3.12 -m venv venv
  echo "✅ Virtual environment berhasil dibuat"
else
  echo "⚠️ Virtual environment 'venv' sudah ada, melewati pembuatan."
fi

echo ""
echo "📦 Menginstall paket Python via pip..."
if [ -f "venv/bin/pip" ]; then
  venv/bin/pip install --upgrade pip setuptools wheel

  venv/bin/pip install --upgrade \
    yt-dlp \
    google-generativeai \
    python-dotenv \
    ffmpeg-python \
    "g4f[all]" \
    rembg \
    Pillow \
    sticker-convert

  echo ""
  echo "📦 Menginstall yt-dlp versi terbaru dari GitHub..."
  venv/bin/pip install -U "yt-dlp @ git+https://github.com/yt-dlp/yt-dlp.git"
else
  echo "❌ Pip tidak ditemukan di virtual environment, melewati install package Python"
fi

echo ""
echo "🎭 Menginstall setup NPM dan PM2..."
npm install -g npm
npm install -g pm2

echo ""
echo "🎭 Menginstall package.json..."
if [ -f "package.json" ]; then
  npm install
else
  echo "⚠️ package.json tidak ditemukan, melewati npm install"
fi

echo ""
echo "🎭 Menginstall dan setup Playwright..."
npx playwright install-deps
npx playwright install

echo ""
echo "🧹 Membersihkan cache apt..."
apt-get autoremove -y
apt-get clean

echo ""
echo "✅ Setup selesai!"
echo "💡 Copy file 'env.example' menjadi 'env' dan edit env nya"
echo "💡 Jalankan 'source venv/bin/activate' untuk mulai menggunakan virtual environment Python."
