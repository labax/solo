import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RoomMapComponent} from './components/room-map/room-map.component';
import {CharacterComponent} from './components/character/character.component';
import {StateService} from './services/state.service';

@Component({
  selector: 'dark-fort-root',
  standalone: true,
  imports: [RouterOutlet, RoomMapComponent, CharacterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'darkFort';


  constructor(public stateService: StateService) {

  }
}
