import {Injectable} from '@angular/core';
import {
  ICharacter, IInventoryItem, IItem, ILevel, initialItemsTable,
  initialWeaponsTable,
  ItemIdentifier, itemIdentifiers, itemsTable, IWeapon, levelIdentifier, levelTable, MonsterIdentifier, monstersTable,
  Room,
  RoomShape, roomType,
  Status, WeaponIdentifier, weaponIdentifiers, weaponsTable
} from '../models/character.interface';
import {DiceService} from '../../../../common/src/lib/services/dice.service';
import {RoomService} from './room.service';
import {RollDialogComponent} from '../components/roll-dialog/roll-dialog.component';
import {LiteralsService} from './literals.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private diceService: DiceService, private roomService: RoomService, private literalsService: LiteralsService) {

  }

  public map: Room[] = [];
  public currentRoom!: Room;
  public character!: ICharacter;
  public combatRound: number = 0;
  public halved: MonsterIdentifier[] = []

  public levels: levelIdentifier[] = ['sir', 'attack', 'hitPoints', 'potions', 'zweihander', 'half'];

  public calculateExploredRoomsCount(): number {
    return this.map.filter(room => room.shape !== RoomShape.placeholder).length;
  }

  public calculateUnexploredRoomsCount() {
    return this.map.filter(room => room.shape === RoomShape.placeholder).length;
  }

  initilizeMap() {
    this.map = [];
    const room = this.roomService.generateRandomRoom(0, Math.floor(this.roomService.mapWidth / 2))
    this.map.push(room);
    this.currentRoom = room;
  }

  async initialize() {
    this.initilizeMap();

    const weapons: Record<WeaponIdentifier, number> = {
      'dagger': 0,
      'sword': 0,
      'flail': 0,
      'zweihander': 0,
      'warhammer': 0
    }

    this.character = {
      name: 'Kargunt',
      hitPointsCurrent: 15,
      hitPointsMax: 15,
      inventory: [],
      level: 0,
      points: 0,
      silver: await this.diceService.rollAndSumDiceWithConfirmation(1, 6, this.literalsService.silverRoll, RollDialogComponent) + 15,
      weapon: await this.diceService.getRandomElementWithConfirmation(initialWeaponsTable, 1, 4, this.literalsService.initialWeaponRoll, RollDialogComponent),
      weapons: weapons,
      attackBonus: 0
    }

    const itemId = await this.diceService.getRandomElementWithConfirmation(initialItemsTable, 1, 4, this.literalsService.initialItemRoll, RollDialogComponent);
    this.addItemToInventory(itemId);
  }

  removeItemFromInventory(item: IInventoryItem) {
    const index = this.character.inventory.findIndex(x => x === item);
    this.character.inventory.splice(index, 1);
  }

  async addItemToInventory(key: ItemIdentifier) {
    const item = this.getItem(key);
    const inventoryItem: IInventoryItem = {
      id: item.id,
      charges: 1
    }

    if (item.chargeable) {
      inventoryItem.charges = await this.diceService.rollAndSumDiceWithConfirmation(1, 4, this.literalsService.chargesRoll, RollDialogComponent);
    }

    this.character.inventory.push(inventoryItem);
  }

  resolveRoom(room: Room): roomType | undefined {
    if (this.roomService.canTravel(this.currentRoom, room) || this.map.length === 1) {
      this.currentRoom = room;
      if (room.shape === RoomShape.placeholder) {
        const materializedRoom = this.roomService.materializeRoom(room, this.map);
        const neighbors = this.roomService.getNeighboringCoordinates(materializedRoom);
        for (const neighbor of neighbors) {
          if (!this.map.find(room => room.x === neighbor.x && room.y === neighbor.y)) {
            const cardinality = this.roomService.calculateEntrance(room.x, room.y, neighbor.x, neighbor.y)
            this.map.push(this.roomService.generateRandomRoom(neighbor.x, neighbor.y, [cardinality]));
          }
        }
        return materializedRoom.type;
      }
    }
    return undefined;
  }

  calculateWinningConditions(): Status {
    if (this.calculateUnexploredRoomsCount() === 0) {
      return Status.loss;
    }

    if (this.character.hitPointsCurrent <= 0) {
      return Status.loss;
    }

    if (this.levels.length === 0) {
      return Status.win;
    }

    return Status.continue;
  }

  healCharacter(): void {
    this.character.hitPointsCurrent += this.diceService.rollAndSumDice(1, 6);
    if (this.character.hitPointsCurrent > this.character.hitPointsMax) {
      this.character.hitPointsCurrent = this.character.hitPointsMax;
    }
  }

  calculateScrollUses() {
    return this.diceService.rollAndSumDice(1, 4);
  }

  getItem(key: string): IItem {
    const item = itemsTable.find(item => item.id === key);
    if (!item) {
      throw new Error('item not found!');
    }

    return item;
  }

  getWeapon(key: string): IWeapon {
    const item = weaponsTable.find(item => item.id === key);
    if (!item) {
      throw new Error('item not found!');
    }

    return item;
  }

  getMonster(key: string) {
    const monster = monstersTable.find(monster => monster.id === key);
    if (!monster) {
      throw new Error('monster not found!');
    }

    return monster;
  }

  getLevel(key: levelIdentifier): ILevel {
    const level = levelTable.find(level => level.id === key);
    if (!level) {
      throw new Error('level not found!');
    }

    return level;
  }

  hasItem(key: ItemIdentifier): boolean {
    if (this.character.inventory.find(item => item.id === key)) {
      return true;
    }

    return false;
  }

  async calculateTrap(): Promise<number> {
    const hasRope = this.hasItem('rope');
    const description = `roll for trap, success on greater than ${hasRope ? 2 : 3}`
    const roll = await this.diceService.rollAndSumDiceWithConfirmation(1, 6, description, RollDialogComponent);
    if (hasRope) {
      return roll + 1;
    }

    return roll;
  }

  calculateDamage(damageDie: number, damageBonus: number, ignoresArmor: boolean): number {
    const roll = this.diceService.rollAndSumDice(1, damageDie) + damageBonus;
    if (this.hasItem('armor') && !ignoresArmor) {
      return roll - this.diceService.rollAndSumDice(1, 4);
    }

    return roll;
  }

  isItemIdentifier(value: any): value is ItemIdentifier {
    return itemIdentifiers.includes(value);
  }

  isWeaponIdentifier(value: any): value is WeaponIdentifier {
    return weaponIdentifiers.includes(value);
  }

  calculateCombatDamage(dice: number, sides: number, bonus: number): number {
    return this.diceService.rollAndSumDice(dice, sides) + bonus;
  }

  calculateMonsterHit(points: number): boolean {
    const roll = this.diceService.rollAndSumDice(1, 6);
    const weaponBonus = this.getWeapon(this.character.weapon).attackBonus;
    return roll + weaponBonus + this.character.attackBonus >= points;
  }

  calculatePlayerDamage(): number {
    const weapon = this.getWeapon(this.character.weapon);
    return this.calculateCombatDamage(1, weapon.damageDie, weapon.damageBonus);
  }

  calculateMonsterDamage(monsterId: MonsterIdentifier): number {
    const monster = this.getMonster(monsterId);
    let damage = monster.damage(this);
    if (this.halved.find(monster => monster === monsterId)) {
      damage = damage / 2;
    }
    if (this.hasItem('armor')) {
      damage += -this.diceService.rollAndSumDice(1, 4);
    }

    return damage >= 0 ? damage : 0;
  }
}
