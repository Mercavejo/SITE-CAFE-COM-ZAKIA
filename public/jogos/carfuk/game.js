const canvas = document.getElementById("trackCanvas");
const ctx = canvas.getContext("2d");
const mini = document.getElementById("miniMap");
const mctx = mini.getContext("2d");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const pilotName = document.getElementById("pilotName");
const vehicleModeChoices = document.getElementById("vehicleModeChoices");
const carChoices = document.getElementById("carChoices");
const plusNameChoices = document.getElementById("plusNameChoices");
const raceModeChoices = document.getElementById("raceModeChoices");
const playerChoices = document.getElementById("playerChoices");
const controlChoices = document.getElementById("controlChoices");
const levelChoices = document.getElementById("levelChoices");
const cameraChoices = document.getElementById("cameraChoices");
const graphicsChoices = document.getElementById("graphicsChoices");
const showFpsToggle = document.getElementById("showFpsToggle");
const reducedEffectsToggle = document.getElementById("reducedEffectsToggle");
const musicChoices = document.getElementById("musicChoices");
const musicEnabled = document.getElementById("musicEnabled");
const musicVolume = document.getElementById("musicVolume");
const gameVolume = document.getElementById("gameVolume");
const gameMusicVolume = document.getElementById("gameMusicVolume");
const gameSoundVolume = document.getElementById("gameSoundVolume");
const onlineCreateBtn = document.getElementById("onlineCreateBtn");
const onlineJoinBtn = document.getElementById("onlineJoinBtn");
const onlineStartBtn = document.getElementById("onlineStartBtn");
const onlineQuickBtn = document.getElementById("onlineQuickBtn");
const onlineRoomCode = document.getElementById("onlineRoomCode");
const onlineServerUrl = document.getElementById("onlineServerUrl");
const onlineSaveServerBtn = document.getElementById("onlineSaveServerBtn");
const onlineStatus = document.getElementById("onlineStatus");
const onlinePlayers = document.getElementById("onlinePlayers");
const startBtn = document.getElementById("startBtn");
const cameraBtn = document.getElementById("cameraBtn");
const musicBtn = document.getElementById("musicBtn");
const nextMusicBtn = document.getElementById("nextMusicBtn");
const pauseBtn = document.getElementById("pauseBtn");
const menuBtn = document.getElementById("menuBtn");
const message = document.getElementById("message");
const powerHud = document.getElementById("powerHud");
const championshipHud = document.getElementById("championshipHud");
const championshipResults = document.getElementById("championshipResults");
const playerHud = document.getElementById("playerHud");
const systemStatus = document.getElementById("systemStatus");

const lapHud = document.getElementById("lapHud");
const timeHud = document.getElementById("timeHud");
const positionHud = document.getElementById("positionHud");
const levelHud = document.getElementById("levelHud");
const fuelHud = document.getElementById("fuelHud");
const energyHud = document.getElementById("energyHud");

const TAU = Math.PI * 2;
const WORLD = { w: 2500, h: 1600 };
const LAPS = 5;
const CHECKPOINTS_PER_LAP = 8;
const view = { w: window.innerWidth, h: window.innerHeight, dpr: 1 };

const cameraModes = [
  { id: "wide", label: "Aberta Total", note: "mais pista", scale: 0.62, mobileScale: 0.5, leadBias: 0.28, lookAhead: 40, smoothing: 5.4 },
  { id: "chase", label: "Seguidora", note: "perto do carro", scale: 0.98, mobileScale: 0.72, leadBias: 0.68, lookAhead: 72, smoothing: 6.1 },
  { id: "angle", label: "Angulada", note: "arcade inclinada", scale: 0.84, mobileScale: 0.66, leadBias: 0.62, lookAhead: 68, sideOffset: 46, rotation: -0.07, tiltY: 0.94, screenY: 12, smoothing: 5.9 },
];
let cameraMode = 1;

const musicTracks = [
  { title: "Estou de Partida", src: "assets/audio/estou-de-partida-daniel-zakia-master.wav" },
  { title: "Muito Blablabla", src: "assets/audio/radio-zakia-stingers/muito-blablabla.wav" },
  { title: "Rock and Roll", src: "assets/audio/radio-zakia-stingers/rock-and-roll-daniel-stingers.mp3" },
  { title: "Dia de Domingo", src: "assets/audio/radio-zakia-stingers/dia-de-domingo-daniel-stingers.mp3" },
  { title: "Duas Faces", src: "assets/audio/radio-zakia-stingers/duas-faces-daniel-stingers.mp3" },
  { title: "Dia D", src: "assets/audio/radio-zakia-stingers/dia-d-daniel-stingers.mp3" },
  { title: "Nao Pare de Sonhar", src: "assets/audio/radio-zakia-stingers/nao-pare-de-sonhar-daniel-stingers.mp3" },
  { title: "Essa eu Falei de Verdade", src: "assets/audio/radio-zakia-stingers/essa-eu-falei-de-verdade-daniel-stingers.mp3" },
  { title: "Sonhos Bons", src: "assets/audio/radio-zakia-stingers/sonhos-bons-daniel-stingers.mp3" },
  { title: "Uma Velha Historia", src: "assets/audio/radio-zakia-stingers/uma-velha-historia-daniel-stingers.mp3" },
  { title: "Deixa o Ze Ficar", src: "assets/audio/radio-zakia-stingers/danielstingers-8-deixa-o-ze-ficar.mp3" },
  { title: "Jovens Inconsequentes", src: "assets/audio/radio-zakia-stingers/danielstingers-9-jovens-inconsequentes.mp3" },
  { title: "Vento Sul", src: "assets/audio/radio-zakia-stingers/danielstingers-10-vento-sul.mp3" },
  { title: "A Viagem", src: "assets/audio/radio-zakia-stingers/danielstingers-11-a-viagem.mp3" },
  { title: "Hipocrisia", src: "assets/audio/radio-zakia-stingers/danielstingers-12-hipocrisia.mp3" },
  { title: "Olhos da Verdade", src: "assets/audio/radio-zakia-stingers/olhos-da-verdade-daniel-stingers.mp3" },
  { title: "Deixa para la", src: "assets/audio/radio-zakia-stingers/deixa-para-la-daniel-zakia.mp3" },
  { title: "Um Livro", src: "assets/audio/radio-zakia-stingers/stingers-um-livro.mp3" },
  { title: "Constituicao", src: "assets/audio/radio-zakia-stingers/stingers-constituicao.mp3" },
  { title: "Deixe Estar Vinheta", src: "assets/audio/radio-zakia-stingers/stingers-deixe-estar-vinheta.mp3" },
  { title: "Deixe Minha Cabeca em Paz", src: "assets/audio/radio-zakia-stingers/stingers-deixe-minha-cabeca-em-paz.mp3" },
  { title: "Lutador", src: "assets/audio/radio-zakia-stingers/stingers-lutador.mp3" },
  { title: "Minha Namorada", src: "assets/audio/radio-zakia-stingers/stingers-minha-namorada.mp3" },
  { title: "O Tempo", src: "assets/audio/radio-zakia-stingers/stingers-o-tempo.mp3" },
  { title: "Para Amigos", src: "assets/audio/radio-zakia-stingers/stingers-para-amigos.mp3" },
  { title: "Pirou", src: "assets/audio/radio-zakia-stingers/stingers-pirou.mp3" },
  { title: "Samambao", src: "assets/audio/radio-zakia-stingers/stingers-samambao.mp3" },
  { title: "Toda Noite", src: "assets/audio/radio-zakia-stingers/stingers-toda-noite.mp3" },
  { title: "Tudo Leva Ela", src: "assets/audio/radio-zakia-stingers/stingers-tudo-leva-ela.mp3" },
  { title: "Outra Historia", src: "assets/audio/radio-zakia-stingers/stingers-outra-historia.mp3" },
];

const playerControls = [
  { label: "P1", up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", action: "Space", fire: "Enter", keys: "Setas + Space + Enter" },
  { label: "P2", up: "KeyW", down: "KeyS", left: "KeyA", right: "KeyD", action: "KeyE", fire: "KeyQ", keys: "WASD + E + Q" },
  { label: "P3", up: "KeyI", down: "KeyK", left: "KeyJ", right: "KeyL", action: "KeyU", fire: "KeyO", keys: "IJKL + U + O" },
  { label: "P4", up: "KeyT", down: "KeyG", left: "KeyF", right: "KeyH", action: "KeyR", fire: "KeyY", keys: "TFGH + R + Y" },
];

const controlActions = [
  { id: "up", label: "Correr" },
  { id: "down", label: "Frear/Re" },
  { id: "left", label: "Virar esq." },
  { id: "right", label: "Virar dir." },
  { id: "action", label: "Nitro/Bater" },
  { id: "fire", label: "Atirar" },
];

const cars = [
  { name: "Neon GT", category: "sport", color: "#26d8ff", dark: "#082b44", stripe: "#ffffff", neon: "#8cf8ff", rim: "#bffaff", kind: "gt", note: "visual supercar", dynamics: { radius: 12, maxSpeed: 1, accel: 1.02, turn: 1.06 } },
  { name: "Furia Magenta", category: "sport", color: "#f238a5", dark: "#491342", stripe: "#ffe4ff", neon: "#ff8fe0", rim: "#ffc0ef", kind: "gt", note: "drift neon", dynamics: { radius: 12, maxSpeed: 1.02, accel: 1.02, turn: 1.09 } },
  { name: "Trovão Rally", category: "sport", color: "#ffd43d", dark: "#503913", stripe: "#101217", neon: "#fff38c", rim: "#ffd94d", kind: "rally", note: "off-road", dynamics: { radius: 12, maxSpeed: 0.98, accel: 1.06, turn: 1.1 } },
  { name: "Vermelho Turbo", category: "sport", color: "#ff3f35", dark: "#551211", stripe: "#fff2d4", neon: "#ff9a59", rim: "#ff6b5f", kind: "sport", note: "arrancada", dynamics: { radius: 12, maxSpeed: 1.04, accel: 1.04, turn: 1.03 } },
  { name: "Interceptor X", category: "sport", color: "#1b2433", dark: "#070b12", stripe: "#ffdf4b", neon: "#4de3ff", rim: "#d8e7ff", kind: "armored", note: "combate", dynamics: { radius: 13, maxSpeed: 0.96, accel: 1, turn: 1 } },
  { name: "Buggy Verde", category: "sport", color: "#37e06f", dark: "#12351f", stripe: "#f7ffe9", neon: "#8affaa", rim: "#adffd0", kind: "buggy", note: "leve", dynamics: { radius: 11, maxSpeed: 0.97, accel: 1.1, turn: 1.16 } },
  { name: "Coupe Azul Royal", category: "sport", color: "#3568ff", dark: "#111d55", stripe: "#f2f7ff", neon: "#82a8ff", rim: "#c4d4ff", kind: "coupe", note: "controle", dynamics: { radius: 12, maxSpeed: 1, accel: 1.02, turn: 1.1 } },
  { name: "Laranja Hotrod", category: "sport", color: "#ff7a2f", dark: "#572009", stripe: "#151515", neon: "#ffd24d", rim: "#ffb866", kind: "hotrod", note: "estilo", dynamics: { radius: 12, maxSpeed: 1.03, accel: 1.04, turn: 1.02 } },
];

const karts = [
  { name: "Kart Vermelho", category: "kart", color: "#f23b32", dark: "#651412", stripe: "#ffffff", neon: "#ff9a7a", rim: "#ffcfb7", kind: "kart", note: "curva agil", dynamics: { radius: 10, maxSpeed: 0.92, accel: 1.12, turn: 1.36, reverse: 0.92, aiSpeed: 0.94 } },
  { name: "Kart Azul DZ", category: "kart", color: "#25c9ff", dark: "#083454", stripe: "#ffffff", neon: "#8cf8ff", rim: "#c8fbff", kind: "kart", note: "controle leve", dynamics: { radius: 10, maxSpeed: 0.91, accel: 1.13, turn: 1.38, reverse: 0.92, aiSpeed: 0.94 } },
  { name: "Kart Amarelo", category: "kart", color: "#ffd83d", dark: "#5c4210", stripe: "#111318", neon: "#fff38c", rim: "#ffe875", kind: "kart", note: "arranque rapido", dynamics: { radius: 10, maxSpeed: 0.9, accel: 1.17, turn: 1.32, reverse: 0.9, aiSpeed: 0.93 } },
  { name: "Kart Verde", category: "kart", color: "#36e873", dark: "#123b22", stripe: "#effff2", neon: "#8affaa", rim: "#c8ffd8", kind: "kart", note: "drift facil", dynamics: { radius: 10, maxSpeed: 0.9, accel: 1.12, turn: 1.44, reverse: 0.94, aiSpeed: 0.92 } },
  { name: "Kart Roxo", category: "kart", color: "#9957ff", dark: "#26154f", stripe: "#ffdbff", neon: "#d49cff", rim: "#ead4ff", kind: "kart", note: "neon pequeno", dynamics: { radius: 10, maxSpeed: 0.93, accel: 1.09, turn: 1.36, reverse: 0.92, aiSpeed: 0.94 } },
  { name: "Kart Preto X", category: "kart", color: "#222b37", dark: "#060a10", stripe: "#ffd64d", neon: "#4de3ff", rim: "#d8e7ff", kind: "kart", note: "combate leve", dynamics: { radius: 10, maxSpeed: 0.91, accel: 1.1, turn: 1.34, reverse: 0.92, aiSpeed: 0.93 } },
];

const plusCars = [
  { name: "Carro Vermelho", category: "plus", color: "#e7261d", dark: "#5a0c0a", stripe: "#ffffff", neon: "#ff7a62", rim: "#f0f0f0", kind: "gt", note: "vermelho / Piloto", sprite: "assets/cars-plus/carro-vermelho.png", spriteWorldWidth: 88, dynamics: { radius: 11, maxSpeed: 1.08, accel: 1.08, turn: 1.15, aiSpeed: 1.04 } },
  { name: "Carro Amarelo", category: "plus", color: "#ffd739", dark: "#4b3910", stripe: "#111111", neon: "#fff38c", rim: "#ffe875", kind: "coupe", note: "amarelo / Rival", sprite: "assets/cars-plus/carro-amarelo.png", spriteWorldWidth: 88, dynamics: { radius: 11, maxSpeed: 1.06, accel: 1.1, turn: 1.18, aiSpeed: 1.03 } },
  { name: "Carro Rosa", category: "plus", color: "#d72bc3", dark: "#4c123f", stripe: "#ffd64d", neon: "#ff83ef", rim: "#ffc8f3", kind: "gt", note: "rosa / Rival", sprite: "assets/cars-plus/carro-rosa.png", spriteWorldWidth: 88, dynamics: { radius: 11, maxSpeed: 1.07, accel: 1.09, turn: 1.16, aiSpeed: 1.04 } },
  { name: "Carro Azul Claro", category: "plus", color: "#24c4e8", dark: "#0d4055", stripe: "#ffe64d", neon: "#8cf8ff", rim: "#c8fbff", kind: "sport", note: "azul claro / Rival", sprite: "assets/cars-plus/carro-azul-claro.png", spriteWorldWidth: 88, dynamics: { radius: 11, maxSpeed: 1.09, accel: 1.08, turn: 1.12, aiSpeed: 1.04 } },
  { name: "Carro Azul Amarelo", category: "plus", color: "#155fc7", dark: "#0b2456", stripe: "#ffe64d", neon: "#7ed8ff", rim: "#c8e6ff", kind: "sport", note: "azul amarelo / Rival", sprite: "assets/cars-plus/carro-azul-amarelo.png", spriteWorldWidth: 88, dynamics: { radius: 11, maxSpeed: 1.1, accel: 1.07, turn: 1.1, aiSpeed: 1.05 } },
  { name: "Carro DZ Racing", category: "plus", color: "#f8fbff", dark: "#c9d2dc", stripe: "#111111", neon: "#ffffff", rim: "#e8f9ff", kind: "coupe", note: "branco DZ / Rival", sprite: "assets/cars-plus/carro-dz-racing.png", spriteWorldWidth: 88, dynamics: { radius: 11, maxSpeed: 1.05, accel: 1.08, turn: 1.14, aiSpeed: 1.03 } },
];

const weapons = [
  { name: "Laser Duplo", color: "#8cf8ff", damage: 17, speed: 760, cooldown: 0.38, stun: 0.24, pellets: 2, spread: 0.06, radius: 5, life: 0.78, energyCost: 2 },
  { name: "Plasma Rosa", color: "#ff8fe0", damage: 22, speed: 650, cooldown: 0.48, stun: 0.34, pellets: 1, spread: 0, radius: 8, life: 0.9, energyCost: 3 },
  { name: "Canhao Rally", color: "#fff38c", damage: 28, speed: 575, cooldown: 0.72, stun: 0.55, pellets: 1, spread: 0, radius: 10, life: 1.05, energyCost: 5 },
  { name: "Rajada Turbo", color: "#ff9a59", damage: 12, speed: 835, cooldown: 0.22, stun: 0.16, pellets: 1, spread: 0, radius: 4, life: 0.65, energyCost: 1 },
  { name: "Pulso EMP", color: "#4de3ff", damage: 14, speed: 600, cooldown: 0.82, stun: 0.9, pellets: 1, spread: 0, radius: 13, life: 0.95, energyCost: 6 },
  { name: "Espingarda Verde", color: "#8affaa", damage: 9, speed: 610, cooldown: 0.62, stun: 0.22, pellets: 5, spread: 0.22, radius: 4, life: 0.62, energyCost: 4 },
  { name: "Raio Royal", color: "#82a8ff", damage: 19, speed: 790, cooldown: 0.46, stun: 0.3, pellets: 1, spread: 0, radius: 6, life: 0.84, energyCost: 3 },
  { name: "Foguete Hotrod", color: "#ffd24d", damage: 34, speed: 520, cooldown: 0.92, stun: 0.68, pellets: 1, spread: 0, radius: 12, life: 1.25, energyCost: 7 },
];

const itemInfo = {
  nitro: { label: "N2O", color: "#48d8ff" },
  turbo: { label: "TRB", color: "#ffd64d" },
  energy: { label: "ENE", color: "#ff5bbd" },
  ammo: { label: "MUN", color: "#f8fbff" },
  fuel: { label: "GAS", color: "#69ff9c" },
  bumper: { label: "BAT", color: "#ff5968" },
  unknown: { label: "?", color: "#ffffff" },
};

const vehicleCategories = [
  { id: "sport", label: "Carros Esportivos", note: "mais velocidade, visual premium", vehicles: cars },
  { id: "kart", label: "Karts de Corrida", note: "menores, leves e muito ageis", vehicles: karts },
  { id: "plus", label: "DZ Racing Plus", note: "carros especiais e pista oficial Plus", vehicles: plusCars },
];

[...cars, ...karts, ...plusCars].forEach((vehicle, i) => {
  vehicle.weapon = weapons[i % weapons.length];
  vehicle.note = `${vehicle.note} / ${vehicle.weapon.name}`;
});

function currentVehicleCategory(id = state.vehicleCategory) {
  return vehicleCategories.find((category) => category.id === id) || vehicleCategories[0];
}

function currentVehicles(id = state.vehicleCategory) {
  return currentVehicleCategory(id).vehicles;
}

function isPlusLevel(level) {
  return level?.difficulty === "plus" || /^DZ Racing Plus\b/.test(level?.name || "");
}

function isKartLevel(level) {
  return level?.difficulty === "kart" || level?.theme === "kartarena" || /\bKart\b/.test(level?.name || "");
}

function isSportLevel(level) {
  return !isPlusLevel(level) && !isKartLevel(level);
}

function levelMatchesCategory(level, categoryId = state.vehicleCategory) {
  if (categoryId === "plus") return isPlusLevel(level);
  if (categoryId === "kart") return isSportLevel(level);
  return isSportLevel(level);
}

function levelIndexesForCategory(categoryId = state.vehicleCategory) {
  return levels
    .map((level, index) => ({ level, index }))
    .filter(({ level }) => levelMatchesCategory(level, categoryId))
    .map(({ index }) => index);
}

function selectedLevelFitsCategory(levelIndex = state.selectedLevel, categoryId = state.vehicleCategory) {
  const level = levels[levelIndex];
  if (!level) return false;
  return levelMatchesCategory(level, categoryId);
}

function ensureSelectedLevelForCategory(categoryId = state.vehicleCategory) {
  if (selectedLevelFitsCategory(state.selectedLevel, categoryId)) return;
  const [firstLevelIndex = 0] = levelIndexesForCategory(categoryId);
  state.selectedLevel = firstLevelIndex;
}

function currentChampionshipName() {
  if (state.vehicleCategory === "plus") return "Campeonato DZ Racing Plus";
  if (state.vehicleCategory === "kart") return "Campeonato de Karts";
  return "Campeonato DZ Racing";
}

function currentStartLabel() {
  if (state.vehicleCategory === "plus") return "Jogar Plus";
  if (state.vehicleCategory === "kart") return "Jogar Karts";
  return "Jogar";
}

function createRacerCar(index, categoryId = state.vehicleCategory) {
  const vehicles = currentVehicles(categoryId);
  const rosterIndex = ((index % vehicles.length) + vehicles.length) % vehicles.length;
  const base = vehicles[rosterIndex] || cars[0];
  return { ...base, rosterIndex, weapon: { ...(base.weapon || weapons[0]) } };
}

function plusRacerName(car, fallback = "Carro Plus") {
  if (state.vehicleCategory !== "plus") return fallback;
  const index = typeof car?.rosterIndex === "number" ? car.rosterIndex : 0;
  const edited = (state.plusCarNames[index] || "").trim();
  return edited.slice(0, 18) || plusCars[index]?.name || fallback;
}

function weaponPower(weapon) {
  if (!weapon) return 0;
  return Math.round((weapon.damage || 0) + (weapon.stun || 0) * 24 + (weapon.pellets || 1) * 3 - (weapon.cooldown || 0.5) * 8);
}

function rcCarDecal(car) {
  const decals = {
    "Vermelho Turbo": "01",
    "Neon GT": "07",
    "Furia Magenta": "04",
    "Trovão Rally": "12",
    "Interceptor X": "DZ",
    "Buggy Verde": "05",
    "Coupe Azul Royal": "08",
    "Laranja Hotrod": "10",
    "Carro Vermelho": "01",
    "Carro Amarelo": "02",
    "Carro Rosa": "03",
    "Carro Azul Claro": "04",
    "Carro Azul Amarelo": "05",
    "Carro DZ Racing": "DZ",
  };
  return decals[car?.name] || "DZ";
}

const levels = [
  {
    name: "Ilha da Escola",
    difficulty: "facil",
    theme: "island",
    road: 220,
    roadColor: "#62666a",
    sand: "#d5bb79",
    water: "#0e8ed0",
    bridgeSpeed: 0.58,
    obstacles: 8,
    path: [
      [310, 1165],
      [570, 1265],
      [850, 1165],
      [1130, 1275],
      [1430, 1145],
      [1760, 1255],
      [2070, 1090],
      [2230, 855],
      [2130, 650],
      [2240, 455],
      [1990, 305],
      [1630, 285],
      [1340, 405],
      [1100, 325],
      [845, 490],
      [610, 390],
      [365, 535],
      [235, 770],
      [335, 980],
      [230, 1105],
    ],
    bridges: [],
  },
  {
    name: "Parque das Maquetes",
    difficulty: "show",
    theme: "model",
    road: 224,
    roadColor: "#70777b",
    sand: "#67c85a",
    water: "#18a9d8",
    bridgeSpeed: 0.75,
    obstacles: 10,
    mud: false,
    path: [
      [260, 1170],
      [560, 1310],
      [910, 1195],
      [1230, 1330],
      [1590, 1180],
      [1970, 1260],
      [2230, 1030],
      [2260, 780],
      [2110, 600],
      [2220, 405],
      [1930, 285],
      [1570, 360],
      [1260, 280],
      [990, 430],
      [710, 320],
      [430, 455],
      [260, 675],
      [345, 900],
      [230, 1045],
    ],
    bridges: [],
    hazards: ["cones", "clean arcade"],
  },
  {
    name: "DZ Racing 1",
    difficulty: "oficial",
    theme: "racetrack",
    road: 248,
    roadColor: "#53585b",
    sand: "#5fa64e",
    water: "#8bd8e4",
    bridgeSpeed: 0.7,
    obstacles: 6,
    path: [
      [280, 1200],
      [590, 1325],
      [930, 1190],
      [1260, 1325],
      [1590, 1185],
      [1980, 1265],
      [2250, 1040],
      [2190, 820],
      [2270, 610],
      [2040, 420],
      [1700, 350],
      [1390, 455],
      [1110, 330],
      [820, 480],
      [555, 390],
      [325, 585],
      [235, 820],
      [350, 1000],
    ],
    bridges: [],
    hazards: ["oficial", "limpa", "rapida"],
  },
  {
    name: "DZ Racing 2",
    difficulty: "oficial",
    theme: "racetrack",
    road: 246,
    roadColor: "#555a5e",
    sand: "#66ad52",
    water: "#8bd8e4",
    bridgeSpeed: 0.7,
    obstacles: 3,
    cleanScenery: true,
    noOverpasses: true,
    routeArrowStep: 620,
    directionSignStep: 980,
    path: [
      [260, 1255],
      [560, 1370],
      [875, 1240],
      [1195, 1360],
      [1515, 1235],
      [1900, 1320],
      [2220, 1120],
      [2280, 925],
      [2140, 775],
      [1860, 700],
      [1580, 790],
      [1330, 660],
      [1050, 725],
      [820, 565],
      [570, 465],
      [340, 610],
      [255, 835],
      [355, 1035],
    ],
    bridges: [],
    hazards: ["oficial", "curvas em S", "setas"],
  },
  {
    name: "Autoestrada Noturna",
    difficulty: "desvio",
    theme: "spy",
    road: 246,
    roadColor: "#666a66",
    sand: "#5cc840",
    water: "#0d6f9f",
    bridgeSpeed: 0.62,
    obstacles: 10,
    traffic: true,
    oil: true,
    path: [
      [390, 1305],
      [760, 1365],
      [1080, 1240],
      [1420, 1345],
      [1800, 1220],
      [2120, 1030],
      [2240, 805],
      [2120, 620],
      [2190, 430],
      [1880, 300],
      [1510, 360],
      [1220, 260],
      [930, 395],
      [660, 285],
      [410, 470],
      [280, 720],
      [355, 970],
    ],
    bridges: [],
    hazards: ["traffic", "oil"],
  },
  {
    name: "Parque das Fantasias",
    difficulty: "diversao",
    theme: "fantasy",
    road: 238,
    roadColor: "#262b31",
    sand: "#56b96c",
    water: "#37a8dc",
    bridgeSpeed: 0.7,
    obstacles: 3,
    cleanScenery: true,
    noOverpasses: true,
    routeArrowStep: 640,
    directionSignStep: 960,
    traffic: false,
    path: [
      [260, 1260],
      [570, 1380],
      [900, 1250],
      [1225, 1370],
      [1545, 1245],
      [1910, 1290],
      [2220, 1080],
      [2280, 850],
      [2130, 700],
      [1840, 635],
      [1590, 720],
      [1320, 575],
      [1080, 455],
      [790, 355],
      [520, 465],
      [315, 670],
      [255, 900],
      [360, 1090],
    ],
    bridges: [],
    hazards: ["fantasia", "cidade limpa", "setas"],
  },
  {
    name: "DZ Arena Kart",
    difficulty: "kart",
    theme: "kartarena",
    road: 216,
    roadColor: "#c57945",
    sand: "#f0c48d",
    water: "#b96d3a",
    bridgeSpeed: 0.7,
    obstacles: 4,
    path: [
      [260, 1095],
      [520, 1220],
      [815, 1095],
      [1115, 1225],
      [1440, 1100],
      [1790, 1200],
      [2110, 1025],
      [2240, 820],
      [2140, 620],
      [2240, 455],
      [1955, 355],
      [1600, 430],
      [1270, 360],
      [980, 500],
      [720, 390],
      [460, 505],
      [260, 715],
      [345, 910],
    ],
    bridges: [],
    hazards: ["kart", "pneus", "largada"],
  },
  {
    name: "Entre as Aguas",
    difficulty: "agua",
    theme: "waters",
    road: 226,
    roadColor: "#d99454",
    sand: "#f0d9a6",
    water: "#139fc0",
    bridgeSpeed: 0.82,
    obstacles: 12,
    mud: false,
    path: [
      [270, 1190],
      [555, 1320],
      [870, 1195],
      [1190, 1325],
      [1510, 1195],
      [1880, 1265],
      [2190, 1050],
      [2250, 820],
      [2110, 635],
      [2210, 445],
      [1930, 320],
      [1580, 370],
      [1290, 300],
      [1030, 455],
      [750, 345],
      [465, 500],
      [250, 730],
      [340, 950],
      [235, 1090],
    ],
    bridges: [],
    hazards: ["water", "clear bridges"],
  },
  {
    name: "Circuito Oficial",
    difficulty: "tecnica",
    theme: "racetrack",
    road: 236,
    roadColor: "#45484b",
    sand: "#d5b98f",
    water: "#a7dce2",
    bridgeSpeed: 0.72,
    obstacles: 16,
    oil: true,
    path: [
      [300, 1180],
      [650, 1340],
      [1010, 1210],
      [1380, 1340],
      [1760, 1200],
      [2100, 1120],
      [2280, 900],
      [2190, 710],
      [2270, 520],
      [2020, 360],
      [1660, 320],
      [1360, 435],
      [1060, 295],
      [750, 415],
      [500, 555],
      [350, 760],
      [420, 960],
    ],
    bridges: [],
    hazards: ["oil", "technical curves"],
  },
  {
    name: "DZ Racing 3",
    difficulty: "oficial",
    theme: "racetrack",
    road: 158,
    roadColor: "#d8dddc",
    sand: "#58b447",
    water: "#8bd8e4",
    bridgeSpeed: 0.7,
    obstacles: 2,
    cleanScenery: true,
    parkCircuitBase: true,
    noOverpasses: true,
    routeArrowStep: 680,
    directionSignStep: 1080,
    path: [
      [350, 1450],
      [980, 1450],
      [1600, 1450],
      [2170, 1340],
      [2300, 1100],
      [2110, 955],
      [1700, 980],
      [1280, 975],
      [1090, 1130],
      [790, 1240],
      [500, 1170],
      [420, 995],
      [620, 815],
      [930, 740],
      [1260, 740],
      [1540, 575],
      [1850, 455],
      [2160, 490],
      [2290, 315],
      [2100, 160],
      [1660, 190],
      [1260, 305],
      [900, 430],
      [550, 420],
      [250, 570],
      [190, 785],
      [220, 1090],
    ],
    bridges: [],
    hazards: ["oficial", "verde", "curvas em S"],
  },
  {
    name: "DZ Racing 4",
    difficulty: "oficial",
    theme: "racetrack",
    road: 170,
    roadColor: "#20272a",
    sand: "#18481f",
    water: "#79cddb",
    bridgeSpeed: 0.7,
    obstacles: 2,
    cleanScenery: true,
    rcAerialBase: true,
    noOverpasses: true,
    routeArrowStep: 500,
    directionSignStep: 760,
    path: [
      [300, 1280],
      [780, 1370],
      [1280, 1320],
      [1850, 1380],
      [2260, 1210],
      [2310, 920],
      [2180, 690],
      [1900, 650],
      [1650, 750],
      [1430, 630],
      [1660, 470],
      [2040, 420],
      [2290, 560],
      [2350, 310],
      [2050, 170],
      [1600, 230],
      [1350, 360],
      [1100, 260],
      [760, 210],
      [420, 310],
      [260, 560],
      [420, 750],
      [680, 650],
      [870, 470],
      [1080, 560],
      [950, 820],
      [680, 1010],
      [360, 980],
      [220, 1120],
    ],
    bridges: [],
    hazards: ["oficial", "rc aereo", "curvas tecnicas"],
  },
  {
    name: "Canyon das Pontes",
    difficulty: "medio",
    theme: "bridge",
    road: 232,
    roadColor: "#62666a",
    sand: "#ceb06d",
    water: "#087fc3",
    bridgeSpeed: 0.86,
    obstacles: 12,
    path: [
      [330, 1210],
      [760, 1200],
      [1010, 1040],
      [850, 820],
      [1080, 650],
      [1450, 710],
      [1790, 560],
      [2060, 730],
      [2170, 1040],
      [1840, 1250],
      [1400, 1160],
      [1240, 890],
      [1410, 520],
      [1220, 260],
      [730, 270],
      [360, 470],
      [260, 810],
    ],
    bridges: [{ at: 0.39, size: 0.085 }],
    hazards: ["ponte unica"],
  },
  {
    name: "Labirinto RC",
    difficulty: "tecnica",
    theme: "racetrack",
    road: 170,
    roadColor: "#1f2528",
    sand: "#14522a",
    water: "#75d4e4",
    bridgeSpeed: 0.7,
    obstacles: 2,
    cleanScenery: true,
    mazeCircuitBase: true,
    noOverpasses: true,
    routeArrowStep: 380,
    directionSignStep: 620,
    path: [
      [360, 1320],
      [780, 1360],
      [1180, 1310],
      [1510, 1380],
      [1940, 1300],
      [2240, 1110],
      [2250, 855],
      [2070, 710],
      [1840, 790],
      [1640, 1020],
      [1410, 925],
      [1510, 690],
      [1780, 555],
      [2150, 430],
      [2180, 250],
      [1880, 175],
      [1540, 255],
      [1320, 440],
      [1050, 300],
      [830, 155],
      [610, 310],
      [700, 580],
      [980, 820],
      [835, 1045],
      [565, 1000],
      [380, 790],
      [520, 575],
      [430, 365],
      [230, 445],
      [165, 725],
      [275, 1000],
      [160, 1190],
    ],
    bridges: [],
    hazards: ["labirinto", "setas", "disputa"],
  },
  {
    name: "Selva da Cachoeira",
    difficulty: "aventura",
    theme: "jungle",
    road: 218,
    roadColor: "#b97945",
    sand: "#244f2d",
    water: "#8a6a35",
    bridgeSpeed: 0.94,
    obstacles: 12,
    mud: false,
    path: [
      [270, 1185],
      [500, 1295],
      [745, 1180],
      [980, 1310],
      [1245, 1165],
      [1515, 1285],
      [1810, 1165],
      [2075, 1225],
      [2220, 1030],
      [2110, 865],
      [2225, 690],
      [2050, 530],
      [2160, 345],
      [1845, 255],
      [1580, 365],
      [1325, 295],
      [1080, 455],
      [800, 330],
      [545, 445],
      [305, 625],
      [235, 850],
      [340, 1035],
    ],
    bridges: [],
    hazards: ["water", "direction signs"],
  },
  {
    name: "Arena Rock",
    difficulty: "dificil",
    theme: "rock",
    road: 212,
    roadColor: "#605b55",
    sand: "#c89a55",
    water: "#084e91",
    bridgeSpeed: 1.08,
    obstacles: 12,
    mud: false,
    path: [
      [265, 1180],
      [520, 1305],
      [800, 1190],
      [1090, 1315],
      [1370, 1165],
      [1680, 1265],
      [1995, 1135],
      [2220, 1010],
      [2145, 820],
      [2240, 645],
      [2055, 505],
      [2160, 315],
      [1880, 245],
      [1580, 360],
      [1300, 280],
      [1035, 465],
      [770, 350],
      [515, 495],
      [285, 655],
      [235, 870],
      [345, 1025],
      [225, 1100],
    ],
    bridges: [],
    hazards: ["rocks", "clean curves"],
  },
  {
    name: "Cidade em Ruinas",
    difficulty: "historia",
    theme: "ruins",
    road: 212,
    roadColor: "#55595d",
    sand: "#7f7a6f",
    water: "#222c36",
    bridgeSpeed: 1.12,
    obstacles: 12,
    path: [
      [260, 1180],
      [535, 1300],
      [825, 1170],
      [1105, 1310],
      [1395, 1165],
      [1725, 1265],
      [2030, 1130],
      [2220, 1000],
      [2140, 805],
      [2240, 640],
      [2040, 500],
      [2150, 330],
      [1885, 250],
      [1590, 355],
      [1320, 290],
      [1060, 470],
      [775, 345],
      [520, 500],
      [300, 650],
      [240, 845],
      [335, 1005],
      [225, 1090],
    ],
    bridges: [],
    trains: [{ at: 0.18, period: 8.2, active: 2.4, speed: 760, surprise: true }],
    hazards: ["train"],
  },
  {
    name: "Templo Antigo",
    difficulty: "arqueologia",
    theme: "ancient",
    road: 218,
    roadColor: "#c8b18d",
    sand: "#786f5d",
    water: "#56695b",
    bridgeSpeed: 1.02,
    obstacles: 14,
    mud: false,
    path: [
      [270, 1195],
      [540, 1305],
      [810, 1180],
      [1085, 1290],
      [1320, 1120],
      [1585, 1240],
      [1900, 1160],
      [2210, 990],
      [2150, 800],
      [2240, 625],
      [2040, 475],
      [2140, 335],
      [1840, 260],
      [1570, 350],
      [1335, 455],
      [1100, 610],
      [850, 520],
      [605, 625],
      [380, 710],
      [245, 910],
      [350, 1075],
    ],
    bridges: [],
    hazards: ["cones", "stones", "clear curves"],
  },
  {
    name: "Grande Morro",
    difficulty: "altura",
    theme: "morro",
    road: 216,
    roadColor: "#d6c4ac",
    sand: "#9b6a42",
    water: "#302824",
    bridgeSpeed: 1.08,
    obstacles: 14,
    cliffs: true,
    path: [
      [240, 1185],
      [540, 1315],
      [850, 1180],
      [1165, 1320],
      [1485, 1170],
      [1840, 1260],
      [2160, 1040],
      [2235, 835],
      [2105, 645],
      [2190, 470],
      [1900, 320],
      [1550, 365],
      [1275, 520],
      [1015, 390],
      [750, 545],
      [500, 385],
      [295, 575],
      [230, 835],
      [340, 1035],
      [225, 1100],
    ],
    bridges: [],
    hazards: ["cliff", "tight curves"],
  },
  {
    name: "AMC Pro",
    difficulty: "premium",
    theme: "amc",
    road: 242,
    roadColor: "#6f7476",
    sand: "#35c957",
    water: "#1e2c30",
    bridgeSpeed: 0.68,
    obstacles: 12,
    path: [
      [270, 1160],
      [560, 1300],
      [870, 1170],
      [1195, 1315],
      [1510, 1165],
      [1875, 1245],
      [2170, 1025],
      [2230, 785],
      [2100, 610],
      [2200, 430],
      [1900, 305],
      [1540, 360],
      [1270, 510],
      [1015, 390],
      [760, 525],
      [510, 375],
      [300, 555],
      [235, 820],
      [340, 1015],
      [225, 1075],
    ],
    bridges: [],
    hazards: ["wide", "runoff"],
  },
  {
    name: "DZ Racing Plus 1",
    difficulty: "plus",
    theme: "racetrack",
    road: 258,
    roadColor: "#32383f",
    sand: "#3fd66f",
    water: "#9cecff",
    bridgeSpeed: 0.7,
    obstacles: 4,
    cleanScenery: true,
    plusCircuitBase: true,
    noOverpasses: true,
    routeArrowStep: 520,
    directionSignStep: 840,
    path: [
      [260, 1160],
      [560, 1300],
      [930, 1240],
      [1250, 1340],
      [1610, 1220],
      [1970, 1265],
      [2240, 1030],
      [2290, 760],
      [2130, 555],
      [2215, 360],
      [1950, 245],
      [1585, 305],
      [1280, 455],
      [1035, 360],
      [760, 485],
      [510, 365],
      [305, 535],
      [235, 805],
      [355, 1010],
      [230, 1095],
    ],
    bridges: [],
    hazards: ["plus", "limpa", "larga"],
  },
  {
    name: "DZ Racing Plus 2",
    difficulty: "plus",
    theme: "racetrack",
    road: 232,
    roadColor: "#242a2d",
    sand: "#d1b877",
    water: "#c7ad6f",
    bridgeSpeed: 0.72,
    obstacles: 2,
    cleanScenery: true,
    plusArenaBase: true,
    smoothRounds: 3,
    maxOverpasses: 1,
    manualOverpasses: [
      { x: 1263, y: 902, progress: 766, underProgress: 3155, angle: -0.811, underAngle: -2.58, length: 460, width: 260 },
    ],
    overpassLength: 460,
    overpassWidth: 260,
    routeArrowStep: 760,
    directionSignStep: 1120,
    path: [
      [420, 1050],
      [780, 1180],
      [1130, 1050],
      [1335, 820],
      [1620, 620],
      [2040, 520],
      [2280, 690],
      [2180, 990],
      [1800, 1130],
      [1450, 1020],
      [1100, 800],
      [1030, 650],
      [690, 500],
      [340, 610],
      [250, 890],
    ],
    bridges: [],
    hazards: ["plus", "figura 8", "ponte central"],
  },
  {
    name: "DZ Racing Plus 3",
    difficulty: "plus",
    theme: "racetrack",
    road: 226,
    roadColor: "#40464a",
    sand: "#d2bb7c",
    water: "#c1a96d",
    bridgeSpeed: 0.74,
    obstacles: 0,
    cleanScenery: true,
    plusFigureEightBase: true,
    noCurbs: true,
    noOverpasses: true,
    smoothRounds: 3,
    routeArrowStep: 690,
    directionSignStep: 1040,
    keyRouteArrows: [
      { progress: 150, lane: -54, label: "Largada" },
      { progress: 980, lane: 0, label: "Curva 1" },
      { progress: 2050, lane: 42, label: "Curva 2" },
      { progress: 3488, lane: -18, label: "Cruzamento" },
      { progress: 4230, lane: -44, label: "Curva 3" },
    ],
    collisionZones: [
      { x: 1214, y: 607, radius: 130, label: "Encontro" },
    ],
    path: [
      [350, 740],
      [450, 470],
      [790, 360],
      [1120, 515],
      [1510, 875],
      [1840, 1040],
      [2160, 910],
      [2240, 640],
      [2020, 390],
      [1640, 350],
      [1260, 555],
      [900, 885],
      [610, 1045],
      [350, 940],
    ],
    bridges: [],
    hazards: ["plus", "oito", "encontro central"],
  },
  {
    name: "DZ Racing Plus 4",
    difficulty: "plus",
    theme: "racetrack",
    road: 174,
    roadColor: "#3f4648",
    sand: "#f7fbf5",
    water: "#e4f6e1",
    bridgeSpeed: 0.74,
    obstacles: 0,
    cleanScenery: true,
    plusGardenCircuitBase: true,
    noOverpasses: true,
    smoothRounds: 3,
    routeArrowStep: 620,
    directionSignStep: 960,
    keyRouteArrows: [
      { progress: 120, lane: -38, label: "Largada" },
      { progress: 760, lane: 32, label: "Reta dos boxes" },
      { progress: 1540, lane: -30, label: "Miolo verde" },
      { progress: 2420, lane: 36, label: "Curva direita" },
      { progress: 3320, lane: -34, label: "Retorno" },
    ],
    path: [
      [355, 520],
      [910, 505],
      [1410, 505],
      [1840, 515],
      [2185, 650],
      [2245, 905],
      [2065, 1120],
      [1690, 1170],
      [1370, 1080],
      [1275, 880],
      [1435, 725],
      [1230, 650],
      [990, 720],
      [945, 960],
      [710, 1048],
      [510, 930],
      [565, 725],
      [330, 630],
    ],
    bridges: [],
    hazards: ["plus", "parque verde", "boxes"],
  },
  {
    name: "DZ Racing Plus 5",
    difficulty: "plus",
    theme: "racetrack",
    road: 166,
    roadColor: "#72797a",
    sand: "#f5e6c9",
    water: "#d9efd6",
    bridgeSpeed: 0.74,
    obstacles: 0,
    cleanScenery: true,
    plusVillageCircuitBase: true,
    noOverpasses: true,
    smoothRounds: 3,
    routeArrowStep: 540,
    directionSignStep: 820,
    keyRouteArrows: [
      { progress: 140, lane: -34, label: "Largada" },
      { progress: 820, lane: 36, label: "Curva das casas" },
      { progress: 1530, lane: -28, label: "S fechado" },
      { progress: 2330, lane: 34, label: "Miolo" },
      { progress: 3180, lane: -36, label: "Retorno" },
      { progress: 4150, lane: 30, label: "Reta final" },
    ],
    path: [
      [380, 1190],
      [235, 930],
      [330, 690],
      [560, 540],
      [465, 275],
      [780, 175],
      [1125, 300],
      [1320, 520],
      [1130, 750],
      [1205, 1065],
      [1470, 1120],
      [1595, 865],
      [1430, 650],
      [1535, 410],
      [1850, 365],
      [2070, 535],
      [1925, 750],
      [2145, 900],
      [2030, 1145],
      [1650, 1260],
      [1180, 1198],
      [780, 1260],
    ],
    bridges: [],
    hazards: ["plus", "bairro tropical", "curvas"],
  },
  {
    name: "DZ Racing Plus 6",
    difficulty: "plus",
    theme: "racetrack",
    road: 158,
    roadColor: "#50575a",
    sand: "#345432",
    water: "#27392f",
    bridgeSpeed: 0.74,
    obstacles: 0,
    cleanScenery: true,
    plusAerialMazeBase: true,
    noOverpasses: true,
    smoothRounds: 3,
    shortcutRoadWidth: 130,
    allowProgressCuts: true,
    routeArrowStep: 660,
    directionSignStep: 980,
    keyRouteArrows: [
      { progress: 120, lane: -34, label: "Start" },
      { progress: 840, lane: 30, label: "Entrada livre" },
      { progress: 1600, lane: -28, label: "Circuito interno" },
      { progress: 2660, lane: 34, label: "Corte arriscado" },
      { progress: 3820, lane: -30, label: "Volta externa" },
      { progress: 4860, lane: 30, label: "Retorno" },
    ],
    path: [
      [380, 760],
      [460, 410],
      [760, 285],
      [1080, 315],
      [1300, 430],
      [1540, 350],
      [1990, 260],
      [2220, 430],
      [2180, 820],
      [2010, 1115],
      [2140, 1300],
      [1705, 1335],
      [1290, 1210],
      [910, 1285],
      [580, 1180],
      [445, 990],
      [295, 905],
    ],
    shortcutRoads: [
      [[560, 745], [790, 600], [1040, 590], [1260, 710], [1515, 640], [1790, 545], [2050, 620]],
      [[745, 310], [730, 760], [790, 1110]],
      [[1030, 360], [985, 730], [1030, 1095]],
      [[1265, 520], [1185, 780], [1260, 1015], [1455, 1100]],
      [[1510, 470], [1585, 710], [1480, 910], [1595, 1090]],
      [[1760, 380], [1885, 620], [1810, 860], [1905, 1060]],
      [[615, 930], [860, 850], [1130, 880], [1390, 835], [1660, 900], [1920, 845]],
      [[500, 1130], [820, 980], [1120, 1010], [1370, 930], [1635, 1000], [2000, 1120]],
      [[1345, 420], [1360, 610], [1310, 790], [1395, 960]],
    ],
    bridges: [],
    hazards: ["plus", "labirinto aereo", "cortes livres"],
  },
  {
    name: "Oficina Neon",
    difficulty: "cinematica",
    theme: "neonworkshop",
    road: 230,
    roadColor: "#737b80",
    sand: "#45cf75",
    water: "#12a9e8",
    bridgeSpeed: 0.86,
    obstacles: 12,
    mud: false,
    path: [
      [270, 1185],
      [555, 1310],
      [840, 1180],
      [1130, 1310],
      [1445, 1165],
      [1780, 1265],
      [2100, 1120],
      [2230, 965],
      [2140, 780],
      [2240, 600],
      [2060, 470],
      [2150, 320],
      [1870, 250],
      [1545, 360],
      [1275, 500],
      [1010, 385],
      [750, 525],
      [485, 380],
      [300, 560],
      [240, 850],
      [345, 1030],
      [230, 1090],
    ],
    bridges: [],
    hazards: ["mud", "loops", "neon"],
  },
  {
    name: "Corrida da Morte",
    difficulty: "extrema",
    theme: "death",
    road: 210,
    roadColor: "#4c4540",
    sand: "#9b7448",
    water: "#181818",
    bridgeSpeed: 1.25,
    obstacles: 14,
    path: [
      [250, 1185],
      [520, 1305],
      [815, 1175],
      [1110, 1315],
      [1405, 1160],
      [1735, 1270],
      [2050, 1130],
      [2220, 1015],
      [2140, 815],
      [2230, 635],
      [2040, 500],
      [2160, 330],
      [1885, 250],
      [1560, 365],
      [1300, 285],
      [1030, 505],
      [755, 355],
      [500, 515],
      [285, 655],
      [235, 840],
      [330, 1015],
      [220, 1090],
    ],
    bridges: [],
    oil: true,
    mud: false,
    trains: [{ at: 0.33, period: 7.2, active: 2.1, speed: 820, surprise: true }],
    cliffs: true,
    hazards: ["train", "cliff", "oil", "mud"],
  },
  {
    name: "Trilhos do Canion",
    difficulty: "mestre",
    theme: "canyon",
    road: 212,
    roadColor: "#8b765f",
    sand: "#b48958",
    water: "#245667",
    bridgeSpeed: 1.34,
    obstacles: 14,
    path: [
      [300, 1185],
      [585, 1305],
      [900, 1170],
      [1215, 1320],
      [1535, 1175],
      [1890, 1250],
      [2185, 1015],
      [2225, 810],
      [2090, 625],
      [2185, 455],
      [1900, 315],
      [1550, 360],
      [1285, 505],
      [1015, 390],
      [760, 525],
      [510, 380],
      [310, 560],
      [250, 840],
      [360, 1035],
      [240, 1085],
    ],
    bridges: [],
    mud: false,
    trains: [{ at: 0.48, period: 6.8, active: 2.2, speed: 860, surprise: true }, { at: 0.86, period: 9.1, active: 2.6, speed: 740, surprise: true }],
    cliffs: true,
    hazards: ["train", "cliff", "mud"],
  }
];
const championshipPoints = [15, 12, 10, 8, 6, 4];

const raceModes = [
  { id: "single", label: "Corrida unica", note: "uma pista rapida" },
  { id: "championship", label: "Campeonato DZ", note: "todas as pistas valem pontos" },
];

const graphicsModes = [
  { id: "auto", label: "Automatico", note: "equilibra beleza e desempenho", dpr: null },
  { id: "quality", label: "Alta qualidade", note: "carros e pista mais nitidos", dpr: 1.28 },
  { id: "performance", label: "Desempenho", note: "mais leve para celular e TV", dpr: 0.9 },
];

const state = {
  vehicleCategory: "sport",
  selectedCar: 0,
  selectedLevel: 0,
  plusCarNames: plusCars.map((car) => car.name),
  raceMode: "single",
  playerCount: 4,
  selectedMusic: 0,
  musicEnabled: false,
  musicPaused: true,
  musicVolume: 0.16,
  gameVolume: 0.34,
  graphicsMode: localStorage.getItem("carfukGraphicsMode") || "auto",
  showFps: localStorage.getItem("carfukShowFps") === "1",
  reducedEffects: localStorage.getItem("carfukReducedEffects") === "1",
  keys: new Set(),
  running: false,
  paused: false,
  ended: false,
  raceResultsOpen: false,
  finishWatchAnnounced: false,
  lastFinishFlagAt: -999,
  time: 0,
  last: 0,
  renderScale: 1,
  track: null,
  racers: [],
  items: [],
  projectiles: [],
  explosions: [],
  traffic: [],
  camera: { x: 0, y: 0 },
  binding: null,
  msgTimer: 0,
  rafId: 0,
  fps: 0,
  fpsFrames: 0,
  fpsTimer: 0,
  musicAssetStatus: "pending",
  itemAlertTimer: 0,
  lastRecoveryAt: 0,
  lastRuntimeErrorAt: 0,
  lastDrawErrorAt: 0,
  disableDetailedCarSprites: false,
  online: {
    mode: "local",
    socket: null,
    connected: false,
    roomCode: "",
    playerId: "",
    role: "guest",
    players: [],
    remoteInputs: {},
    raceActive: false,
    lastInputSentAt: 0,
    lastSnapshotSentAt: 0,
    lastSnapshotAt: 0,
    lastInputSignature: "",
  },
  championship: {
    active: false,
    completed: false,
    tracks: [],
    currentRace: 0,
    standings: {},
    raceResults: [],
    waitingNext: false,
    nextTimer: 0,
    raceAwarded: false,
  },
};

const audio = {
  ctx: null,
  master: null,
  engineOsc: null,
  engineFilter: null,
  engineGain: null,
  music: null,
  musicToken: 0,
  lastImpact: 0,
  enabled: true,
};

const carSpriteCache = new Map();

function initMusic() {
  if (!state.musicEnabled) return null;
  const track = musicTracks[state.selectedMusic] || musicTracks[0];
  if (audio.music && audio.music.dataset.src === track.src) return audio.music;
  if (audio.music) {
    audio.music.pause();
    audio.music.currentTime = 0;
    audio.music.removeAttribute("src");
    audio.music.load();
  }
  audio.musicToken += 1;
  audio.music = new Audio(track.src);
  audio.music.dataset.src = track.src;
  audio.music.dataset.token = String(audio.musicToken);
  audio.music.loop = true;
  audio.music.preload = "none";
  audio.music.volume = state.musicVolume;
  return audio.music;
}

function syncVolumeControls() {
  const musicValue = String(Math.round(state.musicVolume * 100));
  const gameValue = String(Math.round(state.gameVolume * 100));
  [musicVolume, gameMusicVolume].forEach((input) => {
    if (input && input.value !== musicValue) input.value = musicValue;
  });
  [gameVolume, gameSoundVolume].forEach((input) => {
    if (input && input.value !== gameValue) input.value = gameValue;
  });
}

function applyAudioVolumes() {
  if (audio.music) audio.music.volume = state.musicVolume;
  if (audio.master) {
    const now = audio.ctx ? audio.ctx.currentTime : 0;
    audio.master.gain.setTargetAtTime(state.gameVolume, now, 0.05);
  }
  syncVolumeControls();
  updateSystemStatus();
}

function setMusicVolume(value) {
  state.musicVolume = clamp(Number(value) / 100, 0, 1);
  applyAudioVolumes();
}

function setGameVolume(value) {
  state.gameVolume = clamp(Number(value) / 100, 0, 1);
  applyAudioVolumes();
}

function playMusic(restart = false) {
  if (!state.musicEnabled) {
    stopMusic(true);
    updateMusicButton();
    return;
  }
  const music = initMusic();
  if (!music) return;
  music.volume = state.musicVolume;
  if (restart) music.currentTime = 0;
  const token = audio.musicToken;
  music.play().then(() => {
    if (audio.music !== music || audio.musicToken !== token || !state.musicEnabled) {
      music.pause();
      return;
    }
    state.musicPaused = false;
    updateMusicButton();
  }).catch(() => {
    if (audio.music === music && audio.musicToken === token) {
      state.musicPaused = true;
      updateMusicButton();
    }
    // Browsers can block audio until the first user gesture or a file can fail to load.
  });
  updateMusicButton();
}

function pauseMusic() {
  if (audio.music) audio.music.pause();
  updateMusicButton();
}

function stopMusic(unload = false) {
  if (!audio.music) return;
  audio.music.pause();
  audio.music.currentTime = 0;
  if (unload) {
    audio.musicToken += 1;
    audio.music.removeAttribute("src");
    audio.music.load();
    audio.music = null;
  }
  updateMusicButton();
}

function updateMusicButton() {
  if (!musicBtn) return;
  if (!state.musicEnabled) {
    musicBtn.textContent = "Musica: Off";
  } else if (state.musicPaused || !audio.music || audio.music.paused) {
    musicBtn.textContent = "Musica: Tocar";
  } else {
    musicBtn.textContent = "Musica: Pausar";
  }
  if (nextMusicBtn) nextMusicBtn.textContent = "Trocar musica";
  updateSystemStatus();
}

function duplicateControlKeys() {
  const used = new Map();
  const duplicates = new Set();
  playerControls.forEach((controls) => {
    controlActions.forEach((action) => {
      const code = controls[action.id];
      if (!code) return;
      if (used.has(code)) duplicates.add(code);
      used.set(code, true);
    });
  });
  return [...duplicates];
}

function onlineDefaultServerUrl() {
  const param = new URLSearchParams(window.location.search).get("onlineServer");
  const configured = window.CARFUK_ONLINE_SERVER || param || localStorage.getItem("carfukOnlineServer") || "";
  if (configured) return normalizeOnlineServerUrl(configured);
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) return "ws://localhost:8787";
  return "";
}

function normalizeOnlineServerUrl(value = "") {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  if (/^wss?:\/\//i.test(trimmed)) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed.replace(/^http/i, "ws");
  return `wss://${trimmed.replace(/^\/+/, "")}`;
}

function updateOnlineServerInput() {
  if (!onlineServerUrl) return;
  onlineServerUrl.value = onlineDefaultServerUrl();
}

function saveOnlineServerUrl() {
  const serverUrl = normalizeOnlineServerUrl(onlineServerUrl?.value || "");
  if (!serverUrl) {
    localStorage.removeItem("carfukOnlineServer");
    setOnlineStatus("Servidor online removido. Para internet real, publique o online-server e informe um endereco wss://.", "warn");
    updateOnlineServerInput();
    return;
  }
  localStorage.setItem("carfukOnlineServer", serverUrl);
  if (onlineServerUrl) onlineServerUrl.value = serverUrl;
  setOnlineStatus(`Servidor online salvo: ${serverUrl}`, "ok");
}

function onlineRoomId(value = "") {
  return String(value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);
}

function makeOnlineRoomCode() {
  return `DZ${Math.floor(1000 + Math.random() * 9000)}`;
}

function makeOnlinePlayerId() {
  return `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

function firstOnlineLevelIndex(categoryId = state.vehicleCategory) {
  const [first = 0] = levelIndexesForCategory(categoryId);
  return first;
}

function setOnlineStatus(text, tone = "info") {
  if (!onlineStatus) return;
  onlineStatus.textContent = text;
  onlineStatus.dataset.status = tone;
}

function onlinePlayerPayload() {
  const vehicles = currentVehicles();
  const car = vehicles[state.selectedCar] || vehicles[0] || cars[0];
  const currentPlayer = state.online.players.find((player) => player.id === state.online.playerId);
  const name = (pilotName.value || car.name || "Piloto Online").trim().slice(0, 18) || "Piloto Online";
  return {
    id: state.online.playerId || makeOnlinePlayerId(),
    name,
    category: currentPlayer?.category || state.vehicleCategory,
    carIndex: Number.isFinite(Number(currentPlayer?.carIndex)) ? Number(currentPlayer.carIndex) : clamp(state.selectedCar, 0, vehicles.length - 1),
    seatIndex: Number.isFinite(Number(currentPlayer?.seatIndex)) ? Number(currentPlayer.seatIndex) : null,
    color: car.color || "#ffd95f",
    host: state.online.role === "host",
  };
}

function renderOnlinePlayers() {
  if (!onlinePlayers) return;
  const players = state.online.players.length ? state.online.players : [onlinePlayerPayload()];
  onlinePlayers.innerHTML = players.slice(0, 4).map((player, index) => {
    const seat = index + 1;
    const host = player.host ? "Host" : "Piloto";
    return `<div class="online-player" style="--car:${htmlSafe(player.color || "#ffd95f")}"><i></i><strong>${seat}. ${htmlSafe(player.name || "Piloto Online")}</strong><small>${host}</small></div>`;
  }).join("");
  if (onlineStartBtn) {
    onlineStartBtn.disabled = !state.online.connected || state.online.role !== "host" || state.online.players.length < 1;
    onlineStartBtn.textContent = state.online.role === "host" ? "Largar Online" : "Aguardando Host";
  }
}

function onlineSend(payload) {
  const socket = state.online.socket;
  if (!socket || socket.readyState !== WebSocket.OPEN) return false;
  socket.send(JSON.stringify(payload));
  return true;
}

function syncOnlineProfile() {
  if (!state.online.connected) return;
  onlineSend({ type: "player-update", roomCode: state.online.roomCode, player: onlinePlayerPayload() });
}

function closeOnlineConnection(messageText = "Online desconectado.") {
  if (state.online.socket) {
    try {
      state.online.socket.close();
    } catch (error) {
      // Ignore disconnect errors; the lobby will show the offline status.
    }
  }
  state.online.socket = null;
  state.online.connected = false;
  state.online.raceActive = false;
  state.online.remoteInputs = {};
  state.online.players = [];
  setOnlineStatus(messageText, "warn");
  renderOnlinePlayers();
}

function connectOnline(role, requestedRoomCode = "") {
  const serverUrl = onlineDefaultServerUrl();
  if (!serverUrl) {
    setOnlineStatus("Servidor online ainda nao configurado. Publique a pasta online-server em um host Node/WebSocket e salve o endereco wss:// aqui.", "warn");
    updateOnlineServerInput();
    renderOnlinePlayers();
    return;
  }
  closeOnlineConnection("Conectando ao servidor online...");
  state.online.mode = "online";
  state.online.role = role;
  state.online.playerId = state.online.playerId || makeOnlinePlayerId();
  state.online.roomCode = role === "quick" ? "" : role === "host" ? makeOnlineRoomCode() : onlineRoomId(requestedRoomCode);
  if (onlineRoomCode) onlineRoomCode.value = state.online.roomCode;
  const socket = new WebSocket(serverUrl);
  state.online.socket = socket;
  setOnlineStatus(`Conectando em ${serverUrl}...`, "info");

  socket.addEventListener("open", () => {
    state.online.connected = true;
    if (role === "quick") {
      onlineSend({ type: "quick-play", player: onlinePlayerPayload(), preferredLevel: firstOnlineLevelIndex() });
      setOnlineStatus("Procurando corrida online com vaga...", "ok");
      return;
    }
    const type = role === "host" ? "create-room" : "join-room";
    onlineSend({ type, roomCode: state.online.roomCode, player: onlinePlayerPayload() });
    setOnlineStatus(role === "host" ? `Sala ${state.online.roomCode} criada. Envie este codigo para os amigos.` : `Entrando na sala ${state.online.roomCode}...`, "ok");
  });

  socket.addEventListener("message", (event) => {
    let data = null;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      return;
    }
    handleOnlineMessage(data);
  });

  socket.addEventListener("close", () => closeOnlineConnection("Servidor online desconectado."));
  socket.addEventListener("error", () => setOnlineStatus("Nao foi possivel conectar ao servidor online.", "error"));
}

function handleOnlineMessage(data) {
  if (!data || !data.type) return;
  if (data.type === "room-state") {
    const previousCount = state.online.players.length;
    state.online.roomCode = data.roomCode || state.online.roomCode;
    state.online.players = Array.isArray(data.players) ? data.players.slice(0, 4) : [];
    const currentPlayer = state.online.players.find((player) => player.id === state.online.playerId);
    if (currentPlayer?.host) state.online.role = "host";
    if (onlineRoomCode) onlineRoomCode.value = state.online.roomCode;
    setOnlineStatus(`Sala ${state.online.roomCode}: ${state.online.players.length}/4 jogador(es).`, "ok");
    renderOnlinePlayers();
    if (state.online.role === "host" && state.online.raceActive && state.online.players.length > previousCount) {
      applyOnlineRosterToRunningRace();
    }
  }
  if (data.type === "quick-play-result") {
    state.online.roomCode = data.roomCode || state.online.roomCode;
    state.online.role = data.role || state.online.role;
    state.online.players = Array.isArray(data.players) ? data.players.slice(0, 4) : state.online.players;
    if (onlineRoomCode) onlineRoomCode.value = state.online.roomCode;
    renderOnlinePlayers();
    if (data.autoStart) {
      state.selectedLevel = firstOnlineLevelIndex();
      setOnlineStatus(`Criando corrida nova na primeira pista: sala ${state.online.roomCode}.`, "ok");
      startOnlineRaceFromLobby();
      return;
    }
    if (data.config) {
      setOnlineStatus(`Entrando na corrida viva ${state.online.roomCode}.`, "ok");
      startOnlineRaceFromConfig({ ...data.config, players: state.online.players }, data.snapshot || null);
      return;
    }
    setOnlineStatus(`Sala ${state.online.roomCode}: aguardando largada do host.`, "ok");
  }
  if (data.type === "error") {
    setOnlineStatus(data.message || "Erro na sala online.", "error");
  }
  if (data.type === "input" && state.online.role === "host" && data.playerId) {
    state.online.remoteInputs[data.playerId] = data.input || {};
  }
  if (data.type === "start-race") {
    startOnlineRaceFromConfig(data.config || {});
  }
  if (data.type === "live-race") {
    startOnlineRaceFromConfig(data.config || {}, data.snapshot || null);
  }
  if (data.type === "snapshot" && state.online.role === "client") {
    applyOnlineSnapshot(data.snapshot || {});
  }
}

function createOnlineRoom() {
  connectOnline("host");
}

function joinOnlineRoom() {
  const code = onlineRoomId(onlineRoomCode?.value || "");
  if (!code) {
    setOnlineStatus("Digite o codigo da sala para entrar.", "warn");
    return;
  }
  connectOnline("client", code);
}

function quickPlayOnline() {
  state.raceMode = "single";
  state.selectedLevel = firstOnlineLevelIndex();
  setOnlineStatus("Entrando no online automatico...", "ok");
  openOnlinePanel();
  connectOnline("quick");
}

function openOnlinePanel() {
  const group = onlineCreateBtn?.closest?.(".setup-group");
  if (group) {
    group.open = true;
    group.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  updateOnlineServerInput();
  setOnlineStatus(state.online.connected ? `Sala ${state.online.roomCode}: pronta para jogar online.` : "Crie uma sala online ou entre com o codigo enviado pelo host.", state.online.connected ? "ok" : "info");
  renderOnlinePlayers();
}

function onlineRaceConfig() {
  return {
    category: state.vehicleCategory,
    selectedLevel: state.selectedLevel,
    selectedCar: state.selectedCar,
    cameraMode,
    players: state.online.players.slice(0, 4),
    plusCarNames: state.plusCarNames,
  };
}

function onlinePlayerSeatIndex(player, fallback = 0) {
  const value = Number(player?.seatIndex);
  if (Number.isFinite(value)) return clamp(Math.floor(value), 0, 3);
  return clamp(fallback, 0, 3);
}

function onlinePlayerSlotsCount(players = state.online.players) {
  if (!Array.isArray(players) || !players.length) return 1;
  const maxSeat = players.reduce((highest, player, index) => Math.max(highest, onlinePlayerSeatIndex(player, index)), 0);
  return clamp(maxSeat + 1, 1, 4);
}

function currentOnlineSeatIndex() {
  const playerIndex = Math.max(0, state.online.players.findIndex((player) => player.id === state.online.playerId));
  const player = state.online.players[playerIndex];
  return onlinePlayerSeatIndex(player, playerIndex);
}

function startOnlineRaceFromLobby() {
  if (!state.online.connected || state.online.role !== "host") {
    setOnlineStatus("Apenas o dono da sala pode iniciar a corrida online.", "warn");
    return;
  }
  const config = onlineRaceConfig();
  onlineSend({ type: "start-race", roomCode: state.online.roomCode, config });
  startOnlineRaceFromConfig(config);
}

function startOnlineRaceFromConfig(config, snapshot = null) {
  state.online.mode = "online";
  state.online.raceActive = true;
  state.online.players = Array.isArray(config.players) ? config.players.slice(0, 4) : state.online.players;
  state.vehicleCategory = config.category || state.vehicleCategory;
  state.selectedLevel = clamp(Number(config.selectedLevel) || 0, 0, levels.length - 1);
  state.selectedCar = clamp(Number(config.selectedCar) || 0, 0, currentVehicles().length - 1);
  state.plusCarNames = Array.isArray(config.plusCarNames) ? config.plusCarNames.slice(0, plusCars.length) : state.plusCarNames;
  cameraMode = clamp(Number(config.cameraMode) || cameraMode, 0, cameraModes.length - 1);
  state.raceMode = "single";
  state.playerCount = clamp(state.online.players.length || 1, 1, 4);
  startRace({ onlineStart: true });
  if (snapshot) applyOnlineSnapshot(snapshot);
  showMessage(state.online.role === "host" ? `Sala ${state.online.roomCode}: corrida online iniciada.` : `Conectado na sala ${state.online.roomCode}. Boa corrida!`, 3.4);
}

function applyOnlineRosterToRace() {
  if (!state.online.raceActive || !state.online.players.length) return;
  state.online.players.slice(0, 4).forEach((player, fallbackIndex) => {
    const index = onlinePlayerSeatIndex(player, fallbackIndex);
    const racer = state.racers[index];
    if (!player) return;
    if (!racer) return;
    const carIndex = Number.isFinite(Number(player.carIndex)) ? Number(player.carIndex) : state.selectedCar + index;
    const car = createRacerCar(carIndex, player.category || state.vehicleCategory);
    racer.player = true;
    racer.humanIndex = index;
    racer.controls = playerControls[index] || playerControls[0];
    racer.onlinePlayerId = player.id;
    racer.onlineRemote = state.online.role === "host" && player.id !== state.online.playerId;
    racer.name = player.name || racer.name;
    racer.car = car;
    racer.radius = car.dynamics?.radius || racer.radius;
  });
}

function applyOnlineRosterToRunningRace() {
  if (!state.track || !state.racers.length || !state.online.players.length) return;
  state.online.players.slice(0, 4).forEach((player, fallbackIndex) => {
    const index = onlinePlayerSeatIndex(player, fallbackIndex);
    let racer = state.racers[index];
    if (!racer) return;
    const wasRival = !racer.player;
    const carIndex = Number.isFinite(Number(player.carIndex)) ? Number(player.carIndex) : state.selectedCar + index;
    const car = createRacerCar(carIndex, player.category || state.vehicleCategory);
    racer.player = true;
    racer.humanIndex = index;
    racer.controls = playerControls[index] || playerControls[0];
    racer.onlinePlayerId = player.id;
    racer.onlineRemote = state.online.role === "host" && player.id !== state.online.playerId;
    racer.name = player.name || racer.name;
    racer.car = car;
    racer.radius = car.dynamics?.radius || racer.radius;
    if (wasRival) {
      racer.energy = Math.max(racer.energy || 0, 70);
      racer.fuel = Math.max(racer.fuel || 0, 70);
      racer.ammo = Math.max(racer.ammo || 0, 6);
      racer.nitro = Math.max(racer.nitro || 0, 1);
      showMessage(`${racer.name} entrou online no carro livre!`, 2.4);
    }
  });
  state.playerCount = Math.max(state.playerCount, onlinePlayerSlotsCount());
}

function localInputState(controls) {
  return {
    up: state.keys.has(controls.up),
    down: state.keys.has(controls.down),
    left: state.keys.has(controls.left),
    right: state.keys.has(controls.right),
    action: state.keys.has(controls.action),
    fire: state.keys.has(controls.fire),
  };
}

function racerInputState(racer) {
  if (state.online.raceActive && state.online.role === "host" && racer.onlineRemote) {
    return state.online.remoteInputs[racer.onlinePlayerId] || {};
  }
  return localInputState(racer.controls);
}

function currentOnlineInputSignature(input) {
  return ["up", "down", "left", "right", "action", "fire"].map((key) => (input[key] ? "1" : "0")).join("");
}

function sendOnlineInput(now = performance.now()) {
  if (!state.online.raceActive || state.online.role !== "client") return;
  const localIndex = currentOnlineSeatIndex();
  const racer = state.racers[localIndex];
  if (!racer) return;
  const input = localInputState(racer.controls);
  const signature = currentOnlineInputSignature(input);
  if (signature === state.online.lastInputSignature && now - state.online.lastInputSentAt < 80) return;
  state.online.lastInputSentAt = now;
  state.online.lastInputSignature = signature;
  onlineSend({ type: "input", roomCode: state.online.roomCode, playerId: state.online.playerId, input });
}

function onlineRacerSnapshot(racer) {
  return {
    seatIndex: Number.isFinite(Number(racer.humanIndex)) ? Number(racer.humanIndex) : null,
    carIndex: Number.isFinite(Number(racer.car?.rosterIndex)) ? Number(racer.car.rosterIndex) : null,
    category: racer.car?.category || state.vehicleCategory,
    x: racer.x,
    y: racer.y,
    angle: racer.angle,
    speed: racer.speed,
    progress: racer.progress,
    lastProgress: racer.lastProgress,
    total: racer.total,
    lap: racer.lap,
    fuel: racer.fuel,
    energy: racer.energy,
    nitro: racer.nitro,
    ammo: racer.ammo,
    turbo: racer.turbo,
    ram: racer.ram,
    shield: racer.shield,
    stun: racer.stun,
    cooldown: racer.cooldown,
    weaponCooldown: racer.weaponCooldown,
    finished: racer.finished,
    finishTime: racer.finishTime,
    score: racer.score,
    kills: racer.kills,
  };
}

function sendOnlineSnapshot(now = performance.now()) {
  if (!state.online.raceActive || state.online.role !== "host" || now - state.online.lastSnapshotSentAt < 50) return;
  state.online.lastSnapshotSentAt = now;
  onlineSend({
    type: "snapshot",
    roomCode: state.online.roomCode,
    snapshot: {
      time: state.time,
      ended: state.ended,
      racers: state.racers.map(onlineRacerSnapshot),
    },
  });
}

function applyOnlineSnapshot(snapshot) {
  if (!state.running || !state.online.raceActive || !Array.isArray(snapshot.racers)) return;
  state.online.lastSnapshotAt = performance.now();
  if (Number.isFinite(snapshot.time)) state.time = Math.max(state.time, snapshot.time);
  state.ended = Boolean(snapshot.ended);
  snapshot.racers.forEach((remote, index) => {
    const racer = state.racers[index];
    if (!racer || !remote) return;
    ["x", "y", "angle", "speed", "progress", "lastProgress", "total", "lap", "fuel", "energy", "nitro", "ammo", "turbo", "ram", "shield", "stun", "cooldown", "weaponCooldown", "finishTime", "score", "kills"].forEach((key) => {
      if (Number.isFinite(remote[key])) racer[key] = remote[key];
    });
    racer.finished = Boolean(remote.finished);
  });
}

function updateOnlineClientRace(dt) {
  sendOnlineInput();
  for (const racer of state.racers) {
    racer.weaponCooldown = Math.max(0, (racer.weaponCooldown || 0) - dt);
    racer.hitFlash = Math.max(0, (racer.hitFlash || 0) - dt);
  }
  if (state.msgTimer > 0) {
    state.msgTimer -= dt;
    if (state.msgTimer <= 0) message.classList.remove("show");
  }
  updateCamera(dt, false, humanRacers());
  updateEngineSound();
  updateHud();
}

function systemCheckItem(title, detail, status = "ok") {
  return `<div class="system-check" data-status="${status}"><strong>${title}</strong><span>${detail}</span></div>`;
}

function updateSystemStatus() {
  if (!systemStatus) return;
  const requiredButtons = [startBtn, cameraBtn, musicBtn, nextMusicBtn, pauseBtn, menuBtn].filter(Boolean).length;
  const requiredInputs = [pilotName, musicEnabled, musicChoices, musicVolume, gameVolume, gameMusicVolume, gameSoundVolume].filter(Boolean).length;
  const selectedTrack = musicTracks[state.selectedMusic] || musicTracks[0];
  const audioSupport = Boolean(window.AudioContext || window.webkitAudioContext);
  const musicState = state.musicEnabled ? (state.musicPaused ? "ligada e pausada" : "ligada") : "desligada por padrao";
  const assetDetail = state.musicAssetStatus === "ok"
    ? `${musicTracks.length} musicas prontas`
    : state.musicAssetStatus === "error"
      ? "alguma musica nao carregou"
      : state.musicAssetStatus === "local"
        ? `${musicTracks.length} musicas cadastradas`
        : "checando musicas";
  const assetStatus = state.musicAssetStatus === "error" ? "error" : state.musicAssetStatus === "pending" ? "warn" : "ok";
  const duplicates = duplicateControlKeys();
  const fpsStatus = state.running ? (state.fps >= 45 || state.fps === 0 ? "ok" : "warn") : "ok";
  const fpsDetail = state.running ? `${Math.round(state.fps || 0)} FPS durante a corrida` : "aguardando corrida";
  const selectedLevel = levels[state.selectedLevel] || levels[0];
  const graphicsMode = currentGraphicsMode();
  const effectsDetail = state.reducedEffects ? "modo leve ligado" : "efeitos completos";
  const fpsVisibility = state.showFps ? "FPS visivel no status" : "FPS oculto quando parado";

  systemStatus.innerHTML = [
    systemCheckItem("Botoes", `${requiredButtons}/6 botoes principais ativos`, requiredButtons === 6 ? "ok" : "error"),
    systemCheckItem("Volumes", `${requiredInputs}/7 controles de som/menu ativos`, requiredInputs === 7 ? "ok" : "error"),
    systemCheckItem("Radio", `${assetDetail}; agora: ${musicState}`, assetStatus),
    systemCheckItem("Audio", audioSupport ? "motor e efeitos disponiveis" : "navegador sem AudioContext", audioSupport ? "ok" : "warn"),
    systemCheckItem("Fases", `${levels.length} fases; atual: ${selectedLevel.name}`, levels.length >= 12 ? "ok" : "warn"),
    systemCheckItem("Veiculos", `${cars.length} carros + ${karts.length} karts com armas`, cars.length >= 8 && karts.length >= 4 ? "ok" : "warn"),
    systemCheckItem("Anti-corte", `${CHECKPOINTS_PER_LAP - 1} checkpoints obrigatorios por volta`, "ok"),
    systemCheckItem("Controles", duplicates.length ? `teclas repetidas: ${duplicates.join(", ")}` : `${playerControls.length} jogadores configuraveis`, duplicates.length ? "warn" : "ok"),
    systemCheckItem("Graficos", `${graphicsMode.label}; ${effectsDetail}; ${fpsVisibility}`, "ok"),
    systemCheckItem("Desligamento", "som para ao sair, ocultar ou voltar ao menu", "ok"),
    systemCheckItem("Performance", state.showFps || state.running ? fpsDetail : "pronto para medir na corrida", fpsStatus),
    systemCheckItem("Musica atual", selectedTrack ? selectedTrack.title : "nenhuma selecionada", selectedTrack ? "ok" : "error"),
  ].join("");
}

function menuVehicleArt(vehicle) {
  if (vehicle.sprite) {
    return `<img class="menu-sprite-car" src="${vehicle.sprite}" alt="${vehicle.name}" loading="eager" decoding="async" />`;
  }

  if (vehicle.category === "kart") {
    const kartIndex = Math.max(0, karts.indexOf(vehicle));
    const kartNumber = vehicle.name.includes("Preto") ? "X" : String([7, 3, 5, 9, 2, 8][kartIndex % 6]);
    return `
      <svg class="vehicle-art kart-art" viewBox="0 0 240 160" aria-hidden="true">
        <ellipse class="vehicle-shadow" cx="121" cy="132" rx="86" ry="18" />
        <ellipse class="vehicle-glow" cx="126" cy="88" rx="98" ry="54" />
        <path class="kart-frame" d="M57 105 H184 M66 87 H167 M93 56 L152 108 M93 108 L152 56" />
        <rect class="kart-wheel kart-wheel-rear" x="35" y="91" width="43" height="34" rx="12" />
        <rect class="kart-wheel kart-wheel-front" x="171" y="93" width="39" height="31" rx="12" />
        <ellipse class="kart-rim" cx="56" cy="108" rx="11" ry="12" />
        <ellipse class="kart-rim" cx="190" cy="109" rx="10" ry="11" />
        <path class="kart-front-fairing" d="M170 92 C191 77 207 59 215 34 C194 39 176 51 159 72 C145 80 145 100 170 92 Z" />
        <path class="kart-side-pod" d="M63 104 C84 94 116 90 146 92 C159 96 164 107 154 116 L72 121 C56 120 52 112 63 104 Z" />
        <path class="kart-body-main" d="M71 102 C86 72 116 55 151 64 C166 73 175 89 171 106 C142 122 91 124 62 113 C58 108 61 104 71 102 Z" />
        <path class="kart-body-top" d="M88 101 C107 76 129 67 154 72 C163 79 166 89 162 98 C137 93 112 95 88 101 Z" />
        <path class="kart-stripe" d="M82 111 C109 106 138 106 163 111 M111 80 C126 72 143 72 157 81" />
        <rect class="kart-engine" x="47" y="77" width="33" height="28" rx="8" />
        <path class="kart-exhaust" d="M45 87 H25 M44 101 H23" />
        <path class="kart-seat" d="M86 70 C97 55 118 54 132 68 L128 104 C113 114 94 111 84 99 Z" />
        <path class="kart-driver-body" d="M97 86 C105 77 121 77 130 88 L124 111 C112 118 99 113 93 102 Z" />
        <circle class="kart-helmet" cx="112" cy="69" r="21" />
        <path class="kart-visor" d="M102 63 C115 56 131 60 138 72 C126 78 112 78 99 72 C98 68 99 65 102 63 Z" />
        <path class="kart-arms" d="M100 93 C116 101 132 103 149 98 M124 92 C138 90 151 85 163 77" />
        <path class="kart-steer" d="M159 77 C166 74 172 75 177 80" />
        <path class="kart-number" d="M80 107 A14 14 0 1 0 108 107 A14 14 0 1 0 80 107" />
        <text class="kart-number-text" x="94" y="112">${kartNumber}</text>
        <path class="vehicle-spark" d="M198 54 L218 42 M199 94 L222 104" />
      </svg>`;
  }

  const badge = rcCarDecal(vehicle);
  return `
    <svg class="vehicle-art sport-art premium-sport-art" viewBox="0 0 180 260" aria-hidden="true">
      <ellipse class="vehicle-shadow" cx="90" cy="226" rx="68" ry="24" />
      <ellipse class="vehicle-glow" cx="90" cy="132" rx="82" ry="116" />
      <rect class="sport-card-wheel" x="18" y="66" width="24" height="58" rx="10" />
      <rect class="sport-card-wheel" x="138" y="66" width="24" height="58" rx="10" />
      <rect class="sport-card-wheel" x="18" y="170" width="25" height="62" rx="10" />
      <rect class="sport-card-wheel" x="137" y="170" width="25" height="62" rx="10" />
      <ellipse class="sport-card-rim" cx="30" cy="95" rx="8" ry="17" />
      <ellipse class="sport-card-rim" cx="150" cy="95" rx="8" ry="17" />
      <ellipse class="sport-card-rim" cx="30" cy="201" rx="9" ry="18" />
      <ellipse class="sport-card-rim" cx="150" cy="201" rx="9" ry="18" />
      <path class="sport-card-wing" d="M38 23 H142 M38 23 V52 M142 23 V52 M46 48 H134" />
      <path class="sport-card-body" d="M90 240 C57 237 39 217 42 183 L48 146 C42 123 43 99 56 79 L62 57 C75 46 105 46 118 57 L124 79 C137 99 138 123 132 146 L138 183 C141 217 123 237 90 240 Z" />
      <path class="sport-card-side" d="M60 61 C75 51 105 51 120 61 L113 93 C98 88 82 88 67 93 Z" />
      <path class="sport-card-side" d="M49 137 C62 122 75 111 90 108 C105 111 118 122 131 137 L123 156 C102 148 78 148 57 156 Z" />
      <path class="sport-card-nose" d="M90 238 C66 233 53 219 52 199 L62 178 C78 186 102 186 118 178 L128 199 C127 219 114 233 90 238 Z" />
      <path class="sport-card-cabin" d="M58 114 C68 95 78 88 90 86 C102 88 112 95 122 114 L116 164 C101 172 79 172 64 164 Z" />
      <path class="sport-card-glass" d="M66 119 C72 104 80 98 90 96 C100 98 108 104 114 119 L111 157 C99 162 81 162 69 157 Z" />
      <path class="sport-card-stripe" d="M79 28 V238 M101 28 V238" />
      <path class="sport-card-highlight" d="M61 62 C75 51 105 51 119 62 M55 147 C74 137 106 137 125 147 M59 202 C76 211 104 211 121 202" />
      <path class="sport-card-intake" d="M64 177 H82 M98 177 H116 M59 190 H79 M101 190 H121" />
      <path class="sport-card-grill" d="M58 226 H122" />
      <path class="sport-card-light" d="M50 207 L68 219 M130 207 L112 219" />
      <text class="sport-card-number" x="90" y="201">${badge}</text>
      <text class="sport-card-number sport-card-number-rear" x="90" y="74">${badge}</text>
      <path class="sport-card-neon" d="M48 57 C40 104 39 187 55 229 M132 57 C140 104 141 187 125 229" />
    </svg>`;
}

function probeMusicAssets() {
  if (!systemStatus || state.musicAssetStatus !== "pending") return;
  if (!window.fetch || window.location.protocol === "file:") {
    state.musicAssetStatus = "local";
    updateSystemStatus();
    return;
  }
  Promise.all(musicTracks.map((track) => fetch(track.src, { method: "HEAD", cache: "no-store" })
    .then((response) => response.ok)
    .catch(() => false)))
    .then((results) => {
      state.musicAssetStatus = results.every(Boolean) ? "ok" : "error";
      updateSystemStatus();
    });
}

function toggleMusic() {
  if (!state.musicEnabled) {
    state.musicEnabled = true;
    state.musicPaused = false;
    if (musicEnabled) musicEnabled.checked = true;
    playMusic(false);
    showMessage(`Radio Zákia Stingers ligada: ${(musicTracks[state.selectedMusic] || musicTracks[0]).title}`, 1.6);
    return;
  }
  if (audio.music && !audio.music.paused && !state.musicPaused) {
    state.musicPaused = true;
    pauseMusic();
    showMessage("Musica pausada. Som do jogo continua.", 1.4);
  } else {
    state.musicPaused = false;
    playMusic(false);
    showMessage(`Radio Zákia Stingers: ${(musicTracks[state.selectedMusic] || musicTracks[0]).title}`, 1.6);
  }
  updateMusicButton();
}

function nextMusic() {
  state.selectedMusic = (state.selectedMusic + 1) % musicTracks.length;
  if (musicChoices) musicChoices.value = String(state.selectedMusic);
  if (state.musicEnabled && !state.musicPaused) playMusic(true);
  showMessage(state.musicEnabled ? `Radio Zákia Stingers: ${(musicTracks[state.selectedMusic] || musicTracks[0]).title}` : `Musica selecionada: ${(musicTracks[state.selectedMusic] || musicTracks[0]).title}`, 1.6);
  updateMusicButton();
}

function initAudio() {
  if (!audio.enabled || audio.ctx) return audio.ctx;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  audio.ctx = new AudioCtx();
  audio.master = audio.ctx.createGain();
  audio.master.gain.value = state.gameVolume;
  audio.master.connect(audio.ctx.destination);
  applyAudioVolumes();
  return audio.ctx;
}

function resumeAudio() {
  const ctxAudio = initAudio();
  if (ctxAudio && ctxAudio.state === "suspended") ctxAudio.resume().catch(() => {});
  applyAudioVolumes();
  return ctxAudio;
}

function tone(freq, duration, type = "sine", volume = 0.12, slide = 1, delay = 0) {
  const ctxAudio = audio.ctx;
  if (!ctxAudio || ctxAudio.state === "suspended") return;
  const t = ctxAudio.currentTime + delay;
  const osc = ctxAudio.createOscillator();
  const gain = ctxAudio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(24, freq * slide), t + duration);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(volume, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain);
  gain.connect(audio.master);
  osc.start(t);
  osc.stop(t + duration + 0.03);
}

function noise(duration, volume = 0.12, cutoff = 900, delay = 0) {
  const ctxAudio = audio.ctx;
  if (!ctxAudio || ctxAudio.state === "suspended") return;
  const length = Math.max(1, Math.floor(ctxAudio.sampleRate * duration));
  const buffer = ctxAudio.createBuffer(1, length, ctxAudio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 1.4);
  const source = ctxAudio.createBufferSource();
  const filter = ctxAudio.createBiquadFilter();
  const gain = ctxAudio.createGain();
  const t = ctxAudio.currentTime + delay;
  source.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(cutoff, t);
  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audio.master);
  source.start(t);
}

function playSound(kind, intensity = 1) {
  if (!audio.enabled) return;
  resumeAudio();
  const ctxAudio = audio.ctx;
  if (!ctxAudio || ctxAudio.state === "suspended") return;
  if (kind === "start") {
    tone(220, 0.12, "square", 0.1, 1.45);
    tone(330, 0.12, "square", 0.1, 1.35, 0.14);
    tone(520, 0.22, "sawtooth", 0.14, 1.8, 0.31);
  } else if (kind === "nitro") {
    tone(140, 0.36, "sawtooth", 0.14 * intensity, 3.4);
    noise(0.3, 0.1 * intensity, 1600);
  } else if (kind === "shoot") {
    tone(680, 0.09, "square", 0.12 * intensity, 0.42);
    noise(0.08, 0.05 * intensity, 2200);
  } else if (kind === "hit") {
    tone(130, 0.18, "sawtooth", 0.14 * intensity, 0.52);
    noise(0.18, 0.16 * intensity, 740);
  } else if (kind === "crash") {
    tone(82, 0.26, "sawtooth", 0.13 * intensity, 0.45);
    noise(0.32, 0.17 * intensity, 520);
  } else if (kind === "pickup") {
    tone(560, 0.08, "triangle", 0.08 * intensity, 1.55);
    tone(880, 0.1, "triangle", 0.08 * intensity, 1.22, 0.07);
  } else if (kind === "shield") {
    tone(280, 0.18, "sine", 0.11 * intensity, 1.9);
    tone(620, 0.16, "triangle", 0.08 * intensity, 0.8);
  } else if (kind === "lap") {
    tone(420, 0.08, "square", 0.08, 1.2);
    tone(680, 0.12, "square", 0.09, 1.2, 0.09);
    tone(940, 0.18, "square", 0.1, 1.1, 0.2);
  }
}

function startEngineSound() {
  const ctxAudio = resumeAudio();
  if (!ctxAudio || audio.engineOsc) return;
  audio.engineOsc = ctxAudio.createOscillator();
  audio.engineFilter = ctxAudio.createBiquadFilter();
  audio.engineGain = ctxAudio.createGain();
  audio.engineOsc.type = "sawtooth";
  audio.engineOsc.frequency.value = 58;
  audio.engineFilter.type = "lowpass";
  audio.engineFilter.frequency.value = 420;
  audio.engineGain.gain.value = 0.025;
  audio.engineOsc.connect(audio.engineFilter);
  audio.engineFilter.connect(audio.engineGain);
  audio.engineGain.connect(audio.master);
  audio.engineOsc.start();
}

function stopEngineSound() {
  if (!audio.engineOsc) return;
  try {
    audio.engineOsc.stop();
  } catch (err) {
    // The oscillator may already have stopped when the browser closes audio.
  }
  try {
    audio.engineOsc.disconnect();
    audio.engineFilter?.disconnect();
    audio.engineGain?.disconnect();
  } catch (err) {
    // Some browsers disconnect audio nodes automatically while closing the page.
  }
  audio.engineOsc = null;
  audio.engineFilter = null;
  audio.engineGain = null;
}

function cancelGameLoop() {
  if (!state.rafId) return;
  cancelAnimationFrame(state.rafId);
  state.rafId = 0;
}

function silenceAllAudio({ unloadMusic = true, closeContext = false } = {}) {
  state.keys.clear();
  state.musicPaused = true;
  stopEngineSound();
  stopMusic(unloadMusic);
  if (!audio.ctx) {
    updateMusicButton();
    return;
  }

  if (audio.master && audio.ctx.state !== "closed") {
    try {
      audio.master.gain.cancelScheduledValues(audio.ctx.currentTime);
      audio.master.gain.setValueAtTime(0, audio.ctx.currentTime);
    } catch (err) {
      // AudioContext can already be closing during browser shutdown.
    }
  }

  if (closeContext && audio.ctx.state !== "closed") {
    const closing = audio.ctx.close().catch(() => {});
    audio.ctx = null;
    audio.master = null;
    closing.finally(() => {});
  } else if (audio.ctx.state === "running") {
    audio.ctx.suspend().catch(() => {});
  }
  updateMusicButton();
}

function shutdownGameSession({ showMenu = true, closeContext = false } = {}) {
  state.running = false;
  state.paused = true;
  cancelGameLoop();
  silenceAllAudio({ unloadMusic: true, closeContext });
  hideRaceResults();
  if (pauseBtn) pauseBtn.textContent = "Pausar";
  if (showMenu) {
    game.classList.add("hidden");
    menu.classList.remove("hidden");
  }
}

function updateEngineSound() {
  const ctxAudio = audio.ctx;
  if (!ctxAudio || !audio.engineOsc || !audio.engineGain || !audio.engineFilter) return;
  const racers = humanRacers().length ? humanRacers() : state.racers;
  const avgSpeed = racers.reduce((sum, racer) => sum + Math.abs(racer.speed || 0), 0) / Math.max(1, racers.length);
  const drive = clamp(avgSpeed / 430, 0, 1);
  const silent = !state.running || state.paused || state.ended || avgSpeed < 8;
  const targetGain = silent ? 0 : 0.012 + drive * 0.06;
  audio.engineOsc.frequency.setTargetAtTime(58 + drive * 128 + Math.sin(state.time * 22) * 5, ctxAudio.currentTime, 0.045);
  audio.engineFilter.frequency.setTargetAtTime(400 + drive * 1120, ctxAudio.currentTime, 0.06);
  audio.engineGain.gain.setTargetAtTime(targetGain, ctxAudio.currentTime, silent ? 0.06 : 0.08);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function shadeColor(hex, amount = 0) {
  const clean = String(hex || "#ffffff").replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean.padEnd(6, "0").slice(0, 6);
  const num = Number.parseInt(full, 16);
  if (Number.isNaN(num)) return hex || "#ffffff";
  const r = clamp(((num >> 16) & 255) + amount, 0, 255);
  const g = clamp(((num >> 8) & 255) + amount, 0, 255);
  const b = clamp((num & 255) + amount, 0, 255);
  return `rgb(${r},${g},${b})`;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function angleDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= TAU;
  while (d < -Math.PI) d += TAU;
  return d;
}

function lerpAngle(a, b, t) {
  return a + angleDiff(b, a) * t;
}

function formatTime(t) {
  const min = Math.floor(t / 60);
  const sec = String(Math.floor(t % 60)).padStart(2, "0");
  const cs = String(Math.floor((t % 1) * 100)).padStart(2, "0");
  return `${min}:${sec}.${cs}`;
}

function ordinal(n) {
  return `${n}o`;
}

function keyLabel(code) {
  const labels = {
    ArrowUp: "↑",
    ArrowDown: "↓",
    ArrowLeft: "←",
    ArrowRight: "→",
    Space: "Espaco",
    Enter: "Enter",
    ShiftLeft: "Shift Esq.",
    ShiftRight: "Shift Dir.",
    ControlLeft: "Ctrl Esq.",
    ControlRight: "Ctrl Dir.",
    AltLeft: "Alt Esq.",
    AltRight: "Alt Dir.",
  };
  if (labels[code]) return labels[code];
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Digit")) return code.slice(5);
  if (code.startsWith("Numpad")) return `Num ${code.slice(6)}`;
  return code.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function refreshControlLabels() {
  playerControls.forEach((controls) => {
    controls.keys = `${keyLabel(controls.up)} ${keyLabel(controls.down)} ${keyLabel(controls.left)} ${keyLabel(controls.right)} + ${keyLabel(controls.action)} + ${keyLabel(controls.fire)}`;
  });
}

function isConfiguredControlKey(code) {
  return playerControls.some((controls) => controlActions.some((action) => controls[action.id] === code));
}

function saveControlBindings() {
  try {
    const data = playerControls.map((controls) => {
      const saved = {};
      controlActions.forEach((action) => {
        saved[action.id] = controls[action.id];
      });
      return saved;
    });
    localStorage.setItem("carfukControls", JSON.stringify(data));
  } catch (err) {
    // Local storage can be unavailable in strict browser modes.
  }
}

function loadControlBindings() {
  try {
    const data = JSON.parse(localStorage.getItem("carfukControls") || "[]");
    data.forEach((saved, i) => {
      if (!playerControls[i]) return;
      controlActions.forEach((action) => {
        if (typeof saved[action.id] === "string") playerControls[i][action.id] = saved[action.id];
      });
    });
  } catch (err) {
    // Invalid saved data should not stop the game.
  }
  refreshControlLabels();
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function smoothTrackPath(rawPoints, rounds = 4) {
  let points = rawPoints.map(([x, y]) => ({ x, y }));
  for (let round = 0; round < rounds; round++) {
    const next = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const n = points[(i + 1) % points.length];
      next.push({ x: p.x * 0.75 + n.x * 0.25, y: p.y * 0.75 + n.y * 0.25 });
      next.push({ x: p.x * 0.25 + n.x * 0.75, y: p.y * 0.25 + n.y * 0.75 });
    }
    points = next;
  }
  return points;
}

function cross2(ax, ay, bx, by) {
  return ax * by - ay * bx;
}

function segmentIntersection(segA, segB) {
  const ax = segA.a.x;
  const ay = segA.a.y;
  const rx = segA.b.x - segA.a.x;
  const ry = segA.b.y - segA.a.y;
  const bx = segB.a.x;
  const by = segB.a.y;
  const sx = segB.b.x - segB.a.x;
  const sy = segB.b.y - segB.a.y;
  const denom = cross2(rx, ry, sx, sy);
  if (Math.abs(denom) < 0.001) return null;
  const qpx = bx - ax;
  const qpy = by - ay;
  const t = cross2(qpx, qpy, sx, sy) / denom;
  const u = cross2(qpx, qpy, rx, ry) / denom;
  if (t <= 0.08 || t >= 0.92 || u <= 0.08 || u >= 0.92) return null;
  return { x: ax + rx * t, y: ay + ry * t, t, u };
}

function adjacentSegments(i, j, total) {
  const gap = Math.abs(i - j);
  return gap < 7 || total - gap < 7;
}

function detectTrackOverpasses(level, segments, length) {
  if (level.noOverpasses) return [];
  if (Array.isArray(level.manualOverpasses) && level.manualOverpasses.length) {
    return level.manualOverpasses.map((overpass) => {
      const top = pointAt({ segments, length }, overpass.progress || 0, 0);
      const under = pointAt({ segments, length }, overpass.underProgress || 0, 0);
      return {
        x: Number.isFinite(overpass.x) ? overpass.x : (top.x + under.x) * 0.5,
        y: Number.isFinite(overpass.y) ? overpass.y : (top.y + under.y) * 0.5,
        progress: overpass.progress || 0,
        underProgress: overpass.underProgress || 0,
        angle: Number.isFinite(overpass.angle) ? overpass.angle : top.angle,
        underAngle: Number.isFinite(overpass.underAngle) ? overpass.underAngle : under.angle,
        length: overpass.length || level.overpassLength || Math.max(level.road * 1.45, 300),
        width: overpass.width || level.overpassWidth || level.road + 42,
        auto: false,
      };
    });
  }
  const found = [];
  const maxOverpasses = level.maxOverpasses || 6;
  const minProgressGap = Math.max(level.road * 1.8, length * 0.075);
  for (let i = 0; i < segments.length; i++) {
    for (let j = i + 1; j < segments.length; j++) {
      if (adjacentSegments(i, j, segments.length)) continue;
      const hit = segmentIntersection(segments[i], segments[j]);
      if (!hit) continue;
      const progressA = segments[i].start + segments[i].length * hit.t;
      const progressB = segments[j].start + segments[j].length * hit.u;
      const startBuffer = Number.isFinite(level.overpassStartBuffer) ? level.overpassStartBuffer : Math.min(720, length * 0.08);
      const nearStart = (p) => p < startBuffer || length - p < startBuffer;
      if (nearStart(progressA) || nearStart(progressB)) continue;
      if (progressSeparation(progressA, progressB, length) < minProgressGap) continue;
      if (found.some((overpass) => Math.hypot(overpass.x - hit.x, overpass.y - hit.y) < level.road * 0.9)) continue;
      const aIsBridge = (found.length + Math.floor(progressA / 500)) % 2 === 0;
      const over = aIsBridge ? segments[i] : segments[j];
      const under = aIsBridge ? segments[j] : segments[i];
      found.push({
        x: hit.x,
        y: hit.y,
        progress: aIsBridge ? progressA : progressB,
        underProgress: aIsBridge ? progressB : progressA,
        angle: over.angle,
        underAngle: under.angle,
        length: level.overpassLength || Math.max(level.road * 1.45, 300),
        width: level.overpassWidth || level.road + 42,
        auto: true,
      });
      if (found.length >= maxOverpasses) return found;
    }
  }
  return found;
}

function buildTrack(level) {
  const points = smoothTrackPath(level.path, Number.isFinite(level.smoothRounds) ? level.smoothRounds : 4);
  const segments = [];
  let length = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const segLength = distance(a, b);
    const angle = Math.atan2(b.y - a.y, b.x - a.x);
    segments.push({ a, b, start: length, length: segLength, angle });
    length += segLength;
  }
  const gateRatios = level.gates || (level.theme === "bridge" ? [0.14, 0.62] : [0.18, 0.68]);
  const gates = gateRatios.map((gate) => typeof gate === "number" ? { at: gate, size: 0.034 } : gate);
  const checkpoints = Array.from({ length: CHECKPOINTS_PER_LAP - 1 }, (_, i) => ((i + 1) / CHECKPOINTS_PER_LAP) * length);
  const overpasses = detectTrackOverpasses(level, segments, length);
  return { level, points, segments, length, gates, checkpoints, overpasses };
}

function crossedProgress(last, current, target, length) {
  const a = ((last % length) + length) % length;
  const b = ((current % length) + length) % length;
  return b >= a ? target > a && target <= b : target > a || target <= b;
}

function resetLapCheckpoints(racer) {
  racer.nextCheckpoint = 0;
  racer.checkpointsPassed = 0;
  racer.validProgress = racer.progress;
  racer.lastValidProgress = racer.progress;
}

function resetRacerToValidProgress(racer) {
  const progress = Number.isFinite(racer.lastValidProgress) ? racer.lastValidProgress : racer.startProgress || 0;
  const safe = pointAt(state.track, progress, racer.lane || 0);
  racer.x = safe.x;
  racer.y = safe.y;
  racer.angle = safe.angle;
  racer.speed = Math.min(racer.speed, 80);
  racer.progress = safe.progress;
  racer.lastProgress = safe.progress;
  racer.total = (Math.max(1, racer.lap) - 1) * state.track.length + safe.progress;
}

function moveRacerToTrackProgress(racer, progress, keepRolling = false) {
  const safe = pointAt(state.track, progress, racer.lane || 0);
  racer.x = safe.x;
  racer.y = safe.y;
  racer.angle = safe.angle;
  racer.progress = safe.progress;
  racer.lastProgress = safe.progress;
  racer.lastValidProgress = safe.progress;
  racer.trackProjection = safe;
  if (!keepRolling) racer.speed = 0;
}

function hasValidRacerPose(racer) {
  return !!racer
    && Number.isFinite(racer.x)
    && Number.isFinite(racer.y)
    && Number.isFinite(racer.angle)
    && Number.isFinite(racer.speed);
}

function recoverRacerPose(racer, reason = "pose") {
  if (!state.track || !racer) return false;
  const fallbackProgress = Number.isFinite(racer.lastValidProgress)
    ? racer.lastValidProgress
    : Number.isFinite(racer.progress)
      ? racer.progress
      : racer.startProgress || 0;
  const fallbackLane = Number.isFinite(racer.lane) ? racer.lane : 0;
  const safe = pointAt(state.track, fallbackProgress, fallbackLane);
  racer.x = safe.x;
  racer.y = safe.y;
  racer.angle = safe.angle;
  racer.speed = 0;
  racer.progress = safe.progress;
  racer.lastProgress = safe.progress;
  racer.lastValidProgress = safe.progress;
  racer.validProgress = safe.progress;
  racer.trackProjection = safe;
  racer.stuckTimer = 0;
  racer.crowdTimer = 0;
  if (performance.now() - (state.lastRecoveryAt || 0) > 1800) {
    console.warn(`Recuperando carrinho com estado invalido (${reason}).`, racer.name);
    showMessage("Carrinho recuperado para a pista sem travar o jogo.", 1.8);
    state.lastRecoveryAt = performance.now();
  }
  return true;
}

function ensureRacerPose(racer, reason = "pose") {
  if (hasValidRacerPose(racer)) return true;
  return recoverRacerPose(racer, reason);
}

function pointAt(track, progress, lane = 0) {
  const p = ((progress % track.length) + track.length) % track.length;
  const seg = track.segments.find((s) => p >= s.start && p <= s.start + s.length) || track.segments[0];
  const t = clamp((p - seg.start) / seg.length, 0, 1);
  const x = lerp(seg.a.x, seg.b.x, t);
  const y = lerp(seg.a.y, seg.b.y, t);
  const nx = -Math.sin(seg.angle);
  const ny = Math.cos(seg.angle);
  return { x: x + nx * lane, y: y + ny * lane, angle: seg.angle, progress: p };
}

function progressSeparation(a, b, length) {
  const direct = Math.abs((((a - b) % length) + length) % length);
  return Math.min(direct, length - direct);
}

function isProgressNear(progress, target, window, length) {
  return progressSeparation(progress, target, length) <= window;
}

function isRacerUnderOverpass(racer) {
  const track = state.track;
  if (!track || !(track.overpasses || []).length || !Number.isFinite(racer.progress)) return false;
  return track.overpasses.some((overpass) => {
    const underWindow = Math.max(92, (overpass.width || track.level.road + 42) * 0.58);
    const topWindow = Math.max(80, (overpass.length || track.level.road * 1.45) * 0.22);
    const nearUnder = isProgressNear(racer.progress, overpass.underProgress, underWindow, track.length);
    const nearTop = isProgressNear(racer.progress, overpass.progress, topWindow, track.length);
    return nearUnder && !nearTop;
  });
}

function project(track, x, y, expectedProgress = null, searchWindow = Infinity) {
  let best = { distance: Infinity, progress: 0, angle: 0, side: 0 };
  let fallback = best;
  const hasExpected = Number.isFinite(expectedProgress) && Number.isFinite(searchWindow);
  for (const seg of track.segments) {
    const vx = seg.b.x - seg.a.x;
    const vy = seg.b.y - seg.a.y;
    const wx = x - seg.a.x;
    const wy = y - seg.a.y;
    const t = clamp((vx * wx + vy * wy) / (seg.length * seg.length), 0, 1);
    const px = seg.a.x + vx * t;
    const py = seg.a.y + vy * t;
    const dx = x - px;
    const dy = y - py;
    const d = Math.hypot(dx, dy);
    const candidate = {
      distance: d,
      progress: seg.start + seg.length * t,
      angle: seg.angle,
      side: dx * -Math.sin(seg.angle) + dy * Math.cos(seg.angle),
    };
    if (d < fallback.distance) fallback = candidate;
    if (hasExpected && progressSeparation(candidate.progress, expectedProgress, track.length) > searchWindow) continue;
    if (d < best.distance) best = candidate;
  }
  return best.distance < Infinity ? best : fallback;
}

function projectShortcutRoads(level, x, y) {
  if (!Array.isArray(level.shortcutRoads) || !level.shortcutRoads.length) return null;
  let best = null;
  for (const road of level.shortcutRoads) {
    for (let i = 0; i < road.length - 1; i++) {
      const a = road[i];
      const b = road[i + 1];
      const vx = b[0] - a[0];
      const vy = b[1] - a[1];
      const lenSq = vx * vx + vy * vy;
      if (lenSq <= 0.001) continue;
      const t = clamp(((x - a[0]) * vx + (y - a[1]) * vy) / lenSq, 0, 1);
      const px = a[0] + vx * t;
      const py = a[1] + vy * t;
      const distanceToRoad = Math.hypot(x - px, y - py);
      if (!best || distanceToRoad < best.distance) {
        best = {
          x: px,
          y: py,
          distance: distanceToRoad,
          angle: Math.atan2(vy, vx),
          side: Math.sign(cross2(vx, vy, x - px, y - py)) * distanceToRoad,
        };
      }
    }
  }
  return best;
}

function projectRacer(racer, searchWindow = null) {
  if (!ensureRacerPose(racer, "project")) return { distance: 0, progress: 0, angle: 0, side: 0 };
  const expected = Number.isFinite(racer.progress) ? racer.progress : racer.startProgress || 0;
  const windowSize = Number.isFinite(searchWindow) ? searchWindow : (state.track.overpasses || []).length ? 440 : 620;
  return project(state.track, racer.x, racer.y, expected, windowSize);
}

function isBridgeOpen(track, progress) {
  const p = ((progress % track.length) + track.length) % track.length;
  return (track.level.bridges || []).some((bridge, i) => {
    const center = bridge.at * track.length;
    const half = bridge.size * track.length * 0.5;
    const open = Math.sin(state.time * track.level.bridgeSpeed + i * 1.9) > 0.18;
    return open && p > center - half && p < center + half;
  });
}

function trainState(track, train, index) {
  const surprise = train.surprise ? Math.sin(Math.floor(state.time / train.period + index * 3.7) * 12.9898) * 43758.5453 : 0;
  const offset = train.surprise ? (surprise - Math.floor(surprise)) * train.period * 0.55 : 0;
  const cycle = ((state.time + index * 2.1 + offset) % train.period + train.period) % train.period;
  const active = cycle < train.active;
  const warning = cycle < train.active + (train.surprise ? 1.05 : 1.6);
  const crossing = pointAt(track, train.at * track.length, 0);
  const run = active ? (cycle / train.active - 0.5) * train.speed : -9999;
  return { active, warning, crossing, run };
}

function hitsTrain(racer) {
  const trains = state.track.level.trains || [];
  return trains.some((train, index) => {
    const info = trainState(state.track, train, index);
    if (!info.active) return false;
    const p = projectRacer(racer);
    const nearCrossing = Math.abs(p.progress - info.crossing.progress) < state.track.level.road * 0.55;
    const dx = racer.x - (info.crossing.x + Math.cos(info.crossing.angle + Math.PI / 2) * info.run);
    const dy = racer.y - (info.crossing.y + Math.sin(info.crossing.angle + Math.PI / 2) * info.run);
    return nearCrossing && Math.hypot(dx, dy) < 115;
  });
}

function trainAhead(progress) {
  const trains = state.track.level.trains || [];
  return trains.some((train, index) => {
    const info = trainState(state.track, train, index);
    if (!info.warning) return false;
    const ahead = (info.crossing.progress - progress + state.track.length) % state.track.length;
    return ahead < 210;
  });
}

function fellFromCliff(racer) {
  if (!state.track.level.cliffs) return false;
  const p = projectRacer(racer);
  return p.distance > state.track.level.road / 2 + 78;
}

function isTrackGate(track, progress) {
  const p = ((progress % track.length) + track.length) % track.length;
  return (track.gates || []).some((gate) => {
    const center = gate.at * track.length;
    const half = (gate.size || 0.034) * track.length * 0.5;
    const direct = Math.abs(p - center);
    const wrapped = track.length - direct;
    return Math.min(direct, wrapped) <= half;
  });
}

function constrainToTrackBarriers(racer) {
  if (!state.track || racer.finished) return;
  if (!ensureRacerPose(racer, "barrier")) return;
  const p = projectRacer(racer);
  racer.trackProjection = p;
  const shortcut = projectShortcutRoads(state.track.level, racer.x, racer.y);
  const shortcutLimit = (state.track.level.shortcutRoadWidth || state.track.level.road * 0.78) / 2 - racer.radius * 0.08;
  if (shortcut && shortcut.distance <= shortcutLimit) {
    racer.offTrack = false;
    racer.wallContact = false;
    return;
  }
  const limit = state.track.level.road / 2 - racer.radius * 0.08;
  if (Math.abs(p.side) <= limit) {
    racer.offTrack = false;
    racer.wallContact = false;
    return;
  }

  racer.offTrack = true;
  racer.wallContact = true;
  if (isTrackGate(state.track, p.progress)) {
    racer.speed *= 0.98;
    return;
  }

  const side = Math.sign(p.side || racer.lane || 1);
  const edge = pointAt(state.track, p.progress, side * limit);
  racer.x = edge.x;
  racer.y = edge.y;
  racer.angle = lerpAngle(racer.angle, edge.angle, 0.34);
  racer.speed *= 0.86;
  racer.energy = clamp(racer.energy - 0.06, 0, 100);
}

function preventRacerStall(racer, dt, wantsMove) {
  if (!state.track || racer.finished) return;
  const moved = Math.hypot(racer.x - (racer.prevX ?? racer.x), racer.y - (racer.prevY ?? racer.y));
  const pushing = wantsMove && Math.abs(racer.speed) > 18;
  const p = racer.trackProjection || projectRacer(racer);
  const shortcut = projectShortcutRoads(state.track.level, racer.x, racer.y);
  if (shortcut && shortcut.distance <= (state.track.level.shortcutRoadWidth || state.track.level.road * 0.78) / 2) {
    racer.stuckTimer = 0;
    return;
  }
  if (p.distance > state.track.level.road * 0.58) {
    const lane = clamp(racer.lane || 0, -state.track.level.road * 0.22, state.track.level.road * 0.22);
    moveRacerToTrackProgress(racer, p.progress - 24, true);
    racer.speed = racer.speed >= 0 ? 135 : -95;
    racer.lane = lane;
    racer.stuckTimer = 0;
    return;
  }

  if (pushing && moved < 1.35 && (racer.wallContact || Math.abs(p.side) > state.track.level.road * 0.32)) {
    racer.stuckTimer = (racer.stuckTimer || 0) + dt;
  } else {
    racer.stuckTimer = Math.max(0, (racer.stuckTimer || 0) - dt * 4);
  }

  if ((racer.stuckTimer || 0) > 0.14) {
    const direction = racer.speed >= 0 ? 1 : -1;
    const lane = clamp(racer.lane || -Math.sign(p.side || 1) * state.track.level.road * 0.16, -state.track.level.road * 0.24, state.track.level.road * 0.24);
    const safe = pointAt(state.track, p.progress + direction * 58, lane);
    racer.x = lerp(racer.x, safe.x, 0.82);
    racer.y = lerp(racer.y, safe.y, 0.82);
    racer.angle = lerpAngle(racer.angle, safe.angle, 0.68);
    racer.speed = direction * Math.max(135, Math.abs(racer.speed) * 0.62);
    racer.progress = safe.progress;
    racer.lastProgress = safe.progress;
    racer.lastValidProgress = safe.progress;
    racer.lane = lane;
    racer.stuckTimer = 0;
  }
}

function setupMenu() {
  ensureSelectedLevelForCategory();
  refreshControlLabels();
  if (musicEnabled && !musicEnabled.dataset.ready) {
    musicEnabled.checked = state.musicEnabled;
    musicEnabled.addEventListener("change", () => {
      state.musicEnabled = musicEnabled.checked;
      state.musicPaused = !state.musicEnabled;
      if (state.musicEnabled) {
        if (state.running && !state.paused) playMusic(false);
      } else {
        stopMusic(true);
      }
      updateMusicButton();
    });
    musicEnabled.dataset.ready = "1";
  }

  if (musicChoices && !musicChoices.options.length) {
    musicTracks.forEach((track, i) => {
      const option = document.createElement("option");
      option.value = String(i);
      option.textContent = track.title;
      musicChoices.appendChild(option);
    });
    musicChoices.value = String(state.selectedMusic);
    musicChoices.addEventListener("change", () => {
      state.selectedMusic = clamp(Number(musicChoices.value) || 0, 0, musicTracks.length - 1);
      if (state.running && state.musicEnabled && !state.musicPaused) playMusic(true);
      updateMusicButton();
    });
  }

  [[musicVolume, setMusicVolume], [gameMusicVolume, setMusicVolume], [gameVolume, setGameVolume], [gameSoundVolume, setGameVolume]].forEach(([input, setter]) => {
    if (!input || input.dataset.ready) return;
    input.addEventListener("input", () => setter(input.value));
    input.dataset.ready = "1";
  });
  applyAudioVolumes();
  if (startBtn) startBtn.textContent = currentStartLabel();

  if (vehicleModeChoices) {
    vehicleModeChoices.innerHTML = "";
    vehicleCategories.forEach((category) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `aba mode-choice ${category.id === state.vehicleCategory ? "ativa active" : ""}`;
      btn.innerHTML = `<strong>${category.label}</strong><small>${category.note}</small>`;
      btn.addEventListener("click", () => {
        state.vehicleCategory = category.id;
        state.selectedCar = 0;
        syncOnlineProfile();
        setupMenu();
      });
      vehicleModeChoices.appendChild(btn);
    });
  }

  if (raceModeChoices) {
    raceModeChoices.innerHTML = "";
    const visibleLevelCount = levelIndexesForCategory().length;
    raceModes.forEach((mode) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `choice race-mode-choice ${mode.id === state.raceMode ? "active" : ""}`;
      const label = mode.id === "championship" ? currentChampionshipName() : mode.label;
      const detail = mode.id === "championship" ? `${visibleLevelCount} corridas desta categoria` : mode.note;
      btn.innerHTML = `<strong>${label}</strong><small>${detail}</small>`;
      btn.addEventListener("click", () => {
        state.raceMode = mode.id;
        resetChampionship();
        setupMenu();
      });
      raceModeChoices.appendChild(btn);
    });
  }

  const vehicles = currentVehicles();
  state.selectedCar = clamp(state.selectedCar, 0, vehicles.length - 1);
  carChoices.innerHTML = "";
  vehicles.forEach((car, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `choice vehicle-${car.category} ${i === state.selectedCar ? "active" : ""}`;
    btn.style.setProperty("--car", car.color);
    btn.style.setProperty("--car-dark", car.dark);
    btn.style.setProperty("--car-neon", car.neon);
    btn.style.setProperty("--car-stripe", car.stripe);
    btn.innerHTML = `<div class="vehicle-showcase">${menuVehicleArt(car)}</div><strong>${car.name}</strong><small>${car.note}</small>`;
    btn.addEventListener("click", () => {
      state.selectedCar = i;
      syncOnlineProfile();
      setupMenu();
    });
    carChoices.appendChild(btn);
  });

  if (plusNameChoices) {
    plusNameChoices.classList.toggle("hidden", state.vehicleCategory !== "plus");
    plusNameChoices.innerHTML = "";
    if (state.vehicleCategory === "plus") {
      const title = document.createElement("strong");
      title.className = "plus-name-title";
      title.textContent = "Nomes dos carros Plus";
      plusNameChoices.appendChild(title);
      plusCars.forEach((car, i) => {
        const label = document.createElement("label");
        label.className = "plus-name-field";
        label.style.setProperty("--car", car.color);
        const caption = document.createElement("span");
        caption.textContent = car.name;
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 18;
        input.value = state.plusCarNames[i] || car.name;
        input.setAttribute("aria-label", `Nome do ${car.name}`);
        input.addEventListener("input", () => {
          state.plusCarNames[i] = input.value.trim() || car.name;
        });
        label.appendChild(caption);
        label.appendChild(input);
        plusNameChoices.appendChild(label);
      });
    }
  }

  playerChoices.innerHTML = "";
  [1, 2, 3, 4].forEach((count) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `choice ${count === state.playerCount ? "active" : ""}`;
    const controls = playerControls.slice(0, count).map((p) => p.label).join(" ");
    btn.innerHTML = `<strong>${count} jogador${count > 1 ? "es" : ""}</strong><small>${controls}</small>`;
    btn.addEventListener("click", () => {
      state.playerCount = count;
      setupMenu();
    });
    playerChoices.appendChild(btn);
  });

  controlChoices.innerHTML = "";
  playerControls.slice(0, state.playerCount).forEach((controls, playerIndex) => {
    const card = document.createElement("div");
    card.className = "control-card";
    card.innerHTML = `<strong>${controls.label}</strong>`;
    controlActions.forEach((action) => {
      const btn = document.createElement("button");
      btn.type = "button";
      const waiting = state.binding && state.binding.playerIndex === playerIndex && state.binding.actionId === action.id;
      btn.className = waiting ? "waiting" : "";
      btn.textContent = waiting ? `${action.label}: aperte uma tecla...` : `${action.label}: ${keyLabel(controls[action.id])}`;
      btn.addEventListener("click", () => {
        state.binding = { playerIndex, actionId: action.id };
        setupMenu();
      });
      card.appendChild(btn);
    });
    controlChoices.appendChild(card);
  });

  renderGraphicsChoices();

  levelChoices.innerHTML = "";
  levelIndexesForCategory().forEach((levelIndex) => {
    const level = levels[levelIndex];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `choice ${levelIndex === state.selectedLevel ? "active" : ""}`;
    const hazards = level.hazards ? ` - ${level.hazards.join(" + ")}` : "";
    btn.innerHTML = `<strong>${level.name}</strong><small>${level.difficulty}${hazards}</small>`;
    btn.addEventListener("click", () => {
      state.selectedLevel = levelIndex;
      setupMenu();
    });
    levelChoices.appendChild(btn);
  });
  prepareScrollableMenuList(levelChoices, "Escolher pista do jogo");

  cameraChoices.innerHTML = "";
  cameraModes.forEach((mode, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `choice ${i === cameraMode ? "active" : ""}`;
    btn.innerHTML = `<strong>${mode.label}</strong><small>${mode.note}</small>`;
    btn.addEventListener("click", () => {
      cameraMode = i;
      setupMenu();
      updateCameraButton();
    });
    cameraChoices.appendChild(btn);
  });
  [
    [carChoices, "Escolher veiculo"],
    [raceModeChoices, "Modo de corrida"],
    [playerChoices, "Jogadores locais"],
    [cameraChoices, "Camera do jogo"],
    [controlChoices, "Configurar controles"],
    [graphicsChoices, "Graficos"],
    [onlinePlayers, "Jogadores online"],
  ].forEach(([element, label]) => prepareScrollableMenuList(element, label));
  updateCameraButton();
  updateMusicButton();
  probeMusicAssets();
  updateSystemStatus();
  renderOnlinePlayers();
}

function prepareScrollableMenuList(element, label) {
  if (!element) return;
  element.tabIndex = 0;
  element.setAttribute("aria-label", label);
  if (element.dataset.scrollReady === "1") return;
  element.addEventListener("wheel", (event) => {
    if (element.scrollHeight <= element.clientHeight + 1) return;
    const atTop = element.scrollTop <= 0;
    const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
    const wantsUp = event.deltaY < 0;
    const wantsDown = event.deltaY > 0;
    if ((wantsUp && !atTop) || (wantsDown && !atBottom)) {
      event.stopPropagation();
    }
  }, { passive: true });
  element.dataset.scrollReady = "1";
}

function currentGraphicsMode() {
  return graphicsModes.find((mode) => mode.id === state.graphicsMode) || graphicsModes[0];
}

function renderGraphicsChoices() {
  if (!graphicsChoices) return;
  graphicsChoices.innerHTML = "";
  graphicsModes.forEach((mode) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `choice ${mode.id === state.graphicsMode ? "active" : ""}`;
    btn.innerHTML = `<strong>${mode.label}</strong><small>${mode.note}</small>`;
    btn.addEventListener("click", () => {
      state.graphicsMode = mode.id;
      localStorage.setItem("carfukGraphicsMode", state.graphicsMode);
      applyGraphicsSettings();
      setupMenu();
      resize();
    });
    graphicsChoices.appendChild(btn);
  });

  if (showFpsToggle && !showFpsToggle.dataset.ready) {
    showFpsToggle.addEventListener("change", () => {
      state.showFps = showFpsToggle.checked;
      localStorage.setItem("carfukShowFps", state.showFps ? "1" : "0");
      updateSystemStatus();
    });
    showFpsToggle.dataset.ready = "1";
  }
  if (showFpsToggle) showFpsToggle.checked = state.showFps;

  if (reducedEffectsToggle && !reducedEffectsToggle.dataset.ready) {
    reducedEffectsToggle.addEventListener("change", () => {
      state.reducedEffects = reducedEffectsToggle.checked;
      localStorage.setItem("carfukReducedEffects", state.reducedEffects ? "1" : "0");
      applyGraphicsSettings();
      updateSystemStatus();
    });
    reducedEffectsToggle.dataset.ready = "1";
  }
  if (reducedEffectsToggle) reducedEffectsToggle.checked = state.reducedEffects;
}

function applyGraphicsSettings() {
  document.body.dataset.graphicsMode = state.graphicsMode;
  document.body.classList.toggle("reduced-effects", state.reducedEffects);
  if (state.reducedEffects) state.disableDetailedCarSprites = true;
}

function activatePlusMode() {
  const plusLevel = levels.findIndex((level) => level.name === "DZ Racing Plus 1");
  state.vehicleCategory = "plus";
  state.selectedCar = 0;
  state.selectedLevel = plusLevel >= 0 ? plusLevel : state.selectedLevel;
  state.raceMode = "single";
  resetChampionship();
  setupMenu();
  const vehicleGroup = carChoices?.closest?.(".setup-group");
  const raceGroup = levelChoices?.closest?.(".setup-group");
  if (vehicleGroup) vehicleGroup.open = true;
  if (raceGroup) raceGroup.open = true;
  if (startBtn) startBtn.textContent = currentStartLabel();
  carChoices?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
}

function createPlayer(track, humanIndex) {
  const lanes = [-72, -24, 24, 72];
  const progress = 28 - humanIndex * 58;
  const start = pointAt(track, progress, lanes[humanIndex]);
  const baseName = (pilotName.value || "Piloto").trim().slice(0, 28) || "Piloto";
  const car = createRacerCar(state.selectedCar + humanIndex);
  const displayName = plusRacerName(car, humanIndex === 0 ? baseName : `${baseName} ${humanIndex + 1}`);
  return {
    player: true,
    humanIndex,
    controls: playerControls[humanIndex],
    name: displayName,
    car,
    x: start.x,
    y: start.y,
    angle: start.angle,
    speed: 0,
    radius: car.dynamics?.radius || 15,
    lane: lanes[humanIndex],
    startProgress: progress,
    progress,
    lastProgress: progress,
    total: progress,
    nextCheckpoint: 0,
    checkpointsPassed: 0,
    validProgress: progress,
    lastValidProgress: progress,
    cutWarningTimer: 0,
    lap: 1,
    fuel: 100,
    energy: 100,
    nitro: 1,
    ammo: 8,
    turbo: 0,
    ram: 0,
    stun: 0,
    shield: 0,
    cooldown: 0,
    weaponCooldown: 0,
    hitFlash: 0,
    kills: 0,
    score: 0,
    finished: false,
    finishTime: 0,
  };
}

function createRival(track, i) {
  const lane = [-30, 30, 78, -78, 0][i - 1];
  const start = pointAt(track, 28 - i * 56, lane);
  const car = createRacerCar(i + state.selectedCar);
  return {
    player: false,
    name: plusRacerName(car, `Rival ${i}`),
    car,
    x: start.x,
    y: start.y,
    angle: start.angle,
    speed: 0,
    radius: car.dynamics?.radius || 15,
    lane,
    startProgress: start.progress,
    progress: start.progress,
    lastProgress: start.progress,
    total: start.progress,
    nextCheckpoint: 0,
    checkpointsPassed: 0,
    validProgress: start.progress,
    lastValidProgress: start.progress,
    cutWarningTimer: 0,
    lap: 1,
    skill: 1,
    fuel: 100,
    energy: 100,
    nitro: 0,
    ammo: 7,
    ram: 0,
    stun: 0,
    shield: 0,
    cooldown: 0,
    weaponCooldown: 0.6 + i * 0.12,
    aiFireTimer: 0.7 + i * 0.25,
    hitFlash: 0,
    kills: 0,
    score: 0,
    finished: false,
    finishTime: 0,
  };
}

function generateItems(track) {
  const items = [];
  const types = ["nitro", "turbo", "energy", "ammo", "fuel", "bumper"];
  const count = 7 + Math.min(4, Math.floor(state.selectedLevel / 3));
  for (let i = 0; i < count; i++) {
    const p = pointAt(track, 260 + (track.length / count) * i, [-58, 0, 58][i % 3]);
    items.push({
      type: types[i % types.length],
      x: p.x,
      y: p.y,
      active: false,
      respawn: 7 + i * 6 + Math.random() * 5,
      lifetime: 0,
      pulse: i,
      rare: i % 4 === 1,
    });
  }
  return items;
}

function generateTraffic(track) {
  if (!track.level.traffic) return [];
  const lanes = [-86, -38, 38, 86];
  const colors = ["#d8352c", "#38c46b", "#3aa8ff", "#f0cf43", "#f76b2d"];
  return Array.from({ length: 14 }, (_, i) => ({
    progress: (track.length / 14) * i + 180,
    lane: lanes[i % lanes.length],
    speed: 130 + (i % 4) * 35,
    dir: i % 3 === 0 ? -1 : 1,
    color: colors[i % colors.length],
    wobble: i * 0.7,
  }));
}

function currentCameraMode() {
  return cameraModes[cameraMode] || cameraModes[0];
}

function cameraScale(mode = currentCameraMode()) {
  if (mode.fit) return Math.min(view.w / WORLD.w, view.h / WORLD.h) * 0.98;
  if (view.w < 760 || view.h < 560) return Math.min(mode.scale, mode.mobileScale || mode.scale * 0.82);
  return mode.scale;
}

function cameraBounds(scale = cameraScale(), mode = currentCameraMode()) {
  const scaleY = scale * (mode.tiltY || 1);
  return {
    maxX: Math.max(0, WORLD.w - view.w / scale),
    maxY: Math.max(0, WORLD.h - view.h / scaleY),
  };
}

function updateCamera(dt = 0, snap = false, humans = humanRacers()) {
  if (!state.track) return;
  const mode = currentCameraMode();
  const scale = cameraScale(mode);
  const scaleY = scale * (mode.tiltY || 1);
  state.renderScale = scale;
  const bounds = cameraBounds(scale, mode);
  const focus = cameraFocus(humans, mode);
  const focusX = Number.isFinite(focus.x) ? focus.x : WORLD.w / 2;
  const focusY = Number.isFinite(focus.y) ? focus.y : WORLD.h / 2;
  const targetX = clamp(focusX - view.w / (2 * scale), 0, bounds.maxX);
  const targetY = clamp(focusY - view.h / (2 * scaleY), 0, bounds.maxY);
  if (!Number.isFinite(state.camera.x) || !Number.isFinite(state.camera.y)) {
    state.camera.x = targetX;
    state.camera.y = targetY;
  }
  if (snap) {
    state.camera.x = targetX;
    state.camera.y = targetY;
  } else {
    const amount = clamp((mode.smoothing || 6.5) * dt, 0, 1);
    state.camera.x = lerp(state.camera.x, targetX, amount);
    state.camera.y = lerp(state.camera.y, targetY, amount);
  }
}

function recenterCamera(snap = false) {
  updateCamera(0, snap, humanRacers());
}

function updateCameraButton() {
  if (!cameraBtn) return;
  cameraBtn.textContent = `Camera: ${currentCameraMode().label}`;
}

function cycleCameraMode() {
  cameraMode = (cameraMode + 1) % cameraModes.length;
  recenterCamera(true);
  updateCameraButton();
  if (state.running) showMessage(`Camera: ${currentCameraMode().label}`, 1.35);
}

function startRace(options = {}) {
  const championshipContinue = options.championshipContinue === true;
  const onlineStart = options.onlineStart === true;
  if (!onlineStart) state.online.raceActive = false;
  ensureSelectedLevelForCategory();
  if (state.raceMode === "championship" && !championshipContinue) {
    beginChampionship();
  } else if (state.raceMode !== "championship" && !championshipContinue) {
    resetChampionship();
  }
  if (state.championship.active) {
    const raceLevel = state.championship.tracks[state.championship.currentRace] || 0;
    state.selectedLevel = clamp(raceLevel, 0, levels.length - 1);
  }

  shutdownGameSession({ showMenu: false });
  resumeAudio();
  const track = buildTrack(levels[state.selectedLevel]);
  state.track = track;
  state.racers = [];
  if (onlineStart) state.playerCount = onlinePlayerSlotsCount();
  for (let i = 0; i < state.playerCount; i++) state.racers.push(createPlayer(track, i));
  if (onlineStart) applyOnlineRosterToRace();
  for (let i = state.playerCount; i < 6; i++) state.racers.push(createRival(track, i));
  state.items = generateItems(track);
  state.projectiles = [];
  state.explosions = [];
  state.traffic = generateTraffic(track);
  if (state.championship.active) {
    state.championship.waitingNext = false;
    state.championship.nextTimer = 0;
    state.championship.raceAwarded = false;
    prepareChampionshipRacers();
  }
  state.time = 0;
  state.itemAlertTimer = 0;
  state.last = performance.now();
  state.fps = 0;
  state.fpsFrames = 0;
  state.fpsTimer = 0;
  state.raceResultsOpen = false;
  state.finishWatchAnnounced = false;
  state.lastFinishFlagAt = -999;
  hideRaceResults();
  recenterCamera(true);
  state.running = true;
  state.paused = false;
  state.ended = false;
  state.keys.clear();
  pauseBtn.textContent = "Pausar";
  menu.classList.add("hidden");
  game.classList.remove("hidden");
  resize();
  recenterCamera(true);
  updateCameraButton();
  startEngineSound();
  state.musicPaused = !state.musicEnabled;
  if (state.musicEnabled) playMusic(true);
  else stopMusic(true);
  playSound("start");
  if (state.championship.active) {
    showMessage(`${currentChampionshipName()} ${state.championship.currentRace + 1}/${state.championship.tracks.length}: ${track.level.name}`, 3.4);
  } else {
    showMessage(state.musicEnabled ? `Radio Zákia Stingers: ${(musicTracks[state.selectedMusic] || musicTracks[0]).title}` : "Musica desligada. Sons do jogo ativos.");
  }
  updateChampionshipHud();
  state.rafId = requestAnimationFrame(loop);
}

function showMessage(text, seconds = 3) {
  message.textContent = text;
  message.classList.add("show");
  state.msgTimer = seconds;
}

function resetRacer(racer, penalty = true) {
  const safe = pointAt(state.track, racer.progress - 75, racer.lane || 0);
  moveRacerToTrackProgress(racer, safe.progress, false);
  racer.speed = 0;
  racer.stuckTimer = 0;
  playSound("crash", penalty ? 0.9 : 0.65);
  if (penalty && racer.player) {
    racer.energy = clamp(racer.energy - 14, 0, 100);
    racer.fuel = clamp(racer.fuel - 7, 0, 100);
  }
}

function resetRacerToLapStart(racer) {
  const start = pointAt(state.track, racer.startProgress || 24, racer.lane || 0);
  moveRacerToTrackProgress(racer, start.progress, false);
  racer.speed = 0;
  racer.total = (Math.max(1, racer.lap) - 1) * state.track.length + start.progress;
  resetLapCheckpoints(racer);
  racer.stun = Math.max(racer.stun || 0, 0.85);
  racer.ram = 0;
  racer.turbo = 0;
  racer.shield = 1.2;
  playSound("crash", 0.72);
}

function stealVictimPower(attacker, victim) {
  if (!attacker || attacker === victim || !attacker.car || !victim.car) return;
  const oldWeapon = attacker.car.weapon || weapons[0];
  const stolenWeapon = victim.car.weapon || weapons[0];
  attacker.car.weapon = { ...stolenWeapon };
  attacker.car.neon = victim.car.neon || attacker.car.neon;
  attacker.kills = (attacker.kills || 0) + 1;
  attacker.score = (attacker.score || 0) + 100 + Math.max(0, victim.lap - 1) * 25;
  attacker.weaponCooldown = Math.min(attacker.weaponCooldown || 0, 0.25);
  const delta = weaponPower(stolenWeapon) - weaponPower(oldWeapon);
  const note = delta >= 0 ? "ganhou poder" : "pegou poder mais fraco";
  showMessage(`${racerLabel(attacker)} eliminou ${racerLabel(victim)} e ${note}: ${stolenWeapon.name}!`, 2.4);
}

function createExplosion(x, y, color, size = 1) {
  state.explosions.push({
    x,
    y,
    color,
    age: 0,
    life: 0.42 + size * 0.14,
    size,
  });
}

function racerLabel(racer) {
  return racer.controls ? racer.controls.label : racer.name;
}

function fireWeapon(racer) {
  if (racer.finished || racer.weaponCooldown > 0 || racer.ammo <= 0 || racer.energy < 4) return false;
  const weapon = racer.car.weapon || weapons[0];
  const pellets = weapon.pellets || 1;
  const spread = weapon.spread || 0;
  const baseSpeed = weapon.speed + Math.max(0, racer.speed) * 0.48;
  const center = (pellets - 1) / 2;
  for (let i = 0; i < pellets; i++) {
    const offset = (i - center) * spread;
    const angle = racer.angle + offset;
    state.projectiles.push({
      owner: racer,
      x: racer.x + Math.cos(angle) * 34,
      y: racer.y + Math.sin(angle) * 34,
      vx: Math.cos(angle) * baseSpeed,
      vy: Math.sin(angle) * baseSpeed,
      angle,
      radius: weapon.radius || 6,
      color: weapon.color || racer.car.neon,
      damage: weapon.damage || 16,
      stun: weapon.stun || 0.25,
      life: weapon.life || 0.8,
      maxLife: weapon.life || 0.8,
      trail: [],
    });
  }
  racer.ammo -= 1;
  racer.weaponCooldown = weapon.cooldown || 0.5;
  racer.energy = clamp(racer.energy - (weapon.energyCost || 2), 0, 100);
  playSound("shoot", weapon.pellets > 1 ? 1.08 : 1);
  showMessage(`${racerLabel(racer)}: ${weapon.name}!`, 1.15);
  return true;
}

function targetAhead(racer, range = 430, cone = 0.62) {
  let best = null;
  let bestScore = Infinity;
  for (const other of state.racers) {
    if (other === racer || other.finished) continue;
    const dx = other.x - racer.x;
    const dy = other.y - racer.y;
    const dist = Math.hypot(dx, dy);
    if (dist > range || dist < 25) continue;
    const angle = Math.atan2(dy, dx);
    const diff = Math.abs(angleDiff(angle, racer.angle));
    if (diff > cone) continue;
    const score = dist + diff * 180;
    if (score < bestScore) {
      best = other;
      bestScore = score;
    }
  }
  return best;
}

function updateProjectiles(dt) {
  for (const shot of state.projectiles) {
    shot.life -= dt;
    shot.trail.push({ x: shot.x, y: shot.y });
    if (shot.trail.length > 5) shot.trail.shift();
    shot.x += shot.vx * dt;
    shot.y += shot.vy * dt;

    if (shot.x < 0 || shot.y < 0 || shot.x > WORLD.w || shot.y > WORLD.h) shot.life = 0;
    if (shot.life <= 0) continue;

    for (const target of state.racers) {
      if (target === shot.owner || target.finished) continue;
      const hitRange = target.radius + shot.radius + 14 + (target.shield > 0 ? 8 : 0);
      if (Math.hypot(target.x - shot.x, target.y - shot.y) > hitRange) continue;
      const blocked = target.shield > 0;
      const damage = blocked ? shot.damage * 0.35 : shot.damage;
      target.energy = clamp(target.energy - damage, 0, 100);
      target.stun = Math.max(target.stun || 0, blocked ? shot.stun * 0.35 : shot.stun);
      target.speed *= blocked ? 0.78 : 0.52;
      target.hitFlash = 0.34;
      shot.life = 0;
      createExplosion(shot.x, shot.y, shot.color, blocked ? 0.72 : 1);
      playSound(blocked ? "shield" : "hit", blocked ? 0.8 : 1);
      if (target.energy <= 0) {
        const attacker = shot.owner;
        stealVictimPower(attacker, target);
        target.energy = 70;
        target.fuel = clamp(target.fuel + 18, 0, 100);
        target.ammo = clamp(Math.max(target.ammo || 0, 4), 0, 14);
        resetRacerToLapStart(target);
      }
      break;
    }
  }
  state.projectiles = state.projectiles.filter((shot) => shot.life > 0);
}

function updateExplosions(dt) {
  for (const boom of state.explosions) boom.age += dt;
  state.explosions = state.explosions.filter((boom) => boom.age < boom.life);
}

function updatePlayer(racer, dt) {
  if (racer.finished) return;
  racer.prevX = racer.x;
  racer.prevY = racer.y;
  if (racer.stun > 0) {
    racer.stun = Math.max(0, racer.stun - dt);
    racer.speed *= Math.pow(0.28, dt);
    racer.angle += Math.sin(state.time * 24) * dt * 1.8;
    racer.x += Math.cos(racer.angle) * racer.speed * dt;
    racer.y += Math.sin(racer.angle) * racer.speed * dt;
    constrainToTrackBarriers(racer);
    preventRacerStall(racer, dt, true);
    return;
  }
  const input = racerInputState(racer);
  const up = Boolean(input.up);
  const down = Boolean(input.down);
  const left = Boolean(input.left);
  const right = Boolean(input.right);
  const action = Boolean(input.action);
  const fire = Boolean(input.fire);
  const dynamics = racer.car.dynamics || {};
  const boost = racer.turbo > 0 ? 1.54 : 1;
  const maxSpeed = (racer.fuel <= 0 ? 260 : 620) * boost * (dynamics.maxSpeed || 1);

  if (fire) fireWeapon(racer);

  if (up) racer.speed += (racer.fuel <= 0 ? 270 : 720) * (dynamics.accel || 1) * dt;
  if (down) racer.speed -= (racer.speed > 20 ? 720 : 390) * (dynamics.reverse || 1) * dt;
  if (!up && !down) racer.speed *= Math.pow(0.34, dt);
  racer.speed = clamp(racer.speed, -185, maxSpeed);

  if (action && racer.cooldown <= 0) {
    if (racer.nitro > 0) {
      racer.nitro -= 1;
      racer.turbo = Math.max(racer.turbo, 2.8);
      racer.ram = Math.max(racer.ram, 1.45);
      racer.cooldown = 0.72;
      playSound("nitro", 1.1);
      showMessage(`${racer.controls.label}: nitro + investida!`);
    } else if (racer.energy > 12) {
      racer.energy = clamp(racer.energy - 8, 0, 100);
      racer.ram = Math.max(racer.ram, 0.62);
      racer.cooldown = 0.72;
      playSound("shield", 0.65);
      showMessage(`${racer.controls.label}: batida lateral pronta!`);
    }
  }

  const steer = clamp(Math.abs(racer.speed) / 300, 0.5, 1);
  const turnRate = (3.95 * steer + 0.65) * (dynamics.turn || 1);
  if (left) racer.angle -= turnRate * dt * Math.sign(racer.speed || 1);
  if (right) racer.angle += turnRate * dt * Math.sign(racer.speed || 1);

  racer.x += Math.cos(racer.angle) * racer.speed * dt;
  racer.y += Math.sin(racer.angle) * racer.speed * dt;
  constrainToTrackBarriers(racer);
  preventRacerStall(racer, dt, up || down);

  const p = projectRacer(racer);
  if (p.distance > state.track.level.road / 2 + 12 && isTrackGate(state.track, p.progress)) {
    racer.speed *= Math.pow(0.48, dt);
    racer.energy = clamp(racer.energy - 3.6 * dt, 0, 100);
  }
  if (isBridgeOpen(state.track, p.progress) && p.distance < state.track.level.road / 2.1) {
    showMessage("Ponte aberta! Espere ela fechar para atravessar.");
    resetRacer(racer);
  }
  if (hitsTrain(racer)) {
    showMessage("Trem passando! Pare na cancela e espere o trilho liberar.");
    resetRacer(racer);
  }
  if (fellFromCliff(racer)) {
    showMessage("Cuidado com o morro! Voce caiu e voltou para a pista.");
    resetRacer(racer);
  }

  racer.fuel = clamp(racer.fuel - Math.abs(racer.speed) * 0.0024 * dt, 0, 100);
  if (racer.energy <= 0) {
    racer.energy = 45;
    showMessage("Energia zerou. Voltando para a pista.");
    resetRacer(racer, false);
  }
}

function updateRival(racer, dt) {
  if (racer.finished) return;
  racer.prevX = racer.x;
  racer.prevY = racer.y;
  if (racer.stun > 0) {
    racer.stun = Math.max(0, racer.stun - dt);
    racer.speed *= Math.pow(0.32, dt);
    racer.angle += Math.sin(state.time * 20) * dt * 1.6;
    racer.x += Math.cos(racer.angle) * racer.speed * dt;
    racer.y += Math.sin(racer.angle) * racer.speed * dt;
    constrainToTrackBarriers(racer);
    preventRacerStall(racer, dt, true);
    return;
  }
  const here = projectRacer(racer);
  const mustWait = isBridgeOpen(state.track, here.progress + 70) || trainAhead(here.progress);
  const target = pointAt(state.track, here.progress + 185, racer.lane);
  const wantedAngle = Math.atan2(target.y - racer.y, target.x - racer.x);
  racer.angle += angleDiff(wantedAngle, racer.angle) * clamp(3.8 * dt, 0, 1);
  const dynamics = racer.car.dynamics || {};
  const targetSpeed = mustWait ? 30 : clamp(465 * racer.skill * (dynamics.aiSpeed || dynamics.maxSpeed || 1), 365, 540);
  racer.speed += (targetSpeed - racer.speed) * clamp(3.05 * dt, 0, 1);
  racer.aiFireTimer = Math.max(0, (racer.aiFireTimer || 0) - dt);
  const prey = targetAhead(racer, 520, 0.74);
  if (!mustWait && prey && racer.aiFireTimer <= 0) {
    fireWeapon(racer);
    racer.aiFireTimer = 0.75 + Math.random() * 1.4;
  }
  racer.x += Math.cos(racer.angle) * racer.speed * dt;
  racer.y += Math.sin(racer.angle) * racer.speed * dt;
  constrainToTrackBarriers(racer);
  preventRacerStall(racer, dt, true);
  const after = projectRacer(racer);
  if ((after.distance > state.track.level.road * 0.55 && isTrackGate(state.track, after.progress)) || isBridgeOpen(state.track, after.progress) || hitsTrain(racer) || fellFromCliff(racer)) {
    const safe = pointAt(state.track, after.progress - 45, racer.lane);
    racer.x = lerp(racer.x, safe.x, 0.16);
    racer.y = lerp(racer.y, safe.y, 0.16);
    racer.speed *= 0.55;
  }
  if (racer.energy <= 0) {
    racer.energy = 45;
    resetRacer(racer, false);
  }
}

function updateProgress(racer) {
  const p = projectRacer(racer, 780);
  racer.lastProgress = racer.progress;
  racer.progress = p.progress;

  const length = state.track.length;
  let progressDelta = racer.progress - racer.lastProgress;
  if (progressDelta < -length / 2) progressDelta += length;
  if (progressDelta > length / 2) progressDelta -= length;
  const suspiciousJump = !state.track.level.allowProgressCuts && (progressDelta > Math.max(650, length * 0.18) || progressDelta < -260);
  racer.cutWarningTimer = Math.max(0, (racer.cutWarningTimer || 0) - 0.04);

  if (!racer.finished && suspiciousJump && state.time > 2) {
    if (racer.player && racer.cutWarningTimer <= 0) {
      showMessage("Corte de pista bloqueado! Siga o tracado e passe pelos checkpoints.", 2.2);
      racer.cutWarningTimer = 2.5;
    }
    resetRacerToValidProgress(racer);
    return;
  }

  const checkpoints = state.track.checkpoints || [];
  if (!racer.finished && racer.nextCheckpoint < checkpoints.length && crossedProgress(racer.lastProgress, racer.progress, checkpoints[racer.nextCheckpoint], length)) {
    racer.checkpointsPassed += 1;
    racer.nextCheckpoint += 1;
    racer.lastValidProgress = checkpoints[racer.nextCheckpoint - 1];
  }

  if (!racer.finished && racer.lastProgress > length * 0.82 && racer.progress < length * 0.18) {
    if ((racer.checkpointsPassed || 0) >= checkpoints.length) {
      racer.lap += 1;
      resetLapCheckpoints(racer);
      if (racer.player && racer.lap <= LAPS) {
        playSound("lap");
        showMessage(`Volta ${racer.lap}/${LAPS}`);
      }
      if (racer.lap > LAPS) {
        racer.finished = true;
        racer.finishTime = state.time;
        racer.total = LAPS * length + length;
        finishRace(racer);
      }
    } else if (racer.player && state.time > 4 && racer.cutWarningTimer <= 0) {
      showMessage("Volta nao contou: passe por todos os checkpoints da pista.", 2.2);
      racer.cutWarningTimer = 2.5;
    }
  }
  if (!racer.finished) racer.total = (racer.lap - 1) * length + racer.progress;
}

function finishRace(racer) {
  const place = rankings().indexOf(racer) + 1;
  const allFinished = state.racers.length > 0 && state.racers.every((entry) => entry.finished);
  const humanLabel = racer.player ? racer.controls.label : "Rival";
  const racerLabel = racer.player ? `${humanLabel} ${racer.name}`.trim() : racer.name;
  const keepWatching = !allFinished && state.racers.some((entry) => !entry.finished);
  state.lastFinishFlagAt = state.time;

  if (racer.player) {
    showMessage(
      place === 1
        ? `${racerLabel} venceu! A corrida continua para ver todos chegarem.`
        : `${racerLabel} terminou em ${ordinal(place)}. Continue vendo o final da prova.`,
      6
    );
    playSound("lap", place === 1 ? 1.2 : 0.9);
  } else if (place <= 3 || allFinished) {
    showMessage(`${racerLabel} chegou em ${ordinal(place)}.`, 3.2);
    playSound("lap", place === 1 ? 1.04 : 0.78);
  }

  if (keepWatching && humanRacers().every((entry) => entry.finished) && !state.finishWatchAnnounced) {
    state.finishWatchAnnounced = true;
    if (!racer.player) showMessage("Agora e a chegada final: os rivais continuam ate cruzar a linha!", 4.5);
  }

  if (allFinished) completeRaceFinal();
}

function completeRaceFinal() {
  if (state.ended) return;
  state.ended = true;
  if (audio.engineGain && audio.ctx) audio.engineGain.gain.setTargetAtTime(0, audio.ctx.currentTime, 0.18);
  completeChampionshipRace();
  showRaceResults();
}

function humanRacers() {
  return state.racers.filter((racer) => racer.player);
}

function cameraFocus(humans, mode = currentCameraMode()) {
  const validHumans = humans.filter(hasValidRacerPose);
  const validRacers = state.racers.filter(hasValidRacerPose);
  const active = validHumans.filter((racer) => !racer.finished);
  const activeRacers = validRacers.filter((racer) => !racer.finished);
  const group = active.length ? active : activeRacers.length ? activeRacers : validHumans.length ? validHumans : validRacers;
  if (!group.length) return { x: WORLD.w / 2, y: WORLD.h / 2 };
  const ranked = rankings().filter(hasValidRacerPose);
  const lead = active.length
    ? ranked.find((racer) => racer.player && !racer.finished) || group[0]
    : ranked.find((racer) => !racer.finished) || ranked[0] || group[0];
  const center = group.reduce((acc, racer) => {
    acc.x += racer.x;
    acc.y += racer.y;
    return acc;
  }, { x: 0, y: 0 });
  center.x /= group.length;
  center.y /= group.length;
  const focus = {
    x: lerp(center.x, lead.x, mode.leadBias ?? 0.38),
    y: lerp(center.y, lead.y, mode.leadBias ?? 0.38),
  };
  const speedLead = clamp((lead.speed || 0) / 420, -0.35, 1) * (mode.lookAhead || 0);
  focus.x += Math.cos(lead.angle) * speedLead;
  focus.y += Math.sin(lead.angle) * speedLead;
  if (mode.sideOffset) {
    focus.x += Math.cos(lead.angle + Math.PI / 2) * mode.sideOffset;
    focus.y += Math.sin(lead.angle + Math.PI / 2) * mode.sideOffset;
  }
  return focus;
}

function updateItemSpawns(dt) {
  const activeLimit = state.time < 8 ? 0 : state.time > 90 ? 3 : 2;
  let activeCount = state.items.filter((item) => item.active).length;
  state.itemAlertTimer = Math.max(0, state.itemAlertTimer - dt);

  for (const item of state.items) {
    item.pulse += dt * (item.active ? 4 : 1.6);
    if (item.active) {
      item.lifetime -= dt;
      if (item.lifetime <= 0) {
        item.active = false;
        item.respawn = 25 + Math.random() * 22;
        activeCount -= 1;
      }
      continue;
    }
    item.respawn -= dt;
    if (item.respawn <= 0 && activeCount < activeLimit) {
      item.active = true;
      item.lifetime = item.rare ? 10 : 14;
      item.pulse = 0;
      activeCount += 1;
      if (state.itemAlertTimer <= 0) {
        showMessage(item.rare ? "Item raro apareceu! Dispute antes que suma." : "Item apareceu na pista!", 1.8);
        state.itemAlertTimer = 8;
      }
    }
  }
}

function updateItems(racer, dt) {
  for (const item of state.items) {
    if (!item.active) continue;
    item.pulse += dt * 0.8;
    if (Math.hypot(racer.x - item.x, racer.y - item.y) < 44) {
      item.active = false;
      item.respawn = 42 + Math.random() * 28;
      item.lifetime = 0;
      if (item.type === "nitro") {
        racer.nitro = clamp(racer.nitro + 1, 0, 4);
        playSound("pickup", 1.05);
        showMessage("Nitro coletado!");
      }
      if (item.type === "turbo") {
        racer.turbo = 3.2;
        playSound("nitro", 0.85);
        showMessage("Turbo automatico!");
      }
      if (item.type === "fuel") {
        racer.fuel = clamp(racer.fuel + 34, 0, 100);
        playSound("pickup", 0.9);
        showMessage("Gasolina extra!");
      }
      if (item.type === "energy") {
        racer.energy = clamp(racer.energy + 30, 0, 100);
        racer.shield = 4;
        playSound("shield", 0.85);
        showMessage("Energia extra!");
      }
      if (item.type === "bumper") {
        racer.ram = 1.6;
        racer.cooldown = 0.15;
        playSound("pickup", 1.15);
        showMessage(`${racerLabel(racer)}: super batida liberada!`);
      }
      if (item.type === "ammo") {
        racer.ammo = clamp(racer.ammo + 5, 0, 14);
        playSound("pickup", 0.95);
        showMessage(`${racerLabel(racer)}: municao coletada!`);
      }
    }
  }
}

function updateTraffic(dt) {
  for (const car of state.traffic) {
    car.progress = (car.progress + car.speed * car.dir * dt + state.track.length) % state.track.length;
    car.wobble += dt * 4;
  }
}

function collideTraffic() {
  if (!state.traffic.length) return;
  for (const racer of state.racers) {
    if (racer.finished) continue;
    for (const traffic of state.traffic) {
      const p = pointAt(state.track, traffic.progress, traffic.lane + Math.sin(traffic.wobble) * 4);
      const d = Math.hypot(racer.x - p.x, racer.y - p.y);
      if (d < racer.radius + 16) {
        racer.energy = clamp(racer.energy - 12, 0, 100);
        racer.stun = Math.max(racer.stun || 0, 0.55);
        racer.speed *= -0.35;
        racer.x += Math.cos(p.angle + Math.PI / 2) * 28 * Math.sign(racer.lane || 1);
        racer.y += Math.sin(p.angle + Math.PI / 2) * 28 * Math.sign(racer.lane || 1);
        if (state.time - audio.lastImpact > 0.2) {
          audio.lastImpact = state.time;
          playSound("crash", 0.75);
        }
        showMessage("Transito na pista! Desvie como nos classicos.");
      }
    }
  }
}

function applyOilHazards(dt) {
  if (!state.track.level.oil) return;
  for (const racer of state.racers) {
    const p = projectRacer(racer);
    const laneMark = Math.sin((p.progress / state.track.length) * TAU * 9 + state.time * 0.4);
    const nearOil = laneMark > 0.88 && Math.abs(p.side) < state.track.level.road * 0.38;
    if (nearOil) {
      racer.angle += Math.sin(state.time * 18 + racer.progress) * dt * 3.8;
      racer.speed *= Math.pow(0.84, dt);
      if (racer.player) showMessage("Oleo na pista! Segure a direcao.");
    }
  }
}

function applyMudHazards(dt) {
  if (!state.track.level.mud) return;
  for (const racer of state.racers) {
    const p = projectRacer(racer);
    const mudWave = Math.sin((p.progress / state.track.length) * TAU * 7.5 + p.side * 0.018);
    const nearMud = mudWave > 0.55 && Math.abs(p.side) < state.track.level.road * 0.45;
    if (nearMud) {
      racer.speed *= Math.pow(0.42, dt);
      racer.angle += Math.sin(state.time * 8 + racer.progress * 0.02) * dt * 1.2;
      if (racer.player) showMessage("Barro pesado! Acelere com calma para nao rodar.");
    }
  }
}

function collideCars(dt) {
  for (let i = 0; i < state.racers.length; i++) {
    for (let j = i + 1; j < state.racers.length; j++) {
      const a = state.racers[i];
      const b = state.racers[j];
      if (a.finished || b.finished) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.hypot(dx, dy);
      const min = a.radius + b.radius;
      if (d < min) {
        const fallbackAngle = ((i + 1) * 1.7 + (j + 1) * 0.9) % TAU;
        const nx = d > 0.001 ? dx / d : Math.cos(fallbackAngle);
        const ny = d > 0.001 ? dy / d : Math.sin(fallbackAngle);
        const push = (min - d) * 0.5;
        const aRam = a.ram || 0;
        const bRam = b.ram || 0;
        const aForce = 1 + aRam * 2.4 + Math.max(0, a.speed) / 280;
        const bForce = 1 + bRam * 2.4 + Math.max(0, b.speed) / 280;
        const totalForce = aForce + bForce;
        a.x -= nx * push * (bForce / totalForce) * 2.2;
        a.y -= ny * push * (bForce / totalForce) * 2.2;
        b.x += nx * push * (aForce / totalForce) * 2.2;
        b.y += ny * push * (aForce / totalForce) * 2.2;
        const hit = Math.abs(a.speed - b.speed);
        const launch = clamp((hit + aRam * 260 + bRam * 260) / 230, 0.35, 1.9);
        a.speed = a.speed * 0.8 - bRam * 72;
        b.speed = b.speed * 0.8 - aRam * 72;
        a.x -= nx * launch * 13 * bForce;
        a.y -= ny * launch * 13 * bForce;
        b.x += nx * launch * 13 * aForce;
        b.y += ny * launch * 13 * aForce;
        if (a.shield <= 0) a.energy = clamp(a.energy - hit * 0.018 - bRam * 12 - 2 * dt, 0, 100);
        if (b.shield <= 0) b.energy = clamp(b.energy - hit * 0.018 - aRam * 12 - 2 * dt, 0, 100);
        if (hit > 38 && state.time - audio.lastImpact > 0.16) {
          audio.lastImpact = state.time;
          playSound(aRam > 0.4 || bRam > 0.4 ? "hit" : "crash", clamp(hit / 180, 0.55, 1.25));
        }
        if (aRam > 0.4 || bRam > 0.4) {
          const attacker = aRam > bRam ? a : b;
          const victim = aRam > bRam ? b : a;
          victim.stun = Math.max(victim.stun || 0, 0.45 + Math.max(aRam, bRam) * 0.35);
          showMessage(`${attacker.name} acertou ${victim.name}!`);
        }
        constrainToTrackBarriers(a);
        constrainToTrackBarriers(b);
      }
    }
  }
}

function resolveCrowdStalls(dt) {
  if (!state.track || state.racers.length < 3) return;
  const road = state.track.level.road;
  for (let i = 0; i < state.racers.length; i++) {
    const racer = state.racers[i];
    if (racer.finished) continue;
    let nearby = 0;
    for (let j = 0; j < state.racers.length; j++) {
      if (i === j || state.racers[j].finished) continue;
      if (Math.hypot(racer.x - state.racers[j].x, racer.y - state.racers[j].y) < racer.radius + state.racers[j].radius + 34) nearby += 1;
    }
    const blocked = nearby >= 2 && Math.abs(racer.speed) < 105;
    racer.crowdTimer = blocked ? (racer.crowdTimer || 0) + dt : Math.max(0, (racer.crowdTimer || 0) - dt * 2.2);
    if (racer.crowdTimer <= 0.48) continue;

    const p = projectRacer(racer);
    const laneOptions = [-0.24, 0.24, -0.1, 0.1, 0];
    const lane = laneOptions[i % laneOptions.length] * road;
    const safe = pointAt(state.track, p.progress + 64 + (i % 3) * 18, lane);
    racer.x = lerp(racer.x, safe.x, 0.78);
    racer.y = lerp(racer.y, safe.y, 0.78);
    racer.angle = lerpAngle(racer.angle, safe.angle, 0.7);
    racer.progress = safe.progress;
    racer.lastProgress = safe.progress;
    racer.lastValidProgress = safe.progress;
    racer.lane = lane;
    racer.speed = Math.max(145, Math.abs(racer.speed)) * (racer.speed < 0 ? -0.6 : 1);
    racer.crowdTimer = 0;
  }
}

function rankings() {
  return [...state.racers].sort((a, b) => {
    if (a.finished && b.finished) return a.finishTime - b.finishTime;
    if (a.finished) return -1;
    if (b.finished) return 1;
    return b.total - a.total;
  });
}

function createEmptyChampionship() {
  return {
    active: false,
    completed: false,
    tracks: [],
    currentRace: 0,
    standings: {},
    raceResults: [],
    waitingNext: false,
    nextTimer: 0,
    raceAwarded: false,
  };
}

function resetChampionship() {
  state.championship = createEmptyChampionship();
  updateChampionshipHud();
}

function beginChampionship() {
  state.championship = createEmptyChampionship();
  state.championship.active = true;
  state.championship.tracks = levelIndexesForCategory();
  state.championship.currentRace = 0;
  state.selectedLevel = state.championship.tracks[0] || 0;
}

function championshipRacerKey(racer) {
  if (racer.player) return `player-${racer.humanIndex}`;
  return `rival-${racer.name}`;
}

function championshipRacerName(racer) {
  if (racer.player) return `${racer.controls.label} ${racer.name}`.trim();
  return racer.name;
}

function ensureChampionshipEntry(racer) {
  if (!state.championship.active) return null;
  const key = championshipRacerKey(racer);
  if (!state.championship.standings[key]) {
    state.championship.standings[key] = {
      key,
      name: championshipRacerName(racer),
      color: racer.car?.color || "#48d8ff",
      player: Boolean(racer.player),
      points: 0,
      wins: 0,
      podiums: 0,
      kills: 0,
      score: 0,
      best: 99,
      lastPlace: 0,
    };
  } else {
    state.championship.standings[key].name = championshipRacerName(racer);
    state.championship.standings[key].color = racer.car?.color || state.championship.standings[key].color;
  }
  return state.championship.standings[key];
}

function prepareChampionshipRacers() {
  if (!state.championship.active) return;
  state.racers.forEach(ensureChampionshipEntry);
  updateChampionshipHud();
}

function championshipStandings() {
  if (!state.championship.active) return [];
  return Object.values(state.championship.standings).sort((a, b) => (
    b.points - a.points ||
    b.wins - a.wins ||
    b.podiums - a.podiums ||
    a.best - b.best ||
    b.score - a.score ||
    a.name.localeCompare(b.name)
  ));
}

function championshipEntryForRacer(racer) {
  if (!state.championship.active) return null;
  return state.championship.standings[championshipRacerKey(racer)] || null;
}

function completeChampionshipRace() {
  const championship = state.championship;
  if (!championship.active || championship.raceAwarded) return;
  championship.raceAwarded = true;
  const results = rankings();
  const raceSummary = {
    level: state.track?.level?.name || "Pista",
    results: [],
  };

  results.forEach((racer, index) => {
    const entry = ensureChampionshipEntry(racer);
    const place = index + 1;
    const points = championshipPoints[index] || 1;
    entry.points += points;
    entry.wins += place === 1 ? 1 : 0;
    entry.podiums += place <= 3 ? 1 : 0;
    entry.kills += racer.kills || 0;
    entry.score += racer.score || 0;
    entry.best = Math.min(entry.best, place);
    entry.lastPlace = place;
    raceSummary.results.push({
      name: entry.name,
      place,
      points,
      time: racer.finished ? racer.finishTime : state.time,
    });
  });

  championship.raceResults.push(raceSummary);
  const leader = championshipStandings()[0];
  const finishedChampionship = championship.currentRace >= championship.tracks.length - 1;

  if (finishedChampionship) {
    championship.completed = true;
    championship.waitingNext = false;
    championship.nextTimer = 0;
    showMessage(`${currentChampionshipName()}: campeao ${leader?.name || "Piloto"} com ${leader?.points || 0} pontos!`, 9);
    playSound("lap", 1.25);
  } else {
    championship.waitingNext = true;
    championship.nextTimer = 0;
    const nextIndex = championship.tracks[championship.currentRace + 1];
    const nextLevel = levels[nextIndex] || levels[0];
    showMessage(`Fim da etapa! Lider: ${leader?.name || "Piloto"} (${leader?.points || 0} pts). Escolha continuar para ${nextLevel.name}.`, 7);
  }
  updateChampionshipHud();
}

function updateChampionshipTransition(dt) {
  const championship = state.championship;
  if (!championship.active || !championship.waitingNext || championship.completed) return;
  updateChampionshipHud();
}

function htmlSafe(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));
}

function updateChampionshipHud() {
  if (!championshipHud) return;
  const championship = state.championship;
  if (!championship.active) {
    championshipHud.classList.add("hidden");
    championshipHud.innerHTML = "";
    return;
  }
  const total = Math.max(1, championship.tracks.length);
  const round = Math.min(championship.currentRace + 1, total);
  const standings = championshipStandings();
  const nextText = championship.waitingNext
    ? `<span class="champ-next">Aguardando continuar</span>`
    : championship.completed
      ? `<span class="champ-next">Campeonato finalizado</span>`
      : "";
  championshipHud.classList.remove("hidden");
  championshipHud.innerHTML = `
    <div class="champ-title">
      <strong>${htmlSafe(currentChampionshipName())}</strong>
      <span>Etapa ${round}/${total}</span>
    </div>
    ${nextText}
    <ol>
      ${standings.slice(0, 6).map((entry, index) => `
        <li style="--champ-color:${entry.color}">
          <b>${index + 1}.</b>
          <span>${htmlSafe(entry.name)}</span>
          <strong>${entry.points} pts</strong>
        </li>
      `).join("")}
    </ol>
  `;
}

function hideRaceResults() {
  state.raceResultsOpen = false;
  if (!championshipResults) return;
  championshipResults.classList.add("hidden");
  championshipResults.innerHTML = "";
}

function showRaceResults() {
  if (!championshipResults || !state.track) return;
  state.raceResultsOpen = true;
  const results = rankings();
  const winner = results[0];
  const championship = state.championship;
  const isChampionship = championship.active;
  const totalRaces = Math.max(1, championship.tracks.length || 1);
  const currentRace = Math.min(championship.currentRace + 1, totalRaces);
  const nextIndex = isChampionship ? championship.tracks[championship.currentRace + 1] : null;
  const nextLevel = Number.isFinite(nextIndex) ? levels[nextIndex] : null;
  const primaryLabel = isChampionship
    ? championship.completed
      ? "Novo campeonato"
      : "Continuar campeonato"
    : "Correr novamente";
  const subtitle = isChampionship
    ? championship.completed
      ? "Campeonato finalizado"
      : `Etapa ${currentRace}/${totalRaces} concluida`
    : "Corrida finalizada";
  const champRows = isChampionship ? championshipStandings().slice(0, 6) : [];

  championshipResults.classList.remove("hidden");
  championshipResults.innerHTML = `
    <div class="race-results-card">
      <div class="race-results-header">
        <span>${htmlSafe(subtitle)}</span>
        <strong>${htmlSafe(state.track.level.name)}</strong>
        <em>Vencedor: ${htmlSafe(winner?.name || "Piloto")} - ${formatTime(winner?.finishTime || state.time)}</em>
      </div>

      <div class="race-results-grid">
        <section>
          <h2>Chegada da corrida</h2>
          <ol class="race-result-list">
            ${results.map((racer, index) => `
              <li style="--result-color:${racer.car?.color || "#48d8ff"}">
                <b>${index + 1}.</b>
                <span>${htmlSafe(racer.player ? `${racer.controls.label} ${racer.name}` : racer.name)}</span>
                <strong>${formatTime(racer.finishTime || state.time)}</strong>
              </li>
            `).join("")}
          </ol>
        </section>

        ${isChampionship ? `
          <section>
            <h2>Classificacao DZ</h2>
            <ol class="race-result-list championship">
              ${champRows.map((entry, index) => `
                <li style="--result-color:${entry.color}">
                  <b>${index + 1}.</b>
                  <span>${htmlSafe(entry.name)}</span>
                  <strong>${entry.points} pts</strong>
                </li>
              `).join("")}
            </ol>
          </section>
        ` : ""}
      </div>

      ${nextLevel && !championship.completed ? `<p class="race-next-track">Proxima pista: <b>${htmlSafe(nextLevel.name)}</b></p>` : ""}

      <div class="race-results-actions">
        <button type="button" data-race-result-action="continue">${primaryLabel}</button>
        <button type="button" data-race-result-action="menu">Menu</button>
      </div>
    </div>
  `;
}

function continueAfterRace() {
  hideRaceResults();
  if (state.championship.active) {
    if (state.championship.completed) {
      state.raceMode = "championship";
      beginChampionship();
      startRace({ championshipContinue: true });
      return;
    }
    if (state.championship.waitingNext) {
      state.championship.currentRace += 1;
      state.championship.waitingNext = false;
      startRace({ championshipContinue: true });
      return;
    }
  }
  startRace();
}

function returnToMenuAfterRace() {
  hideRaceResults();
  resetChampionship();
  shutdownGameSession({ showMenu: true });
}

function update(dt) {
  if (!state.running || state.paused) return;
  state.time += dt;
  const humans = humanRacers();
  if (state.online.raceActive && state.online.role === "client") {
    updateOnlineClientRace(dt);
    return;
  }
  if (state.ended) {
    updateChampionshipTransition(dt);
    if (state.msgTimer > 0) {
      state.msgTimer -= dt;
      if (state.msgTimer <= 0) message.classList.remove("show");
    }
    updateCamera(dt, false, humans);
    updateEngineSound();
    updateHud();
    return;
  }
  for (const racer of state.racers) ensureRacerPose(racer, "pre-update");
  for (const racer of state.racers) {
    racer.weaponCooldown = Math.max(0, (racer.weaponCooldown || 0) - dt);
    racer.hitFlash = Math.max(0, (racer.hitFlash || 0) - dt);
  }
  for (const player of humans) {
    player.cooldown = Math.max(0, player.cooldown - dt);
    player.turbo = Math.max(0, player.turbo - dt);
    player.ram = Math.max(0, player.ram - dt);
    player.shield = Math.max(0, player.shield - dt);
    updatePlayer(player, dt);
  }
  for (const rival of state.racers.filter((racer) => !racer.player)) updateRival(rival, dt);
  updateTraffic(dt);
  updateProjectiles(dt);
  updateExplosions(dt);
  for (const racer of state.racers) updateProgress(racer);
  updateItemSpawns(dt);
  for (const racer of state.racers) updateItems(racer, dt);
  applyOilHazards(dt);
  applyMudHazards(dt);
  collideTraffic();
  collideCars(dt);
  resolveCrowdStalls(dt);
  for (const racer of state.racers) ensureRacerPose(racer, "post-physics");

  if (state.msgTimer > 0) {
    state.msgTimer -= dt;
    if (state.msgTimer <= 0) message.classList.remove("show");
  }

  updateCamera(dt, false, humans);
  updateEngineSound();
  updateHud();
  sendOnlineSnapshot();
}

function updateHud() {
  const humans = humanRacers();
  const player = rankings().find((racer) => racer.player) || humans[0] || state.racers[0];
  const place = rankings().indexOf(player) + 1;
  lapHud.textContent = `${clamp(player.lap, 1, LAPS)}/${LAPS}`;
  timeHud.textContent = formatTime(player.finished ? player.finishTime : state.time);
  positionHud.textContent = ordinal(place);
  levelHud.textContent = state.track.level.name;
  fuelHud.textContent = `${Math.round(player.fuel)}%`;
  energyHud.textContent = `${Math.round(player.energy)}%`;
  fuelHud.style.color = player.fuel < 24 ? "var(--red)" : "var(--ink)";
  energyHud.style.color = player.energy < 28 ? "var(--red)" : "var(--ink)";
  powerHud.innerHTML = humans.map((racer) => {
    const champ = championshipEntryForRacer(racer);
    const champText = champ ? `<span>CP ${champ.points}</span>` : "";
    return `<div class="pill"><b>${racer.controls.label}</b><span>N${racer.nitro}</span><span>M${racer.ammo}</span><span>KO${racer.kills || 0}</span>${champText}</div>`;
  }).join("");
  playerHud.innerHTML = humans.map((racer) => {
    const rank = rankings().indexOf(racer) + 1;
    const border = racer.car.color;
    const action = racer.ram > 0 ? "INVESTIDA" : racer.turbo > 0 ? "TURBO" : racer.weaponCooldown > 0 ? "RECARREGANDO" : racer.finished ? "FINAL" : "PRONTO";
    const champ = championshipEntryForRacer(racer);
    const champText = champ ? ` | Camp ${champ.points} pts` : "";
    return `<div class="player-card" style="border-left-color:${border}"><strong><em>${racer.controls.label}</em><b>${ordinal(rank)}</b></strong><span>${racer.controls.keys}</span><span>${racer.car.weapon.name} | Pts ${racer.score || 0}${champText} | Gas ${Math.round(racer.fuel)}% | Ene ${Math.round(racer.energy)}% | Mun ${racer.ammo} | ${action}</span></div>`;
  }).join("");
  updateChampionshipHud();
}

function render() {
  ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.shadowBlur = 0;
  ctx.setLineDash([]);
  ctx.clearRect(0, 0, view.w, view.h);
  const mode = currentCameraMode();
  const scale = cameraScale(mode);
  const scaleY = scale * (mode.tiltY || 1);
  const worldW = WORLD.w * scale;
  const worldH = WORLD.h * scaleY;
  const offsetX = Math.max(0, (view.w - worldW) / 2) - state.camera.x * scale;
  const offsetY = Math.max(0, (view.h - worldH) / 2) - state.camera.y * scaleY;
  ctx.save();
  ctx.translate(view.w / 2 + (mode.screenX || 0), view.h / 2 + (mode.screenY || 0));
  ctx.rotate(mode.rotation || 0);
  ctx.translate(-view.w / 2, -view.h / 2);
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scaleY);
  drawWorld();
  ctx.restore();
  drawScreenGrade();
  drawMini();
  if (state.paused) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
    ctx.fillRect(0, 0, view.w, view.h);
    ctx.fillStyle = "#fff";
    ctx.font = "1000 54px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("PAUSADO", view.w / 2, view.h / 2);
  }
}

function drawScreenGrade() {
  const vignette = ctx.createRadialGradient(view.w * 0.5, view.h * 0.45, view.w * 0.18, view.w * 0.5, view.h * 0.5, view.w * 0.72);
  vignette.addColorStop(0, "rgba(255,255,255,0.035)");
  vignette.addColorStop(0.62, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.36)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, view.w, view.h);
  ctx.fillStyle = "rgba(255,255,255,0.025)";
  for (let y = 0; y < view.h; y += 4) ctx.fillRect(0, y, view.w, 1);
}

function drawWorld() {
  drawTerrain();
  drawDirt();
  drawCliffs();
  drawRailways();
  drawModelSetPieces();
  drawScenery();
  drawTrack();
  drawMudHazards();
  drawOilHazards();
  drawSpyHelicopter();
  drawItems();
  drawTraffic();
  drawProjectiles();
  for (const racer of state.racers) ensureRacerPose(racer, "draw-world");
  const sortedRacers = state.racers.filter(hasValidRacerPose).sort((a, b) => a.y - b.y);
  const underpassRacers = sortedRacers.filter(isRacerUnderOverpass);
  underpassRacers.forEach(safeDrawCar);
  drawOverpasses();
  underpassRacers.forEach(drawUnderpassRacerOverlay);
  sortedRacers.filter((racer) => !isRacerUnderOverpass(racer)).forEach(safeDrawCar);
  drawExplosions();
}

function drawUnderpassRacerOverlay(racer) {
  ctx.save();
  ctx.globalAlpha = racer.player ? 0.72 : 0.58;
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(20, 232, 255, 0.18)";
  ctx.strokeStyle = racer.car?.neon || racer.car?.color || "#48d8ff";
  ctx.lineWidth = racer.player ? 4 : 3;
  ctx.shadowColor = racer.car?.neon || racer.car?.color || "#48d8ff";
  ctx.shadowBlur = racer.player ? 18 : 12;
  ctx.beginPath();
  ctx.ellipse(racer.x, racer.y, racer.radius * 2.7, racer.radius * 1.7, racer.angle || 0, 0, TAU);
  ctx.fill();
  ctx.stroke();
  safeDrawCar(racer);
  ctx.restore();
}

function drawTerrain() {
  const level = state.track.level;
  const theme = level.theme;
  ctx.fillStyle = level.water;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);
  if (theme === "death") drawLavaSea();
  else if (["model", "neonworkshop"].includes(theme)) {
    const bg = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
    bg.addColorStop(0, "#151a22");
    bg.addColorStop(0.45, "#242a31");
    bg.addColorStop(1, "#10141b");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, WORLD.w, WORLD.h);
  } else if (theme === "amc") {
    ctx.fillStyle = "#252b2d";
    ctx.fillRect(0, 0, WORLD.w, WORLD.h);
    drawDroneCircuitBase();
  } else drawWater();

  if (theme === "spy") {
    ctx.fillStyle = "#52c63c";
    ctx.fillRect(115, 105, WORLD.w - 230, WORLD.h - 210);
    drawGrassPattern();
    return;
  }

  if (theme === "model") {
    drawModelFloor();
    return;
  }

  if (theme === "neonworkshop") {
    drawModelFloor();
    drawWorkshopLights();
    return;
  }

  if (theme === "amc") {
    drawGreenRunoffs();
    return;
  }

  if (theme === "ruins") {
    ctx.fillStyle = "#555a5c";
    ctx.fillRect(115, 105, WORLD.w - 230, WORLD.h - 210);
    drawCityBlocks();
    return;
  }

  if (theme === "ancient") {
    drawAncientBase();
    return;
  }

  if (theme === "rock") {
    ctx.fillStyle = "#b98247";
    roundRect(ctx, 115, 105, WORLD.w - 230, WORLD.h - 210, 36);
    ctx.fill();
    drawArenaSand();
    return;
  }

  if (theme === "jungle") {
    drawJungleBase();
    return;
  }

  if (theme === "waters") {
    drawWatersBase();
    return;
  }

  if (theme === "fantasy") {
    drawFantasyParkBase();
    return;
  }

  if (theme === "kartarena") {
    drawKartArenaBase();
    return;
  }

  if (theme === "racetrack") {
    if (level.plusFigureEightBase) {
      drawPlusFigureEightBase();
      return;
    }
    if (level.plusVillageCircuitBase) {
      drawPlusVillageCircuitBase();
      return;
    }
    if (level.plusAerialMazeBase) {
      drawPlusAerialMazeBase();
      return;
    }
    if (level.plusGardenCircuitBase) {
      drawPlusGardenCircuitBase();
      return;
    }
    if (level.plusArenaBase) {
      drawPlusArenaBase();
      return;
    }
    if (level.plusCircuitBase) {
      drawPlusCircuitBase();
      return;
    }
    drawRacewayBase();
    return;
  }

  if (theme === "morro") {
    drawMorroBase();
    return;
  }

  if (theme === "bridge") {
    ctx.fillStyle = level.sand;
    roundRect(ctx, 115, 105, WORLD.w - 230, WORLD.h - 210, 48);
    ctx.fill();
    drawBridgeWaterChannels();
    return;
  }

  if (theme === "death") {
    ctx.fillStyle = "#2b2420";
    roundRect(ctx, 115, 105, WORLD.w - 230, WORLD.h - 210, 28);
    ctx.fill();
    drawMetalPlates();
    return;
  }

  if (theme === "canyon") {
    ctx.fillStyle = "#b58555";
    ctx.fillRect(100, 90, WORLD.w - 200, WORLD.h - 180);
    drawCanyonBands();
    return;
  }

  ctx.fillStyle = level.sand;
  roundRect(ctx, 115, 105, WORLD.w - 230, WORLD.h - 210, 48);
  ctx.fill();
  ctx.strokeStyle = "rgba(87, 62, 35, 0.38)";
  ctx.lineWidth = 13;
  ctx.stroke();
}

function drawDroneCircuitBase() {
  const pad = 105;
  const turf = ctx.createLinearGradient(0, pad, 0, WORLD.h - pad);
  turf.addColorStop(0, "#42dc55");
  turf.addColorStop(0.55, "#1fb648");
  turf.addColorStop(1, "#16923a");
  roundRect(ctx, pad, pad, WORLD.w - pad * 2, WORLD.h - pad * 2, 30);
  ctx.fillStyle = turf;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.65)";
  ctx.lineWidth = 7;
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  for (let i = 0; i < 26; i++) {
    ctx.fillRect(150 + (i * 181) % 2160, 130 + (i * 97) % 1260, 86, 10);
  }
  ctx.fillStyle = "rgba(25,25,25,0.22)";
  roundRect(ctx, 90, 1050, 520, 210, 18);
  ctx.fill();
  roundRect(ctx, 1780, 160, 510, 155, 18);
  ctx.fill();
}

function drawGreenRunoffs() {
  const track = state.track;
  if (!track) return;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#28df53";
  ctx.lineWidth = track.level.road + 122;
  closedPath(ctx, track.points);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.84)";
  ctx.lineWidth = track.level.road + 132;
  closedPath(ctx, track.points);
  ctx.stroke();
  ctx.strokeStyle = "#25d94d";
  ctx.lineWidth = track.level.road + 104;
  closedPath(ctx, track.points);
  ctx.stroke();
  for (let d = 0; d < track.length; d += 180) {
    const p = pointAt(track, d, (d / 180) % 2 > 1 ? track.level.road / 2 + 95 : -track.level.road / 2 - 95);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.fillRect(-42, -5, 84, 10);
    ctx.restore();
  }
}

function drawWorkshopLights() {
  const colors = ["#37e7ff", "#ff4fd8", "#6cff9d", "#ffd64d"];
  ctx.save();
  ctx.globalAlpha = 0.78;
  for (let i = 0; i < 14; i++) {
    const x = 180 + (i * 173) % 2140;
    const y = i % 2 ? 110 : 1460;
    ctx.strokeStyle = colors[i % colors.length];
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 130, y + (i % 2 ? 22 : -22));
    ctx.stroke();
  }
  ctx.restore();
}

function drawAsphaltTexture() {
  const track = state.track;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = 0.16;
  for (let i = 0; i < 14; i++) {
    ctx.strokeStyle = i % 2 ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.20)";
    ctx.lineWidth = 2 + (i % 3);
    ctx.setLineDash([28 + (i % 4) * 12, 52 + (i % 5) * 14]);
    ctx.lineDashOffset = -state.time * (8 + i % 5) - i * 23;
    closedPath(ctx, track.points);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawSkidMarks() {
  const track = state.track;
  const markCount = track.level.cleanScenery ? 4 : 10;
  ctx.save();
  ctx.lineCap = "round";
  for (let i = 0; i < markCount; i++) {
    const progress = 150 + i * 265;
    const lane = [-62, -28, 24, 58][i % 4];
    const p = pointAt(track, progress, lane);
    const length = 56 + (i % 5) * 18;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle + (i % 2 ? 0.04 : -0.06));
    ctx.strokeStyle = i % 3 === 0 ? "rgba(0,0,0,0.30)" : "rgba(20,24,28,0.22)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-length / 2, -7);
    ctx.lineTo(length / 2, -3);
    ctx.moveTo(-length / 2 + 12, 9);
    ctx.lineTo(length / 2 - 8, 6);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function drawRaceDetails() {
  const track = state.track;
  const theme = track.level.theme;
  const hasWhiteLanes = ["amc", "spy", "neonworkshop", "model"].includes(theme);
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.setLineDash([48, 58]);
  ctx.strokeStyle = hasWhiteLanes ? "rgba(255,255,255,0.82)" : "rgba(255,226,94,0.78)";
  ctx.lineWidth = theme === "amc" ? 6 : 4;
  closedPath(ctx, track.points);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  for (let d = 130; d < track.length; d += theme === "amc" ? 170 : 240) {
    const p = pointAt(track, d, 0);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = "rgba(255,255,255,0.26)";
    ctx.fillRect(-34, -track.level.road / 2 + 22, 68, 5);
    ctx.fillRect(-34, track.level.road / 2 - 27, 68, 5);
    ctx.restore();
  }
}

function drawTracksideProps() {
  const track = state.track;
  const road = track.level.road;
  const theme = track.level.theme;
  const step = track.level.cleanScenery ? 920 : theme === "amc" ? 420 : ["racetrack", "fantasy", "kartarena"].includes(theme) ? 820 : 620;
  for (let d = 180; d < track.length; d += step) {
    const side = Math.floor(d / step) % 2 === 0 ? -1 : 1;
    const p = pointAt(track, d, side * (road / 2 + 44));
    if (theme === "ruins") {
      if (side < 0) drawConcreteBarrier(p.x, p.y, p.angle);
      else drawTireStack(p.x, p.y, 0.82);
    } else if (theme === "spy" || theme === "amc") {
      if (side < 0) drawArrowSign(p.x, p.y, p.angle, side);
      else drawTireStack(p.x, p.y, 0.72);
    } else if (theme === "model" || theme === "neonworkshop") {
      if (side < 0) drawMiniCone(p.x, p.y, p.angle);
      else drawTireStack(p.x, p.y, 0.62);
    } else if (theme === "jungle") {
      if (side < 0) drawJunglePost(p.x, p.y, p.angle, side);
      else drawFernCluster(p.x, p.y, 0.66 + ((d / step) % 3) * 0.08);
    } else if (theme === "ancient") {
      if (side < 0) drawAncientColumn(p.x, p.y, 0.58 + ((d / step) % 3) * 0.08);
      else drawAncientBlock(p.x, p.y, p.angle, 0.66);
    } else if (theme === "morro") {
      if (side < 0) drawMorroGuardPost(p.x, p.y, p.angle, side);
      else drawMorroShrub(p.x, p.y, 0.66 + ((d / step) % 3) * 0.08);
    } else if (theme === "waters") {
      if (side < 0) drawWatersFencePost(p.x, p.y, p.angle, side);
      else drawWatersReeds(p.x, p.y, 0.72 + ((d / step) % 3) * 0.08);
    } else {
      if (side < 0) drawTireStack(p.x, p.y, 0.7);
      else drawMiniCone(p.x, p.y, p.angle);
    }
  }
  drawTrackCrowd();
  drawFinishMarshal();
}

function crowdFlagPalette() {
  const vehicles = currentVehicles().length ? currentVehicles() : cars;
  const colors = vehicles.map((car) => ({
    main: car.color || "#26d8ff",
    stripe: car.stripe || car.neon || "#fff0b4",
    dark: car.dark || "#111923",
  }));
  return colors.length ? colors : [
    { main: "#f23f35", stripe: "#ffffff", dark: "#661612" },
    { main: "#ffd84e", stripe: "#171923", dark: "#766115" },
    { main: "#26d8ff", stripe: "#fff0b4", dark: "#073746" },
    { main: "#f13bff", stripe: "#fff0b4", dark: "#681470" },
  ];
}

function drawTrackCrowd() {
  const track = state.track;
  if (!track) return;
  const theme = track.level.theme;
  const road = track.level.road;
  const palette = crowdFlagPalette();
  const baseStep = track.level.cleanScenery ? 520 : ["racetrack", "fantasy", "kartarena", "amc"].includes(theme) ? 350 : 430;
  const step = state.reducedEffects ? baseStep * 1.7 : baseStep;
  const start = 115;
  const amplitude = 1 + Math.sin(state.time * 2.1) * 0.08;
  let index = 0;

  ctx.save();
  for (let d = start; d < track.length; d += step) {
    for (const side of [-1, 1]) {
      if (state.reducedEffects && ((index + (side > 0 ? 1 : 0)) % 2)) continue;
      const color = palette[(index + (side > 0 ? 2 : 0)) % palette.length];
      const dzFlag = (index + (side > 0 ? 3 : 0)) % 7 === 0;
      const p = crowdPointOutsideTrack(track, d + (side > 0 ? 42 : 0), side, index);
      if (!p) continue;
      const count = dzFlag ? 4 : 3 + (index % 2);
      drawSpectatorGroup(p.x, p.y, p.angle, side, count, color, dzFlag, index, amplitude);
    }
    index += 1;
  }
  ctx.restore();
}

function crowdPointOutsideTrack(track, progress, side, seed) {
  const road = track.level.road;
  const offsets = [72, 96, 124, 158, 198, 246, 310];
  return findSafeTracksidePoint(track, progress, side, offsets, seed, Math.max(54, road * 0.28));
}

function findSafeTracksidePoint(track, progress, side, offsets, seed = 0, margin = 58) {
  const road = track.level.road;
  for (const offset of offsets) {
    const lane = side * (road / 2 + offset + ((seed % 3) * 10));
    const p = pointAt(track, progress, lane);
    if (isTracksidePointClear(track, p.x, p.y, margin)) return p;
  }
  return null;
}

function isCrowdPointClear(track, x, y) {
  return isTracksidePointClear(track, x, y, Math.max(54, track.level.road * 0.28));
}

function isTracksidePointClear(track, x, y, margin = 58) {
  if (x < 44 || y < 44 || x > WORLD.w - 44 || y > WORLD.h - 44) return false;
  const nearest = project(track, x, y);
  if (nearest.distance < track.level.road / 2 + margin) return false;
  const shortcut = projectShortcutRoads(track.level, x, y);
  if (shortcut) {
    const shortcutWidth = track.level.shortcutRoadWidth || track.level.road * 0.78;
    if (shortcut.distance < shortcutWidth / 2 + margin) return false;
  }
  if (isUnsafeTracksideTerrain(track.level, x, y, margin)) return false;
  return true;
}

function isUnsafeTracksideTerrain(level, x, y, margin = 58) {
  const theme = level.theme;
  if (["island", "bridge", "rock", "ruins", "ancient", "morro", "canyon"].includes(theme)) {
    if (!insideRect(x, y, 115 + margin * 0.18, 105 + margin * 0.18, WORLD.w - 230 - margin * 0.36, WORLD.h - 210 - margin * 0.36)) return true;
  }
  if (theme === "bridge" && pointNearBridgeWaterChannel(x, y, margin)) return true;
  if (theme === "waters" && pointNearWatersChannel(x, y, margin)) return true;
  if (theme === "jungle" && pointNearJungleWater(x, y, margin)) return true;
  if (theme === "racetrack" && !level.plusArenaBase && !level.plusCircuitBase && !level.plusFigureEightBase && !level.plusGardenCircuitBase && !level.plusVillageCircuitBase && !level.plusAerialMazeBase && pointNearRacewayPool(x, y, margin)) return true;
  if (theme === "death" && !insideRect(x, y, 115, 105, WORLD.w - 230, WORLD.h - 210)) return true;
  return false;
}

function insideRect(x, y, rx, ry, rw, rh) {
  return x >= rx && y >= ry && x <= rx + rw && y <= ry + rh;
}

function pointInPolygon(x, y, points, margin = 0) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i][0], yi = points[i][1];
    const xj = points[j][0], yj = points[j][1];
    const intersect = ((yi > y) !== (yj > y)) && x < ((xj - xi) * (y - yi)) / ((yj - yi) || 1e-6) + xi;
    if (intersect) inside = !inside;
  }
  if (inside) return true;
  if (margin <= 0) return false;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    if (distanceToSegment(x, y, a[0], a[1], b[0], b[1]) < margin) return true;
  }
  return false;
}

function distanceToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy || 1;
  const t = clamp(((px - ax) * dx + (py - ay) * dy) / len2, 0, 1);
  const x = ax + dx * t;
  const y = ay + dy * t;
  return Math.hypot(px - x, py - y);
}

function pointInRotatedEllipse(px, py, cx, cy, rx, ry, rot = 0, margin = 0) {
  const cos = Math.cos(-rot);
  const sin = Math.sin(-rot);
  const dx = px - cx;
  const dy = py - cy;
  const x = dx * cos - dy * sin;
  const y = dx * sin + dy * cos;
  const safeRx = Math.max(1, rx + margin);
  const safeRy = Math.max(1, ry + margin);
  return (x * x) / (safeRx * safeRx) + (y * y) / (safeRy * safeRy) <= 1;
}

function pointNearRacewayPool(x, y, margin = 58) {
  const pools = [
    [780, 455, 210, 120, -0.18],
    [840, 860, 230, 145, 0.2],
    [1440, 470, 250, 130, 0.08],
    [1660, 900, 275, 150, -0.18],
    [2120, 650, 150, 310, 0.08],
  ];
  return pools.some(([cx, cy, rx, ry, rot]) => pointInRotatedEllipse(x, y, cx, cy, rx, ry, rot, margin));
}

function pointNearWatersChannel(x, y, margin = 58) {
  const channels = [
    [[80, 390], [560, 250], [960, 590], [1450, 420], [2320, 500], [2360, 750], [1650, 720], [1080, 880], [540, 650], [80, 720]],
    [[140, 1000], [650, 850], [940, 1120], [1370, 960], [1770, 1090], [2260, 930], [2360, 1190], [1720, 1320], [1180, 1230], [650, 1390], [120, 1280]],
    [[960, 120], [1260, 210], [1510, 160], [1840, 230], [2130, 160], [2290, 330], [1780, 410], [1280, 360], [940, 300]],
  ];
  return channels.some((poly) => pointInPolygon(x, y, poly, margin));
}

function pointNearBridgeWaterChannel(x, y, margin = 58) {
  const channel = [[95, 560], [480, 470], [740, 660], [1040, 560], [1350, 450], [1680, 420], [2380, 530], [2380, 730], [1760, 650], [1300, 670], [1040, 780], [680, 930], [410, 730], [95, 820]];
  return pointInPolygon(x, y, channel, margin);
}

function pointNearJungleWater(x, y, margin = 58) {
  const river = [[0, 460], [360, 430], [690, 620], [1020, 540], [1380, 470], [1780, 560], [2180, 440], [2500, 470], [2500, 700], [2120, 660], [1750, 760], [1370, 650], [1040, 720], [680, 820], [330, 610], [0, 700]];
  if (pointInPolygon(x, y, river, margin)) return true;
  return pointInRotatedEllipse(x, y, 1740, 300, 170, 220, 0.05, margin);
}

function drawFinishMarshal() {
  const track = state.track;
  if (!track) return;
  const activeWave = clamp(1 - (state.time - state.lastFinishFlagAt) / 4.8, 0, 1);
  const p = finishMarshalPoint(track);
  if (!p) return;
  drawFinishFlagMan(p.x, p.y, p.angle, p.side, activeWave);
}

function finishMarshalSide(track) {
  return finishMarshalPoint(track)?.side || -1;
}

function finishMarshalPoint(track) {
  const margin = Math.max(72, track.level.road * 0.36);
  const offsets = [72, 92, 122, 158, 204, 260, 330];
  const progressCandidates = [28, 0, 60, track.length - 40, track.length - 90, 110];
  for (const progress of progressCandidates) {
    for (const side of [-1, 1]) {
      const p = findSafeTracksidePoint(track, progress, side, offsets, 1, margin);
      if (p) return { ...p, side };
    }
  }
  return null;
}

function drawFinishFlagMan(x, y, angle, side, activeWave = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "rgba(0,0,0,0.26)";
  ctx.beginPath();
  ctx.ellipse(0, side * 18, 18, 7, 0, 0, TAU);
  ctx.fill();

  const cheer = Math.sin(state.time * (activeWave > 0 ? 12 : 3.5)) * (0.18 + activeWave * 0.9);
  ctx.strokeStyle = "#141923";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-8, side * 6);
  ctx.lineTo(-13, side * 28);
  ctx.moveTo(8, side * 6);
  ctx.lineTo(13, side * 28);
  ctx.moveTo(-9, -side * 8);
  ctx.lineTo(-20, -side * (22 + activeWave * 8));
  ctx.moveTo(8, -side * 8);
  ctx.lineTo(26, -side * (26 + activeWave * 18));
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, -11, -side * 8 - 12, 22, 27, 6);
  ctx.fill();
  ctx.fillStyle = "#111923";
  ctx.fillRect(-9, -side * 6 - 9, 18, 7);
  ctx.fillStyle = "#ffd2a7";
  ctx.beginPath();
  ctx.arc(0, -side * 25, 7, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#171923";
  ctx.fillRect(-8, -side * 34, 16, 6);

  ctx.save();
  ctx.translate(26, -side * (28 + activeWave * 18));
  ctx.rotate(-side * (0.7 + cheer * 0.45));
  drawCheckeredFlagShape(side, activeWave);
  ctx.restore();
  ctx.restore();
}

function drawCheckeredFlagShape(side, activeWave = 0) {
  ctx.strokeStyle = "#111923";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, side * 18);
  ctx.lineTo(0, -side * 34);
  ctx.stroke();
  ctx.translate(0, -side * 34);
  ctx.scale(1, side);
  const w = 58;
  const h = 34;
  const wave = Math.sin(state.time * (8 + activeWave * 7)) * (3 + activeWave * 8);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(w * 0.32, -7 + wave, w * 0.66, 8 - wave, w, 0);
  ctx.lineTo(w, h);
  ctx.bezierCurveTo(w * 0.66, h + 7 - wave, w * 0.32, h - 8 + wave, 0, h);
  ctx.closePath();
  ctx.fillStyle = "#f8fbff";
  ctx.fill();
  const cols = 4;
  const rows = 3;
  ctx.save();
  ctx.clip();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if ((r + c) % 2 === 0) {
        ctx.fillStyle = "#070707";
        ctx.fillRect((w / cols) * c, (h / rows) * r, w / cols + 1, h / rows + 1);
      }
    }
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 1.3;
  ctx.stroke();
}

function drawSpectatorGroup(x, y, angle, side, count, color, dzFlag, seed, amplitude) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const spacing = 18;
  const baseY = side * 4;
  for (let i = 0; i < count; i++) {
    const offsetX = (i - (count - 1) / 2) * spacing;
    const cheer = Math.sin(state.time * (6.4 + i * 0.34) + seed + i);
    const bounce = cheer * 3.2 * amplitude;
    const fanColor = i % 2 ? color.dark : color.main;
    drawTinyFan(offsetX, baseY + bounce, side, fanColor, color.stripe, cheer, seed + i);
  }
  const flagX = (count * spacing) / 2 + 8;
  const wave = Math.sin(state.time * 8.4 + seed * 0.77) * 0.46;
  drawCrowdFlag(flagX, baseY - side * 10, side, color, dzFlag, wave);
  ctx.restore();
}

function drawTinyFan(x, y, side, shirt, accent, cheer = 0, seed = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(state.time * 5.6 + seed) * 0.08);
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(0, side * 10, 7, 4, 0, 0, TAU);
  ctx.fill();

  ctx.strokeStyle = "rgba(10,12,18,0.8)";
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  const armLift = 3 + Math.abs(cheer) * 8;
  ctx.beginPath();
  ctx.moveTo(-5, side * 2);
  ctx.lineTo(-10, -side * armLift);
  ctx.moveTo(5, side * 2);
  ctx.lineTo(10, -side * (armLift + 1.5));
  ctx.stroke();

  ctx.fillStyle = shirt;
  ctx.beginPath();
  ctx.ellipse(0, side * 3, 7, 9, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = accent;
  ctx.fillRect(-5, side > 0 ? -1 : 1, 10, 3 * side);

  ctx.fillStyle = "#f3c49d";
  ctx.beginPath();
  ctx.arc(0, -side * 8, 5, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawCrowdFlag(x, y, side, color, dzFlag, wave) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(wave * 0.16);
  ctx.strokeStyle = "#202734";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, side * 18);
  ctx.lineTo(0, -side * 26);
  ctx.stroke();

  ctx.translate(0, -side * 26);
  ctx.scale(1, side);
  const w = dzFlag ? 58 : 44;
  const h = dzFlag ? 24 : 20;
  ctx.fillStyle = dzFlag ? "#111923" : color.main;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(w * 0.22, -8 + wave * 13, w * 0.48, 7 - wave * 10, w * 0.72, -2 + wave * 8);
  ctx.quadraticCurveTo(w * 0.9, -5 + wave * 12, w, 0);
  ctx.lineTo(w, h + wave * 3);
  ctx.quadraticCurveTo(w * 0.78, h - 8 - wave * 10, w * 0.5, h - 1 + wave * 7);
  ctx.quadraticCurveTo(w * 0.2, h + 7 - wave * 8, 0, h);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.24)";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  if (dzFlag) {
    ctx.fillStyle = "#fff0b4";
    ctx.font = "900 8px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("DZ", w * 0.24, h * 0.5);
    ctx.fillStyle = "#8cf8ff";
    ctx.font = "800 6px Arial, sans-serif";
    ctx.fillText("RACING", w * 0.66, h * 0.54);
  } else {
    ctx.fillStyle = color.stripe || "#fff";
    ctx.fillRect(6, h * 0.38, w - 12, 4);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.arc(w - 10, h * 0.5, 4, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawTireStack(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = "#111419";
    ctx.beginPath();
    ctx.ellipse(i * 15 - 15, i % 2 ? -6 : 8, 18, 13, 0.12, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#343a3f";
    ctx.beginPath();
    ctx.ellipse(i * 15 - 15, i % 2 ? -6 : 8, 8, 5, 0.12, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawMiniCone(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#ff7b2e";
  ctx.beginPath();
  ctx.moveTo(0, -21);
  ctx.lineTo(16, 18);
  ctx.lineTo(-16, 18);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.fillRect(-10, 5, 20, 5);
  ctx.restore();
}

function drawConcreteBarrier(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#8d9294";
  roundRect(ctx, -38, -15, 76, 30, 5);
  ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(-31, 5, 62, 5);
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.stroke();
  ctx.restore();
}

function drawArrowSign(x, y, angle, side) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#0b1018";
  roundRect(ctx, -32, -20, 64, 40, 6);
  ctx.fill();
  ctx.fillStyle = "#ffd64d";
  ctx.beginPath();
  ctx.moveTo(-18 * side, -11);
  ctx.lineTo(16 * side, 0);
  ctx.lineTo(-18 * side, 11);
  ctx.lineTo(-9 * side, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawSpectatorStand(x, y, w, h, label) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#242833";
  roundRect(ctx, -w / 2, -h / 2, w, h, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.32)";
  ctx.lineWidth = 4;
  ctx.stroke();
  const colors = ["#ff5f69", "#ffd64d", "#48d8ff", "#6cff9d", "#f29dff"];
  for (let yy = -h / 2 + 18; yy < h / 2 - 8; yy += 24) {
    for (let xx = -w / 2 + 18; xx < w / 2 - 12; xx += 26) {
      ctx.fillStyle = colors[(xx + yy + w) % colors.length | 0];
      ctx.beginPath();
      ctx.arc(xx, yy, 7, 0, TAU);
      ctx.fill();
    }
  }
  ctx.fillStyle = "#fff";
  ctx.font = "900 22px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.fillText(label, 0, -h / 2 - 16);
  ctx.restore();
}

function drawBillboard(x, y, text, color = "#48d8ff") {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#111722";
  roundRect(ctx, -92, -34, 184, 68, 8);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.font = "900 20px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.fillText(text, 0, 7);
  ctx.restore();
}
function drawBridgeWaterChannels() {
  ctx.fillStyle = "#0785c8";
  ctx.beginPath();
  ctx.moveTo(95, 560);
  ctx.bezierCurveTo(480, 470, 740, 660, 1040, 560);
  ctx.bezierCurveTo(1350, 450, 1680, 420, 2380, 530);
  ctx.lineTo(2380, 730);
  ctx.bezierCurveTo(1760, 650, 1300, 670, 1040, 780);
  ctx.bezierCurveTo(680, 930, 410, 730, 95, 820);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 3;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(120, 610 + i * 36);
    ctx.bezierCurveTo(600, 540 + i * 30, 990, 710 + i * 8, 1500, 600 + i * 28);
    ctx.stroke();
  }
}

function drawJungleBase() {
  const forest = ctx.createLinearGradient(0, 90, 0, WORLD.h - 80);
  forest.addColorStop(0, "#12351f");
  forest.addColorStop(0.48, "#1e5a31");
  forest.addColorStop(1, "#0c2718");
  roundRect(ctx, 90, 80, WORLD.w - 180, WORLD.h - 160, 48);
  ctx.fillStyle = forest;
  ctx.fill();

  drawJungleRiver();
  drawJungleWaterfall(1740, 210, 230, 260);
  drawJungleFloorTexture();
  drawJungleCanopy();
}

function drawWatersBase() {
  const sand = ctx.createLinearGradient(0, 80, WORLD.w, WORLD.h);
  sand.addColorStop(0, "#f4d7a2");
  sand.addColorStop(0.52, "#d7a86f");
  sand.addColorStop(1, "#b98255");
  ctx.fillStyle = sand;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);
  drawWatersChannels();
  drawWatersIslands();
  drawWatersGrassPatches();
}

function drawWatersChannels() {
  ctx.save();
  const water = ctx.createLinearGradient(0, 250, WORLD.w, WORLD.h - 180);
  water.addColorStop(0, "#54d8dd");
  water.addColorStop(0.55, "#138fb8");
  water.addColorStop(1, "#075b8c");
  const channels = [
    [[80, 390], [560, 250], [960, 590], [1450, 420], [2320, 500], [2360, 750], [1650, 720], [1080, 880], [540, 650], [80, 720]],
    [[140, 1000], [650, 850], [940, 1120], [1370, 960], [1770, 1090], [2260, 930], [2360, 1190], [1720, 1320], [1180, 1230], [650, 1390], [120, 1280]],
    [[960, 120], [1260, 210], [1510, 160], [1840, 230], [2130, 160], [2290, 330], [1780, 410], [1280, 360], [940, 300]],
  ];
  for (const pts of channels) {
    ctx.fillStyle = water;
    ctx.beginPath();
    pts.forEach(([x, y], i) => {
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(91,53,32,0.42)";
    ctx.lineWidth = 14;
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255,255,255,0.34)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    const y = 360 + (i * 77) % 820;
    ctx.moveTo(140 + (i % 3) * 80, y);
    ctx.bezierCurveTo(580, y - 80, 930, y + 110, 1320, y - 20);
    ctx.bezierCurveTo(1680, y - 140, 1900, y + 80, 2260, y - 30);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWatersIslands() {
  ctx.save();
  const colors = ["#eed5a3", "#dbb076", "#a8ad55"];
  for (let i = 0; i < 28; i++) {
    const x = 170 + ((i * 269) % (WORLD.w - 340));
    const y = 130 + ((i * 173) % (WORLD.h - 260));
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.ellipse(x, y, 150 + (i % 4) * 34, 54 + (i % 3) * 18, i * 0.28, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(121,73,42,0.2)";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  ctx.restore();
}

function drawWatersGrassPatches() {
  ctx.save();
  for (let i = 0; i < 80; i++) {
    const x = 120 + ((i * 139) % (WORLD.w - 240));
    const y = 110 + ((i * 229) % (WORLD.h - 220));
    ctx.strokeStyle = i % 2 ? "rgba(91,112,42,0.62)" : "rgba(62,93,38,0.58)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.sin(i) * 8, y - 12 - (i % 3) * 4);
    ctx.moveTo(x + 8, y + 2);
    ctx.lineTo(x + 12 + Math.cos(i) * 6, y - 8);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRacewayBase() {
  if (state.track?.level?.plusFigureEightBase) {
    drawPlusFigureEightBase();
    return;
  }
  if (state.track?.level?.plusVillageCircuitBase) {
    drawPlusVillageCircuitBase();
    return;
  }
  if (state.track?.level?.plusAerialMazeBase) {
    drawPlusAerialMazeBase();
    return;
  }
  if (state.track?.level?.plusGardenCircuitBase) {
    drawPlusGardenCircuitBase();
    return;
  }
  if (state.track?.level?.plusArenaBase) {
    drawPlusArenaBase();
    return;
  }
  if (state.track?.level?.plusCircuitBase) {
    drawPlusCircuitBase();
    return;
  }
  if (state.track?.level?.parkCircuitBase) {
    drawParkCircuitBase();
    return;
  }
  if (state.track?.level?.rcAerialBase) {
    drawRcAerialBase();
    return;
  }
  if (state.track?.level?.mazeCircuitBase) {
    drawMazeCircuitBase();
    return;
  }
  if (state.track?.level?.stadiumBase) {
    drawStadiumRacewayBase();
    return;
  }
  const sand = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
  sand.addColorStop(0, "#e2c59b");
  sand.addColorStop(0.55, "#c7a77e");
  sand.addColorStop(1, "#a88763");
  ctx.fillStyle = sand;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);
  drawRacewayPools();
  drawRacewaySandTexture();
  drawRacewayServicePads();
}

function drawPlusCircuitBase() {
  const bg = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
  bg.addColorStop(0, "#0c1820");
  bg.addColorStop(0.45, "#123328");
  bg.addColorStop(1, "#071018");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);

  ctx.fillStyle = "#35c957";
  roundRect(ctx, 100, 86, WORLD.w - 200, WORLD.h - 172, 42);
  ctx.fill();
  drawGrassPattern();

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = "#48d8ff";
  for (let x = 180; x < WORLD.w; x += 360) {
    ctx.fillRect(x, 120, 8, WORLD.h - 240);
  }
  ctx.fillStyle = "#ffd64d";
  for (let y = 160; y < WORLD.h; y += 300) {
    ctx.fillRect(130, y, WORLD.w - 260, 5);
  }
  ctx.restore();

  drawSpectatorStand(360, 210, 360, 76, "DZ PLUS");
  drawSpectatorStand(1680, 1340, 420, 78, "RACING PLUS");
  drawBillboard(2050, 500, "PLUS 1", "#ffd64d");
  drawBillboard(520, 520, "DZ RANCING", "#48d8ff");
}

function drawPlusGardenCircuitBase() {
  ctx.fillStyle = "#fbfdf9";
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);

  const turf = ctx.createLinearGradient(0, 120, WORLD.w, WORLD.h - 80);
  turf.addColorStop(0, "#9bdc75");
  turf.addColorStop(0.52, "#61bd4f");
  turf.addColorStop(1, "#3d9f43");
  ctx.fillStyle = turf;
  roundRect(ctx, 148, 258, WORLD.w - 296, WORLD.h - 465, 78);
  ctx.fill();

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.82)";
  ctx.lineWidth = 18;
  roundRect(ctx, 150, 260, WORLD.w - 300, WORLD.h - 470, 78);
  ctx.stroke();
  ctx.strokeStyle = "rgba(41,129,54,0.64)";
  ctx.lineWidth = 14;
  roundRect(ctx, 174, 282, WORLD.w - 348, WORLD.h - 514, 70);
  ctx.stroke();
  ctx.restore();

  drawPlusGardenPitBuilding(830, 312, 590, 120, 0);
  drawPlusGardenPitBuilding(520, 1120, 360, 150, 0);
  drawPlusGardenPitBuilding(2020, 605, 330, 132, -0.62);
  drawPlusGardenStand(1150, 464, 760, 86, 0);
  drawPlusGardenStand(1040, 1235, 520, 104, -0.18);
  drawPlusGardenStand(725, 955, 310, 84, -0.78);

  const groves = [
    [590, 620, 1.08], [690, 685, 0.82], [1610, 560, 1], [1720, 655, 0.9],
    [1850, 760, 1.02], [1755, 980, 0.84], [1460, 925, 0.72], [805, 880, 0.76],
    [620, 520, 0.72], [2015, 910, 0.8],
  ];
  groves.forEach(([x, y, s], index) => drawPlusGardenTree(x, y, s, index));

  ctx.save();
  ctx.globalAlpha = 0.34;
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 16; i++) {
    const x = 250 + (i * 137) % 1880;
    const y = 360 + (i * 97) % 770;
    ctx.beginPath();
    ctx.ellipse(x, y, 62 + (i % 4) * 14, 22 + (i % 3) * 9, i * 0.42, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawPlusGardenPitBuilding(x, y, w, h, angle = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "rgba(72,102,130,0.26)";
  roundRect(ctx, -w / 2 + 22, -h / 2 + 22, w, h, 8);
  ctx.fill();
  ctx.fillStyle = "#efe2d3";
  roundRect(ctx, -w / 2, -h / 2, w, h, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(170,118,88,0.34)";
  ctx.lineWidth = 3;
  for (let xx = -w / 2 + 14; xx < w / 2; xx += 18) {
    ctx.beginPath();
    ctx.moveTo(xx, -h / 2);
    ctx.lineTo(xx, h / 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPlusGardenStand(x, y, w, h, angle = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#ead9c6";
  roundRect(ctx, -w / 2, -h / 2, w, h, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(122,84,54,0.28)";
  ctx.lineWidth = 4;
  for (let yy = -h / 2 + 14; yy < h / 2; yy += 17) {
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 12, yy);
    ctx.lineTo(w / 2 - 12, yy);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPlusGardenTree(x, y, s = 1, seed = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(48,92,42,0.20)";
  ctx.beginPath();
  ctx.ellipse(18, 22, 58, 32, 0.2, 0, TAU);
  ctx.fill();
  const colors = ["#5fba42", "#72cc4c", "#438f39"];
  for (let i = 0; i < 7; i++) {
    const a = i * TAU / 7 + seed * 0.14;
    ctx.fillStyle = colors[(i + seed) % colors.length];
    ctx.beginPath();
    ctx.ellipse(Math.cos(a) * 24, Math.sin(a) * 20, 30, 20, a, 0, TAU);
    ctx.fill();
  }
  ctx.fillStyle = "#79d15a";
  ctx.beginPath();
  ctx.arc(0, 0, 24, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawPlusVillageCircuitBase() {
  const grass = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
  grass.addColorStop(0, "#4aa845");
  grass.addColorStop(0.55, "#69ba54");
  grass.addColorStop(1, "#3d953c");
  ctx.fillStyle = grass;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);

  ctx.fillStyle = "#f0dfbd";
  roundRect(ctx, 86, 86, WORLD.w - 172, WORLD.h - 172, 38);
  ctx.fill();

  const islands = [
    [370, 365, 190, 135, -0.65], [585, 770, 150, 270, 0.08], [945, 395, 160, 145, 0.45],
    [1125, 820, 150, 265, 0.12], [1515, 355, 175, 145, -0.18], [1690, 820, 135, 250, -0.04],
    [2040, 520, 180, 145, 0.24], [1965, 1125, 260, 150, 0.02], [620, 1120, 170, 150, 0.08],
  ];
  islands.forEach(([x, y, rx, ry, rot]) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    const island = ctx.createLinearGradient(-rx, -ry, rx, ry);
    island.addColorStop(0, "#f7e9cc");
    island.addColorStop(1, "#d6bd8f");
    ctx.fillStyle = island;
    roundRect(ctx, -rx, -ry, rx * 2, ry * 2, 26);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.72)";
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.restore();
  });

  const buildings = [
    [350, 330, 180, 190, 0], [710, 360, 132, 122, 0.08], [1010, 250, 160, 150, -0.05],
    [1370, 305, 142, 134, 0.02], [1780, 340, 175, 160, 0], [2050, 690, 160, 150, 0.04],
    [1625, 870, 170, 210, -0.03], [1245, 1145, 520, 118, 0], [760, 1095, 150, 126, 0.04],
    [480, 790, 130, 134, -0.05], [2150, 1140, 165, 120, 0.05],
  ];
  buildings.forEach(([x, y, w, h, rot], index) => drawPlusVillageBuilding(x, y, w, h, rot, index));

  const palms = [
    [120, 116, 0.8], [240, 1320, 0.92], [560, 560, 0.86], [735, 980, 0.92], [940, 745, 0.78],
    [1210, 365, 0.9], [1410, 1110, 0.92], [1665, 540, 0.82], [1880, 675, 0.78],
    [2115, 390, 0.82], [2220, 1240, 0.9], [375, 1035, 0.78],
  ];
  palms.forEach(([x, y, s]) => drawPlusArenaPalm(x, y, s));

  const pads = [
    [495, 640, -0.55], [730, 620, 0.9], [1135, 610, 0.15], [1560, 610, 0.05],
    [1815, 1000, -0.4], [395, 925, 0.2], [2050, 920, 0.35],
  ];
  pads.forEach(([x, y, angle], index) => drawPlusVillageStripedPad(x, y, angle, index));

  ctx.save();
  ctx.fillStyle = "#e7d1a7";
  for (let i = 0; i < 7; i++) {
    const x = 310 + i * 280;
    roundRect(ctx, x, 1260 + (i % 2) * 12, 155, 32, 8);
    ctx.fill();
  }
  ctx.restore();
}

function drawPlusVillageBuilding(x, y, w, h, angle = 0, seed = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "rgba(47,77,88,0.24)";
  roundRect(ctx, -w / 2 + 18, -h / 2 + 18, w, h, 6);
  ctx.fill();
  ctx.fillStyle = ["#d8e2dd", "#e5e0d6", "#cdd6d8", "#efe7d8"][seed % 4];
  roundRect(ctx, -w / 2, -h / 2, w, h, 7);
  ctx.fill();
  ctx.fillStyle = seed % 2 ? "#8b9191" : "#a0a6a2";
  ctx.beginPath();
  ctx.moveTo(-w / 2, -h / 2);
  ctx.lineTo(0, -h / 2 - Math.min(w, h) * 0.28);
  ctx.lineTo(w / 2, -h / 2);
  ctx.lineTo(w / 2, h / 2);
  ctx.lineTo(-w / 2, h / 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -h / 2 - Math.min(w, h) * 0.25);
  ctx.lineTo(0, h / 2);
  ctx.stroke();
  ctx.restore();
}

function drawPlusVillageStripedPad(x, y, angle = 0, seed = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#fff7e7";
  roundRect(ctx, -48, -34, 96, 68, 8);
  ctx.fill();
  for (let i = -48; i < 48; i += 24) {
    ctx.fillStyle = (i / 24 + seed) % 2 ? "#e33434" : "#f7f7f7";
    ctx.fillRect(i, -34, 20, 68);
  }
  ctx.restore();
}

function drawPlusAerialMazeBase() {
  const field = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
  field.addColorStop(0, "#263726");
  field.addColorStop(0.48, "#466b3a");
  field.addColorStop(1, "#1f2f22");
  ctx.fillStyle = field;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);

  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.strokeStyle = "#111714";
  ctx.lineWidth = 48;
  ctx.beginPath();
  ctx.moveTo(0, 128);
  ctx.lineTo(1010, 40);
  ctx.lineTo(2440, 118);
  ctx.stroke();
  ctx.lineWidth = 36;
  ctx.beginPath();
  ctx.moveTo(140, 0);
  ctx.lineTo(420, 500);
  ctx.stroke();
  ctx.restore();

  drawPlusAerialWater(335, 890, 70, 170, -0.08);
  drawPlusAerialWater(2160, 720, 90, 245, 0.02);
  drawPlusAerialForest(2050, 1160, 380, 260);
  drawPlusAerialForest(150, 1330, 260, 160);
  drawPlusAerialPaddock();
  drawPlusAerialInfieldIslands();
}

function drawPlusAerialPaddock() {
  ctx.save();
  ctx.translate(1570, 210);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  roundRect(ctx, -270, -34, 560, 180, 10);
  ctx.fill();
  ctx.fillStyle = "#d6d9d2";
  roundRect(ctx, -250, -60, 330, 122, 8);
  ctx.fill();
  ctx.fillStyle = "#11151c";
  roundRect(ctx, 15, -76, 210, 132, 8);
  ctx.fill();
  ctx.fillStyle = "#c9cdd0";
  for (let i = 0; i < 11; i++) {
    ctx.fillRect(45 + (i % 4) * 38, -48 + Math.floor(i / 4) * 34, 24, 7);
  }
  ctx.fillStyle = "#edf0ed";
  for (let i = 0; i < 18; i++) {
    ctx.fillRect(-230 + (i % 9) * 44, 86 + Math.floor(i / 9) * 28, 24, 11);
  }
  ctx.restore();

  drawBillboard(900, 345, "START", "#4cff48");
  drawSpectatorStand(785, 215, 420, 70, "PLUS 6");
  drawSpectatorStand(1985, 355, 420, 70, "DZ RACING");
}

function drawPlusAerialInfieldIslands() {
  const islands = [
    [640, 560, 110, 300, -0.04], [870, 685, 95, 355, 0.04], [1110, 670, 90, 325, -0.03],
    [1335, 660, 80, 250, 0.22], [1560, 670, 78, 210, -0.18], [1760, 665, 95, 270, 0.28],
    [670, 1010, 110, 275, -0.18], [1035, 1045, 110, 190, 0.06], [1390, 1040, 84, 175, -0.06],
    [1780, 1040, 116, 180, 0.12], [2060, 470, 118, 315, -0.02],
  ];
  islands.forEach(([x, y, rx, ry, rot], index) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    const g = ctx.createLinearGradient(-rx, -ry, rx, ry);
    g.addColorStop(0, index % 2 ? "#7dba56" : "#91cf61");
    g.addColorStop(1, "#346d32");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(23,34,23,0.35)";
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.restore();
  });
}

function drawPlusAerialWater(x, y, rx, ry, rot = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.fillStyle = "#1d2b2e";
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(212,187,151,0.5)";
  ctx.lineWidth = 12;
  ctx.stroke();
  ctx.restore();
}

function drawPlusAerialForest(x, y, w, h) {
  ctx.save();
  ctx.globalAlpha = 0.96;
  for (let i = 0; i < 52; i++) {
    const px = x - w / 2 + ((i * 53) % w);
    const py = y - h / 2 + ((i * 91) % h);
    ctx.fillStyle = ["#203c22", "#385b2a", "#6a522d", "#74452c"][i % 4];
    ctx.beginPath();
    ctx.arc(px, py, 18 + (i % 5) * 4, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawPlusFigureEightBase() {
  const sand = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
  sand.addColorStop(0, "#d8c48a");
  sand.addColorStop(0.48, "#cbb171");
  sand.addColorStop(1, "#b9985c");
  ctx.fillStyle = sand;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);

  ctx.save();
  ctx.globalAlpha = 0.13;
  ctx.fillStyle = "#746342";
  for (let i = 0; i < 30; i++) {
    const x = 95 + ((i * 251) % (WORLD.w - 190));
    const y = 80 + ((i * 173) % (WORLD.h - 170));
    ctx.beginPath();
    ctx.ellipse(x, y, 92 + (i % 4) * 22, 34 + (i % 3) * 13, i * 0.38, 0, TAU);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "#ffdf54";
  ctx.beginPath();
  ctx.arc(1214, 607, 112, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(20,20,20,0.34)";
  ctx.lineWidth = 3;
  ctx.setLineDash([20, 16]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  drawPlusArenaPalm(180, 1225, 0.92);
  drawPlusArenaPalm(500, 180, 0.68);
  drawPlusArenaPalm(1290, 165, 0.78);
  drawPlusArenaPalm(2090, 250, 0.76);
  drawPlusArenaPalm(2140, 1140, 0.82);
  drawBillboard(1060, 1365, "PLUS 3", "#ffd64d");
}

function drawPlusFigureEightGuide() {
  ctx.beginPath();
  ctx.moveTo(350, 740);
  ctx.bezierCurveTo(420, 430, 760, 285, 1095, 495);
  ctx.bezierCurveTo(1340, 650, 1440, 910, 1780, 1015);
  ctx.bezierCurveTo(2135, 1125, 2320, 815, 2190, 595);
  ctx.bezierCurveTo(2065, 360, 1705, 285, 1270, 540);
  ctx.bezierCurveTo(1065, 660, 930, 885, 620, 1035);
  ctx.bezierCurveTo(390, 1145, 235, 965, 350, 740);
}

function drawPlusArenaBase() {
  const sand = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
  sand.addColorStop(0, "#d7c085");
  sand.addColorStop(0.46, "#c7ae72");
  sand.addColorStop(1, "#b99b5f");
  ctx.fillStyle = sand;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#7d6a45";
  for (let i = 0; i < 34; i++) {
    const x = 80 + ((i * 233) % (WORLD.w - 160));
    const y = 70 + ((i * 157) % (WORLD.h - 140));
    ctx.beginPath();
    ctx.ellipse(x, y, 100 + (i % 5) * 22, 42 + (i % 3) * 15, i * 0.43, 0, TAU);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.strokeStyle = "rgba(68, 132, 79, 0.62)";
  ctx.lineWidth = 36;
  drawPlusArenaOvalGuide();
  ctx.stroke();

  ctx.strokeStyle = "rgba(28, 31, 34, 0.48)";
  ctx.lineWidth = 174;
  drawPlusArenaOvalGuide();
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 2;
  for (const lane of [-48, 0, 48]) {
    ctx.save();
    ctx.translate(0, lane * 0.15);
    drawPlusArenaOvalGuide();
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  drawPlusArenaPalm(180, 1310, 0.95);
  drawPlusArenaPalm(520, 145, 0.72);
  drawPlusArenaPalm(1290, 130, 0.82);
  drawPlusArenaPalm(2070, 255, 0.8);
  drawPlusArenaPalm(2140, 1115, 0.84);
  drawBillboard(1040, 1350, "PLUS 2", "#ffd64d");
  drawBillboard(1640, 300, "PONTE", "#48d8ff");
}

function drawPlusArenaOvalGuide() {
  ctx.beginPath();
  ctx.moveTo(310, 1060);
  ctx.bezierCurveTo(120, 790, 195, 380, 560, 270);
  ctx.bezierCurveTo(900, 165, 1060, 360, 1260, 350);
  ctx.bezierCurveTo(1465, 340, 1630, 160, 1980, 245);
  ctx.bezierCurveTo(2335, 335, 2385, 810, 2170, 1110);
  ctx.bezierCurveTo(1920, 1425, 1535, 1260, 1260, 1195);
  ctx.bezierCurveTo(980, 1130, 610, 1395, 310, 1060);
}

function drawPlusArenaPalm(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.strokeStyle = "rgba(78, 95, 55, 0.42)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(0, 42);
  ctx.lineTo(10, -14);
  ctx.stroke();
  ctx.fillStyle = "#20895e";
  for (let i = 0; i < 8; i++) {
    ctx.rotate(TAU / 8);
    ctx.beginPath();
    ctx.ellipse(0, -30, 12, 42, 0, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawRcAerialBase() {
  const grass = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
  grass.addColorStop(0, "#235f2d");
  grass.addColorStop(0.52, "#174a22");
  grass.addColorStop(1, "#0d3218");
  ctx.fillStyle = grass;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);

  ctx.fillStyle = "rgba(0,0,0,0.28)";
  roundRect(ctx, 94, 118, WORLD.w - 188, WORLD.h - 260, 38);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.34)";
  ctx.lineWidth = 8;
  ctx.stroke();

  ctx.save();
  ctx.globalAlpha = 0.26;
  for (let i = 0; i < 72; i++) {
    const x = 80 + (i * 171) % (WORLD.w - 160);
    const y = 70 + (i * 91) % (WORLD.h - 190);
    drawRcBush(x, y, 0.54 + (i % 4) * 0.08);
  }
  ctx.restore();

  const islands = [
    [520, 500, 112, 82, -0.15], [825, 760, 88, 80, 0.18], [1250, 690, 132, 82, -0.24],
    [1580, 900, 80, 62, 0.1], [1880, 615, 138, 78, 0.18], [2055, 995, 118, 86, -0.08],
    [675, 1130, 132, 74, 0.12], [1430, 1180, 118, 72, -0.14],
  ];
  islands.forEach((island) => drawRcGrassIsland(...island));

  drawSpectatorStand(690, 88, 410, 58, "DZ RACING 4");
  drawSpectatorStand(1810, 88, 410, 58, "RC AERIAL");
  drawRcPitBuilding(1260, 1490, 760, 92);
}

function drawMazeCircuitBase() {
  const grass = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
  grass.addColorStop(0, "#1f7c38");
  grass.addColorStop(0.5, "#0f5d2e");
  grass.addColorStop(1, "#0b3d21");
  ctx.fillStyle = grass;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);

  ctx.fillStyle = "rgba(2,8,8,0.28)";
  roundRect(ctx, 85, 105, WORLD.w - 170, WORLD.h - 210, 34);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.48)";
  ctx.lineWidth = 7;
  ctx.stroke();

  ctx.save();
  ctx.globalAlpha = 0.3;
  for (let i = 0; i < 58; i++) {
    const x = 120 + (i * 197) % (WORLD.w - 240);
    const y = 145 + (i * 107) % (WORLD.h - 290);
    drawRcBush(x, y, 0.56 + (i % 3) * 0.1);
  }
  ctx.restore();

  const islands = [
    [420, 565, 130, 140, 0.18], [785, 660, 90, 175, -0.16], [1235, 505, 108, 150, 0.22],
    [1680, 550, 158, 105, -0.1], [2055, 675, 120, 172, 0.16], [1510, 960, 155, 92, 0.24],
    [965, 1080, 122, 102, -0.18], [525, 1125, 112, 95, 0.08],
  ];
  islands.forEach((island) => drawRcGrassIsland(...island));

  drawBillboard(365, 168, "LABIRINTO", "#ffd64d");
  drawBillboard(2100, 1435, "SIGA AS SETAS", "#48d8ff");
  drawRcPitBuilding(1260, 1480, 600, 84);
}

function drawRcGrassIsland(x, y, rx, ry, rot = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  const fill = ctx.createRadialGradient(-rx * 0.25, -ry * 0.22, 4, 0, 0, Math.max(rx, ry));
  fill.addColorStop(0, "#75cc51");
  fill.addColorStop(0.62, "#3c922e");
  fill.addColorStop(1, "#1f641f");
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.46)";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.restore();
}

function drawRcBush(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "#123719";
  ctx.beginPath();
  ctx.arc(0, 0, 26, 0, TAU);
  ctx.arc(22, -8, 22, 0, TAU);
  ctx.arc(-20, -5, 21, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#2c8a34";
  ctx.beginPath();
  ctx.arc(0, -7, 20, 0, TAU);
  ctx.arc(16, 1, 18, 0, TAU);
  ctx.arc(-16, 2, 17, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawRcPitBuilding(x, y, w, h) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  roundRect(ctx, -w / 2 + 18, -h / 2 + 14, w, h, 8);
  ctx.fill();
  ctx.fillStyle = "#dfe5e8";
  roundRect(ctx, -w / 2, -h / 2, w, h, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.34)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = "#8f979b";
  for (let i = 0; i < 6; i++) {
    ctx.fillRect(-w / 2 + 60 + i * 92, -h / 2 + 18, 48, h - 36);
  }
  ctx.restore();
}

function drawParkCircuitBase() {
  const grass = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
  grass.addColorStop(0, "#65c640");
  grass.addColorStop(0.48, "#47a832");
  grass.addColorStop(1, "#2c7f2f");
  ctx.fillStyle = grass;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);

  ctx.save();
  ctx.globalAlpha = 0.22;
  for (let y = 150; y < WORLD.h - 120; y += 155) {
    ctx.fillStyle = y % 310 === 0 ? "#7ed45a" : "#3b932d";
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.bezierCurveTo(540, y - 32, 960, y + 34, 1420, y - 8);
    ctx.bezierCurveTo(1760, y - 36, 2070, y + 18, WORLD.w - 80, y - 18);
    ctx.lineTo(WORLD.w - 80, y + 72);
    ctx.bezierCurveTo(1880, y + 102, 1390, y + 44, 900, y + 78);
    ctx.bezierCurveTo(520, y + 104, 240, y + 70, 80, y + 92);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  const runoffs = [
    [235, 605, 150, 130, -0.12], [305, 1000, 145, 120, 0.28],
    [700, 1225, 155, 128, 0.16], [1180, 1350, 190, 92, -0.04],
    [1820, 1140, 170, 126, -0.18], [2225, 970, 158, 132, 0.1],
    [2170, 540, 165, 126, -0.22], [1570, 330, 170, 108, 0.1],
    [900, 300, 150, 104, -0.2], [540, 520, 130, 92, 0.24],
  ];
  for (const pad of runoffs) drawParkRunoff(...pad);

  drawStadiumWaterFeature(930, 780, 120, 74, -0.16);
  drawStadiumWaterFeature(1780, 955, 94, 58, 0.2);

  drawStadiumStripedPad(505, 435, -0.05);
  drawStadiumStripedPad(1520, 225, 0.02);
  drawStadiumStripedPad(2050, 430, 0.08);
  drawStadiumStripedPad(720, 1040, -0.08);
  drawStadiumStripedPad(1640, 1305, 0.04);

  drawParkBuilding(520, 240, 0.04, 0.86);
  drawParkBuilding(1160, 1480, 0, 1.12);
  drawParkBuilding(1990, 1250, -0.06, 0.9);
  drawSpectatorStand(690, 118, 430, 66, "DZ RACING");
  drawSpectatorStand(1720, 118, 430, 66, "OFICIAL");
  drawSpectatorStand(1320, 1510, 540, 70, "PIT LANE");

  const trees = [
    [150, 140], [300, 160], [495, 135], [880, 150], [1540, 145], [2020, 170], [2250, 180],
    [145, 1440], [365, 1415], [580, 1470], [1910, 1440], [2140, 1410], [2280, 1460],
    [116, 680], [128, 930], [2240, 705], [2285, 1180], [1210, 126], [1330, 1470],
    [760, 250], [1840, 300], [1020, 1220], [1740, 1310],
  ];
  for (let i = 0; i < trees.length; i++) {
    const [x, y] = trees[i];
    drawStadiumTree(x, y, 0.78 + (i % 3) * 0.08);
  }
}

function drawParkRunoff(x, y, rx, ry, rot = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  const sand = ctx.createLinearGradient(-rx, -ry, rx, ry);
  sand.addColorStop(0, "#f4b25d");
  sand.addColorStop(1, "#d9823e");
  ctx.fillStyle = sand;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.26)";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.restore();
}

function drawParkBuilding(x, y, angle = 0, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(-92, 40, 184, 40);
  ctx.fillStyle = "#d7d9dc";
  roundRect(ctx, -78, -44, 156, 88, 6);
  ctx.fill();
  const roof = ctx.createLinearGradient(-80, -70, 80, -22);
  roof.addColorStop(0, "#ffffff");
  roof.addColorStop(1, "#aeb3b8");
  ctx.fillStyle = roof;
  ctx.beginPath();
  ctx.moveTo(-92, -44);
  ctx.lineTo(-54, -82);
  ctx.lineTo(92, -66);
  ctx.lineTo(78, -44);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#9aa1a8";
  ctx.fillRect(-44, -14, 34, 38);
  ctx.fillRect(16, -18, 40, 28);
  ctx.strokeStyle = "rgba(61,68,72,0.38)";
  ctx.lineWidth = 3;
  ctx.strokeRect(-78, -44, 156, 88);
  ctx.restore();
}

function drawStadiumRacewayBase() {
  const grass = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
  grass.addColorStop(0, "#2c7e2e");
  grass.addColorStop(0.45, "#58b447");
  grass.addColorStop(1, "#226b2b");
  ctx.fillStyle = grass;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);

  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.16)";
  for (let y = 135; y < WORLD.h - 120; y += 142) {
    ctx.beginPath();
    ctx.moveTo(115, y);
    ctx.bezierCurveTo(640, y - 28, 1160, y + 36, WORLD.w - 115, y - 12);
    ctx.lineTo(WORLD.w - 115, y + 48);
    ctx.bezierCurveTo(1180, y + 88, 650, y + 20, 115, y + 58);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  ctx.strokeStyle = "rgba(255,255,255,0.78)";
  ctx.lineWidth = 8;
  roundRect(ctx, 88, 76, WORLD.w - 176, WORLD.h - 152, 40);
  ctx.stroke();
  ctx.strokeStyle = "rgba(0,0,0,0.16)";
  ctx.lineWidth = 16;
  ctx.stroke();

  drawStadiumWaterFeature(950, 610, 115, 76, -0.2);
  drawStadiumWaterFeature(1820, 1010, 92, 55, 0.28);
  drawStadiumStripedPad(770, 470, -0.12);
  drawStadiumStripedPad(1335, 720, 0.1);
  drawStadiumStripedPad(555, 1125, -0.06);
  drawStadiumControlTower(1240, 1390);

  drawSpectatorStand(720, 135, 420, 68, "DZ");
  drawSpectatorStand(1700, 135, 420, 68, "RACING");
  drawSpectatorStand(980, 1485, 500, 72, "OFICIAL");
  drawSpectatorStand(1810, 1485, 430, 72, "CUP");
  drawStadiumSideStand(96, 760, -Math.PI / 2);
  drawStadiumSideStand(WORLD.w - 96, 760, Math.PI / 2);
  drawStadiumTreeBorder();
}

function drawStadiumWaterFeature(x, y, rx, ry, rot = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  const water = ctx.createRadialGradient(-rx * 0.3, -ry * 0.25, 10, 0, 0, Math.max(rx, ry));
  water.addColorStop(0, "#d9fbff");
  water.addColorStop(0.58, "#72d7ef");
  water.addColorStop(1, "#189abc");
  ctx.fillStyle = water;
  ctx.beginPath();
  ctx.moveTo(-rx, -ry * 0.7);
  ctx.lineTo(rx * 0.82, -ry * 0.58);
  ctx.lineTo(rx * 0.36, ry * 0.8);
  ctx.lineTo(-rx * 0.72, ry * 0.62);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.42)";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.restore();
}

function drawStadiumStripedPad(x, y, angle = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#f7f4e7";
  roundRect(ctx, -64, -22, 128, 44, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.18)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(-64, -22, 128, 44);
  ctx.clip();
  ctx.strokeStyle = "#ef3d43";
  ctx.lineWidth = 13;
  for (let x = -92; x < 96; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 28);
    ctx.lineTo(x + 58, -28);
    ctx.stroke();
  }
  ctx.restore();
}

function drawStadiumControlTower(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(0,0,0,0.24)";
  ctx.fillRect(-210, 35, 430, 48);
  ctx.fillStyle = "#d81922";
  roundRect(ctx, -210, -42, 420, 92, 10);
  ctx.fill();
  ctx.fillStyle = "#f7d479";
  roundRect(ctx, -175, -6, 350, 42, 6);
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.restore();
}

function drawStadiumSideStand(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawSpectatorStand(0, 0, 420, 66, "");
  ctx.restore();
}

function drawStadiumTreeBorder() {
  ctx.save();
  for (let i = 0; i < 52; i++) {
    const side = i % 4;
    const x = side < 2 ? 100 + ((i * 171) % (WORLD.w - 200)) : side === 2 ? 46 : WORLD.w - 46;
    const y = side < 2 ? (side === 0 ? 50 : WORLD.h - 50) : 110 + ((i * 137) % (WORLD.h - 220));
    drawStadiumTree(x, y, 0.78 + (i % 3) * 0.08);
  }
  ctx.restore();
}

function drawStadiumTree(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.16)";
  ctx.beginPath();
  ctx.ellipse(10, 13, 26, 15, 0.2, 0, TAU);
  ctx.fill();
  const colors = ["#116d28", "#1f8f38", "#2aa94a"];
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.arc(Math.cos(i * 1.26) * 16, Math.sin(i * 1.26) * 12, 18, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawRacewayPools() {
  ctx.save();
  const pools = [
    [780, 455, 210, 120, -0.18],
    [840, 860, 230, 145, 0.2],
    [1440, 470, 250, 130, 0.08],
    [1660, 900, 275, 150, -0.18],
    [2120, 650, 150, 310, 0.08],
  ];
  for (const [x, y, rx, ry, rot] of pools) {
    const water = ctx.createRadialGradient(x - rx * 0.2, y - ry * 0.2, 12, x, y, Math.max(rx, ry));
    water.addColorStop(0, "#d6fbff");
    water.addColorStop(0.58, "#9fdbe4");
    water.addColorStop(1, "#75b8c8");
    ctx.fillStyle = water;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rot, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(113,91,64,0.28)";
    ctx.lineWidth = 9;
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.34)";
    ctx.lineWidth = 4;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.ellipse(x + i * 18, y + i * 14, rx * 0.62, ry * 0.22, rot + i * 0.15, 0, Math.PI);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawRacewaySandTexture() {
  ctx.save();
  for (let i = 0; i < 64; i++) {
    const x = 120 + ((i * 181) % (WORLD.w - 240));
    const y = 120 + ((i * 127) % (WORLD.h - 240));
    ctx.strokeStyle = i % 2 ? "rgba(98,75,54,0.18)" : "rgba(255,238,194,0.16)";
    ctx.lineWidth = 3 + (i % 3);
    ctx.beginPath();
    ctx.moveTo(x - 44, y + Math.sin(i) * 10);
    ctx.quadraticCurveTo(x, y - 18, x + 52, y + Math.cos(i) * 12);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRacewayServicePads() {
  ctx.save();
  const pads = [
    [520, 350, -0.08], [910, 520, 0.28], [1540, 310, 0.12],
    [1710, 760, -0.35], [2070, 1020, 0.18], [1040, 1120, -0.25],
  ];
  for (const [x, y, a] of pads) drawRacewayShed(x, y, a, 0.72);
  ctx.restore();
}

function drawRacewayShed(x, y, angle = 0, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.fillRect(-54, 18, 118, 42);
  ctx.fillStyle = "#6d3a2b";
  roundRect(ctx, -52, -34, 104, 68, 6);
  ctx.fill();
  ctx.fillStyle = "#8a4b34";
  ctx.beginPath();
  ctx.moveTo(-66, -34);
  ctx.lineTo(-42, -58);
  ctx.lineTo(66, -50);
  ctx.lineTo(52, -34);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#2c3338";
  ctx.fillRect(-32, -12, 22, 28);
  ctx.fillRect(12, -14, 26, 20);
  ctx.strokeStyle = "rgba(255,230,190,0.22)";
  ctx.lineWidth = 3;
  ctx.strokeRect(-52, -34, 104, 68);
  ctx.restore();
}

function drawJungleRiver() {
  ctx.save();
  const river = ctx.createLinearGradient(0, 420, 0, 1120);
  river.addColorStop(0, "#9b7a3d");
  river.addColorStop(0.55, "#6f5a31");
  river.addColorStop(1, "#a37a3b");
  ctx.fillStyle = river;
  ctx.beginPath();
  ctx.moveTo(150, 850);
  ctx.bezierCurveTo(500, 720, 760, 920, 1080, 790);
  ctx.bezierCurveTo(1390, 660, 1640, 760, 2180, 650);
  ctx.lineTo(2240, 850);
  ctx.bezierCurveTo(1690, 940, 1370, 830, 1080, 980);
  ctx.bezierCurveTo(740, 1150, 480, 940, 160, 1080);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.34)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.moveTo(190, 890 + i * 26);
    ctx.bezierCurveTo(650, 760 + i * 28, 1060, 990 - i * 18, 1520, 780 + i * 20);
    ctx.bezierCurveTo(1780, 690 + i * 10, 1990, 740 + i * 18, 2190, 700 + i * 20);
    ctx.stroke();
  }
  ctx.restore();
}

function drawJungleWaterfall(x, y, w, h) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#223924";
  ctx.beginPath();
  ctx.moveTo(-w * 0.62, h * 0.95);
  ctx.lineTo(-w * 0.36, -h * 0.15);
  ctx.lineTo(w * 0.4, -h * 0.2);
  ctx.lineTo(w * 0.66, h * 0.95);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#6b5f45";
  ctx.beginPath();
  ctx.ellipse(0, h * 0.98, w * 0.7, 38, 0, 0, TAU);
  ctx.fill();

  const water = ctx.createLinearGradient(0, -h * 0.12, 0, h * 0.86);
  water.addColorStop(0, "rgba(210,248,255,0.92)");
  water.addColorStop(0.42, "rgba(105,202,230,0.72)");
  water.addColorStop(1, "rgba(255,255,255,0.28)");
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = water;
    ctx.lineWidth = 13 - i;
    ctx.beginPath();
    const xx = -42 + i * 21;
    ctx.moveTo(xx, -h * 0.08);
    ctx.bezierCurveTo(xx + 16, h * 0.18, xx - 18, h * 0.48, xx + 10, h * 0.86);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(255,255,255,0.36)";
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.ellipse(-80 + i * 15, h * 0.9 + (i % 3) * 8, 20, 7, i * 0.25, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawJungleFloorTexture() {
  ctx.save();
  for (let i = 0; i < 95; i++) {
    const x = 130 + ((i * 149) % (WORLD.w - 260));
    const y = 120 + ((i * 211) % (WORLD.h - 240));
    ctx.fillStyle = i % 4 === 0 ? "rgba(58,93,41,0.42)" : "rgba(16,43,25,0.48)";
    ctx.beginPath();
    ctx.ellipse(x, y, 44 + (i % 5) * 9, 13 + (i % 4) * 4, (i % 8) * 0.35, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawJungleCanopy() {
  ctx.save();
  ctx.globalAlpha = 0.9;
  for (let i = 0; i < 30; i++) {
    const edge = i % 4;
    const x = edge < 2 ? 70 + ((i * 193) % (WORLD.w - 140)) : edge === 2 ? 80 : WORLD.w - 80;
    const y = edge < 2 ? (edge === 0 ? 70 : WORLD.h - 70) : 110 + ((i * 157) % (WORLD.h - 220));
    drawJungleLeafCluster(x, y, 0.9 + (i % 5) * 0.14, i * 0.35);
  }
  ctx.strokeStyle = "rgba(52,35,18,0.76)";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  for (let i = 0; i < 12; i++) {
    const x = 130 + i * 190;
    ctx.beginPath();
    ctx.moveTo(x, 70);
    ctx.bezierCurveTo(x + 80, 230, x - 70, 310, x + 20, 470);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWater() {
  ctx.strokeStyle = "rgba(255,255,255,0.58)";
  ctx.lineWidth = 3;
  for (let y = 80; y < WORLD.h; y += 160) {
    ctx.beginPath();
    for (let x = 0; x <= WORLD.w; x += 36) {
      const wave = Math.sin(x * 0.02 + y * 0.01 + state.time * 1.3) * 8;
      if (x === 0) ctx.moveTo(x, y + wave);
      else ctx.lineTo(x, y + wave);
    }
    ctx.stroke();
  }
}

function drawLavaSea() {
  ctx.fillStyle = "#1b1110";
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);
  for (let i = 0; i < 46; i++) {
    const x = (i * 173 + Math.sin(state.time + i) * 40) % WORLD.w;
    const y = (i * 97 + Math.cos(state.time * 0.7 + i) * 30) % WORLD.h;
    ctx.fillStyle = i % 2 ? "rgba(255,88,32,0.58)" : "rgba(255,190,48,0.38)";
    ctx.beginPath();
    ctx.ellipse(x, y, 70, 18, i * 0.4, 0, TAU);
    ctx.fill();
  }
}

function drawGrassPattern() {
  for (let i = 0; i < 120; i++) {
    const x = 150 + ((i * 131) % (WORLD.w - 300));
    const y = 140 + ((i * 89) % (WORLD.h - 280));
    ctx.fillStyle = i % 3 === 0 ? "#2f9e35" : "#63d344";
    ctx.fillRect(x, y, 8, 16);
  }
}

function drawModelFloor() {
  const colors = ["#3ccf7d", "#28a6dc", "#f5c64d", "#e76a6a", "#7e5bd6"];
  for (let y = 90; y < WORLD.h - 80; y += 180) {
    for (let x = 90; x < WORLD.w - 80; x += 220) {
      ctx.fillStyle = colors[(Math.floor(x / 220) + Math.floor(y / 180)) % colors.length];
      ctx.globalAlpha = 0.58;
      ctx.fillRect(x, y, 210, 170);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.16)";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, 210, 170);
    }
  }
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < 24; i++) {
    ctx.fillRect(160 + (i * 197) % 2100, 140 + (i * 113) % 1260, 82, 22);
  }
}

function drawCityBlocks() {
  ctx.save();
  ctx.fillStyle = "rgba(20,22,25,0.34)";
  for (let i = 0; i < 18; i++) {
    const x = 135 + ((i * 257) % (WORLD.w - 270));
    const y = 125 + ((i * 173) % (WORLD.h - 250));
    ctx.beginPath();
    ctx.ellipse(x, y, 78 + (i % 4) * 18, 18, (i % 7) * 0.35, 0, TAU);
    ctx.fill();
  }
  for (let y = 140; y < WORLD.h - 140; y += 185) {
    for (let x = 150; x < WORLD.w - 160; x += 210) {
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(x + 16, y + 20, 120, 92);
      ctx.fillStyle = "#3a3e42";
      ctx.fillRect(x, y, 120, 92);
      ctx.fillStyle = "#484d52";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 22, y - 18);
      ctx.lineTo(x + 142, y - 18);
      ctx.lineTo(x + 120, y);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#252a2e";
      ctx.beginPath();
      ctx.moveTo(x + 120, y);
      ctx.lineTo(x + 142, y - 18);
      ctx.lineTo(x + 142, y + 74);
      ctx.lineTo(x + 120, y + 92);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#272a2e";
      ctx.fillRect(x + 12, y + 12, 28, 20);
      ctx.fillRect(x + 58, y + 18, 34, 18);
      ctx.fillStyle = "#101317";
      ctx.fillRect(x + 16, y + 52, 20, 30);
      ctx.fillRect(x + 72, y + 55, 32, 24);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.strokeRect(x, y, 120, 92);
    }
  }
  ctx.restore();
}

function drawAncientBase() {
  const stone = ctx.createLinearGradient(0, 90, WORLD.w, WORLD.h - 90);
  stone.addColorStop(0, "#807766");
  stone.addColorStop(0.46, "#b5a484");
  stone.addColorStop(1, "#5f594d");
  ctx.fillStyle = stone;
  roundRect(ctx, 95, 85, WORLD.w - 190, WORLD.h - 170, 34);
  ctx.fill();

  drawAncientCourtyard();
  drawAncientMossPatches();
  drawAncientTerraceShadows();
}

function drawAncientCourtyard() {
  ctx.save();
  ctx.fillStyle = "rgba(220,205,172,0.28)";
  for (let y = 145; y < WORLD.h - 150; y += 136) {
    for (let x = 145; x < WORLD.w - 150; x += 164) {
      ctx.fillRect(x, y, 132, 104);
      ctx.strokeStyle = "rgba(54,50,44,0.2)";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, 132, 104);
    }
  }
  ctx.restore();
}

function drawAncientMossPatches() {
  ctx.save();
  for (let i = 0; i < 44; i++) {
    const x = 130 + ((i * 233) % (WORLD.w - 260));
    const y = 125 + ((i * 181) % (WORLD.h - 250));
    ctx.fillStyle = i % 2 ? "rgba(64,117,54,0.42)" : "rgba(35,85,45,0.36)";
    ctx.beginPath();
    ctx.ellipse(x, y, 54 + (i % 5) * 8, 12 + (i % 4) * 4, i * 0.31, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawAncientTerraceShadows() {
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.17)";
  roundRect(ctx, 142, 1080, 520, 150, 8);
  ctx.fill();
  roundRect(ctx, 1640, 190, 530, 140, 8);
  ctx.fill();
  roundRect(ctx, 940, 640, 410, 115, 8);
  ctx.fill();
  ctx.restore();
}

function drawMorroBase() {
  const skyRock = ctx.createLinearGradient(0, 0, 0, WORLD.h);
  skyRock.addColorStop(0, "#6d7480");
  skyRock.addColorStop(0.26, "#9e866f");
  skyRock.addColorStop(0.64, "#8d5938");
  skyRock.addColorStop(1, "#4b3329");
  ctx.fillStyle = skyRock;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);
  drawMorroDistantRanges();
  drawMorroPlateau();
  drawMorroDryWash();
  drawMorroRockTexture();
}

function drawMorroDistantRanges() {
  ctx.save();
  const ranges = [
    { y: 180, color: "rgba(78,90,104,0.78)", amp: 120, step: 280 },
    { y: 270, color: "rgba(91,82,78,0.78)", amp: 150, step: 240 },
    { y: 390, color: "rgba(99,67,52,0.72)", amp: 190, step: 210 },
  ];
  for (const range of ranges) {
    ctx.fillStyle = range.color;
    ctx.beginPath();
    ctx.moveTo(0, range.y + range.amp);
    for (let x = 0; x <= WORLD.w + range.step; x += range.step) {
      const peak = range.y - ((x / range.step) % 3) * 34 - range.amp * (0.35 + ((x / range.step) % 2) * 0.28);
      ctx.lineTo(x + range.step * 0.5, peak);
      ctx.lineTo(x + range.step, range.y + range.amp * 0.3);
    }
    ctx.lineTo(WORLD.w, WORLD.h);
    ctx.lineTo(0, WORLD.h);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawMorroPlateau() {
  const plateau = ctx.createLinearGradient(0, 120, WORLD.w, WORLD.h);
  plateau.addColorStop(0, "#cf8c4f");
  plateau.addColorStop(0.42, "#a2603c");
  plateau.addColorStop(1, "#5a3a2d");
  ctx.fillStyle = plateau;
  roundRect(ctx, 82, 120, WORLD.w - 164, WORLD.h - 225, 38);
  ctx.fill();
  ctx.strokeStyle = "rgba(42,28,22,0.52)";
  ctx.lineWidth = 22;
  ctx.stroke();
}

function drawFantasyParkBase() {
  const pad = 98;
  const grass = ctx.createLinearGradient(0, pad, WORLD.w, WORLD.h - pad);
  grass.addColorStop(0, "#72d97c");
  grass.addColorStop(0.55, "#43b95d");
  grass.addColorStop(1, "#2a9344");
  ctx.fillStyle = grass;
  roundRect(ctx, pad, pad, WORLD.w - pad * 2, WORLD.h - pad * 2, 34);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.28)";
  for (let i = 0; i < 15; i++) {
    const x = 170 + (i * 277) % 2150;
    const y = 170 + (i * 191) % 1230;
    roundRect(ctx, x, y, 170 + (i % 3) * 34, 72, 16);
    ctx.fill();
  }

  const buildingColors = ["#ff985c", "#ffd15e", "#7fdcff", "#ff7ec8", "#b4f06c", "#ffffff"];
  for (let i = 0; i < 14; i++) {
    const x = 190 + (i * 337) % 2060;
    const y = 170 + (i * 221) % 1210;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    roundRect(ctx, 10, 28, 112, 74, 8);
    ctx.fill();
    ctx.fillStyle = buildingColors[i % buildingColors.length];
    roundRect(ctx, -46, -36, 92, 72, 8);
    ctx.fill();
    ctx.fillStyle = i % 2 ? "#f35d4d" : "#2f77d5";
    ctx.beginPath();
    ctx.moveTo(-54, -36);
    ctx.lineTo(0, -76);
    ctx.lineTo(54, -36);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.78)";
    for (let w = -26; w <= 26; w += 26) {
      roundRect(ctx, w - 8, -16, 16, 20, 3);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawKartArenaBase() {
  const pad = 98;
  ctx.fillStyle = "#edc18d";
  roundRect(ctx, pad, pad, WORLD.w - pad * 2, WORLD.h - pad * 2, 30);
  ctx.fill();
  ctx.strokeStyle = "rgba(130,74,42,0.28)";
  ctx.lineWidth = 5;
  for (let y = 160; y < WORLD.h - 130; y += 62) {
    ctx.beginPath();
    ctx.moveTo(130, y);
    ctx.lineTo(WORLD.w - 130, y + Math.sin(y * 0.02) * 10);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(255,255,255,0.26)";
  roundRect(ctx, 160, 190, 300, 120, 14);
  ctx.fill();
  ctx.fillStyle = "#5a3424";
  for (let i = 0; i < 18; i++) {
    const x = 170 + (i * 137) % 2140;
    const y = i % 2 ? 145 : 1420;
    drawTireStack(x, y, 0.62);
  }
}

function drawMorroDryWash() {
  ctx.save();
  ctx.strokeStyle = "rgba(64,39,29,0.22)";
  ctx.lineWidth = 38;
  ctx.lineCap = "round";
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(120, 520 + i * 175);
    ctx.bezierCurveTo(620, 440 + i * 70, 920, 770 + i * 35, 1320, 610 + i * 70);
    ctx.bezierCurveTo(1660, 475 + i * 52, 1920, 780 + i * 45, 2280, 680 + i * 56);
    ctx.stroke();
  }
  ctx.restore();
}

function drawMorroRockTexture() {
  ctx.save();
  for (let i = 0; i < 42; i++) {
    const x = 120 + ((i * 211) % (WORLD.w - 240));
    const y = 140 + ((i * 137) % (WORLD.h - 300));
    ctx.strokeStyle = i % 2 ? "rgba(39,27,24,0.32)" : "rgba(255,196,126,0.18)";
    ctx.lineWidth = 3 + (i % 4);
    ctx.beginPath();
    ctx.moveTo(x - 42, y + (i % 5) * 8);
    ctx.lineTo(x + 24, y - 18);
    ctx.lineTo(x + 70, y - 8 + (i % 3) * 12);
    ctx.stroke();
  }
  ctx.restore();
}

function drawArenaSand() {
  ctx.strokeStyle = "rgba(95,55,29,0.22)";
  ctx.lineWidth = 10;
  for (let i = 0; i < 22; i++) {
    ctx.beginPath();
    ctx.ellipse(220 + (i * 157) % 2050, 180 + (i * 193) % 1220, 90, 24, i * 0.3, 0, TAU);
    ctx.stroke();
  }
}

function drawMetalPlates() {
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  for (let y = 130; y < WORLD.h - 130; y += 90) {
    for (let x = 130; x < WORLD.w - 130; x += 150) {
      ctx.fillRect(x, y, 126, 64);
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(x + 8, y + 8, 12, 12);
      ctx.fillRect(x + 106, y + 44, 12, 12);
      ctx.fillStyle = "rgba(255,255,255,0.05)";
    }
  }
}

function drawCanyonBands() {
  for (let i = 0; i < 34; i++) {
    ctx.strokeStyle = i % 2 ? "rgba(93,55,31,0.32)" : "rgba(223,177,108,0.34)";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(80, 130 + i * 45);
    ctx.bezierCurveTo(650, 80 + i * 62, 1160, 210 + i * 38, WORLD.w - 80, 120 + i * 45);
    ctx.stroke();
  }
}

function drawDirt() {
  if (["spy", "ruins", "death"].includes(state.track.level.theme)) return;
  ctx.fillStyle = "rgba(122, 79, 43, 0.16)";
  for (let i = 0; i < 34; i++) {
    const x = 190 + ((i * 337) % (WORLD.w - 380));
    const y = 180 + ((i * 197) % (WORLD.h - 360));
    ctx.beginPath();
    ctx.ellipse(x, y, 70, 18, (i % 5) * 0.55, 0, TAU);
    ctx.fill();
  }
}

function drawCliffs() {
  if (!state.track.level.cliffs) return;
  const track = state.track;
  const theme = track.level.theme;
  for (let d = 0; d < track.length; d += 74) {
    for (const side of [-1, 1]) {
      const p = pointAt(track, d, side * (track.level.road / 2 + 92));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = theme === "morro" ? (side > 0 ? "#8e5633" : "#3b2924") : side > 0 ? "#5b3a24" : "#2f241f";
      ctx.beginPath();
      ctx.moveTo(-38, 0);
      ctx.lineTo(38, 0);
      ctx.lineTo(20, 54 * side);
      ctx.lineTo(-22, 48 * side);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = theme === "morro" ? "rgba(255,187,108,0.24)" : "rgba(255,255,255,0.16)";
      ctx.fillRect(-28, -3, 56, 5);
      if (theme === "morro") {
        ctx.strokeStyle = "rgba(30,18,14,0.32)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-24, 10 * side);
        ctx.lineTo(0, 42 * side);
        ctx.moveTo(16, 6 * side);
        ctx.lineTo(26, 44 * side);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
}

function closedPath(g, points) {
  g.beginPath();
  points.forEach((p, i) => {
    if (i === 0) g.moveTo(p.x, p.y);
    else g.lineTo(p.x, p.y);
  });
  g.closePath();
}

function drawTrack() {
  const track = state.track;
  const road = track.level.road;
  const theme = track.level.theme;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  drawTrackDropShadow(track, road, theme);
  drawShortcutRoads(track);

  if (track.level.plusFigureEightBase) {
    drawPlusFigureEightTrack(track, road, theme);
    return;
  }

  if (["amc", "model", "neonworkshop"].includes(theme)) {
    ctx.strokeStyle = theme === "amc" ? "rgba(36,226,77,0.52)" : "rgba(72,216,255,0.22)";
    ctx.lineWidth = road + 86;
    closedPath(ctx, track.points);
    ctx.stroke();
  }

  ctx.strokeStyle = theme === "death" ? "rgba(255,84,28,0.28)" : "rgba(0,0,0,0.30)";
  ctx.lineWidth = road + 58;
  closedPath(ctx, track.points);
  ctx.stroke();

  const wall = theme === "racetrack" ? "#f2f2ec" : theme === "fantasy" ? "#f4f7fb" : theme === "kartarena" ? "#8d373f" : theme === "waters" ? "#7b4b2b" : theme === "morro" ? "#3e2920" : theme === "ancient" ? "#6c6252" : theme === "jungle" ? "#4c341f" : theme === "canyon" ? "#6d4b32" : theme === "ruins" ? "#2d3033" : theme === "amc" ? "#f5f8f4" : "#17191e";
  ctx.strokeStyle = wall;
  ctx.lineWidth = road + (theme === "amc" ? 40 : 34);
  closedPath(ctx, track.points);
  ctx.stroke();

  const roadGradient = ctx.createLinearGradient(0, 0, WORLD.w, WORLD.h);
  if (track.level.rcAerialBase || track.level.mazeCircuitBase) {
    roadGradient.addColorStop(0, track.level.roadColor || "#20272a");
    roadGradient.addColorStop(0.42, "#30383b");
    roadGradient.addColorStop(1, "#101417");
  } else if (track.level.parkCircuitBase) {
    roadGradient.addColorStop(0, track.level.roadColor || "#d8dddc");
    roadGradient.addColorStop(0.48, "#c3c9c8");
    roadGradient.addColorStop(1, "#9ea8a8");
  } else {
    roadGradient.addColorStop(0, track.level.roadColor || "#62666a");
    roadGradient.addColorStop(0.42, theme === "racetrack" ? "#53575a" : theme === "fantasy" ? "#30363d" : theme === "kartarena" ? "#d18a50" : theme === "waters" ? "#f0b76e" : theme === "morro" ? "#efe4d6" : theme === "ancient" ? "#d8c19a" : theme === "jungle" ? "#d19660" : theme === "amc" ? "#858b8d" : "#555b60");
    roadGradient.addColorStop(1, theme === "racetrack" ? "#272a2d" : theme === "fantasy" ? "#111820" : theme === "kartarena" ? "#a86239" : theme === "waters" ? "#b97842" : theme === "morro" ? "#b89d84" : theme === "ancient" ? "#9d8569" : theme === "jungle" ? "#8e5632" : theme === "death" ? "#443c37" : "#777d82");
  }
  ctx.strokeStyle = roadGradient;
  ctx.lineWidth = road;
  closedPath(ctx, track.points);
  ctx.stroke();

  drawRoadLightingPass(track, road, theme);

  if (theme === "jungle") {
    drawJungleRoadTexture();
    drawJungleRaceDetails();
  } else if (theme === "waters") {
    drawWatersRoadTexture();
    drawWatersRaceDetails();
  } else if (theme === "racetrack" || theme === "fantasy") {
    drawRacewayRoadTexture();
    drawRacewayRaceDetails();
  } else if (theme === "kartarena") {
    drawWatersRoadTexture();
    drawRaceDetails();
  } else if (theme === "ancient") {
    drawAncientRoadTexture();
    drawAncientRaceDetails();
  } else if (theme === "morro") {
    drawMorroRoadTexture();
    drawMorroRaceDetails();
  } else {
    drawAsphaltTexture();
    drawSkidMarks();
    drawRaceDetails();
  }

  if (theme === "spy") drawRoadShoulders();
  else drawCurbs();
  drawRouteGuidance();
  drawBridges();
  drawStartLine();
  drawObstacles();
  drawTracksideProps();
}

function drawPlusFigureEightTrack(track, road, theme) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.strokeStyle = "rgba(37, 43, 45, 0.36)";
  ctx.lineWidth = road + 34;
  closedPath(ctx, track.points);
  ctx.stroke();

  const roadGradient = ctx.createLinearGradient(0, 230, WORLD.w, WORLD.h - 180);
  roadGradient.addColorStop(0, "#62696c");
  roadGradient.addColorStop(0.48, track.level.roadColor || "#40464a");
  roadGradient.addColorStop(1, "#31373a");
  ctx.strokeStyle = roadGradient;
  ctx.lineWidth = road;
  closedPath(ctx, track.points);
  ctx.stroke();

  ctx.strokeStyle = "rgba(246, 240, 204, 0.34)";
  ctx.lineWidth = 3;
  for (const lane of [-road * 0.42, road * 0.42]) {
    closedOffsetPath(ctx, track, lane);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(226, 214, 142, 0.62)";
  ctx.lineWidth = 4;
  ctx.setLineDash([44, 54]);
  closedOffsetPath(ctx, track, 0);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = "rgba(0,0,0,0.16)";
  ctx.lineWidth = 6;
  for (let d = 160; d < track.length; d += 260) {
    const p = pointAt(track, d, (Math.floor(d / 260) % 2 ? 1 : -1) * road * 0.22);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.beginPath();
    ctx.moveTo(-62, 0);
    ctx.lineTo(62, 0);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  drawRouteGuidance();
  drawStartLine();
  drawTracksideProps();
}

function drawShortcutRoads(track) {
  if (!Array.isArray(track.level.shortcutRoads) || !track.level.shortcutRoads.length) return;
  const width = track.level.shortcutRoadWidth || track.level.road * 0.78;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const road of track.level.shortcutRoads) {
    if (!Array.isArray(road) || road.length < 2) continue;
    ctx.beginPath();
    road.forEach(([x, y], index) => {
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "rgba(18,24,23,0.30)";
    ctx.lineWidth = width + 44;
    ctx.stroke();
    ctx.strokeStyle = "#d6d1c4";
    ctx.lineWidth = width + 24;
    ctx.stroke();
    const shortcutGradient = ctx.createLinearGradient(0, 250, WORLD.w, WORLD.h);
    shortcutGradient.addColorStop(0, "#686f70");
    shortcutGradient.addColorStop(0.5, track.level.roadColor || "#50575a");
    shortcutGradient.addColorStop(1, "#3b4244");
    ctx.strokeStyle = shortcutGradient;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.46)";
    ctx.lineWidth = 3;
    ctx.setLineDash([42, 58]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  ctx.restore();
}

function drawRoadLightingPass(track, road, theme) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const cleanPlus = track.level.plusArenaBase || track.level.plusCircuitBase || track.level.plusFigureEightBase || track.level.plusGardenCircuitBase || track.level.plusVillageCircuitBase || track.level.plusAerialMazeBase;

  ctx.globalAlpha = cleanPlus ? 0.075 : theme === "death" ? 0.08 : 0.13;
  ctx.strokeStyle = theme === "kartarena" || theme === "waters" || theme === "jungle" || theme === "ancient" || theme === "morro"
    ? "rgba(255,244,213,0.44)"
    : "rgba(255,255,255,0.36)";
  ctx.lineWidth = cleanPlus ? road * 0.38 : road * 0.56;
  closedPath(ctx, track.points);
  ctx.stroke();

  ctx.globalAlpha = cleanPlus ? 0.58 : 0.8;
  ctx.strokeStyle = theme === "death" ? "rgba(255,142,72,0.42)" : "rgba(255,255,255,0.42)";
  ctx.lineWidth = cleanPlus ? 2.4 : 3.2;
  for (const lane of [-road * 0.43, road * 0.43]) {
    closedOffsetPath(ctx, track, lane);
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = cleanPlus ? 0.05 : theme === "neonworkshop" || theme === "model" ? 0.22 : 0.12;
  ctx.strokeStyle = theme === "death" ? "rgba(255,96,48,0.34)" : "rgba(72,216,255,0.28)";
  ctx.lineWidth = 2;
  for (const lane of [-road * 0.47, road * 0.47]) {
    closedOffsetPath(ctx, track, lane);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRouteGuidance() {
  const track = state.track;
  const road = track.level.road;
  const theme = track.level.theme;
  if (Array.isArray(track.level.keyRouteArrows)) {
    for (const arrow of track.level.keyRouteArrows) {
      const p = pointAt(track, arrow.progress, arrow.lane || 0);
      drawLaneDirectionArrow(p.x, p.y, p.angle, theme, arrow.label || "");
    }
  }

  const arrowStep = track.level.routeArrowStep || (theme === "kartarena" ? 520 : ["racetrack", "fantasy"].includes(theme) ? 560 : 460);
  for (let d = 230; d < track.length; d += arrowStep) {
    const lane = Math.floor(d / arrowStep) % 2 ? road * 0.18 : -road * 0.18;
    const p = pointAt(track, d, lane);
    drawLaneDirectionArrow(p.x, p.y, p.angle, theme);
  }

  const signStep = track.level.directionSignStep || 920;
  for (let d = 380; d < track.length; d += signStep) {
    const here = pointAt(track, d, 0);
    const ahead = pointAt(track, d + 210, 0);
    const turn = Math.sin(angleDiff(ahead.angle, here.angle));
    if (Math.abs(turn) < 0.16) continue;
    const side = turn > 0 ? 1 : -1;
    const sign = pointAt(track, d, side * (road / 2 + 58));
    drawArrowSign(sign.x, sign.y, here.angle, side);
  }
}

function drawLaneDirectionArrow(x, y, angle, theme, label = "") {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const glow = theme === "death" ? "rgba(255,111,61,0.28)" : "rgba(255,214,77,0.22)";
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.moveTo(48, 0);
  ctx.lineTo(-14, -32);
  ctx.lineTo(-2, -9);
  ctx.lineTo(-44, -9);
  ctx.lineTo(-44, 9);
  ctx.lineTo(-2, 9);
  ctx.lineTo(-14, 32);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = theme === "death" ? "#ff7b2e" : "#ffd64d";
  ctx.strokeStyle = "rgba(0,0,0,0.42)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(35, 0);
  ctx.lineTo(-8, -22);
  ctx.lineTo(0, -7);
  ctx.lineTo(-30, -7);
  ctx.lineTo(-30, 7);
  ctx.lineTo(0, 7);
  ctx.lineTo(-8, 22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-18, -2);
  ctx.lineTo(14, -2);
  ctx.stroke();
  if (label) {
    ctx.rotate(-angle);
    ctx.font = "900 18px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(0,0,0,0.72)";
    ctx.fillStyle = "#ffffff";
    ctx.strokeText(label, 0, -48);
    ctx.fillText(label, 0, -48);
  }
  ctx.restore();
}

function drawTrackDropShadow(track, road, theme) {
  ctx.save();
  ctx.translate(theme === "morro" ? 28 : 20, theme === "morro" ? 38 : 25);
  ctx.strokeStyle = theme === "morro" ? "rgba(22, 13, 10, 0.48)" : theme === "death" ? "rgba(255, 76, 26, 0.18)" : "rgba(0, 0, 0, 0.28)";
  ctx.lineWidth = road + 72;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  closedPath(ctx, track.points);
  ctx.stroke();
  ctx.translate(-11, -13);
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = road + 18;
  closedPath(ctx, track.points);
  ctx.stroke();
  ctx.restore();
}

function drawMorroRoadTexture() {
  const track = state.track;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (let i = 0; i < 10; i++) {
    ctx.strokeStyle = i % 2 ? "rgba(255,255,255,0.22)" : "rgba(90,72,58,0.24)";
    ctx.lineWidth = 2 + (i % 3);
    ctx.setLineDash([60 + (i % 4) * 18, 82 + (i % 5) * 16]);
    ctx.lineDashOffset = i * 49;
    closedPath(ctx, track.points);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  for (let d = 110; d < track.length; d += 260) {
    const side = (Math.floor(d / 185) % 2 ? 1 : -1) * track.level.road * 0.24;
    const p = pointAt(track, d, side);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.strokeStyle = "rgba(70,53,42,0.26)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-62, -6);
    ctx.lineTo(58, -8);
    ctx.moveTo(-44, 12);
    ctx.lineTo(46, 9);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function drawWatersRoadTexture() {
  const track = state.track;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (let i = 0; i < 12; i++) {
    ctx.strokeStyle = i % 2 ? "rgba(255,229,175,0.26)" : "rgba(105,61,33,0.22)";
    ctx.lineWidth = 3 + (i % 3);
    ctx.setLineDash([52 + (i % 4) * 14, 78 + (i % 4) * 12]);
    ctx.lineDashOffset = i * 33;
    closedPath(ctx, track.points);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  for (let d = 120; d < track.length; d += 230) {
    const p = pointAt(track, d, (Math.floor(d / 230) % 2 ? 1 : -1) * track.level.road * 0.22);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.strokeStyle = "rgba(111,61,30,0.34)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-48, -7);
    ctx.lineTo(50, -5);
    ctx.moveTo(-36, 11);
    ctx.lineTo(38, 9);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function drawWatersRaceDetails() {
  const track = state.track;
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(255,228,143,0.58)";
  ctx.lineWidth = 4;
  ctx.setLineDash([82, 58]);
  closedOffsetPath(ctx, track, 0);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = "rgba(111,62,31,0.62)";
  ctx.lineWidth = 5;
  for (const lane of [-track.level.road * 0.42, track.level.road * 0.42]) {
    closedOffsetPath(ctx, track, lane);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRacewayRoadTexture() {
  const track = state.track;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const cleanPlus = track.level.plusArenaBase || track.level.plusCircuitBase || track.level.plusFigureEightBase || track.level.plusGardenCircuitBase || track.level.plusVillageCircuitBase || track.level.plusAerialMazeBase;
  const textureCount = cleanPlus ? 4 : 8;
  for (let i = 0; i < textureCount; i++) {
    ctx.strokeStyle = cleanPlus
      ? (i % 2 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.10)")
      : (i % 2 ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.18)");
    ctx.lineWidth = 2 + (i % 3);
    ctx.setLineDash([cleanPlus ? 150 + i * 22 : 92 + (i % 4) * 18, cleanPlus ? 210 + i * 30 : 130 + (i % 5) * 14]);
    ctx.lineDashOffset = i * 31;
    closedPath(ctx, track.points);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  if (cleanPlus) {
    ctx.restore();
    return;
  }
  for (let d = 140; d < track.length; d += 340) {
    const p = pointAt(track, d, (Math.floor(d / 340) % 2 ? 1 : -1) * track.level.road * 0.24);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.strokeStyle = "rgba(20,24,28,0.24)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-48, -6);
    ctx.lineTo(46, -5);
    ctx.moveTo(-34, 10);
    ctx.lineTo(34, 8);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function drawRacewayRaceDetails() {
  const track = state.track;
  if (track.level.plusArenaBase || track.level.plusCircuitBase || track.level.plusFigureEightBase || track.level.plusGardenCircuitBase || track.level.plusVillageCircuitBase || track.level.plusAerialMazeBase) {
    drawCleanPlusRaceDetails();
    return;
  }
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(255,255,255,0.84)";
  ctx.lineWidth = 5;
  for (const lane of [-track.level.road * 0.33, track.level.road * 0.33]) {
    closedOffsetPath(ctx, track, lane);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255,255,255,0.56)";
  ctx.lineWidth = 5;
  ctx.setLineDash([90, 60]);
  closedOffsetPath(ctx, track, 0);
  ctx.stroke();
  ctx.setLineDash([]);
  drawRacewayEdgeMarkers();
  ctx.restore();
}

function drawCleanPlusRaceDetails() {
  const track = state.track;
  const road = track.level.road;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.strokeStyle = "rgba(255,255,255,0.68)";
  ctx.lineWidth = 3.2;
  for (const lane of [-road * 0.38, road * 0.38]) {
    closedOffsetPath(ctx, track, lane);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255,255,255,0.34)";
  ctx.lineWidth = 4;
  ctx.setLineDash([74, 86]);
  closedOffsetPath(ctx, track, 0);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = "rgba(0,0,0,0.18)";
  ctx.lineWidth = 6;
  ctx.setLineDash([120, 220]);
  for (const lane of [-road * 0.18, road * 0.18]) {
    closedOffsetPath(ctx, track, lane);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRacewayEdgeMarkers() {
  const track = state.track;
  ctx.save();
  for (let d = 0; d < track.length; d += 72) {
    for (const side of [-1, 1]) {
      const p = pointAt(track, d, side * (track.level.road / 2 + 18));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = Math.floor(d / 72) % 2 === 0 ? "#111111" : "#ffffff";
      ctx.fillRect(-20, -10, 40, 20);
      ctx.restore();
    }
  }
  ctx.restore();
}

function drawMorroRaceDetails() {
  const track = state.track;
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(255,255,255,0.82)";
  ctx.lineWidth = 5;
  for (const lane of [-track.level.road * 0.31, track.level.road * 0.31]) {
    closedOffsetPath(ctx, track, lane);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(30,26,24,0.75)";
  ctx.lineWidth = 5;
  ctx.setLineDash([16, 18]);
  for (const lane of [-track.level.road * 0.55, track.level.road * 0.55]) {
    closedOffsetPath(ctx, track, lane);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  drawMorroRailLoop();
  ctx.restore();
}

function drawMorroRailLoop() {
  const track = state.track;
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "#191716";
  ctx.lineWidth = 5;
  closedOffsetPath(ctx, track, track.level.road / 2 + 78);
  ctx.stroke();
  closedOffsetPath(ctx, track, -(track.level.road / 2 + 78));
  ctx.stroke();
  ctx.strokeStyle = "rgba(210,185,145,0.75)";
  ctx.lineWidth = 4;
  for (let d = 0; d < track.length; d += 180) {
    for (const side of [-1, 1]) {
      const p = pointAt(track, d, side * (track.level.road / 2 + 78));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle + Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(12, 0);
      ctx.stroke();
      ctx.restore();
    }
  }
  ctx.restore();
}

function drawJungleRoadTexture() {
  const track = state.track;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (let i = 0; i < 24; i++) {
    ctx.strokeStyle = i % 3 === 0 ? "rgba(83,50,28,0.28)" : "rgba(255,217,157,0.16)";
    ctx.lineWidth = 3 + (i % 4);
    ctx.setLineDash([28 + (i % 5) * 10, 54 + (i % 6) * 12]);
    ctx.lineDashOffset = i * 37 + state.time * (i % 2 ? 5 : -4);
    closedPath(ctx, track.points);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  for (let d = 90; d < track.length; d += 150) {
    const lane = (Math.floor(d / 150) % 2 ? 1 : -1) * (track.level.road * 0.25);
    const p = pointAt(track, d, lane);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle + 0.04 * Math.sin(d));
    ctx.strokeStyle = "rgba(80,44,24,0.34)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-48, -8);
    ctx.lineTo(48, -5);
    ctx.moveTo(-44, 10);
    ctx.lineTo(44, 7);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function drawJungleRaceDetails() {
  const track = state.track;
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(91,56,27,0.38)";
  ctx.lineWidth = 5;
  for (const lane of [-track.level.road * 0.22, track.level.road * 0.22]) {
    ctx.setLineDash([70, 46]);
    closedOffsetPath(ctx, track, lane);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  for (let d = 160; d < track.length; d += 210) {
    const p = pointAt(track, d, 0);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = "rgba(255,224,158,0.18)";
    ctx.fillRect(-42, -track.level.road / 2 + 26, 84, 7);
    ctx.fillRect(-42, track.level.road / 2 - 33, 84, 7);
    ctx.restore();
  }
  ctx.restore();
}

function drawAncientRoadTexture() {
  const track = state.track;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (let i = 0; i < 18; i++) {
    ctx.strokeStyle = i % 2 ? "rgba(255,246,222,0.2)" : "rgba(72,61,49,0.22)";
    ctx.lineWidth = 2 + (i % 4);
    ctx.setLineDash([46 + (i % 4) * 18, 72 + (i % 5) * 12]);
    ctx.lineDashOffset = i * 41;
    closedPath(ctx, track.points);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  for (let d = 100; d < track.length; d += 175) {
    const p = pointAt(track, d, (Math.floor(d / 175) % 2 ? 1 : -1) * track.level.road * 0.28);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.strokeStyle = "rgba(69,60,49,0.28)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-54, -5);
    ctx.lineTo(54, -7);
    ctx.moveTo(-36, 10);
    ctx.lineTo(40, 8);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function drawAncientRaceDetails() {
  const track = state.track;
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(45,42,37,0.55)";
  ctx.lineWidth = 4;
  for (const lane of [-track.level.road * 0.36, track.level.road * 0.36]) {
    closedOffsetPath(ctx, track, lane);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255,250,230,0.26)";
  ctx.lineWidth = 7;
  ctx.setLineDash([34, 52]);
  closedOffsetPath(ctx, track, 0);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function closedOffsetPath(g, track, side) {
  g.beginPath();
  const steps = Math.max(60, Math.floor(track.length / 70));
  for (let i = 0; i <= steps; i++) {
    const p = pointAt(track, (track.length / steps) * i, side);
    if (i === 0) g.moveTo(p.x, p.y);
    else g.lineTo(p.x, p.y);
  }
  g.closePath();
}

function drawRailways() {
  const trains = state.track.level.trains || [];
  for (const [index, train] of trains.entries()) {
    const info = trainState(state.track, train, index);
    const p = info.crossing;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle + Math.PI / 2);
    ctx.strokeStyle = "#282828";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-310, -24);
    ctx.lineTo(310, -24);
    ctx.moveTo(-310, 24);
    ctx.lineTo(310, 24);
    ctx.stroke();
    ctx.strokeStyle = "#b8a27c";
    ctx.lineWidth = 7;
    for (let x = -300; x <= 300; x += 42) {
      ctx.beginPath();
      ctx.moveTo(x, -39);
      ctx.lineTo(x, 39);
      ctx.stroke();
    }
    ctx.fillStyle = info.warning ? "#ffdf54" : "#595959";
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-100, -72, 17, 0, TAU);
    ctx.fill();
    ctx.stroke();
    if (info.warning) {
      ctx.fillStyle = "rgba(255, 70, 45, 0.92)";
      ctx.font = "900 24px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("TREM!", 0, -104);
    }
    ctx.beginPath();
    ctx.arc(100, 72, 17, 0, TAU);
    ctx.fill();
    ctx.stroke();
    if (info.active) {
      drawTrain(info.run);
    }
    ctx.restore();
  }
}

function drawModelSetPieces() {
  const theme = state.track.level.theme;
  if (!["model", "neonworkshop", "amc"].includes(theme)) return;

  if (theme === "amc") {
    drawSpectatorStand(430, 230, 430, 88, "DZ RANCING");
    drawSpectatorStand(2030, 1360, 440, 88, "RC ARENA");
    drawBillboard(2080, 260, "ZAKIA CUP", "#ffd64d");
    drawBillboard(520, 1380, "PIT LANE", "#6cff9d");
    drawPitLane(360, 1110);
    return;
  }

  drawStartGate(360, 1160);
  drawBillboard(430, 470, theme === "neonworkshop" ? "DIY TRACK" : "MAQUETE RC", theme === "neonworkshop" ? "#ff4fd8" : "#48d8ff");
  drawBillboard(2050, 660, theme === "neonworkshop" ? "NEON RC" : "CURVA RC", "#48d8ff");
  drawPitLane(1980, 1280);
  drawTireStack(520, 300, 0.82);
  drawTireStack(2100, 320, 0.82);

  if (theme === "neonworkshop") {
    drawToolBench(470, 1380);
    drawToolBench(2140, 230);
  }
}

function drawPitLane(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(20,22,24,0.55)";
  roundRect(ctx, -230, -56, 460, 112, 14);
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;
  ctx.setLineDash([28, 20]);
  ctx.strokeRect(-210, -34, 420, 68);
  ctx.setLineDash([]);
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i % 2 ? "#e93232" : "#fff";
    ctx.fillRect(-190 + i * 72, 42, 56, 18);
  }
  ctx.restore();
}

function drawToolBench(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.08);
  ctx.fillStyle = "#5a3620";
  roundRect(ctx, -120, -42, 240, 84, 8);
  ctx.fill();
  ctx.fillStyle = "#c99554";
  ctx.fillRect(-110, -50, 220, 18);
  ctx.fillStyle = "#20242a";
  for (let i = 0; i < 6; i++) ctx.fillRect(-88 + i * 34, -22 + (i % 2) * 18, 22, 10);
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.strokeRect(-120, -42, 240, 84);
  ctx.restore();
}
function drawLoop(x, y, radius, color, accent) {
  ctx.save();
  ctx.translate(x, y);
  ctx.lineWidth = 24;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, TAU);
  ctx.stroke();
  ctx.lineWidth = 7;
  ctx.strokeStyle = accent;
  ctx.setLineDash([28, 22]);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(255,255,255,0.32)";
  ctx.fillRect(-radius * 0.18, -radius - 18, radius * 0.36, radius * 2 + 36);
  ctx.restore();
}

function drawToyTunnel(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#26333c";
  roundRect(ctx, -118, -70, 236, 140, 28);
  ctx.fill();
  ctx.fillStyle = "#0d141b";
  roundRect(ctx, -78, -44, 156, 88, 22);
  ctx.fill();
  ctx.strokeStyle = "#31e4ff";
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.strokeStyle = "#b64cff";
  ctx.lineWidth = 4;
  ctx.strokeRect(-96, -58, 192, 116);
  ctx.restore();
}

function drawWoodRamp(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#d5a96d";
  ctx.beginPath();
  ctx.moveTo(-78, 48);
  ctx.lineTo(78, 48);
  ctx.lineTo(48, -48);
  ctx.lineTo(-48, -48);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#6f4522";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.strokeStyle = "rgba(99,58,26,0.55)";
  ctx.lineWidth = 4;
  for (let xLine = -52; xLine <= 52; xLine += 26) {
    ctx.beginPath();
    ctx.moveTo(xLine, -42);
    ctx.lineTo(xLine, 42);
    ctx.stroke();
  }
  ctx.restore();
}

function drawVolcano(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#60402b";
  ctx.beginPath();
  ctx.moveTo(-92, 78);
  ctx.lineTo(-28, -62);
  ctx.lineTo(28, -62);
  ctx.lineTo(92, 78);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ff6a28";
  ctx.beginPath();
  ctx.ellipse(0, -58, 38, 16, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "rgba(255,180,54,0.88)";
  ctx.beginPath();
  ctx.moveTo(-10, -50);
  ctx.lineTo(-32, 62);
  ctx.lineTo(6, 76);
  ctx.lineTo(22, -52);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(42,36,34,0.5)";
  ctx.beginPath();
  ctx.ellipse(0, -108, 42, 22, 0, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawStartGate(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#d8453e";
  ctx.fillRect(-86, -126, 18, 126);
  ctx.fillRect(68, -126, 18, 126);
  ctx.fillStyle = "#111";
  ctx.fillRect(-118, -162, 236, 46);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 5;
  ctx.strokeRect(-118, -162, 236, 46);
  ctx.fillStyle = "#fff";
  ctx.font = "900 28px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.fillText("DIY RC", 0, -130);
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = i % 2 ? "#fff" : "#111";
    ctx.fillRect(-118 + i * 23.6, -190, 24, 28);
  }
  ctx.restore();
}

function drawAudience(x, y) {
  ctx.save();
  ctx.translate(x, y);
  const colors = ["#ff6a64", "#ffe15a", "#47dfff", "#a95cff"];
  for (let i = 0; i < 18; i++) {
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.arc((i % 9) * 26 - 104, Math.floor(i / 9) * 28, 10, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#1b1b1b";
    ctx.fillRect((i % 9) * 26 - 111, Math.floor(i / 9) * 28 + 10, 14, 16);
  }
  ctx.restore();
}

function drawTrain(offset) {
  ctx.save();
  ctx.translate(offset, 0);
  ctx.fillStyle = "#15191f";
  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 5;
  for (let i = -1; i <= 1; i++) {
    roundRect(ctx, i * 92 - 36, -42, 72, 84, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = i === 0 ? "#d1d6dc" : "#9a2e2e";
    ctx.fillRect(i * 92 - 24, -28, 48, 18);
    ctx.fillRect(i * 92 - 24, 10, 48, 18);
    ctx.fillStyle = "#15191f";
  }
  ctx.restore();
}

function drawCurbs() {
  const track = state.track;
  if (track.level.noCurbs) return;
  const theme = track.level.theme;
  const cleanPlus = track.level.plusArenaBase || track.level.plusCircuitBase || track.level.plusFigureEightBase || track.level.plusGardenCircuitBase || track.level.plusVillageCircuitBase || track.level.plusAerialMazeBase;
  const step = cleanPlus ? 96 : theme === "amc" ? 42 : 58;
  for (let d = 0; d < track.length; d += step) {
    for (const side of [-1, 1]) {
      const p = pointAt(track, d, side * (track.level.road / 2 + (cleanPlus ? 16 : 9)));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      if (theme === "model" || theme === "neonworkshop") {
        ctx.fillStyle = Math.floor(d / step) % 2 === 0 ? "#ef3446" : "#f9fafb";
        ctx.fillRect(-22, -11, 44, 22);
        ctx.fillStyle = "rgba(0,0,0,0.24)";
        ctx.fillRect(-22, side > 0 ? 6 : -11, 44, 5);
      } else if (theme === "jungle") {
        ctx.fillStyle = Math.floor(d / step) % 2 === 0 ? "#5d381d" : "#2f6d38";
        roundRect(ctx, -16, -10, 32, 20, 4);
        ctx.fill();
        ctx.fillStyle = "rgba(255,235,178,0.22)";
        ctx.fillRect(-12, side > 0 ? 5 : -8, 24, 4);
      } else if (theme === "ancient") {
        ctx.fillStyle = Math.floor(d / step) % 2 === 0 ? "#d6c3a1" : "#7a7061";
        ctx.fillRect(-20, -8, 40, 16);
        ctx.fillStyle = "rgba(48,42,35,0.26)";
        ctx.fillRect(-20, side > 0 ? 5 : -8, 40, 4);
      } else if (theme === "morro") {
        ctx.fillStyle = Math.floor(d / step) % 2 === 0 ? "#111111" : "#f3eadc";
        ctx.fillRect(-19, -9, 38, 18);
        ctx.fillStyle = "rgba(176,88,42,0.34)";
        ctx.fillRect(-19, side > 0 ? 6 : -9, 38, 4);
      } else if (theme === "waters") {
        ctx.fillStyle = Math.floor(d / step) % 2 === 0 ? "#8a4e2a" : "#d89a5b";
        ctx.fillRect(-18, -8, 36, 16);
        ctx.fillStyle = "rgba(255,234,172,0.25)";
        ctx.fillRect(-18, side > 0 ? 5 : -8, 36, 4);
      } else if (theme === "amc") {
        ctx.fillStyle = Math.floor(d / step) % 2 === 0 ? "#e93232" : "#ffffff";
        ctx.fillRect(-18, -12, 36, 24);
        ctx.fillStyle = "rgba(38,217,77,0.45)";
        ctx.fillRect(-18, side > 0 ? 12 : -18, 36, 6);
      } else if (cleanPlus) {
        ctx.fillStyle = Math.floor(d / step) % 2 === 0 ? "#d83a3a" : "#f5f6f2";
        roundRect(ctx, -22, -8, 44, 16, 4);
        ctx.fill();
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        roundRect(ctx, -22, side > 0 ? 4 : -8, 44, 4, 2);
        ctx.fill();
      } else {
        ctx.fillStyle = Math.floor(d / 58) % 2 === 0 ? "#d93e3e" : "#f7f7f7";
        ctx.fillRect(-22, -9, 44, 18);
      }
      ctx.restore();
    }
  }
}
function drawRoadShoulders() {
  const track = state.track;
  for (let d = 0; d < track.length; d += 46) {
    for (const side of [-1, 1]) {
      const p = pointAt(track, d, side * (track.level.road / 2 + 4));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = "#eff4ec";
      ctx.fillRect(-18, -5, 36, 10);
      ctx.fillStyle = "#101010";
      ctx.fillRect(-18, side > 0 ? 1 : -5, 36, 4);
      ctx.restore();
    }
  }
}

function drawBridges() {
  const track = state.track;
  for (const bridge of track.level.bridges) {
    const p = pointAt(track, bridge.at * track.length, 0);
    const open = isBridgeOpen(track, p.progress);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    if (open) {
      ctx.fillStyle = track.level.water;
      ctx.fillRect(-82, -track.level.road / 2 - 22, 164, track.level.road + 44);
      ctx.strokeStyle = "#6d3f23";
      ctx.lineWidth = 18;
      ctx.beginPath();
      ctx.moveTo(-92, -track.level.road / 2);
      ctx.lineTo(-150, -track.level.road / 2 - 54);
      ctx.moveTo(92, track.level.road / 2);
      ctx.lineTo(150, track.level.road / 2 + 54);
      ctx.stroke();
    } else {
      ctx.fillStyle = "#8d5a32";
      ctx.fillRect(-88, -track.level.road / 2 - 12, 176, track.level.road + 24);
      ctx.strokeStyle = "#4b2b18";
      ctx.lineWidth = 4;
      for (let x = -72; x <= 72; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, -track.level.road / 2 - 12);
        ctx.lineTo(x, track.level.road / 2 + 12);
        ctx.stroke();
      }
      if (track.level.theme === "jungle") {
        ctx.strokeStyle = "#2f1d10";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(-96, -track.level.road / 2 - 20);
        ctx.lineTo(96, -track.level.road / 2 - 20);
        ctx.moveTo(-96, track.level.road / 2 + 20);
        ctx.lineTo(96, track.level.road / 2 + 20);
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,232,178,0.32)";
        ctx.lineWidth = 2;
        for (let y of [-track.level.road / 2 - 20, track.level.road / 2 + 20]) {
          for (let x = -76; x <= 76; x += 38) {
            ctx.beginPath();
            ctx.moveTo(x, y - 14);
            ctx.lineTo(x, y + 14);
            ctx.stroke();
          }
        }
      }
      if (track.level.theme === "ancient") {
        ctx.fillStyle = "rgba(220,205,174,0.45)";
        for (let y = -track.level.road / 2 - 10; y < track.level.road / 2 + 12; y += 34) {
          ctx.fillRect(-86, y, 172, 14);
        }
        ctx.strokeStyle = "#534b40";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(-92, -track.level.road / 2 - 18);
        ctx.lineTo(92, -track.level.road / 2 - 18);
        ctx.moveTo(-92, track.level.road / 2 + 18);
        ctx.lineTo(92, track.level.road / 2 + 18);
        ctx.stroke();
      }
      if (track.level.theme === "morro") {
        ctx.fillStyle = "#b9afa4";
        ctx.fillRect(-88, -track.level.road / 2 - 12, 176, track.level.road + 24);
        ctx.strokeStyle = "#403d3b";
        ctx.lineWidth = 5;
        for (let y = -track.level.road / 2 - 8; y <= track.level.road / 2 + 8; y += 34) {
          ctx.beginPath();
          ctx.moveTo(-86, y);
          ctx.lineTo(86, y);
          ctx.stroke();
        }
        ctx.strokeStyle = "#191716";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(-96, -track.level.road / 2 - 20);
        ctx.lineTo(96, -track.level.road / 2 - 20);
        ctx.moveTo(-96, track.level.road / 2 + 20);
        ctx.lineTo(96, track.level.road / 2 + 20);
        ctx.stroke();
      }
      if (track.level.theme === "waters") {
        drawWatersBridgeDeck(track.level.road);
      }
    }
    ctx.restore();
  }
}

function drawOverpasses() {
  const track = state.track;
  const overpasses = track.overpasses || [];
  if (!overpasses.length) return;
  overpasses.forEach((overpass) => drawOverpassShadow(track, overpass));
  overpasses.forEach((overpass) => drawOverpassDeck(track, overpass));
}

function drawOverpassShadow(track, overpass) {
  const road = track.level.road;
  const length = overpass.length || Math.max(road * 1.45, 300);
  ctx.save();
  ctx.translate(overpass.x, overpass.y);
  ctx.rotate(overpass.underAngle || overpass.angle + Math.PI / 2);
  ctx.fillStyle = "rgba(0,0,0,0.36)";
  roundRect(ctx, -length * 0.48, -road * 0.48, length * 0.96, road * 0.96, 18);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.10)";
  ctx.fillRect(-length * 0.4, -road * 0.34, length * 0.8, 5);
  ctx.restore();
}

function overpassRoadColor(track) {
  const theme = track.level.theme;
  if (theme === "kartarena") return "#c57945";
  if (theme === "waters") return "#c98248";
  if (theme === "ancient") return "#d6c19a";
  if (theme === "jungle") return "#b97945";
  if (theme === "morro") return "#d8c7b5";
  return track.level.roadColor || "#545a5f";
}

function drawOverpassDeck(track, overpass) {
  const road = track.level.road;
  const length = overpass.length || Math.max(road * 1.45, 300);
  const width = overpass.width || road + 42;
  const roadWidth = road + 2;
  ctx.save();
  ctx.translate(overpass.x, overpass.y);
  ctx.rotate(overpass.angle);

  ctx.fillStyle = "rgba(0,0,0,0.24)";
  roundRect(ctx, -length / 2 + 18, -width / 2 + 20, length - 36, width - 8, 20);
  ctx.fill();

  const wall = ctx.createLinearGradient(0, -width / 2, 0, width / 2);
  wall.addColorStop(0, "#f7f3e8");
  wall.addColorStop(0.5, "#c8c0ac");
  wall.addColorStop(1, "#6b6253");
  ctx.fillStyle = wall;
  roundRect(ctx, -length / 2, -width / 2, length, width, 22);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.46)";
  ctx.lineWidth = 5;
  ctx.stroke();

  const deck = ctx.createLinearGradient(-length / 2, -roadWidth / 2, length / 2, roadWidth / 2);
  deck.addColorStop(0, overpassRoadColor(track));
  deck.addColorStop(0.58, track.level.theme === "kartarena" ? "#d99050" : "#5c6165");
  deck.addColorStop(1, overpassRoadColor(track));
  ctx.fillStyle = deck;
  roundRect(ctx, -length / 2 + 12, -roadWidth / 2, length - 24, roadWidth, 16);
  ctx.fill();

  drawOverpassCurbBlocks(length, roadWidth);

  ctx.strokeStyle = "rgba(255,255,255,0.74)";
  ctx.lineWidth = 4;
  ctx.setLineDash([58, 46]);
  ctx.beginPath();
  ctx.moveTo(-length / 2 + 30, 0);
  ctx.lineTo(length / 2 - 30, 0);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = "#171b20";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-length / 2 + 10, -width / 2 - 6);
  ctx.lineTo(length / 2 - 10, -width / 2 - 6);
  ctx.moveTo(-length / 2 + 10, width / 2 + 6);
  ctx.lineTo(length / 2 - 10, width / 2 + 6);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.24)";
  ctx.lineWidth = 3;
  for (let x = -length / 2 + 46; x <= length / 2 - 46; x += 56) {
    ctx.beginPath();
    ctx.moveTo(x, -width / 2 - 14);
    ctx.lineTo(x, -width / 2 + 12);
    ctx.moveTo(x, width / 2 - 12);
    ctx.lineTo(x, width / 2 + 14);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(8,12,18,0.82)";
  ctx.font = "900 17px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.fillText("PONTE", 0, -roadWidth / 2 - 18);
  ctx.restore();
}

function drawOverpassCurbBlocks(length, roadWidth) {
  const yTop = -roadWidth / 2 - 12;
  const yBottom = roadWidth / 2 + 2;
  for (let x = -length / 2 + 18, i = 0; x < length / 2 - 18; x += 36, i++) {
    ctx.fillStyle = i % 2 === 0 ? "#ffffff" : "#e63b42";
    ctx.fillRect(x, yTop, 30, 12);
    ctx.fillRect(x, yBottom, 30, 12);
  }
}

function drawWatersBridgeDeck(road) {
  const width = road + 30;
  ctx.save();
  const deck = ctx.createLinearGradient(-92, -width / 2, 92, width / 2);
  deck.addColorStop(0, "#9d5a31");
  deck.addColorStop(0.46, "#d28a4e");
  deck.addColorStop(1, "#7c4326");
  ctx.fillStyle = deck;
  roundRect(ctx, -92, -width / 2, 184, width, 16);
  ctx.fill();
  ctx.strokeStyle = "#603417";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.strokeStyle = "rgba(71,36,15,0.58)";
  ctx.lineWidth = 3;
  for (let x = -74; x <= 76; x += 22) {
    ctx.beginPath();
    ctx.moveTo(x, -width / 2 + 8);
    ctx.lineTo(x, width / 2 - 8);
    ctx.stroke();
  }
  ctx.strokeStyle = "#5b2f14";
  ctx.lineWidth = 7;
  for (const y of [-width / 2 - 17, width / 2 + 17]) {
    ctx.beginPath();
    ctx.moveTo(-94, y);
    ctx.quadraticCurveTo(0, y - Math.sign(y) * 24, 94, y);
    ctx.stroke();
    ctx.lineWidth = 4;
    for (let x = -72; x <= 72; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, y - 18 * Math.sign(y));
      ctx.lineTo(x, y + 18 * Math.sign(y));
      ctx.stroke();
    }
    ctx.lineWidth = 7;
  }
  ctx.fillStyle = "#6b3819";
  for (const x of [-96, 96]) {
    for (const y of [-width / 2 - 22, width / 2 + 22]) {
      ctx.fillRect(x - 8, y - 14, 16, 28);
    }
  }
  ctx.restore();
}

function drawStartLine() {
  const p = pointAt(state.track, 20, 0);
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle + Math.PI / 2);
  for (let y = -72; y < 72; y += 16) {
    for (let x = -72; x < 72; x += 16) {
      ctx.fillStyle = ((x + y) / 16) % 2 === 0 ? "#fff" : "#070707";
      ctx.fillRect(x, y, 16, 16);
    }
  }
  ctx.restore();
}

function drawObstacles() {
  const track = state.track;
  const theme = track.level.theme;
  for (let i = 0; i < track.level.obstacles; i++) {
    const p = pointAt(track, 260 + (track.length / track.level.obstacles) * i, (i % 2 ? 1 : -1) * (track.level.road / 2 + 56));
    if (theme === "ruins") {
      if (i % 2 === 0) drawBarricade(p.x, p.y);
      else drawRuin(p.x, p.y, 0.55);
    } else if (theme === "waters") {
      if (i % 4 === 0) drawWatersReeds(p.x, p.y, 0.78);
      else if (i % 4 === 1) drawWatersBush(p.x, p.y, 0.74);
      else if (i % 4 === 2) drawWatersFencePost(p.x, p.y, p.angle, i % 2 ? 1 : -1);
      else drawWatersDockPlanks(p.x, p.y, p.angle, 0.66);
    } else if (theme === "morro") {
      if (i % 4 === 0) drawMorroBoulder(p.x, p.y, 0.78);
      else if (i % 4 === 1) drawMorroShrub(p.x, p.y, 0.78);
      else if (i % 4 === 2) drawMorroSpire(p.x, p.y, 0.62);
      else drawMorroGuardPost(p.x, p.y, p.angle, i % 2 ? 1 : -1);
    } else if (theme === "ancient") {
      if (i % 4 === 0) drawAncientColumn(p.x, p.y, 0.64);
      else if (i % 4 === 1) drawAncientBlock(p.x, p.y, p.angle, 0.74);
      else if (i % 4 === 2) drawAncientStairs(p.x, p.y, p.angle, 0.62);
      else drawMossPatch(p.x, p.y, 0.78);
    } else if (theme === "death") {
      if (i % 2 === 0) drawConeLine(p.x, p.y);
      else drawWatchTower(p.x, p.y);
    } else if (theme === "jungle") {
      if (i % 4 === 0) drawFernCluster(p.x, p.y, 0.82);
      else if (i % 4 === 1) drawJungleRock(p.x, p.y, 0.72);
      else if (i % 4 === 2) drawJungleLeafCluster(p.x, p.y, 0.52, i);
      else drawJunglePost(p.x, p.y, p.angle, i % 2 ? 1 : -1);
    } else if (theme === "canyon" || theme === "rock") {
      if (i % 2 === 0) drawCanyonRock(p.x, p.y, 0.75);
      else drawTire(p.x, p.y);
    } else if (theme === "spy") {
      if (i % 2 === 0) drawBush(p.x, p.y);
      else drawTire(p.x, p.y);
    } else if (theme === "fantasy") {
      if (i % 3 === 0) drawMiniCone(p.x, p.y, p.angle);
      else if (i % 3 === 1) drawBush(p.x, p.y);
      else drawConcreteBarrier(p.x, p.y, p.angle);
    } else if (theme === "kartarena") {
      if (i % 2 === 0) drawTireStack(p.x, p.y, 0.66);
      else drawMiniCone(p.x, p.y, p.angle);
    } else if (theme === "model" || theme === "neonworkshop" || theme === "amc" || theme === "racetrack") {
      if (i % 4 === 0) drawMiniCone(p.x, p.y, p.angle);
      else if (i % 4 === 1) drawTireStack(p.x, p.y, 0.56);
      else if (i % 4 === 2) drawRouteConePair(p.x, p.y, p.angle);
      else drawTire(p.x, p.y);
    } else {
      if (i % 3 === 0) drawPalm(p.x, p.y, 0.85);
      else if (i % 3 === 1) drawRock(p.x, p.y, 1);
      else drawTire(p.x, p.y);
    }
  }
}

function drawRouteConePair(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawMiniCone(-18, 0, 0);
  drawMiniCone(18, 0, 0);
  ctx.restore();
}

function drawScenery() {
  const theme = state.track.level.theme;
  const sceneryCount = state.track.level.cleanScenery ? 1 : ["model", "neonworkshop", "amc", "racetrack", "fantasy", "kartarena"].includes(theme) ? 3 : 8;
  for (let i = 0; i < sceneryCount; i++) {
    const x = 190 + ((i * 283) % (WORLD.w - 380));
    const y = 170 + ((i * 173) % (WORLD.h - 340));
    if (theme === "ruins") {
      if (i % 2 === 0) drawRuin(x, y, 0.75 + (i % 3) * 0.12);
      else drawBarricade(x, y);
    } else if (theme === "waters") {
      if (i % 4 === 0) drawWatersBush(x, y, 0.86 + (i % 3) * 0.08);
      else if (i % 4 === 1) drawWatersReeds(x, y, 0.9);
      else if (i % 4 === 2) drawWatersDockPlanks(x, y, i * 0.12, 0.72);
      else drawWatersPebbles(x, y, 0.86);
    } else if (theme === "morro") {
      if (i % 4 === 0) drawMorroSpire(x, y, 0.76 + (i % 3) * 0.16);
      else if (i % 4 === 1) drawMorroBoulder(x, y, 0.84 + (i % 4) * 0.1);
      else if (i % 4 === 2) drawMorroShrub(x, y, 0.9);
      else drawMorroRidge(x, y, 0.8 + (i % 3) * 0.1);
    } else if (theme === "ancient") {
      if (i % 5 === 0) drawAncientWall(x, y, 0.8 + (i % 3) * 0.1);
      else if (i % 5 === 1) drawAncientColumn(x, y, 0.84 + (i % 3) * 0.08);
      else if (i % 5 === 2) drawAncientBlock(x, y, i * 0.16, 0.86);
      else if (i % 5 === 3) drawAncientStairs(x, y, i * 0.08, 0.74);
      else drawMossPatch(x, y, 1);
    } else if (theme === "death" || theme === "canyon") {
      if (i % 2 === 0) drawCanyonRock(x, y, 0.8 + (i % 4) * 0.16);
      else drawConeLine(x, y);
    } else if (theme === "jungle") {
      if (i % 4 === 0) drawJungleTree(x, y, 0.72 + (i % 3) * 0.12);
      else if (i % 4 === 1) drawFernCluster(x, y, 0.9 + (i % 4) * 0.1);
      else if (i % 4 === 2) drawJungleRock(x, y, 0.78 + (i % 3) * 0.1);
      else drawJungleLeafCluster(x, y, 0.8, i * 0.4);
    } else if (theme === "model") {
      if (i % 4 === 0) drawMiniCone(x, y, i * 0.22);
      else if (i % 4 === 1) drawTireStack(x, y, 0.56);
      else if (i % 4 === 2) drawToyCrate(x, y);
      else drawBush(x, y);
    } else if (theme === "neonworkshop") {
      if (i % 4 === 0) drawMiniCone(x, y, i * 0.22);
      else if (i % 4 === 1) drawTireStack(x, y, 0.56);
      else if (i % 4 === 2) drawToolBench(x, y);
      else drawToyCrate(x, y);
    } else if (theme === "fantasy") {
      if (i % 3 === 0) drawBush(x, y);
      else if (i % 3 === 1) drawMiniCone(x, y, i * 0.18);
      else drawToyCrate(x, y);
    } else if (theme === "kartarena") {
      if (i % 2 === 0) drawTireStack(x, y, 0.64);
      else drawMiniCone(x, y, i * 0.18);
    } else if (theme === "amc" || theme === "racetrack") {
      if (i % 3 === 0) drawMiniCone(x, y, i * 0.18);
      else if (i % 3 === 1) drawTireStack(x, y, 0.56);
      else drawConcreteBarrier(x, y, i * 0.12);
    } else {
      if (i % 2 === 0) drawPalm(x, y, 0.7 + (i % 4) * 0.1);
    }
  }
  if (theme === "ruins") {
    drawRuin(2060, 1320, 1.45);
    drawRuin(1900, 280, 1.2);
  } else if (theme === "waters") {
    drawWatersBush(2060, 1320, 1.24);
    drawWatersBush(1900, 280, 1.08);
    drawWatersDockPlanks(540, 310, -0.28, 1.1);
    drawWatersReeds(1540, 1260, 1.15);
  } else if (theme === "morro") {
    drawMorroSpire(2020, 1270, 1.35);
    drawMorroSpire(1880, 260, 1.2);
    drawMorroRidge(540, 275, 1.15);
    drawMorroBoulder(1540, 1290, 1.1);
  } else if (theme === "ancient") {
    drawAncientWall(2050, 1300, 1.35);
    drawAncientWall(1880, 280, 1.08);
    drawAncientStairs(1210, 620, -0.08, 1.08);
    drawAncientColumn(520, 260, 1.16);
  } else if (theme === "death" || theme === "canyon") {
    drawWatchTower(2060, 1320);
    drawCanyonRock(1900, 280, 1.4);
  } else if (theme === "jungle") {
    drawJungleTree(2060, 1320, 1.45);
    drawJungleTree(1900, 280, 1.2);
    drawFernCluster(1540, 1260, 1.1);
    drawJungleRock(540, 270, 1.05);
  } else if (theme === "model" || theme === "neonworkshop") {
    drawMiniCone(2060, 1320, 0.2);
    drawTireStack(1900, 280, 0.64);
  } else if (theme === "fantasy") {
    drawHouse(2060, 1320);
    drawHouse(1900, 280);
  } else if (theme === "kartarena") {
    drawTireStack(2060, 1320, 0.7);
    drawMiniCone(1900, 280, 0.1);
  } else if (theme === "racetrack") {
    drawSpectatorStand(2060, 1320, 150, 58, "DZ");
    drawConcreteBarrier(1900, 280, 0.2);
  } else {
    drawHouse(2060, 1320);
    drawHouse(1900, 280);
  }
  if (!["jungle", "ancient", "morro", "waters", "racetrack", "fantasy", "kartarena", "model", "neonworkshop", "amc"].includes(theme)) {
    drawRock(1560, 1320, 1.6);
    drawRock(520, 245, 1.25);
  }
}

function drawAncientColumn(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(14, 28, 34, 13, 0.2, 0, TAU);
  ctx.fill();
  const col = ctx.createLinearGradient(-16, -64, 16, 48);
  col.addColorStop(0, "#eee0c6");
  col.addColorStop(0.5, "#a99b82");
  col.addColorStop(1, "#6e6658");
  ctx.fillStyle = col;
  roundRect(ctx, -12, -58, 24, 104, 7);
  ctx.fill();
  ctx.strokeStyle = "rgba(54,48,40,0.42)";
  ctx.lineWidth = 3;
  for (let xx = -7; xx <= 7; xx += 7) {
    ctx.beginPath();
    ctx.moveTo(xx, -52);
    ctx.lineTo(xx + 2, 38);
    ctx.stroke();
  }
  ctx.fillStyle = "#c9b899";
  roundRect(ctx, -24, -70, 48, 14, 4);
  ctx.fill();
  roundRect(ctx, -28, 42, 56, 16, 4);
  ctx.fill();
  ctx.fillStyle = "rgba(49,92,42,0.5)";
  ctx.beginPath();
  ctx.ellipse(-8, -68, 18, 6, -0.2, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawAncientWall(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.24)";
  ctx.beginPath();
  ctx.ellipse(12, 45, 90, 22, 0.16, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#8f8777";
  roundRect(ctx, -78, -58, 156, 100, 7);
  ctx.fill();
  ctx.fillStyle = "#bbae95";
  ctx.beginPath();
  ctx.moveTo(-78, -58);
  ctx.lineTo(-52, -80);
  ctx.lineTo(86, -72);
  ctx.lineTo(78, -58);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#565147";
  ctx.fillRect(-46, -22, 24, 44);
  ctx.fillRect(18, -30, 26, 26);
  ctx.strokeStyle = "rgba(55,48,40,0.3)";
  ctx.lineWidth = 3;
  for (let yy = -42; yy <= 28; yy += 24) {
    ctx.beginPath();
    ctx.moveTo(-70, yy);
    ctx.lineTo(70, yy + (yy % 2 ? 5 : -4));
    ctx.stroke();
  }
  drawMossPatch(-20, -60, 0.62);
  ctx.restore();
}

function drawAncientBlock(x, y, angle = 0, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.ellipse(10, 22, 50, 14, 0.1, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#9f927b";
  roundRect(ctx, -42, -24, 84, 48, 6);
  ctx.fill();
  ctx.fillStyle = "rgba(255,244,218,0.22)";
  ctx.fillRect(-36, -18, 70, 12);
  ctx.strokeStyle = "rgba(54,47,39,0.35)";
  ctx.lineWidth = 4;
  ctx.stroke();
  drawMossPatch(-8, -22, 0.5);
  ctx.restore();
}

function drawAncientStairs(x, y, angle = 0, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(s, s);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i % 2 ? "#9d927e" : "#b8aa91";
    ctx.fillRect(-76 + i * 10, -34 + i * 13, 152 - i * 20, 18);
    ctx.strokeStyle = "rgba(53,46,39,0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(-76 + i * 10, -34 + i * 13, 152 - i * 20, 18);
  }
  ctx.restore();
}

function drawMossPatch(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(52,116,48,0.58)";
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.ellipse(-18 + i * 10, (i % 2) * 5, 18, 7, i * 0.35, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawMorroSpire(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(18, 56, 72, 22, 0.14, 0, TAU);
  ctx.fill();
  const rock = ctx.createLinearGradient(-50, -120, 58, 70);
  rock.addColorStop(0, "#e0934e");
  rock.addColorStop(0.5, "#875139");
  rock.addColorStop(1, "#392923");
  ctx.fillStyle = rock;
  ctx.beginPath();
  ctx.moveTo(-66, 72);
  ctx.lineTo(-18, -112);
  ctx.lineTo(26, -72);
  ctx.lineTo(70, 72);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(37,23,19,0.45)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-10, -82);
  ctx.lineTo(-34, 58);
  ctx.moveTo(22, -50);
  ctx.lineTo(42, 58);
  ctx.moveTo(2, -26);
  ctx.lineTo(8, 62);
  ctx.stroke();
  ctx.fillStyle = "rgba(255,190,107,0.24)";
  ctx.beginPath();
  ctx.moveTo(-18, -98);
  ctx.lineTo(-46, 58);
  ctx.lineTo(-24, 62);
  ctx.lineTo(4, -70);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawMorroBoulder(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.24)";
  ctx.beginPath();
  ctx.ellipse(12, 24, 58, 17, 0.1, 0, TAU);
  ctx.fill();
  const colors = ["#b56e41", "#8f5438", "#d18a4e"];
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.ellipse(-26 + i * 26, -2 + (i % 2) * 8, 34, 24, i * 0.35, 0, TAU);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(42,25,20,0.38)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-42, -8);
  ctx.lineTo(34, 16);
  ctx.moveTo(-4, -24);
  ctx.lineTo(22, 22);
  ctx.stroke();
  ctx.restore();
}

function drawMorroRidge(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.ellipse(0, 44, 100, 22, 0.08, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#7d4d34";
  ctx.beginPath();
  ctx.moveTo(-100, 54);
  ctx.lineTo(-58, -34);
  ctx.lineTo(-8, 18);
  ctx.lineTo(38, -48);
  ctx.lineTo(104, 54);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(36,23,19,0.38)";
  ctx.lineWidth = 4;
  for (let i = -70; i <= 70; i += 28) {
    ctx.beginPath();
    ctx.moveTo(i, -8 + Math.sin(i) * 8);
    ctx.lineTo(i + 18, 46);
    ctx.stroke();
  }
  ctx.restore();
}

function drawMorroShrub(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(10, 18, 36, 10, 0.12, 0, TAU);
  ctx.fill();
  const colors = ["#6e7b43", "#8a8a4c", "#4d673c"];
  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.rotate((TAU / 8) * i);
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.ellipse(0, -20, 6, 22, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function drawMorroGuardPost(x, y, angle, side) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#191716";
  ctx.fillRect(-7, -24 * side, 14, 48 * side);
  ctx.fillStyle = "#f3eadc";
  ctx.fillRect(-12, -27 * side, 24, 8 * side);
  ctx.strokeStyle = "rgba(20,18,17,0.84)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-34, -20 * side);
  ctx.lineTo(34, -20 * side);
  ctx.stroke();
  ctx.restore();
}

function drawWatersReeds(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.strokeStyle = "#5b7b37";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 9, 16);
    ctx.quadraticCurveTo(i * 8 + Math.sin(i) * 6, -8, i * 5, -34 - (i % 2) * 8);
    ctx.stroke();
    ctx.fillStyle = "#8f6b38";
    ctx.beginPath();
    ctx.ellipse(i * 5, -34 - (i % 2) * 8, 4, 11, 0, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawWatersBush(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.16)";
  ctx.beginPath();
  ctx.ellipse(14, 22, 52, 15, 0.18, 0, TAU);
  ctx.fill();
  const colors = ["#7f9140", "#a6b552", "#5d7838"];
  for (let i = 0; i < 7; i++) {
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.ellipse(Math.cos(i * 0.9) * 23, Math.sin(i * 0.9) * 13, 25, 16, i * 0.4, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawWatersFencePost(x, y, angle, side) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#75411f";
  ctx.fillRect(-7, -28 * side, 14, 56 * side);
  ctx.fillStyle = "#9a5a2d";
  ctx.fillRect(-12, -31 * side, 24, 8 * side);
  ctx.strokeStyle = "#623417";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-34, -22 * side);
  ctx.lineTo(34, -22 * side);
  ctx.stroke();
  ctx.restore();
}

function drawWatersDockPlanks(x, y, angle = 0, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.16)";
  ctx.beginPath();
  ctx.ellipse(8, 24, 54, 14, 0.1, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#a76534";
  roundRect(ctx, -48, -22, 96, 44, 5);
  ctx.fill();
  ctx.strokeStyle = "#5c3218";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.lineWidth = 3;
  for (let px = -32; px <= 32; px += 16) {
    ctx.beginPath();
    ctx.moveTo(px, -20);
    ctx.lineTo(px, 20);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWatersPebbles(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  const colors = ["#c39c6b", "#8c765d", "#d7bd8b"];
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.ellipse(-28 + i * 12, (i % 2) * 9, 12, 7, i * 0.25, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawFernCluster(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(10, 18, 42, 13, 0.2, 0, TAU);
  ctx.fill();
  const colors = ["#2fc05a", "#63dc72", "#1d8c45"];
  for (let i = 0; i < 12; i++) {
    ctx.save();
    ctx.rotate(-1.35 + i * 0.245);
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.ellipse(0, -24, 8, 34, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function drawJungleLeafCluster(x, y, s = 1, seed = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(seed * 0.08);
  ctx.scale(s, s);
  const colors = ["#0b3a22", "#176337", "#278f45", "#69c962"];
  for (let i = 0; i < 10; i++) {
    ctx.save();
    ctx.rotate((TAU / 10) * i + seed * 0.11);
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.ellipse(0, -34 - (i % 3) * 5, 13, 40, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function drawJungleTree(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(20, 34, 54, 18, 0.2, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "#5e3b22";
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 48);
  ctx.bezierCurveTo(-10, 10, 14, -28, 4, -72);
  ctx.stroke();
  ctx.strokeStyle = "rgba(111,77,43,0.75)";
  ctx.lineWidth = 4;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(-6 + i * 4, 42);
    ctx.bezierCurveTo(2 + i * 3, 4, -4 + i * 6, -34, 4, -68);
    ctx.stroke();
  }
  drawJungleLeafCluster(0, -90, 0.9, x * 0.01 + y * 0.02);
  ctx.restore();
}

function drawJungleRock(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(10, 19, 52, 17, 0.1, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#667160";
  ctx.beginPath();
  ctx.ellipse(-12, 3, 38, 24, -0.2, 0, TAU);
  ctx.ellipse(22, 8, 31, 22, 0.18, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "rgba(38,102,46,0.58)";
  ctx.beginPath();
  ctx.ellipse(-2, -13, 24, 8, 0.2, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.24)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();
}

function drawJunglePost(x, y, angle, side) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#4b2b16";
  ctx.fillRect(-8, -24 * side, 16, 48 * side);
  ctx.fillStyle = "#2c170c";
  ctx.fillRect(-12, -27 * side, 24, 8 * side);
  ctx.strokeStyle = "rgba(255,226,165,0.28)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-30, -20 * side);
  ctx.lineTo(30, -20 * side);
  ctx.stroke();
  ctx.restore();
}

function drawPalm(x, y, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "#88552e";
  ctx.fillRect(-5, -2, 10, 38);
  ctx.fillStyle = "#0f8d4f";
  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.rotate((TAU / 8) * i);
    ctx.beginPath();
    ctx.ellipse(0, -30, 10, 36, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function drawBush(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#1f8f35";
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.ellipse(Math.cos(i * 1.25) * 16, Math.sin(i * 1.25) * 10, 20, 13, i, 0, TAU);
    ctx.fill();
  }
  ctx.fillStyle = "#2ec64c";
  ctx.beginPath();
  ctx.arc(0, 0, 13, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawRock(x, y, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "#747977";
  ctx.beginPath();
  ctx.ellipse(0, 0, 45, 30, -0.15, 0, TAU);
  ctx.ellipse(26, 8, 28, 22, 0.3, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.28)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();
}

function drawTire(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#16191d";
  ctx.beginPath();
  ctx.arc(0, 0, 19, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#5b6064";
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawHouse(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#724525";
  ctx.fillRect(-54, -36, 108, 74);
  ctx.fillStyle = "#45d8b2";
  ctx.fillRect(-34, -18, 28, 42);
  ctx.fillRect(13, -18, 28, 30);
  ctx.fillStyle = "#4a2c17";
  ctx.beginPath();
  ctx.moveTo(-68, -36);
  ctx.lineTo(0, -84);
  ctx.lineTo(68, -36);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawToyCrate(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(0.18);
  ctx.fillStyle = "#c28b55";
  ctx.fillRect(-38, -30, 76, 60);
  ctx.strokeStyle = "#6e4322";
  ctx.lineWidth = 5;
  ctx.strokeRect(-38, -30, 76, 60);
  ctx.beginPath();
  ctx.moveTo(-36, -28);
  ctx.lineTo(36, 28);
  ctx.moveTo(36, -28);
  ctx.lineTo(-36, 28);
  ctx.stroke();
  ctx.restore();
}

function drawRuin(x, y, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(16, 26, 70, 22, 0.18, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#3e4245";
  ctx.fillRect(-46, -46, 92, 92);
  ctx.fillStyle = "#51575c";
  ctx.beginPath();
  ctx.moveTo(-46, -46);
  ctx.lineTo(-16, -70);
  ctx.lineTo(52, -58);
  ctx.lineTo(46, -46);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#202326";
  ctx.fillRect(-32, -24, 18, 24);
  ctx.fillRect(12, -28, 20, 20);
  ctx.fillRect(-6, 16, 26, 30);
  ctx.fillStyle = "#22262a";
  ctx.beginPath();
  ctx.moveTo(-46, -46);
  ctx.lineTo(-15, -26);
  ctx.lineTo(-46, -8);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#6c7073";
  ctx.fillRect(-52, -52, 42, 12);
  ctx.fillRect(8, -56, 48, 12);
  ctx.strokeStyle = "rgba(255,255,255,0.11)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(-40 + i * 26, -37);
    ctx.lineTo(-34 + i * 18, 38);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(0,0,0,0.42)";
  ctx.lineWidth = 5;
  ctx.strokeRect(-46, -46, 92, 92);
  ctx.restore();
}

function drawBarricade(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(0.35);
  ctx.fillStyle = "#252525";
  for (let i = -2; i <= 2; i++) ctx.fillRect(i * 19, -15, 10, 44);
  ctx.strokeStyle = "#e8c23d";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-54, 0);
  ctx.lineTo(54, 0);
  ctx.stroke();
  ctx.restore();
}

function drawCanyonRock(x, y, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = "#9a6b45";
  ctx.beginPath();
  ctx.moveTo(-48, 30);
  ctx.lineTo(-18, -42);
  ctx.lineTo(28, -30);
  ctx.lineTo(58, 28);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.restore();
}

function drawConeLine(x, y) {
  ctx.save();
  ctx.translate(x, y);
  for (let i = -2; i <= 2; i++) {
    ctx.fillStyle = "#f06f23";
    ctx.beginPath();
    ctx.moveTo(i * 24, -18);
    ctx.lineTo(i * 24 - 10, 14);
    ctx.lineTo(i * 24 + 10, 14);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillRect(i * 24 - 6, 0, 12, 4);
  }
  ctx.restore();
}

function drawWatchTower(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = "#2b2018";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-30, 48);
  ctx.lineTo(-10, -46);
  ctx.moveTo(30, 48);
  ctx.lineTo(10, -46);
  ctx.moveTo(-28, 0);
  ctx.lineTo(28, 0);
  ctx.stroke();
  ctx.fillStyle = "#6e4930";
  ctx.fillRect(-36, -72, 72, 32);
  ctx.fillStyle = "#ffd64d";
  ctx.fillRect(-10, -62, 20, 12);
  ctx.restore();
}

function drawItems() {
  for (const item of state.items) {
    if (!item.active) {
      if (item.respawn > 0 && item.respawn < 3) {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.globalAlpha = clamp(1 - item.respawn / 3, 0, 0.55);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 26 + Math.sin(item.pulse * 5) * 4, 0, TAU);
        ctx.stroke();
        ctx.restore();
      }
      continue;
    }
    const info = itemInfo[item.type] || itemInfo.unknown;
    const r = 17 + Math.sin(item.pulse) * 3;
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.pulse * 0.3);
    ctx.shadowColor = info.color;
    ctx.shadowBlur = item.rare ? 24 : 14;
    ctx.globalAlpha = item.lifetime < 3 ? 0.45 + Math.sin(state.time * 14) * 0.25 : 1;
    ctx.fillStyle = info.color;
    ctx.strokeStyle = "#071019";
    ctx.lineWidth = 4;
    roundRect(ctx, -r, -r, r * 2, r * 2, 6);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#071019";
    ctx.font = "900 11px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(info.label, 0, 1);
    ctx.restore();
  }
}

function drawProjectiles() {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const shot of state.projectiles) {
    const alpha = clamp(shot.life / shot.maxLife, 0, 1);
    ctx.strokeStyle = shot.color;
    ctx.lineWidth = shot.radius * 1.25;
    ctx.lineCap = "round";
    ctx.globalAlpha = 0.24 + alpha * 0.5;
    ctx.beginPath();
    shot.trail.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.lineTo(shot.x, shot.y);
    ctx.stroke();

    const glow = ctx.createRadialGradient(shot.x, shot.y, 1, shot.x, shot.y, shot.radius * 4.6);
    glow.addColorStop(0, shot.color);
    glow.addColorStop(0.42, shot.color);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalAlpha = 0.76 * alpha;
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(shot.x, shot.y, shot.radius * 4.6, 0, TAU);
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(shot.x, shot.y, Math.max(2.5, shot.radius * 0.52), 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawExplosions() {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const boom of state.explosions) {
    const t = clamp(boom.age / boom.life, 0, 1);
    const r = (34 + boom.size * 28) * t;
    ctx.globalAlpha = (1 - t) * 0.82;
    const glow = ctx.createRadialGradient(boom.x, boom.y, 1, boom.x, boom.y, r);
    glow.addColorStop(0, "#ffffff");
    glow.addColorStop(0.24, boom.color);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(boom.x, boom.y, r, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = boom.color;
    ctx.lineWidth = 5 * (1 - t);
    ctx.beginPath();
    ctx.arc(boom.x, boom.y, r * 0.62, 0, TAU);
    ctx.stroke();
  }
  ctx.restore();
}

function drawOilHazards() {
  if (!state.track.level.oil) return;
  for (let i = 0; i < 9; i++) {
    const p = pointAt(state.track, (state.track.length / 9) * i + 260, [-58, 0, 58][i % 3]);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle + 0.15);
    ctx.fillStyle = "rgba(8, 10, 13, 0.72)";
    ctx.beginPath();
    ctx.ellipse(0, 0, 34, 18, 0.2, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "rgba(80, 180, 255, 0.32)";
    ctx.beginPath();
    ctx.ellipse(7, -3, 18, 7, -0.2, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
}

function drawMudHazards() {
  if (!state.track.level.mud) return;
  for (let i = 0; i < 11; i++) {
    const p = pointAt(state.track, (state.track.length / 11) * i + 170, [-64, -22, 28, 68][i % 4]);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle - 0.18);
    ctx.fillStyle = "rgba(82, 49, 28, 0.72)";
    ctx.beginPath();
    ctx.ellipse(0, 0, 48, 23, 0.15, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "rgba(126, 82, 44, 0.58)";
    ctx.beginPath();
    ctx.ellipse(10, -4, 25, 9, -0.2, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(52,32,20,0.45)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-32, -2);
    ctx.lineTo(34, 7);
    ctx.stroke();
    ctx.restore();
  }
}

function drawTraffic() {
  for (const traffic of state.traffic) {
    const p = pointAt(state.track, traffic.progress, traffic.lane + Math.sin(traffic.wobble) * 4);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle + (traffic.dir < 0 ? Math.PI : 0));
    ctx.scale(0.58, 0.58);
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.ellipse(0, 12, 38, 20, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#111";
    ctx.fillRect(-24, -21, 12, 12);
    ctx.fillRect(14, -21, 12, 12);
    ctx.fillRect(-24, 9, 12, 12);
    ctx.fillRect(14, 9, 12, 12);
    ctx.fillStyle = traffic.color;
    roundRect(ctx, -30, -17, 60, 34, 8);
    ctx.fill();
    ctx.strokeStyle = "#05080c";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillRect(6, -10, 16, 20);
    ctx.fillStyle = "#ffe66c";
    ctx.fillRect(25, -10, 7, 6);
    ctx.fillRect(25, 4, 7, 6);
    ctx.restore();
  }
}

function drawSpyHelicopter() {
  if (state.track.level.theme !== "spy") return;
  const p = pointAt(state.track, (state.time * 210 + 480) % state.track.length, -20);
  ctx.save();
  ctx.translate(p.x, p.y - 72);
  ctx.rotate(p.angle + Math.sin(state.time * 2) * 0.12);
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(34, 96, 58, 18, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#f4f7ff";
  ctx.strokeStyle = "#1f2a3a";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(0, 0, 42, 13, 0, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#2e71ff";
  ctx.fillRect(18, -5, 34, 10);
  ctx.strokeStyle = "#f4f7ff";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-52, 0);
  ctx.lineTo(52, 0);
  ctx.moveTo(0, -22);
  ctx.lineTo(0, 22);
  ctx.stroke();
  ctx.restore();
}

function getCarSprite(car) {
  if (!car?.sprite) return null;
  if (!carSpriteCache.has(car.sprite)) {
    const image = new Image();
    image.src = car.sprite;
    carSpriteCache.set(car.sprite, image);
  }
  const image = carSpriteCache.get(car.sprite);
  return image?.complete && image.naturalWidth ? image : null;
}

function drawSpriteCar(racer, bodyLength, bodyWidth, speedGlow, wobble, lean, bounce) {
  const car = racer.car;
  const image = getCarSprite(car);
  if (!image) return false;
  const width = car.spriteWorldWidth || 88;
  const height = width * (image.naturalHeight / image.naturalWidth);

  ctx.save();
  ctx.translate(racer.x, racer.y);
  ctx.rotate(racer.angle + wobble + lean + (car.spriteAngleOffset || 0));
  ctx.translate(0, bounce);

  ctx.fillStyle = `rgba(0,0,0,${0.32 + speedGlow * 0.14})`;
  ctx.beginPath();
  ctx.ellipse(-4, 10, width * 0.46, height * 0.52, 0, 0, TAU);
  ctx.fill();

  if (speedGlow > 0.52) drawSpeedStreaks(car, bodyLength, bodyWidth, speedGlow);
  if (racer.player && racer.turbo > 0) drawExhaustFlame(car, bodyLength);

  ctx.drawImage(image, -width / 2, -height / 2, width, height);

  if (racer.ram > 0) {
    ctx.strokeStyle = "rgba(255,214,77,0.95)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 34 + Math.sin(state.time * 24) * 4, 0, TAU);
    ctx.stroke();
  }
  if (racer.shield > 0) {
    ctx.strokeStyle = "rgba(72,216,255,0.82)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, width * 0.56, height * 0.72, 0, 0, TAU);
    ctx.stroke();
  }
  if (racer.hitFlash > 0) {
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = `rgba(255,80,90,${clamp(racer.hitFlash * 3, 0, 0.9)})`;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(0, 0, width * 0.58, height * 0.78, 0, 0, TAU);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
  }
  ctx.restore();

  ctx.font = "900 11px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.strokeStyle = "#071019";
  ctx.lineWidth = 3;
  const labelY = racer.y - height * 0.72;
  ctx.strokeText(racer.name, racer.x, labelY);
  ctx.fillStyle = racer.player ? "#fff" : "rgba(255,255,255,0.86)";
  ctx.fillText(racer.name, racer.x, labelY);
  return true;
}

function safeDrawCar(racer) {
  if (!ensureRacerPose(racer, "draw-car")) return;
  if (state.disableDetailedCarSprites) {
    drawFallbackCar(racer);
    return;
  }
  const previousTransform = ctx.getTransform ? ctx.getTransform() : null;
  try {
    drawCar(racer);
  } catch (error) {
    state.disableDetailedCarSprites = true;
    if (previousTransform && ctx.setTransform) ctx.setTransform(previousTransform);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.shadowBlur = 0;
    ctx.lineDashOffset = 0;
    if (performance.now() - (state.lastDrawErrorAt || 0) > 1500) {
      console.error("Erro ao desenhar carrinho. Usando sprite seguro.", error);
      showMessage("Sprite seguro ativado: corrida continua sem travar.", 1.8);
      state.lastDrawErrorAt = performance.now();
    }
    drawFallbackCar(racer);
  }
}

function drawFallbackCar(racer) {
  const car = racer.car || cars[0];
  const isKart = car.kind === "kart";
  const bodyLength = isKart ? 44 : 50;
  const bodyWidth = isKart ? 24 : 23;
  const front = bodyLength / 2;
  const rear = -bodyLength / 2;
  const half = bodyWidth / 2;
  const mark = rcCarDecal(car);

  ctx.save();
  ctx.translate(racer.x, racer.y);
  ctx.rotate(racer.angle || 0);
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(-3, 8, bodyLength * 0.58, bodyWidth * 0.68, 0, 0, TAU);
  ctx.fill();

  ctx.fillStyle = "#05070a";
  for (const wx of [rear + 10, front - 11]) {
    for (const wy of [-half - 5, half + 5]) {
      roundRect(ctx, wx - 6, wy - 4.5, 12, 9, 3);
      ctx.fill();
    }
  }

  const body = ctx.createLinearGradient(rear, -half, front, half);
  body.addColorStop(0, car.dark || "#111");
  body.addColorStop(0.42, car.color || "#26d8ff");
  body.addColorStop(1, "#f8ffff");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.moveTo(front + 3, 0);
  ctx.bezierCurveTo(front - 3, -half, front - 16, -half - 4, rear + 12, -half - 3);
  ctx.bezierCurveTo(rear - 8, -half * 0.8, rear - 9, half * 0.8, rear + 12, half + 3);
  ctx.bezierCurveTo(front - 16, half + 4, front - 3, half, front + 3, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#05080e";
  ctx.lineWidth = 2.8;
  ctx.stroke();

  ctx.fillStyle = "rgba(8,12,20,0.9)";
  roundRect(ctx, front - 34, -half + 5, 18, bodyWidth - 10, 5);
  ctx.fill();
  roundRect(ctx, rear + 11, -half + 6, 16, bodyWidth - 12, 5);
  ctx.fill();

  ctx.fillStyle = car.stripe || "#ffffff";
  roundRect(ctx, rear + 11, -4, bodyLength - 22, 8, 3);
  ctx.fill();
  ctx.fillStyle = "#071019";
  ctx.font = "900 10px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(mark, -1, 0.5);

  if (!isKart) {
    ctx.fillStyle = car.dark || "#111";
    roundRect(ctx, rear - 10, -half - 8, 11, bodyWidth + 16, 3);
    ctx.fill();
    ctx.strokeStyle = car.neon || car.color || "#26d8ff";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = car.neon || car.color || "#26d8ff";
  ctx.shadowColor = car.neon || car.color || "#26d8ff";
  ctx.shadowBlur = 8;
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.moveTo(front - 7, -half + 6);
  ctx.lineTo(front + 1, -half + 10);
  ctx.moveTo(front - 7, half - 6);
  ctx.lineTo(front + 1, half - 10);
  ctx.stroke();
  ctx.restore();

  ctx.font = "900 11px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.strokeStyle = "#071019";
  ctx.lineWidth = 3;
  const labelY = racer.y - (isKart ? 32 : 30);
  ctx.strokeText(racer.name, racer.x, labelY);
  ctx.fillStyle = racer.player ? "#fff" : "rgba(255,255,255,0.86)";
  ctx.fillText(racer.name, racer.x, labelY);
}

function drawCar(racer) {
  const car = racer.car;
  const wobble = racer.stun > 0 ? Math.sin(state.time * 30) * 0.18 : 0;
  const speedGlow = clamp(Math.abs(racer.speed) / 430, 0, 1);
  const bodyLength = car.kind === "kart" ? 54 : 56;
  const bodyWidth = car.kind === "kart" ? 27 : 25;
  const highDetail = car.kind !== "kart" || racer.player || state.renderScale >= 1.04;
  const wheelSpin = state.time * racer.speed * 0.075;
  const bounce = Math.sin(state.time * (9 + speedGlow * 8) + racer.total * 0.012) * speedGlow * 0.75;
  const leanSeed = racer.humanIndex ?? (racer.name ? racer.name.length : 0);
  const lean = Math.sin(state.time * 8 + leanSeed * 1.7) * speedGlow * 0.018;

  if (drawSpriteCar(racer, bodyLength, bodyWidth, speedGlow, wobble, lean, bounce)) return;

  ctx.save();
  ctx.translate(racer.x, racer.y);
  ctx.rotate(racer.angle + wobble + lean);
  ctx.translate(0, bounce);

  ctx.fillStyle = `rgba(0,0,0,${0.34 + speedGlow * 0.13})`;
  ctx.beginPath();
  ctx.ellipse(-4, 9, bodyLength * 0.58, bodyWidth * 0.64, 0, 0, TAU);
  ctx.fill();

  drawNeonUnderglow(car, bodyLength, bodyWidth, speedGlow);
  if (highDetail && speedGlow > 0.48) drawSpeedStreaks(car, bodyLength, bodyWidth, speedGlow);
  if (racer.player && racer.turbo > 0) drawExhaustFlame(car, bodyLength);

  drawWheels(car, bodyLength, bodyWidth, wheelSpin, highDetail);

  if (car.kind === "kart") {
    drawKart(car, bodyLength, bodyWidth, racer);
  } else {
    drawSportsBody(car, bodyLength, bodyWidth);
  }

  if (car.kind === "kart") drawKartRearBumper(car, bodyLength, bodyWidth);
  if (highDetail) drawRcAntenna(car, bodyLength, bodyWidth, speedGlow);

  if (car.kind === "kart") drawNeonLights(car, bodyLength, bodyWidth, speedGlow);

  if (racer.ram > 0) {
    ctx.strokeStyle = "rgba(255,214,77,0.95)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 34 + Math.sin(state.time * 24) * 4, 0, TAU);
    ctx.stroke();
  }
  if (racer.shield > 0) {
    ctx.strokeStyle = "rgba(72,216,255,0.82)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, bodyLength * 0.62, bodyWidth * 1.08, 0, 0, TAU);
    ctx.stroke();
  }
  if (racer.hitFlash > 0) {
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = `rgba(255,80,90,${clamp(racer.hitFlash * 3, 0, 0.9)})`;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(0, 0, bodyLength * 0.68, bodyWidth * 1.12, 0, 0, TAU);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
  }
  ctx.restore();

  ctx.font = "900 11px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.strokeStyle = "#071019";
  ctx.lineWidth = 3;
  const labelY = racer.y - (car.kind === "kart" ? 34 : 31);
  ctx.strokeText(racer.name, racer.x, labelY);
  ctx.fillStyle = racer.player ? "#fff" : "rgba(255,255,255,0.86)";
  ctx.fillText(racer.name, racer.x, labelY);
}

function drawNeonUnderglow(car, bodyLength, bodyWidth, speedGlow) {
  const pulse = 0.58 + speedGlow * 0.22;
  ctx.save();
  ctx.globalAlpha = 0.12 + pulse * 0.12;
  ctx.fillStyle = car.neon;
  ctx.beginPath();
  ctx.ellipse(0, 3, bodyLength * 0.58, bodyWidth * 0.68, 0, 0, TAU);
  ctx.fill();

  ctx.globalAlpha = 0.08 + speedGlow * 0.12;
  ctx.fillStyle = car.stripe;
  ctx.beginPath();
  ctx.ellipse(-bodyLength * 0.05, bodyWidth * 0.38, bodyLength * 0.36, bodyWidth * 0.1, 0, 0, TAU);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-bodyLength * 0.05, -bodyWidth * 0.38, bodyLength * 0.36, bodyWidth * 0.1, 0, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawNeonLights(car, bodyLength, bodyWidth, speedGlow) {
  const front = bodyLength / 2;
  const rear = -bodyLength / 2;
  const half = bodyWidth / 2;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 13 + speedGlow * 16;
  ctx.strokeStyle = "#dfffff";
  ctx.lineWidth = 3.4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(front - 9, -half + 7);
  ctx.lineTo(front + 1, -half + 12);
  ctx.moveTo(front - 9, half - 7);
  ctx.lineTo(front + 1, half - 12);
  ctx.stroke();

  ctx.strokeStyle = car.neon;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(front - 13, -half + 5);
  ctx.lineTo(front + 1, -half + 12);
  ctx.moveTo(front - 13, half - 5);
  ctx.lineTo(front + 1, half - 12);
  ctx.stroke();

  ctx.shadowColor = "#ff315e";
  ctx.shadowBlur = 12;
  ctx.strokeStyle = "#ff315e";
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  ctx.moveTo(rear - 4, -half + 8);
  ctx.lineTo(rear + 8, -half + 8);
  ctx.moveTo(rear - 4, half - 8);
  ctx.lineTo(rear + 8, half - 8);
  ctx.stroke();

  ctx.shadowColor = "#ff9d2e";
  ctx.strokeStyle = "#ff9d2e";
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(front - 7, -half + 15);
  ctx.lineTo(front - 2, -half + 17);
  ctx.moveTo(front - 7, half - 15);
  ctx.lineTo(front - 2, half - 17);
  ctx.stroke();
  ctx.restore();
}

function drawSportsBody(car, bodyLength, bodyWidth) {
  const front = bodyLength / 2;
  const rear = -bodyLength / 2;
  const half = bodyWidth / 2;
  const mark = rcCarDecal(car);
  const isDzCar = mark === "DZ";
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // Carrinho RC premium visto de cima: compacto, rodas aparentes e leitura limpa em alta velocidade.
  drawRcSportFenders(front, rear, half, car);

  drawRearWing(rear + 5, 0, car, bodyWidth * 0.82);

  const paint = ctx.createLinearGradient(rear - 6, -half - 7, front + 6, half + 7);
  paint.addColorStop(0, car.dark);
  paint.addColorStop(0.22, car.color);
  paint.addColorStop(0.58, car.color);
  paint.addColorStop(0.84, isDzCar ? "#101721" : shadeColor(car.color, 18));
  paint.addColorStop(1, "#f9fdff");

  ctx.fillStyle = paint;
  ctx.beginPath();
  ctx.moveTo(front + 3, 0);
  ctx.bezierCurveTo(front - 1, -half * 0.92, front - 10, -half - 5, front - 22, -half - 6);
  ctx.lineTo(rear + 17, -half - 5);
  ctx.bezierCurveTo(rear + 4, -half - 3, rear - 8, -half * 0.72, rear - 10, 0);
  ctx.bezierCurveTo(rear - 8, half * 0.72, rear + 4, half + 3, rear + 17, half + 5);
  ctx.lineTo(front - 22, half + 6);
  ctx.bezierCurveTo(front - 10, half + 5, front - 1, half * 0.92, front + 3, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#071018";
  ctx.lineWidth = 3;
  ctx.stroke();

  const hoodPanel = ctx.createLinearGradient(front - 5, -half, rear + 14, half);
  hoodPanel.addColorStop(0, isDzCar ? "rgba(3,5,9,0.86)" : "rgba(255,255,255,0.18)");
  hoodPanel.addColorStop(0.44, isDzCar ? "rgba(9,14,20,0.88)" : "rgba(255,255,255,0.34)");
  hoodPanel.addColorStop(1, isDzCar ? "rgba(3,5,9,0.82)" : "rgba(255,255,255,0.12)");
  ctx.fillStyle = hoodPanel;
  ctx.beginPath();
  ctx.moveTo(front - 6, 0);
  ctx.bezierCurveTo(front - 12, -half * 0.5, front - 24, -half * 0.44, front - 32, -half * 0.22);
  ctx.quadraticCurveTo(front - 36, 0, front - 32, half * 0.22);
  ctx.bezierCurveTo(front - 24, half * 0.44, front - 12, half * 0.5, front - 6, 0);
  ctx.closePath();
  ctx.fill();

  const glass = ctx.createLinearGradient(front - 22, -half, rear + 17, half);
  glass.addColorStop(0, "#111824");
  glass.addColorStop(0.48, "#687384");
  glass.addColorStop(1, "#060a10");
  ctx.fillStyle = glass;
  ctx.strokeStyle = "#071018";
  ctx.lineWidth = 2.3;
  ctx.beginPath();
  ctx.moveTo(front - 20, -half + 6);
  ctx.quadraticCurveTo(front - 12, 0, front - 20, half - 6);
  ctx.lineTo(front - 39, half - 5);
  ctx.quadraticCurveTo(front - 34, 0, front - 39, -half + 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.58)";
  ctx.beginPath();
  ctx.moveTo(front - 19, -half + 7);
  ctx.lineTo(front - 12, -half + 6);
  ctx.lineTo(front - 31, half - 4);
  ctx.lineTo(front - 37, half - 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#070c13";
  roundRect(ctx, rear + 9, -half + 6, 19, bodyWidth - 12, 5);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1.1;
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(rear + 12, -half + 9, 12, bodyWidth - 18);

  ctx.fillStyle = "#0b1018";
  roundRect(ctx, front - 11, -half + 4, 9, 7, 3);
  roundRect(ctx, front - 11, half - 11, 9, 7, 3);
  roundRect(ctx, front - 31, -half + 3, 13, 4.5, 2);
  roundRect(ctx, front - 31, half - 7.5, 13, 4.5, 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(5,10,16,0.72)";
  ctx.lineWidth = 2.2;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(rear + 18, side * (half + 0.5));
    ctx.quadraticCurveTo(-4, side * (half + 3.7), front - 19, side * (half + 0.8));
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 2.3;
  ctx.beginPath();
  ctx.moveTo(front - 8, -half + 6);
  ctx.quadraticCurveTo(front + 1, -half + 8, front + 2, -half + 11);
  ctx.moveTo(front - 8, half - 6);
  ctx.quadraticCurveTo(front + 1, half - 8, front + 2, half - 11);
  ctx.stroke();

  ctx.strokeStyle = car.neon;
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 9;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(rear + 12, -half + 2);
  ctx.quadraticCurveTo(-6, -half - 3, front - 12, -half + 7);
  ctx.moveTo(rear + 12, half - 2);
  ctx.quadraticCurveTo(-6, half + 3, front - 12, half - 7);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.beginPath();
  ctx.ellipse(-7, -half + 4.5, 11, 2.4, -0.15, 0, TAU);
  ctx.ellipse(-7, half - 4.5, 11, 2.4, 0.15, 0, TAU);
  ctx.fill();

  drawCarLivery(car, bodyLength, bodyWidth);
  ctx.restore();
}

function drawRcSportFenders(front, rear, half, car) {
  ctx.save();
  const fender = ctx.createLinearGradient(rear, -half, front, half);
  fender.addColorStop(0, car.dark);
  fender.addColorStop(0.5, car.color);
  fender.addColorStop(1, shadeColor(car.color, 20));
  ctx.fillStyle = fender;
  ctx.strokeStyle = "#03070a";
  ctx.lineWidth = 2.8;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(front - 23, side * (half - 1));
    ctx.bezierCurveTo(front - 19, side * (half + 10), front - 3, side * (half + 9), front + 2, side * (half - 1));
    ctx.bezierCurveTo(front - 6, side * (half - 7), front - 18, side * (half - 7), front - 23, side * (half - 1));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rear + 13, side * (half - 1));
    ctx.bezierCurveTo(rear + 22, side * (half + 11), rear + 39, side * (half + 8), rear + 42, side * (half - 2));
    ctx.bezierCurveTo(rear + 31, side * (half - 9), rear + 19, side * (half - 8), rear + 13, side * (half - 1));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = car.neon;
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 7;
  ctx.lineWidth = 1.4;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(rear + 12, side * (half + 2));
    ctx.quadraticCurveTo(-2, side * (half + 6), front - 12, side * (half + 2.5));
    ctx.stroke();
  }
  ctx.restore();
}

function drawRaceFenders(front, rear, half, car) {
  ctx.save();
  const fender = ctx.createLinearGradient(rear, -half, front, half);
  fender.addColorStop(0, car.dark);
  fender.addColorStop(0.45, car.color);
  fender.addColorStop(1, car.neon);
  ctx.fillStyle = fender;
  ctx.strokeStyle = "#02070d";
  ctx.lineWidth = 3.2;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(front - 40, side * (half - 1));
    ctx.bezierCurveTo(front - 28, side * (half + 13), front - 7, side * (half + 9), front - 1, side * (half - 2));
    ctx.lineTo(front - 17, side * (half - 13));
    ctx.bezierCurveTo(front - 30, side * (half - 10), front - 39, side * (half - 7), front - 40, side * (half - 1));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rear + 16, side * (half - 2));
    ctx.bezierCurveTo(rear + 30, side * (half + 13), rear + 52, side * (half + 8), rear + 56, side * (half - 4));
    ctx.lineTo(rear + 45, side * (half - 15));
    ctx.bezierCurveTo(rear + 31, side * (half - 11), rear + 20, side * (half - 8), rear + 16, side * (half - 2));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = car.neon;
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 8;
  ctx.lineWidth = 1.5;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(rear + 19, side * (half + 2));
    ctx.lineTo(front - 14, side * (half + 2));
    ctx.stroke();
  }
  ctx.restore();
}

function drawSidePod(front, rear, half, car) {
  ctx.save();
  const podGradient = ctx.createLinearGradient(rear, -half, front, half);
  podGradient.addColorStop(0, "rgba(2,8,14,0.92)");
  podGradient.addColorStop(0.38, car.dark);
  podGradient.addColorStop(1, "rgba(255,255,255,0.16)");
  ctx.fillStyle = podGradient;

  ctx.beginPath();
  ctx.moveTo(rear + 20, -half + 5);
  ctx.quadraticCurveTo(-8, -half - 3, front - 27, -half + 4);
  ctx.lineTo(front - 21, -half + 14);
  ctx.lineTo(rear + 9, -half + 15);
  ctx.quadraticCurveTo(rear + 3, -half + 12, rear + 20, -half + 5);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(rear + 20, half - 5);
  ctx.quadraticCurveTo(-8, half + 3, front - 27, half - 4);
  ctx.lineTo(front - 21, half - 14);
  ctx.lineTo(rear + 9, half - 15);
  ctx.quadraticCurveTo(rear + 3, half - 12, rear + 20, half - 5);
  ctx.closePath();
  ctx.fill();

  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = car.neon;
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 7;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(rear + 14, -half + 12);
  ctx.quadraticCurveTo(-6, -half + 6, front - 25, -half + 10);
  ctx.moveTo(rear + 14, half - 12);
  ctx.quadraticCurveTo(-6, half - 6, front - 25, half - 10);
  ctx.stroke();
  ctx.restore();
}

function drawArmoredBody(car, bodyLength, bodyWidth) {
  const front = bodyLength / 2;
  const rear = -bodyLength / 2;
  const half = bodyWidth / 2;
  const metal = ctx.createLinearGradient(rear, -half, front, half);
  metal.addColorStop(0, "#03070d");
  metal.addColorStop(0.2, car.dark);
  metal.addColorStop(0.5, car.color);
  metal.addColorStop(1, "#05070d");

  ctx.save();
  ctx.fillStyle = metal;
  ctx.beginPath();
  ctx.moveTo(front + 2, 0);
  ctx.lineTo(front - 10, -half + 3);
  ctx.lineTo(rear + 8, -half + 1);
  ctx.lineTo(rear - 5, -half + 12);
  ctx.lineTo(rear - 5, half - 12);
  ctx.lineTo(rear + 8, half - 1);
  ctx.lineTo(front - 10, half - 3);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#02060a";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  roundRect(ctx, -22, -half + 5, 42, bodyWidth - 10, 6);
  ctx.fill();
  ctx.fillStyle = car.color;
  roundRect(ctx, -18, -half + 8, 38, bodyWidth - 16, 5);
  ctx.fill();

  ctx.fillStyle = "rgba(2,6,10,0.86)";
  roundRect(ctx, -2, -half + 8, 23, bodyWidth - 16, 5);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.76)";
  ctx.fillRect(5, -8, 13, 16);

  ctx.strokeStyle = car.stripe;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rear + 9, -half + 7);
  ctx.lineTo(front - 15, -half + 7);
  ctx.moveTo(rear + 9, half - 7);
  ctx.lineTo(front - 15, half - 7);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 1.2;
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(rear + 16 + i * 17, -half + 4);
    ctx.lineTo(rear + 23 + i * 17, half - 4);
    ctx.stroke();
  }

  ctx.fillStyle = "#05070a";
  roundRect(ctx, front - 10, -half + 8, 8, 8, 3);
  ctx.fill();
  roundRect(ctx, front - 10, half - 16, 8, 8, 3);
  ctx.fill();
  ctx.restore();
}

function drawBuggyFrame(car, bodyLength, bodyWidth) {
  const front = bodyLength / 2;
  const rear = -bodyLength / 2;
  const half = bodyWidth / 2;
  ctx.save();
  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 8;
  roundRect(ctx, rear + 7, -half + 5, bodyLength - 14, bodyWidth - 10, 10);
  ctx.stroke();
  ctx.strokeStyle = car.neon;
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 10;
  ctx.lineWidth = 3;
  roundRect(ctx, rear + 7, -half + 5, bodyLength - 14, bodyWidth - 10, 10);
  ctx.stroke();
  ctx.shadowBlur = 0;

  const shell = ctx.createLinearGradient(rear, -half, front, half);
  shell.addColorStop(0, car.dark);
  shell.addColorStop(0.4, car.color);
  shell.addColorStop(1, car.dark);
  ctx.fillStyle = shell;
  roundRect(ctx, -25, -13, 48, 26, 9);
  ctx.fill();
  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "rgba(5,10,16,0.88)";
  roundRect(ctx, 2, -9, 17, 18, 5);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.68)";
  ctx.fillRect(8, -7, 6, 14);

  ctx.strokeStyle = car.dark;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-28, -16);
  ctx.lineTo(24, 16);
  ctx.moveTo(-28, 16);
  ctx.lineTo(24, -16);
  ctx.moveTo(rear + 8, 0);
  ctx.lineTo(front - 5, 0);
  ctx.stroke();

  ctx.fillStyle = car.stripe;
  roundRect(ctx, -19, -4, 31, 8, 4);
  ctx.fill();
  ctx.restore();
}

function drawKart(car, bodyLength, bodyWidth, racer) {
  const front = bodyLength / 2;
  const rear = -bodyLength / 2;
  const half = bodyWidth / 2;
  const paint = ctx.createLinearGradient(rear, -half, front, half);
  paint.addColorStop(0, car.dark);
  paint.addColorStop(0.22, car.color);
  paint.addColorStop(0.56, "#fff5b8");
  paint.addColorStop(0.76, car.color);
  paint.addColorStop(1, car.neon);

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.strokeStyle = "#05080e";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(rear + 5, -half * 0.75);
  ctx.lineTo(front - 11, -half * 0.46);
  ctx.moveTo(rear + 5, half * 0.75);
  ctx.lineTo(front - 11, half * 0.46);
  ctx.moveTo(rear + 8, 0);
  ctx.lineTo(front - 5, 0);
  ctx.stroke();

  ctx.strokeStyle = "#bfc7cc";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rear + 2, -half * 0.86);
  ctx.lineTo(front - 10, -half * 0.58);
  ctx.moveTo(rear + 2, half * 0.86);
  ctx.lineTo(front - 10, half * 0.58);
  ctx.stroke();

  ctx.fillStyle = "#111722";
  roundRect(ctx, rear - 1, -half * 0.72, 20, half * 1.44, 7);
  ctx.fill();
  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 2.2;
  ctx.stroke();
  ctx.fillStyle = "#303844";
  for (let y = -half * 0.45; y <= half * 0.45; y += half * 0.3) {
    roundRect(ctx, rear + 4, y - 2, 10, 4, 2);
    ctx.fill();
  }

  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 4;
  ctx.fillStyle = paint;
  ctx.beginPath();
  ctx.moveTo(front + 8, 0);
  ctx.quadraticCurveTo(front - 2, -half - 6, front - 22, -half - 1);
  ctx.lineTo(front - 32, -half * 0.52);
  ctx.quadraticCurveTo(front - 22, 0, front - 32, half * 0.52);
  ctx.lineTo(front - 22, half + 1);
  ctx.quadraticCurveTo(front - 2, half + 6, front + 8, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = car.color;
  ctx.beginPath();
  ctx.moveTo(rear + 12, -half + 3);
  ctx.quadraticCurveTo(-4, -half - 8, front - 18, -half + 2);
  ctx.lineTo(front - 26, -half * 0.4);
  ctx.quadraticCurveTo(-4, -half * 0.18, rear + 6, -half * 0.45);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(rear + 12, half - 3);
  ctx.quadraticCurveTo(-4, half + 8, front - 18, half - 2);
  ctx.lineTo(front - 26, half * 0.4);
  ctx.quadraticCurveTo(-4, half * 0.18, rear + 6, half * 0.45);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.beginPath();
  ctx.moveTo(front - 17, -half + 4);
  ctx.lineTo(front - 5, -half + 8);
  ctx.lineTo(front - 19, -2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#070d15";
  roundRect(ctx, -18, -half + 5, 34, bodyWidth - 10, 9);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.42)";
  ctx.lineWidth = 1.3;
  ctx.stroke();

  ctx.strokeStyle = "#bfc7cc";
  ctx.lineWidth = 3.4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(front - 1, -half - 2);
  ctx.quadraticCurveTo(front + 14, 0, front - 1, half + 2);
  ctx.stroke();

  ctx.fillStyle = "#fffdf0";
  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 2.1;
  const numberX = rear + 20;
  const numberY = half * 0.54;
  ctx.beginPath();
  ctx.arc(numberX, numberY, 7.8, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = car.color;
  ctx.font = "900 9px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const kartNumber = car.name.includes("Preto") ? "X" : String((Math.max(0, karts.indexOf(car)) * 2 + 5) % 10 || 7);
  ctx.fillText(kartNumber, numberX, numberY + 0.5);

  drawKartDriver(car, racer, bodyLength, bodyWidth);

  ctx.strokeStyle = car.neon;
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 9;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(rear + 12, -half + 2);
  ctx.quadraticCurveTo(0, -half - 4, front - 12, -half + 5);
  ctx.moveTo(rear + 12, half - 2);
  ctx.quadraticCurveTo(0, half + 4, front - 12, half - 5);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = car.stripe;
  roundRect(ctx, rear + 12, -3, bodyLength - 24, 6, 3);
  ctx.fill();
  ctx.restore();
}

function drawKartDriver(car, racer, bodyLength, bodyWidth) {
  const helmetPulse = 0.9 + Math.sin(state.time * 8 + (racer?.humanIndex || 0)) * 0.05;
  const front = bodyLength / 2;
  const half = bodyWidth / 2;
  const suit = car.stripe === "#111318" ? "#ffe15a" : "#ffd447";
  ctx.save();
  ctx.translate(-7, 0);

  ctx.fillStyle = "#151922";
  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, 0, 15, half * 0.72, 0, 0, TAU);
  ctx.fill();
  ctx.stroke();

  const suitPaint = ctx.createLinearGradient(-14, -half, 13, half);
  suitPaint.addColorStop(0, car.dark);
  suitPaint.addColorStop(0.4, suit);
  suitPaint.addColorStop(1, car.color);
  ctx.fillStyle = suitPaint;
  ctx.beginPath();
  ctx.ellipse(1, 0, 12, half * 0.52, 0, 0, TAU);
  ctx.fill();

  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(7, -7);
  ctx.lineTo(front - 15, -half * 0.42);
  ctx.moveTo(7, 7);
  ctx.lineTo(front - 15, half * 0.42);
  ctx.stroke();
  ctx.strokeStyle = suit;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(7, -7);
  ctx.lineTo(front - 15, -half * 0.42);
  ctx.moveTo(7, 7);
  ctx.lineTo(front - 15, half * 0.42);
  ctx.stroke();

  ctx.strokeStyle = "#1d2230";
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.arc(front - 12, 0, 7, -1.1, 1.1);
  ctx.stroke();

  const helmet = ctx.createRadialGradient(-3, -4, 2, 0, 0, 13 * helmetPulse);
  helmet.addColorStop(0, "#ffffff");
  helmet.addColorStop(0.28, car.stripe);
  helmet.addColorStop(0.72, car.color);
  helmet.addColorStop(1, car.dark);
  ctx.fillStyle = helmet;
  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.arc(-4, 0, 12.5, 0, TAU);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(2,6,12,0.84)";
  roundRect(ctx, -5, -7, 15, 14, 5);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.58)";
  ctx.beginPath();
  ctx.ellipse(0, -3, 4, 2, -0.2, 0, TAU);
  ctx.fill();

  ctx.strokeStyle = car.neon;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-12, -8);
  ctx.quadraticCurveTo(-4, -13, 6, -8);
  ctx.moveTo(-12, 8);
  ctx.quadraticCurveTo(-4, 13, 6, 8);
  ctx.stroke();
  ctx.restore();
}

function drawKartRearBumper(car, bodyLength, bodyWidth) {
  const rear = -bodyLength / 2;
  const half = bodyWidth / 2;
  ctx.save();
  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(rear - 7, -half - 2);
  ctx.lineTo(rear - 13, half + 2);
  ctx.stroke();

  ctx.strokeStyle = "#bfc7cc";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rear - 9, -half - 1);
  ctx.lineTo(rear - 15, half + 1);
  ctx.stroke();

  ctx.fillStyle = "#15191f";
  roundRect(ctx, rear - 4, -8, 10, 16, 4);
  ctx.fill();
  ctx.strokeStyle = car.neon;
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 7;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(rear - 1, -5, 4, 10);
  ctx.restore();
}

function drawHotrodBody(car, bodyLength, bodyWidth) {
  const front = bodyLength / 2;
  const rear = -bodyLength / 2;
  const half = bodyWidth / 2;
  const paint = ctx.createLinearGradient(rear, -half, front, half);
  paint.addColorStop(0, car.dark);
  paint.addColorStop(0.3, car.color);
  paint.addColorStop(0.64, "#ffca67");
  paint.addColorStop(1, car.color);
  ctx.save();
  ctx.fillStyle = paint;
  ctx.beginPath();
  ctx.moveTo(front + 4, 0);
  ctx.lineTo(front - 6, -half + 5);
  ctx.lineTo(front - 31, -half + 3);
  ctx.lineTo(rear + 11, -half + 6);
  ctx.lineTo(rear - 4, -half + 13);
  ctx.lineTo(rear - 6, half - 13);
  ctx.lineTo(rear + 11, half - 6);
  ctx.lineTo(front - 31, half - 3);
  ctx.lineTo(front - 6, half - 5);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#090909";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = car.dark;
  roundRect(ctx, -10, -half + 5, 30, bodyWidth - 10, 7);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.beginPath();
  ctx.moveTo(3, -half + 7);
  ctx.lineTo(14, -half + 7);
  ctx.lineTo(4, half - 7);
  ctx.lineTo(-4, half - 7);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = car.stripe;
  roundRect(ctx, rear + 13, -5, bodyLength - 30, 10, 4);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.beginPath();
  ctx.moveTo(front - 25, -half + 4);
  ctx.lineTo(front - 8, -half + 8);
  ctx.lineTo(front - 22, -1);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#d9e0e5";
  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 4; i++) {
    const x = -1 + i * 7;
    roundRect(ctx, x, -half - 5, 4, 10, 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawExhaustFlame(car, bodyLength) {
  ctx.save();
  const tail = -bodyLength / 2;
  const flicker = Math.sin(state.time * 22) * 7 + Math.sin(state.time * 37) * 4;
  ctx.globalCompositeOperation = "lighter";
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 22;
  ctx.globalAlpha = 0.78;
  const outer = ctx.createLinearGradient(tail - 78, 0, tail, 0);
  outer.addColorStop(0, "rgba(255,38,174,0)");
  outer.addColorStop(0.34, "#ff45d6");
  outer.addColorStop(0.62, car.neon);
  outer.addColorStop(1, "#fff6b5");
  ctx.fillStyle = outer;
  ctx.beginPath();
  ctx.moveTo(tail - 5, -11);
  ctx.quadraticCurveTo(tail - 38, -17, tail - 76 - flicker, 0);
  ctx.quadraticCurveTo(tail - 38, 17, tail - 5, 11);
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = 0.88;
  ctx.shadowBlur = 8;
  ctx.fillStyle = "#fff7c9";
  ctx.beginPath();
  ctx.moveTo(tail - 4, -5);
  ctx.lineTo(tail - 42 - flicker * 0.45, 0);
  ctx.lineTo(tail - 4, 5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawSpeedStreaks(car, bodyLength, bodyWidth, speedGlow) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";
  for (let i = 0; i < 6; i++) {
    const y = [-bodyWidth * 0.42, bodyWidth * 0.42, -bodyWidth * 0.22, bodyWidth * 0.22, -bodyWidth * 0.05, bodyWidth * 0.05][i];
    const start = -bodyLength / 2 - 8 - i * 6;
    const end = start - 28 - speedGlow * 42;
    ctx.strokeStyle = i % 2 ? car.neon : "rgba(255,255,255,0.72)";
    ctx.globalAlpha = (0.12 + speedGlow * 0.25) * (1 - i * 0.08);
    ctx.lineWidth = 1.8 + speedGlow * 2.1;
    ctx.beginPath();
    ctx.moveTo(start, y);
    ctx.lineTo(end, y + Math.sin(state.time * 18 + i) * 3);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRcAntenna(car, bodyLength, bodyWidth, speedGlow) {
  const sway = Math.sin(state.time * 12 + bodyLength) * (3 + speedGlow * 5);
  ctx.save();
  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-bodyLength * 0.16, -bodyWidth * 0.48);
  ctx.quadraticCurveTo(-bodyLength * 0.22, -bodyWidth * 0.94, -bodyLength * 0.28 + sway, -bodyWidth * 1.25);
  ctx.stroke();
  ctx.fillStyle = car.neon;
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 9;
  ctx.beginPath();
  ctx.arc(-bodyLength * 0.28 + sway, -bodyWidth * 1.25, 4, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawWheels(car, bodyLength, bodyWidth, wheelSpin, highDetail = false) {
  const isKart = car.kind === "kart";
  const frontX = isKart ? bodyLength * 0.34 : bodyLength * 0.34;
  const rearX = isKart ? -bodyLength * 0.34 : -bodyLength * 0.36;
  const wheelY = isKart ? bodyWidth * 0.78 : bodyWidth * 0.9;
  const frontRadius = isKart ? 8.0 : 6.9;
  const rearRadius = isKart ? 8.4 : 7.25;

  drawStylishWheel(rearX, -wheelY, rearRadius, car, wheelSpin + 1.8, highDetail);
  drawStylishWheel(frontX, -wheelY, frontRadius, car, wheelSpin + 0.9, highDetail);
  drawStylishWheel(rearX, wheelY, rearRadius, car, wheelSpin + 2.7, highDetail);
  drawStylishWheel(frontX, wheelY, frontRadius, car, wheelSpin, highDetail);
}

function drawRcWheel(x, y, car, seed) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(seed * 0.35);
  ctx.fillStyle = "#101317";
  roundRect(ctx, -7, -5, 14, 10, 4);
  ctx.fill();
  ctx.strokeStyle = "#05070a";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = car.rim;
  ctx.fillRect(-4, -2, 8, 4);
  ctx.restore();
}

function drawStylishWheel(x, y, r, car, spin = 0, highDetail = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#020408";
  roundRect(ctx, -r * 1.18, -r * 0.62, r * 2.36, r * 1.24, r * 0.46);
  ctx.fill();
  ctx.strokeStyle = "#141b23";
  ctx.lineWidth = 2.2;
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.13)";
  ctx.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(i * r * 0.42, -r * 0.45);
    ctx.lineTo(i * r * 0.42 + 1, r * 0.45);
    ctx.stroke();
  }

  ctx.strokeStyle = car.rim;
  ctx.lineWidth = highDetail ? 2 : 1.4;
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 0.7, r * 0.42, 0, 0, TAU);
  ctx.stroke();

  ctx.fillStyle = highDetail ? car.rim : "#dbe4ec";
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 0.32, r * 0.22, 0, 0, TAU);
  ctx.fill();

  if (highDetail) {
    ctx.rotate(spin);
    ctx.strokeStyle = "#111820";
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      const a = (TAU / 6) * i;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * r * 0.56, Math.sin(a) * r * 0.34);
      ctx.stroke();
    }
    ctx.strokeStyle = car.neon;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.82, r * 0.52, 0, 0, TAU);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRearWing(x, y, car, width) {
  ctx.save();
  ctx.translate(x - 15, y);
  const half = width / 2;

  ctx.strokeStyle = "#03060a";
  ctx.lineWidth = 5.5;
  ctx.beginPath();
  ctx.moveTo(17, -half + 8);
  ctx.lineTo(40, -half + 1);
  ctx.moveTo(17, half - 8);
  ctx.lineTo(40, half - 1);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.34)";
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.moveTo(18, -half + 8);
  ctx.lineTo(38, -half + 2);
  ctx.moveTo(18, half - 8);
  ctx.lineTo(38, half - 2);
  ctx.stroke();

  const wing = ctx.createLinearGradient(-14, -half - 14, 8, half + 14);
  wing.addColorStop(0, car.neon);
  wing.addColorStop(0.18, car.color);
  wing.addColorStop(0.48, "#05070a");
  wing.addColorStop(0.72, car.dark);
  wing.addColorStop(1, car.neon);
  ctx.fillStyle = wing;
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 9;
  roundRect(ctx, -15, -half - 17, 24, width + 34, 5);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#02060a";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#05070a";
  roundRect(ctx, -21, -half - 20, 11, 21, 4);
  ctx.fill();
  roundRect(ctx, -21, half - 1, 11, 21, 4);
  ctx.fill();

  ctx.strokeStyle = car.neon;
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 12;
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.moveTo(-4, -half - 10);
  ctx.lineTo(-4, half + 10);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "rgba(255,255,255,0.34)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(0, -half - 11);
  ctx.lineTo(0, half + 11);
  ctx.moveTo(-12, -half + 2);
  ctx.lineTo(4, -half - 10);
  ctx.moveTo(-12, half - 2);
  ctx.lineTo(4, half + 10);
  ctx.stroke();
  ctx.restore();
}

function drawCarLivery(car, bodyLength, bodyWidth) {
  const front = bodyLength / 2;
  const rear = -bodyLength / 2;
  const half = bodyWidth / 2;
  const mark = rcCarDecal(car);
  const isDzCar = mark === "DZ";
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const centerStripe = isDzCar ? "#090d14" : car.stripe;
  ctx.globalAlpha = 0.96;
  ctx.fillStyle = centerStripe;
  roundRect(ctx, rear + 14, -4.1, bodyLength - 28, 8.2, 3);
  ctx.fill();

  ctx.fillStyle = isDzCar ? car.stripe : "#ffffff";
  roundRect(ctx, rear + 15, -10.1, bodyLength - 34, 2.8, 1.4);
  roundRect(ctx, rear + 15, 7.3, bodyLength - 34, 2.8, 1.4);
  ctx.fill();

  ctx.globalAlpha = 0.48;
  ctx.fillStyle = isDzCar ? car.neon : car.stripe;
  ctx.beginPath();
  ctx.moveTo(front - 29, -half + 4);
  ctx.lineTo(front - 15, -half + 8);
  ctx.lineTo(rear + 18, half - 8);
  ctx.lineTo(rear + 8, half - 12);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 1.35;
  ctx.beginPath();
  ctx.moveTo(rear + 14, -half + 5);
  ctx.quadraticCurveTo(-4, -half + 0.8, front - 18, -half + 3.6);
  ctx.moveTo(rear + 14, half - 5);
  ctx.quadraticCurveTo(-4, half - 0.8, front - 18, half - 3.6);
  ctx.stroke();

  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = car.neon;
  ctx.shadowColor = car.neon;
  ctx.shadowBlur = 7;
  ctx.lineWidth = 1.85;
  ctx.beginPath();
  ctx.moveTo(front - 23, half - 7);
  ctx.lineTo(rear + 12, half - 10);
  ctx.moveTo(front - 23, -half + 7);
  ctx.lineTo(rear + 12, -half + 10);
  ctx.stroke();
  ctx.globalCompositeOperation = "source-over";
  ctx.shadowBlur = 0;

  ctx.fillStyle = isDzCar ? "#05070a" : car.stripe;
  ctx.strokeStyle = "#05080e";
  ctx.lineWidth = 2.2;
  roundRect(ctx, rear + 12, -8.2, 18, 16.4, 5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = isDzCar ? car.stripe : car.dark;
  ctx.font = isDzCar ? "900 9px Trebuchet MS" : "900 9.5px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(mark, rear + 21, 0.8);

  ctx.fillStyle = car.stripe;
  ctx.strokeStyle = "#05080e";
  ctx.lineWidth = 1.8;
  roundRect(ctx, front - 26, -7.4, 18, 14.8, 4.5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = isDzCar ? "#05070a" : car.dark;
  ctx.font = isDzCar ? "900 9px Trebuchet MS" : "900 9.5px Trebuchet MS";
  ctx.fillText(mark, front - 17, 0.7);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.beginPath();
  ctx.ellipse(front - 5, -half + 2.3, 7, 2.3, 0.12, 0, TAU);
  ctx.ellipse(front - 5, half - 2.3, 7, 2.3, -0.12, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawMini() {
  mctx.clearRect(0, 0, mini.width, mini.height);
  mctx.fillStyle = "#d6bf7b";
  mctx.fillRect(0, 0, mini.width, mini.height);
  const sx = mini.width / WORLD.w;
  const sy = mini.height / WORLD.h;
  mctx.save();
  mctx.scale(sx, sy);
  mctx.strokeStyle = "#5e6267";
  mctx.lineWidth = state.track.level.road * 0.48;
  closedPath(mctx, state.track.points);
  mctx.stroke();
  mctx.strokeStyle = "#eee";
  mctx.lineWidth = 8;
  closedPath(mctx, state.track.points);
  mctx.stroke();
  for (const racer of state.racers.filter(hasValidRacerPose)) {
    mctx.fillStyle = racer.player ? "#073bff" : racer.car.color;
    mctx.beginPath();
    mctx.arc(racer.x, racer.y, racer.player ? 34 : 25, 0, TAU);
    mctx.fill();
  }
  mctx.restore();
}

function recoverRuntimeError(error) {
  if (performance.now() - (state.lastRuntimeErrorAt || 0) > 1500) {
    console.error("Erro recuperado no loop principal.", error);
    showMessage("Corrida recuperada automaticamente. Continue jogando.", 1.8);
    state.lastRuntimeErrorAt = performance.now();
  }
  state.keys.clear();
  state.disableDetailedCarSprites = true;
  for (const racer of state.racers) recoverRacerPose(racer, "runtime");
  try {
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.shadowBlur = 0;
    ctx.setLineDash([]);
  } catch (err) {
    // If the canvas context itself is unavailable, the next resize/reload will rebuild the frame.
  }
}

function loop(now) {
  const dt = clamp((now - state.last) / 1000, 0, 0.04);
  state.last = now;
  try {
    update(dt);
    render();
  } catch (error) {
    recoverRuntimeError(error);
  }
  state.fpsFrames += 1;
  state.fpsTimer += dt;
  if (state.fpsTimer >= 1) {
    state.fps = state.fpsFrames / state.fpsTimer;
    state.fpsFrames = 0;
    state.fpsTimer = 0;
    updateSystemStatus();
  }
  if (state.running) {
    state.rafId = requestAnimationFrame(loop);
  } else {
    state.rafId = 0;
  }
}

function resize() {
  view.w = window.innerWidth;
  view.h = window.innerHeight;
  const graphicsMode = currentGraphicsMode();
  const autoLimit = view.w > 1400 ? 1.08 : 1.18;
  const dprLimit = graphicsMode.dpr || autoLimit;
  view.dpr = clamp(window.devicePixelRatio || 1, 0.85, dprLimit);
  canvas.style.width = `${view.w}px`;
  canvas.style.height = `${view.h}px`;
  canvas.width = Math.floor(view.w * view.dpr);
  canvas.height = Math.floor(view.h * view.dpr);
  ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "medium";
  recenterCamera(true);
}

function togglePause() {
  if (!state.running || state.ended) return;
  state.paused = !state.paused;
  pauseBtn.textContent = state.paused ? "Continuar" : "Pausar";
  if (state.paused) {
    if (audio.engineGain && audio.ctx) audio.engineGain.gain.setTargetAtTime(0.003, audio.ctx.currentTime, 0.04);
    pauseMusic();
  } else {
    resumeAudio();
    startEngineSound();
    if (state.musicEnabled && !state.musicPaused) playMusic(false);
    else stopMusic(true);
    playSound("start", 0.55);
  }
}

function isFormKeyboardTarget(target) {
  if (!target) return false;
  const tag = target.tagName ? target.tagName.toUpperCase() : "";
  return target.isContentEditable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

function bindControls() {
  window.addEventListener("keydown", (event) => {
    if (state.binding) {
      event.preventDefault();
      if (event.code === "Escape") {
        state.binding = null;
        setupMenu();
        return;
      }
      const controls = playerControls[state.binding.playerIndex];
      if (controls) {
        controls[state.binding.actionId] = event.code;
        refreshControlLabels();
        saveControlBindings();
      }
      state.binding = null;
      setupMenu();
      return;
    }
    if (isFormKeyboardTarget(event.target)) return;
    const isGameControl = isConfiguredControlKey(event.code);
    if (isGameControl || ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "Enter"].includes(event.code)) event.preventDefault();
    if (event.code === "KeyC" && !event.repeat && !isGameControl) {
      event.preventDefault();
      cycleCameraMode();
      return;
    }
    if (event.code === "KeyP" && !isGameControl) togglePause();
    state.keys.add(event.code);
  });
  window.addEventListener("keyup", (event) => state.keys.delete(event.code));
  document.querySelectorAll("[data-hold]").forEach((btn) => {
    const code = btn.dataset.hold;
    const down = (event) => {
      event.preventDefault();
      state.keys.add(code);
    };
    const up = (event) => {
      event.preventDefault();
      state.keys.delete(code);
    };
    btn.addEventListener("pointerdown", down);
    btn.addEventListener("pointerup", up);
    btn.addEventListener("pointercancel", up);
    btn.addEventListener("pointerleave", up);
  });
}

function bindGarageSidebar() {
  document.querySelectorAll(".garage-sidebar [data-menu-sector], .garage-sidebar a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const sector = link.dataset.menuSector || link.getAttribute("href")?.replace("#", "");
      openMenuSector(sector, link);
    });
  });
}

function menuSectorTarget(sector) {
  const selectors = {
    identity: "#pilotName",
    controls: "#controlChoices",
    graphics: "#graphicsPanel",
    sound: "#musicChoices",
    players: "#playerChoices",
    online: "#onlineCreateBtn",
  };
  return document.querySelector(selectors[sector] || `#${sector}`);
}

function setGarageSidebarActive(activeSector) {
  document.querySelectorAll(".garage-sidebar [data-menu-sector]").forEach((item) => {
    item.classList.toggle("active", item.dataset.menuSector === activeSector);
  });
}

function resetMenuSectors() {
  document.querySelectorAll("#menu .setup-group").forEach((group) => {
    group.open = group.classList.contains("identity-group") || group.classList.contains("vehicle-group") || group.classList.contains("race-group");
  });
  document.querySelectorAll("#menu .compact-inner").forEach((panel) => {
    panel.open = false;
  });
  setGarageSidebarActive("");
  const scroller = document.querySelector("#menu .compact-setup");
  scroller?.scrollTo?.({ top: 0, behavior: "smooth" });
  startBtn?.focus?.({ preventScroll: true });
}

function openMenuSector(sector, source = null) {
  document.querySelectorAll("#menu .setup-group").forEach((item) => {
    delete item.dataset.focus;
  });

  if (sector === "exit") {
    state.keys.clear();
    if (state.running) shutdownGameSession({ showMenu: true });
    resetChampionship();
    resetMenuSectors();
    showMessage("Tela inicial limpa. Escolha o carro e aperte Jogar.", 1.5);
    return;
  }

  const target = menuSectorTarget(sector);
  if (!target) return;
  const group = target.closest(".setup-group");
  const compactPanel = target.closest(".compact-inner");
  if (group) group.open = true;
  if (group && sector) group.dataset.focus = sector;
  if (sector === "sound" && compactPanel) compactPanel.open = true;
  if (isMobileMenuLayout() && group) {
    document.querySelectorAll("#menu .setup-group").forEach((other) => {
      if (other !== group) other.open = false;
    });
    group.open = true;
  }
  setGarageSidebarActive(sector);
  revealMenuSector(target);

  const focusTarget = target.matches?.("input, select, button, textarea") ? target : target.querySelector?.("input, select, button");
  requestAnimationFrame(() => {
    if (typeof focusTarget?.focus === "function") focusTarget.focus({ preventScroll: true });
  });
  if (source) source.blur?.();
}

function revealMenuSector(target) {
  const group = target?.closest?.(".setup-group") || target;
  const scroller = document.querySelector("#menu .compact-setup");
  if (!group || !scroller) return;
  requestAnimationFrame(() => {
    const targetRectOuter = target.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const top = Math.max(0, scroller.scrollTop + targetRectOuter.top - scrollerRect.top - 8);
    scroller.scrollTo({ top, behavior: "auto" });
    const innerScroller = target.closest?.(".group-content");
    if (innerScroller && target !== group) {
      const targetRect = target.getBoundingClientRect();
      const innerRect = innerScroller.getBoundingClientRect();
      const innerTop = Math.max(0, innerScroller.scrollTop + targetRect.top - innerRect.top - 8);
      innerScroller.scrollTo?.({ top: innerTop, behavior: "auto" });
    }
  });
}

function bindMenuSectorVisibility() {
  document.querySelectorAll("#menu .setup-group").forEach((group) => {
    if (group.dataset.revealReady) return;
    group.addEventListener("toggle", () => {
      if (group.open) {
        if (isMobileMenuLayout()) {
          document.querySelectorAll("#menu .setup-group").forEach((other) => {
            if (other !== group) other.open = false;
          });
        }
        revealMenuSector(group);
      }
    });
    group.dataset.revealReady = "1";
  });
}

function isMobileMenuLayout() {
  return window.matchMedia("(max-width: 920px), (max-height: 620px)").matches;
}

function prepareMobileMenuSectors(force = false) {
  if (!isMobileMenuLayout()) {
    if (menu) delete menu.dataset.mobileSectorsPrepared;
    return;
  }
  if (!force && menu?.dataset.mobileSectorsPrepared) return;
  document.querySelectorAll("#menu .setup-group").forEach((group) => {
    group.open = group.classList.contains("vehicle-group");
  });
  if (menu) menu.dataset.mobileSectorsPrepared = "1";
}

startBtn.addEventListener("click", startRace);
onlineQuickBtn?.addEventListener("click", quickPlayOnline);
onlineCreateBtn?.addEventListener("click", createOnlineRoom);
onlineJoinBtn?.addEventListener("click", joinOnlineRoom);
onlineStartBtn?.addEventListener("click", startOnlineRaceFromLobby);
onlineSaveServerBtn?.addEventListener("click", saveOnlineServerUrl);
onlineRoomCode?.addEventListener("input", () => {
  onlineRoomCode.value = onlineRoomId(onlineRoomCode.value);
});
onlineServerUrl?.addEventListener("change", saveOnlineServerUrl);
pilotName?.addEventListener("input", syncOnlineProfile);
cameraBtn.addEventListener("click", cycleCameraMode);
musicBtn.addEventListener("click", toggleMusic);
nextMusicBtn.addEventListener("click", nextMusic);
pauseBtn.addEventListener("click", togglePause);
menuBtn.addEventListener("click", () => {
  resetChampionship();
  shutdownGameSession({ showMenu: true });
});
if (championshipResults) {
  championshipResults.addEventListener("click", (event) => {
    const action = event.target?.closest?.("[data-race-result-action]")?.dataset?.raceResultAction;
    if (action === "continue") continueAfterRace();
    if (action === "menu") returnToMenuAfterRace();
  });
}
window.addEventListener("resize", resize);
window.addEventListener("resize", () => prepareMobileMenuSectors());
window.addEventListener("pagehide", () => shutdownGameSession({ showMenu: true, closeContext: true }));
window.addEventListener("beforeunload", () => shutdownGameSession({ showMenu: false, closeContext: true }));
window.addEventListener("unload", () => shutdownGameSession({ showMenu: false, closeContext: true }));
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    state.keys.clear();
    if (audio.engineGain && audio.ctx) audio.engineGain.gain.setTargetAtTime(0.003, audio.ctx.currentTime, 0.04);
    pauseMusic();
    return;
  }
  if (state.running && !state.paused) {
    resumeAudio();
    startEngineSound();
    if (state.musicEnabled && !state.musicPaused) playMusic(false);
  }
});

loadControlBindings();
applyGraphicsSettings();
setupMenu();
bindControls();
bindGarageSidebar();
bindMenuSectorVisibility();
prepareMobileMenuSectors(true);
updateOnlineServerInput();

const bootParams = new URLSearchParams(window.location.search);
if (bootParams.has("category")) {
  const categoryParam = bootParams.get("category");
  if (vehicleCategories.some((category) => category.id === categoryParam)) {
    state.vehicleCategory = categoryParam;
    state.selectedCar = 0;
    setupMenu();
  }
}
if (bootParams.has("level")) {
  const bootLevel = clamp(Number(bootParams.get("level")) || 0, 0, levels.length - 1);
  state.selectedLevel = bootLevel;
  if (!bootParams.has("category")) {
    if (isPlusLevel(levels[bootLevel])) state.vehicleCategory = "plus";
    else if (isKartLevel(levels[bootLevel])) state.vehicleCategory = "kart";
    state.selectedCar = 0;
  }
  setupMenu();
}
if (bootParams.has("camera")) {
  const cameraParam = bootParams.get("camera");
  const byId = cameraModes.findIndex((mode) => mode.id === cameraParam);
  cameraMode = byId >= 0 ? byId : clamp(Number(cameraParam) || 0, 0, cameraModes.length - 1);
  setupMenu();
}
if (bootParams.get("mode") === "championship" || bootParams.get("championship") === "1") {
  state.raceMode = "championship";
  setupMenu();
}
if (bootParams.get("auto") === "1") {
  pilotName.value = "Preview";
  setTimeout(startRace, 120);
}
