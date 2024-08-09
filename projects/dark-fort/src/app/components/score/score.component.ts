import { Component } from '@angular/core';
import {StateService} from '../../services/state.service';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'dark-fort-score',
  standalone: true,
  imports: [
    MatButton,
    NgIf
  ],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {

  constructor(public stateService: StateService) {
  }

  canLevelPoints(): boolean {
    return this.stateService.calculateExploredRoomsCount() >= 12 && this.stateService.character.points >= 15;
  }

  canLevelSilver(): boolean {
    return this.stateService.character.silver > 40;
  }
}
