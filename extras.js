// ============================================
// COFEATURE — qo'shimcha tizimlar:
// Statistika, Yutuqlar (Achievements), Ovoz effektlari,
// Konfetti animatsiyasi va demo Reyting jadvali.
// Barcha sahifalarga ulanadi (balance.js dan keyin yuklanadi).
// ============================================

// ---------------------------------------------
// OVOZ EFFEKTLARI (WebAudio bilan sintez qilingan, fayl kerak emas)
// ---------------------------------------------
const SKZ_SOUND_KEY = 'skinoz_sound_v1';
let skzAudioCtx = null;

function skzSoundEnabled() {
  return localStorage.getItem(SKZ_SOUND_KEY) !== '0';
}
function skzSetSoundEnabled(on) {
  localStorage.setItem(SKZ_SOUND_KEY, on ? '1' : '0');
  skzRenderSoundToggle();
}
function skzToggleSound() {
  skzSetSoundEnabled(!skzSoundEnabled());
}
function skzGetAudioCtx() {
  if (!skzAudioCtx) {
    try {
      skzAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { return null; }
  }
  if (skzAudioCtx.state === 'suspended') skzAudioCtx.resume();
  return skzAudioCtx;
}

// bir yoki bir nechta tondan iborat oddiy signal chalish
function skzPlayTones(notes) {
  if (!skzSoundEnabled()) return;
  const ctx = skzGetAudioCtx();
  if (!ctx) return;
  let t = ctx.currentTime;
  notes.forEach(n => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = n.type || 'sine';
    osc.frequency.setValueAtTime(n.freq, t);
    if (n.slideTo) osc.frequency.exponentialRampToValueAtTime(n.slideTo, t + n.dur);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(n.vol || 0.14, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + n.dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + n.dur + 0.02);
    t += n.gap || 0;
  });
}

const skzSound = {
  click: () => skzPlayTones([{ freq: 520, dur: 0.06, vol: 0.08, type: 'square' }]),
  open: () => skzPlayTones([{ freq: 300, dur: 0.12, vol: 0.1, slideTo: 500 }]),
  win: () => skzPlayTones([
    { freq: 520, dur: 0.1, vol: 0.13, gap: 0.09 },
    { freq: 780, dur: 0.16, vol: 0.15 }
  ]),
  lose: () => skzPlayTones([
    { freq: 260, dur: 0.16, vol: 0.12, type: 'sawtooth', slideTo: 120 }
  ]),
  legendary: () => skzPlayTones([
    { freq: 523, dur: 0.11, vol: 0.16, gap: 0.1 },
    { freq: 659, dur: 0.11, vol: 0.16, gap: 0.1 },
    { freq: 784, dur: 0.11, vol: 0.16, gap: 0.1 },
    { freq: 1047, dur: 0.3, vol: 0.18 }
  ]),
  achievement: () => skzPlayTones([
    { freq: 660, dur: 0.09, vol: 0.14, gap: 0.09 },
    { freq: 880, dur: 0.22, vol: 0.16 }
  ])
};

function skzRenderSoundToggle() {
  const on = skzSoundEnabled();
  document.querySelectorAll('.js-sound-toggle').forEach(btn => {
    btn.innerText = on ? '🔊' : '🔇';
    btn.classList.toggle('active', on);
  });
}

// ---------------------------------------------
// KONFETTI / PORTLASH ANIMATSIYASI
// ---------------------------------------------
function skzConfettiBurst(opts) {
  opts = opts || {};
  const count = opts.count || 90;
  const colors = opts.colors || ['#2f6fed', '#38bdf8', '#a855f7', '#f59e0b', '#ffffff'];
  const duration = opts.duration || 2600;
  const gold = !!opts.gold;

  let canvas = document.getElementById('skzConfettiCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'skzConfettiCanvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
  }
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const W = window.innerWidth, H = window.innerHeight;
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: W / 2 + (Math.random() - 0.5) * W * 0.3,
      y: gold ? H * 0.25 : -10,
      vx: (Math.random() - 0.5) * (gold ? 9 : 7),
      vy: gold ? (Math.random() * -6 - 2) : (Math.random() * 3 + 1),
      size: Math.random() * (gold ? 8 : 6) + 4,
      color: gold ? (Math.random() < 0.5 ? '#f59e0b' : '#ffe08a') : colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 12,
      shape: Math.random() < 0.5 ? 'rect' : 'circle'
    });
  }

  const start = performance.now();
  function frame(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.vy += 0.16; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - elapsed / duration);
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    if (elapsed < duration) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, W, H);
      canvas.remove();
    }
  }
  requestAnimationFrame(frame);
}

