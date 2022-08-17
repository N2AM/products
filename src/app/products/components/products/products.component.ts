import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../models/products.model";
import {HttpClient} from "@angular/common/http";
import {ProductsStateService} from "../../shared/store/products-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  readonly #subscriptions: Subscription = new Subscription();
  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = ['Code', 'Name', 'Price (EUR)', 'Price + Tax (EUR)'];

  constructor(private http: HttpClient, private productsStateService: ProductsStateService) { }

  ngOnInit(): void{
  this.productsStateService.setProducts.emit();
  this.#subscriptions.add(
    this.productsStateService.products$.subscribe((products: Product[]) => {
    const displayedProducts = products.map(product=>{
    return { ...product, 'totalPrice' : this.calcTotalPrice(product.basePrice)}});
    this.dataSource = new MatTableDataSource(displayedProducts);
    }));
  }

  calcTotalPrice(basePrice: number){
    return (basePrice+1)*.21;
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }

}
