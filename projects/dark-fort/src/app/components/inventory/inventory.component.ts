import {Component} from '@angular/core';
import {StateService} from '../../services/state.service';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {ItemIdentifier, itemsTable} from '../../models/character.interface';

@Component({
  selector: 'dark-fort-inventory',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

  constructor(public stateService: StateService) {
  }

  getItemName(key: string): string {
    const item = itemsTable.find(item => item.id.toString() === key as keyof typeof ItemIdentifier);
    if (!item) {
      return ''
    }

    return item.name;
  }
}
