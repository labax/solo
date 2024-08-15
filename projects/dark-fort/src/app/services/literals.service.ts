import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LiteralsService {

  constructor() { }

  public readonly silverRoll: string = 'roll for silver';
  public readonly initialWeaponRoll: string = 'roll for weapon';
  public readonly initialItemRoll: string = 'roll for item';
  public readonly chargesRoll: string = 'roll for charges';
  public readonly levelRoll: string = 'roll for level';
  public readonly moveRoll: string = 'roll for room change';
  public readonly scrollRoll: string = 'roll for scroll';
}
