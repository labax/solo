import {Component} from '@angular/core';
import {StateService} from '../../../services/state.service';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {NgIf} from '@angular/common';

@Component({
  selector: 'dark-fort-riddle-room',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgIf
  ],
  templateUrl: './riddle-room.component.html',
  styleUrl: './riddle-room.component.css'
})
export class RiddleRoomComponent {
  solveRoll!: number;
  damageRoll!: number;

  constructor(public stateService: StateService) {
    this.solveRoll = this.stateService.calculateTrap();
    this.damageRoll = this.stateService.calculateDamage(4, 0, true);
  }
}
