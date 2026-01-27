import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StockService {
  private api = 'https://krushna-billing-api.azurewebsites.net/api/Stock';

  constructor(private http: HttpClient) {}

  getStock() {
    return this.http.get<any[]>(this.api);
  }

  updateStock(id: number, kg: number) {
    return this.http.put(`${this.api}/${id}`, kg);
  }

  getHistory() {
    return this.http.get<any[]>(`${this.api}/history`);
  }
}
