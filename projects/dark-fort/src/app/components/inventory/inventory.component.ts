import {Component} from '@angular/core';
import {StateService} from '../../services/state.service';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {IInventoryItem, ItemIdentifier, WeaponIdentifier} from '../../models/character.interface';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'dark-fort-inventory',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    NgIf,
    MatButton
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

  constructor(public stateService: StateService) {
  }

  getItemName(key: string): string {
    const item = this.stateService.getItem(key);

    return item.name;
  }

  getWeaponName(key: string): string {
    const item = this.stateService.getWeapon(key);

    return item.name;
  }

  isUsable(key: string): boolean {
    const item = this.stateService.getItem(key);

    return item.onUse !== undefined && item.onUse !== null;
  }

  use(inventoryItem: IInventoryItem): void {
    const item = this.stateService.getItem(inventoryItem.id);
    if (item.onUse !== undefined && item.onUse !== null) {
      item.onUse(this.stateService);
      if (item.chargeable) {
        inventoryItem.charges = -1;
      } else {
        this.stateService.removeItemFromInventory(inventoryItem);
      }
    }
  }

  equip(key: string) {
    const buffer = this.stateService.character.weapon;

    this.stateService.character.weapons[key as WeaponIdentifier] += -1;
    if (buffer) {
      this.stateService.character.weapons[buffer] += 1;
    }
    this.stateService.character.weapon = key as WeaponIdentifier;
  }

  hasCharges(inventoryItem: IInventoryItem) {
    const item = this.stateService.getItem(inventoryItem.id);
    return item.chargeable && inventoryItem.charges > 0;
  }
}
