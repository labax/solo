// src/app/components/room-map/room-map.component.ts

import {Component, inject} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Room, RoomShape, roomType, Status} from '../../models/character.interface';
import {NgForOf, NgIf} from '@angular/common';
import {StateService} from '../../services/state.service';
import {DiceService} from '../../../../../common/src/lib/services/dice.service';
import {MatDialog} from '@angular/material/dialog';
import {EmptyRoomComponent} from '../rooms/empty-room/empty-room.component';
import {TrapRoomComponent} from '../rooms/trap-room/trap-room.component';
import {RiddleRoomComponent} from '../rooms/riddle-room/riddle-room.component';
import {WeakRoomComponent} from '../rooms/weak-room/weak-room.component';
import {ToughRoomComponent} from '../rooms/tough-room/tough-room.component';
import {PeddlerRoomComponent} from '../rooms/peddler-room/peddler-room.component';
import {ItemRoomComponent} from '../rooms/item-room/item-room.component';
import {ScrollRoomComponent} from '../rooms/scroll-room/scroll-room.component';

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
  readonly dialog = inject(MatDialog);

  constructor(private roomService: RoomService, public stateService: StateService, private diceService: DiceService) {
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
    const roomType = this.stateService.resolveRoom(room);
    if (roomType) {
      this.openDialog(roomType);
    } else if (this.diceService.rollDice(1, 4) === 1) {
      this.openDialog('weak');
    }
    const status = this.stateService.calculateWinningConditions();
    if (status === Status.loss) {
      alert('you lost');
    }
  }

  private openDialog(roomType: roomType) {
    if (roomType === 'nothing') {
      this.dialog.open(EmptyRoomComponent, {disableClose: true});
    } else if (roomType === 'trap') {
      this.dialog.open(TrapRoomComponent, {disableClose: true});
    } else if (roomType === 'riddle') {
      this.dialog.open(RiddleRoomComponent, {disableClose: true});
    } else if (roomType === 'weak') {
      this.dialog.open(WeakRoomComponent, {disableClose: true});
    } else if (roomType === 'tough') {
      this.dialog.open(ToughRoomComponent, {disableClose: true});
    } else if (roomType === 'peddler') {
      this.dialog.open(PeddlerRoomComponent, {disableClose: true});
    } else if (roomType === 'item') {
      this.dialog.open(ItemRoomComponent, {disableClose: true});
    } else if (roomType === 'scroll') {
      this.dialog.open(ScrollRoomComponent, {disableClose: true});
    }
  }
}
