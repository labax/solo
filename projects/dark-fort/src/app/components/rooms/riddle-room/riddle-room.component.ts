import {Component, OnInit} from '@angular/core';
import {StateService} from '../../../services/state.service';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'dark-fort-riddle-room',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgIf,
    MatRadioGroup,
    MatRadioButton,
    FormsModule
  ],
  templateUrl: './riddle-room.component.html',
  styleUrl: './riddle-room.component.css'
})
export class RiddleRoomComponent implements OnInit {
  solveRoll!: number;
  damageRoll!: number;
  reward!: string;

  constructor(public stateService: StateService) {

  }

  async ngOnInit(): Promise<void> {
    await this.roll();
  }

  async roll() {
    this.solveRoll = await this.stateService.calculateRiddle();
    if(!this.solved()) {
      this.damageRoll = await this.stateService.calculateDamage(4, 0, true);
    }
  }

  solved(): boolean {
    return this.solveRoll % 2 === 1;
  }

  resolveRiddle() {
    if (!this.solved()) {
      this.stateService.character.hitPointsCurrent -= this.damageRoll;
    } else if (this.reward === 'silver') {
      this.stateService.character.silver += 10;
    } else if (this.reward === 'points') {
      this.stateService.character.points += 3;
    }
  }
}
