// ============================================
// COFEATURE — VIP Daraja (Level) tizimi
// XP manbalari: har qanday tikish (pul yoki sovg'a bilan) va har bir
// yutilgan sovg'a. Daraja oshgan sayin unvon va kunlik bonusga foizli
// qo'shimcha kabi kichik, kosmetik imtiyozlar ochiladi.
// ============================================

const SKZ_VIP_KEY = 'skinoz_vip_v1';

const SKZ_VIP_TIERS = [
  { level: 1,  name: "Bronza I",    xpNeeded: 0,     dailyBonusPct: 0  },
  { level: 2,  name: "Bronza II",   xpNeeded: 200,   dailyBonusPct: 0  },
  { level: 3,  name: "Bronza III",  xpNeeded: 500,   dailyBonusPct: 0  },
  { level: 4,  name: "Kumush I",    xpNeeded: 1000,  dailyBonusPct: 5  },
  { level: 5,  name: "Kumush II",   xpNeeded: 1800,  dailyBonusPct: 5  },
  { level: 6,  name: "Kumush III",  xpNeeded: 2800,  dailyBonusPct: 5  },
  { level: 7,  name: "Oltin I",     xpNeeded: 4200,  dailyBonusPct: 10 },
  { level: 8,  name: "Oltin II",    xpNeeded: 6000,  dailyBonusPct: 10 },
  { level: 9,  name: "Oltin III",   xpNeeded: 8200,  dailyBonusPct: 10 },
  { level: 10, name: "Platina I",   xpNeeded: 11000, dailyBonusPct: 15 },
  { level: 11, name: "Platina II",  xpNeeded: 14500, dailyBonusPct: 15 },
  { level: 12, name: "Platina III", xpNeeded: 18500, dailyBonusPct: 15 },
  { level: 13, name: "Olmos I",     xpNeeded: 23500, dailyBonusPct: 20 },
  { level: 14, name: "Olmos II",    xpNeeded: 29500, dailyBonusPct: 20 },
  { level: 15, name: "Olmos III",   xpNeeded: 36500, dailyBonusPct: 20 },
  { level: 16, name: "Afsona",      xpNeeded: 45000, dailyBonusPct: 30 },
];

function skzVipGetState() {
  try {
    const v = JSON.parse(localStorage.getItem(SKZ_VIP_KEY));
    if (v && typeof v === 'object') return Object.assign({ xp: 0 }, v);
  } catch (e) { /* noop */ }
  return { xp: 0 };
}

function skzVipSaveState(s) {
  localStorage.setItem(SKZ_VIP_KEY, JSON.stringify(s));
}

function skzVipTierForXp(xp) {
  let tier = SKZ_VIP_TIERS[0];
  for (const t of SKZ_VIP_TIERS) {
    if (xp >= t.xpNeeded) tier = t; else break;
  }
  return tier;
}

function skzVipNextTier(xp) {
  const current = skzVipTierForXp(xp);
  return SKZ_VIP_TIERS.find(t => t.level === current.level + 1) || null;
}

function skzVipProgress() {
  const state = skzVipGetState();
  const tier = skzVipTierForXp(state.xp);
  const next = skzVipNextTier(state.xp);
  const span = next ? (next.xpNeeded - tier.xpNeeded) : 1;
  const into = next ? (state.xp - tier.xpNeeded) : span;
  const pct = next ? Math.max(0, Math.min(100, Math.round((into / span) * 100))) : 100;
  return { xp: state.xp, tier, next, pct, into, span };
}

// Joriy VIP darajasiga qarab kunlik bonusga qo'shiladigan foiz (daily.js ishlatadi)
function skzVipDailyBonusPct() {
  return skzVipTierForXp(skzVipGetState().xp).dailyBonusPct || 0;
}

function skzAddXP(amount) {
  if (!amount || amount <= 0) return;
  const state = skzVipGetState();
  const beforeTier = skzVipTierForXp(state.xp);
  state.xp += Math.round(amount);
  skzVipSaveState(state);
  const afterTier = skzVipTierForXp(state.xp);
  skzRenderVipBadge();
  if (afterTier.level > beforeTier.level) {
    skzShowLevelUpToast(afterTier);
  }
}

function skzShowLevelUpToast(tier) {
  if (typeof skzConfettiBurst === 'function') skzConfettiBurst({ count: 70, duration: 1800 });
  const el = document.createElement('div');
  el.className = 'skz-levelup-toast';
  el.innerHTML = `🎖️ Yangi daraja: <b>${tier.name}</b>!${tier.dailyBonusPct ? ` Kunlik bonus +${tier.dailyBonusPct}%` : ''}`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 3200);
}

function skzRenderVipBadge() {
  const { tier, pct, into, span } = skzVipProgress();
  document.querySelectorAll('.js-vip-badge').forEach(el => {
    el.innerText = `Lv.${tier.level} ${tier.name}`;
  });
  document.querySelectorAll('.js-vip-bar-fill').forEach(el => {
    el.style.width = pct + '%';
  });
  document.querySelectorAll('.js-vip-progress-text').forEach(el => {
    el.innerText = `${skzFmt(into)} / ${skzFmt(span)} XP`;
  });
}

document.addEventListener('DOMContentLoaded', skzRenderVipBadge);
