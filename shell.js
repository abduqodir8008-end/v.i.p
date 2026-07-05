// ============================================
// COFEATURE — umumiy interfeys tizimi
// Login (ism/familiya), chap yon menyu, til va
// akkauntdan chiqish. Barcha sahifalarda ishlaydi.
// ============================================

const SKZ_USER_KEY = 'skinoz_user_v1';
const SKZ_LANG_KEY = 'skinoz_lang_v1';

const SKZ_I18N = {
  uz: {
    loginTitle: "Xush kelibsiz!",
    loginSubtitle: "Davom etish uchun ism va familiyangizni kiriting",
    firstName: "Ismingiz",
    lastName: "Familiyangiz",
    loginBtn: "KIRISH",
    loginError: "Iltimos, ism va familiyangizni to'ldiring",
    lobby: "Bosh sahifa",
    gamesLabel: "O'YINLAR",
    wheel: "Wheel (Ruletka)",
    crash: "Crash",
    mines: "Mines",
    plinko: "Plinko",
    coinflip: "CoinFlip",
    cases: "Keyslar",
    inventory: "Inventar",
    upgrader: "Apgreyder",
    leaderboard: "Reyting",
    profile: "Profil",
    sell: "Sotish",
    sellAll: "Hammasini sotish",
    emptyInventory: "Inventaringiz bo'sh. Keyslarni oching!",
    upgradeChance: "Yutish ehtimoli",
    upgradeBtn: "APGREYD QILISH",
    pickItemFirst: "Avval inventardan sovg'a tanlang",
    settingsLabel: "SOZLAMALAR",
    language: "Til",
    sound: "Ovoz effektlari",
    logout: "Akkauntdan chiqish",
    logoutConfirm: "Akkauntdan chiqmoqchimisiz? Balansingiz saqlanib qoladi.",
    balance: "Balans",
    resetBalance: "Balansni tiklash",
    resetConfirm: "Balansni 10 000 ga qaytarasizmi?",
    editProfile: "Profilni tahrirlash",
    profileModalTitle: "Profil sozlamalari",
    avatarHint: "Avatar qo'yish uchun bosing",
    removeAvatar: "Avatarni o'chirish",
    firstNameLabel: "Ism",
    lastNameLabel: "Familiya",
    saveBtn: "Saqlash",
    cancelBtn: "Bekor qilish",
    profileSaved: "Profil saqlandi",
    profileNameError: "Ism va familiyani to'ldiring",
    gateHeroTitle: "O'ynang, <span>yutib oling</span>, zavqlaning",
    gateHeroSub: "Coinflip, Crash, Mines, Plinko, Wheel va Keyslar — bittа joyda. Barcha o'yinlar bepul demo balans bilan ishlaydi.",
    gateFeature1: "🎮 5+ o'yin",
    gateFeature2: "⚡ Tezkor natija",
    gateFeature3: "🔒 Xavfsiz demo",
    dailyHub: "Kunlik bonus",
  },
  ru: {
    loginTitle: "Добро пожаловать!",
    loginSubtitle: "Введите имя и фамилию, чтобы продолжить",
    firstName: "Имя",
    lastName: "Фамилия",
    loginBtn: "ВОЙТИ",
    loginError: "Пожалуйста, заполните имя и фамилию",
    lobby: "Главная",
    gamesLabel: "ИГРЫ",
    wheel: "Wheel (Рулетка)",
    crash: "Crash",
    mines: "Mines",
    plinko: "Plinko",
    coinflip: "CoinFlip",
    cases: "Кейсы",
    inventory: "Инвентарь",
    upgrader: "Апгрейдер",
    leaderboard: "Рейтинг",
    profile: "Профиль",
    sell: "Продать",
    sellAll: "Продать всё",
    emptyInventory: "Ваш инвентарь пуст. Откройте кейсы!",
    upgradeChance: "Шанс успеха",
    upgradeBtn: "АПГРЕЙД",
    pickItemFirst: "Сначала выберите предмет из инвентаря",
    settingsLabel: "НАСТРОЙКИ",
    language: "Язык",
    sound: "Звуковые эффекты",
    logout: "Выйти из аккаунта",
    logoutConfirm: "Выйти из аккаунта? Баланс сохранится.",
    balance: "Баланс",
    resetBalance: "Сбросить баланс",
    resetConfirm: "Сбросить баланс до 10 000?",
    editProfile: "Редактировать профиль",
    profileModalTitle: "Настройки профиля",
    avatarHint: "Нажмите, чтобы выбрать аватар",
    removeAvatar: "Удалить аватар",
    firstNameLabel: "Имя",
    lastNameLabel: "Фамилия",
    saveBtn: "Сохранить",
    cancelBtn: "Отмена",
    profileSaved: "Профиль сохранён",
    profileNameError: "Заполните имя и фамилию",
    gateHeroTitle: "Играй, <span>выигрывай</span>, наслаждайся",
    gateHeroSub: "Coinflip, Crash, Mines, Plinko, Wheel и Кейсы — всё в одном месте. Демо-баланс, без реальных денег.",
    gateFeature1: "🎮 5+ игр",
    gateFeature2: "⚡ Быстрый результат",
    gateFeature3: "🔒 Безопасное демо",
    dailyHub: "Ежедневный бонус",
  },
  en: {
    loginTitle: "Welcome!",
    loginSubtitle: "Enter your first and last name to continue",
    firstName: "First name",
    lastName: "Last name",
    loginBtn: "ENTER",
    loginError: "Please fill in your first and last name",
    lobby: "Lobby",
    gamesLabel: "GAMES",
    wheel: "Wheel",
    crash: "Crash",
    mines: "Mines",
    plinko: "Plinko",
    coinflip: "CoinFlip",
    cases: "Cases",
    inventory: "Inventory",
    upgrader: "Upgrader",
    leaderboard: "Leaderboard",
    profile: "Profile",
    sell: "Sell",
    sellAll: "Sell all",
    emptyInventory: "Your inventory is empty. Open some cases!",
    upgradeChance: "Win chance",
    upgradeBtn: "UPGRADE",
    pickItemFirst: "Pick an item from your inventory first",
    settingsLabel: "SETTINGS",
    language: "Language",
    sound: "Sound effects",
    logout: "Log out",
    logoutConfirm: "Log out? Your balance will be kept.",
    balance: "Balance",
    resetBalance: "Reset balance",
    resetConfirm: "Reset balance to 10 000?",
    editProfile: "Edit profile",
    profileModalTitle: "Profile settings",
    avatarHint: "Click to choose an avatar",
    removeAvatar: "Remove avatar",
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    saveBtn: "Save",
    cancelBtn: "Cancel",
    profileSaved: "Profile saved",
    profileNameError: "Please fill in first and last name",
    gateHeroTitle: "Play, <span>win</span>, enjoy",
    gateHeroSub: "Coinflip, Crash, Mines, Plinko, Wheel and Cases — all in one place. Every game runs on a free demo balance.",
    gateFeature1: "🎮 5+ games",
    gateFeature2: "⚡ Instant results",
    gateFeature3: "🔒 Safe demo",
    dailyHub: "Daily bonus",
  }
};

