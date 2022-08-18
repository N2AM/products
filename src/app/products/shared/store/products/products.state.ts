import { Injectable, Injector } from '@angular/core';
import {EmitterAction, Receiver} from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import {Product} from "../../../models/product.model";
import {ProductsDataService} from "../../services/products-data.service";
import {ProductModel} from "../../../models/product-model.model";
import {ProductsActionType} from "./products.action.ts";

export const DEFAULT_PRODUCT_STATE: Product[] = [{
  id:0,
  Code: '',
  Name: '',
  'Price (EUR)': 0,
  'Price + Tax (EUR)': 0
}];

@State<Product[]>({
  name: 'ProductsState',
  defaults: DEFAULT_PRODUCT_STATE,
})
@Injectable()

export class ProductsState {
  private static productsDataService: ProductsDataService;
  constructor(injector: Injector) {
    ProductsState.productsDataService = injector.get(ProductsDataService);
  }

  @Selector()
  public static getProducts(state: Product[]): Product[] {
    return state;
  }

  @Receiver({ type:ProductsActionType.PRODUCT_STATE_SET })
  public static setProducts(
    ctx: StateContext<Product[]>
  ): Observable<Product[]> {
    return this.productsDataService.getProducts$().pipe(
      tap((products: Product[]) => {
        ctx.setState(products);
      })
    );
  }

  @Receiver({ type: ProductsActionType.PRODUCT_STATE_ADD })
  public static addProduct(
    ctx: StateContext<ProductModel>,
    { payload }: EmitterAction<ProductModel>
  ): Observable<Product> {
    return this.productsDataService.addProduct$(payload);
  }


  @Receiver({ type: ProductsActionType.PRODUCT_STATE_EDIT })
  public static editProduct(
      ctx: StateContext<ProductModel>,
      { payload }: EmitterAction<ProductModel>  ): Observable<Product> {
    return this.productsDataService.editProduct$(payload);
  }
}
