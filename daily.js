// ============================================
// COFEATURE — Kunlik bonus, Login Streak va Kunlik vazifalar
// balance.js, extras.js va shell.js dan keyin yuklanadi.
// ============================================

function skzTodayKey() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function skzDaysDiff(fromStr, toStr) {
  const a = new Date(fromStr + 'T00:00:00');
  const b = new Date(toStr + 'T00:00:00');
  return Math.round((b - a) / 86400000);
}

// ---------------------------------------------
// KUNLIK BONUS + LOGIN STREAK
// ---------------------------------------------
const SKZ_DAILY_KEY = 'skinoz_daily_v1';
const SKZ_DAILY_REWARDS = [500, 750, 1000, 1500, 2000, 3000, 5000]; // 7 kunlik tsikl, 7-kun eng katta

function skzDailyGetState() {
  try {
    const v = JSON.parse(localStorage.getItem(SKZ_DAILY_KEY));
    if (v && typeof v === 'object') return Object.assign({ lastClaimDay: null, streak: 0 }, v);
  } catch (e) { /* noop */ }
  return { lastClaimDay: null, streak: 0 };
}

function skzDailySaveState(s) {
  localStorage.setItem(SKZ_DAILY_KEY, JSON.stringify(s));
}

function skzDailyCanClaim() {
  return skzDailyGetState().lastClaimDay !== skzTodayKey();
}

// Bugun bosilsa qanday streak raqami hosil bo'lishini hisoblaydi (hali bosilmagan bo'lsa ham UI uchun)
function skzDailyPendingStreak() {
  const s = skzDailyGetState();
  const today = skzTodayKey();
  if (s.lastClaimDay === today) return s.streak;
  if (!s.lastClaimDay) return 1;
  const diff = skzDaysDiff(s.lastClaimDay, today);
  if (diff === 1) return s.streak + 1;
  return 1; // kunni o'tkazib yuborilsa streak qaytadan boshlanadi
}

function skzDailyClaim() {
  if (!skzDailyCanClaim()) return null;
  const today = skzTodayKey();
  const newStreak = skzDailyPendingStreak();
  const idx = (newStreak - 1) % 7;
  const baseReward = SKZ_DAILY_REWARDS[idx];
  const vipBonusPct = typeof skzVipDailyBonusPct === 'function' ? skzVipDailyBonusPct() : 0;
  const reward = Math.round(baseReward * (1 + vipBonusPct / 100));
  skzAddBalance(reward);
  skzDailySaveState({ lastClaimDay: today, streak: newStreak });
  if (idx === 6 && typeof skzLegendaryEffect === 'function') {
    skzLegendaryEffect();
  } else {
    if (typeof skzConfettiBurst === 'function') skzConfettiBurst({ count: 55, duration: 1700 });
    if (typeof skzSound !== 'undefined' && skzSound.win) skzSound.win();
  }
  skzRenderDailyBadge();
  return { reward, streak: newStreak, dayInCycle: idx + 1, vipBonusPct };
}

// ---------------------------------------------
// KUNLIK VAZIFALAR (Daily Quests)
// ---------------------------------------------
const SKZ_QUESTS_KEY = 'skinoz_quests_v1';

const SKZ_QUEST_POOL = [
  { type: 'cases', icon: '📦', statField: 'casesOpened', minT: 3, maxT: 6, rewardPer: 150,
    title: { uz: "{n} ta key oching", ru: "Откройте {n} кейсов", en: "Open {n} cases" } },
  { type: 'wins', icon: '🏆', statField: 'totalWins', minT: 3, maxT: 8, rewardPer: 180,
    title: { uz: "{n} marta yuting", ru: "Выиграйте {n} раз", en: "Win {n} rounds" } },
  { type: 'rounds', icon: '🎮', statField: '__rounds', minT: 8, maxT: 15, rewardPer: 100,
    title: { uz: "{n} marta o'ynang", ru: "Сыграйте {n} раундов", en: "Play {n} rounds" } },
  { type: 'gifts', icon: '🎁', statField: 'giftsWon', minT: 3, maxT: 6, rewardPer: 160,
    title: { uz: "{n} ta sovg'a chiqaring", ru: "Получите {n} подарков", en: "Get {n} gifts" } },
  { type: 'rareplus', icon: '💎', statField: '__rareplus', minT: 1, maxT: 2, rewardPer: 400,
    title: { uz: "{n} ta Rare+ sovg'a chiqaring", ru: "Получите {n} Rare+ предметов", en: "Get {n} Rare+ gifts" } },
];

function skzStatValue(stats, field) {
  if (field === '__rounds') return stats.totalWins + stats.totalLosses;
  if (field === '__rareplus') return stats.rareCount + stats.epicCount + stats.legendaryCount;
  return stats[field] || 0;
}

