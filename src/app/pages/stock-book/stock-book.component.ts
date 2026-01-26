import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-stock-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-book.component.html',
  styleUrl: './stock-book.component.scss'
})
export class StockBookComponent implements OnInit {
  stocks: any[] = [];
  history: any[] = [];
  filteredHistory: any[] = [];
  selectedColor = '';

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.stockService.getStock().subscribe(res => this.stocks = res);

    this.stockService.getHistory().subscribe(res => {
      // newest first
      this.history = res.sort(
        (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      this.filteredHistory = [...this.history];
    });
  }

  applyFilter() {
    if (!this.selectedColor) {
      this.filteredHistory = [...this.history];
    } else {
      this.filteredHistory = this.history.filter(
        h => h.color === this.selectedColor
      );
    }
  }

  save(stock: any) {
    this.stockService.updateStock(stock.id, stock.availableKg)
      .subscribe(() => alert('Updated'));
  }
}
