const BOOKING_STORAGE_KEY = 'bookconnect_booking_page_state';

const titleInput = document.getElementById('page-title-input');
const descriptionInput = document.getElementById('page-description-input');
const titleCharCount = document.getElementById('title-char-count');
const descriptionCharCount = document.getElementById('description-char-count');
const previewTitle = document.getElementById('preview-title');
const previewDescription = document.getElementById('preview-description');
const previewImages = document.getElementById('preview-images');
const uploadedImagesList = document.getElementById('uploaded-images-list');
const uploadImageBtn = document.getElementById('upload-image-btn');
const imageFileInput = document.getElementById('image-file-input');
const previewBtn = document.getElementById('preview-btn');
const shareLinkBtn = document.getElementById('share-link-btn');
const toastMessage = document.getElementById('booking-toast');
const calendarPrevBtn = document.getElementById('calendar-prev-btn');
const calendarNextBtn = document.getElementById('calendar-next-btn');
const calendarMonthYear = document.getElementById('calendar-month-year');
const calendarGrid = document.getElementById('calendar-grid');
const selectedDateLabel = document.getElementById('selected-date-label');
const timeSlotsContainer = document.getElementById('time-slots');
const toolbarButtons = document.querySelectorAll('.toolbar-btn');

const state = {
  title: titleInput.value.trim() || 'Your Workspace Name',
  description: descriptionInput.value.trim() || 'Welcome to our booking page. Select a date below to view available time slots.',
  images: [],
  selectedDate: '',
  monthOffset: 0,
  shareUrl: '',
};

let toastTimer = null;

function sanitizeText(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

function parseDescription(value) {
  const escaped = sanitizeText(value);
  const formatted = escaped
    .replace(/__(.+?)__/g, '<u>$1</u>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
  return formatted.replace(/\n/g, '<br>');
}

function showToast(message, type = 'info') {
  toastMessage.textContent = message;
  toastMessage.className = `toast-message show ${type === 'error' ? 'error' : ''}`.trim();
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastMessage.classList.remove('show');
  }, 3500);
}

function saveState() {
  localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem(BOOKING_STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    if (parsed.title) state.title = parsed.title;
    if (parsed.description) state.description = parsed.description;
    if (Array.isArray(parsed.images)) state.images = parsed.images;
    if (parsed.selectedDate) state.selectedDate = parsed.selectedDate;
    if (typeof parsed.monthOffset === 'number') state.monthOffset = parsed.monthOffset;
    if (parsed.shareUrl) state.shareUrl = parsed.shareUrl;
  } catch (error) {
    console.warn('Failed to load booking page state:', error);
  }
}

function updatePreviewTitle() {
  const title = titleInput.value.trim() || 'Your Workspace Name';
  state.title = title;
  previewTitle.textContent = title;
  titleCharCount.textContent = titleInput.value.length;
  saveState();
}

function updatePreviewDescription() {
  const description = descriptionInput.value.trim() || 'Welcome to our booking page. Select a date below to view available time slots.';
  state.description = description;
  previewDescription.innerHTML = parseDescription(description);
  descriptionCharCount.textContent = descriptionInput.value.length;
  saveState();
}

function renderImages() {
  previewImages.innerHTML = '';
  uploadedImagesList.innerHTML = '';

  if (!state.images.length) {
    return;
  }

  state.images.forEach((image) => {
    const previewImg = document.createElement('img');
    previewImg.src = image.src;
    previewImg.alt = image.name;
    previewImages.appendChild(previewImg);

    const item = document.createElement('div');
    item.className = 'uploaded-image-item';
    item.innerHTML = `
      <img src="${image.src}" alt="${image.name}">
      <div class="uploaded-image-meta">
        <span class="uploaded-image-name">${sanitizeText(image.name)}</span>
        <span class="uploaded-image-size">${sanitizeText(image.sizeLabel)}</span>
      </div>
      <button type="button" class="remove-image-btn" data-id="${image.id}">Remove</button>
    `;

    item.querySelector('.remove-image-btn').addEventListener('click', () => {
      state.images = state.images.filter((item) => item.id !== image.id);
      renderImages();
      saveState();
      showToast('Image removed successfully.');
    });

    uploadedImagesList.appendChild(item);
  });
}

function formatFileSize(bytes) {
  return bytes < 1024
    ? `${bytes} bytes`
    : bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function handleImageFile(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    showToast('Invalid image type. Only JPG, PNG, and GIF are accepted.', 'error');
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    showToast('Image is too large. Please upload files up to 5MB.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    state.images.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      sizeLabel: formatFileSize(file.size),
      src: reader.result,
    });
    renderImages();
    saveState();
    showToast('Image uploaded successfully.');
  };
  reader.readAsDataURL(file);
}

function handleToolbar(format) {
  const before = descriptionInput.value.slice(0, descriptionInput.selectionStart);
  const selected = descriptionInput.value.slice(descriptionInput.selectionStart, descriptionInput.selectionEnd);
  const after = descriptionInput.value.slice(descriptionInput.selectionEnd);
  const token = format === 'bold' ? '**' : format === 'italic' ? '*' : '__';
  const wrapped = selected ? `${token}${selected}${token}` : `${token}${token}`;

  descriptionInput.value = `${before}${wrapped}${after}`;
  const cursorPosition = descriptionInput.selectionStart + wrapped.length;
  descriptionInput.setSelectionRange(cursorPosition, cursorPosition);
  descriptionInput.focus();
  updatePreviewDescription();
}

