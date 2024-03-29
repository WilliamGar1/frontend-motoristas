import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private _refresh$ = new Subject<void>();

  private URL = "http://localhost:3300";

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  public getOrders(): Observable<any>{

    return this.http.get(this.URL + '/orders');
  }

  /* public getOrders(): Observable<any>{

    return this.http.get(this.URL + '/orders')
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  } */

  public getEmpresas(): Observable<any> {
    return this.http.get(this.URL + '/categorias/empresas');
  }

  public updateOrder( body : any, id: string):Observable<any> {

    return this.http.put(this.URL + `/orders/${id}/taken`, body);
  };

  public getOrder(id: string): Observable<any> {
    return this.http.get(this.URL + `/orders/${id}`);
  }

  public getProducts(name: string): Observable<any> {
    return this.http.get(this.URL + `/categorias/empresas/${name}/productos`);
  }

  public updateOrderState(body: any, id: string): Observable<any> {
    return this.http.put(this.URL + `/orders/${id}/update`, body);
  }

  public getHistory(id: String): Observable<any> {
    return this.http.get(this.URL + `/orders/${id}/driver`);
  }

}
