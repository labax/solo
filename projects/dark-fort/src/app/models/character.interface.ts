import {StateService} from '../services/state.service';

export interface ICharacter {
  name: string;
  hitPointsCurrent: number;
  hitPointsMax: number;
  silver: number;
  level: number;
  weapon: WeaponIdentifier;
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

export const weaponsTable: IWeapon[] = [{
  attackBonus: 0,
  silver: 9,
  damageBonus: 0,
  damageDie: 6,
  name: 'Warhammer',
  id: WeaponIdentifier.warhammer
}, {
  attackBonus: 1,
  silver: 6,
  damageBonus: 0,
  damageDie: 4,
  name: 'Dagger',
  id: WeaponIdentifier.dagger
}, {
  attackBonus: 1,
  silver: 12,
  damageBonus: 0,
  damageDie: 6,
  name: 'Sword',
  id: WeaponIdentifier.sword
}, {
  attackBonus: 0,
  silver: 16,
  damageBonus: 1,
  damageDie: 6,
  name: 'Flail',
  id: WeaponIdentifier.flail
}, {
  attackBonus: 0,
  silver: 16,
  damageBonus: 2,
  damageDie: 6,
  name: 'Mighty Zweihander',
  id: WeaponIdentifier.zweihander
}]

export const initialWeaponsTable: WeaponIdentifier[] = [
  WeaponIdentifier.flail,
  WeaponIdentifier.dagger,
  WeaponIdentifier.sword,
  WeaponIdentifier.warhammer
]

export interface IItem {
  name: string;
  silver: number;
  uses: number;
  id: ItemIdentifier;
  onUse?: (state: StateService) => void;
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

export const itemsTable: IItem[] = [{
  name: 'Potion',
  uses: 1,
  silver: 6,
  id: ItemIdentifier.potion,
  onUse: (state: StateService) => {
    state.healCharacter();
  }
}, {
  name: 'Rope',
  uses: -1,
  silver: 5,
  id: ItemIdentifier.rope
}, {
  name: 'Armor',
  uses: -1,
  silver: 10,
  id: ItemIdentifier.armor
}, {
  name: 'cloak of invisibility',
  uses: 1,
  silver: 15,
  id: ItemIdentifier.cloak,
  onUse: (state: StateService) => {
    state.isInvisible += state.calculateScrollUses();
  }
}, {
  name: 'Summon weak daemon',
  uses: 1,
  silver: 0,
  id: ItemIdentifier.summon,
  onUse: (state: StateService) => {
    state.hasDaemon += state.calculateScrollUses();
  }
}, {
  name: 'Palms Open the Southern Gate',
  uses: 1,
  silver: 0,
  id: ItemIdentifier.palms
}, {
  name: 'Aegis of Sorrow',
  uses: 1,
  silver: 0,
  id: ItemIdentifier.aegis
}, {
  name: 'False Omen',
  uses: 1,
  silver: 0,
  id: ItemIdentifier.omen
}]

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

export enum EffectIdetifier {
  daemon,
  invisible
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

export enum Status {
  win,
  loss,
  continue
}
