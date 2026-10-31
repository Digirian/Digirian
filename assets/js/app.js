/**
 * Website Resmi Desa Majelis Hidayah - Main Interactive Application
 * Kecamatan Kuala Jambi, Kabupaten Tanjung Jabung Timur, Provinsi Jambi
 */

document.addEventListener('DOMContentLoaded', () => {
  initRealtimeClock();
  initAccessibility();
  initMobileMenu();
  initProfileTabs();
  initPerangkatFilter();
  initPublicServiceForms();
  initLetterTracker();
  initNewsFilter();
  initModals();
});

/* ==========================================================================
   1. Realtime Clock & WIB Time Display
   ========================================================================== */
function initRealtimeClock() {
  const clockElement = document.getElementById('live-clock');
  const greetingElement = document.getElementById('hero-greeting');

  function updateTime() {
    const now = new Date();
    // Options in Indonesian Locale
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const dateStr = now.toLocaleDateString('id-ID', options);
    
    // Time format HH:mm:ss WIB
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}:${seconds} WIB`;

    if (clockElement) {
      clockElement.textContent = `${dateStr} • ${timeStr}`;
    }

    if (greetingElement) {
      const currentHour = now.getHours();
      let greeting = 'Selamat Datang';
      if (currentHour >= 4 && currentHour < 11) {
        greeting = 'Selamat Pagi';
      } else if (currentHour >= 11 && currentHour < 15) {
        greeting = 'Selamat Siang';
      } else if (currentHour >= 15 && currentHour < 18) {
        greeting = 'Selamat Sore';
      } else {
        greeting = 'Selamat Malam';
      }
      greetingElement.textContent = `${greeting}, Warga & Pengunjung Desa Majelis Hidayah`;
    }

    // Update Live Office Status (Buka/Tutup)
    updateOfficeStatus(now);
  }

  updateTime();
  setInterval(updateTime, 1000);
}

function updateOfficeStatus(now = new Date()) {
  const badge = document.getElementById('office-status-badge');
  const dot = document.getElementById('office-status-dot');
  const text = document.getElementById('office-status-text');
  const tooltipStatus = document.getElementById('tooltip-current-status');

  if (!badge || !dot || !text) return;

  const day = now.getDay(); // 0 = Minggu, 1 = Senin, 2 = Selasa, 3 = Rabu, 4 = Kamis, 5 = Jumat, 6 = Sabtu
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const timeDecimal = hours + (minutes / 60);

  let isOpen = false;
  let statusBadgeText = '';
  let tooltipBadgeText = '';

  // Senin (1) s/d Kamis (4): 08.00 - 16.00 WIB
  if (day >= 1 && day <= 4) {
    if (timeDecimal >= 8.0 && timeDecimal < 16.0) {
      isOpen = true;
      statusBadgeText = 'BUKA • 08.00 - 16.00 WIB';
      tooltipBadgeText = 'BUKA SEKARANG';
    } else {
      isOpen = false;
      statusBadgeText = 'TUTUP';
      tooltipBadgeText = 'SEDANG TUTUP';
    }
  } 
  // Jumat (5): 08.00 - 11.30 WIB
  else if (day === 5) {
    if (timeDecimal >= 8.0 && timeDecimal < 11.5) {
      isOpen = true;
      statusBadgeText = 'BUKA • 08.00 - 11.30 WIB';
      tooltipBadgeText = 'BUKA SEKARANG';
    } else {
      isOpen = false;
      statusBadgeText = 'TUTUP';
      tooltipBadgeText = 'SEDANG TUTUP';
    }
  } 
  // Sabtu (6) & Minggu (0): TUTUP / Istirahat
  else {
    isOpen = false;
    statusBadgeText = 'TUTUP • Istirahat';
    tooltipBadgeText = 'LIBUR / ISTIRAHAT';
  }

  if (isOpen) {
    // Hijau Modern (Emerald)
    badge.className = 'inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all duration-300 shadow-sm border bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30 backdrop-blur-md';
    dot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]';
    text.textContent = statusBadgeText;
    if (tooltipStatus) {
      tooltipStatus.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
      tooltipStatus.textContent = tooltipBadgeText;
    }
  } else {
    // Merah Modern (Rose / Red)
    badge.className = 'inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all duration-300 shadow-sm border bg-rose-500/20 text-rose-300 border-rose-400/40 hover:bg-rose-500/30 backdrop-blur-md';
    dot.className = 'w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]';
    text.textContent = statusBadgeText;
    if (tooltipStatus) {
      tooltipStatus.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40';
      tooltipStatus.textContent = tooltipBadgeText;
    }
  }
}

/* ==========================================================================
   2. Accessibility Tools (Font Resizing & High Contrast)
   ========================================================================== */
function initAccessibility() {
  const body = document.body;
  const contrastToggleBtn = document.getElementById('toggle-contrast');
  const fontNormalBtn = document.getElementById('font-normal');
  const fontLgBtn = document.getElementById('font-lg');
  const fontXlBtn = document.getElementById('font-xl');

  // Load saved preferences
  if (localStorage.getItem('theme-contrast') === 'high') {
    body.classList.add('high-contrast');
  }
  const savedFontSize = localStorage.getItem('theme-fontsize');
  if (savedFontSize === 'font-lg') {
    body.classList.add('font-lg');
  } else if (savedFontSize === 'font-xl') {
    body.classList.add('font-xl');
  }

  if (contrastToggleBtn) {
    contrastToggleBtn.addEventListener('click', () => {
      body.classList.toggle('high-contrast');
      const isHigh = body.classList.contains('high-contrast');
      localStorage.setItem('theme-contrast', isHigh ? 'high' : 'normal');
      showToast(isHigh ? 'Mode Kontras Tinggi Diaktifkan' : 'Mode Normal Diaktifkan');
    });
  }

  function resetFontSize() {
    body.classList.remove('font-lg', 'font-xl');
  }

  if (fontNormalBtn) {
    fontNormalBtn.addEventListener('click', () => {
      resetFontSize();
      localStorage.setItem('theme-fontsize', 'normal');
      showToast('Ukuran Font: Standar');
    });
  }

  if (fontLgBtn) {
    fontLgBtn.addEventListener('click', () => {
      resetFontSize();
      body.classList.add('font-lg');
      localStorage.setItem('theme-fontsize', 'font-lg');
      showToast('Ukuran Font: Sedang (+12%)');
    });
  }

  if (fontXlBtn) {
    fontXlBtn.addEventListener('click', () => {
      resetFontSize();
      body.classList.add('font-xl');
      localStorage.setItem('theme-fontsize', 'font-xl');
      showToast('Ukuran Font: Besar (+25%)');
    });
  }
}

/* ==========================================================================
   3. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const menuContainer = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (toggleBtn && menuContainer) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = menuContainer.classList.contains('hidden');
      if (isHidden) {
        menuContainer.classList.remove('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        menuContainer.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuContainer.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   4. Profile & Vision Tabs
   ========================================================================== */
function initProfileTabs() {
  const tabs = document.querySelectorAll('.profile-tab-btn');
  const panes = document.querySelectorAll('.profile-tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;

      // Update button active state
      tabs.forEach(t => {
        t.classList.remove('bg-gov-blue', 'text-white', 'shadow-md');
        t.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      tab.classList.add('bg-gov-blue', 'text-white', 'shadow-md');
      tab.setAttribute('aria-selected', 'true');

      // Update panes
      panes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.remove('hidden');
          pane.classList.add('block');
        } else {
          pane.classList.add('hidden');
          pane.classList.remove('block');
        }
      });
    });
  });
}

/* ==========================================================================
   5. Government Structure (Perangkat Desa) Filtering & Modal
   ========================================================================== */
const PERANGKAT_DATA = [
  {
    id: 1,
    name: 'Mulyadi',
    title: 'Kepala Desa Majelis Hidayah',
    category: 'pimpinan',
    nip: 'SK Bupati Tanjab Timur No. 428/2022',
    period: '2023 - 2030',
    avatar: 'kades.jpg',
    description: 'Memimpin penyelenggaraan pemerintahan desa, membina ketentraman dan ketertiban masyarakat pesisir, serta menetapkan kebijakan pembangunan berbasis kearifan bahari dan perkebunan.',
    tugas: [
      'Menetapkan kebijakan pembangunan jangka menengah (RPJMDes) dan tahunan (RKPDes).',
      'Membina perekonomian nelayan dan petani kelapa/pinang pesisir.',
      'Mewakili desa di dalam dan di luar pengadilan sesuai ketentuan perundang-undangan.'
    ]
  },
  {
    id: 2,
    name: 'Siti Zaleha, S.IP',
    title: 'Sekretaris Desa',
    category: 'sekretariat',
    nip: 'SK Kades No. 04/MH/2022',
    period: '2022 - Sekarang',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    description: 'Mengkoordinasikan urusan ketatausahaan, administrasi kependudukan, tata kelola keuangan desa, dan penyusunan regulasi desa.',
    tugas: [
      'Mengkoordinasikan penyusunan rancangan peraturan desa dan dokumen APBDes.',
      'Mengelola administrasi persuratan, inventarisasi, dan kearsipan desa.',
      'Melaksanakan urusan pelayanan publik administrasi kependudukan secara cepat dan akuntabel.'
    ]
  },
  {
    id: 3,
    name: 'Ardiansyah',
    title: 'Kepala Urusan Keuangan (Kaur Keuangan)',
    category: 'sekretariat',
    nip: 'SK Kades No. 12/MH/2022',
    period: '2022 - Sekarang',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    description: 'Bertanggung jawab dalam penatausahaan keuangan desa, sistem akuntansi keuangan SISKEUDES, dan pelaporan realisasi pendapatan serta belanja desa.',
    tugas: [
      'Menyusun buku kas umum, buku kas pembantu pajak, dan buku bank desa.',
      'Menyiapkan Surat Permintaan Pembayaran (SPP) dan verifikasi bukti transaksi pengeluaran.',
      'Menyajikan transparansi pagu anggaran pendapatan dan realisasi belanja desa kepada warga.'
    ]
  },
  {
    id: 4,
    name: 'Ariyansyah, S.Kom',
    title: 'Kaur Umum & Perencanaan',
    category: 'sekretariat',
    nip: 'SK Kades No. 14/MH/2022',
    period: '2022 - Sekarang',
    avatar: 'rian.jpg',
    description: 'Mengawal urusan administrasi ketatausahaan umum, penyusunan dokumen perencanaan pembangunan desa, serta pengelolaan sistem informasi digital desa.',
    tugas: [
      'Mengkoordinasikan penyusunan dokumen perencanaan desa (RPJMDes, RKPDes, dan Musrenbangdes).',
      'Mengelola sistem informasi desa, ketatausahaan kantor balai desa, dan inventarisasi aset desa.',
      'Memfasilitasi layanan digital publik dan tata kelola dokumentasi kearsipan desa.'
    ]
  },
  {
    id: 5,
    name: "Mar'Atus Sholihah, S.IP",
    title: 'Kasi Pemerintahan',
    category: 'seksi',
    nip: 'SK Kades No. 08/MH/2021',
    period: '2021 - Sekarang',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    description: 'Menangani urusan ketertiban umum, batas wilayah, registrasi kependudukan, pertanahan pesisir, dan kerja sama antar wilayah.',
    tugas: [
      'Verifikasi permohonan surat keterangan domisili, sporadik tanah, dan pengantar SKCK.',
      'Pemutakhiran profil kependudukan desa dan data pemilih warga.',
      'Penyuluhan hukum serta pembinaan LINMAS dan ketentraman lingkungan.'
    ]
  },
  {
    id: 6,
    name: 'Ratna Febrianti',
    title: 'Kasi Kesejahteraan & Pelayanan',
    category: 'seksi',
    nip: 'SK Kades No. 10/MH/2021',
    period: '2021 - Sekarang',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    description: 'Mengelola program jaring pengaman sosial, posyandu, fasilitasi bantuan nelayan dan petani, serta urusan pelayanan kemasyarakatan.',
    tugas: [
      'Penyaluran BLT Dana Desa, program jaring sosial, dan bantuan nelayan/petani.',
      'Pengembangan sarana prasarana kesehatan warga dan Posyandu Balita & Lansia.',
      'Fasilitasi pelatihan kewirausahaan dan pemberdayaan ekonomi perempuan pesisir.'
    ]
  },
  {
    id: 7,
    name: 'M. Sayuti',
    title: 'Kepala Dusun I',
    category: 'kadus',
    nip: 'SK Kades No. 15/MH/2020',
    period: '2020 - Sekarang',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    description: 'Koordinator kewilayahan DUSUN I yang membawahi RT 01 sampai RT 03 dengan fokus sentra pendaratan nelayan dan pemukiman pesisir.',
    tugas: [
      'Mengawasi keamanan lingkungan dan mengkoordinasikan gotong royong warga Dusun I.',
      'Menjembatani aspirasi masyarakat nelayan dengan pemerintah desa.',
      'Mendistribusikan informasi resmi dan penyaluran bantuan warga di Dusun I.'
    ]
  },
  {
    id: 8,
    name: 'Lodri',
    title: 'Kepala Dusun II',
    category: 'kadus',
    nip: 'SK Kades No. 16/MH/2020',
    period: '2020 - Sekarang',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    description: 'Koordinator kewilayahan DUSUN II yang membawahi RT 04 sampai RT 06, pusat sarana fasilitas umum dan Balai Kantor Desa.',
    tugas: [
      'Mengkoordinasikan kegiatan sosial kemasyarakatan dan keagamaan warga Dusun II.',
      'Mendata mobilitas warga dan memelihara ketertiban lingkungan jalan poros desa.',
      'Memantau pemeliharaan fasilitas umum jalan titian dan sarana air bersih.'
    ]
  },
  {
    id: 9,
    name: 'Prayitno',
    title: 'Kepala Dusun III',
    category: 'kadus',
    nip: 'SK Kades No. 18/MH/2020',
    period: '2020 - Sekarang',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    description: 'Koordinator kewilayahan DUSUN III yang membawahi RT 07 sampai RT 09 dengan fokus ketertiban warga, pemeliharaan lingkungan, dan koordinasi masyarakat.',
    tugas: [
      'Pembinaan ketertiban masyarakat dan koordinasi gotong royong Dusun III.',
      'Pengawasan tata kelola sarana fasilitas umum di lingkungan Dusun III.',
      'Pelaporan data warga rentan, lansia, dan pelayanan administrasi dusun.'
    ]
  },
  {
    id: 10,
    name: 'Irma Suryani',
    title: 'Staf Kaur Umum & Perencanaan',
    category: 'staf',
    nip: 'SK Kades No. 08/MH/2023',
    period: '2023 - Sekarang',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    description: 'Membantu Kepala Urusan Umum & Perencanaan dalam tata kelola administrasi ketatausahaan, pengarsipan berkas desa, dan inventarisasi aset desa.',
    tugas: [
      'Membantu pengarsipan surat masuk, surat keluar, dan administrasi umum perkantoran desa.',
      'Membantu pencatatan inventaris barang milik desa dan sarana prasarana kantor desa.',
      'Mendukung penyiapan dokumen rapat musyawarah desa serta administrasi perencanaan.'
    ]
  },
  {
    id: 11,
    name: 'Novi',
    title: 'Staf Kasi Pemerintahan',
    category: 'staf',
    nip: 'SK Kades No. 09/MH/2023',
    period: '2023 - Sekarang',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    description: 'Membantu Kepala Seksi Pemerintahan dalam administrasi kependudukan, registrasi surat warga, dan pembinaan ketertiban masyarakat.',
    tugas: [
      'Membantu penerimaan dan verifikasi awal berkas permohonan surat kependudukan warga.',
      'Membantu pemutakhiran buku register kependudukan desa dan pengelolaan profil desa.',
      'Membantu administrasi koordinasi linmas dan pemeliharaan ketentraman lingkungan.'
    ]
  },
  {
    id: 12,
    name: 'Suci Nur Apriza',
    title: 'Staf Keuangan',
    category: 'staf',
    nip: 'SK Kades No. 10/MH/2023',
    period: '2023 - Sekarang',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    description: 'Membantu Kepala Urusan Keuangan dalam pencatatan transaksi kas desa, pengarsipan bukti belanja, dan administrasi penatausahaan keuangan desa.',
    tugas: [
      'Membantu pembukuan tanda bukti penerimaan dan pengeluaran kas operasional desa.',
      'Membantu penyiapan kelengkapan Surat Permintaan Pembayaran (SPP) kegiatan APBDes.',
      'Membantu pengarsipan dokumen bukti transaksi pertanggungjawaban keuangan desa.'
    ]
  },
  {
    id: 13,
    name: 'Mita Saodah',
    title: 'Staf Kasi Kesejahteraan dan Pelayanan',
    category: 'staf',
    nip: 'SK Kades No. 11/MH/2023',
    period: '2023 - Sekarang',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    description: 'Membantu Kepala Seksi Kesejahteraan & Pelayanan dalam administrasi program bantuan sosial, fasilitasi SKTM, dan pelayanan sosial kemasyarakatan.',
    tugas: [
      'Membantu pendataan dan verifikasi warga calon penerima bantuan sosial (BLT-DD, bansos).',
      'Membantu proses administrasi Surat Keterangan Tidak Mampu (SKTM) dan rujukan warga.',
      'Mendukung fasilitasi kegiatan kemasyarakatan, posyandu, dan pembinaan kesejahteraan keluarga.'
    ]
  }
];

function initPerangkatFilter() {
  const filterButtons = document.querySelectorAll('.filter-perangkat-btn');
  const cardsContainer = document.getElementById('perangkat-cards-container');

  function renderCards(filter = 'all') {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = '';

    const filtered = filter === 'all' 
      ? PERANGKAT_DATA 
      : PERANGKAT_DATA.filter(item => item.category === filter);

    filtered.forEach(person => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col group';
      
      card.innerHTML = `
        <div class="relative overflow-hidden bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 h-64">
          <img src="${person.avatar}" alt="${person.name}" class="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-gov-blue/90 via-gov-blue/20 to-transparent"></div>
          <span class="absolute top-4 right-4 bg-emerald-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-emerald-400/40">
            Aktif Melayani
          </span>
          <div class="absolute bottom-4 left-4 right-4">
            <span class="text-xs uppercase tracking-wider text-emerald-300 font-semibold block mb-1">
              ${person.period}
            </span>
            <h4 class="text-white text-xl font-bold leading-tight drop-shadow-sm">${person.name}</h4>
            <p class="text-slate-200 text-sm font-medium mt-0.5">${person.title}</p>
          </div>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between bg-white">
          <div>
            <div class="flex items-center gap-2 mb-3 text-xs text-slate-500 font-mono">
              <svg class="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <span>${person.nip}</span>
            </div>
            <p class="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
              ${person.description}
            </p>
          </div>
          <button onclick="openPerangkatModal(${person.id})" class="w-full py-2.5 px-4 bg-slate-50 hover:bg-gov-blue hover:text-white text-slate-700 font-medium rounded-xl text-sm border border-slate-200 hover:border-gov-blue transition-all duration-200 flex items-center justify-center gap-2">
            <span>Rincian Tugas & Wewenang</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      `;
      cardsContainer.appendChild(card);
    });
  }

  // Initial render
  renderCards('all');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterVal = btn.dataset.filter;

      filterButtons.forEach(b => {
        b.classList.remove('bg-gov-blue', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });

      btn.classList.remove('bg-white', 'text-slate-700');
      btn.classList.add('bg-gov-blue', 'text-white');

      renderCards(filterVal);
    });
  });
}

window.openPerangkatModal = function(id) {
  const person = PERANGKAT_DATA.find(p => p.id === id);
  if (!person) return;

  const modal = document.getElementById('perangkat-modal');
  const modalContent = document.getElementById('perangkat-modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="relative">
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-200 pb-6 mb-6">
        <img src="${person.avatar}" alt="${person.name}" class="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-lg border-2 border-emerald-500">
        <div class="text-center sm:text-left">
          <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold mb-2">
            Perangkat Desa Majelis Hidayah
          </span>
          <h3 class="text-2xl font-bold text-slate-900">${person.name}</h3>
          <p class="text-gov-blue font-semibold text-base mt-1">${person.title}</p>
          <p class="text-slate-500 text-sm mt-1 font-mono">${person.nip} • Masa Bakti: ${person.period}</p>
        </div>
      </div>
      
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Ikhtisar Jabatan</h4>
          <p class="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            ${person.description}
          </p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Fungsi & Tugas Utama (TUPOKSI)</h4>
          <ul class="space-y-2.5">
            ${person.tugas.map(t => `
              <li class="flex items-start gap-2.5 text-slate-700 text-sm">
                <svg class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>${t}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>Kecamatan Kuala Jambi, Tanjung Jabung Timur</span>
          <span class="text-emerald-700 font-semibold flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Siap Memberikan Pelayanan Terbaik
          </span>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

/* ==========================================================================
   6. Public Services (Layanan Mandiri Surat Digital)
   ========================================================================== */
// Pre-seeded letter tracking records
let lettersDatabase = [
  {
    ticket: 'MH-2026-0101',
    nik: '1507021208940001',
    name: 'Bambang Irawan',
    type: 'Surat Pengantar SKCK',
    dusun: 'DUSUN II',
    date: '2026-10-28',
    status: 'Selesai',
    step: 4,
    note: 'Surat telah ditandatangani Kepala Desa dan siap diambil di Kantor Desa atau diunduh via WhatsApp.'
  },
  {
    ticket: 'MH-2026-0102',
    nik: '1507024403910003',
    name: 'Siti Aminah',
    type: 'Surat Keterangan Usaha (SKU)',
    dusun: 'DUSUN I',
    date: '2026-10-30',
    status: 'Sedang Diproses',
    step: 3,
    note: 'Menunggu penandatanganan Kepala Desa setelah diverifikasi Kasi Pelayanan.'
  },
  {
    ticket: 'MH-2026-0103',
    nik: '1507026511980002',
    name: 'Rahmat Hidayat',
    type: 'Surat Keterangan Domisili',
    dusun: 'DUSUN III',
    date: '2026-10-31',
    status: 'Verifikasi Berkas',
    step: 2,
    note: 'Kasi Pemerintahan sedang memverifikasi kesesuaian KTP dan KK pemohon.'
  }
];

// Nomor WhatsApp Resmi Admin Pelayanan Desa Majelis Hidayah
const ADMIN_WA_NUMBER = '6285156665733';

function initPublicServiceForms() {
  const form = document.getElementById('letter-request-form');
  const letterTypeSelect = document.getElementById('letter-type');
  const dynamicFieldsContainer = document.getElementById('dynamic-letter-fields');

  // Load custom submissions from localStorage
  const savedLetters = localStorage.getItem('mh_letters_db');
  if (savedLetters) {
    try {
      const parsed = JSON.parse(savedLetters);
      lettersDatabase = [...lettersDatabase, ...parsed];
    } catch (e) {
      console.error('Error loading saved letters:', e);
    }
  }

  // Dynamic field updates based on letter selection
  if (letterTypeSelect && dynamicFieldsContainer) {
    letterTypeSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      let html = '';

      if (val === 'Surat Keterangan Usaha (SKU)') {
        html = `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Usaha / Usaha Nelayan / Toko</label>
              <input type="text" id="dynamic-nama-usaha" name="nama_usaha" required placeholder="Contoh: Tangkapan Udang Segar Barokah" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Jenis Sektor Usaha</label>
              <select id="dynamic-sektor-usaha" name="sektor_usaha" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option value="Perikanan Tangkap & Kelautan">Perikanan Tangkap / Nelayan</option>
                <option value="Perkebunan Kelapa & Pinang">Perkebunan Kelapa & Pinang</option>
                <option value="Pengolahan Ikan Asin / Ebi">Pengolahan Ikan Asin / Ebi / Terasi</option>
                <option value="Perdagangan / Kelontong">Perdagangan / Warung Sembako</option>
                <option value="Jasa Bengkel / Transportasi Pesisir">Jasa Bengkel / Pompong / Perahu</option>
              </select>
            </div>
          </div>
        `;
      } else if (val === 'Surat Pengantar SKCK') {
        html = `
          <div class="p-4 bg-blue-50/70 border border-blue-200 rounded-xl">
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Tujuan / Keperluan Penerbitan SKCK</label>
            <input type="text" id="dynamic-keperluan-skck" name="keperluan_skck" required placeholder="Contoh: Melamar Pekerjaan / Seleksi ASN / Pendaftaran TNI-Polri" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
        `;
      } else if (val === 'Surat Keterangan Tidak Mampu (SKTM)') {
        html = `
          <div class="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Keperluan Pengajuan SKTM</label>
            <select id="dynamic-tujuan-sktm" name="tujuan_sktm" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
              <option value="Beasiswa Pendidikan / KIP Kuliah">Beasiswa Pendidikan Anak / KIP Kuliah</option>
              <option value="Keringanan Biaya Rumah Sakit / BPJS PBI">Keringanan Biaya Berobat / BPJS PBI</option>
              <option value="Bantuan Sosial Program Keluarga Harapan">Permohonan Bantuan Sosial / PKH</option>
            </select>
          </div>
        `;
      }

      dynamicFieldsContainer.innerHTML = html;
    });
  }

  // Form submission handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nik = document.getElementById('form-nik').value.trim();
      const nama = document.getElementById('form-nama').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const dusun = document.getElementById('form-dusun').value;
      const type = document.getElementById('letter-type').value;
      const keperluan = document.getElementById('form-keperluan').value.trim();

      // Additional dynamic values
      let extraInfo = '';
      const namaUsaha = document.getElementById('dynamic-nama-usaha');
      const sektorUsaha = document.getElementById('dynamic-sektor-usaha');
      const keperluanSkck = document.getElementById('dynamic-keperluan-skck');
      const tujuanSktm = document.getElementById('dynamic-tujuan-sktm');

      if (namaUsaha && sektorUsaha) {
        extraInfo = `Nama Usaha: ${namaUsaha.value} (${sektorUsaha.value})`;
      } else if (keperluanSkck) {
        extraInfo = `Keperluan SKCK: ${keperluanSkck.value}`;
      } else if (tujuanSktm) {
        extraInfo = `Tujuan SKTM: ${tujuanSktm.value}`;
      }

      // Validation
      if (!/^\d{16}$/.test(nik)) {
        alert('Mohon masukkan Nomor Induk Kependudukan (NIK) valid yang terdiri dari 16 digit angka.');
        document.getElementById('form-nik').focus();
        return;
      }

      // Generate Ticket Code: MH-2026-XXXX
      const randomTicketNum = Math.floor(1000 + Math.random() * 9000);
      const ticketCode = `MH-2026-${randomTicketNum}`;
      const today = new Date().toISOString().split('T')[0];

      // Format WhatsApp Message for Admin (0851 56665733)
      const waMessageText = 
