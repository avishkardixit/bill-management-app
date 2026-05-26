import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BillService } from '../../services/bill.service';
import { AccountService } from '../../services/account.service';
import { ExpenseService } from '../../services/expense.service';
import { LendingService } from '../../services/lending.service';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { StockService } from '../../services/stock.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(
    private billService: BillService,
    private accountService: AccountService,
    private expenseService: ExpenseService,
    private lendingService: LendingService,
    private purchaseService: PurchaseOrderService,
    private stockService: StockService,
    public auth: AuthService
  ) {}

  ngOnInit() {
  this.billService.getBills().subscribe();
  this.purchaseService.getAll().subscribe();
  

  setTimeout(() => {
    this.stockService.getStock().subscribe();
    this.accountService.getAccounts().subscribe();
  }, 800);

  setTimeout(() => {
    this.lendingService.getAccounts().subscribe();
    this.expenseService.getAll().subscribe();    
  }, 1500);
 }
}
