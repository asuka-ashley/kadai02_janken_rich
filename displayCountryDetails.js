const countryDetails = {
"アメリカ合衆国": { capital: "ワシントンD.C.", population: "3億3100万人", area: "9,834,000 km²", language: "英語", spots: ["自由の女神", "グランドキャニオン", "タイムズスクエア"] },
"イタリア": { capital: "ローマ", population: "5900万人", area: "301,340 km²", language: "イタリア語", spots: ["コロッセオ", "フィレンツェ", "ベネチア"] },
"中国": { capital: "北京", population: "14億人", area: "9,596,961 km²", language: "中国語", spots: ["万里の長城", "故宮", "上海"] },
"メキシコ": { capital: "メキシコシティ", population: "1億2600万人", area: "1,964,375 km²", language: "スペイン語", spots: ["チチェン・イッツァ", "テオティワカン", "カンクン"] },
"タイ": { capital: "バンコク", population: "7000万人", area: "513,120 km²", language: "タイ語", spots: ["ワット・ポー", "アユタヤ", "プーケット"] },
"日本": { capital: "東京", population: "1億2600万人", area: "377,975 km²", language: "日本語", spots: ["東京タワー", "富士山", "京都"] },
"ブラジル": { capital: "ブラジリア", population: "2億1200万人", area: "8,515,767 km²", language: "ポルトガル語", spots: ["コパカバーナビーチ", "イグアスの滝", "リオのキリスト像"] },
"フランス": { capital: "パリ", population: "6700万人", area: "551,695 km²", language: "フランス語", spots: ["エッフェル塔", "ルーブル美術館", "モン・サン＝ミシェル"] },
"スペイン": { capital: "マドリード", population: "4700万人", area: "505,990 km²", language: "スペイン語", spots: ["サグラダ・ファミリア", "プラド美術館", "アルハンブラ宮殿"] },
"オーストラリア": { capital: "キャンベラ", population: "2500万人", area: "7,692,024 km²", language: "英語", spots: ["シドニーオペラハウス", "グレートバリアリーフ", "エアーズロック"] },
"カナダ": { capital: "オタワ", population: "3800万人", area: "9,984,670 km²", language: "英語、フランス語", spots: ["ナイアガラの滝", "バンクーバー", "カナディアンロッキー"] },
"インド": { capital: "ニューデリー", population: "13億8000万人", area: "3,287,263 km²", language: "ヒンディー語、英語", spots: ["タージマハル", "ガンジス川", "ジャイプール宮殿"] },
"南アフリカ": { capital: "プレトリア", population: "6000万人", area: "1,221,037 km²", language: "英語、アフリカーンス語", spots: ["テーブルマウンテン", "クルーガー国立公園", "ケープタウン"] },
"エジプト": { capital: "カイロ", population: "1億400万人", area: "1,010,408 km²", language: "アラビア語", spots: ["ピラミッド", "スフィンクス", "ルクソール神殿"] },
"アルゼンチン": { capital: "ブエノスアイレス", population: "4500万人", area: "2,780,400 km²", language: "スペイン語", spots: ["イグアスの滝", "ペリト・モレノ氷河", "ラ・ボカ地区"] }
};

const countries = [
{ name: "日本", coords: [35.6895, 139.6917] },
{ name: "ブラジル", coords: [-15.7942, -47.8822] },
{ name: "フランス", coords: [48.8566, 2.3522] },
{ name: "スペイン", coords: [40.4168, -3.7038] },
{ name: "オーストラリア", coords: [-35.2809, 149.1300] },
{ name: "カナダ", coords: [45.4215, -75.6972] },
{ name: "インド", coords: [28.6139, 77.2090] },
{ name: "南アフリカ", coords: [-25.7461, 28.1881] },
{ name: "エジプト", coords: [30.0444, 31.2357] },
{ name: "アルゼンチン", coords: [-34.6037, -58.3816] },
{ name: "アメリカ合衆国", coords: [38.9072, -77.0369] },
{ name: "イタリア", coords: [41.9028, 12.4964] },
{ name: "中国", coords: [39.9042, 116.4074] },
{ name: "メキシコ", coords: [19.4326, -99.1332] },
{ name: "タイ", coords: [13.7563, 100.5018] }
];
const countryThemes = {
resort: ["ブラジル", "オーストラリア", "エジプト", "メキシコ", "タイ"],
city: ["日本", "フランス", "スペイン", "カナダ", "アメリカ合衆国", "中国", "イタリア"],
nature: ["南アフリカ", "アルゼンチン", "インド"]
};

