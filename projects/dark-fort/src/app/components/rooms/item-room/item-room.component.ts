import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {
  initialItemsTable,
  initialWeaponsTable,
  ItemIdentifier,
  scrollTable,
  WeaponIdentifier
} from '../../../models/character.interface';
import {StateService} from '../../../services/state.service';
import {DiceService} from '../../../../../../common/src/lib/services/dice.service';

@Component({
  selector: 'dark-fort-item-room',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgIf
  ],
  templateUrl: './item-room.component.html',
  styleUrl: './item-room.component.css'
})
export class ItemRoomComponent {
  item!: ItemIdentifier | WeaponIdentifier;

  constructor(public stateService: StateService, private diceService: DiceService) {
    this.item = this.roll();
  }

  getItemName(item: ItemIdentifier | WeaponIdentifier) {
    if (this.stateService.isItemIdentifier(item)) {
      return this.stateService.getItem(item).name;
    }

    return this.stateService.getWeapon(item).name;
  }

  onReroll() {
    this.roll();
    this.stateService.character.inventory['omen'] += -1;
  }

  resolveItem() {
    if (this.stateService.isItemIdentifier(this.item)) {
      this.stateService.character.inventory[this.item] += 1;
    } else {
      this.stateService.character.weapons[this.item] += 1;
    }
  }

  roll(): ItemIdentifier | WeaponIdentifier {
    const roll: number = this.diceService.rollDice(1, 6);

    if (roll === 1) {
      return this.diceService.getRandomElement(initialWeaponsTable);
    } else if (roll === 2) {
      return this.diceService.getRandomElement(scrollTable);
    }

    return this.diceService.getRandomElement(initialItemsTable);
  }
}
