import {Component, Inject, OnInit} from '@angular/core';
import {DiceDialog} from '../../../../../common/src/lib/models/DiceDialog';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {StateService} from '../../services/state.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'dark-fort-roll-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    NgIf
  ],
  templateUrl: './roll-dialog.component.html',
  styleUrl: './roll-dialog.component.css'
})
export class RollDialogComponent implements DiceDialog, OnInit {
  constructor(
    private stateService: StateService,
    public dialogRef: MatDialogRef<RollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { results: number[], sides: number, description: string }
  ) {
  }

  ngOnInit(): void {
    if(!this.canReroll()) {
      setTimeout(() => this.dialogRef.close('accept'), 3000);
    }
  }

  canReroll(): boolean {
    return this.stateService.hasItem('omen');
  }

  reroll(): void {
    this.dialogRef.close('reroll');
  }

  accept() {
    this.dialogRef.close('accept');
  }
}
