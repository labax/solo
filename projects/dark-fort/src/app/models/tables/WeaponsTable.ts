import {IWeapon} from "../interfaces/IWeapon";

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
