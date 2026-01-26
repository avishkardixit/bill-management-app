import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-simple-input-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="dialog-container">
      <h2 class="title">{{ title }}</h2>

      <mat-form-field appearance="outline" class="full">
        <mat-label>{{ label }}</mat-label>
        <input matInput [(ngModel)]="value" />
      </mat-form-field>

      <div class="actions">
        <button mat-button (click)="dialogRef.close()">Cancel</button>
        <button mat-raised-button color="primary" (click)="dialogRef.close(value)">
          Save
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 24px;
      width: 320px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    }

    .full {
      width: 100%;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 8px;
    }
  `]
})
export class SimpleInputDialogComponent {
  title = '';
  label = '';
  value = '';

  constructor(public dialogRef: MatDialogRef<SimpleInputDialogComponent>) {}
}
