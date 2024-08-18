import {StateService} from '../services/state.service';
import {DiceService} from '../../../../common/src/lib/services/dice.service';
import {RollDialogComponent} from "../components/roll-dialog/roll-dialog.component";

export interface ICharacter {
  name: string;
  hitPointsCurrent: number;
  hitPointsMax: number;
  silver: number;
  level: number;
  weapon: WeaponIdentifier;
  inventory: IInventoryItem[];
  weapons: WeaponIdentifier[];
  points: number;
  attackBonus: number;
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
  'warHammer' |
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
  id: 'warHammer'
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
  'warHammer'
]

export interface IItem {
  name: string;
  silver: number;
  id: ItemIdentifier;
  onUse?: (state: StateService) => void;
  chargeable: boolean;
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
  },
  chargeable: false
}, {
  name: 'Rope',
  silver: 5,
  id: 'rope',
  chargeable: false
}, {
  name: 'Armor',
  silver: 10,
  id: 'armor',
  chargeable: false
}, {
  name: 'cloak of invisibility',
  silver: 15,
  id: 'cloak',
  chargeable: true
}, {
  name: 'Summon weak daemon',
  silver: 7,
  id: 'summon',
  chargeable: true
}, {
  name: 'Palms Open the Southern Gate',
  silver: 7,
  id: 'palms',
  chargeable: true
}, {
  name: 'Aegis of Sorrow',
  silver: 7,
  id: 'aegis',
  chargeable: true
}, {
  name: 'False Omen',
  silver: 7,
  id: 'omen',
  chargeable: false
}]

export const initialItemsTable: ItemIdentifier[] = [
  'armor',
  'potion',
  'summon',
  'cloak'
]

