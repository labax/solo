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
}

export enum ItemIdentifier {
  potion,
  rope,
  armor,
  cloack,
  summon,
  palms,
  aegis,
  omen
}
