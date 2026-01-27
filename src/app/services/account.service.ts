import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AccountService {
  api = 'https://krushna-billing-api.azurewebsites.net/api/Accounts';

  constructor(private http: HttpClient) {}

  getAccounts() {
    return this.http.get<any[]>(this.api);
  }

  addTransaction(id: number, data: any) {
    return this.http.post(`${this.api}/${id}/transaction`, data);
  }
}
