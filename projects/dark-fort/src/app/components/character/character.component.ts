import {Component, Input} from '@angular/core';
import {ICharacter, WeaponIdentifier, weaponsTable} from '../../models/character.interface';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

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

  getWeaponName(weaponIdentifier: WeaponIdentifier): string {
    const weapon = weaponsTable.find(weapon => weapon.id === weaponIdentifier);
    if (!weapon) {
      throw new Error('weapon does not exist!');
    }
    return weapon.name
  }
}
