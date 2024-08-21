import {IItem} from "../interfaces/IItem";
import {StateService} from "../../services/state.service";

export const itemsTable: IItem[] = [{
  name: 'Potion',
  silver: 6,
  id: 'potion',
  onUse: async (state: StateService) => {
    await state.healCharacter();
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
