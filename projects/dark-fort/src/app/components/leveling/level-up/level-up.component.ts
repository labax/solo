import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {
  IMonster,
  levelIdentifier,
  MonsterIdentifier,
  monstersTable, strongMonsters,
  weakMonsters
} from "../../../models/character.interface";
import {StateService} from "../../../services/state.service";
import {DiceService} from "../../../../../../common/src/lib/services/dice.service";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'dark-fort-level-up',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatRadioButton,
    MatRadioGroup,
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './level-up.component.html',
  styleUrl: './level-up.component.css'
})
export class LevelUpComponent implements OnInit {

  level!: levelIdentifier
  name!: string
  levelDescription!: string;
  weakMonster!: MonsterIdentifier;
  toughMonster!: MonsterIdentifier;

  constructor(private stateService: StateService, private diceService: DiceService) {
  }

  ngOnInit(): void {
    this.level = this.diceService.getRandomElement(this.stateService.levels);

    const index = this.stateService.levels.findIndex(item => item === this.level);

    this.stateService.levels.splice(index, 1);
    this.levelDescription = this.stateService.getLevel(this.level).description;
  }

  resetMap() {
    this.resolveLevel();
    this.stateService.initilizeMap();
  }

  resolveLevel() {
    const level = this.stateService.getLevel(this.level);
    if (this.weakMonster && this.toughMonster) {
      level.onLevel(this.stateService, this.name, [this.weakMonster, this.toughMonster]);
    } else {
      level.onLevel(this.stateService, this.name);
    }
  }

  getMonsters(table: MonsterIdentifier[]): IMonster[] {
    return monstersTable.filter(monster=> table.indexOf(monster.id) > -1);
  }

  protected readonly weakMonsters = weakMonsters;
  protected readonly strongMonsters = strongMonsters;
}
