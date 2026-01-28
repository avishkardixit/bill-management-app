import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StockService {
  private api = 'https://krushna-billing-api.azurewebsites.net/api/Stock';

  // 👇 caches
  private stockCache: any[] | null = null;
  private historyCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  // -------- Stock --------

  getStock(): Observable<any[]> {
    if (this.stockCache) {
      console.log('Serving stock from cache');
      return of(this.stockCache);
    }

    console.log('Fetching stock from API');
    return this.http.get<any[]>(this.api).pipe(
      tap(data => this.stockCache = data)
    );
  }

  updateStock(id: number, kg: number) {
    // Clear caches when data changes
    this.stockCache = null;
    this.historyCache = null;

    return this.http.put(`${this.api}/${id}`, kg);
  }

  // -------- History --------

  getHistory(): Observable<any[]> {
    if (this.historyCache) {
      console.log('Serving stock history from cache');
      return of(this.historyCache);
    }

    console.log('Fetching stock history from API');
    return this.http.get<any[]>(`${this.api}/history`).pipe(
      tap(data => this.historyCache = data)
    );
  }
}
