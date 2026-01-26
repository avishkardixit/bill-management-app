import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="dialog">
      <h2>{{ data?.id ? 'Edit Expense' : 'Add Expense' }}</h2>

      <mat-form-field appearance="outline">
        <mat-label>Date</mat-label>
        <input matInput type="date" [(ngModel)]="data.date" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="data.personName" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Expense Name</mat-label>
        <input matInput [(ngModel)]="data.expenseName" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Amount</mat-label>
        <input matInput type="number" [(ngModel)]="data.amount" />
      </mat-form-field>

      <div class="actions">
        <button mat-button (click)="ref.close()">Cancel</button>
        <button mat-raised-button color="primary" (click)="ref.close(data)">Save</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog { padding: 24px; display:flex; flex-direction:column; gap:14px; width:320px }
    .actions { display:flex; justify-content:flex-end; gap:12px }
  `]
})
export class ExpenseDialogComponent {
  constructor(
    public ref: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
