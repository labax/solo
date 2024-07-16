export interface ICharacter {
  name: string;
  hitPoints: number;
  silver: number;
  level: number;
  weapon: WeaponIdentifier;
}

export interface IWeapon {
  id: WeaponIdentifier;
  name: string;
  damageDie: number;
  damageBonus: number;
  attackBonus: number;
}

export enum WeaponIdentifier {
  warhammer,
  dagger,
  sword,
  flail,
  zweihander
}
