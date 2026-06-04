const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const langButtons = document.querySelectorAll('.lang-option');
const loginForm = document.getElementById('loginForm');

const translations = {
  en: {
    heading: 'Login to your account',
    welcome: 'Welcome back',
    emailLabel: 'Email',
    emailPlaceholder: 'name@company.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    remember: 'Remember me',
    forgot: 'Forgot password?',
    submit: 'Sign in',
    or: 'or',
    google: 'Continue with Google',
    register: 'Don\'t have an account? <a href="#">Sign up</a>',
  },
  id: {
    heading: 'Login ke akun Anda',
    welcome: 'Selamat datang kembali',
    emailLabel: 'Email',
    emailPlaceholder: 'name@company.com',
    passwordLabel: 'Kata sandi',
    passwordPlaceholder: 'Masukkan kata sandi',
    remember: 'Simpan masuk',
    forgot: 'Lupa kata sandi?',
    submit: 'Masuk',
    or: 'atau',
    google: 'Masuk dengan Google',
    register: 'Belum punya akun? <a href="#">Daftar sekarang</a>',
  },
};

function setLanguage(lang) {
  const data = translations[lang] || translations.en;
  document.querySelector('.form-head h2').textContent = data.heading;
  document.querySelector('.form-label').textContent = data.welcome;
  document.querySelector('label[for="email"]').textContent = data.emailLabel;
  document.getElementById('email').placeholder = data.emailPlaceholder;
  document.querySelector('label[for="password"]').textContent = data.passwordLabel;
  passwordInput.placeholder = data.passwordPlaceholder;
  document.querySelector('.remember-text').textContent = data.remember;
  document.querySelector('.link-secondary').textContent = data.forgot;
  document.querySelector('.btn-primary').textContent = data.submit;
  document.querySelector('.divider span').textContent = data.or;
  const googleText = document.querySelector('.google-text');
  if (googleText) googleText.textContent = data.google;
  document.querySelector('.register-note').innerHTML = data.register;
  localStorage.setItem('bookconnect-lang', lang);

  langButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });
}

function handleTogglePassword() {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
}

function handleLanguageClick(event) {
  const lang = event.target.dataset.lang;
  if (!lang) return;
  setLanguage(lang);
}

function handleSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert('Silakan isi email dan kata sandi.');
    return;
  }

  alert('Login berhasil (demo UI only).');
}

if (togglePassword) {
  togglePassword.addEventListener('click', handleTogglePassword);
}

langButtons.forEach((button) => {
  button.addEventListener('click', handleLanguageClick);
});

if (loginForm) {
  loginForm.addEventListener('submit', handleSubmit);
}

const savedLang = localStorage.getItem('bookconnect-lang') || 'id';
setLanguage(savedLang);
