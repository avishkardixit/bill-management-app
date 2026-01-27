import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BillService {
  private baseUrl = 'https://krushna-billing-api.azurewebsites.net/api/Bills'; // change port if different

  constructor(private http: HttpClient) {}

  saveBill(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  getBills() {
     return this.http.get<any[]>(this.baseUrl);
  }

  getBillById(id: number) {
  return this.http.get(`${this.baseUrl}/${id}`);
 }
}