function skzGetLang() {
  return localStorage.getItem(SKZ_LANG_KEY) || 'uz';
}
function skzSetLang(lang) {
  localStorage.setItem(SKZ_LANG_KEY, lang);
  skzBuildShell();
}
function skzT(key) {
  const lang = skzGetLang();
  return (SKZ_I18N[lang] && SKZ_I18N[lang][key]) || SKZ_I18N.uz[key] || key;
}

function skzGetUser() {
  try {
    return JSON.parse(localStorage.getItem(SKZ_USER_KEY));
  } catch (e) { return null; }
}
function skzSetUser(first, last) {
  const prev = skzGetUser();
  localStorage.setItem(SKZ_USER_KEY, JSON.stringify({
    first: first.trim(),
    last: last.trim(),
    avatar: prev && prev.avatar ? prev.avatar : null
  }));
}
// Ism/familiya va avatarni birgalikda yangilaydi (Profil sozlamalari oynasi uchun)
function skzUpdateProfile(first, last, avatar) {
  const user = skzGetUser() || {};
  const updated = {
    first: (first || '').trim() || user.first || '',
    last: (last || '').trim() || user.last || '',
    avatar: typeof avatar !== 'undefined' ? avatar : (user.avatar || null)
  };
  localStorage.setItem(SKZ_USER_KEY, JSON.stringify(updated));
  skzBuildShell();
  return updated;
}
function skzLogout() {
  if (!confirm(skzT('logoutConfirm'))) return;
  localStorage.removeItem(SKZ_USER_KEY);
  location.reload();
}

