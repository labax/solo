import {Injectable} from '@angular/core';
import {
  EffectIdetifier,
  ICharacter, IItem, initialItemsTable,
  initialWeaponsTable,
  ItemIdentifier, itemsTable,
  Room,
  RoomShape,
  Status
} from '../models/character.interface';
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
    const inventory: Record<ItemIdentifier, number> = {
      'rope': 0,
      'armor': 0,
      'aegis': 0,
      'cloak': 0,
      'omen': 0,
      'potion': 0,
      'summon': 0,
      'palms': 0
    }

    const effects: Record<EffectIdetifier, number> = {
      'invisible': 0,
      'daemon': 0
    }

    this.character = {
      name: 'Kargunt',
      hitPointsCurrent: 15,
      hitPointsMax: 15,
      inventory: inventory,
      level: 0,
      points: 0,
      silver: this.diceService.rollDice(1, 6) + 15,
      weapon: this.diceService.getRandomElement(initialWeaponsTable),
      effects: effects
    }

    const itemId = this.diceService.getRandomElement(initialItemsTable);
    this.character.inventory[itemId] += 1;
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

  getItem(key: string): IItem {
    const item = itemsTable.find(item => item.id === key);
    if (!item) {
      throw new Error('item not found!');
    }

    return item;
  }
}
