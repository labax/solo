import { Injectable } from '@angular/core';
import {ICharacter, Room} from '../models/character.interface';
import {DiceService} from '../../../../common/src/lib/services/dice.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(diceService: DiceService) {
    this.character = {
      name: 'Kargunt',
      hitPointsCurrent: 15,
      hitPointsMax: 15,
      inventory: [],
      level: 0,
      points: 0,
      silver: diceService.rollDice(1,6) + 15
    }
  }

  public map: Room[] = [];
  public currentRoom!: Room;
  public character?: ICharacter
}
