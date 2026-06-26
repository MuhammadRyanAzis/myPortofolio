import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Download, Calendar, Smile, Trophy, ArrowUpRight, Phone, Code2 } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaJava } from 'react-icons/fa'
import {
  SiNextdotjs, SiNestjs, SiPython, SiFigma, SiNotion, SiMysql, SiPostgresql,
  SiVuedotjs, SiNodedotjs, SiSupabase, SiFirebase, SiGo, SiGit, SiGithub,
  SiTailwindcss, SiBootstrap, SiFlutter
} from 'react-icons/si'
import { db } from '../firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import '../App.css'
import cert1 from '../new1/cert1.png'
import cert2 from '../new1/cert2.png'
import cert3 from '../new1/cert3.png'
import cert4 from '../new1/cert4.png'
import cert5 from '../new1/cert5.png'
import cert6 from '../new1/cert6.png'
import cert7 from '../new1/cert7.png'
import cert8 from '../new1/cert8.png'
import cert9 from '../new1/cert9.png'
import cert10 from '../new1/cert10.png'
import cert11 from '../new1/cert11.png'
import cert12 from '../new1/cert12.png'
import cateringKitaImg from '../assets/catering-kita.png'
import loopTaniImg from '../assets/loop-tani.png'
import devPulseImg from '../assets/devpulse.png'
import edotelImg from '../assets/edotel.png'
import juwaraKopiImg from '../assets/juwara-kopi.png'
import medPlatformImg from '../assets/medplatform.png'