`*PERMOHONAN SURAT DESA MAJELIS HIDAYAH*
====================================
*No. Resi Tiket :* ${ticketCode}
*Tanggal        :* ${today}
------------------------------------
*DATA PEMOHON:*
• *Nama Lengkap :* ${nama}
• *NIK          :* ${nik}
• *No. WhatsApp :* ${phone}
• *Wilayah/Dusun:* ${dusun}

*DETAIL SURAT:*
• *Jenis Layanan:* ${type}
• *Keperluan    :* ${keperluan}
${extraInfo ? `• *Keterangan Tambahan:* ${extraInfo}\n` : ''}------------------------------------
*LAMPIRAN PERSYARATAN:*
_Saya melampirkan foto KTP / KK pada chat ini untuk diverifikasi oleh perangkat desa._

Mohon dapat diproses. Terima kasih! 🙏`;

      const waUrl = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(waMessageText)}`;

      const newRecord = {
        ticket: ticketCode,
        nik: nik,
        name: nama,
        type: type,
        dusun: dusun,
        phone: phone,
        keperluan: keperluan,
        extraInfo: extraInfo,
        date: today,
        status: 'Dokumen Diterima',
        step: 1,
        waUrl: waUrl,
        note: 'Permohonan Anda telah diterima sistem Desa Majelis Hidayah dan masuk antrean verifikasi perangkat desa.'
      };

      // Save to memory
      lettersDatabase.unshift(newRecord);

      // Save to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('mh_letters_db') || '[]');
        stored.unshift(newRecord);
        localStorage.setItem('mh_letters_db', JSON.stringify(stored));
      } catch (err) {
        console.error('LocalStorage write error:', err);
      }

      // Show receipt modal
      openReceiptModal(newRecord);

      // Automatically open WhatsApp in new tab
      try {
        window.open(waUrl, '_blank');
      } catch (e) {
        console.log('Popup blocked or handled by modal click');
      }

      // Reset form
      form.reset();
      if (dynamicFieldsContainer) dynamicFieldsContainer.innerHTML = '';
      showToast('Permohonan berhasil! Membuka WhatsApp Admin Desa...');
    });
  }
}

function openReceiptModal(data) {
  const modal = document.getElementById('receipt-modal');
  const content = document.getElementById('receipt-modal-content');
  if (!modal || !content) return;

  const waLink = data.waUrl || `https://wa.me/${ADMIN_WA_NUMBER}?text=Halo%20Admin%20Desa%20Majelis%20Hidayah,%20saya%20ingin%20mengonfirmasi%20resi%20${data.ticket}`;

  content.innerHTML = `
    <div id="printable-receipt" class="bg-white border-2 border-dashed border-gov-blue/30 rounded-2xl p-6 sm:p-8">
      <!-- Kop Surat Mini -->
      <div class="text-center border-b-2 border-slate-900 pb-4 mb-5">
        <h3 class="text-xs font-bold uppercase tracking-widest text-slate-600">Pemerintah Kabupaten Tanjung Jabung Timur</h3>
        <h4 class="text-xs font-bold uppercase tracking-widest text-slate-600">Kecamatan Kuala Jambi</h4>
        <h2 class="text-lg sm:text-xl font-extrabold text-gov-blue uppercase mt-0.5">Pemerintah Desa Majelis Hidayah</h2>
        <p class="text-xs text-slate-500 mt-1">Jl. Madrasah RT.07 Dusun II Desa Majelis Hidayah, Kec. Kuala Jambi, Kab. Tanjung Jabung Timur, Jambi 36760</p>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center mb-6">
        <span class="text-xs text-emerald-800 font-semibold uppercase tracking-wider block">Nomor Resi / Kode Lacak Permohonan</span>
        <div class="text-2xl sm:text-3xl font-mono font-extrabold text-gov-blue my-1 tracking-wider">
          ${data.ticket}
        </div>
        <p class="text-xs text-emerald-700 font-medium">Simpan nomor ini untuk memantau status pengerjaan surat Anda secara daring.</p>
      </div>

      <!-- Tombol Utama Kirim WhatsApp Admin Desa -->
      <div class="mb-6 p-4 bg-emerald-500/10 border-2 border-emerald-500 rounded-2xl">
        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-all">
          <svg class="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>Kirim Berkas ke WhatsApp Admin (0851-5666-5733)</span>
        </a>
        <div class="mt-3 flex items-start gap-2 text-xs text-emerald-900 bg-white/70 p-2.5 rounded-xl border border-emerald-200">
          <span class="text-base flex-shrink-0">📲</span>
          <span>
            <strong>Langkah Terakhir:</strong> Setelah WhatsApp terbuka, tekan <strong>Kirim</strong>, lalu <strong>lampirkan foto KTP / KK</strong> langsung di chat tersebut agar admin desa bisa langsung memproses berkas Anda.
          </span>
        </div>
      </div>

      <div class="space-y-3 text-sm">
        <div class="flex justify-between py-1.5 border-b border-slate-100">
          <span class="text-slate-500">Jenis Layanan:</span>
          <span class="font-bold text-slate-800 text-right">${data.type}</span>
        </div>
        <div class="flex justify-between py-1.5 border-b border-slate-100">
          <span class="text-slate-500">Nama Pemohon:</span>
          <span class="font-bold text-slate-800">${data.name}</span>
        </div>
        <div class="flex justify-between py-1.5 border-b border-slate-100">
          <span class="text-slate-500">NIK:</span>
          <span class="font-mono text-slate-800">${data.nik}</span>
        </div>
        <div class="flex justify-between py-1.5 border-b border-slate-100">
          <span class="text-slate-500">Alamat Dusun:</span>
          <span class="text-slate-800">${data.dusun}</span>
        </div>
        <div class="flex justify-between py-1.5 border-b border-slate-100">
          <span class="text-slate-500">Tanggal Pengajuan:</span>
          <span class="text-slate-800">${data.date}</span>
        </div>
        <div class="flex justify-between py-1.5 border-b border-slate-100">
          <span class="text-slate-500">Estimasi Selesai:</span>
          <span class="text-emerald-700 font-bold">1x24 Jam Hari Kerja</span>
        </div>
        <div class="flex justify-between py-1.5">
          <span class="text-slate-500">Status Awal:</span>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            ${data.status}
          </span>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-200 text-center">
        <p class="text-xs text-slate-500 italic">
          *Pelayanan ini resmi bebas biaya (Gratis Rp 0,-). Jika berkas memerlukan tanda tangan basah, petugas kami akan mengabari melalui WhatsApp saat surat siap diambil.
        </p>
      </div>
    </div>

    <div class="mt-6 flex flex-col sm:flex-row gap-3">
      <button onclick="window.print()" class="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-md">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
        <span>Cetak Tanda Terima</span>
      </button>
      <button onclick="copyTicketToClipboard('${data.ticket}')" class="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border border-slate-300">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
        <span>Salin Kode Resi</span>
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

window.copyTicketToClipboard = function(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`Kode ${code} disalin ke clipboard!`);
  }).catch(() => {
    prompt('Salin nomor resi Anda:', code);
  });
};

/* ==========================================================================
   7. Letter Tracking Widget
   ========================================================================== */
function initLetterTracker() {
  const trackBtn = document.getElementById('btn-track-letter');
  const inputTicket = document.getElementById('input-track-ticket');
  const resultContainer = document.getElementById('track-result-container');

  function performSearch() {
    const query = inputTicket.value.trim().toUpperCase();
    if (!query) {
      alert('Silakan ketikkan Nomor Resi Tiket (misal: MH-2026-0101) atau NIK Anda.');
      return;
    }

    const match = lettersDatabase.find(item => 
      item.ticket.toUpperCase() === query || item.nik === query
    );

    if (!match) {
      resultContainer.innerHTML = `
        <div class="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
          <svg class="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <h4 class="text-base font-bold text-red-900">Data Permohonan Tidak Ditemukan</h4>
          <p class="text-xs text-red-700 mt-1 max-w-md mx-auto">
            Tidak ditemukan berkas dengan kode <strong>${query}</strong>. Pastikan kode resi atau NIK yang dimasukkan sudah sesuai dengan bukti tanda terima Anda.
          </p>
        </div>
      `;
      return;
    }

    // Render Steps
    const steps = [
      { num: 1, title: 'Dokumen Diterima', desc: 'Permohonan masuk antrean' },
      { num: 2, title: 'Verifikasi Kasi', desc: 'Pengecekan kesesuaian berkas' },
      { num: 3, title: 'Persetujuan Kades', desc: 'Tanda tangan elektronik / basah' },
      { num: 4, title: 'Siap Diambil / Selesai', desc: 'Selesai diproses' }
    ];

    let stepsHtml = steps.map(s => {
      const isPastOrCurrent = s.num <= match.step;
      const isCurrent = s.num === match.step;
      const circleClass = isCurrent 
        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 font-bold' 
        : (isPastOrCurrent ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-200 text-slate-500');

      return `
        <div class="flex-1 text-center relative px-2">
          <div class="w-10 h-10 rounded-full mx-auto flex items-center justify-center text-sm ${circleClass} transition-all duration-300">
            ${isPastOrCurrent ? (s.num < match.step ? '✓' : s.num) : s.num}
          </div>
          <h5 class="text-xs font-bold text-slate-800 mt-2">${s.title}</h5>
          <p class="text-[11px] text-slate-500 hidden sm:block">${s.desc}</p>
        </div>
      `;
    }).join('');

    resultContainer.innerHTML = `
      <div class="bg-white border-2 border-emerald-500/30 rounded-2xl p-6 shadow-lg animate-fadeIn">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4 mb-6">
          <div>
            <span class="text-xs uppercase font-bold text-emerald-700 tracking-wider">Hasil Pelacakan Berkas</span>
            <h4 class="text-xl font-extrabold text-gov-blue">${match.ticket}</h4>
            <p class="text-xs text-slate-500">${match.type} • Pemohon: <strong>${match.name}</strong></p>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3.5 py-1.5 rounded-full text-xs font-bold ${match.step === 4 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
              Status: ${match.status}
            </span>
          </div>
        </div>

        <!-- Stepper Bar -->
        <div class="py-4 mb-6">
          <div class="flex items-center justify-between relative">
            <div class="absolute top-5 left-10 right-10 h-1 bg-slate-200 -z-0">
              <div class="h-full bg-emerald-500 transition-all duration-500" style="width: ${((match.step - 1) / 3) * 100}%"></div>
            </div>
            ${stepsHtml}
          </div>
        </div>

        <!-- Detail Note Card -->
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
          <div class="p-2 rounded-lg bg-emerald-100 text-emerald-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div class="text-xs">
            <span class="font-bold text-slate-800 block mb-0.5">Catatan Petugas Layanan Desa:</span>
            <p class="text-slate-600 leading-relaxed">${match.note}</p>
            <span class="text-slate-400 mt-2 block">Dusun: ${match.dusun} • Tanggal Input: ${match.date}</span>
          </div>
        </div>
      </div>
    `;
  }

  if (trackBtn && inputTicket) {
    trackBtn.addEventListener('click', performSearch);
    inputTicket.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }
}

/* ==========================================================================
   8. News & Announcements (Berita & Pengumuman) Filter & Modal
   ========================================================================== */
const NEWS_ARTICLES = [
  {
    id: 1,
    title: 'Penyaluran Bantuan Langsung Tunai Dana Desa (BLT-DD) Triwulan IV Berjalan Tertib',
    category: 'bantuan',
    date: '28 Oktober 2026',
    author: 'Tim Humas Desa',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=700&q=80',
    summary: 'Pemerintah Desa Majelis Hidayah menyalurkan bantuan BLT Dana Desa kepada 65 Keluarga Penerima Manfaat (KPM) di Aula Balai Desa Dusun II Al-Hidayah.',
    content: `
      <p class="mb-4">Pemerintah Desa Majelis Hidayah Kecamatan Kuala Jambi kembali merealisasikan komitmen perlindungan sosial dengan menyalurkan Bantuan Langsung Tunai Dana Desa (BLT-DD) Triwulan IV Tahun Anggaran 2026 secara transparan dan tertib pada Rabu (28/10/2026).</p>
      <p class="mb-4">Acara yang berlangsung di Aula Balai Pertemuan Dusun II Al-Hidayah ini dihadiri langsung oleh Kepala Desa Mulyadi, Pendamping Desa Kecamatan Kuala Jambi, Ketua BPD, Bhabinkamtibmas, serta seluruh perangkat kewilayahan.</p>
      <p class="mb-4">Kepala Desa menyampaikan bahwa penetapan penerima telah melalui Musyawarah Desa Khusus (Musdessus) yang ketat, mengutamakan keluarga lansia tunggal, penyandang disabilitas, dan warga berpenghasilan rendah yang terdampak musim angin barat pesisir.</p>
      <p class="mb-4">"Kami berharap bantuan ini dapat meringankan beban ekonomi kebutuhan pokok keluarga serta dimanfaatkan secara bijak untuk kesehatan dan gizi anak," ungkap beliau dalam sambutannya.</p>
    `
  },
  {
    id: 2,
    title: 'Musrenbangdes 2027: Prioritaskan Penguatan Titian Beton & Perlindungan Tanggul Abrasi Pesisir',
    category: 'pembangunan',
    date: '25 Oktober 2026',
    author: 'Kaur Perencanaan',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=700&q=80',
    summary: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) menetapkan fokus rehabilitasi titian jalan warga Dusun 1 & pembuatan bronjong penahan ombak.',
    content: `
      <p class="mb-4">Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) Desa Majelis Hidayah untuk Rencana Kerja Pemerintah Desa (RKPDes) Tahun Anggaran 2027 resmi menyepakati sejumlah prioritas fisik dan pemberdayaan masyarakat.</p>
      <p class="mb-4">Fokus utama yang disepakati bersama BPD dan tokoh masyarakat meliputi: (1) Peningkatan jalan titian beton penghubung antar-dusun sepanjang 850 meter, (2) Penguatan tanggul penahan abrasi pasang laut di bantaran muara, dan (3) Fasilitasi alat keselamatan pelampung bagi kelompok nelayan tangkap.</p>
      <p class="mb-4">Kaur Umum & Perencanaan Ariyansyah, S.Kom menegaskan bahwa usulan yang terakomodir berakar murni dari aspirasi Musyawarah Dusun di Dusun I, Dusun II, dan Dusun III demi pemerataan manfaat pembangunan.</p>
    `
  },
  {
    id: 3,
    title: 'Pengumuman Resmi: Jadwal Pelayanan Perekaman KTP Elektronik & Akta Kelahiran Jemput Bola',
    category: 'pengumuman',
    date: '22 Oktober 2026',
    author: 'Kasi Pemerintahan',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=700&q=80',
    summary: 'Dinas Kependudukan dan Pencatatan Sipil Kab. Tanjung Jabung Timur bekerja sama dengan Pemdes Majelis Hidayah mengadakan perekaman KTP-el langsung di desa.',
    content: `
      <p class="mb-4">Diberitahukan kepada seluruh warga masyarakat Desa Majelis Hidayah yang belum memiliki KTP Elektronik (khususnya pemula usia 16-17 tahun) dan akta catatan sipil:</p>
      <ul class="list-disc pl-5 mb-4 space-y-1">
        <li><strong>Hari / Tanggal:</strong> Senin - Selasa, 09 - 10 November 2026</li>
        <li><strong>Waktu:</strong> Pukul 08.30 - 15.00 WIB</li>
        <li><strong>Tempat:</strong> Gedung Balai Desa Majelis Hidayah (Dusun 2)</li>
        <li><strong>Persyaratan:</strong> Membawa fotokopi Kartu Keluarga (KK) dan Akta Kelahiran asli bagi pemohon baru</li>
      </ul>
      <p class="mb-4">Layanan ini gratis tanpa dipungut biaya sepeser pun. Warga diharapkan memanfaatkan kemudahan ini sebaik-baiknya.</p>
    `
  },
  {
    id: 4,
    title: 'Pelatihan Diversifikasi Produk Olahan Hasil Laut: Pembuatan Kerupuk Ikan & Terasi Higienis',
    category: 'agenda',
    date: '18 Oktober 2026',
    author: 'TP-PKK Desa',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80',
    summary: 'Tim Penggerak PKK Desa Majelis Hidayah bersama kelompok ibu-ibu pesisir meningkatkan nilai jual hasil tangkapan laut melalui kemasan higienis berstandar P-IRT.',
    content: `
      <p class="mb-4">Potensi hasil perikanan Desa Majelis Hidayah yang melimpah seperti udang ebi, ikan belanak, dan senangin kini terus didorong agar memiliki nilai tambah ekonomi tinggi melalui program pemberdayaan PKK Desa.</p>
      <p class="mb-4">Pelatihan yang menghadirkan instruktur praktisi olahan pangan modern ini mengajarkan teknik pengeringan higienis, sterilisasi kemasan kedap udara (vacuum packaging), serta tata cara pengurusan izin edar P-IRT dan sertifikasi halal gratis.</p>
      <p class="mb-4">Ketua TP-PKK Desa berharap produk olahan lokal Desa Majelis Hidayah mampu bersaing di pasar oleh-oleh khas Tanjung Jabung Timur dan Jambi.</p>
    `
  }
];

function initNewsFilter() {
  const filterBtns = document.querySelectorAll('.news-filter-btn');
  const newsContainer = document.getElementById('news-cards-container');

  function renderNews(category = 'all') {
    if (!newsContainer) return;
    newsContainer.innerHTML = '';

    const filtered = category === 'all'
      ? NEWS_ARTICLES
      : NEWS_ARTICLES.filter(item => item.category === category);

    filtered.forEach(article => {
      const card = document.createElement('article');
      card.className = 'bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col group';

      const badgeColor = {
        'bantuan': 'bg-purple-100 text-purple-800 border-purple-200',
        'pembangunan': 'bg-blue-100 text-blue-800 border-blue-200',
        'pengumuman': 'bg-amber-100 text-amber-800 border-amber-200',
        'agenda': 'bg-emerald-100 text-emerald-800 border-emerald-200'
      }[article.category] || 'bg-slate-100 text-slate-800 border-slate-200';

      const catLabel = {
        'bantuan': 'Bantuan Sosial',
        'pembangunan': 'Pembangunan',
        'pengumuman': 'Pengumuman Resmi',
        'agenda': 'Agenda Kegiatan'
      }[article.category] || 'Berita Desa';

      card.innerHTML = `
        <div class="relative overflow-hidden h-52 bg-slate-100">
          <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <span class="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border ${badgeColor}">
            ${catLabel}
          </span>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 text-xs text-slate-500 mb-2 font-medium">
              <span>${article.date}</span>
              <span>•</span>
              <span>${article.author}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 group-hover:text-gov-blue transition-colors line-clamp-2 leading-snug mb-3">
              ${article.title}
            </h3>
            <p class="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
              ${article.summary}
            </p>
          </div>
          <button onclick="openNewsModal(${article.id})" class="text-gov-blue font-bold text-sm inline-flex items-center gap-1.5 hover:text-emerald-600 transition-colors pt-2 border-t border-slate-100">
            <span>Baca Selengkapnya</span>
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      `;
      newsContainer.appendChild(card);
    });
  }

  // Initial render
  renderNews('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;

      filterBtns.forEach(b => {
        b.classList.remove('bg-gov-blue', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });

      btn.classList.remove('bg-white', 'text-slate-700');
      btn.classList.add('bg-gov-blue', 'text-white');

      renderNews(cat);
    });
  });
}

window.openNewsModal = function(id) {
  const article = NEWS_ARTICLES.find(a => a.id === id);
  if (!article) return;

  const modal = document.getElementById('news-modal');
  const content = document.getElementById('news-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <article class="space-y-4">
      <div class="border-b border-slate-200 pb-4">
        <span class="inline-block px-3 py-1 bg-gov-blue text-white rounded-full text-xs font-semibold mb-2 uppercase tracking-wider">
          ${article.category}
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
          ${article.title}
        </h2>
        <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-3">
          <span>📅 ${article.date}</span>
          <span>•</span>
          <span>✍️ Ditulis oleh: ${article.author}</span>
          <span>•</span>
          <span>📍 Desa Majelis Hidayah, Kuala Jambi</span>
        </div>
      </div>

      <img src="${article.image}" alt="${article.title}" class="w-full h-72 sm:h-80 object-cover rounded-2xl shadow-sm my-4">

      <div class="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
        ${article.content}
      </div>

      <div class="pt-6 border-t border-slate-200 flex items-center justify-between">
        <span class="text-xs text-slate-500">Pemerintah Desa Majelis Hidayah</span>
        <button onclick="shareArticle('${article.title}')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
          <span>Bagikan Kabar</span>
        </button>
      </div>
    </article>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.shareArticle = function(title) {
  if (navigator.share) {
    navigator.share({
      title: title,
      text: `${title} - Portal Resmi Desa Majelis Hidayah, Kuala Jambi`,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast('Tautan portal desa disalin ke papan klip!');
  }
};

/* ==========================================================================
   9. Modals Controller (Close by click backdrop or close button)
   ========================================================================== */
function initModals() {
  const closeButtons = document.querySelectorAll('.modal-close-btn');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-container');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  });

  // Close when clicking overlay backdrop
  const modals = document.querySelectorAll('.modal-container');
  modals.forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) {
        m.classList.add('hidden');
        m.classList.remove('flex');
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => {
        m.classList.add('hidden');
        m.classList.remove('flex');
      });
    }
  });
}

/* ==========================================================================
   10. Toast Notification System
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 transform transition-all duration-300 translate-y-16 opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>${message}</span>
  `;

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-16', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);

  // Animate out
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-16', 'opacity-0');
  }, 3500);
}

