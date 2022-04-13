import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAuction} from "./util";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  BASE_URL = "http://localhost:8080/auction/"

  constructor(private readonly http: HttpClient) {

  }

  public isrunning(): Observable<boolean> {
    return this.http.get<boolean>(this.BASE_URL + "running");
  }

  public startAuction(auction: IAuction){
    return this.http.post<IAuction>(this.BASE_URL,auction);
  }

}
