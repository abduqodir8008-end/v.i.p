// ============================================
// COFEATURE — umumiy sovg'a (gift) katalogi
// Barcha rasmlar img/ papkasidan olinadi.
// Bu fayl cases.html, upgrade.html va inventory.html
// tomonidan ishlatiladi.
// ============================================
const SKZ_GIFTS = [
  { file: 'Astral Shard.webp', name: 'Astral Shard', rarity: 'legendary', weight: 0.16, mult: 14.6 },
  { file: 'Diamond Ring.webp', name: 'Diamond Ring', rarity: 'legendary', weight: 0.26, mult: 24.09 },
  { file: 'Durovs Cap.webp', name: 'Durovs Cap', rarity: 'legendary', weight: 0.24, mult: 22.33 },
  { file: 'Heroic Helmet.webp', name: 'Heroic Helmet', rarity: 'legendary', weight: 0.43, mult: 38.43 },
  { file: 'Plush Pepe.webp', name: 'Plush Pepe', rarity: 'legendary', weight: 0.41, mult: 37.1 },
  { file: 'Precious Peach.webp', name: 'Precious Peach', rarity: 'legendary', weight: 0.16, mult: 15.13 },
  { file: 'Signet Ring.webp', name: 'Signet Ring', rarity: 'legendary', weight: 0.37, mult: 33.46 },
  { file: 'Snoop Dogg.webp', name: 'Snoop Dogg', rarity: 'legendary', weight: 0.37, mult: 33.3 },
  { file: 'Swiss Watch.webp', name: 'Swiss Watch', rarity: 'legendary', weight: 0.4, mult: 36.51 },
  { file: 'Crystal Ball.webp', name: 'Crystal Ball', rarity: 'epic', weight: 1.86, mult: 5.83 },
  { file: 'Crystal Eagle.webp', name: 'Crystal Eagle', rarity: 'epic', weight: 1.28, mult: 4.24 },
  { file: 'Durov\'s Sunglasses.webp', name: 'Durov\'s Sunglasses', rarity: 'epic', weight: 2.2, mult: 6.78 },
  { file: 'Durovs Boots.webp', name: 'Durovs Boots', rarity: 'epic', weight: 2.25, mult: 6.92 },
  { file: 'Durovs Coat.webp', name: 'Durovs Coat', rarity: 'epic', weight: 2.72, mult: 8.22 },
  { file: 'Durovs Figurine.webp', name: 'Durovs Figurine', rarity: 'epic', weight: 2.38, mult: 7.28 },
  { file: 'Electric Skull.webp', name: 'Electric Skull', rarity: 'epic', weight: 2.17, mult: 6.7 },
  { file: 'Gem Signet.webp', name: 'Gem Signet', rarity: 'epic', weight: 1.47, mult: 4.75 },
  { file: 'Genie Lamp.webp', name: 'Genie Lamp', rarity: 'epic', weight: 1.76, mult: 5.55 },
  { file: 'Ion Gem.webp', name: 'Ion Gem', rarity: 'epic', weight: 1.44, mult: 4.66 },
  { file: 'Khabibs Papakha.webp', name: 'Khabibs Papakha', rarity: 'epic', weight: 1.69, mult: 5.37 },
  { file: 'Low Rider.webp', name: 'Low Rider', rarity: 'epic', weight: 2.48, mult: 7.56 },
  { file: 'Mighty Arm.webp', name: 'Mighty Arm', rarity: 'epic', weight: 1.54, mult: 4.94 },
  { file: 'Scared Cat.webp', name: 'Scared Cat', rarity: 'epic', weight: 1.66, mult: 5.29 },
  { file: 'Snoop Cigar.webp', name: 'Snoop Cigar', rarity: 'epic', weight: 1.93, mult: 6.03 },
  { file: 'Statue of Liberty.webp', name: 'Statue of Liberty', rarity: 'epic', weight: 2.32, mult: 7.1 },
  { file: 'Torch of Freedom.webp', name: 'Torch of Freedom', rarity: 'epic', weight: 1.42, mult: 4.62 },
  { file: 'Trojan Horse.webp', name: 'Trojan Horse', rarity: 'epic', weight: 1.5, mult: 4.83 },
  { file: 'UFC Strike.webp', name: 'UFC Strike', rarity: 'epic', weight: 1.72, mult: 5.45 },
  { file: 'Voodoo Doll.webp', name: 'Voodoo Doll', rarity: 'epic', weight: 2.51, mult: 7.65 },
  { file: 'Westside Sign.webp', name: 'Westside Sign', rarity: 'epic', weight: 1.87, mult: 5.86 },
  { file: '1 May.webp', name: '1 May', rarity: 'rare', weight: 10.28, mult: 1.4 },
  { file: 'Backpack.webp', name: 'Backpack', rarity: 'rare', weight: 15.44, mult: 2.3 },
  { file: 'Bear New Year.webp', name: 'Bear New Year', rarity: 'rare', weight: 15.12, mult: 2.25 },
  { file: 'Berry Box.webp', name: 'Berry Box', rarity: 'rare', weight: 15.05, mult: 2.23 },
  { file: 'Big Year.webp', name: 'Big Year', rarity: 'rare', weight: 8.34, mult: 1.06 },
  { file: 'Book.webp', name: 'Book', rarity: 'rare', weight: 8.91, mult: 1.16 },
  { file: 'Candy Cane.webp', name: 'Candy Cane', rarity: 'rare', weight: 9.66, mult: 1.29 },
  { file: 'Clover Pin.webp', name: 'Clover Pin', rarity: 'rare', weight: 9.12, mult: 1.2 },
  { file: 'Coconut.webp', name: 'Coconut', rarity: 'rare', weight: 9.54, mult: 1.27 },
  { file: 'Coffin.webp', name: 'Coffin', rarity: 'rare', weight: 14.72, mult: 2.18 },
  { file: 'Cookie Heart.webp', name: 'Cookie Heart', rarity: 'rare', weight: 14.2, mult: 2.08 },
  { file: 'Dove of Peace.webp', name: 'Dove of Peace', rarity: 'rare', weight: 9.32, mult: 1.23 },
  { file: 'Easter Bear.webp', name: 'Easter Bear', rarity: 'rare', weight: 15.77, mult: 2.36 },
  { file: 'Easter Egg.webp', name: 'Easter Egg', rarity: 'rare', weight: 15.9, mult: 2.38 },
  { file: 'Eternal Rose.webp', name: 'Eternal Rose', rarity: 'rare', weight: 13.47, mult: 1.96 },
  { file: 'Evil Eye.webp', name: 'Evil Eye', rarity: 'rare', weight: 15.46, mult: 2.31 },
  { file: 'Flying Broom.webp', name: 'Flying Broom', rarity: 'rare', weight: 14.11, mult: 2.07 },
  { file: 'Heart Locket.webp', name: 'Heart Locket', rarity: 'rare', weight: 13.12, mult: 1.9 },
  { file: 'Holiday Drink.webp', name: 'Holiday Drink', rarity: 'rare', weight: 8.11, mult: 1.02 },
  { file: 'Hypno Lollipop.webp', name: 'Hypno Lollipop', rarity: 'rare', weight: 14.36, mult: 2.11 },
  { file: 'Ice Cream.webp', name: 'Ice Cream', rarity: 'rare', weight: 14.68, mult: 2.17 },
  { file: 'Ice Cream Scoops.webp', name: 'Ice Cream Scoops', rarity: 'rare', weight: 13.02, mult: 1.88 },
  { file: 'Instant Ramen.webp', name: 'Instant Ramen', rarity: 'rare', weight: 10.0, mult: 1.35 },
  { file: 'Irish Bear.webp', name: 'Irish Bear', rarity: 'rare', weight: 8.76, mult: 1.13 },
  { file: 'Jack in the Box.webp', name: 'Jack in the Box', rarity: 'rare', weight: 8.8, mult: 1.14 },
  { file: 'Light Sword.webp', name: 'Light Sword', rarity: 'rare', weight: 10.23, mult: 1.39 },
  { file: 'Lush Bouquet.webp', name: 'Lush Bouquet', rarity: 'rare', weight: 15.14, mult: 2.25 },
  { file: 'Mask.webp', name: 'Mask', rarity: 'rare', weight: 14.29, mult: 2.1 },
  { file: 'May Bear.webp', name: 'May Bear', rarity: 'rare', weight: 15.58, mult: 2.33 },
  { file: 'Medal.webp', name: 'Medal', rarity: 'rare', weight: 13.18, mult: 1.91 },
  { file: 'Money Pot.webp', name: 'Money Pot', rarity: 'rare', weight: 14.81, mult: 2.19 },
  { file: 'Moon Pendant.webp', name: 'Moon Pendant', rarity: 'rare', weight: 9.42, mult: 1.25 },
  { file: 'Pen.webp', name: 'Pen', rarity: 'rare', weight: 15.42, mult: 2.3 },
  { file: 'Perfume Bottle.webp', name: 'Perfume Bottle', rarity: 'rare', weight: 11.77, mult: 1.66 },
  { file: 'Pink Flamingo.webp', name: 'Pink Flamingo', rarity: 'rare', weight: 9.33, mult: 1.23 },
  { file: 'Red Star.webp', name: 'Red Star', rarity: 'rare', weight: 10.89, mult: 1.51 },
  { file: 'Restless Jar.webp', name: 'Restless Jar', rarity: 'rare', weight: 12.02, mult: 1.7 },
  { file: 'Roses.webp', name: 'Roses', rarity: 'rare', weight: 15.6, mult: 2.33 },
  { file: 'Santa Hat.webp', name: 'Santa Hat', rarity: 'rare', weight: 10.34, mult: 1.41 },
  { file: 'Sky Stilettos.webp', name: 'Sky Stilettos', rarity: 'rare', weight: 15.96, mult: 2.39 },
  { file: 'Sleigh Bell.webp', name: 'Sleigh Bell', rarity: 'rare', weight: 9.33, mult: 1.23 },
  { file: 'Snake Box.webp', name: 'Snake Box', rarity: 'rare', weight: 11.61, mult: 1.63 },
  { file: 'Snow Mittens.webp', name: 'Snow Mittens', rarity: 'rare', weight: 9.2, mult: 1.21 },
  { file: 'Spring Basket.webp', name: 'Spring Basket', rarity: 'rare', weight: 9.63, mult: 1.28 },
  { file: 'Swag Bag.webp', name: 'Swag Bag', rarity: 'rare', weight: 13.19, mult: 1.91 },
  { file: 'Tama Gadget.webp', name: 'Tama Gadget', rarity: 'rare', weight: 9.79, mult: 1.31 },
  { file: 'Valentine Box.webp', name: 'Valentine Box', rarity: 'rare', weight: 11.31, mult: 1.58 },
  { file: 'Artisan Brick.webp', name: 'Artisan Brick', rarity: 'common', weight: 37.91, mult: 0.56 },
  { file: 'B-Day Candle.webp', name: 'B-Day Candle', rarity: 'common', weight: 40.08, mult: 0.61 },
  { file: 'Bling Binky.webp', name: 'Bling Binky', rarity: 'common', weight: 35.01, mult: 0.49 },
  { file: 'Bonded Ring.webp', name: 'Bonded Ring', rarity: 'common', weight: 31.05, mult: 0.41 },
  { file: 'Bow Tie.webp', name: 'Bow Tie', rarity: 'common', weight: 32.12, mult: 0.43 },
  { file: 'Bunny Muffin.webp', name: 'Bunny Muffin', rarity: 'common', weight: 27.11, mult: 0.32 },
  { file: 'Candle Lamp.webp', name: 'Candle Lamp', rarity: 'common', weight: 39.29, mult: 0.59 },
  { file: 'Christmas Tree.webp', name: 'Christmas Tree', rarity: 'common', weight: 32.07, mult: 0.43 },
  { file: 'Clown Bear.webp', name: 'Clown Bear', rarity: 'common', weight: 29.35, mult: 0.37 },
  { file: 'Cupid Charm.webp', name: 'Cupid Charm', rarity: 'common', weight: 34.78, mult: 0.49 },
  { file: 'Desk Calendar.webp', name: 'Desk Calendar', rarity: 'common', weight: 30.46, mult: 0.39 },
  { file: 'Easter Cake.webp', name: 'Easter Cake', rarity: 'common', weight: 35.12, mult: 0.5 },
  { file: 'Eternal Candle.webp', name: 'Eternal Candle', rarity: 'common', weight: 35.46, mult: 0.5 },
  { file: 'Faith Amulet.webp', name: 'Faith Amulet', rarity: 'common', weight: 37.27, mult: 0.54 },
  { file: 'Fresh Socks.webp', name: 'Fresh Socks', rarity: 'common', weight: 39.78, mult: 0.6 },
  { file: 'Ginger Cookie.webp', name: 'Ginger Cookie', rarity: 'common', weight: 25.07, mult: 0.27 },
  { file: 'Gravestone.webp', name: 'Gravestone', rarity: 'common', weight: 32.7, mult: 0.44 },
  { file: 'Hanging Star.webp', name: 'Hanging Star', rarity: 'common', weight: 29.2, mult: 0.37 },
  { file: 'Happy Brownie.webp', name: 'Happy Brownie', rarity: 'common', weight: 34.82, mult: 0.49 },
  { file: 'Hex Pot.webp', name: 'Hex Pot', rarity: 'common', weight: 40.89, mult: 0.63 },
  { file: 'Homemade Cake.webp', name: 'Homemade Cake', rarity: 'common', weight: 27.3, mult: 0.32 },
  { file: 'I love you.webp', name: 'I love you', rarity: 'common', weight: 30.93, mult: 0.4 },
  { file: 'Ice Cream Cone.webp', name: 'Ice Cream Cone', rarity: 'common', weight: 33.49, mult: 0.46 },
  { file: 'Input Key.webp', name: 'Input Key', rarity: 'common', weight: 38.55, mult: 0.57 },
  { file: 'Ionic Dryer.webp', name: 'Ionic Dryer', rarity: 'common', weight: 41.47, mult: 0.64 },
  { file: 'Jelly Bunny.webp', name: 'Jelly Bunny', rarity: 'common', weight: 36.62, mult: 0.53 },
  { file: 'Jester Hat.webp', name: 'Jester Hat', rarity: 'common', weight: 34.87, mult: 0.49 },
  { file: 'Jingle Bells.webp', name: 'Jingle Bells', rarity: 'common', weight: 34.8, mult: 0.49 },
  { file: 'Jolly Chimp.webp', name: 'Jolly Chimp', rarity: 'common', weight: 31.28, mult: 0.41 },
  { file: 'Joyful Bundle.webp', name: 'Joyful Bundle', rarity: 'common', weight: 33.32, mult: 0.46 },
  { file: 'Kissed Frog.webp', name: 'Kissed Frog', rarity: 'common', weight: 29.73, mult: 0.38 },
  { file: 'Kitty Medallion.webp', name: 'Kitty Medallion', rarity: 'common', weight: 28.79, mult: 0.36 },
  { file: 'Lol Pop.webp', name: 'Lol Pop', rarity: 'common', weight: 35.78, mult: 0.51 },
  { file: 'Loot Bag.webp', name: 'Loot Bag', rarity: 'common', weight: 34.72, mult: 0.49 },
  { file: 'Love Candle.webp', name: 'Love Candle', rarity: 'common', weight: 27.11, mult: 0.32 },
  { file: 'Love Potion.webp', name: 'Love Potion', rarity: 'common', weight: 33.79, mult: 0.47 },
  { file: 'Lunar Snake.webp', name: 'Lunar Snake', rarity: 'common', weight: 37.27, mult: 0.54 },
  { file: 'Mad Pumpkin.webp', name: 'Mad Pumpkin', rarity: 'common', weight: 36.34, mult: 0.52 },
  { file: 'Magic Potion.webp', name: 'Magic Potion', rarity: 'common', weight: 36.39, mult: 0.53 },
  { file: 'Mini Oscar.webp', name: 'Mini Oscar', rarity: 'common', weight: 41.38, mult: 0.64 },
  { file: 'Mousse Cake.webp', name: 'Mousse Cake', rarity: 'common', weight: 36.51, mult: 0.53 },
  { file: 'Nail Bracelet.webp', name: 'Nail Bracelet', rarity: 'common', weight: 37.07, mult: 0.54 },
  { file: 'Neko Helmet.webp', name: 'Neko Helmet', rarity: 'common', weight: 27.89, mult: 0.34 },
  { file: 'Party Sparkler.webp', name: 'Party Sparkler', rarity: 'common', weight: 36.76, mult: 0.53 },
  { file: 'Pet Snake.webp', name: 'Pet Snake', rarity: 'common', weight: 37.65, mult: 0.55 },
  { file: 'Pink Bear.webp', name: 'Pink Bear', rarity: 'common', weight: 30.38, mult: 0.39 },
  { file: 'Plane.webp', name: 'Plane', rarity: 'common', weight: 28.47, mult: 0.35 },
  { file: 'Polar Bear.webp', name: 'Polar Bear', rarity: 'common', weight: 36.71, mult: 0.53 },
  { file: 'Pretty Posy.webp', name: 'Pretty Posy', rarity: 'common', weight: 38.22, mult: 0.57 },
  { file: 'Record Player.webp', name: 'Record Player', rarity: 'common', weight: 30.41, mult: 0.39 },
  { file: 'Resistance Dog.webp', name: 'Resistance Dog', rarity: 'common', weight: 40.1, mult: 0.61 },
  { file: 'Sakura Flower.webp', name: 'Sakura Flower', rarity: 'common', weight: 33.37, mult: 0.46 },
  { file: 'Sandcastle.webp', name: 'Sandcastle', rarity: 'common', weight: 35.25, mult: 0.5 },
  { file: 'Sharp Tongue.webp', name: 'Sharp Tongue', rarity: 'common', weight: 30.41, mult: 0.39 },
  { file: 'Skull Flower.webp', name: 'Skull Flower', rarity: 'common', weight: 41.78, mult: 0.65 },
  { file: 'Snow Globe.webp', name: 'Snow Globe', rarity: 'common', weight: 28.67, mult: 0.35 },
  { file: 'Spiced Wine.webp', name: 'Spiced Wine', rarity: 'common', weight: 29.08, mult: 0.36 },
  { file: 'Spy Agaric.webp', name: 'Spy Agaric', rarity: 'common', weight: 29.78, mult: 0.38 },
  { file: 'Star Notepad.webp', name: 'Star Notepad', rarity: 'common', weight: 26.25, mult: 0.3 },
  { file: 'Stellar Rocket.webp', name: 'Stellar Rocket', rarity: 'common', weight: 34.8, mult: 0.49 },
  { file: 'Surfboard.webp', name: 'Surfboard', rarity: 'common', weight: 27.27, mult: 0.32 },
  { file: 'Top Hat.webp', name: 'Top Hat', rarity: 'common', weight: 32.81, mult: 0.45 },
  { file: 'Toy Bear.webp', name: 'Toy Bear', rarity: 'common', weight: 29.65, mult: 0.38 },
  { file: 'Trapped Heart.webp', name: 'Trapped Heart', rarity: 'common', weight: 33.57, mult: 0.46 },
  { file: 'Vintage Cigar.webp', name: 'Vintage Cigar', rarity: 'common', weight: 37.36, mult: 0.55 },
  { file: 'Whip Cupcake.webp', name: 'Whip Cupcake', rarity: 'common', weight: 36.54, mult: 0.53 },
  { file: 'Winter Wreath.webp', name: 'Winter Wreath', rarity: 'common', weight: 24.38, mult: 0.26 },
  { file: 'Witch Hat.webp', name: 'Witch Hat', rarity: 'common', weight: 29.71, mult: 0.38 },
  { file: 'Xmas Stocking.webp', name: 'Xmas Stocking', rarity: 'common', weight: 29.6, mult: 0.37 },
];

