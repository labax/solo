// src/app/services/room.service.ts

import {Injectable} from '@angular/core';
import {Cardinality, Room, RoomShape} from '../models/character.interface';
import {StateService} from './state.service';

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

  constructor(private stateService: StateService) {
    this._mapWidth = 11;
    this._mapHeight = 11;
  }

  private readonly _mapWidth: number;
  private readonly _mapHeight: number;

  generateRandomRoom(x: number, y: number, existingExits: Cardinality[] = []): Room {

    const roomExits = new Set(existingExits);

    return {shape: RoomShape.placeholder, exits: Array.from(roomExits), x, y};
  }

  materializeRoom(room: Room): { x: number, y: number }[] {
    const shapes = Object.values(RoomShape).filter(value => typeof value === 'number')
      .filter(shape => shape !== RoomShape.placeholder);

    const invalidCardinalities = this.calculateInvalidCardinalities(room);
    const exits = Object.values(Cardinality).filter(value => typeof value === 'number')
      .filter(exit => !invalidCardinalities.includes(exit as Cardinality));

    const roomShape = shapes[Math.floor(Math.random() * shapes.length)] as RoomShape;
    const exitCount = Math.floor(Math.random() * 2) + 1;

    const roomExits = new Set(room.exits);

    while (roomExits.size < Math.min(exitCount + 1, exits.length)) {
      const exit = exits[Math.floor(Math.random() * exits.length)] as Cardinality
      roomExits.add(exit);
    }

    room.exits = Array.from(roomExits);
    room.shape = roomShape;

    return this.getNeighboringCoordinates(room);
  }

  calculateInvalidCardinalities(room: Room): Cardinality[] {
    const cardinalities: Cardinality[] = [];
    if (room.x === 0 || this.stateService.map.find(r => room.x === r.x + 1 && room.y === r.y)) {
      cardinalities.push(Cardinality.north);
    }

    if (room.y === 0 || this.stateService.map.find(r => room.x === r.x && room.y === r.y + 1)) {
      cardinalities.push(Cardinality.west);
    }

    if (room.x === this._mapHeight - 1 || this.stateService.map.find(r => room.x === r.x - 1 && room.y === r.y)) {
      cardinalities.push(Cardinality.south)
    }

    if (room.y === this._mapWidth - 1 || this.stateService.map.find(r => room.x === r.x && room.y === r.y - 1)) {
      cardinalities.push(Cardinality.east);
    }

    return cardinalities;
  }

  getNeighboringCoordinates(room: Room): { x: number, y: number }[] {
    const neighbors: { x: number, y: number }[] = [];

    room.exits.forEach(exit => {
      switch (exit) {
        case Cardinality.north:
          neighbors.push({x: room.x - 1, y: room.y});
          break;
        case Cardinality.east:
          neighbors.push({x: room.x, y: room.y + 1});
          break;
        case Cardinality.south:
          neighbors.push({x: room.x + 1, y: room.y});
          break;
        case Cardinality.west:
          neighbors.push({x: room.x, y: room.y - 1});
          break;
      }
    });

    return neighbors;
  }

  calculateEntrance(sourceX: number, sourceY: number, targetX: number, targetY: number): Cardinality {
    if (sourceX === targetX && sourceY < targetY) {
      return Cardinality.west;
    }

    if (sourceX === targetX && sourceY > targetY) {
      return Cardinality.east;
    }

    if (sourceX < targetX && sourceY === targetY) {
      return Cardinality.north;
    }

    return Cardinality.south;
  }
}
