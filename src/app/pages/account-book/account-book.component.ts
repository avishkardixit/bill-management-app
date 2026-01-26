import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountService } from '../../services/account.service';
import { AccountTransactionDialogComponent } from '../../shared/account-transaction-dialog/account-transaction-dialog.component';

@Component({
  selector: 'app-account-book',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './account-book.component.html',
  styleUrls: ['./account-book.component.scss']
})
export class AccountBookComponent implements OnInit {
  accounts: any[] = [];
  selectedAccount: any = null;

  constructor(
    private service: AccountService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAccounts().subscribe(res => this.accounts = res);
  }

  open(account: any, type: 'Credit' | 'Debit') {
    const ref = this.dialog.open(AccountTransactionDialogComponent, {
      data: { type, amount: 0, note: '' }
    });

    ref.afterClosed().subscribe(res => {
      if (!res) return;

      this.service.addTransaction(account.id, res).subscribe(() => {
        this.snack.open('Transaction saved', 'OK', { duration: 2000 });
        this.load();
      });
    });
  }

  

toggleHistory(account: any) {
  if (this.selectedAccount?.id === account.id) {
    this.selectedAccount = null; // close
  } else {
    this.selectedAccount = account; // open
  }
}

}
