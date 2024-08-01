import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {IItem, itemsTable} from '../../../models/character.interface';
import {StateService} from '../../../services/state.service';

@Component({
  selector: 'dark-fort-peddler-room',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgForOf,
    NgIf
  ],
  templateUrl: './peddler-room.component.html',
  styleUrl: './peddler-room.component.css'
})
export class PeddlerRoomComponent {

  protected readonly itemsTable = itemsTable;


  constructor(public stateService: StateService) {
  }

  sell(item: IItem) {
    this.stateService.character.inventory[item.id] += -1;
    this.stateService.character.silver += item.silver;
  }

  canSell(item: IItem): boolean {
    return this.stateService.character.inventory[item.id] > 0;
  }

  buy(item: IItem) {
    this.stateService.character.inventory[item.id] += 1;
    this.stateService.character.silver += -item.silver;
  }

  canBuy(item: IItem): boolean {
    return this.stateService.character.silver >= item.silver;
  }

  isListed(item: IItem): boolean {
    return item.silver > 0
  }
}
