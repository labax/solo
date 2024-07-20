import {Component, Input} from '@angular/core';
import {ICharacter} from '../../models/character.interface';

@Component({
  selector: 'dark-fort-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  @Input() character!: ICharacter | undefined;

}
