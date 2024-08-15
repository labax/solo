import {Component, OnInit} from '@angular/core';
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
import {LiteralsService} from '../../../services/literals.service';
import {RollDialogComponent} from '../../roll-dialog/roll-dialog.component';

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
export class ItemRoomComponent implements OnInit {
  item!: ItemIdentifier | WeaponIdentifier;

  constructor(public stateService: StateService, private diceService: DiceService, private literalsService: LiteralsService) {
  }

  async ngOnInit(): Promise<void> {
    this.item = await this.roll();
  }

  getItemName(item: ItemIdentifier | WeaponIdentifier) {
    if (this.stateService.isItemIdentifier(item)) {
      return this.stateService.getItem(item).name;
    }

    return this.stateService.getWeapon(item).name;
  }

  async resolveItem() {
    if (this.stateService.isItemIdentifier(this.item)) {
      await this.stateService.addItemToInventory(this.item);
    } else {
      this.stateService.character.weapons[this.item] += 1;
    }
  }

  async roll(): Promise<ItemIdentifier | WeaponIdentifier> {
    const roll: number = await this.diceService.rollAndSumDiceWithConfirmation(1, 6, this.literalsService.initialItemRoll, RollDialogComponent);

    if (roll === 1) {
      return this.diceService.getRandomElement(initialWeaponsTable);
    } else if (roll === 2) {
      return this.diceService.getRandomElement(scrollTable);
    }

    return initialItemsTable[roll-3];
  }
}
