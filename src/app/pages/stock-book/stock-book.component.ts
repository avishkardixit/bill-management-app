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

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.stockService.getStock().subscribe(res => this.stocks = res);
    this.stockService.getHistory().subscribe(res => this.history = res);
  }

  save(stock: any) {
    this.stockService.updateStock(stock.id, stock.availableKg)
      .subscribe(() => alert('Updated'));
  }
}
