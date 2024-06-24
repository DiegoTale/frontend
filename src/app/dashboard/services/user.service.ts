import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { environments } from '../../../environments/environments.page';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrlBase: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrlBase = environments.baseUrl;
    this.myApiUrl = '/api/users';
  }

  getUsuarios(): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.myAppUrlBase}${this.myApiUrl}`);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrlBase}${this.myApiUrl}/${id}`);
  }

  saveUsuario(usuario: UserInterface): Observable<void> {
    return this.http.post<void>(
      `${this.myAppUrlBase}${this.myApiUrl}`,
      usuario
    );
  }

  updateUsuario(id: String, usuario: UserInterface): Observable<UserInterface> {
    return this.http.patch<UserInterface>(
      `${this.myAppUrlBase}${this.myApiUrl}/${id}`,
      usuario
    );
  }
}
