import { Injectable } from '@angular/core';
import {Room} from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public map: Room[] = [];
}