const defaultProjects = [
  {
    title: "CateringKita",
    desc: "Platform e-catering modern berbasis web yang mengintegrasikan penyedia jasa katering dan pelanggan. (Role: Fullstack Developer)",
    details: "CateringKita lahir sebagai solusi atas hambatan efisiensi yang sering dihadapi dalam bisnis katering konvensional, di mana proses pemesanan manual—baik untuk kebutuhan acara besar maupun katering harian—sering kali terkendala oleh kurangnya transparansi harga, salah pencatatan menu, dan manajemen pengiriman yang tidak teratur. Guna mengatasi masalah tersebut, platform ini hadir sebagai jembatan digital yang mengintegrasikan seluruh operasional pemesanan dengan menyediakan katalog menu yang transparan bagi pelanggan, sistem langganan harian yang terjadwal otomatis, serta modul manajemen operasional terpadu bagi vendor untuk memantau produksi dapur hingga pengiriman.",
    tech: "Next.js 16, NestJS, TypeScript, Prisma ORM, MySQL, Tailwind CSS v4, ShadCN UI, JWT",
    icon: "Globe",
    link: "https://catering-kita.vercel.app/",
    image: cateringKitaImg
  },
  {
    title: "Loop-Tani",
    desc: "Sebuah platform ekosistem sirkular yang menghubungkan petani dan pelaku industri untuk menyulap limbah pertanian menjadi komoditas bernilai tinggi, menutup rantai pasok secara berkelanjutan. (Role: Fullstack Developer)",
    details: "Setiap kali musim panen tiba, ada realitas yang sering luput dari perhatian: berton-ton sisa hasil pertanian—seperti jerami padi, sekam, hingga kulit kopi—berakhir menjadi tumpukan limbah yang dibakar atau dibiarkan membusuk. Di sisi lain, industri manufaktur, peternakan, hingga produsen pupuk terus-menerus mencari bahan baku organik yang berkualitas dan terjangkau. Ada \"rantai yang terputus\" antara potensi di lahan pertanian dan kebutuhan di pabrik pengolahan.\n\nLoop-Tani lahir dari keresahan tersebut. Kami tidak sekadar membangun aplikasi jual-beli; kami merancang sebuah pergerakan ekonomi sirkular (lingkaran tertutup) yang bertujuan mengubah \"sampah\" menjadi \"emas\". Aplikasi ini bertindak sebagai jembatan langsung yang menghapus sekat antara petani di pedesaan dan para pelaku industri, menciptakan ekosistem di mana tidak ada yang terbuang sia-sia.\n\nMelalui antarmuka yang sangat ramah pengguna—bahkan bagi petani yang baru mengenal teknologi—Loop-Tani menghadirkan solusi dari hulu ke hilir. Rincian ekosistem fitur yang kami hadirkan:\n\n🔥 FITUR UNGGULAN & PENGALAMAN PENGGUNA:\n- Pasar Sirkular Langsung (Direct Circular Marketplace): Kami mendisrupsi sistem tengkulak tradisional. Petani kini memiliki etalase digital sendiri untuk memamerkan hasil sampingan panen mereka. Dengan kebebasan menentukan harga secara transparan, petani dapat bertransaksi langsung dengan pabrik pengolahan kertas, pabrik pakan ternak, atau produsen kompos.\n- Katalog Terkurasi & Filter Spesifik: Waktu adalah uang bagi pelaku industri. Oleh karena itu, sistem pencarian kami dikelompokkan secara cerdas. Jika sebuah pabrik membutuhkan \"Limbah Padi\" dengan tingkat kekeringan tertentu, atau \"Kulit Kopi\" untuk bio-massa, mereka hanya perlu menggunakan filter cerdas kami untuk menemukan kecocokan yang sempurna dalam hitungan detik.\n- Ruang Negosiasi Terintegrasi (Real-time Chat): Membangun kepercayaan adalah kunci dalam bisnis Business-to-Business (B2B) mikro. Kami menyediakan fitur ruang obrolan bawaan di mana pembeli dapat menanyakan detail kondisi barang, meminta foto tambahan, atau melakukan negosiasi harga secara langsung dengan petani layaknya mengobrol di pasar tradisional, namun dalam bentuk digital.\n- Pemetaan & Logistik Cerdas (Interactive Mapping): Biaya transportasi seringkali mematikan margin keuntungan produk limbah. Dengan fitur pemetaan lokasi interaktif, pelaku industri dapat memindai dan menemukan petani terdekat dari pabrik mereka. Ini tidak hanya menekan biaya logistik secara drastis, tetapi juga mengurangi jejak karbon (carbon footprint) dari proses distribusi.\n- Inspeksi Visual Mandiri: Petani dapat mengambil gambar limbah mereka langsung dari lahan menggunakan fitur kamera aplikasi. Hasil foto ini menjadi bukti autentik mengenai kualitas bahan baku, memberikan ketenangan pikiran bagi industri yang akan melakukan pembelian dalam skala tonase.\n- Keamanan Ekosistem & Sistem Reputasi: Setiap pengguna, baik petani maupun perwakilan industri, melewati proses pendaftaran dan verifikasi yang terstruktur. Ditambah dengan sistem riwayat transaksi yang rapi, Loop-Tani membangun rekam jejak digital yang meningkatkan rasa aman dan saling percaya di antara semua pihak.\n\nDampak Nyata (The Real Impact):\nPada akhirnya, Loop-Tani adalah tentang memanusiakan teknologi. Di satu sisi, kami memberikan pundi-pundi pendapatan tambahan bagi para petani dari hal yang sebelumnya mereka anggap sampah. Di sisi lain, kami mempermudah industri mendapatkan bahan baku ramah lingkungan, sembari menyembuhkan bumi dengan mengurangi pembakaran limbah pertanian. Ini adalah inovasi yang menyejahterakan manusia sekaligus merawat alam.",
    tech: "Flutter, Dart, Provider, Google Maps API, Geolocator, Camera API, Shared Preferences",
    icon: "Globe",
    link: "https://superb-figolla-cef35b.netlify.app/",
    image: loopTaniImg
  },
  {
    title: "DevPulse",
    desc: "Sebuah sistem pemantauan layanan digital presisi tinggi yang memberikan visibilitas penuh atas stabilitas dan performa situs Anda secara seketika (real-time). (Role: Full-Stack Developer)",
    details: "DevPulse lahir dari sebuah kebutuhan esensial di era digital yang bergerak cepat: memastikan bahwa setiap layanan selalu dalam keadaan prima dan dapat diakses oleh pelanggan kapan saja tanpa putus. Aplikasi ini dirancang untuk bertindak sebagai pusat komando yang cerdas dan beroperasi terus-menerus tanpa henti untuk memastikan stabilitas koneksi jaringan Anda.\n\nFokus utama dari platform ini adalah fleksibilitas dan kenyamanan visual. DevPulse menghadirkan antarmuka dasbor interaktif yang dibalut dengan tema gelap elegan (PulseOS Dark Mode) yang secara spesifik dirancang untuk mengurangi kelelahan mata bagi profesional yang memantau layar dalam waktu lama. Melalui sistem manajemen yang sepenuhnya dinamis, pengguna diberikan kendali absolut untuk menambah, memodifikasi, atau mencabut alamat situs yang ingin diawasi langsung dari layar utama dalam hitungan detik.\n\nLebih dari sekadar alat pemeriksa status koneksi, DevPulse memvisualisasikan \"detak jantung\" setiap layanan dalam bentuk grafik area yang mengalir mulus secara langsung. Sistem ini mampu menangkap fluktuasi waktu respons sekecil apa pun, menganalisis tren performa, dan secara proaktif memberikan indikator visual apakah sebuah layanan sedang stabil, mengalami degradasi (melambat), atau terputus total. Dilengkapi dengan panel analitik komprehensif serta popup diagnostik cerdas untuk menelusuri penyebab kegagalan jaringan, DevPulse memberikan ketenangan pikiran yang tak ternilai bagi para pemilik produk digital yang menuntut kesempurnaan operasional.",
    tech: "React, TypeScript, Vite, Tailwind CSS, Recharts, Golang, WebSockets",
    icon: "Globe",
    link: "https://github.com/MuhammadRyanAzis/devpulse",
    image: devPulseImg
  },
  {
    title: "Edotel Website",
    desc: "Sistem reservasi hotel digital berbasis sekolah menengah kejuruan yang mengintegrasikan layanan akomodasi profesional dengan pembelajaran praktikum siswa. (Role: Frontend Developer)",
    details: "Edotel Website adalah platform manajemen akomodasi komprehensif yang dirancang untuk menjembatani operasional hotel edukasi (Edotel) agar siap bersaing di pasar komersial. Platform ini memecahkan masalah fragmentasi pemesanan kamar konvensional dengan menghadirkan sistem pemesanan terpadu untuk tamu luar, sekaligus menyediakan alat kontrol tata kelola operasional bagi manajemen hotel.\n\nTantangan kritis yang diselesaikan pada proyek ini adalah pencegahan reservasi ganda (overbooking) dan optimalisasi beban rendering aset visual resolusi tinggi. Dari sisi performa frontend, platform ini mengimplementasikan pemisahan pengambilan data secara asinkron untuk memastikan kalkulasi irisan tanggal masuk dan keluar kamar berjalan instan di sisi server sebelum reservasi disetujui.\n\nFitur utama platform mencakup:\n1. Mesin Pencarian & Filter Multi-Kriteria: Memungkinkan calon tamu mencari penginapan berdasarkan lokasi edotel terdekat, ketersediaan tanggal, kapasitas tamu, rentang harga, hingga fasilitas spesifik yang diinginkan.\n2. Modul Virtual Tour 360° Interaktif: Integrasi visual premium yang menyajikan pratinjau kamar secara melingkar penuh (tampilan VR). Fitur ini dioptimalkan dengan pemuatan malas (lazy loading) dan fallback visual guna menjamin waktu pemuatan halaman tetap cepat meski memuat aset grafis yang berat.\n3. Alur Pembayaran Fleksibel: Gateway pembayaran instan (Snap Popup) yang terintegrasi langsung di browser tamu untuk metode pembayaran modern, berdampingan dengan alur unggah bukti pembayaran manual untuk metode transfer konvensional yang divalidasi oleh resepsionis.\n4. Dasbor Pengawasan Operasional: Antarmuka administrasi internal bagi resepsionis dan manajemen untuk mengubah status fisik kamar (Tersedia, Terisi, Dibersihkan) secara real-time, serta grafik perkembangan pendapatan per hotel secara berkala.",
    tech: "Next.js, React, Tailwind CSS v4, NextAuth.js, Prisma ORM, Midtrans Snap API, Cloudflare Turnstile, AWS S3 / Neva Objects Storage, Nodemailer",
    icon: "Code2",
    link: "https://myedotel.id/",
    image: edotelImg
  },
  {
    title: "Juwara Kopi Premium E-Commerce Landing Page",
    desc: "Sebuah platform landing page premium bergaya modern untuk produk kopi kesehatan, dirancang khusus dengan mengutamakan konversi pelanggan dan estetika antarmuka yang memukau. (Role: Front-End Developer / UI Engineer)",
    details: "Proyek ini merupakan sebuah mahakarya digital yang dibangun dari nol dengan satu tujuan utama: mengedukasi sekaligus menarik minat pelanggan terhadap lini produk kopi kesehatan premium. Berangkat dari kebutuhan akan presensi daring (online presence) yang berkelas, website ini tidak sekadar berfungsi sebagai katalog digital, melainkan sebuah perjalanan visual (user journey) yang dirancang dengan penuh perhitungan psikologi desain.\n\nPada pandangan pertama, pengunjung akan disambut oleh Hero Section yang megah dan memanjakan mata. Bagian ini memadukan tipografi elegan dengan teknik pewarnaan gradasi modern yang memancarkan kesan eksklusif. Elemen visual yang disajikan dipadukan dengan animasi transisi yang sangat halus dan mengalir, menciptakan kesan dinamis yang membuat pengunjung merasa terhubung secara emosional dengan produk yang ditawarkan sejak detik pertama.\n\nStruktur informasi dalam platform ini disusun menggunakan pendekatan storytelling yang memikat. Pengunjung tidak langsung dibombardir dengan tombol penjualan, melainkan secara perlahan dibimbing melalui narasi edukatif tentang perbandingan kafein, kemudian diperkenalkan pada keunggulan formulasi bahan baku dari empat negara yang menjadi nilai jual utama produk. Setiap kartu informasi (feature card) dirancang dengan ruang kosong (white space) yang proporsional, memastikan mata pengunjung tidak lelah saat membaca detail bahan baku premium seperti Arabika dari Brazil, Ganoderma dari Taiwan, dan Krimer VCO dari Belanda.\n\nLebih dari sekadar keindahan visual, proyek ini sangat mengedepankan fungsionalitas dan kenyamanan pengguna (User Experience / UX). Susunan tata letak telah dioptimalkan secara tingkat tinggi agar sepenuhnya responsif dan adaptif di segala dimensi layar. Baik ketika diakses melalui layar monitor desktop yang lebar, tablet, hingga layar smartphone yang sempit sekalipun, semua elemen (dari ukuran teks hingga posisi gambar) akan menyesuaikan diri secara otomatis. Semuanya mengalir dengan sempurna tanpa ada tata letak yang berantakan, memastikan setiap pengunjung mendapatkan pengalaman premium yang setara.\n\nSebagai puncak dari perjalanan visual tersebut, platform ini dilengkapi dengan strategi Call-to-Action (CTA) yang terintegrasi secara cerdas. Mengingat pendekatan interaksi yang personal sangat krusial dalam bisnis produk kesehatan, sistem CTA didesain secara mencolok dan dihubungkan secara langsung ke layanan konsultasi WhatsApp. Hal ini tidak hanya memberikan kesan pelayanan yang hangat dan manusiawi, tetapi juga secara signifikan dirancang untuk meningkatkan rasio konversi (conversion rate) dengan memfasilitasi komunikasi instan antara calon pembeli dan tim representatif.",
    tech: "React, TypeScript, Vite, CSS",
    icon: "Globe",
    link: "https://coffe-ecommerce-tau.vercel.app/",
    image: juwaraKopiImg
  },
  {
    title: "MedPlatform",
    desc: "Ekosistem layanan kesehatan digital terpadu yang menghadirkan pengalaman konsultasi dokter dan pembelian obat langsung dari genggaman Anda. (Role: Full-Stack Developer)",
    details: "MedPlatform lahir dari sebuah visi sederhana namun berdampak besar: bagaimana kita bisa mendekatkan layanan kesehatan yang berkualitas ke setiap rumah, tanpa batasan jarak dan waktu. Platform ini dirancang secara khusus untuk menjadi jembatan yang hangat dan dapat diandalkan antara tenaga medis profesional dan masyarakat luas. Saat pengguna masuk ke dalam MedPlatform, mereka akan disambut oleh antarmuka yang bersih dan ramah, dirancang sedemikian rupa agar siapa pun—terlepas dari seberapa mahir mereka menggunakan teknologi—dapat merasa nyaman dan aman.\n\nFitur unggulan dari platform ini adalah ruang telekonsultasi interaktif yang dirancang untuk menjaga privasi sekaligus memberikan kenyamanan berdiskusi layaknya bertatap muka langsung dengan dokter. Tidak berhenti di situ, MedPlatform juga dilengkapi dengan fitur Apotek digital terintegrasi yang menghadirkan katalog obat-obatan yang transparan dan mudah diakses. Pasien dapat dengan tenang mencari, membaca deskripsi, hingga melakukan pemesanan kebutuhan medis harian mereka tanpa harus mengantre.\n\nSetiap alur di dalam MedPlatform, mulai dari pendaftaran pasien, pemilihan dokter, hingga ruang obrolan tertutup, dibalut dengan tingkat keamanan tinggi untuk menjamin kerahasiaan data medis. Secara keseluruhan, MedPlatform bukan sekadar aplikasi pendataan medis; ini adalah wujud nyata dari dedikasi untuk menciptakan sebuah ruang kesehatan digital yang inklusif, efisien, dan benar-benar peduli pada kualitas hidup penggunanya.",
    tech: "Next.js, NestJS, Prisma ORM, PostgreSQL, Supabase, Tailwind CSS, Vercel",
    icon: "Globe",
    link: "https://github.com/MuhammadRyanAzis/medPlatfrom",
    image: medPlatformImg
  }
]

