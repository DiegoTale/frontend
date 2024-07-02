import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments.page';
import { ReportsInterface } from '../interfaces/reports.interface ';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private myAppUrlBase: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrlBase = environments.baseUrl;
    this.myApiUrl = '/api/reports';
  }

  getReports(): Observable<ReportsInterface[]> {
    return this.http.get<ReportsInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}`
    );
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrlBase}${this.myApiUrl}/${id}`);
  }

  saveReport(account: ReportsInterface): Observable<ReportsInterface[]> {
    console.log('account', account);

    return this.http.post<ReportsInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}`,
      account
    );
  }

  updateReport(
    id: String,
    productsCard: ReportsInterface
  ): Observable<ReportsInterface[]> {
    return this.http.patch<ReportsInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}/${id}`,
      productsCard
    );
  }
}
