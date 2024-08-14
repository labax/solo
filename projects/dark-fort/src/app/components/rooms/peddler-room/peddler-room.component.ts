import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {
  IInventoryItem,
  ItemIdentifier,
  itemsTable,
  IWeapon, scrollTable,
  sellableItems, WeaponIdentifier,
  weaponsTable
} from '../../../models/character.interface';
import {StateService} from '../../../services/state.service';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {DiceService} from '../../../../../../common/src/lib/services/dice.service';

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
    NgIf,
    MatTabGroup,
    MatTab,
    KeyValuePipe
  ],
  templateUrl: './peddler-room.component.html',
  styleUrl: './peddler-room.component.css'
})
export class PeddlerRoomComponent implements OnInit {

  protected readonly itemsTable = itemsTable;
  protected scroll!: ItemIdentifier;

  constructor(public stateService: StateService, private diceService: DiceService) {
  }

  ngOnInit(): void {
    this.scroll = this.diceService.getRandomElement(scrollTable);
  }

  sellItem(item: IInventoryItem) {
    this.stateService.character.silver += this.stateService.getItem(item.id).silver;
    this.stateService.removeItemFromInventory(item);
  }

  buyItem(itemIdentifier: ItemIdentifier) {
    const item = this.stateService.getItem(itemIdentifier);
    this.stateService.addItemToInventory(itemIdentifier);
    this.stateService.character.silver += -item.silver;
  }

  sellWeapon(item: string) {
    const weapon = this.stateService.getWeapon(item)
    this.stateService.character.weapons[item as WeaponIdentifier] += -1;
    this.stateService.character.silver += weapon.silver;
  }

  canSellWeapon(item: IWeapon): boolean {
    return this.stateService.character.weapons[item.id] > 0;
  }

  buyWeapon(item: IWeapon) {
    this.stateService.character.weapons[item.id] += 1;
    this.stateService.character.silver += -item.silver;
  }

  canBuyItem(itemIdentifier: ItemIdentifier): boolean {
    const item = this.stateService.getItem(itemIdentifier);
    return this.stateService.character.silver >= item.silver;
  }


  protected readonly weaponsTable = weaponsTable;
  protected readonly sellableItems: ItemIdentifier[] = sellableItems;

  canBuyWeapon(weapon: IWeapon) {
    return weapon.silver <= this.stateService.character.silver;
  }
}
