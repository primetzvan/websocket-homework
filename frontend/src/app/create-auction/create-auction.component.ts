import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../shared/backend.service";
import {IAuction} from "../shared/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {

  public formgroup: FormGroup;
  public isrunning: boolean = true;

  constructor(private readonly backend: BackendService, private readonly router: Router ) {
    this.formgroup = new FormGroup(
      {
        name: new FormControl("",[Validators.minLength(2), Validators.maxLength(50),Validators.required]),
        desc: new FormControl("",[Validators.minLength(10), Validators.maxLength(200),Validators.required]),
        startprice: new FormControl("",[Validators.min(0.5), Validators.max(5000),Validators.required])
      }
    )
  }

  ngOnInit(): void {
    this.backend.isrunning().subscribe(value => {
      this.isrunning = value;
    })
  }

  create() {
    let  auction: IAuction = {
      name: this.formgroup.controls['name'].value,
      desc: this.formgroup.controls['desc'].value,
      startprice: this.formgroup.controls['startprice'].value
    }
    this.backend.startAuction(auction).subscribe(val => {
      this.router.navigate([""]);
    });

  }
}
