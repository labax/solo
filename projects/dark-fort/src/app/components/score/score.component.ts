import {Component, inject} from '@angular/core';
import {StateService} from '../../services/state.service';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {LevelUpComponent} from "../leveling/level-up/level-up.component";
import {Status} from "../../models/character.interface";

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

  readonly dialog = inject(MatDialog);

  constructor(public stateService: StateService) {
  }

  canLevelPoints(): boolean {
    return this.stateService.calculateExploredRoomsCount() >= 12 && this.stateService.character.points >= 15;
  }

  canLevelSilver(): boolean {
    return this.stateService.character.silver > 40;
  }

  levelPoints() {
    const dialogRef = this.dialog.open(LevelUpComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      const status = this.stateService.calculateWinningConditions();
      if (status === Status.loss) {
        alert('you lost');
      } else if (status === Status.win) {
        alert('you won');
      }
    })
  }

  levelSilver() {
    const dialogRef = this.dialog.open(LevelUpComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      const status = this.stateService.calculateWinningConditions();
      if (status === Status.loss) {
        alert('you lost');
      } else if (status === Status.win) {
        alert('you won');
      }
    })
  }
}
