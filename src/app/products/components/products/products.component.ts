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
               public dialog: MatDialog) { }

  ngOnInit(): void{
  this.productsStateService.setProducts.emit();
  this.#subscriptions.add(
    this.productsStateService.products$.subscribe((products: ProductModel[]) => {
    const displayedProducts: Product[] = products.map((product: ProductModel)=>{
    return { 'Code': product.code, "Name": product.name,
      'Price (EUR)': product.basePrice,
      'Price + Tax (EUR)' : this.calcTaxedPrice(product.basePrice),
    }});
      this.subTotal = this.calcPriceSubTotal(products);
      this.subTaxedTotal = this.calcTaxedPrice(this.subTotal);
      console.log(this.subTotal, this.subTaxedTotal)
      this.dataSource = new MatTableDataSource(displayedProducts);
    }));

  this.#subscriptions.add(
    this.pageBusyStateService.pageBusy$.subscribe(pageBusy=>{
      this.pageBusy = pageBusy;
    }));
  }

  calcTaxedPrice(basePrice: number): number{
    return (basePrice * 1.21);
  }

  calcPriceSubTotal(products : ProductModel[]): number{
    let sum = 0;
    products.forEach(elm=>{
      sum+= elm.basePrice;
    })
    return sum;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe((result:ProductModel) => {
      console.log(`Dialog result: ${result}`);
      this.addProduct(result)
    });
  }

  addProduct(product:ProductModel): void{
    if(product){
    this.productsStateService.addProduct.emit(product);
    setTimeout(()=>{
      this.productsStateService.setProducts.emit()
    },200 )
    }
  }

  editProduct(product:ProductModel):void{

  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }

}
