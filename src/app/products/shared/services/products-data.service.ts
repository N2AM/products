import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../models/product.model";
import {PRODUCTS_ENDPOINT} from "../../constants/products.constants";
import {ProductModel} from "../../models/product-model.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  constructor(private http: HttpClient) { }

  getProducts$(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_ENDPOINT)
  }

  addProduct$(product: ProductModel){
    return this.http.post<Product>(PRODUCTS_ENDPOINT, product );
  }

  editProduct$(product: ProductModel){
    return this.http.put<Product>(PRODUCTS_ENDPOINT+'/'+ product.id, product );
  }
}