// ---------- LOGIN GATE ----------
function skzShowLoginGate() {
  if (document.getElementById('skzLoginGate')) return;
  const wrap = document.createElement('div');
  wrap.id = 'skzLoginGate';
  wrap.className = 'skz-gate';
  wrap.innerHTML = `
    <div class="skz-gate-hero">
      <div class="skz-gate-orb" style="width:220px;height:220px;top:8%;left:6%;background:radial-gradient(circle,rgba(47, 111, 237, 0.35),transparent 70%);"></div>
      <div class="skz-gate-orb" style="width:260px;height:260px;bottom:6%;right:8%;background:radial-gradient(circle,rgba(56, 189, 248, 0.3),transparent 70%);animation-delay:2s;"></div>
      <div class="skz-gate-orb" style="width:160px;height:160px;bottom:20%;left:20%;background:radial-gradient(circle,rgba(168,85,247,0.3),transparent 70%);animation-delay:4s;"></div>
    </div>
    <div class="skz-gate-side">
      <div class="skz-gate-logo" style="margin-bottom:0;">💎 COFEATURE</div>
      <div class="skz-gate-side-title">${skzT('gateHeroTitle')}</div>
      <div class="skz-gate-side-sub">${skzT('gateHeroSub')}</div>
      <div class="skz-gate-feature-row">
        <div class="skz-gate-feature">${skzT('gateFeature1')}</div>
        <div class="skz-gate-feature">${skzT('gateFeature2')}</div>
        <div class="skz-gate-feature">${skzT('gateFeature3')}</div>
      </div>
    </div>
    <div class="skz-gate-card">
      <div class="skz-gate-logo">💎 COFEATURE</div>
      <div class="skz-gate-title">${skzT('loginTitle')}</div>
      <div class="skz-gate-subtitle">${skzT('loginSubtitle')}</div>
      <input class="skz-gate-input" id="skzFirstName" placeholder="${skzT('firstName')}" autocomplete="off">
      <input class="skz-gate-input" id="skzLastName" placeholder="${skzT('lastName')}" autocomplete="off">
      <div class="skz-gate-error" id="skzGateError"></div>
      <button class="primary-btn" id="skzGateBtn">${skzT('loginBtn')}</button>
    </div>
  `;
  document.body.appendChild(wrap);
  document.body.classList.add('skz-locked');

  const submit = () => {
    const first = document.getElementById('skzFirstName').value;
    const last = document.getElementById('skzLastName').value;
    if (!first.trim() || !last.trim()) {
      document.getElementById('skzGateError').innerText = skzT('loginError');
      return;
    }
    skzSetUser(first, last);
    document.body.classList.remove('skz-locked');
    wrap.classList.add('skz-gate-out');
    setTimeout(() => wrap.remove(), 350);
    skzBuildShell();
  };

  document.getElementById('skzGateBtn').onclick = submit;
  wrap.querySelectorAll('.skz-gate-input').forEach(inp => {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
  });
}

// ---------- SIDEBAR ----------
const SKZ_NAV_ITEMS = [
  { href: 'index.html', icon: '🏠', key: 'lobby' },
  { href: 'cases.html', icon: '🎁', key: 'cases' },
  { href: 'upgrade.html', icon: '⚡', key: 'upgrader' },
  { href: 'inventory.html', icon: '🎒', key: 'inventory' },
  { href: 'leaderboard.html', icon: '🏆', key: 'leaderboard' },
  { href: 'profile.html', icon: '📊', key: 'profile' },
];

function skzCurrentPage() {
  const p = location.pathname.split('/').pop();
  return p || 'index.html';
}