/* ==========================================================================
   11. Interactive Photo Gallery Lightbox Viewer
   ========================================================================== */
const GALLERY_ITEMS = [
  {
    title: 'Musyawarah Rencana Kerja Pemerintah Desa (Musrenbangdes)',
    category: 'Musyawarah Desa',
    location: '📍 Balai Pertemuan Desa Majelis Hidayah',
    src: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1400&q=85'
  },
  {
    title: 'Penyaluran Bantuan Langsung Tunai (BLT Dana Desa)',
    category: 'Bantuan Sosial',
    location: '📍 Aula Kantor Desa Majelis Hidayah',
    src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1400&q=85'
  },
  {
    title: 'Gotong Royong Perbaikan Titian Jalan Beton Pesisir',
    category: 'Infrastruktur Dusun',
    location: '📍 Titian Penghubung RT Dusun I & Dusun III',
    src: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1400&q=85'
  },
  {
    title: 'Pelayanan Administrasi Kependudukan & Catatan Sipil',
    category: 'Pelayanan Terpadu',
    location: '📍 Kantor Desa Majelis Hidayah',
    src: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1400&q=85'
  },
  {
    title: 'Peringatan Hari Besar Islam & Pengajian Akbar',
    category: 'Keagamaan & Majelis',
    location: '📍 Masjid Jami Al-Hidayah, Dusun II',
    src: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1400&q=85'
  },
  {
    title: 'Pemeriksaan Posyandu Balita & Posbindu Lansia',
    category: 'Kesehatan Warga',
    location: '📍 Poskesdes Desa Majelis Hidayah',
    src: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1400&q=85'
  }
];

