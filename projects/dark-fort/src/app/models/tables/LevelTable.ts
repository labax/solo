import {ILevel} from "../interfaces/ILevel";
import {MonsterIdentifier} from "../identifiers/MonsterIdentifier";

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
