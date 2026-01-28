import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LendingService {
  private api = 'https://krushna-billing-api.azurewebsites.net/api/Lending';

  // 👇 caches
  private accountsCache: any[] | null = null;
  private transactionsCache = new Map<number, any[]>();

  constructor(private http: HttpClient) {}

  // -------- Accounts --------

  getAccounts(): Observable<any[]> {
    if (this.accountsCache) {
      console.log('Serving lending accounts from cache');
      return of(this.accountsCache);
    }

    console.log('Fetching lending accounts from API');
    return this.http.get<any[]>(this.api).pipe(
      tap(data => this.accountsCache = data)
    );
  }

  addParty(name: string) {
    this.clearCache();
    return this.http.post<any>(`${this.api}?name=${name}`, {});
  }

  deleteParty(id: number) {
    this.clearCache();
    return this.http.delete(`${this.api}/${id}`);
  }

  // -------- Transactions --------

  getTransactions(id: number): Observable<any[]> {
    if (this.transactionsCache.has(id)) {
      console.log(`Serving transactions for ${id} from cache`);
      return of(this.transactionsCache.get(id)!);
    }

    console.log(`Fetching transactions for ${id} from API`);
    return this.http.get<any[]>(`${this.api}/${id}/transactions`).pipe(
      tap(data => this.transactionsCache.set(id, data))
    );
  }

  addTransaction(accountId: number, amount: number, type: 'Credit' | 'Debit') {
    this.clearCache();
    return this.http.post(
      `${this.api}/transaction?accountId=${accountId}&amount=${amount}&type=${type}`,
      {}
    );
  }

  // -------- helper --------

  private clearCache() {
    this.accountsCache = null;
    this.transactionsCache.clear();
  }
}
