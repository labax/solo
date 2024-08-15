import {Component, Inject} from '@angular/core';
import {DiceDialog} from '../../../../../common/src/lib/models/DiceDialog';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'dark-fort-roll-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './roll-dialog.component.html',
  styleUrl: './roll-dialog.component.css'
})
export class RollDialogComponent implements DiceDialog {
  constructor(
    public dialogRef: MatDialogRef<RollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { results: number[], sides: number, description: string }
  ) {}

  reroll(): void {
    this.dialogRef.close('reroll');
  }

  accept(): void {
    this.dialogRef.close('accept');
  }

}