const certificates = [
  {
    id: 1,
    title: 'Sertifikat Peserta (No: 2257343 /S/PON/OGPN/IX/2025)',
    issuer: 'PON Indonesia (Olimpiade Guru dan Pelajar Nasional)',
    date: '2025',
    image: cert1,
    desc: 'Sertifikat ini diberikan kepada Muhammad Ryan Azis dari SMKS Telkom Sandhy Putra (Prov. Jawa Timur) atas partisipasinya sebagai Peserta Aktif dalam ajang kompetisi tingkat nasional bertajuk Olimpiade Guru dan Pelajar Nasional (OGPN) tahun 2025 di bidang Informatika. Kompetisi ini diselenggarakan di Banjarnegara pada tanggal 14 September 2025.',
  },
  {
    id: 2,
    title: 'Piagam Penghargaan (No: 2257343 /P/PON/OGPN/IX/2025)',
    issuer: 'PON Indonesia',
    date: '2025',
    image: cert2,
    desc: 'Piagam penghargaan tingkat nasional yang diberikan kepada Muhammad Ryan Azis sebagai apresiasi atas pencapaian luar biasanya dalam ajang OGPN 2025 di bidang Informatika. Dalam kompetisi ini, Anda berhasil meraih predikat A+ dan dinobatkan sebagai Peraih Medali Emas.',
  },
  {
    id: 3,
    title: 'Certificate of Achievement (Technowars 11 XEJT Expo)',
    issuer: 'HMPS Teknik Informatika UNIKAMA',
    date: '2025',
    image: cert3,
    desc: 'Sertifikat penghargaan berskala nasional yang diberikan kepada M Ryan Azis atas partisipasi dan kontribusinya dalam kompetisi robotik kategori "ILF Analog" pada acara Technowars 11 yang menjadi bagian dari rangkaian XEJT Expo.',
  },
  {
    id: 4,
    title: 'Sertifikat Peserta Lomba Robotik OLIMAWISA',
    issuer: 'SMK Telkom Malang',
    date: '2023',
    image: cert4,
    desc: 'Sertifikat tingkat nasional yang diberikan kepada Muhammad Ryan Azis sebagai Peserta dalam Lomba Robotik OLIMAWISA (Olimpiade Wikusama) tingkat SMP/MTs. Acara ini diselenggarakan pada 20 dan 22 September 2023 dalam rangka memperingati Dies Natalis ke-31 SMK Telkom Malang.',
  },
  {
    id: 5,
    title: 'Certificate Participant of Workshop Intro to Cyber Security',
    issuer: 'Coding Studio',
    date: '2024',
    image: cert5,
    desc: 'Sertifikat kepesertaan yang diberikan kepada Muhammad Ryan Azis yang ditandatangani langsung oleh CEO dan COO Coding Studio pada tanggal 26 Maret 2024, sebagai bukti bahwa Anda telah menyelesaikan workshop interaktif yang membahas pengenalan dasar-dasar keamanan siber (Cyber Security).',
  },
  {
    id: 6,
    title: 'Certificate of Participation (BPC Semifinal Stage of MANIFEST 2025)',
    issuer: 'Departemen Manajemen Bisnis ITS',
    date: '2025',
    image: cert6,
    desc: 'Sertifikat internasional/nasional bergengsi yang diberikan kepada Muhammad Ryan Azis atas kontribusi bernilai tingginya sebagai peserta yang berhasil menembus hingga Tahap Semifinal pada Business Plan Competition (BPC) di ajang MANIFEST 2025 ITS.',
  },
  {
    id: 7,
    title: 'SERTIFIKAT PENGHARGAAN',
    issuer: 'Organisasi kepemudaan Generasi Inspiratif Muda Indonesia',
    date: '2025',
    image: cert7,
    desc: 'Sertifikat penghargaan ini diberikan secara resmi kepada Muhammad Ryan Aziz atas kontribusi dan dedikasinya sebagai Brand Ambassador di organisasi kepemudaan Generasi Inspiratif Muda. Masa jabatan atau periode aktif penugasan tersebut berlangsung selama 4 bulan, terhitung sejak Januari hingga April 2025. Sertifikat ini dilengkapi dengan logo resmi organisasi serta tanda tangan dari pihak pendiri (founder dan co-founder) sebagai bentuk validasi legalitas penghargaan.',
  },
  {
    id: 8,
    title: 'SERTIFIKAT PENGHARGAAN',
    issuer: 'Pelajar Penggerak Merah Putih (PPMP) (Kemendikbudristek & Kemenkes)',
    date: '2025',
    image: cert8,
    desc: 'Sertifikat penghargaan resmi dengan nomor dokumen PPMP-AB2/2025-I/4020 ini diberikan kepada Muhammad Ryan Aziz. Penghargaan ini diberikan atas partisipasi aktifnya dalam mengikuti rangkaian kegiatan "Pembekalan dan Rencana Tindak Lanjut Pelajar Penggerak Merah Putih (PPMP)". Status atau peran penerima di dalam sertifikat ini dicantumkan secara spesifik sebagai ANGGOTA Angkatan 2. Dokumen ini secara resmi dikeluarkan di Jakarta pada tanggal 31 Januari 2025 dan telah dilengkapi dengan kode QR (QR Code) di bagian bawah sebagai fitur penjamin keaslian atau verifikasi digital dari pihak penyelenggara.',
  },
  {
    id: 9,
    title: 'Sertifikat Apresiasi',
    issuer: 'SkilHub community by Skilvul.com bersama UNIICODE',
    date: '2023',
    image: cert9,
    desc: 'Sertifikat ini diberikan kepada Muhammad Ryan Azis atas keikutsertaannya sebagai peserta dalam kegiatan webinar "Introduction to Back-End Web Development". Kegiatan ini diselenggarakan pada hari Jumat, 8 Desember 2023. Dokumen ini ditandatangani oleh Galih Adhi Kusuma (Founder UNIICODE) dan David Winalda (Head of Learning).',
  },
  {
    id: 10,
    title: 'Sertifikat Apresiasi',
    issuer: 'SkilHub community by Skilvul bersama HMDKV IT Telkom Purwokerto',
    date: '2023',
    image: cert10,
    desc: 'Sertifikat ini diberikan kepada Muhammad Ryan Azis atas keikutsertaannya sebagai peserta dalam kegiatan webinar "3D Animation in Various Industry". Kegiatan ini dilaksanakan pada hari Jumat, 17 November 2023. Dokumen ini ditandatangani oleh Biostaria Islami (Ketua HMDKV IT Telkom Purwokerto) dan David Winalda (Head of Learning Skilvul).',
  },
  {
    id: 11,
    title: 'Sertifikat Partisipasi',
    issuer: 'Skilvul (Webinar Skilvul AI Club)',
    date: '2024',
    image: cert11,
    desc: 'Sertifikat ini diberikan kepada Muhammad Ryan Azis atas partisipasinya dalam acara "Webinar Skilvul AI Club" dengan topik spesifik "Exploring the Power of Conversational AI: Building Intelligent Chatbots". Kegiatan ini diselenggarakan oleh Skilvul pada hari Jumat, 28 Juni 2024. Dokumen resmi ini disahkan dan ditandatangani oleh Nahum Arimarologo (Head of Marketing Skilvul).',
  },
  {
    id: 12,
    title: 'Sertifikat Partisipasi',
    issuer: 'Skilvul (Webinar Akbar Skilvul AI Club & Cakap)',
    date: '2023',
    image: cert12,
    desc: 'Sertifikat ini diberikan kepada Muhammad Ryan Azis atas partisipasinya dalam acara "Webinar Akbar Skilvul AI Club" dengan topik "Deep Dive into AI & The Future of Work". Acara ini diselenggarakan oleh Skilvul pada hari Sabtu, 9 Desember 2023. Dokumen ini ditandatangani oleh Nahum Arimarologo (Head of Marketing Skilvul).',
  }
]