function skzQuestsGenerate() {
  const stats = skzStatsGet();
  const pool = SKZ_QUEST_POOL.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3).map((p, i) => {
    const target = p.minT + Math.floor(Math.random() * (p.maxT - p.minT + 1));
    return {
      id: 'q' + (i + 1) + '_' + p.type,
      type: p.type,
      icon: p.icon,
      statField: p.statField,
      target,
      reward: p.rewardPer * target,
      baseline: skzStatValue(stats, p.statField)
    };
  });
}

function skzQuestsGetState() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(SKZ_QUESTS_KEY)); } catch (e) { s = null; }
  const today = skzTodayKey();
  if (!s || typeof s !== 'object' || s.date !== today) {
    s = { date: today, quests: skzQuestsGenerate(), claimed: [] };
    localStorage.setItem(SKZ_QUESTS_KEY, JSON.stringify(s));
  }
  return s;
}

function skzQuestsSaveState(s) {
  localStorage.setItem(SKZ_QUESTS_KEY, JSON.stringify(s));
}

function skzQuestsProgressFor(quest) {
  const stats = skzStatsGet();
  const current = skzStatValue(stats, quest.statField) - quest.baseline;
  return Math.max(0, Math.min(quest.target, current));
}

// Statistika yangilanganda (key ochish, yutuq, sovg'a tushishi) chaqiriladi — extras.js dan
function skzQuestsCheck() {
  const s = skzQuestsGetState();
  let changed = false;
  s.quests.forEach(q => {
    if (s.claimed.includes(q.id)) return;
    if (skzQuestsProgressFor(q) >= q.target) {
      s.claimed.push(q.id);
      changed = true;
      skzAddBalance(q.reward);
      skzQuestToast(q);
    }
  });
  if (changed) skzQuestsSaveState(s);
  skzRenderDailyBadge();
}