function getMonthHeader(date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function renderCalendar() {
  const today = new Date();
  const monthDate = new Date(today.getFullYear(), today.getMonth() + state.monthOffset, 1);
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDayIndex = monthDate.getDay();
  const totalDays = getDaysInMonth(year, month);

  calendarMonthYear.textContent = getMonthHeader(monthDate);
  calendarGrid.innerHTML = '';

  for (let i = 0; i < firstDayIndex; i += 1) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'date-cell disabled';
    emptyCell.innerHTML = '<button type="button" disabled></button>';
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const cell = document.createElement('div');
    cell.className = 'date-cell';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = day;

    const cellDate = new Date(year, month, day);
    const isoDate = cellDate.toISOString().split('T')[0];

    if (state.selectedDate === isoDate) {
      cell.classList.add('selected');
    }

    button.addEventListener('click', () => {
      state.selectedDate = isoDate;
      renderCalendar();
      renderTimeSlots();
      saveState();
    });

    cell.appendChild(button);
    calendarGrid.appendChild(cell);
  }
}

function renderTimeSlots() {
  if (!state.selectedDate) {
    selectedDateLabel.textContent = 'Select a date to view schedules';
    timeSlotsContainer.innerHTML = '';
    return;
  }

  const selected = new Date(state.selectedDate);
  selectedDateLabel.textContent = `Available times for ${selected.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })}`;

  const availableSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:00 PM'];
  timeSlotsContainer.innerHTML = '';

  availableSlots.forEach((slot) => {
    const slotElement = document.createElement('div');
    slotElement.className = 'time-slot available';
    slotElement.innerHTML = `
      <span>${slot}</span>
      <button type="button">Book</button>
    `;
    timeSlotsContainer.appendChild(slotElement);
  });
}

function generateShareUrl() {
  if (state.shareUrl) {
    return state.shareUrl;
  }

  const slug = state.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'booking-page';

  const token = Math.random().toString(36).slice(2, 10);
  const url = `https://bookconnect.app/booking/${slug}-${token}`;
  state.shareUrl = url;
  saveState();
  return url;
}

function copyShareLink() {
  const url = generateShareUrl();
  navigator.clipboard
    .writeText(url)
    .then(() => showToast('Link copied to clipboard.'))
    .catch(() => showToast('Unable to copy link in this browser.', 'error'));
}

function openPreviewTab() {
  const previewWindow = window.open('', '_blank');
  if (!previewWindow) {
    showToast('Unable to open preview. Please allow pop-ups.', 'error');
    return;
  }

  const imageMarkup = state.images
    .map((image) => `<img src="${image.src}" alt="${sanitizeText(image.name)}" class="preview-image">`)
    .join('');

  const previewHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${sanitizeText(state.title)} — Booking Preview</title>
  <style>
    body { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; background: #f4f7fb; color: #1a202c; }
    .page-wrapper { max-width: 980px; margin: 0 auto; padding: 2rem; }
    .hero { background: #fff; border-radius: 24px; padding: 2rem; box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08); }
    h1 { margin: 0 0 1rem; font-size: clamp(2rem, 2.5vw, 3rem); }
    .description { color: #5a6c7d; line-height: 1.75; font-size: 1rem; margin-bottom: 1.75rem; }
    .gallery { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-bottom: 1.75rem; }
    .gallery img { width: 100%; height: 220px; object-fit: cover; border-radius: 18px; }
    .calendar-card { background: #fff; border-radius: 18px; padding: 1.5rem; border: 1px solid #e8ecef; }
    .calendar-card h2 { margin-top: 0; font-size: 1.1rem; color: #1a202c; }
    .calendar-card .message { color: #65748b; margin: 0.75rem 0 0; }
  </style>
</head>
<body>
  <div class="page-wrapper">
    <div class="hero">
      <h1>${sanitizeText(state.title)}</h1>
      <div class="description">${parseDescription(state.description)}</div>
      <div class="gallery">${imageMarkup || '<div class="message">No images uploaded</div>'}</div>
      <div class="calendar-card">
        <h2>Available booking dates</h2>
        <p class="message">${state.selectedDate ? `Selected date: ${new Date(state.selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }` : 'Select a date on the booking page to see available time slots.'}</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  previewWindow.document.open();
  previewWindow.document.write(previewHtml);
  previewWindow.document.close();
}

function initializePage() {
  loadState();
  titleInput.value = state.title;
  descriptionInput.value = state.description;
  titleCharCount.textContent = titleInput.value.length;
  descriptionCharCount.textContent = descriptionInput.value.length;
  updatePreviewTitle();
  updatePreviewDescription();
  renderImages();
  renderCalendar();
  renderTimeSlots();
}

function addEventListeners() {
  titleInput.addEventListener('input', updatePreviewTitle);
  descriptionInput.addEventListener('input', updatePreviewDescription);

  toolbarButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const format = button.dataset.format;
      handleToolbar(format);
    });
  });

  uploadImageBtn.addEventListener('click', () => imageFileInput.click());

  imageFileInput.addEventListener('change', (event) => {
    const files = Array.from(event.target.files || []);
    files.forEach(handleImageFile);
    imageFileInput.value = '';
  });

  previewBtn.addEventListener('click', openPreviewTab);
  shareLinkBtn.addEventListener('click', copyShareLink);
  calendarPrevBtn.addEventListener('click', () => {
    state.monthOffset -= 1;
    renderCalendar();
    saveState();
  });
  calendarNextBtn.addEventListener('click', () => {
    state.monthOffset += 1;
    renderCalendar();
    saveState();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    addEventListeners();
  });
} else {
  initializePage();
  addEventListeners();
}
