# Website Resmi Desa Majelis Hidayah
**Kecamatan Kuala Jambi, Kabupaten Tanjung Jabung Timur, Provinsi Jambi (Kode Pos: 36760)**

Portal web resmi pemerintahan desa yang modern, responsif, cepat, dan ramah aksesibilitas (*WCAG 2.1 AA*) dengan palet warna resmi pemerintahan (*Deep Blue, Emerald Green, dan White*).

---

## 🏛️ Fitur Utama

1. **Hero Section Dinamis**:
   - Judul resmi *"Official Website of Desa Majelis Hidayah"*.
   - Sambutan resmi Kepala Desa Mulyadi dan latar visual landmark pesisir perairan Kuala Jambi.
   - Statistik kilat: 2.840+ jiwa penduduk, 4 Dusun (12 RT), 100% layanan gratis, wilayah ± 18,5 km².
   - Jam lokal *real-time* WIB (Waktu Indonesia Barat) & sapaan dinamis waktu.

2. **Profil Desa & Visi Misi**:
   - Tab interaktif: Sejarah Desa (akar kata Majelis & Hidayah), Geografis Pesisir (Kuala Jambi, batas wilayah, Selat Berhala), dan Visi Misi 2026-2031.
   - Peta batas wilayah dan informasi koordinat geospasial kantor desa.

3. **Struktur Organisasi (Perangkat Desa)**:
   - Grid kartu aparatur desa: Kepala Desa, Sekretaris Desa, Kaur Keuangan, Kaur Perencanaan, Kasi Pemerintahan, Kasi Pelayanan, dan Kepala Dusun (Dusun I s/d IV).
   - Filter instan berdasarkan divisi pemerintahan.
   - Modal popup interaktif untuk rincian Tugas Pokok dan Fungsi (TUPOKSI).

4. **Layanan Publik & Administrasi Mandiri**:
   - **Form Permohonan Surat Online**: Validasi NIK 16-digit, pemilihan jenis surat (Domisili, SKCK, SKU, SKTM, Kelahiran/Kematian), dan pembuatan nomor resi otomatis (contoh: `MH-2026-XXXX`).
   - **Modal Resi & Cetak Surat**: Tanda terima resmi yang dapat dicetak langsung (*print stylesheet*) atau disalin kodenya.
   - **Live Letter Tracking (Pelacak Surat)**: Memantau progres 4 tahapan berkas dengan contoh kode uji coba `MH-2026-0101` dan `MH-2026-0102`.
   - **Transparansi APBDes 2026**: Infografis alokasi anggaran pembangunan pesisir, pemberdayaan nelayan, dan jaring pengaman sosial.

5. **Berita & Pengumuman Desa**:
   - Filter kategori: Pengumuman, Pembangunan, Bantuan Sosial (BLT-DD), dan Agenda Warga.
   - Modal pembaca artikel lengkap dan fitur bagikan (*share*).

6. **Potensi Maritim & Pesisir**:
   - Perikanan tangkap laut Kuala Jambi (udang ebi, kepiting bakau, bawal).
   - Perkebunan kelapa dalam dan komoditas unggulan Pinang Betara Tanjabtim.
   - Konservasi sabuk hijau mangrove & titian pesisir.

7. **Aksesibilitas (WCAG 2.1 AA Compliant)**:
   - Pengatur ukuran huruf langsung di antarmuka (A, A+, A++).
   - Mode Kontras Tinggi (*High Contrast Mode*).
   - Indikator fokus keyboard yang jelas (*focus-visible rings*).

8. **Footer Resmi**:
   - Alamat lengkap: Jl. Siswa No. 01, RT 04 Dusun 2, Desa Majelis Hidayah, Kec. Kuala Jambi, Kab. Tanjung Jabung Timur, Jambi 36760.
   - Jam pelayanan kantor desa, kontak WhatsApp aduan, email resmi, dan tautan Pemkab Tanjabtim.

---

## 🚀 Cara Menjalankan Server Lokal Preview

Server lokal menggunakan modul native PowerShell tanpa memerlukan instalasi software pihak ketiga tambahan:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Akses tautan di peramban web:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 📁 Struktur Direktori

```
desa-majelis-hidayah/
├── index.html              # Halaman portal utama
├── assets/
│   ├── css/
│   │   └── styles.css      # Custom styling, WCAG contrast, print stylesheets
│   └── js/
│       └── app.js          # Logika interaktif, tracker, form modal, jam WIB
├── serve.ps1               # Skrip server lokal PowerShell HTTP
└── README.md               # Dokumentasi proyek
```
