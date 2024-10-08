// src/app/services/room.service.ts

import {Injectable} from '@angular/core';
import {DiceService} from '../../../../common/src/lib/services/dice.service';
import {Cardinality} from "../models/Cardinality";
import {RoomShape} from "../models/RoomShape";
import {IRoom} from "../models/interfaces/IRoom";
import {roomType} from "../models/RoomType";
import {roomTypesTable} from "../models/tables/RoomTypesTable";
import {initialRoomTypesTable} from "../models/tables/InitialRoomTypesTable";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  get mapWidth(): number {
    return this._mapWidth;
  }

  get mapHeight(): number {
    return this._mapHeight;
  }

  constructor(private diceService: DiceService) {
    this._mapWidth = 11;
    this._mapHeight = 11;
  }

  private readonly _mapWidth: number;
  private readonly _mapHeight: number;

  generateRandomRoom(x: number, y: number, existingExits: Cardinality[] = []): IRoom {

    const roomExits = new Set(existingExits);

    return {shape: RoomShape.placeholder, exits: Array.from(roomExits), x, y, type: 'nothing'};
  }

  materializeRoom(room: IRoom, map: IRoom[], roomType?: roomType): IRoom {
    const shapes = Object.values(RoomShape).filter(value => typeof value === 'number')
      .filter(shape => shape !== RoomShape.placeholder);

    const invalidCardinalities = this.calculateInvalidCardinalities(room, map);
    const exits: Cardinality[] = ['east', 'north', 'west', 'south']
      .filter(exit => !invalidCardinalities.includes(exit as Cardinality))
      .map(cardinality => cardinality as Cardinality);

    const roomShape = shapes[Math.floor(Math.random() * shapes.length)] as RoomShape;
    const exitCount = Math.floor(Math.random() * 2) + 1;

    const roomExits = new Set(room.exits);

    while (roomExits.size < Math.min(exitCount + 1, exits.length)) {
      const exit = exits[Math.floor(Math.random() * exits.length)] as Cardinality
      roomExits.add(exit);
    }

    room.exits = Array.from(roomExits);
    room.shape = roomShape;
    if (roomType) {
      room.type = roomType;
    } else {
      room.type = map.length === 1 ? this.diceService.getRandomElement(initialRoomTypesTable) : this.diceService.getRandomElement(roomTypesTable);
    }
    return room;
  }

  calculateInvalidCardinalities(room: IRoom, map: IRoom[]): Cardinality[] {
    const cardinalities: Cardinality[] = [];
    if (room.x === 0 || map.find(r => room.x === r.x + 1 && room.y === r.y)) {
      cardinalities.push('north');
    }

    if (room.y === 0 || map.find(r => room.x === r.x && room.y === r.y + 1)) {
      cardinalities.push('west');
    }

    if (room.x === this._mapHeight - 1 || map.find(r => room.x === r.x - 1 && room.y === r.y)) {
      cardinalities.push('south')
    }

    if (room.y === this._mapWidth - 1 || map.find(r => room.x === r.x && room.y === r.y - 1)) {
      cardinalities.push('east');
    }

    return cardinalities;
  }

  getNeighboringCoordinates(room: IRoom): { x: number, y: number }[] {
    const neighbors: { x: number, y: number }[] = [];

    room.exits.forEach(exit => {
      switch (exit) {
        case 'north':
          neighbors.push({x: room.x - 1, y: room.y});
          break;
        case 'east':
          neighbors.push({x: room.x, y: room.y + 1});
          break;
        case 'south':
          neighbors.push({x: room.x + 1, y: room.y});
          break;
        case 'west':
          neighbors.push({x: room.x, y: room.y - 1});
          break;
      }
    });

    return neighbors;
  }

  calculateEntrance(sourceX: number, sourceY: number, targetX: number, targetY: number): Cardinality {
    if (sourceX === targetX && sourceY < targetY) {
      return 'west';
    }

    if (sourceX === targetX && sourceY > targetY) {
      return 'east';
    }

    if (sourceX < targetX && sourceY === targetY) {
      return 'north';
    }

    return 'south';
  }

  canTravel(source: IRoom, target: IRoom): boolean {
    const validTargets = this.getNeighboringCoordinates(source);
    for (const validTarget of validTargets) {
      if (validTarget.x === target.x && validTarget.y === target.y) {
        return true;
      }
    }
    return false;
  }
}