function skzLegendaryEffect() {
  skzConfettiBurst({ count: 160, duration: 3200, gold: true });
  skzSound.legendary();
  skzScreenFlash('rgba(245,158,11,0.18)');
}

function skzScreenFlash(color) {
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;inset:0;background:${color};pointer-events:none;z-index:9998;opacity:1;transition:opacity 0.7s ease;`;
  document.body.appendChild(el);
  requestAnimationFrame(() => { el.style.opacity = '0'; });
  setTimeout(() => el.remove(), 750);
}

// ---------------------------------------------
// STATISTIKA
// ---------------------------------------------
const SKZ_STATS_KEY = 'skinoz_stats_v1';

function skzStatsDefault() {
  return {
    casesOpened: 0,
    giftsWon: 0,
    legendaryCount: 0,
    epicCount: 0,
    rareCount: 0,
    commonCount: 0,
    bestDropValue: 0,
    bestDropName: '',
    bestDropRarity: '',
    peakBalance: SKZ_START_BALANCE,
    totalWins: 0,
    totalLosses: 0
  };
}

function skzStatsGet() {
  try {
    const v = JSON.parse(localStorage.getItem(SKZ_STATS_KEY));
    return v && typeof v === 'object' ? Object.assign(skzStatsDefault(), v) : skzStatsDefault();
  } catch (e) { return skzStatsDefault(); }
}

function skzStatsSave(stats) {
  localStorage.setItem(SKZ_STATS_KEY, JSON.stringify(stats));
}

function skzStatsRecordCaseOpen() {
  const s = skzStatsGet();
  s.casesOpened += 1;
  skzStatsSave(s);
  skzCheckAchievements();
  if (typeof skzQuestsCheck === 'function') skzQuestsCheck();
}

// balance.js dagi skzAddInventoryItem har safar sovg'a qo'shganda chaqiradi
function skzStatsRecordGiftDrop(item) {
  const s = skzStatsGet();
  s.giftsWon += 1;
  if (item.rarity === 'legendary') s.legendaryCount += 1;
  else if (item.rarity === 'epic') s.epicCount += 1;
  else if (item.rarity === 'rare') s.rareCount += 1;
  else s.commonCount += 1;

  if (item.value > s.bestDropValue) {
    s.bestDropValue = item.value;
    s.bestDropName = item.name;
    s.bestDropRarity = item.rarity;
  }
  skzStatsSave(s);

  if (item.rarity === 'legendary') {
    skzLegendaryEffect();
  } else if (item.rarity === 'epic') {
    skzConfettiBurst({ count: 55, duration: 1800 });
  }
  skzCheckAchievements();
  if (typeof skzQuestsCheck === 'function') skzQuestsCheck();
}

function skzStatsRecordPeakBalance(balance) {
  const s = skzStatsGet();
  if (balance > s.peakBalance) {
    s.peakBalance = balance;
    skzStatsSave(s);
    skzCheckAchievements();
  }
}

function skzStatsRecordRoundResult(type) {
  if (type !== 'win' && type !== 'lose') return;
  const s = skzStatsGet();
  if (type === 'win') s.totalWins += 1;
  else s.totalLosses += 1;
  skzStatsSave(s);
  skzCheckAchievements();
  if (typeof skzQuestsCheck === 'function') skzQuestsCheck();
}

// Har qanday sahifadagi showToast() 'win'/'lose' chaqirganda avtomatik ishga tushadi
window.skzOnToast = function (type) {
  if (type === 'win') skzSound.win();
  else if (type === 'lose') skzSound.lose();
  skzStatsRecordRoundResult(type);
};

// ---------------------------------------------
// YUTUQLAR / ACHIEVEMENTS
// ---------------------------------------------
const SKZ_ACHV_KEY = 'skinoz_achievements_v1';

const SKZ_ACHIEVEMENTS = [
  { id: 'first_case', icon: '🎁', check: s => s.casesOpened >= 1,
    title: { uz: "Birinchi qadam", ru: "Первый шаг", en: "First step" },
    desc: { uz: "1 ta key oching", ru: "Откройте 1 кейс", en: "Open 1 case" } },
  { id: 'ten_cases', icon: '📦', check: s => s.casesOpened >= 10,
    title: { uz: "Tajribali", ru: "Опытный", en: "Experienced" },
    desc: { uz: "10 ta key oching", ru: "Откройте 10 кейсов", en: "Open 10 cases" } },
  { id: 'fifty_cases', icon: '🏭', check: s => s.casesOpened >= 50,
    title: { uz: "Key ustasi", ru: "Мастер кейсов", en: "Case master" },
    desc: { uz: "50 ta key oching", ru: "Откройте 50 кейсов", en: "Open 50 cases" } },
  { id: 'first_legendary', icon: '👑', check: s => s.legendaryCount >= 1,
    title: { uz: "Afsonaviy!", ru: "Легендарно!", en: "Legendary!" },
    desc: { uz: "1 ta Legendary sovg'a chiqaring", ru: "Получите 1 Legendary предмет", en: "Get 1 Legendary gift" } },
  { id: 'five_legendary', icon: '💎', check: s => s.legendaryCount >= 5,
    title: { uz: "Kolleksioner", ru: "Коллекционер", en: "Collector" },
    desc: { uz: "5 ta Legendary sovg'a chiqaring", ru: "Получите 5 Legendary предметов", en: "Get 5 Legendary gifts" } },
  { id: 'big_drop', icon: '🤑', check: s => s.bestDropValue >= 10000,
    title: { uz: "Katta drop", ru: "Крупный дроп", en: "Big drop" },
    desc: { uz: "Qiymati 10,000+ sovg'a chiqaring", ru: "Получите предмет ценой 10,000+", en: "Get a gift worth 10,000+" } },
  { id: 'rich_25k', icon: '💰', check: s => s.peakBalance >= 25000,
    title: { uz: "Boy o'yinchi", ru: "Богач", en: "High roller" },
    desc: { uz: "Balansni 25,000 ga yetkazing", ru: "Доведите баланс до 25,000", en: "Reach a balance of 25,000" } },
  { id: 'rich_100k', icon: '🏆', check: s => s.peakBalance >= 100000,
    title: { uz: "Milliarder", ru: "Магнат", en: "Tycoon" },
    desc: { uz: "Balansni 100,000 ga yetkazing", ru: "Доведите баланс до 100,000", en: "Reach a balance of 100,000" } },
  { id: 'ten_wins', icon: '🔥', check: s => s.totalWins >= 10,
    title: { uz: "Omadli", ru: "Везунчик", en: "Lucky streak" },
    desc: { uz: "O'yinlarda 10 marta yuting", ru: "Побеждайте 10 раз в играх", en: "Win 10 rounds in games" } },
  { id: 'fifty_wins', icon: '⚡', check: s => s.totalWins >= 50,
    title: { uz: "Chempion", ru: "Чемпион", en: "Champion" },
    desc: { uz: "O'yinlarda 50 marta yuting", ru: "Побеждайте 50 раз в играх", en: "Win 50 rounds in games" } },
];

function skzGetUnlockedAchievements() {
  try {
    const v = JSON.parse(localStorage.getItem(SKZ_ACHV_KEY));
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}

function skzCheckAchievements() {
  const stats = skzStatsGet();
  const unlocked = skzGetUnlockedAchievements();
  let changed = false;
  SKZ_ACHIEVEMENTS.forEach(a => {
    if (!unlocked.includes(a.id) && a.check(stats)) {
      unlocked.push(a.id);
      changed = true;
      skzShowAchievementToast(a);
    }
  });
  if (changed) localStorage.setItem(SKZ_ACHV_KEY, JSON.stringify(unlocked));
}

function skzShowAchievementToast(a) {
  const lang = (typeof skzGetLang === 'function') ? skzGetLang() : 'uz';
  const title = a.title[lang] || a.title.uz;
  skzSound.achievement();
  skzConfettiBurst({ count: 40, duration: 1600 });

  const el = document.createElement('div');
  el.className = 'skz-achv-toast';
  el.innerHTML = `
    <div class="skz-achv-toast-icon">${a.icon}</div>
    <div>
      <div class="skz-achv-toast-label">🎖️ ${lang === 'ru' ? 'Новое достижение' : (lang === 'en' ? 'New achievement' : 'Yangi yutuq')}</div>
      <div class="skz-achv-toast-title">${title}</div>
    </div>
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 3600);
}

