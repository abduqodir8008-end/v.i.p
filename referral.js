// ============================================
// COFEATURE — Referal (do'stni taklif qilish) tizimi
// Butunlay ICHKI: tashqi havola yoki Telegram'ga yo'naltirish yo'q.
// Har bir brauzer/profil o'ziga xos kod oladi va bitta marta boshqa
// kodni "faollashtirishi" mumkin — bonus darhol shu yerda beriladi.
// ============================================

const SKZ_REF_CODE_KEY = 'skinoz_ref_code_v1';
const SKZ_REF_REDEEMED_KEY = 'skinoz_ref_redeemed_v1';
const SKZ_REF_REWARD = 1000;

function skzGetReferralCode() {
  let code = localStorage.getItem(SKZ_REF_CODE_KEY);
  if (!code) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let suffix = '';
    for (let i = 0; i < 6; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
    code = 'COF-' + suffix;
    localStorage.setItem(SKZ_REF_CODE_KEY, code);
  }
  return code;
}

function skzReferralRedeemedInfo() {
  try {
    return JSON.parse(localStorage.getItem(SKZ_REF_REDEEMED_KEY));
  } catch (e) { return null; }
}

// Boshqa birovning kodini faollashtirish — brauzer boshiga faqat bir marta
function skzRedeemReferralCode(inputCode) {
  const code = (inputCode || '').trim().toUpperCase();
  if (!code) return { ok: false, reason: 'empty' };
  if (skzReferralRedeemedInfo()) return { ok: false, reason: 'already-used' };
  if (code === skzGetReferralCode()) return { ok: false, reason: 'self' };
  if (!/^COF-[A-Z0-9]{4,10}$/.test(code)) return { ok: false, reason: 'invalid-format' };

  localStorage.setItem(SKZ_REF_REDEEMED_KEY, JSON.stringify({ code, at: Date.now(), reward: SKZ_REF_REWARD }));
  skzAddBalance(SKZ_REF_REWARD);
  return { ok: true, reward: SKZ_REF_REWARD };
}
