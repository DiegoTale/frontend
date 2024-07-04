import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments.page';
import { AccountInterface } from '../interfaces/account.interface';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private myAppUrlBase: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrlBase = environments.baseUrl;
    this.myApiUrl = '/api/accounts';
  }

  getAccounts(): Observable<AccountInterface[]> {
    return this.http.get<AccountInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}`
    );
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrlBase}${this.myApiUrl}/${id}`);
  }

  saveAccount(account: AccountInterface): Observable<AccountInterface[]> {
    return this.http.post<AccountInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}`,
      account
    );
  }

  updateAccount(
    id: String,
    account: AccountInterface
  ): Observable<AccountInterface[]> {
    return this.http.patch<AccountInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}/${id}`,
      account
    );
  }
}
