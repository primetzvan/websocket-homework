import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAuction, IUser} from "./util";

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

  public auctionDetail(): Observable<IAuction>{
    return this.http.get<IAuction>(this.BASE_URL + "auctionDetail");
  }

  public startAuction(auction:IAuction){
    return this.http.post<IAuction>(this.BASE_URL, auction);
  }

  public getUsers():Observable<number>{
    return this.http.get<number>(this.BASE_URL + "users");
  }

}
