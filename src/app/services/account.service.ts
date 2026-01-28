import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
  api = 'https://krushna-billing-api.azurewebsites.net/api/Accounts';

  // 👇 cache
  private accountsCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any[]> {
    // If cached → return instantly
    if (this.accountsCache) {
      console.log('Serving accounts from cache');
      return of(this.accountsCache);
    }

    // Otherwise → call API and cache result
    console.log('Fetching accounts from API');
    return this.http.get<any[]>(this.api).pipe(
      tap(data => this.accountsCache = data)
    );
  }

  addTransaction(id: number, data: any) {
    // Important: clear cache so next load gets fresh data
    this.accountsCache = null;

    return this.http.post(`${this.api}/${id}/transaction`, data);
  }
}
