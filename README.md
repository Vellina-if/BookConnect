# BookConnect - Booking Management Platform

Platform manajemen booking tim yang modern dan profesional.

## Struktur Project

```
BookConnect/
├── assets/
│   └── images/
│       └── logo.png
├── css/
│   ├── style.css          # Styles untuk login/register
│   └── dashboard.css      # Styles untuk dashboard pages
├── js/
│   └── components/
│       ├── sidebar.js     # Sidebar component (reusable)
│       └── topbar.js      # Topbar component (reusable)
├── login.html             # Halaman login
├── register.html          # Halaman registrasi (8 steps)
├── forgot-password.html   # Halaman reset password
├── dashboard.html         # Dashboard utama
├── appointment.html       # Manajemen appointment
├── team.html              # Manajemen tim
├── _template.html         # Template untuk halaman baru
└── COMPONENTS.md          # Dokumentasi komponen
```

## Fitur

### Authentication
- ✅ Login dengan email/password
- ✅ Login dengan Google
- ✅ Multi-language (ID/EN)
- ✅ Forgot password
- ✅ Register multi-step (8 langkah)

### Dashboard
- ✅ Overview statistik
- ✅ Chart & visualisasi data
- ✅ Latest teams & positions
- ✅ Responsive design

### Appointment
- ✅ Timeline view (calendar)
- ✅ List view dengan filter
- ✅ Reports dengan filter advanced
- ✅ Create appointment

### Team Management
- ✅ Team members list
- ✅ Position management
- ✅ Role permissions
- ✅ Search & filter

## Design System

### Colors
- Primary: `#1a73e8` (Blue)
- Secondary: `#00acc1` (Cyan)
- Success: `#43a047` (Green)
- Warning: `#fb8c00` (Orange)
- Danger: `#dc2626` (Red)

### Typography
- Heading: `Sora` (Google Fonts)
- Body: `Plus Jakarta Sans` (Google Fonts)

### Components
- Sidebar: Fixed, auto-highlight active menu
- Topbar: Sticky, dengan breadcrumb & user menu
- Cards: Rounded 12px, shadow on hover
- Buttons: Rounded 8px, smooth transitions

## Komponen System

Sidebar dan Topbar menggunakan komponen reusable untuk menghindari duplikasi kode.

### Cara Pakai

```html
<!-- Sidebar Component -->
<div id="app-sidebar" data-page="dashboard"></div>

<!-- Topbar Component -->
<div id="app-topbar" data-title="Dashboard"></div>

<!-- Load Scripts -->
<script src="js/components/sidebar.js"></script>
<script src="js/components/topbar.js"></script>
```

Lihat `COMPONENTS.md` untuk dokumentasi lengkap.

## Responsive

- Desktop: Full layout dengan sidebar
- Tablet: Optimized layout
- Mobile: Sidebar hidden, hamburger menu

## Multi-Language

Support Bahasa Indonesia dan English dengan toggle button.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- Pure HTML/CSS/JavaScript (no framework)
- Component-based architecture
- Clean & maintainable code
- Professional & modern design

---

**Version:** 1.0  
**Last Updated:** 28 May 2026
