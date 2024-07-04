import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments.page';
import { TransactionInterface } from '../interfaces/transactions.interface ';
import { TransactionReportInterface } from '../interfaces/transaction-report.interface ';

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

  getReports(): Observable<TransactionReportInterface[]> {
    return this.http.get<TransactionReportInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}`
    );
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrlBase}${this.myApiUrl}/${id}`);
  }

  saveReport(
    account: TransactionReportInterface
  ): Observable<TransactionReportInterface[]> {
    console.log('account', account);

    return this.http.post<TransactionReportInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}`,
      account
    );
  }

  updateReport(
    id: String,
    productsCard: TransactionReportInterface
  ): Observable<TransactionReportInterface[]> {
    return this.http.patch<TransactionReportInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}/${id}`,
      productsCard
    );
  }
}
