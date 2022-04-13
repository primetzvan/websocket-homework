import { Injectable } from '@angular/core';
import {IUser} from "./util";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: IUser | null = null;

  constructor() { }
}
