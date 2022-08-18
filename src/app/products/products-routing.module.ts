import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {BillComponent} from "./components/bill/bill.component";

const routes: Routes = [{
  path:'', component: ProductsComponent, pathMatch:'full'
  },
  {
    path:'bill', component: BillComponent, pathMatch:'full'
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
