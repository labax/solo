// src/app/components/room-map/room-map.component.ts

import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Cardinality, Room, RoomShape} from '../../models/character.interface';
import {NgForOf, NgIf} from '@angular/common';
import {StateService} from '../../services/state.service';

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

  height: number[];
  width: number[];
  cardinality = Cardinality;

  constructor(private roomService: RoomService, public stateService: StateService) {
    this.height = Array(this.roomService.mapHeight).fill(1).map((x, i) => i);
    this.width = Array(this.roomService.mapWidth).fill(1).map((x, i) => i);
  }

  ngOnInit(): void {
    this.stateService.map.push(this.roomService.generateRandomRoom(0, Math.floor(this.roomService.mapWidth / 2)));
  }

  getRoomShape(shape: RoomShape): string {
    return RoomShape[shape];
  }

  getRoomExits(exits: Cardinality[]): string {
    return exits.map(exit => Cardinality[exit]).join(', ');
  }

  getRoomAtPosition(x: number, y: number): Room | undefined {
    return this.stateService.map.find(room => room.x === x && room.y === y);
  }
}
