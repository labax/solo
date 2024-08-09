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
  message!: string;

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

  attack() {
    const monster = this.stateService.getMonster(this.monster);
    const hit = this.stateService.calculateMonsterHit(monster.points);
    if (hit) {
      const damage = this.stateService.calculatePlayerDamage();
      this.message = `you hit the monster for ${damage} damage`;
      this.hitPoints += -damage;
    } else {
      const damage = this.stateService.calculateMonsterDamage(this.monster);
      this.message = `the monster hits you for ${damage} damage`;
      this.stateService.character.hitPointsCurrent += -damage;
    }
  }

  resolveCombat() {
    if (this.stateService.character.hitPointsCurrent >= 0) {
      const monster = this.stateService.getMonster(this.monster);
      this.stateService.character.points += monster.points;
      if (monster.onKill) {
        monster.onKill(this.stateService, this.diceService);
      }
    }
  }

  hasPotion() {
    return this.stateService.character.inventory['potion'] > 0
  }

  usePotion() {
    const item = this.stateService.getItem('potion');
    if(item.onUse) {
      item.onUse(this.stateService)
    }
    this.stateService.character.inventory['potion'] += -1;
  }
}
