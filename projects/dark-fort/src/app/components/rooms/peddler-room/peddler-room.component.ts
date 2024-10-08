import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {StateService} from '../../../services/state.service';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {DiceService} from '../../../../../../common/src/lib/services/dice.service';
import {IWeapon} from "../../../models/interfaces/IWeapon";
import {weaponsTable} from "../../../models/tables/WeaponsTable";
import {ItemIdentifier} from "../../../models/identifiers/ItemIdentifier";
import {itemsTable} from "../../../models/tables/ItemsTable";
import {scrollTable} from "../../../models/tables/ScrollTable";
import {IInventoryItem} from "../../../models/interfaces/IInventoryItem";
import {sellableItemsTable} from "../../../models/tables/SellableItemsTable";

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
    const weaponIndex = this.stateService.character.weapons.findIndex(x=>x === item);
    this.stateService.character.weapons.splice(weaponIndex, 1);
    this.stateService.character.silver += weapon.silver;
  }

  buyWeapon(item: IWeapon) {
    this.stateService.character.weapons.push(item.id);
    this.stateService.character.silver += -item.silver;
  }

  canBuyItem(itemIdentifier: ItemIdentifier): boolean {
    const item = this.stateService.getItem(itemIdentifier);
    return this.stateService.character.silver >= item.silver;
  }


  protected readonly weaponsTable = weaponsTable;
  protected readonly sellableItems: ItemIdentifier[] = sellableItemsTable;

  canBuyWeapon(weapon: IWeapon) {
    return weapon.silver <= this.stateService.character.silver;
  }
}
