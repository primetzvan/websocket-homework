import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/data.service";
import {BackendService} from "../shared/backend.service";
import {IAuction} from "../shared/util";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {

  public auction: IAuction | null = null;
  public users: number = 0;

  constructor(private data: DataService, private readonly backend: BackendService) {
  }

  ngOnInit(): void {
    this.backend.auctionDetail().subscribe(val => {
      this.auction = val;
    })
    this.backend.getUsers().subscribe(val => {
      this.users = val;
    })
  }

  bid() {

  }
}
