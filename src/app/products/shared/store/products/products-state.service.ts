import { Injectable } from '@angular/core';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {ProductsState} from "./products.state";
import {ProductModel} from "../../../models/product-model.model";

@Injectable({  providedIn: 'root'
})
export class ProductsStateService {
  @Select(ProductsState.getProducts) readonly products$!: Observable<ProductModel[]>;

  @Emitter(ProductsState.setProducts) readonly setProducts!: Emittable;
  @Emitter(ProductsState.addProduct) readonly addProduct!: Emittable<ProductModel>;
  @Emitter(ProductsState.editProduct) readonly editProduct!: Emittable<ProductModel>;
}
