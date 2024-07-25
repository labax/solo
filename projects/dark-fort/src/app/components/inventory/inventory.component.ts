import {Component} from '@angular/core';
import {StateService} from '../../services/state.service';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {ItemIdentifier} from '../../models/character.interface';
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

  isUsable(key: string): boolean {
    const item = this.stateService.getItem(key);

    return item.onUse !== undefined && item.onUse !== null;
  }

  use(key: string): void {
    const item = this.stateService.getItem(key);
    if(item.onUse !== undefined && item.onUse !== null) {
      item.onUse(this.stateService);
      this.stateService.character.inventory[key as ItemIdentifier] += -1;
    }
  }
}
