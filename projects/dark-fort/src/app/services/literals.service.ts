import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LiteralsService {

  constructor() {
  }

  public readonly silverRoll: string = 'roll for silver';
  public readonly initialWeaponRoll: string = 'roll for weapon';
  public readonly initialItemRoll: string = 'roll for item';
  public readonly chargesRoll: string = 'roll for charges';
  public readonly levelRoll: string = 'roll for level';
  public readonly moveRoll: string = 'roll for room change';
  public readonly scrollRoll: string = 'roll for scroll';
  public readonly riddleRoll: string = 'roll for riddle, success on odd'
  public readonly damageRoll: string = 'roll for damage';
  public readonly armorRoll: string = 'roll for armor';
  public readonly monsterRoll: string = 'roll for monster';
}
