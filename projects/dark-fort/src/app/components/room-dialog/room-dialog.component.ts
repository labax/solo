import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {roomType, roomTypes} from '../../models/character.interface';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'dark-fort-room-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    NgIf,
    MatRadioGroup,
    FormsModule,
    MatDialogClose,
    MatRadioButton,
    NgForOf
  ],
  templateUrl: './room-dialog.component.html',
  styleUrl: './room-dialog.component.css'
})
export class RoomDialogComponent {

  public room!: roomType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: roomType[] ) {
  }

  protected readonly roomTypes = roomTypes;
}
