import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments.page';
import { ProductCardsInterface } from '../interfaces/products-cards.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductCardsService {
  private myAppUrlBase: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrlBase = environments.baseUrl;
    this.myApiUrl = '/api/products-cards';
  }

  getProductsCard(): Observable<ProductCardsInterface[]> {
    return this.http.get<ProductCardsInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}`
    );
  }

  deleteProductCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrlBase}${this.myApiUrl}/${id}`);
  }

  saveProductCard(
    account: ProductCardsInterface
  ): Observable<ProductCardsInterface[]> {
    return this.http.post<ProductCardsInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}`,
      account
    );
  }

  updateProductCard(
    id: String,
    productsCard: ProductCardsInterface
  ): Observable<ProductCardsInterface[]> {
    return this.http.patch<ProductCardsInterface[]>(
      `${this.myAppUrlBase}${this.myApiUrl}/${id}`,
      productsCard
    );
  }
}
