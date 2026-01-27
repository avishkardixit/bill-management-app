import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../Models/expense.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private api = 'https://krushna-billing-api.azurewebsites.net/api/otherexpenses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.api);
  }

  add(expense: Expense) {
    return this.http.post(this.api, expense);
  }

  update(id: number, expense: Expense) {
    return this.http.put(`${this.api}/${id}`, expense);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
