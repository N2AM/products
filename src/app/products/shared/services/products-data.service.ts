import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../models/products.model";
import {PRODUCTS_ENDPOINT} from "../../constants/products.constants";

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  constructor(private http: HttpClient) { }

  getProducts$(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_ENDPOINT)
  }
}
