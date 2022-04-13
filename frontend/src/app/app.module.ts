import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuctionComponent } from './auction/auction.component';
import { RegisterComponent } from './register/register.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import {HttpClientModule} from "@angular/common/http";
import { MainComponent } from './main/main.component';
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {DataService} from "./shared/data.service";

@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent,
    RegisterComponent,
    CreateAuctionComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
