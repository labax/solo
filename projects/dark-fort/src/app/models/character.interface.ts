import {StateService} from '../services/state.service';

export interface ICharacter {
  name: string;
  hitPointsCurrent: number;
  hitPointsMax: number;
  silver: number;
  level: number;
  weapon: WeaponIdentifier;
  inventory: Record<ItemIdentifier, number>;
  effects: Record<EffectIdetifier, number>;
  weapons: Record<WeaponIdentifier, number>;
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

export type WeaponIdentifier =
  'warhammer' |
  'dagger' |
  'sword' |
  'flail' |
  'zweihander'


export const weaponsTable: IWeapon[] = [{
  attackBonus: 0,
  silver: 9,
  damageBonus: 0,
  damageDie: 6,
  name: 'Warhammer',
  id: 'warhammer'
}, {
  attackBonus: 1,
  silver: 6,
  damageBonus: 0,
  damageDie: 4,
  name: 'Dagger',
  id: 'dagger'
}, {
  attackBonus: 1,
  silver: 12,
  damageBonus: 0,
  damageDie: 6,
  name: 'Sword',
  id: 'sword'
}, {
  attackBonus: 0,
  silver: 16,
  damageBonus: 1,
  damageDie: 6,
  name: 'Flail',
  id: 'flail'
}, {
  attackBonus: 0,
  silver: 25,
  damageBonus: 2,
  damageDie: 6,
  name: 'Mighty Zweihander',
  id: 'zweihander'
}]

export const initialWeaponsTable: WeaponIdentifier[] = [
  'flail',
  'dagger',
  'sword',
  'warhammer'
]

export interface IItem {
  name: string;
  silver: number;
  id: ItemIdentifier;
  onUse?: (state: StateService) => void;
}

export type ItemIdentifier =
  'potion' |
  'rope' |
  'armor' |
  'cloak' |
  'summon' |
  'palms' |
  'aegis' |
  'omen'


export const itemsTable: IItem[] = [{
  name: 'Potion',
  silver: 6,
  id: 'potion',
  onUse: (state: StateService) => {
    state.healCharacter();
  }
}, {
  name: 'Rope',
  silver: 5,
  id: 'rope'
}, {
  name: 'Armor',
  silver: 10,
  id: 'armor'
}, {
  name: 'cloak of invisibility',
  silver: 15,
  id: 'cloak',
  onUse: (state: StateService) => {
    state.character.effects['invisible'] += state.calculateScrollUses();
  }
}, {
  name: 'Summon weak daemon',
  silver: 0,
  id: 'summon',
  onUse: (state: StateService) => {
    state.character.effects['daemon'] += state.calculateScrollUses();
  }
}, {
  name: 'Palms Open the Southern Gate',
  silver: 0,
  id: 'palms'
}, {
  name: 'Aegis of Sorrow',
  silver: 0,
  id: 'aegis'
}, {
  name: 'False Omen',
  silver: 0,
  id: 'omen'
}]

export const initialItemsTable: ItemIdentifier[] = [
  'armor',
  'potion',
  'summon',
  'cloak'
]

export interface IMonster {
  name: string;
  damage: number;
  hitPoints: number;
  points: number;
  id: MonsterIdentifier;
  onKill: (state: IState) => void;
}

export type MonsterIdentifier =
  'skeleton' |
  'cultist' |
  'goblin' |
  'hound' |
  'sorcerer' |
  'troll' |
  'medusa' |
  'basilisk'


export interface IState {
  character: ICharacter;
}

export type EffectIdetifier =
  'daemon' |
  'invisible'

export type Cardinality =
  'north' |
  'east' |
  'south' |
  'west'

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
  type: roomType;
}

export enum Status {
  win,
  loss,
  continue
}

export type roomType = 'nothing' | 'trap' | 'riddle' | 'weak' | 'tough' | 'peddler' | 'item' | 'scroll'

export const roomTypes: roomType[] = ['nothing', 'peddler']//, 'trap', 'riddle', 'weak', 'tough', 'peddler']
export const initialRoomTypes: roomType[] = ['nothing']//['item', 'weak', 'scroll', 'nothing']
