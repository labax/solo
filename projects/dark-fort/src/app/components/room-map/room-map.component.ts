// src/app/components/room-map/room-map.component.ts

import {Component, inject, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {NgForOf, NgIf} from '@angular/common';
import {StateService} from '../../services/state.service';
import {DiceService} from '../../../../../common/src/lib/services/dice.service';
import {MatDialog} from '@angular/material/dialog';
import {EmptyRoomComponent} from '../rooms/empty-room/empty-room.component';
import {TrapRoomComponent} from '../rooms/trap-room/trap-room.component';
import {RiddleRoomComponent} from '../rooms/riddle-room/riddle-room.component';
import {WeakRoomComponent} from '../rooms/weak-room/weak-room.component';
import {PeddlerRoomComponent} from '../rooms/peddler-room/peddler-room.component';
import {ItemRoomComponent} from '../rooms/item-room/item-room.component';
import {ScrollRoomComponent} from '../rooms/scroll-room/scroll-room.component';
import {LiteralsService} from '../../services/literals.service';
import {RollDialogComponent} from '../roll-dialog/roll-dialog.component';
import {weakMonstersTable} from "../../models/tables/WeakMonstersTable";
import {strongMonstersTable} from "../../models/tables/StrongMonstersTable";
import {RoomShape} from "../../models/RoomShape";
import {IRoom} from "../../models/interfaces/IRoom";
import {Status} from "../../models/Status";
import {roomType} from "../../models/RoomType";

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

  height!: number[];
  width!: number[];
  readonly dialog = inject(MatDialog);

  constructor(private roomService: RoomService,
              public stateService: StateService,
              private diceService: DiceService,
              private literalsService: LiteralsService) {}

  ngOnInit(): void {
    this.height = Array(this.roomService.mapHeight).fill(1).map((x, i) => i);
    this.width = Array(this.roomService.mapWidth).fill(1).map((x, i) => i);
  }

  getRoomDescription(room: IRoom): string {
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

  getRoomAtPosition(x: number, y: number): IRoom | undefined {
    return this.stateService.map.find(room => room.x === x && room.y === y);
  }

  async onRoomClick(room: IRoom): Promise<void> {
    if(!this.roomService.canTravel(this.stateService.currentRoom, room) && this.stateService.map.length > 1)
    {
      return;
    }
    const roomType = await this.stateService.resolveRoom(room);
    if (roomType) {
      this.openDialog(roomType);
    } else if (await this.diceService.rollAndSumDiceWithConfirmation(1, 4, this.literalsService.moveRoll, RollDialogComponent) === 1) {
      this.openDialog('weak');
    }
  }

  private openDialog(roomType: roomType) {
    let dialogRef
    if (roomType === 'nothing') {
      dialogRef = this.dialog.open(EmptyRoomComponent, {disableClose: true});
    } else if (roomType === 'trap') {
      dialogRef = this.dialog.open(TrapRoomComponent, {disableClose: true});
    } else if (roomType === 'riddle') {
      dialogRef = this.dialog.open(RiddleRoomComponent, {disableClose: true});
    } else if (roomType === 'weak') {
      dialogRef = this.dialog.open(WeakRoomComponent, {disableClose: true, data: weakMonstersTable, minWidth: 800});
    } else if (roomType === 'tough') {
      dialogRef = this.dialog.open(WeakRoomComponent, {disableClose: true, data: strongMonstersTable, minWidth: 800});
    } else if (roomType === 'peddler') {
      dialogRef = this.dialog.open(PeddlerRoomComponent, {disableClose: true});
    } else if (roomType === 'item') {
      dialogRef = this.dialog.open(ItemRoomComponent, {disableClose: true});
    } else if (roomType === 'scroll') {
      dialogRef = this.dialog.open(ScrollRoomComponent, {disableClose: true});
    }

    dialogRef?.afterClosed().subscribe(() => {
      const status = this.stateService.calculateWinningConditions();
      if (status === Status.loss) {
        alert('you lost');
      }
    })
  }
}