function skzGiftSrc(file) {
  return 'img/' + encodeURIComponent(file);
}

// <img> tegini qaytaradi — rasm topilmasa umumiy 🎁 belgisi ko'rsatiladi
function skzGiftImg(file, name, extraClass) {
  const safeName = (name || '').replace(/"/g, '&quot;');
  return `<img src="${skzGiftSrc(file)}" alt="${safeName}" class="gift-img ${extraClass || ''}" loading="lazy" onerror="this.onerror=null;this.src='img/Case.webp';">`;
}

function skzWeightedGiftPick() {
  const total = SKZ_GIFTS.reduce((s, g) => s + g.weight, 0);
  let r = Math.random() * total;
  for (const g of SKZ_GIFTS) {
    if (r < g.weight) return g;
    r -= g.weight;
  }
  return SKZ_GIFTS[0];
}

function skzGiftsByRarity(rarity) {
  return SKZ_GIFTS.filter(g => g.rarity === rarity);
}

// Har bir sovg'a uchun mustaqil (case narxidan qat'i nazar) taxminiy bozor
// qiymati — 100 💎 lik "bronza" bazasiga nisbatan hisoblanadi. Shu qiymat
// Apgreyderda "qaysi sovg'aga aylanishi mumkin"ligini tanlashda ishlatiladi.
function skzGiftBaseValue(g) {
  return Math.max(1, Math.round(g.mult * 100));
}

// Berilgan maqsadli qiymatga eng yaqin, lekin imkon qadar boshqa (asl
// sovg'adan farqli) sovg'ani topadi — Apgreyderda "boshqa, qimmatroq sovg'a"
// chiqishi uchun ishlatiladi.
function skzFindTargetGift(targetValue, excludeFile) {
  let candidates = SKZ_GIFTS.filter(g => g.file !== excludeFile);
  if (candidates.length === 0) candidates = SKZ_GIFTS;

  // Har bir sovg'a uchun maqsadli qiymatdan qanchalik farq qilishini hisoblaymiz
  const scored = candidates
    .map(g => ({ g, diff: Math.abs(skzGiftBaseValue(g) - targetValue) }))
    .sort((a, b) => a.diff - b.diff);

  // Qiymati ±35% oralig'ida turgan barcha sovg'alarni tanlov ro'yxatiga olamiz —
  // shunday qilib har safar bitta sovg'a emas, turli xil sovg'alar chiqadi
  const tolerance = Math.max(targetValue * 0.35, 20);
  let shortlist = scored.filter(s => s.diff <= tolerance).map(s => s.g);

  // Agar tolerance ichida yetarlicha variant topilmasa, eng yaqin bir nechtasini olamiz
  if (shortlist.length < 3) {
    shortlist = scored.slice(0, Math.min(5, scored.length)).map(s => s.g);
  }

  return shortlist[Math.floor(Math.random() * shortlist.length)];
}