// ---------------------------------------------
// REYTING / LIDERLAR JADVALI (demo, hayajon uchun)
// Statik "boshqa o'yinchilar" + joriy foydalanuvchi haqiqiy
// statistikasi bilan qo'shiladi.
// ---------------------------------------------
const SKZ_LEADERBOARD_SEED = [
  { name: 'Sherzod K.', score: 284500, drop: 'Plush Pepe' },
  { name: 'Aziza R.', score: 231900, drop: 'Diamond Ring' },
  { name: 'Bekzod T.', score: 198750, drop: 'Swiss Watch' },
  { name: 'Nodira M.', score: 176300, drop: 'Snoop Dogg' },
  { name: 'Sardor U.', score: 154200, drop: 'Signet Ring' },
  { name: 'Malika Y.', score: 132850, drop: 'Heroic Helmet' },
  { name: 'Jasur A.', score: 121400, drop: 'Astral Shard' },
  { name: 'Dilnoza S.', score: 98700, drop: "Durovs Cap" },
  { name: 'Otabek N.', score: 87650, drop: 'Precious Peach' },
  { name: 'Kamola F.', score: 76200, drop: 'Crystal Eagle' },
  { name: 'Rustam I.', score: 64300, drop: 'Genie Lamp' },
  { name: 'Zarina B.', score: 52100, drop: 'Voodoo Doll' },
  { name: 'Timur P.', score: 41500, drop: 'Torch of Freedom' },
  { name: 'Feruza G.', score: 33200, drop: 'Trojan Horse' },
];

