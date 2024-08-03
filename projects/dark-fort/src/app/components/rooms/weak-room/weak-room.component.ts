import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {StateService} from '../../../services/state.service';
import {DiceService} from '../../../../../../common/src/lib/services/dice.service';
import {MonsterIdentifier, weakMonsters} from '../../../models/character.interface';
import {NgIf} from '@angular/common';

@Component({
  selector: 'dark-fort-weak-room',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgIf
  ],
  templateUrl: './weak-room.component.html',
  styleUrl: './weak-room.component.css'
})
export class WeakRoomComponent {

  monster!: MonsterIdentifier;
  hitPoints!: number;
  monsterName!: string;

  constructor(public stateService: StateService, private diceService: DiceService) {
    this.rollMonster();
  }

  rollMonster(): void {
    this.monster = this.diceService.getRandomElement(weakMonsters);
    const monster = this.stateService.getMonster(this.monster);
    this.hitPoints = monster.hitPoints;
    this.monsterName = monster.name;
  }

  canRerollmonster() {
    return this.stateService.canReroll() && this.stateService.combatRound === 0;
  }

  rerollMonster() {
    this.rollMonster();
    this.stateService.character.inventory['omen'] += -1;
  }
}
