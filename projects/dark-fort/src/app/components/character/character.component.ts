import {Component, Input} from '@angular/core';
import {ICharacter, WeaponIdentifier, weaponsTable} from '../../models/character.interface';
import {NgIf} from '@angular/common';

@Component({
  selector: 'dark-fort-character',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  @Input() character!: ICharacter | undefined;

  getWeaponName(weaponIdentifier: WeaponIdentifier): string {
    const weapon = weaponsTable.find(weapon => weapon.id === weaponIdentifier);
    if(!weapon) {
      throw new Error('weapon does not exist!');
    }
    return weapon.name
  }

}
