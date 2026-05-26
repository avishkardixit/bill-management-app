import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { API_BASE_URL } from '../api.config';

@Injectable({ providedIn: 'root' })
export class BillService {
  private baseUrl = `${API_BASE_URL}/Bills`;

  // 👇 cache stored here
  private billsCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  saveBill(data: any) {
    // clear cache when new bill is added (important)
    this.billsCache = null;
    return this.http.post(this.baseUrl, data);
  }

  getBills(): Observable<any[]> {
    // 👇 If cache exists, return instantly
    if (this.billsCache) {
      console.log('Serving bills from cache');
      return of(this.billsCache);
    }

    // 👇 Otherwise call API and store result
    console.log('Fetching bills from API');
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => {
        this.billsCache = data; // store in cache
      })
    );
  }

  getBillById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
