import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AuctionComponent} from "./auction/auction.component";
import {RegisterComponent} from "./register/register.component";
import {CreateAuctionComponent} from "./create-auction/create-auction.component";

const routes: Routes = [
  {path:"createAuction", component: CreateAuctionComponent},
  {path:"register", component: RegisterComponent},
  {path:"auction", component: AuctionComponent},
  {path:"", component: MainComponent},
  {path:"**", component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
