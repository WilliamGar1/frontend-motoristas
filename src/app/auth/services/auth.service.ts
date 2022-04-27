import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://localhost:3300";

  constructor(private http: HttpClient) { }

  public postLogin(body): Observable<any>{
    return this.http.post(this.URL + '/motoristas/login', body);
  }

  public postRegister(body): Observable<any>{
    return this.http.post(this.URL + '/motoristas/nuevo', body);
  }
}
