import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RoomMapComponent} from './components/room-map/room-map.component';

@Component({
  selector: 'dark-fort-root',
  standalone: true,
  imports: [RouterOutlet, RoomMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'darkFort';
}
