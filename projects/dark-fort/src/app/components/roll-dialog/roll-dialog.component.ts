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
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'dark-fort-roll-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    NgIf,
    NgForOf,
    MatIcon
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
    if(this.data.results.length === 3) {
      this.dialogRef.updateSize('500px')
    }
    if(!this.canReroll()) {
      setTimeout(() => this.dialogRef.close('accept'), 2000);
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
