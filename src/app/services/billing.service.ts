import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  private storageKey = 'sellOrders';
  private sellOrders: any[] = [];

  constructor() {
    // Load cached data on app start
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.sellOrders = JSON.parse(saved);
    }
  }

  saveBill(bill: any) {
    const billWithId = {
      ...bill,
      id: Date.now(),
      createdAt: new Date()
    };

    this.sellOrders.unshift(billWithId); // newest first

    // Save to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(this.sellOrders));

    console.log('Bill Saved:', billWithId);
  }

  getSellOrders() {
    return this.sellOrders;
  }
}
