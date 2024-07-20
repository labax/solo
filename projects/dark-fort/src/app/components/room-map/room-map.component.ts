// src/app/components/room-map/room-map.component.ts

import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import {Cardinality, Room, RoomShape} from '../../models/character.interface';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'dark-fort-room-map',
  templateUrl: './room-map.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./room-map.component.css']
})
export class RoomMapComponent implements OnInit {

  rooms: Room[] = [];
  cardinality = Cardinality;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.rooms = this.roomService.generateRandomMap(5, 5); // Generate a 5x5 grid of rooms
  }

  getRoomShape(shape: RoomShape): string {
    return RoomShape[shape];
  }

  getRoomExits(exits: Cardinality[]): string {
    return exits.map(exit => Cardinality[exit]).join(', ');
  }

  getRoomAtPosition(x: number, y: number): Room | undefined {
    return this.rooms.find(room => room.x === x && room.y === y);
  }
}
