import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductsStateService} from "../../shared/store/products/products-state.service";
import {ProductModel} from "../../models/product-model.model";
import {calcPriceSubTotal, calcTaxedPrice} from "../../utils/utils";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  subTaxedTotal!:number;
  subTotal!:number;

  readonly #subscriptions: Subscription = new Subscription();
  products!: ProductModel[];
  constructor(private router: Router, public activatedRoute: ActivatedRoute,
              private productsStateService: ProductsStateService) {
  }

  ngOnInit(): void {
    this.productsStateService.setProducts.emit();
    this.#subscriptions.add(this.productsStateService.products$.subscribe((products: ProductModel[])=>{
      this.products = products
      this.subTotal = calcPriceSubTotal(products);
      this.subTaxedTotal = calcTaxedPrice(this.subTotal) ;
    }))
  }
  goToProducts():void{
    this.router.navigate(['/'])
  }
  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
