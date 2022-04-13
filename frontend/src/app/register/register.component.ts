import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../shared/backend.service";
import {Router} from "@angular/router";
import {IAuction, IUser} from "../shared/util";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formgroup: FormGroup;
  public isrunning: boolean = true;

  constructor(private readonly backend: BackendService, private readonly router: Router, private data: DataService) {
    this.formgroup = new FormGroup(
      {
        name: new FormControl("",[Validators.minLength(2), Validators.maxLength(50),Validators.required]),
        spendingLimit: new FormControl("",[Validators.min(0.5), Validators.max(5000),Validators.required])
      }
    )
  }

  ngOnInit(): void {
    this.backend.isrunning().subscribe(value => {
      this.isrunning = value;
    })
  }

  create() {
    let  user: IUser = {
      username: this.formgroup.controls['name'].value,
      spendinglimit: this.formgroup.controls['spendingLimit'].value
    }
    this.data.user = user;
    this.router.navigate(["auction"]);
  }

}
