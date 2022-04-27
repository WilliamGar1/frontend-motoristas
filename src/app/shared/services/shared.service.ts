import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { Driver } from '../models/driver-interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private URL = "http://localhost:3300";

  constructor(
    private http: HttpClient
  ) { }

  public getDriver(id: string): Observable<any> {
    return this.http.get(this.URL + `/motoristas/${id}`);
  }
}
