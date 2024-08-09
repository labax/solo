import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {levelIdentifier} from "../../../models/character.interface";
import {StateService} from "../../../services/state.service";
import {DiceService} from "../../../../../../common/src/lib/services/dice.service";

@Component({
  selector: 'dark-fort-level-up',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './level-up.component.html',
  styleUrl: './level-up.component.css'
})
export class LevelUpComponent implements OnInit {

  level!: levelIdentifier


  constructor(private stateService: StateService, private diceService: DiceService) {
  }

  ngOnInit(): void {
    this.level = this.diceService.getRandomElement(this.stateService.levels);

    const index = this.stateService.levels.findIndex(item => item === this.level);

    this.stateService.levels.splice(index, 1);
  }

  resetMap() {
    this.stateService.initilizeMap();
  }
}
