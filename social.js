// ============================================
// COFEATURE — ijtimoiy tizimlar:
// 1) Live Chat (o'yinchilar suhbati, demo/simulyatsiya)
// 2) Do'stga sovg'a yuborish/qabul qilish (kod orqali, server kerak emas)
// 3) Haftalik turnir (shaxsiy progress + mukofotlar)
// 4) Yutuqlar (Achievements) to'liq ro'yxat oynasi
// Barcha sahifalarga ulanadi, extras.js va shell.js dan KEYIN yuklanadi.
// ============================================

// ============================================
// 1) LIVE CHAT
// ============================================
const SKZ_CHAT_KEY = 'skinoz_chat_v1';
const SKZ_CHAT_SEEN_KEY = 'skinoz_chat_seen_v1';

const SKZ_CHAT_BOT_NAMES = [
  'Sherzod K.', 'Aziza R.', 'Bekzod T.', 'Nodira M.', 'Sardor U.', 'Malika Y.',
  'Jasur A.', 'Dilnoza S.', 'Otabek N.', 'Kamola F.', 'Rustam I.', 'Zarina B.'
];

const SKZ_CHAT_BOT_LINES = [
  "Hoziroq Keysdan Plush Pepe chiqdi 🔥",
  "Kimda Diamond Ring bor, almashtiramizmi?",
  "Crash x12 da chiqib ketdim 😅",
  "Mines'da 5 ta katakni ochib omadim keldi 💣",
  "Wheel doim meni sinab ko'radi 🎡",
  "Bugun kunlik bonusni oldingizmi?",
  "Apgreyderda 3 marta urinib, oxiri chiqdi!",
  "Reytingda kim top-3 da turibdi hozir?",
  "CoinFlip juda tez, zavqli o'yin",
  "Do'stimga sovg'a jo'natdim, kodi ishladi ✅",
  "Yangi keyslar qachon qo'shiladi?",
  "Legendary chiqarish uchun qaysi keys yaxshiroq?",
  "Turnirda ballarim yaxshi yig'ilyapti 🎯",
  "Salom hammaga, endi qo'shildim 👋"
];