function skzGetLeaderboard() {
  const stats = skzStatsGet();
  const user = (typeof skzGetUser === 'function') ? skzGetUser() : null;
  const userScore = Math.max(stats.peakBalance, stats.bestDropValue) + stats.giftsWon * 50;

  const rows = SKZ_LEADERBOARD_SEED.map(p => ({ name: p.name, score: p.score, drop: p.drop, isUser: false }));
  rows.push({
    name: user ? `${user.first} ${user.last}` : 'Siz',
    score: userScore,
    drop: stats.bestDropName || '—',
    isUser: true
  });
  rows.sort((a, b) => b.score - a.score);
  return rows;
}

// ---------------------------------------------
// SAYTDA ONLAYN BO'LGANLAR SONI (barcha sahifalarda,
// topbar ichiga avtomatik qo'shiladi)
// ---------------------------------------------
const SKZ_ONLINE_KEY = 'skinoz_online_v1';

function skzOnlineBaseValue() {
  const hour = new Date().getHours();
  const peak = hour >= 18 && hour <= 23;
  return peak ? (3200 + Math.floor(Math.random() * 900)) : (1600 + Math.floor(Math.random() * 800));
}

function skzGetOnlineCount() {
  let v = parseInt(localStorage.getItem(SKZ_ONLINE_KEY), 10);
  if (!v || isNaN(v)) {
    v = skzOnlineBaseValue();
    localStorage.setItem(SKZ_ONLINE_KEY, v);
  }
  return v;
}

function skzTickOnlineCount() {
  let v = skzGetOnlineCount();
  v += Math.floor(Math.random() * 9) - 4;
  v = Math.max(900, Math.min(6000, v));
  localStorage.setItem(SKZ_ONLINE_KEY, v);
  document.querySelectorAll('.js-online-count').forEach(el => {
    el.innerText = v.toLocaleString('ru-RU');
  });
  return v;
}

function skzInitOnlineCounter() {
  const topbar = document.querySelector('.topbar');
  const alreadyShownInline = document.querySelectorAll('.js-online-count').length > 0;
  if (topbar && !alreadyShownInline && !document.getElementById('skzOnlineCounter')) {
    const pill = document.createElement('div');
    pill.id = 'skzOnlineCounter';
    pill.className = 'online-pill';
    pill.innerHTML = `🟢 <span class="js-online-count">${skzGetOnlineCount().toLocaleString('ru-RU')}</span>`;
    const balancePill = topbar.querySelector('.balance-pill');
    if (balancePill && balancePill.parentElement) {
      balancePill.parentElement.insertBefore(pill, balancePill);
    } else {
      topbar.appendChild(pill);
    }
  }
  // Sahifadagi mavjud .js-online-count elementlarini (masalan bosh sahifa) darhol yangilash
  document.querySelectorAll('.js-online-count').forEach(el => {
    el.innerText = skzGetOnlineCount().toLocaleString('ru-RU');
  });
  if (!window.__skzOnlineInterval) {
    window.__skzOnlineInterval = setInterval(skzTickOnlineCount, 3000);
  }
}

