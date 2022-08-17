import { Injectable } from '@angular/core';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {Product} from "../../models/products.model";
import {ProductsState} from "./products.state";

@Injectable({  providedIn: 'root'
})
export class ProductsStateService {
  @Select(ProductsState.getProducts) readonly products$!: Observable<Product[]>;

  @Emitter(ProductsState.setProducts) readonly setProducts!: Emittable;
}
