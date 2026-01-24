import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillService } from '../../services/bill.service';
import { NgFor,NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sell-orders',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterModule, MatButtonModule],
  templateUrl: './sell-orders.component.html',
  styleUrl: './sell-orders.component.scss'
})
export class SellOrdersComponent implements OnInit {
  bills: any[] = [];
  loading = true;

  constructor(private billService: BillService) {}

  ngOnInit() {
    this.loadBills();
  }

  loadBills() {
    this.billService.getBills().subscribe({
      next: (res: any) => {
        this.bills = res;
        this.loading = false;
      },
      error: () => {
        alert('Failed to load sell orders');
        this.loading = false;
      }
    });
  }
}