// ---------------------------------------------
// LIVE DROP FEED — "kim nima yutdi" jonli oqimi
// Barcha sahifalarda ekranning chap-pastki burchagida
// vaqti-vaqti bilan chiqib turadigan bildirishnomalar.
// ---------------------------------------------
const SKZ_DROP_FEED_NAMES = [
  'Sherzod K.', 'Aziza R.', 'Bekzod T.', 'Nodira M.', 'Sardor U.', 'Malika Y.',
  'Jasur A.', 'Dilnoza S.', 'Otabek N.', 'Kamola F.', 'Rustam I.', 'Zarina B.',
  'Timur P.', 'Feruza G.', 'Shoxrux D.', 'Gulnora A.', 'Anvar S.', 'Madina B.',
  'Ilhom R.', 'Sevinch K.', 'Diyor N.', 'Lola T.'
];

const SKZ_DROP_FEED_GIFTS = [
  { name: 'Plush Pepe', rarity: 'legendary' },
  { name: 'Diamond Ring', rarity: 'legendary' },
  { name: 'Swiss Watch', rarity: 'legendary' },
  { name: 'Signet Ring', rarity: 'legendary' },
  { name: 'Astral Shard', rarity: 'legendary' },
  { name: 'Durovs Cap', rarity: 'legendary' },
  { name: 'Heroic Helmet', rarity: 'legendary' },
  { name: 'Crystal Eagle', rarity: 'epic' },
  { name: 'Genie Lamp', rarity: 'epic' },
  { name: 'Voodoo Doll', rarity: 'epic' },
  { name: 'Crystal Ball', rarity: 'epic' },
  { name: 'Heart Locket', rarity: 'rare' },
  { name: 'Love Potion', rarity: 'rare' },
  { name: 'Snow Globe', rarity: 'rare' },
  { name: 'Record Player', rarity: 'rare' },
  { name: 'Santa Hat', rarity: 'common' },
  { name: 'Lol Pop', rarity: 'common' },
  { name: 'Ice Cream', rarity: 'common' }
];

const SKZ_DROP_FEED_GAMES = ['Keys', 'Crash', 'Wheel', 'Mines', 'Plinko', 'CoinFlip', 'Apgreyder'];

function skzEnsureDropFeedContainer() {
  let c = document.getElementById('skzDropFeed');
  if (!c) {
    c = document.createElement('div');
    c.id = 'skzDropFeed';
    c.className = 'drop-feed-container';
    document.body.appendChild(c);
  }
  return c;
}

function skzSpawnDropFeedItem() {
  const container = skzEnsureDropFeedContainer();
  const name = SKZ_DROP_FEED_NAMES[Math.floor(Math.random() * SKZ_DROP_FEED_NAMES.length)];
  const gift = SKZ_DROP_FEED_GIFTS[Math.floor(Math.random() * SKZ_DROP_FEED_GIFTS.length)];
  const game = SKZ_DROP_FEED_GAMES[Math.floor(Math.random() * SKZ_DROP_FEED_GAMES.length)];

  const el = document.createElement('div');
  el.className = 'drop-feed-item rarity-' + gift.rarity;
  el.innerHTML = `
    <span class="drop-feed-icon">🎁</span>
    <span class="drop-feed-text"><b>${name}</b> — ${game}'da <b>${gift.name}</b> yutib oldi!</span>
  `;
  container.appendChild(el);

  // Bir vaqtda ekranda ko'p bildirishnoma to'planib qolmasligi uchun
  while (container.children.length > 3) {
    container.removeChild(container.firstChild);
  }

  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 4200);
}

function skzInitDropFeed() {
  if (window.__skzDropFeedInterval) return;
  skzEnsureDropFeedContainer();
  setTimeout(skzSpawnDropFeedItem, 2500);
  window.__skzDropFeedInterval = setInterval(() => {
    skzSpawnDropFeedItem();
  }, 6000 + Math.random() * 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  skzRenderSoundToggle();
  skzInitOnlineCounter();
  skzInitDropFeed();
});
