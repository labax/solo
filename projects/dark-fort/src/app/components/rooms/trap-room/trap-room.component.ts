import {Component, OnInit} from '@angular/core';
import {StateService} from '../../../services/state.service';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {NgIf} from '@angular/common';

@Component({
  selector: 'dark-fort-trap-room',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgIf
  ],
  templateUrl: './trap-room.component.html',
  styleUrl: './trap-room.component.css'
})
export class TrapRoomComponent implements OnInit {

  avoidRoll!: number;
  damageRoll!: number;

  constructor(public stateService: StateService) {
  }

  ngOnInit(): void {
    this.roll();
  }

  roll() {
    this.avoidRoll = this.stateService.calculateTrap();
    this.damageRoll = this.stateService.calculateDamage(6, 0, false);
  }

  avoided(): boolean {
    return this.avoidRoll > 3;
  }

  resolveTrap() {
    if(!this.avoided()) {
      this.stateService.character.hitPointsCurrent += -this.damageRoll;
    }
  }
}
