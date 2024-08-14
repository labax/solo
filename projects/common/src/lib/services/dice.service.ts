import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() {
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
}
