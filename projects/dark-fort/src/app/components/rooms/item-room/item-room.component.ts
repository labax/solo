import {Component, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {StateService} from '../../../services/state.service';
import {DiceService} from '../../../../../../common/src/lib/services/dice.service';
import {LiteralsService} from '../../../services/literals.service';
import {RollDialogComponent} from '../../roll-dialog/roll-dialog.component';
import {WeaponIdentifier} from "../../../models/identifiers/WeaponIdentifier";
import {initialWeaponsTable} from "../../../models/tables/InitialWeaponsTable";
import {ItemIdentifier} from "../../../models/identifiers/ItemIdentifier";
import {initialItemsTable} from "../../../models/tables/InitialItemsTable";
import {scrollTable} from "../../../models/tables/ScrollTable";

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
      this.stateService.character.weapons.push(this.item);
    }
  }

  async roll(): Promise<ItemIdentifier | WeaponIdentifier> {
    const roll: number = await this.diceService.rollAndSumDiceWithConfirmation(1, 6, this.literalsService.initialItemRoll, RollDialogComponent);

    if (roll === 1) {
      return await this.diceService.getRandomElementWithConfirmation(initialWeaponsTable, 1, 4, this.literalsService.initialWeaponRoll, RollDialogComponent);
    } else if (roll === 2) {
      return await this.diceService.getRandomElementWithConfirmation(scrollTable, 1, 4, this.literalsService.scrollRoll, RollDialogComponent);
    }

    return initialItemsTable[roll - 3];
  }
}
