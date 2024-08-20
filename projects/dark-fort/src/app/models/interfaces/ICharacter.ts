import {WeaponIdentifier} from "../identifiers/WeaponIdentifier";
import {IInventoryItem} from "./IInventoryItem";

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

