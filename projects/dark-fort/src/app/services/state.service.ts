import {Injectable} from '@angular/core';
import {ICharacter, initialWeaponsTable, Room, RoomShape, Status} from '../models/character.interface';
import {DiceService} from '../../../../common/src/lib/services/dice.service';
import {RoomService} from './room.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private diceService: DiceService, private roomService: RoomService) {

  }

  public map: Room[] = [];
  public currentRoom!: Room;
  public character!: ICharacter
  public isInvisible: number = 0;
  public hasDaemon: number = 0;

  public calculateExploredRoomsCount(): number {
    return this.map.filter(room => room.shape !== RoomShape.placeholder).length;
  }

  public calculateUnexploredRoomsCount() {
    return this.map.filter(room => room.shape === RoomShape.placeholder).length;
  }

  initialize() {
    const room = this.roomService.generateRandomRoom(0, Math.floor(this.roomService.mapWidth / 2))
    this.map.push(room);
    this.currentRoom = room;

    this.character = {
      name: 'Kargunt',
      hitPointsCurrent: 15,
      hitPointsMax: 15,
      inventory: [],
      level: 0,
      points: 0,
      silver: this.diceService.rollDice(1, 6) + 15,
      weapon: this.diceService.getRandomElement(initialWeaponsTable)
    }
  }

  next(room: Room): Status {
    if (this.roomService.canTravel(this.currentRoom, room) || this.map.length === 1) {
      this.currentRoom = room;
      if (room.shape === RoomShape.placeholder) {
        const rooms = this.roomService.materializeRoom(room, this.map);

        for (const coordinate of rooms) {
          if (!this.map.find(room => room.x === coordinate.x && room.y === coordinate.y)) {
            const cardinality = this.roomService.calculateEntrance(room.x, room.y, coordinate.x, coordinate.y)
            this.map.push(this.roomService.generateRandomRoom(coordinate.x, coordinate.y, [cardinality]));
          }
        }

      }
      if (this.calculateUnexploredRoomsCount() === 0) {
        return Status.loss;
      }
    }

    return Status.continue;
  }

  healCharacter(): void {
    this.character.hitPointsCurrent += this.diceService.rollDice(1, 6);
    if (this.character.hitPointsCurrent > this.character.hitPointsMax) {
      this.character.hitPointsCurrent = this.character.hitPointsMax;
    }
  }

  calculateScrollUses() {
    return this.diceService.rollDice(1, 4);
  }
}
