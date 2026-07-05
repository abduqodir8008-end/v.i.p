// ============================================
// COFEATURE — umumiy balans tizimi
// Barcha o'yin sahifalari shu faylni ulaydi, shu
// sababli balans har qanday o'yinda bir xil bo'lib qoladi.
// ============================================
const SKZ_KEY = 'skinoz_balance_v1';
const SKZ_START_BALANCE = 10000;

function skzGetBalance() {
  let v = localStorage.getItem(SKZ_KEY);
  if (v === null) {
    v = SKZ_START_BALANCE;
    localStorage.setItem(SKZ_KEY, v);
  }
  return parseInt(v, 10) || 0;
}

function skzSetBalance(value) {
  const safe = Math.max(0, Math.round(value));
  localStorage.setItem(SKZ_KEY, safe);
  skzRenderBalance();
  if (typeof skzStatsRecordPeakBalance === 'function') skzStatsRecordPeakBalance(safe);
  return safe;
}

function skzAddBalance(delta) {
  if (delta < 0 && typeof skzAddXP === 'function') {
    skzAddXP(Math.ceil(Math.abs(delta) / 10));
  }
  return skzSetBalance(skzGetBalance() + delta);
}

function skzFmt(num) {
  return Math.round(num).toLocaleString('ru-RU');
}

function skzRenderBalance() {
  const target = skzGetBalance();
  document.querySelectorAll('.js-balance').forEach(el => {
    const startText = (el.innerText || '0').replace(/[^\d-]/g, '');
    const start = parseInt(startText, 10) || 0;
    if (start === target) { el.innerText = skzFmt(target); return; }
    const duration = 420;
    const startTime = performance.now();
    el.classList.add('skz-bump');
    function tick(now) {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(start + (target - start) * eased);
      el.innerText = skzFmt(current);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        el.innerText = skzFmt(target);
        setTimeout(() => el.classList.remove('skz-bump'), 180);
      }
    }
    requestAnimationFrame(tick);
  });
}

function skzResetBalance() {
  skzSetBalance(SKZ_START_BALANCE);
}

// ============================================
// Inventar (keyslardan chiqqan sovg'alar) tizimi
// ============================================
const SKZ_INV_KEY = 'skinoz_inventory_v1';

