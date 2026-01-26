import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExpenseService } from '../../services/expense.service';
import { ExpenseDialogComponent } from '../../shared/expense-dialog/expense-dialog.component';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-other-expenses',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './other-expenses.component.html',
  styleUrls: ['./other-expenses.component.scss']
})
export class OtherExpensesComponent implements OnInit {
  expenses: any[] = [];

  constructor(
    private service: ExpenseService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(res => this.expenses = res);
  }

  get total() {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  add() {
    const ref = this.dialog.open(ExpenseDialogComponent, {
      data: { date: new Date().toISOString().substring(0,10) }
    });

    ref.afterClosed().subscribe(res => {
      if (!res) return;
      this.service.add(res).subscribe(() => {
        this.snack.open('Expense added', 'OK', { duration: 2000 });
        this.load();
      });
    });
  }

  edit(exp: any) {
    const ref = this.dialog.open(ExpenseDialogComponent, { data: { ...exp } });

    ref.afterClosed().subscribe(res => {
      if (!res) return;
      this.service.update(exp.id, res).subscribe(() => {
        this.snack.open('Expense updated', 'OK', { duration: 2000 });
        this.load();
      });
    });
  }

  delete(id: number) {
    if (!confirm('Delete expense?')) return;
    this.service.delete(id).subscribe(() => {
      this.snack.open('Deleted', 'OK', { duration: 2000 });
      this.load();
    });
  }
}
