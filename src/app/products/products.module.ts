import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import {MatTableModule} from '@angular/material/table';
import { BillComponent } from './components/bill/bill.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {ProductsState} from "./shared/store/products.state";


@NgModule({
  declarations: [
    ProductsComponent,
    BillComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    NgxsModule.forFeature([ProductsState]),
    MatTableModule
  ]
})
export class ProductsModule { }
