import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {StateService} from '../../../services/state.service';
import {DiceService} from '../../../../../../common/src/lib/services/dice.service';
import {ItemIdentifier, scrollTable} from '../../../models/character.interface';
import {NgIf} from '@angular/common';

@Component({
  selector: 'dark-fort-scroll-room',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgIf
  ],
  templateUrl: './scroll-room.component.html',
  styleUrl: './scroll-room.component.css'
})
export class ScrollRoomComponent {
  scroll!: ItemIdentifier;

  constructor(public stateService: StateService, private diceService: DiceService) {
    this.scroll = this.roll();
  }

  roll(): ItemIdentifier {
    return this.diceService.getRandomElement(scrollTable);
  }

  getItemName(scroll: ItemIdentifier) {
    return this.stateService.getItem(scroll).name;
  }

  resolveScroll() {
    this.stateService.addItemToInventory(this.scroll);
  }
}
