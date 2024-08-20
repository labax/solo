import {Component, Input} from '@angular/core';
import {ICharacter} from '../../models/interfaces/ICharacter';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {StateService} from "../../services/state.service";
import {WeaponIdentifier} from "../../models/identifiers/WeaponIdentifier";
import {weaponsTable} from "../../models/tables/WeaponsTable";

@Component({
  selector: 'dark-fort-character',
  standalone: true,
  imports: [
    NgIf,
    MatButton
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  @Input() character!: ICharacter;


  constructor(public stateService: StateService) {
  }

  getWeaponName(weaponIdentifier: WeaponIdentifier): string {
    const weapon = weaponsTable.find(weapon => weapon.id === weaponIdentifier);
    if (!weapon) {
      throw new Error('weapon does not exist!');
    }
    return weapon.name
  }
}
