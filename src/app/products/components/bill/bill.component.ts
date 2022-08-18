import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductsStateService} from "../../shared/store/products/products-state.service";
import {ProductModel} from "../../models/product-model.model";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  readonly #subscriptions: Subscription = new Subscription();
  products!: ProductModel[];
  constructor(private router: Router, public activatedRoute: ActivatedRoute, private productsStateService: ProductsStateService) { }

  ngOnInit(): void {
    console.log(this.router.getCurrentNavigation()?.extras.state)
    this.productsStateService.setProducts.emit();
    this.#subscriptions.add(this.productsStateService.products$.subscribe((products: ProductModel[])=>{
      this.products = products
      console.log(this.products)
    }))
  }
  goToProducts():void{
    this.router.navigate(['/'])
  }
  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
