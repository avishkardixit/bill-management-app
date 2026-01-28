import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  api = 'https://krushna-billing-api.azurewebsites.net/api/purchaseorders';

  // 👇 cache
  private purchaseCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    // If cache exists → instant response
    if (this.purchaseCache) {
      console.log('Serving purchase orders from cache');
      return of(this.purchaseCache);
    }

    // Otherwise → fetch from API and cache it
    console.log('Fetching purchase orders from API');
    return this.http.get<any[]>(this.api).pipe(
      tap(data => this.purchaseCache = data)
    );
  }

  add(data: any) {
    // Clear cache when data changes
    this.purchaseCache = null;
    return this.http.post(this.api, data);
  }

  update(id: number, data: any) {
    this.purchaseCache = null;
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    this.purchaseCache = null;
    return this.http.delete(`${this.api}/${id}`);
  }
}