function skzBuildShell() {
  const user = skzGetUser();
  const lang = skzGetLang();
  const current = skzCurrentPage();
  const initials = user ? (user.first[0] + (user.last[0] || '')).toUpperCase() : '?';
  const fullName = user ? `${user.first} ${user.last}` : '—';

  let existing = document.getElementById('skzSidebar');
  if (existing) existing.remove();
  let overlay = document.getElementById('skzOverlay');
  if (overlay) overlay.remove();
  let burger = document.getElementById('skzBurger');
  if (burger) burger.remove();

  // Hamburger trigger — injected into the topbar if present
  const topbarLeft = document.querySelector('.topbar-left');
  const burgerBtn = document.createElement('button');
  burgerBtn.id = 'skzBurger';
  burgerBtn.className = 'skz-burger';
  burgerBtn.setAttribute('aria-label', 'menu');
  burgerBtn.innerHTML = '<span></span><span></span><span></span>';
  burgerBtn.onclick = skzToggleSidebar;
  if (topbarLeft) {
    topbarLeft.prepend(burgerBtn);
  } else {
    document.body.prepend(burgerBtn);
  }

  const navHtml = SKZ_NAV_ITEMS.map(item => `
    <a class="skz-nav-item ${current === item.href ? 'active' : ''}" href="${item.href}">
      <span class="skz-nav-icon">${item.icon}</span>
      <span>${skzT(item.key)}</span>
      ${item.key === 'inventory' ? '<span class="js-inv-count skz-nav-badge">0</span>' : ''}
    </a>
  `).join('');

  const langHtml = ['uz', 'ru', 'en'].map(l => `
    <button class="skz-lang-btn ${lang === l ? 'active' : ''}" data-lang="${l}">${l.toUpperCase()}</button>
  `).join('');

  const sidebar = document.createElement('div');
  sidebar.id = 'skzSidebar';
  sidebar.className = 'skz-sidebar';
  sidebar.innerHTML = `
    <div class="skz-sidebar-brand">💎 COFEATURE</div>

    <div class="skz-user-card">
      <div class="skz-avatar" id="skzAvatarPreviewSidebar">${user && user.avatar ? `<img src="${user.avatar}" alt="avatar">` : initials}</div>
      <div class="skz-user-info">
        <div class="skz-user-name">${fullName}</div>
        <div class="skz-user-vip js-vip-badge">Lv.1 Bronza I</div>
        <div class="skz-user-balance">💎 <span class="js-balance">0</span></div>
      </div>
    </div>

    <button class="skz-daily-btn" id="skzDailyHubBtn">
      <span>🎁</span> ${skzT('dailyHub')}
      <span class="skz-daily-badge" id="skzDailyBadge" style="display:none;"></span>
    </button>

    <div class="skz-nav-label">${skzT('gamesLabel')}</div>
    <nav class="skz-nav">${navHtml}</nav>

    <div class="skz-nav-label">${skzT('settingsLabel')}</div>
    <div class="skz-settings-block">
      <div class="skz-settings-row">
        <span>${skzT('language')}</span>
        <div class="skz-lang-group">${langHtml}</div>
      </div>
      <div class="skz-settings-row">
        <span>${skzT('sound')}</span>
        <button class="js-sound-toggle" id="skzSoundToggleBtn" title="${skzT('sound')}">🔊</button>
      </div>
      <button class="skz-settings-btn" id="skzEditProfileBtn">✏️ ${skzT('editProfile')}</button>
      <button class="skz-settings-btn" id="skzResetBtn">🔄 ${skzT('resetBalance')}</button>
      <button class="skz-settings-btn skz-logout-btn" id="skzLogoutBtn">🚪 ${skzT('logout')}</button>
    </div>
  `;
  document.body.appendChild(sidebar);

  const ov = document.createElement('div');
  ov.id = 'skzOverlay';
  ov.className = 'skz-overlay';
  ov.onclick = skzCloseSidebar;
  document.body.appendChild(ov);

  // Sidebar katta ekranlarda (desktop) standart holatda OCHIQ turadi.
  // Telefon formatida esa ekranni to'liq yopib qo'ymasligi uchun YOPIQ
  // holatda boshlanadi — burger tugmasi orqali ochiladi/yopiladi.
  const isDesktop = window.innerWidth >= 900;
  if (isDesktop) {
    sidebar.classList.add('open');
    document.body.classList.add('skz-sidebar-open');
  } else {
    sidebar.classList.remove('open');
    document.body.classList.remove('skz-sidebar-open');
  }

  sidebar.querySelectorAll('.skz-lang-btn').forEach(btn => {
    btn.onclick = () => skzSetLang(btn.dataset.lang);
  });
  const dailyBtn = document.getElementById('skzDailyHubBtn');
  if (dailyBtn) dailyBtn.onclick = () => { if (typeof skzShowDailyHubModal === 'function') skzShowDailyHubModal(); };
  document.getElementById('skzLogoutBtn').onclick = skzLogout;
  document.getElementById('skzEditProfileBtn').onclick = skzShowProfileModal;
  document.getElementById('skzResetBtn').onclick = () => {
    if (confirm(skzT('resetConfirm'))) skzResetBalance();
  };
  const soundBtn = document.getElementById('skzSoundToggleBtn');
  if (soundBtn) soundBtn.onclick = () => { if (typeof skzToggleSound === 'function') skzToggleSound(); };

  if (typeof skzRenderBalance === 'function') skzRenderBalance();
  if (typeof skzRenderVipBadge === 'function') skzRenderVipBadge();
  if (typeof skzRenderSoundToggle === 'function') skzRenderSoundToggle();
  if (typeof skzRenderDailyBadge === 'function') skzRenderDailyBadge();
}

