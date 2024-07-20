export interface ICharacter {
  name: string;
  hitPointsCurrent: number;
  hitPointsMax: number;
  silver: number;
  level: number;
  weapon?: WeaponIdentifier;
  inventory: IItem[];
  points: number;
}

export interface IWeapon {
  id: WeaponIdentifier;
  name: string;
  damageDie: number;
  damageBonus: number;
  attackBonus: number;
  silver: number;
}

export enum WeaponIdentifier {
  warhammer,
  dagger,
  sword,
  flail,
  zweihander
}

export interface IItem {
  name: string;
  silver: number;
  uses: number;
  id: ItemIdentifier;
  onUse: (state: IState) => void;
}

export enum ItemIdentifier {
  potion,
  rope,
  armor,
  cloak,
  summon,
  palms,
  aegis,
  omen
}

export interface IMonster {
  name: string;
  damage: number;
  hitPoints: number;
  points: number;
  id: MonsterIdentifier;
  onKill: (state: IState) => void;
}

export enum MonsterIdentifier {
  skeleton,
  cultist,
  goblin,
  hound,
  sorcerer,
  troll,
  medusa,
  basilisk
}

export interface IState {
  character: ICharacter;
}

export interface IEffect {
  id: EffectIdetifier,
  uses: number
}

export enum EffectIdetifier {
  daemon
}

export enum Cardinality {
  north,
  east,
  south,
  west
}

export enum RoomShape {
  irregularCave,
  oval,
  cross,
  corridor,
  square,
  round,
  rectangular,
  triangular,
  skull,
  placeholder
}

export interface Room {
  shape: RoomShape;
  exits: Cardinality[];
  x: number;
  y: number;
}
