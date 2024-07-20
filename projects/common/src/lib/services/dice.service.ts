import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() {
  }

  rollDice(numDice: number, numSides: number): number {
    let sum = 0;
    for (let i = 0; i < numDice; i++) {
      sum += Math.floor(Math.random() * numSides) + 1;
    }
    return sum;
  }
}
