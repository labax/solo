import {IMonster} from "../interfaces/IMonster";
import {StateService} from "../../services/state.service";
import {DiceService} from "../../../../../common/src/lib/services/dice.service";
import {RollDialogComponent} from "../../components/roll-dialog/roll-dialog.component";

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
      } else {
        state.character.silver += await dice.rollAndSumDiceWithConfirmation(3, 6, 'roll for silver', RollDialogComponent);
      }
    }
  },
  {
    name: 'SMALL STONE TROLL',
    damage: async (state: StateService) => await state.calculateCombatDamage(1, 6, 1),
    hitPoints: 9,
    points: 5,
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
      } else {
        state.character.silver += await dice.rollAndSumDiceWithConfirmation(1, 4, 'roll for silver', RollDialogComponent) * await dice.rollAndSumDiceWithConfirmation(1, 6, 'roll for silver', RollDialogComponent);
      }
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
