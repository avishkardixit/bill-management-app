import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LendingService } from '../../services/lending.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleInputDialogComponent } from '../../shared/simple-input-dialog/simple-input-dialog.component';

@Component({
  selector: 'app-lending-book',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './lending-book.component.html',
  styleUrl: './lending-book.component.scss',
})
export class LendingBookComponent implements OnInit {
  parties: any[] = [];
  transactions: any[] = [];
  selected: any = null;

  newParty = '';

  constructor(
  private lendingService: LendingService,
  private dialog: MatDialog,
  private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.lendingService.getAccounts().subscribe((res) => (this.parties = res));
  }

  openAddPartyDialog() {
  const ref = this.dialog.open(SimpleInputDialogComponent);
  ref.componentInstance.title = 'Add Party';
  ref.componentInstance.label = 'Party Name';

  ref.afterClosed().subscribe(name => {
    if (!name) return;

    this.lendingService.addParty(name).subscribe(() => {
      this.snack.open('Party added successfully', 'OK', { duration: 2000 });
      this.load();
    });
  });
}

addAmount(party: any) {
  const ref = this.dialog.open(SimpleInputDialogComponent);
  ref.componentInstance.title = `Add Amount - ${party.partyName}`;
  ref.componentInstance.label = 'Amount';

  ref.afterClosed().subscribe(amount => {
    if (!amount) return;

    this.lendingService.addTransaction(party.id, +amount, 'Credit')
      .subscribe(() => {
        this.snack.open('Amount added', 'OK', { duration: 2000 });
        this.load();
      });
  });
}

receiveAmount(party: any) {
  const ref = this.dialog.open(SimpleInputDialogComponent);
  ref.componentInstance.title = `Receive Amount - ${party.partyName}`;
  ref.componentInstance.label = 'Amount';

  ref.afterClosed().subscribe(amount => {
    if (!amount) return;

    this.lendingService.addTransaction(party.id, +amount, 'Debit')
      .subscribe(() => {
        this.snack.open('Amount received', 'OK', { duration: 2000 });
        this.load();
      });
  });
}

delete(id: number) {
  if (!confirm('Are you sure?')) return;

  this.lendingService.deleteParty(id).subscribe(() => {
    this.snack.open('Party deleted', 'OK', { duration: 2000 });
    this.load();
  });
}

select(party: any) {
    this.selected = party;

    this.lendingService.getTransactions(party.id)
      .subscribe(res => this.transactions = res);
  }

}
