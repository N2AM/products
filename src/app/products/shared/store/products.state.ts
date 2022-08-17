import { Injectable, Injector } from '@angular/core';
import { Receiver } from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import {Product} from "../../models/products.model";
import {ProductsDataService} from "../services/products-data.service";

export const DEFAULT_PRODUCT_STATE: Product[] = [{
  code: '',
  name: '',
  basePrice: 0,
  totalPrice:0
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

  @Receiver({ type: '[products] set products' })
  public static setProducts(
    ctx: StateContext<Product[]>
  ): Observable<Product[]> {
    return this.productsDataService.getProducts$().pipe(
      tap((products: Product[]) => {
        ctx.setState(products);
      })
    );
  }
}
