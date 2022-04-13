import { Component, OnInit } from '@angular/core';
import {BackendService} from "../shared/backend.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isrunning: boolean = true;

  constructor(private readonly backend: BackendService) { }

  ngOnInit(): void {
    this.backend.isrunning().subscribe(value =>{
      this.isrunning = value;
    })
  }
}
