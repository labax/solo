import {Injectable} from '@angular/core';
import {
  ICharacter, IItem, initialItemsTable,
  initialWeaponsTable,
  ItemIdentifier, itemIdentifiers, itemsTable, IWeapon, levelIdentifier, MonsterIdentifier, monstersTable,
  Room,
  RoomShape, roomType,
  Status, WeaponIdentifier, weaponIdentifiers, weaponsTable
} from '../models/character.interface';
import {DiceService} from '../../../../common/src/lib/services/dice.service';
import {RoomService} from './room.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private diceService: DiceService, private roomService: RoomService) {

  }

  public map: Room[] = [];
  public currentRoom!: Room;
  public character!: ICharacter;
  public combatRound: number = 0;

  public levels: levelIdentifier[] = ['sir', 'attack', 'hitPoints', 'potions', 'zweihander', 'half']

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

  initialize() {
    this.initilizeMap();
    const inventory: Record<ItemIdentifier, number> = {
      'rope': 0,
      'armor': 0,
      'aegis': 0,
      'cloak': 0,
      'omen': 0,
      'potion': 0,
      'summon': 0,
      'palms': 0
    }

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
      inventory: inventory,
      level: 0,
      points: 0,
      silver: this.diceService.rollDice(1, 6) + 15,
      weapon: this.diceService.getRandomElement(initialWeaponsTable),
      weapons: weapons,
      attackBonus: 0
    }

    const itemId = this.diceService.getRandomElement(initialItemsTable);
    this.character.inventory[itemId] += 1;
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

    if(this.character.hitPointsCurrent <= 0) {
      return Status.loss;
    }

    return Status.continue;
  }

  healCharacter(): void {
    this.character.hitPointsCurrent += this.diceService.rollDice(1, 6);
    if (this.character.hitPointsCurrent > this.character.hitPointsMax) {
      this.character.hitPointsCurrent = this.character.hitPointsMax;
    }
  }

  calculateScrollUses() {
    return this.diceService.rollDice(1, 4);
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
    if(!monster) {
      throw new Error('monster not found!');
    }

    return monster;
  }

  calculateTrap(): number {
    const roll = this.diceService.rollDice(1, 6);
    if(this.character.inventory['rope'] > 0) {
      return roll + 1;
    }

    return roll;
  }

  calculateDamage(damageDie: number, damageBonus: number, ignoresArmor: boolean): number {
    const roll = this.diceService.rollDice(1, damageDie) + damageBonus;
    if(this.character.inventory['armor'] > 0 && !ignoresArmor) {
      return roll - this.diceService.rollDice(1, 4);
    }

    return roll;
  }

  canReroll(): boolean {
    return this.character.inventory['omen'] > 0;
  }

  isItemIdentifier(value: any): value is ItemIdentifier {
    return itemIdentifiers.includes(value);
  }

  isWeaponIdentifier(value: any): value is WeaponIdentifier {
    return weaponIdentifiers.includes(value);
  }

  calculateCombatDamage(dice: number, sides: number, bonus: number): number {
    return this.diceService.rollDice(dice, sides) + bonus;
  }

  calculateMonsterHit(points: number): boolean {
    const roll = this.diceService.rollDice(1,6);
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
    if(this.character.inventory['armor'] > 0) {
      damage += -this.diceService.rollDice(1,4);
    }

    return damage >=0 ? damage : 0;
  }
}
