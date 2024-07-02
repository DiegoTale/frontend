import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments.page';
import { TransactionInterface } from '../interfaces/transactions.interface ';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private myAppUrlBase: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrlBase = environments.baseUrl;
    this.myApiUrl = '/api/transactions';
  }

  getTransactions(): Observable<TransactionInterface[]> {
    return this.http.get<TransactionInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}`
    );
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrlBase}${this.myApiUrl}/${id}`);
  }

  saveTransaction(
    account: TransactionInterface
  ): Observable<TransactionInterface[]> {
    return this.http.post<TransactionInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}`,
      account
    );
  }

  updateTransaction(
    id: String,
    productsCard: TransactionInterface
  ): Observable<TransactionInterface[]> {
    return this.http.patch<TransactionInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}/${id}`,
      productsCard
    );
  }
}
