import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from "@angular/common";
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environments/environment";
import {NgxsEmitPluginModule} from "@ngxs-labs/emitter";
import {HttpClientModule} from "@angular/common/http";
import { AddProductComponent } from './products/components/add-product/add-product.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }), NgxsEmitPluginModule.forRoot(), ReactiveFormsModule, MatInputModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/products/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
