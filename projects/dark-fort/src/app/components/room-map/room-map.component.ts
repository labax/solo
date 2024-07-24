// src/app/components/room-map/room-map.component.ts

import {Component} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Cardinality, Room, RoomShape, Status} from '../../models/character.interface';
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
export class RoomMapComponent {

  height: number[];
  width: number[];
  cardinality = Cardinality;

  constructor(private roomService: RoomService, public stateService: StateService) {
    this.height = Array(this.roomService.mapHeight).fill(1).map((x, i) => i);
    this.width = Array(this.roomService.mapWidth).fill(1).map((x, i) => i);
  }

  getRoomDescription(room: Room): string {
    if (room === this.stateService.currentRoom && this.stateService.map.length > 1) {
      return 'you are here';
    }
    if (room.shape === RoomShape.placeholder) {
      if (this.roomService.canTravel(this.stateService.currentRoom, room) || this.stateService.map.length === 1) {
        return 'click to explore'
      } else {
        return 'unexplored'
      }
    }

    if (this.roomService.canTravel(this.stateService.currentRoom, room)) {
      return 'click to travel';
    }

    return 'explored'
  }

  getRoomAtPosition(x: number, y: number): Room | undefined {
    return this.stateService.map.find(room => room.x === x && room.y === y);
  }

  onRoomClick(room: Room) {
    const status = this.stateService.next(room);

    if(status === Status.loss) {
      alert('you lost');
    }
  }
}