const homeScreen = document.getElementById('home-screen');
const dartScreen = document.getElementById('dart-screen');
const resultScreen = document.getElementById('result-screen');
const dartAnimation = document.getElementById('dart-animation');
const countryName = document.getElementById('country-name');
const retryBtn = document.getElementById('retry-btn');
const dartSound = document.getElementById('dart-sound');
const bgm = document.getElementById('bgm');
const clickSound = document.getElementById('click-sound');
let mapInstance = null;

document.querySelectorAll('.start-btn').forEach(button => {
button.addEventListener('click', async (e) => {
const selectedTheme = e.currentTarget.dataset.theme;
const filteredCountries = countries.filter(c => countryThemes[selectedTheme].includes(c.name));

homeScreen.classList.add('hidden');
dartScreen.classList.remove('hidden');
dartAnimation.style.opacity = 1;

clickSound.currentTime = 0;
await clickSound.play();

dartSound.currentTime = 0;
dartSound.play();

setTimeout(() => {
  dartAnimation.style.opacity = 0;

  if (mapInstance !== null) {
    mapInstance.remove();
  }

  const selectedCountry = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];
  mapInstance = L.map('map').setView(selectedCountry.coords, 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance);

  const flagImg = `<img src='https://flagcdn.com/40x30/${getCountryCode(selectedCountry.name)}.png' alt='flag' style='display:block;margin-bottom:4px;'>`;
  L.marker(selectedCountry.coords).addTo(mapInstance)
    .bindPopup(flagImg + selectedCountry.name)
    .openPopup();

  countryName.textContent = selectedCountry.name;
  displayCountryDetails(selectedCountry.name);
  resultScreen.classList.remove('hidden');

  bgm.currentTime = 0;
  bgm.play();
}, 3000);
});
});

retryBtn.addEventListener('click', () => {
resultScreen.classList.add('hidden');
dartScreen.classList.add('hidden');
homeScreen.classList.remove('hidden');

if (mapInstance !== null) {
mapInstance.remove();
mapInstance = null;
}

const oldMap = document.getElementById('map');
const newMap = document.createElement('div');
newMap.id = 'map';
newMap.style.height = '300px';
newMap.style.width = '100%';
newMap.style.position = 'relative';
oldMap.replaceWith(newMap);
});

function getCountryCode(name) {
const codeMap = {
"日本": "jp",
"ブラジル": "br",
"フランス": "fr",
"スペイン": "es",
"オーストラリア": "au",
"カナダ": "ca",
"インド": "in",
"南アフリカ": "za",
"エジプト": "eg",
"アルゼンチン": "ar",
"アメリカ合衆国": "us",
"イタリア": "it",
"中国": "cn",
"メキシコ": "mx",
"タイ": "th"
};
return codeMap[name] || "";
}

function displayCountryDetails(name) {
const details = countryDetails[name];
if (!details) return;
document.getElementById('capital').textContent = details.capital;
document.getElementById('population').textContent = details.population;
document.getElementById('area').textContent = details.area;
document.getElementById('language').textContent = details.language;

const touristSpots = document.getElementById('tourist-spots');
touristSpots.innerHTML = '';
details.spots.forEach(spot => {
const li = document.createElement('li');
li.textContent = spot;
touristSpots.appendChild(li);
});
}