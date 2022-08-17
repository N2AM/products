import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {APP_PATH} from "./app.constants";

const routes: Routes = [
  { path: APP_PATH, loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
