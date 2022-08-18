import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../models/product.model";
import {ProductsStateService} from "../../shared/store/products/products-state.service";
import {ProductModel} from "../../models/product-model.model";
import {COLUMNS_SCHEMA} from "../../constants/columns-schema.constants";
import {Column} from "../../models/column.model";
import {PageBusyStateService} from "../../shared/store/page-busy/page-busy-state.service";
import {MatDialog} from "@angular/material/dialog";
import {AddProductComponent} from "../add-product/add-product.component";
import {Router} from "@angular/router";
import {calcPriceSubTotal, calcTaxedPrice} from "../../utils/utils";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  readonly #subscriptions: Subscription = new Subscription();
  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.label);
  columnsSchema: Column[] = COLUMNS_SCHEMA;
  pageBusy: boolean = false;
  subTotal: number = 0;
  subTaxedTotal: number = 0;

  constructor( private productsStateService: ProductsStateService,
               private pageBusyStateService:PageBusyStateService,
               public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void{
  this.productsStateService.setProducts.emit();
  this.#subscriptions.add(
    this.productsStateService.products$.subscribe((products: ProductModel[]) => {
    const displayedProducts: Product[] = products.map((product: ProductModel)=>{
    return { 'id': product.id, 'Code': product.code, "Name": product.name,
      'Price (EUR)': product.basePrice,
      'Price + Tax (EUR)' : calcTaxedPrice(product.basePrice),
    }});
    if(products){
      this.subTotal = calcPriceSubTotal(products);
      this.subTaxedTotal = calcTaxedPrice(this.subTotal);
      this.dataSource = new MatTableDataSource(displayedProducts);
    }
    }));

  this.#subscriptions.add(
    this.pageBusyStateService.pageBusy$.subscribe(pageBusy=>{
      this.pageBusy = pageBusy;
    }));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe((result:ProductModel) => {
      this.addProduct(result)
    });
  }

  addProduct(product:ProductModel): void{
    if(product){
    this.productsStateService.addProduct.emit(product);
    setTimeout(()=>{
      this.productsStateService.setProducts.emit()
    },500 )
    }
  }

  editProduct(product:Product):void{
    let editProduct = {id:product.id, code: product.Code, name: product.Name, basePrice: product["Price (EUR)"]  }
    this.productsStateService.editProduct.emit(editProduct);
    setTimeout(()=>{
      this.productsStateService.setProducts.emit()
    },500 )
  }

  goToBill(): void{
    this.router.navigateByUrl('/bill', {state: {subTotal: this.subTotal, subTaxedTotal: this.subTaxedTotal}})
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }

}
