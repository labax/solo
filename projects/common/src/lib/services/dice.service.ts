import {Injectable, Type} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DiceDialog} from '../models/DiceDialog';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor(private dialog: MatDialog) {
  }

  rollAndSumDice(numDice: number, numSides: number): number {
    let sum = 0;
    for (let i = 0; i < numDice; i++) {
      sum += Math.floor(Math.random() * numSides) + 1;
    }
    return sum;
  }

  getRandomElement<T>(array: T[]): T {
    if (array.length === 0) {
      throw new Error('Empty array');
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  async getRandomElementWithConfirmation<T1, T2 extends DiceDialog>(array: T1[], numberOfDice: number, sides: number, description: string, dialogComponent: Type<T2>): Promise<T1> {
    if (array.length === 0) {
      throw new Error('Empty array');
    }

    const roll = await this.rollDiceWithConfirmation(numberOfDice, sides, description, dialogComponent);

    return array[roll[0] - 1];
  }

  async rollDiceWithConfirmation<T extends DiceDialog>(numberOfDice: number, sides: number, description: string, dialogComponent: Type<T>): Promise<number[]> {
    let results: number[] = this.rollDice(numberOfDice, sides);
    let confirmed = false;

    while (!confirmed) {
      const dialogRef = this.dialog.open(dialogComponent, {
        width: '250px',
        data: {results, sides, description},
        disableClose: true
      });

      const result = await dialogRef.afterClosed().toPromise();

      if (result === 'accept') {
        confirmed = true;
      } else {
        results = this.rollDice(numberOfDice, sides);
      }
    }

    return results;
  }

  async rollAndSumDiceWithConfirmation<T extends DiceDialog>(numberOfDice: number, sides: number, description: string, dialogComponent: Type<T>): Promise<number> {
    const results = await this.rollDiceWithConfirmation(numberOfDice, sides, description, dialogComponent);
    return results.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  private rollDice(numberOfDice: number, sides: number): number[] {
    let results: number[] = [];

    for (let i = 0; i < numberOfDice; i++) {
      let rollResult = this.rollDie(sides);
      results.push(rollResult);
    }

    return results;
  }

  private rollDie(sides: number): number {
    return Math.floor(Math.random() * sides) + 1;
  }
}
