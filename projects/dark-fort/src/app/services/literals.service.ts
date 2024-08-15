import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LiteralsService {

  constructor() { }

  public readonly silver: string = 'roll for silver';
}
