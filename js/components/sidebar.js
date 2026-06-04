// Sidebar Component - Fixed
console.log('sidebar.js loaded');

// Inject workspace dropdown and modal directly into body (fixes overflow:hidden clipping issue)
function injectWorkspaceElements() {
  // Inject dropdown
  if (!document.getElementById('workspaceDropdown')) {
    const dropdownEl = document.createElement('div');
    dropdownEl.className = 'workspace-dropdown';
    dropdownEl.id = 'workspaceDropdown';
    dropdownEl.innerHTML = `
      <div class="workspace-item active" data-workspace="Ell - Work">
        <span>Ell - Work</span>
        <svg class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div class="workspace-divider"></div>
      <button class="add-workspace-btn" id="addWorkspaceBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add New Workspace
      </button>
    `;
    document.body.appendChild(dropdownEl);
  }

  // Inject modal
  if (!document.getElementById('workspaceModal')) {
    const modalEl = document.createElement('div');
    modalEl.className = 'modal-overlay';
    modalEl.id = 'workspaceModal';
    modalEl.innerHTML = `
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Add New Workspace</h2>
          <button class="modal-close-btn" id="closeModalBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <form class="workspace-form" id="workspaceForm">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Workspace Name</label>
                <input type="text" class="form-input" name="workspaceName" placeholder="Enter workspace name" required>
              </div>
              <div class="form-group">
                <label class="form-label">Class</label>
                <input type="text" class="form-input" name="class" placeholder="Enter class name" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Team</label>
                <input type="text" class="form-input" name="team" placeholder="Enter team name" required>
              </div>
              <div class="form-group">
                <label class="form-label">Country</label>
                <select class="form-select" name="country" required>
                  <option value="">Select country</option>
                  <option value="indonesia">Indonesia</option>
                  <option value="malaysia">Malaysia</option>
                  <option value="singapore">Singapore</option>
                  <option value="thailand">Thailand</option>
                  <option value="vietnam">Vietnam</option>
                  <option value="philippines">Philippines</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">State</label>
                <select class="form-select" name="state" required>
                  <option value="select">Select state</option>
                  <option value="aceh">Aceh</option>
                  <option value="bali">Bali</option>
                  <option value="banten">Banten</option>
                  <option value="yogyakarta">DI Yogyakarta</option>
                  <option value="jakarta">DKI Jakarta</option>
                  <option value="jambi">Jambi</option>
                  <option value="jawabarat">Jawa Barat</option>
                  <option value="jawatengah">Jawa Tengah</option>
                  <option value="jawatimur">Jawa Timur</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">City</label>
                <input type="text" class="form-input" name="city" placeholder="Enter city" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Time Zone</label>
                <select class="form-select" name="timezone" required>
                  <option value="">Select time zone</option>
                  <option value="utc+7">UTC+7 (WIB)</option>
                  <option value="utc+8">UTC+8 (WITA)</option>
                  <option value="utc+9">UTC+9 (WIT)</option>
                  <option value="utc+8sg">UTC+8 (SGT)</option>
                  <option value="utc+8my">UTC+8 (MYT)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Address</label>
                <input type="text" class="form-input" name="address" placeholder="Enter address" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Location</label>
              <div class="map-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8b95a1" stroke-width="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <p>Map will be displayed here</p>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" id="cancelBtn">Cancel</button>
          <button class="btn-save" id="saveWorkspaceBtn">Save Workspace</button>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);
  }
}

function renderSidebar(activePage = 'dashboard') {
  // Inject workspace dropdown directly into body (fixes overflow:hidden clipping issue)
  

  const sidebarHTML = `
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="assets/images/logo.png" alt="BookConnect logo" class="logo-img">
        <button type="button" class="sidebar-toggle-btn" aria-label="Toggle sidebar">
          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      </div>

      <div class="workspace-selector" id="workspaceSelector">
        <span class="current-workspace">Ell - Work</span>
        <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      <div class="nav-section">
        <div class="nav-label">Navigation</div>
        <nav class="nav-menu">
          <a href="dashboard.html" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}" data-tooltip="Dashboard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span class="nav-item-label">Dashboard</span>
          </a>
          <a href="appointment.html" class="nav-item ${activePage === 'appointment' ? 'active' : ''}" data-tooltip="Appointment">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
            </svg>
            <span class="nav-item-label">Appointment</span>
          </a>
          <a href="team.html" class="nav-item ${activePage === 'team' ? 'active' : ''}" data-tooltip="Team">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span class="nav-item-label">Team</span>
          </a>
          <a href="boxing.html" class="nav-item ${activePage === 'boxing' ? 'active' : ''}" data-tooltip="Boxing">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="21 8 21 21 3 21 3 8"/>
              <rect x="1" y="3" width="22" height="5"/>
              <line x1="10" y1="12" x2="14" y2="12"/>
            </svg>
            <span class="nav-item-label">Boxing</span>
          </a>
        </nav>
      </div>

      <div class="nav-section">
        <div class="nav-label">Configuration</div>
        <nav class="nav-menu">
          <a href="booking-page.html" class="nav-item ${activePage === 'booking-page' ? 'active' : ''}" data-tooltip="Booking Page">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span class="nav-item-label">Booking Page</span>
          </a>
          <a href="schedule-exception.html" class="nav-item ${activePage === 'schedule-exception' ? 'active' : ''}" data-tooltip="Schedule Exception">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
            <span class="nav-item-label">Schedule Exception</span>
          </a>
          <a href="workspace.html" class="nav-item ${activePage === 'workspace' ? 'active' : ''}" data-tooltip="Workspace">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <span class="nav-item-label">Workspace</span>
          </a>
          <a href="log.html" class="nav-item ${activePage === 'log' ? 'active' : ''}" data-tooltip="Log">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span class="nav-item-label">Log</span>
          </a>
          <a href="settings.html" class="nav-item ${activePage === 'settings' ? 'active' : ''}" data-tooltip="Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            <span class="nav-item-label">Settings</span>
          </a>
        </nav>
      </div>

      <div class="sidebar-footer">
        <div class="user-info-sidebar">
          <div class="user-avatar-sidebar">V</div>
          <div class="user-details">
            <span class="user-name-sidebar">Vellina Kusuma</span>
            <span class="user-role-sidebar">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  `;

  return sidebarHTML;
}

function updateSidebarToggle(hidden) {
  const dashboard = document.querySelector('.dashboard-container');
  const toggleButton = document.querySelector('.sidebar-toggle-btn');

  if (!dashboard || !toggleButton) return;

  if (hidden) {
    dashboard.classList.add('sidebar-hidden');
  } else {
    dashboard.classList.remove('sidebar-hidden');
  }

  const logoImg = document.querySelector('.sidebar-header .logo-img');
  if (logoImg) {
    logoImg.src = hidden ? 'assets/images/logoaja.png' : 'assets/images/logo.png';
  }

  localStorage.setItem('bookconnect_sidebar_hidden', hidden);
}

let sidebarToggleListenerAttached = false;

function initializeSidebarToggle() {
  const sidebarContainer = document.getElementById('app-sidebar');
  if (!sidebarContainer) return;

  localStorage.removeItem('bookconnect_sidebar_hidden');

  const hidden = localStorage.getItem('bookconnect_sidebar_hidden') === 'true';
  updateSidebarToggle(hidden ? true : false);

  const toggleButton = document.querySelector('.sidebar-toggle-btn');
  if (toggleButton && !sidebarToggleListenerAttached) {
    toggleButton.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const dashboard = document.querySelector('.dashboard-container');
      if (dashboard) {
        const isHidden = dashboard.classList.contains('sidebar-hidden');
        updateSidebarToggle(!isHidden);
      }
    });
    sidebarToggleListenerAttached = true;
  }
}

// Auto-inject sidebar on page load
let sidebarInitialized = false;

function initializeSidebar() {
  if (sidebarInitialized) return;
  
  injectWorkspaceElements();
  const sidebarContainer = document.getElementById('app-sidebar');
  if (sidebarContainer && !sidebarContainer.querySelector('.sidebar')) {
    const activePage = sidebarContainer.getAttribute('data-page') || 'dashboard';
    sidebarContainer.innerHTML = renderSidebar(activePage);
    sidebarInitialized = true;
    initializeSidebarToggle();
    initializeWorkspaceSelector();
  }
}

document.addEventListener('DOMContentLoaded', initializeSidebar);

// Fallback
setTimeout(initializeSidebar, 100);

window.addEventListener('sidebar-topbar-ready', function () {
  if (sidebarInitialized) return;
  injectWorkspaceElements();
  initializeSidebarToggle();
  initializeWorkspaceSelector();
});

// ─── WORKSPACE DROPDOWN & MODAL ───
let workspaceSelectorInitialized = false;

function initializeWorkspaceSelector() {
  if (workspaceSelectorInitialized) return;

  console.log('initializeWorkspaceSelector called');

  const workspaceSelector = document.getElementById('workspaceSelector');
  const workspaceDropdown = document.getElementById('workspaceDropdown');
  const workspaceModal = document.getElementById('workspaceModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const saveWorkspaceBtn = document.getElementById('saveWorkspaceBtn');
  const workspaceForm = document.getElementById('workspaceForm');

  if (!workspaceSelector || !workspaceDropdown) {
    console.warn('Workspace selector or dropdown not found');
    return;
  }

  // ── Toggle dropdown open/close ──
  workspaceSelector.addEventListener('click', function (e) {
    e.stopPropagation();

    const isOpen = workspaceDropdown.classList.contains('show');

    if (isOpen) {
      workspaceDropdown.classList.remove('show');
      return;
    }

    // Position dropdown below the selector
    const rect = workspaceSelector.getBoundingClientRect();
    workspaceDropdown.style.top = (rect.bottom + 6) + 'px';
    workspaceDropdown.style.left = rect.left + 'px';
    workspaceDropdown.style.width = Math.max(rect.width, 200) + 'px';

    workspaceDropdown.classList.add('show');
  });

  // ── Close dropdown when clicking outside ──
  document.addEventListener('click', function (e) {
    if (
      !workspaceSelector.contains(e.target) &&
      !workspaceDropdown.contains(e.target)
    ) {
      workspaceDropdown.classList.remove('show');
    }
  });

  // ── Open modal from "Add New Workspace" button ──
  // Use event delegation on dropdown since items may be added dynamically
  workspaceDropdown.addEventListener('click', function (e) {
    const addBtn = e.target.closest('#addWorkspaceBtn');
    if (addBtn) {
      e.stopPropagation();
      workspaceDropdown.classList.remove('show');
      if (workspaceModal) { workspaceModal.classList.add('show'); }
    }

    // ── Handle workspace item selection ──
    const item = e.target.closest('.workspace-item');
    if (item) {
      e.stopPropagation();
      const name = item.querySelector('span').textContent;

      // Update active state
      workspaceDropdown.querySelectorAll('.workspace-item').forEach(i => {
        i.classList.remove('active');
        const icon = i.querySelector('.check-icon');
        if (icon) icon.style.display = 'none';
      });

      item.classList.add('active');
      const checkIcon = item.querySelector('.check-icon');
      if (checkIcon) checkIcon.style.display = 'block';

      // Update selector label
      const currentWorkspace = workspaceSelector.querySelector('.current-workspace');
      if (currentWorkspace) currentWorkspace.textContent = name;

      workspaceDropdown.classList.remove('show');
    }
  });

  // ── Modal close helpers ──
  function closeModal() {
    if (workspaceModal) { workspaceModal.classList.remove('show'); }
    if (workspaceForm) workspaceForm.reset();
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (workspaceModal) {
    workspaceModal.addEventListener('click', function (e) {
      if (e.target === workspaceModal) closeModal();
    });
  }

  // ── Save new workspace ──
  if (saveWorkspaceBtn) {
    saveWorkspaceBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!workspaceForm.checkValidity()) {
        workspaceForm.reportValidity();
        return;
      }

      const formData = new FormData(workspaceForm);
      const workspaceName = formData.get('workspaceName');

      // Remove active from existing items
      workspaceDropdown.querySelectorAll('.workspace-item').forEach(i => {
        i.classList.remove('active');
        const icon = i.querySelector('.check-icon');
        if (icon) icon.style.display = 'none';
      });

      // Create and insert new workspace item before the divider
      const divider = workspaceDropdown.querySelector('.workspace-divider');
      const newItem = document.createElement('div');
      newItem.className = 'workspace-item active';
      newItem.setAttribute('data-workspace', workspaceName);
      newItem.innerHTML = `
        <span>${workspaceName}</span>
        <svg class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
      workspaceDropdown.insertBefore(newItem, divider);

      // Update selector label
      const currentWorkspace = workspaceSelector.querySelector('.current-workspace');
      if (currentWorkspace) currentWorkspace.textContent = workspaceName;

      closeModal();
      alert(`Workspace "${workspaceName}" has been created successfully!`);
    });
  }

  // ── Reposition on scroll/resize ──
  window.addEventListener('resize', repositionDropdown);
  window.addEventListener('scroll', repositionDropdown, true);

  function repositionDropdown() {
    if (!workspaceDropdown.classList.contains('show')) return;
    const rect = workspaceSelector.getBoundingClientRect();
    workspaceDropdown.style.top = (rect.bottom + 6) + 'px';
    workspaceDropdown.style.left = rect.left + 'px';
    workspaceDropdown.style.width = Math.max(rect.width, 200) + 'px';
  }

  // ── Close dropdown when sidebar collapses ──
  const dashboard = document.querySelector('.dashboard-container');
  if (dashboard) {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === 'class') {
          if (dashboard.classList.contains('sidebar-hidden')) {
            workspaceDropdown.classList.remove('show');
          }
        }
      });
    }).observe(dashboard, { attributes: true });
  }

  console.log('Workspace selector initialized successfully');
  workspaceSelectorInitialized = true;
}