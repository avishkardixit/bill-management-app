import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  private sellOrders: any[] = [];

  saveBill(bill: any) {
    const billWithId = {
      ...bill,
      id: Date.now(),          // simple unique id
      createdAt: new Date()
    };

    this.sellOrders.push(billWithId);

    console.log('Bill Saved:', billWithId);
    console.log('All Sell Orders:', this.sellOrders);
  }

  getSellOrders() {
    return this.sellOrders;
  }
}
