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
      .addSvgIcon('troll', this.setPath('monsters/troll.svg'))
      .addSvgIcon('heart-empty', this.setPath('heart-red-outline.svg'))
      .addSvgIcon('heart-full', this.setPath('heart-red.svg'))
      .addSvgIcon('cloak', this.setPath('combat/cloak.svg'))
      .addSvgIcon('daemon', this.setPath('combat/daemon.svg'))
      .addSvgIcon('potion', this.setPath('combat/potion.svg'))
      .addSvgIcon('aegis', this.setPath('scrolls/aegis.svg'))
      .addSvgIcon('palms', this.setPath('scrolls/palms.svg'))
      .addSvgIcon('summon', this.setPath('scrolls/summon.svg'))
      .addSvgIcon('dagger', this.setPath('weapons/dagger.svg'))
      .addSvgIcon('flail', this.setPath('weapons/flail.svg'))
      .addSvgIcon('sword', this.setPath('weapons/sword.svg'))
      .addSvgIcon('warHammer', this.setPath('weapons/warHammer.svg'))
      .addSvgIcon('zweihander', this.setPath('weapons/zweihander.svg'));


    this.stateService.initialize();
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
