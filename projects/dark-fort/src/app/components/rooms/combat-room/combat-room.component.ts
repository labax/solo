import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton, MatFabButton} from '@angular/material/button';
import {StateService} from '../../../services/state.service';
import {DiceService} from '../../../../../../common/src/lib/services/dice.service';
import {NgForOf, NgIf} from '@angular/common';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {LiteralsService} from "../../../services/literals.service";
import {RollDialogComponent} from "../../roll-dialog/roll-dialog.component";
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatIconModule} from "@angular/material/icon";
import {PipsComponent} from "../../../../../../common/src/lib/components/pips/pips.component";
import {MonsterIdentifier} from "../../../models/identifiers/MonsterIdentifier";
import {IInventoryItem} from "../../../models/interfaces/IInventoryItem";
import {battleItemsTable} from "../../../models/tables/BattleItemsTable";
import {fadeIn} from '../../../../../../common/src/lib/animations/fadeIn';

@Component({
  selector: 'dark-fort-weak-room',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    NgIf,
    MatSelect,
    MatOption,
    NgForOf,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatGridList,
    MatGridTile,
    MatIconModule,
    PipsComponent,
    MatFabButton,
    MatButton
  ],
  animations: [fadeIn],
  templateUrl: './combat-room.component.html',
  styleUrl: './combat-room.component.css'
})
export class CombatRoomComponent implements OnInit, OnDestroy {

  monster!: MonsterIdentifier;
  monsterHitPoints!: number;
  monsterHitPointsMax!: number;
  monsterName!: string;
  message!: string;
  daemon!: boolean;
  monsterDamage!: number;
  evaded!: boolean;

  constructor(public stateService: StateService,
              private diceService: DiceService,
              private literalService: LiteralsService,
              public dialogRef: MatDialogRef<CombatRoomComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MonsterIdentifier[]) {
  }

  async ngOnInit() {
    await this.rollMonster();
    this.daemon = false;
    this.stateService.combatRound = 0;
  }

  ngOnDestroy() {
    this.daemon = false;
  }

  async rollMonster(): Promise<void> {
    this.monster = await this.diceService.getRandomElementWithConfirmation(this.data, 1, 4, this.literalService.monsterRoll, RollDialogComponent);
    const monster = this.stateService.getMonster(this.monster);
    this.monsterHitPoints = monster.hitPoints;
    this.monsterHitPointsMax = monster.hitPoints;
    this.monsterName = monster.name;
  }

  async attack() {
    this.stateService.combatRound += 1;
    const monster = this.stateService.getMonster(this.monster);
    const hit = await this.stateService.calculateMonsterHit(monster.points);
    if (hit) {
      const damage = await this.stateService.calculatePlayerDamage();
      this.message = `you hit the monster for ${damage} damage`;
      this.monsterHitPoints += -damage;
      if (this.daemon) {
        const daemonDamage = await this.stateService.calculateCombatDamage(1, 4, 0);
        this.message += ` your summoned daemon inflicts ${daemonDamage} damage`;
        this.monsterHitPoints += -daemonDamage;
      }

    } else {
      this.monsterDamage = await this.stateService.calculateMonsterDamage(this.monster);
      this.message = `the monster hits you for ${this.monsterDamage} damage`;
      this.stateService.character.hitPointsCurrent += -this.monsterDamage;
    }

    if(this.stateService.character.hitPointsCurrent <=  0 || this.monsterHitPoints <= 0) {
      await this.resolveCombat();
      setTimeout(() => this.dialogRef.close('accept'), 2000);
    }

  }

  async resolveCombat() {
    if (this.stateService.character.hitPointsCurrent >= 0) {
      const monster = this.stateService.getMonster(this.monster);
      // TODO: different properties for monster attack and xp or points calculated on onKillEvent
      if (!this.evaded) {
        if (this.monster === 'troll') {
          this.stateService.character.points += 7;
        } else {
          this.stateService.character.points += monster.points;
        }
      }
      if (monster.onKill) {
        await monster.onKill(this.stateService, this.diceService);
      }
      this.dialogRef.close();
    }
  }

  usePotion() {
    const item = this.stateService.getItem('potion');
    if (item.onUse) {
      item.onUse(this.stateService)
    }
  }

  useCloak() {
    const monster = this.stateService.getMonster(this.monster);
    this.stateService.character.points += monster.points;

    this.message = 'you evade the monster';
    this.monsterHitPoints = 0;
    this.evaded = true;
  }

  async usePalms() {
    const damage = await this.stateService.calculateCombatDamage(1, 6, 1);
    this.monsterHitPoints += -damage;
    this.message = `you inflict ${damage} damage`;
  }

  useSummon() {
    this.daemon = true;
  }

  canUseAegis() {
    return this.monsterDamage > 0 && this.stateService.hasItem('aegis');
  }

  useAegis() {
    const damageReduction = this.diceService.rollAndSumDice(1, 4);
    if (this.monsterDamage < damageReduction) {
      this.stateService.character.hitPointsCurrent += damageReduction;
    } else {
      this.stateService.character.hitPointsCurrent += this.monsterDamage;
    }

    const item = this.stateService.character.inventory.find(x => x.id === 'aegis');
    if (!item) {
      throw new Error('item not found!');
    }

    if (item.charges > 0) {
      item.charges -= 1;
    }
  }

  getUsableItems(): IInventoryItem[] {
    return this.stateService.character.inventory.filter(item => item.charges > 0 && battleItemsTable.indexOf(item.id) > -1);
  }

  async useItem(inventoryItem: IInventoryItem) {
    if (inventoryItem.id === 'potion') {
      this.usePotion();
    } else if (inventoryItem.id === 'cloak') {
      this.useCloak();
    } else if (inventoryItem.id === 'palms') {
      await this.usePalms();
    } else if (inventoryItem.id === 'summon') {
      this.useSummon();
    }
    const item = this.stateService.getItem(inventoryItem.id)
    if (item.chargeable) {
      inventoryItem.charges -= 1;
    } else {
      this.stateService.removeItemFromInventory(inventoryItem);
    }
  }
}
