import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {StateService} from '../../../services/state.service';
import {DiceService} from '../../../../../../common/src/lib/services/dice.service';
import {ItemIdentifier, MonsterIdentifier} from '../../../models/character.interface';
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
export class WeakRoomComponent implements OnInit, OnDestroy  {

  monster!: MonsterIdentifier;
  hitPoints!: number;
  monsterName!: string;
  message!: string;
  daemon!: boolean;
  monsterDamage!: number;

  constructor(public stateService: StateService, private diceService: DiceService, @Inject(MAT_DIALOG_DATA) public data: MonsterIdentifier[]) {

  }

  ngOnInit() {
    this.rollMonster();
    this.daemon = false;
    this.stateService.combatRound = 0;
  }

  ngOnDestroy() {
    this.daemon = false;
  }

  rollMonster(): void {
    this.monster = this.diceService.getRandomElement(this.data);
    const monster = this.stateService.getMonster(this.monster);
    this.hitPoints = monster.hitPoints;
    this.monsterName = monster.name;
  }

  attack() {
    this.stateService.combatRound += 1;
    const monster = this.stateService.getMonster(this.monster);
    const hit = this.stateService.calculateMonsterHit(monster.points);
    if (hit) {
      const damage = this.stateService.calculatePlayerDamage();
      this.message = `you hit the monster for ${damage} damage`;
      this.hitPoints += -damage;
      if(this.daemon){
        const daemonDamage = this.stateService.calculateCombatDamage(1,4, 0);
        this.message += ` your summoned daemon inflicts ${daemonDamage} damage`;
        this.hitPoints += -daemonDamage;
      }

    } else {
      this.monsterDamage = this.stateService.calculateMonsterDamage(this.monster);
      this.message = `the monster hits you for ${this.monsterDamage} damage`;
      this.stateService.character.hitPointsCurrent += -this.monsterDamage;
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

  hasItem(item: ItemIdentifier) {
    return this.stateService.character.inventory[item] > 0
  }

  usePotion() {
    const item = this.stateService.getItem('potion');
    if (item.onUse) {
      item.onUse(this.stateService)
    }
    this.stateService.character.inventory['potion'] += -1;
  }

  useCloak() {

    if (this.monster === 'troll') {
      this.stateService.character.points += 5;
    } else {
      const monster = this.stateService.getMonster(this.monster);
      this.stateService.character.points += monster.points;
    }

    this.stateService.character.inventory['cloak'] += -1;
  }

  usePalms() {
    const damage = this.stateService.calculateCombatDamage(1, 6, 1);
    this.hitPoints += -damage;
    this.message=`you inflict ${damage} damage`;
    this.stateService.character.inventory['palms'] += -1;
  }

  useSummon() {
    this.daemon = true;
    this.stateService.character.inventory['summon'] += -1;
  }

  canUseAegis() {
    return this.monsterDamage > 0 && this.stateService.character.inventory['aegis'] > 0
  }

  useAegis() {
    const damageReduction = this.diceService.rollDice(1,4);
    if(this.monsterDamage < damageReduction) {
      this.stateService.character.hitPointsCurrent += damageReduction;
    } else {
      this.stateService.character.hitPointsCurrent += this.monsterDamage;
    }

    this.stateService.character.inventory['aegis'] += -1;
  }
}