function skzChatGetHistory() {
  try {
    const v = JSON.parse(localStorage.getItem(SKZ_CHAT_KEY));
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}

function skzChatSaveHistory(list) {
  const trimmed = list.slice(-60);
  localStorage.setItem(SKZ_CHAT_KEY, JSON.stringify(trimmed));
  return trimmed;
}

function skzChatSeedIfEmpty() {
  if (skzChatGetHistory().length > 0) return;
  const now = Date.now();
  const seed = [];
  const count = 5 + Math.floor(Math.random() * 3);
  for (let i = count; i > 0; i--) {
    const name = SKZ_CHAT_BOT_NAMES[Math.floor(Math.random() * SKZ_CHAT_BOT_NAMES.length)];
    const text = SKZ_CHAT_BOT_LINES[Math.floor(Math.random() * SKZ_CHAT_BOT_LINES.length)];
    seed.push({ who: 'bot', name, text, ts: now - i * 60000 });
  }
  skzChatSaveHistory(seed);
}

function skzChatUnreadCount() {
  const seen = parseInt(localStorage.getItem(SKZ_CHAT_SEEN_KEY), 10) || 0;
  return skzChatGetHistory().filter(m => m.ts > seen).length;
}

function skzChatMarkSeen() {
  localStorage.setItem(SKZ_CHAT_SEEN_KEY, String(Date.now()));
  skzChatRenderBadge();
}

function skzChatRenderBadge() {
  const badge = document.getElementById('skzChatBadge');
  if (!badge) return;
  const n = skzChatUnreadCount();
  badge.style.display = n > 0 ? 'flex' : 'none';
  badge.innerText = n > 9 ? '9+' : String(n);
}

function skzChatTimeFmt(ts) {
  const d = new Date(ts);
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

function skzChatRenderMessages() {
  const box = document.getElementById('skzChatMessages');
  if (!box) return;
  const history = skzChatGetHistory();
  box.innerHTML = history.map(m => `
    <div class="skz-chat-msg ${m.who === 'me' ? 'me' : ''}">
      <div class="skz-chat-msg-name">${m.who === 'me' ? '' : '👤 '}${m.name}</div>
      <div class="skz-chat-msg-text">${(m.text || '').replace(/</g, '&lt;')}</div>
      <div class="skz-chat-msg-time">${skzChatTimeFmt(m.ts)}</div>
    </div>
  `).join('');
  box.scrollTop = box.scrollHeight;
}

function skzChatAppend(msg) {
  const history = skzChatGetHistory();
  history.push(msg);
  skzChatSaveHistory(history);
  skzChatRenderMessages();
  const panel = document.getElementById('skzChatPanel');
  if (!panel || !panel.classList.contains('open')) {
    skzChatRenderBadge();
  } else {
    skzChatMarkSeen();
  }
}

function skzChatSpawnBotMessage() {
  const name = SKZ_CHAT_BOT_NAMES[Math.floor(Math.random() * SKZ_CHAT_BOT_NAMES.length)];
  const text = SKZ_CHAT_BOT_LINES[Math.floor(Math.random() * SKZ_CHAT_BOT_LINES.length)];
  skzChatAppend({ who: 'bot', name, text, ts: Date.now() });
}

function skzChatSend(text) {
  const clean = (text || '').trim();
  if (!clean) return;
  const user = (typeof skzGetUser === 'function') ? skzGetUser() : null;
  const name = user ? `${user.first} ${user.last}` : 'Siz';
  skzChatAppend({ who: 'me', name, text: clean, ts: Date.now() });

  // Bot javobi — tabiiy his qilish uchun 1-2.5s kechikish bilan
  setTimeout(() => {
    if (Math.random() < 0.7) skzChatSpawnBotMessage();
  }, 900 + Math.random() * 1600);
}

function skzChatToggle() {
  const panel = document.getElementById('skzChatPanel');
  if (!panel) return;
  const opening = !panel.classList.contains('open');
  panel.classList.toggle('open', opening);
  if (opening) {
    skzChatRenderMessages();
    skzChatMarkSeen();
    const input = document.getElementById('skzChatInput');
    if (input) setTimeout(() => input.focus(), 150);
  }
}

function skzChatInit() {
  if (document.getElementById('skzChatBubble')) return;
  skzChatSeedIfEmpty();

  const bubble = document.createElement('button');
  bubble.id = 'skzChatBubble';
  bubble.className = 'skz-chat-bubble';
  bubble.innerHTML = `💬<span class="skz-chat-badge" id="skzChatBadge"></span>`;
  bubble.onclick = skzChatToggle;
  document.body.appendChild(bubble);

  const panel = document.createElement('div');
  panel.id = 'skzChatPanel';
  panel.className = 'skz-chat-panel';
  panel.innerHTML = `
    <div class="skz-chat-header">
      <span>💬 Jonli suhbat <span class="skz-chat-online">🟢 <span class="js-online-count-chat">—</span></span></span>
      <button class="skz-chat-close" id="skzChatCloseBtn">✕</button>
    </div>
    <div class="skz-chat-messages" id="skzChatMessages"></div>
    <div class="skz-chat-input-row">
      <input class="skz-chat-input" id="skzChatInput" placeholder="Xabar yozing..." maxlength="200" autocomplete="off">
      <button class="skz-chat-send" id="skzChatSendBtn">➤</button>
    </div>
  `;
  document.body.appendChild(panel);

  document.getElementById('skzChatCloseBtn').onclick = skzChatToggle;
  const input = document.getElementById('skzChatInput');
  const send = () => { skzChatSend(input.value); input.value = ''; };
  document.getElementById('skzChatSendBtn').onclick = send;
  input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

  skzChatRenderBadge();

  if (!window.__skzChatInterval) {
    window.__skzChatInterval = setInterval(() => {
      skzChatSpawnBotMessage();
    }, 15000 + Math.random() * 20000);
  }

  // topbardagi onlayn hisobni chat sarlavhasida ham ko'rsatish
  setInterval(() => {
    const el = document.querySelector('.js-online-count');
    const target = document.querySelector('.js-online-count-chat');
    if (el && target) target.innerText = el.innerText;
  }, 3000);
}

// ============================================
// 2) DO'STGA SOVG'A YUBORISH — kod orqali, server kerak emas.
// Sovg'a ma'lumotlari to'g'ridan-to'g'ri koddagi base64 ichiga yoziladi,
// shu sababli do'stingiz kodni istalgan brauzerda "faollashtira" oladi.
// ============================================
const SKZ_GIFT_CODE_PREFIX = 'COFGIFT-';
const SKZ_SENT_GIFTS_KEY = 'skinoz_sent_gifts_v1';
const SKZ_USED_GIFT_CODES_KEY = 'skinoz_used_gift_codes_v1';

function skzGetSentGifts() {
  try {
    const v = JSON.parse(localStorage.getItem(SKZ_SENT_GIFTS_KEY));
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}

function skzGetUsedGiftCodes() {
  try {
    const v = JSON.parse(localStorage.getItem(SKZ_USED_GIFT_CODES_KEY));
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}

function skzMarkGiftCodeUsed(code) {
  const list = skzGetUsedGiftCodes();
  list.push(code);
  localStorage.setItem(SKZ_USED_GIFT_CODES_KEY, JSON.stringify(list.slice(-200)));
}

// Tanlangan inventar itemidan uzatish kodi yaratadi va itemni inventardan olib tashlaydi
function skzGenerateGiftCode(itemId) {
  const items = skzGetInventory();
  const item = items.find(i => i.id === itemId);
  if (!item) return null;

  const payload = {
    n: item.name, r: item.rarity, f: item.file, v: item.value,
    id: 'g_' + Date.now() + '_' + Math.floor(Math.random() * 100000)
  };
  let code;
  try {
    code = SKZ_GIFT_CODE_PREFIX + btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  } catch (e) { return null; }

  skzRemoveInventoryItem(itemId);
  skzMarkGiftCodeUsed(code); // o'zingiz qayta faollashtira olmasligingiz uchun

  const sent = skzGetSentGifts();
  sent.unshift({ name: item.name, rarity: item.rarity, file: item.file, value: item.value, code, ts: Date.now() });
  localStorage.setItem(SKZ_SENT_GIFTS_KEY, JSON.stringify(sent.slice(0, 30)));

  return code;
}

// Do'stdan kelgan kodni faollashtirib, sovg'ani inventarga qo'shadi
function skzRedeemGiftCode(codeInput) {
  const code = (codeInput || '').trim();
  if (!code.startsWith(SKZ_GIFT_CODE_PREFIX)) return { ok: false, reason: 'invalid-format' };
  if (skzGetUsedGiftCodes().includes(code)) return { ok: false, reason: 'already-used' };

  let payload;
  try {
    const b64 = code.slice(SKZ_GIFT_CODE_PREFIX.length);
    payload = JSON.parse(decodeURIComponent(escape(atob(b64))));
  } catch (e) {
    return { ok: false, reason: 'invalid-format' };
  }
  if (!payload || !payload.n || !payload.f) return { ok: false, reason: 'invalid-format' };

  skzMarkGiftCodeUsed(code);
  const item = skzAddInventoryItem({ name: payload.n, rarity: payload.r, file: payload.f, value: payload.v });
  return { ok: true, item };
}

function skzCopyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    ta.remove();
  }
}

let skzGiftSendSelected = null;

function skzShowGiftModal(initialTab) {
  if (document.getElementById('skzGiftModal')) return;
  skzGiftSendSelected = null;

  const wrap = document.createElement('div');
  wrap.id = 'skzGiftModal';
  wrap.className = 'skz-modal-overlay';
  wrap.innerHTML = `
    <div class="skz-modal skz-gift-modal">
      <div class="skz-modal-title">🎁 Do'stga sovg'a</div>
      <div class="skz-gift-tabs">
        <button class="skz-gift-tab active" data-tab="send">📤 Yuborish</button>
        <button class="skz-gift-tab" data-tab="receive">📥 Qabul qilish</button>
      </div>
      <div class="skz-gift-tab-body" id="skzGiftTabBody"></div>
      <button class="skz-settings-btn" id="skzGiftCloseBtn" style="margin-top:10px;">Yopish</button>
    </div>
  `;
  document.body.appendChild(wrap);
  wrap.addEventListener('click', e => { if (e.target === wrap) wrap.remove(); });
  document.getElementById('skzGiftCloseBtn').onclick = () => wrap.remove();

  wrap.querySelectorAll('.skz-gift-tab').forEach(btn => {
    btn.onclick = () => {
      wrap.querySelectorAll('.skz-gift-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      skzRenderGiftTab(btn.dataset.tab);
    };
  });

  skzRenderGiftTab(initialTab || 'send');
}

function skzRenderGiftTab(tab) {
  const body = document.getElementById('skzGiftTabBody');
  if (!body) return;

  if (tab === 'send') {
    const inv = skzGetInventory();
    body.innerHTML = `
      <div class="skz-gift-hint">Yubormoqchi bo'lgan sovg'angizni tanlang, keyin kod yarating va uni do'stingizga (masalan Telegram orqali) yuboring. Do'stingiz kodni "Qabul qilish" bo'limiga qo'ysa, sovg'a uning inventariga tushadi.</div>
      ${inv.length === 0 ? `<div class="stake-gift-empty">Inventaringiz bo'sh. <a href="cases.html">Keys oching</a>!</div>` : `
        <div class="skz-gift-pick-grid">
          ${inv.map(it => `
            <div class="stake-gift-item" data-id="${it.id}">
              <div class="gift-icon-wrap rarity-${it.rarity}">${skzGiftImg(it.file, it.name)}</div>
              <div class="val">💎${skzFmt(it.value)}</div>
            </div>
          `).join('')}
        </div>
      `}
      <div id="skzGiftCodeOut"></div>
      <button class="primary-btn" id="skzGiftGenBtn" ${inv.length === 0 ? 'disabled' : ''} style="margin-top:10px;">Kod yaratish</button>
    `;
    body.querySelectorAll('.stake-gift-item').forEach(el => {
      el.onclick = () => {
        skzGiftSendSelected = el.dataset.id;
        body.querySelectorAll('.stake-gift-item').forEach(e2 => e2.classList.remove('active'));
        el.classList.add('active');
      };
    });
    document.getElementById('skzGiftGenBtn').onclick = () => {
      if (!skzGiftSendSelected) { if (typeof showToast === 'function') showToast("Avval sovg'a tanlang", 'lose'); return; }
      const code = skzGenerateGiftCode(skzGiftSendSelected);
      if (!code) return;
      document.getElementById('skzGiftCodeOut').innerHTML = `
        <div class="skz-gift-code-box">
          <input class="skz-gate-input" id="skzGiftCodeText" value="${code}" readonly>
          <button class="skz-settings-btn" id="skzGiftCopyBtn">📋 Nusxalash</button>
        </div>
      `;
      document.getElementById('skzGiftCopyBtn').onclick = () => {
        skzCopyToClipboard(code);
        if (typeof showToast === 'function') showToast('✅ Kod nusxalandi', 'win');
      };
      if (typeof showToast === 'function') showToast('🎁 Kod yaratildi!', 'win');
      skzGiftSendSelected = null;
      skzRenderInventoryCount();
      if (typeof renderInventory === 'function') renderInventory();
      skzRenderGiftTab('send');
    };
  } else {
    body.innerHTML = `
      <div class="skz-gift-hint">Do'stingiz sizga yuborgan COFGIFT- kodini quyiga joylashtiring.</div>
      <textarea class="skz-gate-input skz-gift-code-input" id="skzGiftRedeemInput" placeholder="COFGIFT-..." rows="3"></textarea>
      <button class="primary-btn" id="skzGiftRedeemBtn" style="margin-top:10px;">Faollashtirish</button>
      <div id="skzGiftRedeemMsg"></div>
    `;
    document.getElementById('skzGiftRedeemBtn').onclick = () => {
      const val = document.getElementById('skzGiftRedeemInput').value;
      const res = skzRedeemGiftCode(val);
      const msg = document.getElementById('skzGiftRedeemMsg');
      if (res.ok) {
        msg.innerHTML = `<div class="skz-gift-success">✅ ${res.item.name} inventaringizga qo'shildi!</div>`;
        if (typeof showToast === 'function') showToast(`🎁 ${res.item.name} qabul qilindi!`, 'win');
        document.getElementById('skzGiftRedeemInput').value = '';
        skzRenderInventoryCount();
        if (typeof renderInventory === 'function') renderInventory();
      } else {
        const reasons = {
          'invalid-format': "Kod noto'g'ri yoki buzilgan",
          'already-used': 'Bu kod allaqachon ishlatilgan'
        };
        msg.innerHTML = `<div class="skz-gift-error">❌ ${reasons[res.reason] || 'Xatolik yuz berdi'}</div>`;
      }
    };
  }
}

// ============================================
// 3) HAFTALIK TURNIR — shaxsiy progress, real vaqt musobaqasi
// emas (bu to'liq lokal demo), lekin har hafta yangilanadi va
// bosqichlar bo'yicha mukofot berib boradi.
// ============================================
const SKZ_WEEKLY_KEY = 'skinoz_weekly_v1';

const SKZ_TOURNAMENT_TIERS = [
  { threshold: 1000, reward: 500, label: '500 💎' },
  { threshold: 5000, reward: 2000, label: '2,000 💎' },
  { threshold: 15000, reward: 5000, label: '5,000 💎' },
  { threshold: 40000, reward: 12000, label: '12,000 💎' }
];

function skzWeekStartTs() {
  const now = new Date();
  const day = now.getDay(); // 0=Yak
  const diffToMonday = (day + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday.getTime();
}

function skzGetWeeklyState() {
  let state;
  try {
    state = JSON.parse(localStorage.getItem(SKZ_WEEKLY_KEY));
  } catch (e) { state = null; }
  const weekStart = skzWeekStartTs();
  if (!state || state.weekStart !== weekStart) {
    state = { weekStart, score: 0, claimedTiers: [] };
    localStorage.setItem(SKZ_WEEKLY_KEY, JSON.stringify(state));
  }
  return state;
}

function skzSaveWeeklyState(state) {
  localStorage.setItem(SKZ_WEEKLY_KEY, JSON.stringify(state));
}

function skzWeeklyAddScore(points) {
  if (!points || points <= 0) return;
  const state = skzGetWeeklyState();
  state.score += Math.round(points);
  skzSaveWeeklyState(state);
  skzRenderTournamentIfOpen();
}

function skzClaimTournamentTier(index) {
  const state = skzGetWeeklyState();
  const tier = SKZ_TOURNAMENT_TIERS[index];
  if (!tier) return;
  if (state.claimedTiers.includes(index)) return;
  if (state.score < tier.threshold) return;
  state.claimedTiers.push(index);
  skzSaveWeeklyState(state);
  skzAddBalance(tier.reward);
  if (typeof showToast === 'function') showToast(`🏆 Bosqich mukofoti: +${skzFmt(tier.reward)} 💎`, 'win');
  skzRenderTournamentIfOpen();
}

function skzTournamentTimeLeftStr() {
  const nextMonday = skzWeekStartTs() + 7 * 86400000;
  const diff = nextMonday - Date.now();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${d}k ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function skzRenderTournamentIfOpen() {
  const body = document.getElementById('skzTournamentBody');
  if (body) skzRenderTournamentBody();
}

function skzRenderTournamentBody() {
  const body = document.getElementById('skzTournamentBody');
  if (!body) return;
  const state = skzGetWeeklyState();
  const maxTier = SKZ_TOURNAMENT_TIERS[SKZ_TOURNAMENT_TIERS.length - 1];
  const pct = Math.min(100, Math.round((state.score / maxTier.threshold) * 100));

  body.innerHTML = `
    <div class="skz-gift-hint">Har qanday o'yinda g'alaba qozonish va sovg'a chiqarish — turnir ballarini oshiradi. Ballar har dushanba kuni 00:00 da nolga tushadi.</div>
    <div class="skz-tour-score">🎯 ${skzFmt(state.score)} ball <span class="skz-tour-countdown">⏳ ${skzTournamentTimeLeftStr()}</span></div>
    <div class="skz-tour-progress"><div class="skz-tour-progress-fill" style="width:${pct}%;"></div></div>
    <div class="skz-tour-tiers">
      ${SKZ_TOURNAMENT_TIERS.map((t, i) => {
        const reached = state.score >= t.threshold;
        const claimed = state.claimedTiers.includes(i);
        return `
          <div class="skz-tour-tier ${reached ? 'reached' : ''} ${claimed ? 'claimed' : ''}">
            <div class="skz-tour-tier-info">
              <div class="skz-tour-tier-th">${skzFmt(t.threshold)} ball</div>
              <div class="skz-tour-tier-reward">${t.label}</div>
            </div>
            <button class="skz-settings-btn skz-tour-claim-btn" data-i="${i}" ${(!reached || claimed) ? 'disabled' : ''}>
              ${claimed ? '✅ Olindi' : (reached ? "Olish" : '🔒')}
            </button>
          </div>
        `;
      }).join('')}
    </div>
  `;
  body.querySelectorAll('.skz-tour-claim-btn').forEach(btn => {
    btn.onclick = () => skzClaimTournamentTier(parseInt(btn.dataset.i, 10));
  });
}

function skzShowTournamentModal() {
  if (document.getElementById('skzTournamentModal')) return;
  const wrap = document.createElement('div');
  wrap.id = 'skzTournamentModal';
  wrap.className = 'skz-modal-overlay';
  wrap.innerHTML = `
    <div class="skz-modal">
      <div class="skz-modal-title">🎯 Haftalik turnir</div>
      <div id="skzTournamentBody"></div>
      <button class="skz-settings-btn" id="skzTourCloseBtn" style="margin-top:10px;">Yopish</button>
    </div>
  `;
  document.body.appendChild(wrap);
  wrap.addEventListener('click', e => { if (e.target === wrap) wrap.remove(); });
  document.getElementById('skzTourCloseBtn').onclick = () => wrap.remove();
  skzRenderTournamentBody();
}

// ============================================
// 4) YUTUQLAR (ACHIEVEMENTS) — TO'LIQ RO'YXAT OYNASI
// (SKZ_ACHIEVEMENTS massivi extras.js da e'lon qilingan)
// ============================================
function skzShowAchievementsModal() {
  if (document.getElementById('skzAchvModal')) return;
  if (typeof SKZ_ACHIEVEMENTS === 'undefined') return;

  const unlocked = skzGetUnlockedAchievements();
  const lang = (typeof skzGetLang === 'function') ? skzGetLang() : 'uz';

  const wrap = document.createElement('div');
  wrap.id = 'skzAchvModal';
  wrap.className = 'skz-modal-overlay';
  wrap.innerHTML = `
    <div class="skz-modal skz-achv-modal">
      <div class="skz-modal-title">🏅 Yutuqlar (${unlocked.length}/${SKZ_ACHIEVEMENTS.length})</div>
      <div class="skz-achv-grid">
        ${SKZ_ACHIEVEMENTS.map(a => {
          const isUnlocked = unlocked.includes(a.id);
          const title = (a.title[lang] || a.title.uz);
          const desc = (a.desc[lang] || a.desc.uz);
          return `
            <div class="skz-achv-card ${isUnlocked ? 'unlocked' : 'locked'}">
              <div class="skz-achv-card-icon">${isUnlocked ? a.icon : '🔒'}</div>
              <div class="skz-achv-card-title">${title}</div>
              <div class="skz-achv-card-desc">${desc}</div>
            </div>
          `;
        }).join('')}
      </div>
      <button class="skz-settings-btn" id="skzAchvCloseBtn" style="margin-top:10px;">Yopish</button>
    </div>
  `;
  document.body.appendChild(wrap);
  wrap.addEventListener('click', e => { if (e.target === wrap) wrap.remove(); });
  document.getElementById('skzAchvCloseBtn').onclick = () => wrap.remove();
}

// ============================================
// XABARLAR (o'yin natijalari) ORQALI TURNIR BALLARINI OSHIRISH
// Mavjud win/lose hook'i va inventar funksiyasini "o'rab" (wrap)
// olamiz — boshqa fayllarni o'zgartirish shart emas.
// ============================================
(function skzWireWeeklyHooks() {
  const prevOnToast = window.skzOnToast;
  window.skzOnToast = function (type) {
    if (typeof prevOnToast === 'function') prevOnToast(type);
    if (type === 'win') skzWeeklyAddScore(40);
  };

  const prevAddInventoryItem = window.skzAddInventoryItem;
  if (typeof prevAddInventoryItem === 'function') {
    window.skzAddInventoryItem = function (item) {
      const result = prevAddInventoryItem(item);
      skzWeeklyAddScore(Math.max(5, Math.ceil((item && item.value || 0) / 5)));
      return result;
    };
  }
})();

// ============================================
// SIDEBARGA TUGMALAR QO'SHISH (chat, turnir, yutuqlar, sovg'a)
// shell.js ning skzBuildShell() ishlab bo'lgach ishga tushadi.
// ============================================
function skzInjectSocialSidebarButtons() {
  const settingsBlock = document.querySelector('.skz-settings-block');
  if (!settingsBlock || document.getElementById('skzSocialBtnRow')) return;

  const row = document.createElement('div');
  row.id = 'skzSocialBtnRow';
  row.style.cssText = 'display:flex; flex-direction:column; gap:8px; margin-bottom:8px;';
  row.innerHTML = `
    <button class="skz-settings-btn" id="skzOpenAchvBtn">🏅 Yutuqlar</button>
    <button class="skz-settings-btn" id="skzOpenTourBtn">🎯 Haftalik turnir</button>
    <button class="skz-settings-btn" id="skzOpenGiftBtn">🎁 Do'stga sovg'a</button>
  `;
  settingsBlock.prepend(row);

  document.getElementById('skzOpenAchvBtn').onclick = skzShowAchievementsModal;
  document.getElementById('skzOpenTourBtn').onclick = skzShowTournamentModal;
  document.getElementById('skzOpenGiftBtn').onclick = () => skzShowGiftModal('send');
}

document.addEventListener('DOMContentLoaded', () => {
  skzChatInit();
  // shell.js sidebarni dinamik quradi — bir oz kutib, tugmalarni qo'shamiz
  setTimeout(skzInjectSocialSidebarButtons, 60);
});