let currentGalleryIndex = 0;

window.openGalleryModal = function(index) {
  currentGalleryIndex = index;
  updateGalleryView();
  const lightbox = document.getElementById('gallery-lightbox');
  if (lightbox) {
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
};

window.closeGalleryModal = function() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (lightbox) {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

window.nextGalleryImage = function() {
  currentGalleryIndex = (currentGalleryIndex + 1) % GALLERY_ITEMS.length;
  updateGalleryView();
};

window.prevGalleryImage = function() {
  currentGalleryIndex = (currentGalleryIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  updateGalleryView();
};

function updateGalleryView() {
  const item = GALLERY_ITEMS[currentGalleryIndex];
  if (!item) return;

  const img = document.getElementById('gallery-lightbox-img');
  const title = document.getElementById('gallery-lightbox-title');
  const location = document.getElementById('gallery-lightbox-location');
  const counter = document.getElementById('gallery-counter');
  const badge = document.getElementById('gallery-badge');

  if (img) {
    img.style.opacity = '0.3';
    img.src = item.src;
    img.alt = item.title;
    img.onload = () => { img.style.opacity = '1'; };
  }
  if (title) title.textContent = item.title;
  if (location) location.textContent = item.location;
  if (counter) counter.textContent = `${currentGalleryIndex + 1} / ${GALLERY_ITEMS.length}`;
  if (badge) badge.textContent = item.category;
}

// Keyboard controls for Gallery Lightbox
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('gallery-lightbox');
  if (lightbox && !lightbox.classList.contains('hidden')) {
    if (e.key === 'ArrowRight') {
      window.nextGalleryImage();
    } else if (e.key === 'ArrowLeft') {
      window.prevGalleryImage();
    } else if (e.key === 'Escape') {
      window.closeGalleryModal();
    }
  }
});
