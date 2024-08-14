import {Component, Inject} from '@angular/core';
import {DiceDialog} from '../../../../../common/src/lib/models/DiceDialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'dark-fort-roll-dialog',
  standalone: true,
  imports: [],
  templateUrl: './roll-dialog.component.html',
  styleUrl: './roll-dialog.component.css'
})
export class RollDialogComponent implements DiceDialog {
  constructor(
    public dialogRef: MatDialogRef<RollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { results: number[], sides: number }
  ) {}

  reroll(): void {
    this.dialogRef.close('reroll');
  }

  accept(): void {
    this.dialogRef.close('accept');
  }

}
