// Troop data for Travian T4.6
// Source: travian.kirilloid.ru via Ash-Warden troops_t46.json
// cost = [lumber, clay, iron, crop]
// time = base training time in seconds at 1x speed, level 1 building

const TRIBE_LIST = [
  { id: 'romans', name: 'Romans' },
  { id: 'teutons', name: 'Teutons' },
  { id: 'gauls', name: 'Gauls' },
  { id: 'egyptians', name: 'Egyptians' },
  { id: 'huns', name: 'Huns' },
];

const TROOPS = {
  romans: {
    barracks: [
      { name: 'Legionnaire',  cost: [120,100,150,30],  time: 2000, upkeep: 1 },
      { name: 'Praetorian',   cost: [100,130,160,70],  time: 2200, upkeep: 1 },
      { name: 'Imperian',     cost: [150,160,210,80],  time: 2400, upkeep: 1 },
    ],
    stable: [
      { name: 'Equites Legati',        cost: [140,160,20,40],   time: 1700, upkeep: 2 },
      { name: 'Equites Imperatoris',   cost: [550,440,320,100], time: 3300, upkeep: 3 },
      { name: 'Equites Caesaris',      cost: [550,640,800,180], time: 4400, upkeep: 4 },
    ],
    workshop: [
      { name: 'Battering Ram',  cost: [900,360,500,70],   time: 4600, upkeep: 3 },
      { name: 'Fire Catapult',  cost: [950,1350,600,90],  time: 9000, upkeep: 6 },
    ],
  },
  teutons: {
    barracks: [
      { name: 'Maceman',   cost: [95,75,40,40],    time: 900,  upkeep: 1 },
      { name: 'Spearman',  cost: [145,70,85,40],   time: 1400, upkeep: 1 },
      { name: 'Axeman',    cost: [130,120,170,70],  time: 1500, upkeep: 1 },
      { name: 'Scout',     cost: [160,100,50,50],   time: 1400, upkeep: 1 },
    ],
    stable: [
      { name: 'Paladin',         cost: [370,270,290,75],  time: 3000, upkeep: 2 },
      { name: 'Teutonic Knight', cost: [450,515,480,80],  time: 3700, upkeep: 3 },
    ],
    workshop: [
      { name: 'Ram',      cost: [1000,300,350,70],  time: 4200, upkeep: 3 },
      { name: 'Catapult', cost: [900,1200,600,60],  time: 9000, upkeep: 6 },
    ],
  },
  gauls: {
    barracks: [
      { name: 'Phalanx',    cost: [100,130,55,30],   time: 1300, upkeep: 1 },
      { name: 'Swordsman',  cost: [140,150,185,60],  time: 1800, upkeep: 1 },
    ],
    stable: [
      { name: 'Pathfinder',        cost: [170,150,20,40],   time: 1700, upkeep: 2 },
      { name: 'Theutates Thunder',  cost: [350,450,230,60],  time: 3100, upkeep: 2 },
      { name: 'Druidrider',        cost: [360,330,280,120], time: 3200, upkeep: 2 },
      { name: 'Haeduan',           cost: [500,620,675,170], time: 3900, upkeep: 3 },
    ],
    workshop: [
      { name: 'Ram',       cost: [950,555,330,75],   time: 5000, upkeep: 3 },
      { name: 'Trebuchet', cost: [960,1450,630,90],  time: 9000, upkeep: 6 },
    ],
  },
  egyptians: {
    barracks: [
      { name: 'Slave Militia',    cost: [45,60,30,15],    time: 530,  upkeep: 1 },
      { name: 'Ash Warden',       cost: [115,100,145,60], time: 1380, upkeep: 1 },
      { name: 'Khopesh Warrior',  cost: [170,180,220,80], time: 1440, upkeep: 1 },
    ],
    stable: [
      { name: 'Sopdu Explorer',   cost: [170,150,20,40],   time: 1360, upkeep: 2 },
      { name: 'Anhur Guard',      cost: [360,330,280,120], time: 2560, upkeep: 2 },
      { name: 'Resheph Chariot',  cost: [450,560,610,180], time: 3240, upkeep: 3 },
    ],
    workshop: [
      { name: 'Ram',             cost: [995,575,340,80],   time: 4800, upkeep: 3 },
      { name: 'Stone Catapult',  cost: [980,1510,660,100], time: 9000, upkeep: 6 },
    ],
  },
  huns: {
    barracks: [
      { name: 'Mercenary', cost: [130,80,40,40],   time: 810,  upkeep: 1 },
      { name: 'Bowman',    cost: [140,110,60,60],   time: 1120, upkeep: 1 },
    ],
    stable: [
      { name: 'Spotter',       cost: [170,150,20,40],   time: 1360, upkeep: 2 },
      { name: 'Steppe Rider',  cost: [290,370,190,45],  time: 2400, upkeep: 2 },
      { name: 'Marksman',      cost: [320,350,330,50],  time: 2480, upkeep: 2 },
      { name: 'Marauder',      cost: [450,560,610,140], time: 2990, upkeep: 3 },
    ],
    workshop: [
      { name: 'Ram',      cost: [1060,330,360,70],  time: 4400, upkeep: 3 },
      { name: 'Catapult', cost: [950,1280,620,60],  time: 9000, upkeep: 6 },
    ],
  },
};
