import { ClientInterface } from './../interfaces/client.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments.page';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private myAppUrlBase: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrlBase = environments.baseUrl;
    this.myApiUrl = '/api/clients';
  }

  getClients(): Observable<ClientInterface> {
    return this.http.get<ClientInterface>(
      `${this.myAppUrlBase}${this.myApiUrl}`
    );
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrlBase}${this.myApiUrl}/${id}`);
  }

  saveClient(client: ClientInterface): Observable<void> {
    return this.http.post<void>(`${this.myAppUrlBase}${this.myApiUrl}`, client);
  }

  updateClient(
    id: String,
    client: ClientInterface
  ): Observable<ClientInterface> {
    return this.http.patch<ClientInterface>(
      `${this.myAppUrlBase}${this.myApiUrl}/${id}`,
      client
    );
  }
}
