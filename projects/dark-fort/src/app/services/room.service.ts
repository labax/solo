// src/app/services/room.service.ts

import { Injectable } from '@angular/core';
import {Cardinality, Room, RoomShape} from '../models/character.interface';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }

  private getOppositeExit(exit: Cardinality): Cardinality {
    switch (exit) {
      case Cardinality.north: return Cardinality.south;
      case Cardinality.east: return Cardinality.west;
      case Cardinality.south: return Cardinality.north;
      case Cardinality.west: return Cardinality.east;
    }
  }

  generateRandomRoom(x: number, y: number, existingExits: Cardinality[] = []): Room {
    const shapes = Object.values(RoomShape).filter(value => typeof value === 'number');
    const exits = Object.values(Cardinality).filter(value => typeof value === 'number');

    const shape = shapes[Math.floor(Math.random() * shapes.length)] as RoomShape;
    const exitCount = Math.floor(Math.random() * 4) + 1; // 1 to 4 exits
    const roomExits = new Set(existingExits);

    while (roomExits.size < exitCount) {
      roomExits.add(exits[Math.floor(Math.random() * exits.length)] as Cardinality);
    }

    return { shape, exits: Array.from(roomExits), x, y };
  }

  generateRandomMap(rows: number, cols: number): Room[] {
    const map: Room[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const existingExits: Cardinality[] = [];

        if (r > 0) {
          const northRoom = map.find(room => room.x === r - 1 && room.y === c);
          if (northRoom?.exits.includes(Cardinality.south)) {
            existingExits.push(Cardinality.north);
          }
        }

        if (c > 0) {
          const westRoom = map.find(room => room.x === r && room.y === c - 1);
          if (westRoom?.exits.includes(Cardinality.east)) {
            existingExits.push(Cardinality.west);
          }
        }

        const room = this.generateRandomRoom(r, c, existingExits);
        map.push(room);

        if (r > 0) {
          const northRoom = map.find(room => room.x === r - 1 && room.y === c);
          if (room.exits.includes(Cardinality.north) && !northRoom?.exits.includes(Cardinality.south)) {
            northRoom?.exits.push(Cardinality.south);
          }
        }

        if (c > 0) {
          const westRoom = map.find(room => room.x === r && room.y === c - 1);
          if (room.exits.includes(Cardinality.west) && !westRoom?.exits.includes(Cardinality.east)) {
            westRoom?.exits.push(Cardinality.east);
          }
        }
      }
    }

    return map;
  }
}
