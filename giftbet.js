// ============================================
// COFEATURE — o'yinlarda INVENTAR SOVG'ASINI TIKISH
// Har qanday o'yin: pul (💎) o'rniga inventardagi sovg'ani
// tikish imkonini beradi. Yutsa — mos qiymatdagi BOSHQA sovg'a
// tushadi, yutqazsa — tikkan sovg'a kuyib ketadi (butunlay yo'qoladi).
// ============================================

let skzStake = { mode: 'cash', item: null };
let skzGiftBetRefresh = null;

function skzGiftBetInitUI(containerId, onChange) {
  const container = document.getElementById(containerId);
  if (!container) return;

  function render() {
    const inv = skzGetInventory();
    container.innerHTML = `
      <div class="stake-mode-row">
        <button type="button" class="stake-mode-btn ${skzStake.mode === 'cash' ? 'active' : ''}" data-mode="cash">💎 Pul bilan</button>
        <button type="button" class="stake-mode-btn ${skzStake.mode === 'gift' ? 'active' : ''}" data-mode="gift">🎁 Sovg'a bilan</button>
      </div>
      ${skzStake.mode === 'gift' ? `
        <div class="stake-gift-row">
          ${inv.length === 0
            ? `<div class="stake-gift-empty">Inventaringizda sovg'a yo'q. <a href="cases.html">Keys oching</a> yoki <a href="upgrade.html">Apgreyd</a> qiling.</div>`
            : inv.map(it => `
              <div class="stake-gift-item ${skzStake.item && skzStake.item.id === it.id ? 'active' : ''}" data-id="${it.id}">
                <div class="gift-icon-wrap rarity-${it.rarity}">${skzGiftImg(it.file, it.name)}</div>
                <div class="val">💎${skzFmt(it.value)}</div>
              </div>
            `).join('')}
        </div>
      ` : ''}
    `;

    container.querySelectorAll('.stake-mode-btn').forEach(btn => {
      btn.onclick = () => {
        skzStake.mode = btn.dataset.mode;
        if (skzStake.mode === 'cash') skzStake.item = null;
        render();
        if (onChange) onChange();
      };
    });
    container.querySelectorAll('.stake-gift-item').forEach(el => {
      el.onclick = () => {
        const it = skzGetInventory().find(i => i.id === el.dataset.id);
        skzStake.item = it || null;
        render();
        if (onChange) onChange();
      };
    });
  }

  render();
  skzGiftBetRefresh = render;
}

// Joriy tikish rejimida "stavka qiymati"ni qaytaradi (pul rejimida — kiritilgan
// summa, sovg'a rejimida — tanlangan sovg'aning qiymati)
function skzGiftBetActiveValue(cashAmount) {
  if (skzStake.mode === 'gift') return skzStake.item ? skzStake.item.value : 0;
  return cashAmount;
}

function skzGiftBetCanPlace(cashAmount) {
  if (skzStake.mode === 'gift') return !!skzStake.item;
  return cashAmount > 0 && skzGetBalance() >= cashAmount;
}

// Tikish qo'yilganda chaqiriladi: pul ayiriladi yoki sovg'a darhol
// inventardan olib tashlanadi ("garovga qo'yiladi")
function skzGiftBetConsume(cashAmount) {
  if (skzStake.mode === 'gift' && skzStake.item) {
    const staked = skzStake.item;
    skzRemoveInventoryItem(staked.id);
    skzStake.item = null;
    if (skzGiftBetRefresh) skzGiftBetRefresh();
    if (typeof skzAddXP === 'function') skzAddXP(Math.ceil(staked.value / 10));
    return { mode: 'gift', value: staked.value, stakedItem: staked };
  }
  skzAddBalance(-cashAmount);
  return { mode: 'cash', value: cashAmount };
}

// G'alaba: multiplier — shu safar necha barobar yutilgani
function skzGiftBetResolveWin(stakeInfo, multiplier) {
  if (stakeInfo.mode === 'gift') {
    const targetValue = Math.max(1, Math.floor(stakeInfo.value * multiplier));
    const targetGift = skzFindTargetGift(targetValue, stakeInfo.stakedItem.file);
    const newItem = skzAddInventoryItem({
      name: targetGift.name,
      rarity: targetGift.rarity,
      file: targetGift.file,
      value: targetValue
    });
    if (skzGiftBetRefresh) skzGiftBetRefresh();
    return { type: 'gift', gift: newItem, from: stakeInfo.stakedItem };
  }
  const winAmount = Math.floor(stakeInfo.value * multiplier);
  skzAddBalance(winAmount);
  return { type: 'cash', amount: winAmount };
}

// Yutqazish: sovg'a tikish vaqtida allaqachon kuygan (olib tashlangan),
// pul esa allaqachon ayirilgan — bu yerda faqat UI yangilanadi
function skzGiftBetResolveLose(stakeInfo) {
  if (skzGiftBetRefresh) skzGiftBetRefresh();
  return stakeInfo.mode === 'gift'
    ? { type: 'gift-lost', from: stakeInfo.stakedItem }
    : { type: 'cash-lost', amount: stakeInfo.value };
}