// ---------- PROFILE SETTINGS MODAL ----------
function skzFileToDataUrl(file, cb) {
  const reader = new FileReader();
  reader.onload = () => cb(reader.result);
  reader.readAsDataURL(file);
}

function skzShowProfileModal() {
  if (document.getElementById('skzProfileModal')) return;
  const user = skzGetUser() || { first: '', last: '', avatar: null };
  let pendingAvatar = user.avatar || null;

  const wrap = document.createElement('div');
  wrap.id = 'skzProfileModal';
  wrap.className = 'skz-modal-overlay';
  wrap.innerHTML = `
    <div class="skz-modal">
      <div class="skz-modal-title">${skzT('profileModalTitle')}</div>
      <div class="skz-modal-avatar-row">
        <div class="skz-modal-avatar" id="skzAvatarPreview">
          ${user.avatar ? `<img src="${user.avatar}" alt="avatar">` : `<span>${((user.first || '?')[0] + (user.last ? user.last[0] : '')).toUpperCase()}</span>`}
        </div>
        <div class="skz-modal-avatar-actions">
          <label class="skz-modal-upload-btn" for="skzAvatarInput">🖼️ ${skzT('avatarHint')}</label>
          <input type="file" id="skzAvatarInput" accept="image/*" style="display:none;">
          <button class="skz-modal-remove-btn" id="skzAvatarRemoveBtn" style="${user.avatar ? '' : 'display:none;'}">✕ ${skzT('removeAvatar')}</button>
        </div>
      </div>
      <label class="skz-modal-label">${skzT('firstNameLabel')}</label>
      <input class="skz-gate-input" id="skzProfileFirst" value="${(user.first || '').replace(/"/g, '&quot;')}">
      <label class="skz-modal-label">${skzT('lastNameLabel')}</label>
      <input class="skz-gate-input" id="skzProfileLast" value="${(user.last || '').replace(/"/g, '&quot;')}">
      <div class="skz-gate-error" id="skzProfileError"></div>
      <div class="skz-modal-actions">
        <button class="skz-settings-btn" id="skzProfileCancelBtn">${skzT('cancelBtn')}</button>
        <button class="primary-btn" id="skzProfileSaveBtn">${skzT('saveBtn')}</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  const close = () => wrap.remove();
  wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
  document.getElementById('skzProfileCancelBtn').onclick = close;

  document.getElementById('skzAvatarInput').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    skzFileToDataUrl(file, (dataUrl) => {
      pendingAvatar = dataUrl;
      document.getElementById('skzAvatarPreview').innerHTML = `<img src="${dataUrl}" alt="avatar">`;
      document.getElementById('skzAvatarRemoveBtn').style.display = '';
    });
  });

  document.getElementById('skzAvatarRemoveBtn').onclick = () => {
    pendingAvatar = null;
    const first = document.getElementById('skzProfileFirst').value || user.first || '?';
    const last = document.getElementById('skzProfileLast').value || '';
    document.getElementById('skzAvatarPreview').innerHTML = `<span>${(first[0] + (last[0] || '')).toUpperCase()}</span>`;
    document.getElementById('skzAvatarRemoveBtn').style.display = 'none';
  };

  document.getElementById('skzProfileSaveBtn').onclick = () => {
    const first = document.getElementById('skzProfileFirst').value;
    const last = document.getElementById('skzProfileLast').value;
    if (!first.trim() || !last.trim()) {
      document.getElementById('skzProfileError').innerText = skzT('profileNameError');
      return;
    }
    skzUpdateProfile(first, last, pendingAvatar);
    close();
    if (typeof showToast === 'function') showToast('✅ ' + skzT('profileSaved'), 'win');
  };
}

function skzToggleSidebar() {
  const isOpen = document.getElementById('skzSidebar').classList.toggle('open');
  document.getElementById('skzOverlay').classList.toggle('open', isOpen);
  document.getElementById('skzBurger').classList.toggle('open', isOpen);
  document.body.classList.toggle('skz-sidebar-open', isOpen);
}
function skzCloseSidebar() {
  document.getElementById('skzSidebar').classList.remove('open');
  document.getElementById('skzOverlay').classList.remove('open');
  document.getElementById('skzBurger').classList.remove('open');
  document.body.classList.remove('skz-sidebar-open');
}

document.addEventListener('DOMContentLoaded', () => {
  skzBuildShell();
  if (!skzGetUser()) {
    skzShowLoginGate();
  }
});
