import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase-order-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './purchase-order-dialog.component.html',
  styleUrl: './purchase-order-dialog.component.scss'
})
export class PurchaseOrderDialogComponent {
  form = {
    date: '',
    party: '',
    color: '',
    amount: 0
  };

  constructor(
    public dialogRef: MatDialogRef<PurchaseOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) this.form = { ...data };
  }

  save() {
    this.dialogRef.close(this.form);
  }

  cancel() {
    this.dialogRef.close();
  }
}
