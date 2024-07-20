import { Injectable } from '@angular/core';
import {ICharacter, Room} from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() {
    this.character = {
      name: 'Kargunt',
      hitPointsCurrent: 15,
      hitPointsMax: 15,
      inventory: [],
      level: 0,
      points: 0,
      silver: 0
    }
  }

  public map: Room[] = [];
  public currentRoom!: Room;
  public character?: ICharacter
}
