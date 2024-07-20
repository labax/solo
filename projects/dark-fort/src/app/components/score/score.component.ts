import { Component } from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'dark-fort-score',
  standalone: true,
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {

  constructor(public stateService: StateService) {
  }
}