export interface IMonster {
  name: string;
  damage: (state: StateService) => Promise<number>;
  hitPoints: number;
  points: number;
  id: MonsterIdentifier;
  onKill?: (state: StateService, dice: DiceService) => Promise<void>;
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

export const monstersTable: IMonster[] = [
  {
    name: 'BLOOD-DRENCHED SKELETON',
    damage: async (state: StateService) => await state.calculateCombatDamage(1, 4, 0),
    hitPoints: 6,
    points: 3,
    id: 'skeleton',
    onKill: async (state: StateService, dice: DiceService) => {
      const description = 'roll for loot'
      const roll = await dice.rollAndSumDiceWithConfirmation(1, 6, description, RollDialogComponent);
      if (roll <= 2) {
        state.character.weapons.push('dagger');
      }
    }
  },
  {
    name: 'CATACOMB CULTIST',
    damage: async (state: StateService) => await state.calculateCombatDamage(1, 4, 0),
    hitPoints: 6,
    points: 3,
    id: 'cultist'
  },
  {
    name: 'GOBLIN',
    damage: async (state: StateService) => await state.calculateCombatDamage(1, 4, 0),
    hitPoints: 5,
    points: 3,
    id: 'goblin',
    onKill: async (state: StateService, dice: DiceService) => {
      const description = 'roll for loot';
      const roll = await dice.rollAndSumDiceWithConfirmation(1, 6, description, RollDialogComponent);
      if (roll <= 2) {
        await state.addItemToInventory('rope');
      }
    }
  },
  {
    name: 'UNDEAD HOUND',
    damage: async (state: StateService) => await state.calculateCombatDamage(1, 4, 0),
    hitPoints: 6,
    points: 4,
    id: 'hound'
  },
  {
    name: 'NECRO-SORCERER',
    damage: async (state: StateService) => {
      if (state.combatRound % 2 === 0) {
        return await state.calculateCombatDamage(1, 6, 0);
      }
      return await state.calculateCombatDamage(1, 4, 0);
    },
    hitPoints: 8,
    points: 4,
    id: 'sorcerer',
    onKill: async (state: StateService, dice: DiceService) => {
      const description = 'roll for death';
      const roll = await dice.rollAndSumDiceWithConfirmation(1, 6, description, RollDialogComponent);
      if (roll <= 1) {
        state.character.hitPointsCurrent = -1;
      }
      state.character.silver += await dice.rollAndSumDiceWithConfirmation(3, 6, 'roll for silver', RollDialogComponent);
    }
  },
  {
    name: 'SMALL STONE TROLL',
    damage: async (state: StateService) => await state.calculateCombatDamage(1, 6, 1),
    hitPoints: 9,
    points: 7,
    id: 'troll'
  },
  {
    name: 'MEDUSA',
    damage: async (state: StateService) => await state.calculateCombatDamage(1, 6, 0),
    hitPoints: 10,
    points: 4,
    id: 'medusa',
    onKill: async (state: StateService, dice: DiceService) => {
      const roll = await dice.rollAndSumDiceWithConfirmation(1, 6, 'roll for death', RollDialogComponent);
      if (roll <= 1) {
        state.character.hitPointsCurrent = -1;
      }
      state.character.silver += await dice.rollAndSumDiceWithConfirmation(1, 4, 'roll for silver', RollDialogComponent) * await dice.rollAndSumDiceWithConfirmation(1, 6, 'roll for silver', RollDialogComponent);
    }
  },
  {
    name: 'RUIN BASILISK',
    damage: async (state: StateService) => await state.calculateCombatDamage(1, 6, 0),
    hitPoints: 11,
    points: 4,
    id: 'basilisk',
    onKill: async (state: StateService, dice: DiceService) => {
      const roll = await dice.rollAndSumDiceWithConfirmation(1, 6, 'roll for level', RollDialogComponent);
      if (roll <= 1) {
        state.levelUp.set(true);
      }
    }
  },
]

export const weakMonsters: MonsterIdentifier[] = ['skeleton', 'cultist', 'goblin', 'hound'];
export const strongMonsters: MonsterIdentifier[] = ['sorcerer', 'troll', 'medusa', 'basilisk'];

export interface IState {
  character: ICharacter;
}

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

export const scrollTable: ItemIdentifier[] = ['summon', 'palms', 'aegis', 'omen']

export type roomType = 'nothing' | 'trap' | 'riddle' | 'weak' | 'tough' | 'peddler' | 'item' | 'scroll'

export const roomTypes: roomType[] = ['trap', 'riddle', 'weak', 'tough', 'peddler']
export const initialRoomTypes: roomType[] = ['item', 'weak', 'scroll', 'nothing']

export const itemIdentifiers: ItemIdentifier[] = [
  'potion',
  'rope',
  'armor',
  'cloak',
  'summon',
  'palms',
  'aegis',
  'omen'
];

export const weaponIdentifiers: WeaponIdentifier[] = [
  'warHammer',
  'dagger',
  'sword',
  'flail',
  'zweihander'
]

export type levelIdentifier = 'sir' | 'attack' | 'hitPoints' | 'potions' | 'zweihander' | 'half'

export interface ILevel {
  id: levelIdentifier,
  description: string,
  onLevel: (state: StateService, name?: string, halved?: MonsterIdentifier[]) => void,
}

export const levelTable: ILevel[] = [{
  id: 'zweihander',
  description: 'You find a MIGHTY ZWEIHÄNDER',
  onLevel: state => state.character.weapons.push('zweihander')
}, {
  id: 'hitPoints',
  description: 'Your maximum hit points increase by +5 to 20',
  onLevel: state => state.character.hitPointsMax = 20
}, {
  id: 'attack',
  description: 'From now on add +1 when attacking monsters.',
  onLevel: state => state.character.attackBonus += 1
}, {
  id: 'sir',
  description: 'You are knighted and may call yourself sir or lady Kargunt! But a name or title won’t save you.',
  onLevel: (state, name?: string) => state.character.name = `${name} Kargunt`
}, {
  id: 'potions',
  description: 'a not very occult herbmaster salutes your endeavors and gives you 5 potions.',
  onLevel: (state) => {
    for (let i = 0; i < 5; i++) {
      state.addItemToInventory('potion')
    }
  }
}, {
  id: 'half',
  description: 'Choose one WEAK monster and one TOUGH monster from the monster tables. From now on their damage is halved. Your chosen monsters can never be changed.',
  onLevel: (state, name?: string, halved?: MonsterIdentifier[]) => halved ? state.halved = halved : ''
}]

export interface IInventoryItem {
  id: ItemIdentifier;
  charges: number;
}

export const sellableItems: ItemIdentifier[] = ['potion', 'rope', 'armor', 'cloak'];
export const battleItems: ItemIdentifier[] = ['potion', 'summon', 'palms', 'cloak'];
