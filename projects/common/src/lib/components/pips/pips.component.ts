import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'solo-pips',
  standalone: true,
  imports: [
    MatIcon,
    NgForOf
  ],
  templateUrl: './pips.component.html',
  styleUrl: './pips.component.css'
})
export class PipsComponent {
  @Input() totalPips!: number;
  @Input() shadedPips!: number;
  @Input() class!: string;
  @Input() fullIcon!: string;
  @Input() emptyIcon!: string;

  counter() {
    return new Array(this.totalPips);
  }

  drawPips(index: number) {
    if(!this.shadedPips) {
      return this.emptyIcon;
    }

    if(index < this.shadedPips) {
      return this.fullIcon;
    }
    return this.emptyIcon;
  }
}
