import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PurchaseOrderDialogComponent } from '../../shared/purchase-order-dialog/purchase-order-dialog.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = false;

  constructor(
    private service: PurchaseOrderService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.service.getAll().subscribe(res => {
      this.orders = res;
      this.loading = false;
    });
  }

  add() {
    this.openDialog({ date: new Date().toISOString().substring(0, 10) });
  }

  edit(item: any) {
    this.openDialog({ ...item });
  }

  openDialog(data: any) {
    const ref = this.dialog.open(PurchaseOrderDialogComponent, {
      width: '420px',
      data
    });

    ref.afterClosed().subscribe(res => {
      if (!res) return;

      const req = res.id
        ? this.service.update(res.id, res)
        : this.service.add(res);

      req.subscribe(() => {
        this.snack.open('Saved successfully', 'OK', { duration: 2000 });
        this.load();
      });
    });
  }

  delete(id: number) {
    if (!confirm('Delete this entry?')) return;

    this.service.delete(id).subscribe(() => {
      this.snack.open('Deleted', 'OK', { duration: 2000 });
      this.load();
    });
  }
}