function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  
  const logs = [
    "> Initializing core modules...",
    "> Establishing secure database connection...",
    "> Fetching Ryan's project data...",
    "> Resolving layout styles and components...",
    "> Welcome to Ryan Azis' Workspace."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 800) // Delay the panel reveal
          return 100
        }
        return prev + Math.floor(Math.random() * 12) + 4 // quick randomized load
      })
    }, 120)
    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    const currentStep = Math.min(Math.floor(progress / 20), logs.length - 1)
    if (currentStep > logIndex) {
      setLogIndex(currentStep)
    }
  }, [progress, logIndex, logs.length])

  // 5 vertical panels for curtain reveal
  const panelVariants = {
    initial: { y: 0 },
    exit: (i) => ({
      y: "-100%",
      transition: {
        duration: 1.0,
        ease: [0.76, 0, 0.24, 1], // premium custom cubic-bezier ease
        delay: i * 0.08
      }
    })
  }

  const loaderBoxVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.4, ease: "easeInOut" } 
    }
  }

  return (
    <div className="loader-container">
      {/* 5 vertical panels that slide up to reveal main page */}
      <div className="reveal-panels">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={panelVariants}
            initial="initial"
            exit="exit"
            className="reveal-panel"
          />
        ))}
      </div>

      <motion.div 
        className="loader-box glass-panel"
        variants={loaderBoxVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="loader-header">
          <div className="loader-dot red"></div>
          <div className="loader-dot yellow"></div>
          <div className="loader-dot green"></div>
          <span className="loader-title">terminal.sh - ryan-azis</span>
        </div>
        
        <div className="loader-body">
          <div className="loader-logs">
            {logs.slice(0, logIndex + 1).map((log, index) => (
              <div key={index} className="loader-log-line">
                {log}
              </div>
            ))}
          </div>
          
          <div className="loader-progress-section">
            <div className="loader-progress-info">
              <span>LOADING WORKSPACE</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            <div className="loader-bar-bg">
              <motion.div 
                className="loader-bar-fill"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [projects, setProjects] = useState([])
  const [aboutText, setAboutText] = useState("I'm a passionate web developer specializing in building exceptional digital experiences with modern technologies.")
  const [selectedCert, setSelectedCert] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          const fetchedProjects = []
          querySnapshot.forEach((doc) => {
            fetchedProjects.push({ id: doc.id, ...doc.data() })
          })
          setProjects(fetchedProjects.slice(0, 10))
        } else {
          setProjects(defaultProjects)
        }

        const configSnapshot = await getDocs(collection(db, 'config'))
        if (!configSnapshot.empty) {
          configSnapshot.forEach((doc) => {
            if (doc.id === 'about') {
              setAboutText(doc.data().text)
            }
          })
        }
      } catch (error) {
        console.error("Using local fallback data: ", error)
        setProjects(defaultProjects)
      }
    }
    fetchData()
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  return (
    <AnimatePresence mode="popLayout">
      {loading ? (
        <IntroLoader key="loader" onComplete={() => setLoading(false)} />
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="app-container"
        >
          <div className="bg-gradients"></div>

          {/* Navigation */}
          <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
              <div className="logo">
                <Code2 className="logo-icon" size={28} />
                <span>Ryan</span>
              </div>
              <ul className="nav-links">
                <li><a href="#home" className="active">Beranda</a></li>
                <li><a href="#about">Tentang</a></li>
                <li><a href="#skills">Sertifikasi</a></li>
                <li><a href="#projects">Proyek</a></li>
                <li><a href="#contact">Kontak</a></li>
              </ul>
              <a href="mailto:ryanazis24@gmail.com?body=halo,%20apakah%20saya%20bisa%20di%20bantu" className="btn btn-primary">Hubungi Saya <ArrowUpRight size={16} /></a>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="hero container" id="home">
            <motion.div 
              className="hero-content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="section-label" style={{background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1'}}>
                SAYA SEORANG PENGEMBANG WEB
              </motion.div>
              <motion.h1 variants={fadeIn}>
                Hai, saya <span className="text-accent" style={{ whiteSpace: 'nowrap' }}>Muhammad Ryan Azis</span>
              </motion.h1>
              <motion.h2 variants={fadeIn} className="hero-subtitle-container">
                <span className="hero-subtitle" style={{ fontSize: '1.5rem', lineHeight: '1.4', display: 'block' }}>Penggiat Teknologi | Pengembang Web | Penggiat Analisis Bisnis</span>
                <span className="running-light-bar"></span>
              </motion.h2>
              <motion.p variants={fadeIn} className="hero-desc" style={{ maxWidth: '600px', marginBottom: '24px' }}>
                Saya adalah seorang penggiat teknologi yang berfokus pada pengembangan produk digital, analisis bisnis, dan penciptaan solusi inovatif yang memberikan dampak nyata melalui teknologi
              </motion.p>
              <motion.div variants={fadeIn} className="hero-actions">
                <a href="#projects" className="btn btn-primary">Lihat Karya Saya <ArrowUpRight size={16} /></a>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <p style={{fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', fontWeight: 600}}>Teknologi yang saya gunakan</p>
                <div className="tech-icons">
                  <div className="tech-icon-item" title="Next.js"><SiNextdotjs size={24} color="#FFFFFF" /></div>
                  <div className="tech-icon-item" title="NestJS"><SiNestjs size={24} color="#E0234E" /></div>
                  <div className="tech-icon-item" title="Python"><SiPython size={24} color="#3776AB" /></div>
                  <div className="tech-icon-item" title="Figma"><SiFigma size={24} color="#F24E1E" /></div>
                  <div className="tech-icon-item" title="Notion"><SiNotion size={24} color="#FFFFFF" /></div>
                  <div className="tech-icon-item" title="Java"><FaJava size={24} color="#007396" /></div>
                  <div className="tech-icon-item" title="MySQL"><SiMysql size={24} color="#4479A1" /></div>
                  <div className="tech-icon-item" title="PostgreSQL"><SiPostgresql size={24} color="#4169E1" /></div>
                  <div className="tech-icon-item" title="Vue.js"><SiVuedotjs size={24} color="#4FC08D" /></div>
                  <div className="tech-icon-item" title="Node.js"><SiNodedotjs size={24} color="#339933" /></div>
                  <div className="tech-icon-item" title="Supabase"><SiSupabase size={24} color="#3ECF8E" /></div>
                  <div className="tech-icon-item" title="Firebase"><SiFirebase size={24} color="#FFCA28" /></div>
                  <div className="tech-icon-item" title="Go"><SiGo size={24} color="#00ADD8" /></div>
                  <div className="tech-icon-item" title="Git"><SiGit size={24} color="#F05032" /></div>
                  <div className="tech-icon-item" title="GitHub"><SiGithub size={24} color="#FFFFFF" /></div>
                  <div className="tech-icon-item" title="Tailwind CSS"><SiTailwindcss size={24} color="#06B6D4" /></div>
                  <div className="tech-icon-item" title="Bootstrap"><SiBootstrap size={24} color="#7952B3" /></div>
                  <div className="tech-icon-item" title="Flutter"><SiFlutter size={24} color="#02569B" /></div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-image-container">
                <svg className="animated-star-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <path d="M50 5 L61.8 38.2 L97 38.2 L68.5 59.8 L79.3 93 L50 72.5 L20.7 93 L31.5 59.8 L3 38.2 L38.2 38.2 Z" stroke="url(#star-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <img src="/src/assets/profile.png" alt="Muhammad Ryan Azis" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=500"; e.target.style.borderRadius = "24px"; }} />
              </div>
            </motion.div>
          </section>

          {/* About Section */}
          <section className="section container about-section" id="about">
            <motion.div 
              className="about-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="section-label">TENTANG SAYA</div>
              <p style={{ marginBottom: '16px' }}>
                Halo, saya Muhammad Ryan Azis, seorang individu yang memiliki minat dan antusiasme tinggi di bidang teknologi, pengembangan produk digital, dan analisis bisnis. Saya percaya bahwa teknologi bukan hanya tentang membangun sistem, tetapi juga tentang menciptakan solusi yang mampu memberikan dampak nyata dan menyelesaikan berbagai permasalahan di kehidupan sehari-hari.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Saya memiliki ketertarikan dalam berbagai bidang, mulai dari Web Development, Business Analysis, Quality Assurance, hingga SEO Specialist. Saya senang mengeksplorasi ide-ide baru, mempelajari perkembangan teknologi, dan mengembangkan solusi yang menggabungkan inovasi, kreativitas, dan pemecahan masalah.
              </p>
              <p style={{ marginBottom: '32px' }}>
                Bagi saya, setiap proyek merupakan peluang untuk terus bertumbuh, menciptakan sesuatu yang bermakna, dan memberikan kontribusi melalui teknologi.
              </p>
            </motion.div>
            
            <motion.div 
              className="stats-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="stat-card">
                <div className="stat-icon"><Calendar size={24} /></div>
                <div className="stat-info">
                  <h3>7+</h3>
                  <p>Proyek yang Telah Diselesaikan</p>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="stat-card">
                <div className="stat-icon"><Code2 size={24} /></div>
                <div className="stat-info">
                  <h3>15+</h3>
                  <p>Tech Stack yang saya kuasai</p>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="stat-card">
                <div className="stat-icon"><Smile size={24} /></div>
                <div className="stat-info">
                  <h3>100%</h3>
                  <p>Komitmen terhadap Pembelajaran Berkelanjutan</p>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="stat-card">
                <div className="stat-icon"><Trophy size={24} /></div>
                <div className="stat-info">
                  <h3>10+</h3>
                  <p>Kursus & Kompetisi yang Telah Diselesaikan</p>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Certificates Section */}
          <section className="section container certificates-section" id="skills">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="section-label">SERTIFIKASI</div>
              <h2>Pencapaian & Sertifikasi Saya</h2>
            </motion.div>
            
            <motion.div 
              className="certificates-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {certificates.map((cert) => (
                <motion.div 
                  key={cert.id} 
                  variants={fadeIn} 
                  className="cert-card"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="cert-image-thumb">
                    <img src={cert.image} alt={cert.title} />
                  </div>
                  <div className="cert-info">
                    <h4>{cert.title}</h4>
                    <span>{cert.issuer} • {cert.date}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Projects Section */}
          <section className="section container projects-section" id="projects">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="section-label">PROYEK UNGGULAN</div>
              <h2>Beberapa Karya Terbaru Saya</h2>
            </motion.div>

            <motion.div 
              className="projects-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {projects.map((project, idx) => (
                <motion.div 
                  key={project.id || idx} 
                  variants={fadeIn} 
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-image-wrapper">
                    <div className="project-number">0{idx + 1}</div>
                    {project.image ? (
                      <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{width: '100%', height: '100%', background: `linear-gradient(135deg, rgba(99,102,241,0.2), rgba(17,24,39,0.8))`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <Code2 size={48} opacity={0.2} />
                      </div>
                    )}
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.desc}</p>
                    <a 
                      href={project.link || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Project <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Footer / CTA Section */}
          <footer className="container footer-cta" id="contact">
            <div className="cta-left">
              <div className="section-label" style={{background: 'transparent', padding: 0, color: '#94a3b8'}}>MARI BEKERJA SAMA</div>
              <h2>Punya rencana proyek?</h2>
              <p>Saya selalu terbuka untuk mendiskusikan proyek baru dan peluang kerja sama. Mari kita ciptakan sesuatu yang luar biasa bersama!</p>
              <a href="mailto:ryanazis24@gmail.com?body=halo,%20apakah%20saya%20bisa%20di%20bantu" className="btn btn-primary">Hubungi Saya <ArrowUpRight size={16} /></a>
            </div>

            <div className="cta-right">
              <h3>FOLLOW ME</h3>
              <div className="social-links">
                <a href="https://github.com/MuhammadRyanAzis" target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub size={20} /></a>
                <a href="https://www.linkedin.com/in/ryan-azis-1707a1348/" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin size={20} /></a>
                <a href="mailto:ryanazis24@gmail.com" className="social-link" title="Email"><Mail size={20} /></a>
                <a href="https://www.instagram.com/ryanazis.__/" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram"><FaInstagram size={20} /></a>
              </div>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={16} /> ryanazis24@gmail.com
                </div>
              </div>
            </div>

            <div className="copyright">
              <span>© 2024 Ryan Developer. All rights reserved.</span>
              <span>Made with ❤️ by Ryan</span>
            </div>
          </footer>

          {/* Certificate Modal */}
          <AnimatePresence>
            {selectedCert && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
              >
                <motion.div 
                  className="modal-content"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="modal-close" onClick={() => setSelectedCert(null)}>×</button>
                  <div className="modal-image-container">
                    <img src={selectedCert.image} alt={selectedCert.title} />
                  </div>
                  <div className="modal-details">
                    <h3>{selectedCert.title}</h3>
                    <div className="modal-meta">
                      <span className="issuer">{selectedCert.issuer}</span>
                      <span className="date">{selectedCert.date}</span>
                    </div>
                    <p>{selectedCert.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              >
                <motion.div 
                  className="modal-content"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
                  <div className="modal-image-container">
                    {selectedProject.image ? (
                      <img src={selectedProject.image} alt={selectedProject.title} />
                    ) : (
                      <div style={{width: '100%', height: '100%', background: `linear-gradient(135deg, rgba(99,102,241,0.2), rgba(17,24,39,0.8))`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <Code2 size={72} opacity={0.2} />
                      </div>
                    )}
                  </div>
                  <div className="modal-details">
                    <h3>{selectedProject.title}</h3>
                    {selectedProject.tech && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        {selectedProject.tech.split(',').map((tech, i) => (
                          <span key={i} style={{ fontSize: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', padding: '4px 10px', borderRadius: '4px', fontWeight: '600' }}>
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <p style={{ marginBottom: '24px' }}>{selectedProject.details || selectedProject.desc}</p>
                    {selectedProject.link && selectedProject.link !== "#" && (
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                        Visit Live Project <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Portfolio