function skzGetInventory() {
  try {
    const v = JSON.parse(localStorage.getItem(SKZ_INV_KEY));
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}

function skzSaveInventory(items) {
  localStorage.setItem(SKZ_INV_KEY, JSON.stringify(items));
  skzRenderInventoryCount();
}

function skzAddInventoryItem(item) {
  const items = skzGetInventory();
  const withId = Object.assign({ id: 'inv_' + Date.now() + '_' + Math.floor(Math.random() * 10000) }, item);
  items.unshift(withId);
  skzSaveInventory(items);
  if (typeof skzStatsRecordGiftDrop === 'function') skzStatsRecordGiftDrop(withId);
  if (typeof skzAddXP === 'function') skzAddXP(15);
  return withId;
}

function skzRemoveInventoryItem(id) {
  const items = skzGetInventory().filter(i => i.id !== id);
  skzSaveInventory(items);
}

function skzSellItem(id) {
  const items = skzGetInventory();
  const item = items.find(i => i.id === id);
  if (!item) return 0;
  skzAddBalance(item.value);
  skzRemoveInventoryItem(id);
  return item.value;
}

function skzSellAllInventory() {
  const items = skzGetInventory();
  const total = items.reduce((s, i) => s + i.value, 0);
  if (total > 0) skzAddBalance(total);
  skzSaveInventory([]);
  return total;
}

// ============================================
// "Yechib olish" (withdraw) so'rovlari — sof demo tizim.
// Sovg'a inventardan olib tashlanadi va so'rovlar tarixiga
// "Kutilmoqda" holatida qo'shiladi. Balansga aylanmaydi
// (buning uchun alohida "Sotish" tugmasi bor).
// ============================================
const SKZ_WITHDRAW_KEY = 'skinoz_withdrawals_v1';

function skzGetWithdrawals() {
  try {
    const v = JSON.parse(localStorage.getItem(SKZ_WITHDRAW_KEY));
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}

function skzSaveWithdrawals(list) {
  localStorage.setItem(SKZ_WITHDRAW_KEY, JSON.stringify(list));
}

function skzWithdrawItem(id) {
  const items = skzGetInventory();
  const item = items.find(i => i.id === id);
  if (!item) return null;
  const record = Object.assign({}, item, { requestedAt: Date.now(), status: 'pending' });
  const withdrawals = skzGetWithdrawals();
  withdrawals.unshift(record);
  skzSaveWithdrawals(withdrawals);
  skzRemoveInventoryItem(id);
  return record;
}

function skzWithdrawAllInventory() {
  const items = skzGetInventory();
  if (items.length === 0) return [];
  const withdrawals = skzGetWithdrawals();
  const records = items.map(item => Object.assign({}, item, { requestedAt: Date.now(), status: 'pending' }));
  skzSaveWithdrawals(records.concat(withdrawals));
  skzSaveInventory([]);
  return records;
}

function skzRenderInventoryCount() {
  const count = skzGetInventory().length;
  document.querySelectorAll('.js-inv-count').forEach(el => {
    el.innerText = count;
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

// Original stylized SVG gift icons shared by Cases / Inventory / Upgrader (no photos, no emoji)
const SKZ_RARITY_LABEL = { common: "Oddiy", rare: "Noyob", epic: "Epik", legendary: "Afsonaviy" };

function skzGiftIconSvg(shape) {
  const shapes = {
    star: '<path d="M20 4 L24 15 L36 15 L26.5 22 L30 33 L20 26 L10 33 L13.5 22 L4 15 L16 15 Z" fill="#fff"/>',
    heart: '<path d="M20 33 C 6 24, 4 14, 12 9 C 17 6, 20 10, 20 10 C 20 10, 23 6, 28 9 C 36 14, 34 24, 20 33 Z" fill="#fff"/>',
    diamond: '<path d="M20 3 L32 14 L20 37 L8 14 Z" fill="#fff"/>',
    crown: '<path d="M6 30 L8 14 L15 21 L20 10 L25 21 L32 14 L34 30 Z" fill="#fff"/>',
    rocket: '<path d="M20 2 C 27 8, 27 20, 22 28 L18 28 C 13 20, 13 8, 20 2 Z M14 26 L10 34 L18 30 Z M26 26 L30 34 L22 30 Z" fill="#fff"/>',
    trophy: '<path d="M12 6 H28 V14 C28 20, 24 24, 20 24 C16 24, 12 20, 12 14 Z M17 24 H23 V29 H17 Z M12 30 H28 V34 H12 Z M12 8 H6 V12 C6 16, 9 18, 12 18 Z M28 8 H34 V12 C34 16, 31 18, 28 18 Z" fill="#fff"/>',
    gift: '<rect x="8" y="16" width="24" height="18" rx="2" fill="#fff"/><rect x="6" y="10" width="28" height="7" rx="1.5" fill="#fff" opacity="0.85"/><rect x="18" y="10" width="4" height="24" fill="rgba(0,0,0,0.25)"/><path d="M20 10 C 14 10, 12 3, 18 3 C 21 3, 20 8, 20 10 Z" fill="#fff"/><path d="M20 10 C 26 10, 28 3, 22 3 C 19 3, 20 8, 20 10 Z" fill="#fff"/>',
    ring: '<circle cx="20" cy="24" r="10" stroke="#fff" stroke-width="3.5" fill="none"/><path d="M14 15 L20 5 L26 15 Z" fill="#fff"/>'
  };
  return `<svg viewBox="0 0 40 38" xmlns="http://www.w3.org/2000/svg">${shapes[shape] || shapes.gift}</svg>`;
}

document.addEventListener('DOMContentLoaded', skzRenderInventoryCount);

document.addEventListener('DOMContentLoaded', skzRenderBalance);
