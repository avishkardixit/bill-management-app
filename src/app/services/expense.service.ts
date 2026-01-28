import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../Models/expense.model';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private api = 'https://krushna-billing-api.azurewebsites.net/api/otherexpenses';

  // 👇 cache
  private expenseCache: Expense[] | null = null;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Expense[]> {
    // Serve from cache if available
    if (this.expenseCache) {
      console.log('Serving expenses from cache');
      return of(this.expenseCache);
    }

    // Otherwise call API and store cache
    console.log('Fetching expenses from API');
    return this.http.get<Expense[]>(this.api).pipe(
      tap(data => this.expenseCache = data)
    );
  }

  add(expense: Expense) {
    // Clear cache after change
    this.expenseCache = null;
    return this.http.post(this.api, expense);
  }

  update(id: number, expense: Expense) {
    this.expenseCache = null;
    return this.http.put(`${this.api}/${id}`, expense);
  }

  delete(id: number) {
    this.expenseCache = null;
    return this.http.delete(`${this.api}/${id}`);
  }
}
