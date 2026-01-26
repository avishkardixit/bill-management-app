import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillService } from '../../services/bill.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sell-orders',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterModule, MatButtonModule],
  templateUrl: './sell-orders.component.html',
  styleUrl: './sell-orders.component.scss',
})
export class SellOrdersComponent implements OnInit {
  bills: any[] = [];
  filteredBills: any[] = [];
  loading = true;

  filter: 'today' | 'week' | 'month' | 'all' = 'all';

  constructor(private billService: BillService) {}

  ngOnInit() {
    this.loadBills();
  }

  loadBills() {
    this.billService.getBills().subscribe(
      (res: any[]) => {
        // Sort newest first
        this.bills = res.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        // Default show all
        this.applyFilter('all');
        this.loading = false;
      },
      () => {
        alert('Failed to load sell orders');
        this.loading = false;
      }
    );
  }

  applyFilter(type: 'today' | 'week' | 'month' | 'all') {
  this.filter = type;

  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  this.filteredBills = this.bills.filter(bill => {
    const billDateObj = new Date(bill.date);
    const billDate = new Date(
      billDateObj.getFullYear(),
      billDateObj.getMonth(),
      billDateObj.getDate()
    );

    if (type === 'today') return billDate.getTime() === today.getTime();
    if (type === 'week') return billDate >= startOfWeek;
    if (type === 'month') return billDate >= startOfMonth;

    return true;
  });
}


}
