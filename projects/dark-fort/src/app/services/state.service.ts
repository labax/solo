import {Injectable} from '@angular/core';
import {ICharacter, Room, RoomShape} from '../models/character.interface';
import {DiceService} from '../../../../common/src/lib/services/dice.service';
import {RoomService} from './room.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(diceService: DiceService, private roomService: RoomService) {
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

  public calculateExploredRoomsCount(): number {
    return this.map.filter(room=> room.shape !== RoomShape.placeholder).length;
  }

  public calculateUnexploredRoomsCount() {
    return this.map.filter(room=> room.shape === RoomShape.placeholder).length;
  }

  initialize() {
    const room = this.roomService.generateRandomRoom(0, Math.floor(this.roomService.mapWidth / 2))
    this.map.push(room);
    this.currentRoom = room;
  }
}
