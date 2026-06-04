# BookConnect - Component System

## Cara Pakai Komponen

### 1. Sidebar Component
Sidebar otomatis highlight menu aktif berdasarkan halaman.

```html
<div id="app-sidebar" data-page="dashboard"></div>
```

**Options untuk `data-page`:**
- `dashboard` - Dashboard page
- `appointment` - Appointment page  
- `team` - Team page
- `boxing` - Boxing page
- `booking-page` - Booking Page
- `schedule-exception` - Schedule Exception
- `workspace` - Workspace
- `log` - Log

### 2. Topbar Component
Topbar dengan breadcrumb dan icon otomatis.

```html
<div id="app-topbar" data-title="Dashboard"></div>
```

**Options untuk `data-title`:**
- `Dashboard`
- `Appointment`
- `Team`

### 3. Load Scripts
Tambahkan di akhir `</body>`:

```html
<script src="js/components/sidebar.js"></script>
<script src="js/components/topbar.js"></script>
```

## Template Halaman Baru

Lihat file `_template.html` untuk template dasar halaman baru.

## Keuntungan

✅ **DRY (Don't Repeat Yourself)** - Sidebar & topbar cukup ditulis sekali  
✅ **Easy Update** - Update 1 file, semua halaman berubah  
✅ **Auto Active State** - Menu aktif otomatis highlight  
✅ **Consistent** - Semua halaman pasti sama  
✅ **Fast Development** - Copy template, ganti content, done!

## File Structure

```
js/
  components/
    sidebar.js    - Sidebar component
    topbar.js     - Topbar component
```
