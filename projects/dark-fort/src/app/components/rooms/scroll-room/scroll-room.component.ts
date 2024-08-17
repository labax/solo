import {Component, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {StateService} from '../../../services/state.service';
import {DiceService} from '../../../../../../common/src/lib/services/dice.service';
import {ItemIdentifier, scrollTable} from '../../../models/character.interface';
import {NgIf} from '@angular/common';
import {LiteralsService} from '../../../services/literals.service';
import {RollDialogComponent} from '../../roll-dialog/roll-dialog.component';

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
export class ScrollRoomComponent implements OnInit {
  scroll!: ItemIdentifier;

  constructor(public stateService: StateService, private diceService: DiceService, private literalService: LiteralsService) {
  }

  async ngOnInit(): Promise<void> {
    this.scroll = await this.roll();
  }

  async roll(): Promise<ItemIdentifier> {
    return await this.diceService.getRandomElementWithConfirmation(scrollTable, 1, 4, this.literalService.scrollRoll, RollDialogComponent);
  }

  getItemName(scroll: ItemIdentifier) {
    return this.stateService.getItem(scroll).name;
  }

  resolveScroll() {
    this.stateService.addItemToInventory(this.scroll);
  }
}
