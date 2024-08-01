import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {IItem, itemsTable, IWeapon, weaponsTable} from '../../../models/character.interface';
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

  sellItem(item: IItem) {
    this.stateService.character.inventory[item.id] += -1;
    this.stateService.character.silver += item.silver;
  }

  canSellItem(item: IItem): boolean {
    return this.stateService.character.inventory[item.id] > 0;
  }

  buyItem(item: IItem) {
    this.stateService.character.inventory[item.id] += 1;
    this.stateService.character.silver += -item.silver;
  }

  sellWeapon(item: IWeapon) {
    this.stateService.character.weapons[item.id] += -1;
    this.stateService.character.silver += item.silver;
  }

  canSellWeapon(item: IWeapon): boolean {
    return this.stateService.character.weapons[item.id] > 0;
  }

  buyWeapon(item: IWeapon) {
    this.stateService.character.weapons[item.id] += 1;
    this.stateService.character.silver += -item.silver;
  }

  canBuy(item: IItem | IWeapon): boolean {
    return this.stateService.character.silver >= item.silver;
  }

  isListed(item: IItem | IWeapon): boolean {
    return item.silver > 0
  }

  protected readonly weaponsTable = weaponsTable;
}
