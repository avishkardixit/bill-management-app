import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="dialog">
      <h2>{{ data.type }} Money</h2>

      <mat-form-field appearance="outline">
        <mat-label>Amount</mat-label>
        <input matInput type="number" [(ngModel)]="data.amount" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Note (optional)</mat-label>
        <input matInput [(ngModel)]="data.note" />
      </mat-form-field>

      <div class="actions">
        <button mat-button (click)="ref.close()">Cancel</button>
        <button mat-raised-button color="primary" (click)="ref.close(data)">Save</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog { padding: 20px; display: flex; flex-direction: column; gap: 12px; width: 320px }
    .actions { display: flex; justify-content: flex-end; gap: 10px }
  `]
})
export class AccountTransactionDialogComponent {
  constructor(
    public ref: MatDialogRef<AccountTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
