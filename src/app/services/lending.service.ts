import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LendingService {
  private api = 'https://localhost:7212/api/Lending';

  constructor(private http: HttpClient) {}

  getAccounts() {
    return this.http.get<any[]>(this.api);
  }

  addParty(name: string) {
    return this.http.post<any>(`${this.api}?name=${name}`, {});
  }

  deleteParty(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  getTransactions(id: number) {
    return this.http.get<any[]>(`${this.api}/${id}/transactions`);
  }

  addTransaction(accountId: number, amount: number, type: 'Credit' | 'Debit') {
    return this.http.post(`${this.api}/transaction?accountId=${accountId}&amount=${amount}&type=${type}`, {});
  }
}