function skzQuestToast(q) {
  const lang = (typeof skzGetLang === 'function') ? skzGetLang() : 'uz';
  const label = lang === 'ru' ? 'Задание выполнено' : (lang === 'en' ? 'Quest complete' : 'Vazifa bajarildi');
  if (typeof skzSound !== 'undefined' && skzSound.achievement) skzSound.achievement();
  if (typeof skzConfettiBurst === 'function') skzConfettiBurst({ count: 40, duration: 1400 });

  const el = document.createElement('div');
  el.className = 'skz-achv-toast';
  el.innerHTML = `
    <div class="skz-achv-toast-icon">${q.icon}</div>
    <div>
      <div class="skz-achv-toast-label">🎯 ${label}</div>
      <div class="skz-achv-toast-title">+${skzFmt(q.reward)} 💎</div>
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
// BADGE (sidebar tugmasidagi qizil nuqta)
// ---------------------------------------------
function skzDailyHasPending() {
  if (skzDailyCanClaim()) return true;
  const qs = skzQuestsGetState();
  return qs.quests.some(q => !qs.claimed.includes(q.id) && skzQuestsProgressFor(q) >= q.target);
}

function skzRenderDailyBadge() {
  const badge = document.getElementById('skzDailyBadge');
  if (!badge) return;
  badge.style.display = skzDailyHasPending() ? 'inline-block' : 'none';
}

// ---------------------------------------------
// MODAL — Kunlik bonus + Vazifalar
// ---------------------------------------------
function skzShowDailyHubModal() {
  if (document.getElementById('skzDailyModal')) return;
  const lang = (typeof skzGetLang === 'function') ? skzGetLang() : 'uz';
  const canClaim = skzDailyCanClaim();
  const state = skzDailyGetState();
  const displayStreak = canClaim ? skzDailyPendingStreak() : state.streak;
  const cyclePos = ((displayStreak - 1) % 7) + 1;

  let stripHtml = '';
  for (let day = 1; day <= 7; day++) {
    const reward = SKZ_DAILY_REWARDS[day - 1];
    let cls = 'skz-streak-day';
    if (day < cyclePos || (day === cyclePos && !canClaim)) cls += ' claimed';
    else if (day === cyclePos) cls += ' current';
    if (day === 7) cls += ' bonus';
    const dLabel = lang === 'ru' ? 'Д' : (lang === 'en' ? 'D' : 'K');
    stripHtml += `
      <div class="${cls}">
        <div class="skz-streak-daynum">${dLabel}${day}</div>
        <div class="skz-streak-icon">${day < cyclePos || (day === cyclePos && !canClaim) ? '✅' : (day === 7 ? '👑' : '🎁')}</div>
        <div class="skz-streak-reward">${skzFmt(reward)}</div>
      </div>`;
  }

  const questsState = skzQuestsGetState();
  const questsHtml = questsState.quests.map(q => {
    const pool = SKZ_QUEST_POOL.find(p => p.type === q.type);
    const title = (pool.title[lang] || pool.title.uz).replace('{n}', q.target);
    const prog = skzQuestsProgressFor(q);
    const done = questsState.claimed.includes(q.id);
    const pct = Math.round((prog / q.target) * 100);
    return `
      <div class="skz-quest-row ${done ? 'done' : ''}">
        <div class="skz-quest-icon">${q.icon}</div>
        <div class="skz-quest-body">
          <div class="skz-quest-title">${title}</div>
          <div class="skz-quest-progress-track"><div class="skz-quest-progress-fill" style="width:${pct}%"></div></div>
          <div class="skz-quest-progress-label">${prog}/${q.target}</div>
        </div>
        <div class="skz-quest-reward">${done ? '✅' : '💎' + skzFmt(q.reward)}</div>
      </div>`;
  }).join('');

  const dailyTitle = lang === 'ru' ? 'Ежедневный бонус' : (lang === 'en' ? 'Daily bonus' : 'Kunlik bonus');
  const questsTitle = lang === 'ru' ? 'Ежедневные задания' : (lang === 'en' ? 'Daily quests' : "Kunlik vazifalar");
  const claimLabel = lang === 'ru' ? 'Забрать бонус' : (lang === 'en' ? 'Claim bonus' : "Bonusni olish");
  const claimedLabel = lang === 'ru' ? 'Сегодня уже получено ✅' : (lang === 'en' ? 'Already claimed today ✅' : "Bugun allaqachon olingan ✅");
  const nextInLabel = lang === 'ru' ? 'Следующий бонус через: ' : (lang === 'en' ? 'Next bonus in: ' : "Keyingi bonusgacha: ");
  const closeLabel = (typeof skzT === 'function') ? skzT('cancelBtn') : 'Yopish';
  const streakLabel = lang === 'ru' ? `Серия входов: ${displayStreak} дн.` : (lang === 'en' ? `Login streak: ${displayStreak} days` : `Ketma-ket kirish: ${displayStreak} kun`);

  const wrap = document.createElement('div');
  wrap.id = 'skzDailyModal';
  wrap.className = 'skz-modal-overlay';
  wrap.innerHTML = `
    <div class="skz-modal skz-daily-modal">
      <div class="skz-modal-title">🎁 ${dailyTitle}</div>
      <div class="skz-daily-streak-label">🔥 ${streakLabel}</div>
      <div class="skz-streak-strip">${stripHtml}</div>
      <button class="primary-btn" id="skzDailyClaimBtn" ${canClaim ? '' : 'disabled'}>${canClaim ? '🎁 ' + claimLabel : claimedLabel}</button>
      <div class="skz-daily-countdown" id="skzDailyCountdown" style="${canClaim ? 'display:none;' : ''}"></div>

      <div class="skz-modal-title" style="margin-top:22px;">🎯 ${questsTitle}</div>
      <div class="skz-quest-list">${questsHtml}</div>

      <div class="skz-modal-actions" style="margin-top:18px;">
        <button class="skz-settings-btn" id="skzDailyCloseBtn" style="flex:1;">${closeLabel}</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  let countdownTimer = null;
  const close = () => {
    if (countdownTimer) clearInterval(countdownTimer);
    wrap.remove();
  };
  wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
  document.getElementById('skzDailyCloseBtn').onclick = close;

  if (canClaim) {
    document.getElementById('skzDailyClaimBtn').onclick = () => {
      const res = skzDailyClaim();
      close();
      if (res && typeof showToast === 'function') {
        const bonusTxt = res.vipBonusPct ? ` (VIP +${res.vipBonusPct}%)` : '';
        showToast(`🎁 +${skzFmt(res.reward)} 💎${bonusTxt}!`, 'win');
      }
      setTimeout(() => skzShowDailyHubModal(), 260);
    };
  } else {
    const label = document.getElementById('skzDailyCountdown');
    function tick() {
      const now = new Date();
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = Math.max(0, next - now);
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const sec = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      label.innerText = nextInLabel + `${h}:${m}:${sec}`;
    }
    tick();
    countdownTimer = setInterval(tick, 1000);
  }
}

// ---------------------------------------------
// Ilova yuklanganda: badge yangilash + lobbyda 1 martalik avto-popup
// ---------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  skzRenderDailyBadge();
  if (typeof skzQuestsCheck === 'function') skzQuestsCheck();

  const loggedIn = (typeof skzGetUser === 'function') && skzGetUser();
  const onLobby = (typeof skzCurrentPage === 'function') && skzCurrentPage() === 'index.html';
  if (loggedIn && onLobby && skzDailyCanClaim() && !sessionStorage.getItem('skz_daily_autoshown_v1')) {
    sessionStorage.setItem('skz_daily_autoshown_v1', '1');
    setTimeout(() => { if (typeof skzShowDailyHubModal === 'function') skzShowDailyHubModal(); }, 700);
  }
});
