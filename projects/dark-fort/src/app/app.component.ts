import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RoomMapComponent} from './components/room-map/room-map.component';
import {CharacterComponent} from './components/character/character.component';
import {StateService} from './services/state.service';
import {ScoreComponent} from './components/score/score.component';
import {InventoryComponent} from './components/inventory/inventory.component';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'dark-fort-root',
  standalone: true,
  imports: [RouterOutlet, RoomMapComponent, CharacterComponent, ScoreComponent, InventoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'darkFort';


  constructor(public stateService: StateService,
              private domSanitizer: DomSanitizer,
              public matIconRegistry: MatIconRegistry) {

    this.matIconRegistry
      .addSvgIcon('d4-1', this.setPath('dice/d4-1.svg'))
      .addSvgIcon('d4-2', this.setPath('dice/d4-2.svg'))
      .addSvgIcon('d4-3', this.setPath('dice/d4-3.svg'))
      .addSvgIcon('d4-4', this.setPath('dice/d4-4.svg'))
      .addSvgIcon('d6-1', this.setPath('dice/d6-1.svg'))
      .addSvgIcon('d6-2', this.setPath('dice/d6-2.svg'))
      .addSvgIcon('d6-3', this.setPath('dice/d6-3.svg'))
      .addSvgIcon('d6-4', this.setPath('dice/d6-4.svg'))
      .addSvgIcon('d6-5', this.setPath('dice/d6-5.svg'))
      .addSvgIcon('d6-6', this.setPath('dice/d6-6.svg'))
      .addSvgIcon('kargunt', this.setPath('kargunt.svg'))
      .addSvgIcon('basilisk', this.setPath('monsters/basilisk.svg'))
      .addSvgIcon('cultist', this.setPath('monsters/cultist.svg'))
      .addSvgIcon('goblin', this.setPath('monsters/goblin.svg'))
      .addSvgIcon('hound', this.setPath('monsters/hound.svg'))
      .addSvgIcon('medusa', this.setPath('monsters/medusa.svg'))
      .addSvgIcon('skeleton', this.setPath('monsters/skeleton.svg'))
      .addSvgIcon('sorcerer', this.setPath('monsters/sorcerer.svg'))
      .addSvgIcon('troll', this.setPath('monsters/troll.svg'));

    this.stateService.initialize();
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
