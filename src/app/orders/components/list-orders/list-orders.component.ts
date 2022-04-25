import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {

  suscription: Subscription;

  public orders: any = [];

  public stores: any = [];

  public selectedOrder = {
    cliente:{
      nombre:'',
      celular:''
    },
    direccion:{
      nombre:''
    }
  }


  constructor( private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();

    this.getStores();

    /* this.suscription = this.orderService.refresh$.subscribe(() => {
      this.getOrders();
    }) */
  }

  /* ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('Observable cerrado');
    
  } */

  public getOrders(){
    this.orderService.getOrders()
      .subscribe(orders => {
        this.orders = orders;
        console.log(this.orders);
        
      });
  }

  public getStores(){
    this.orderService.getEmpresas()
      .subscribe(empresas => {
        empresas.forEach(e => {
          e.empresas.forEach(e2 => {
            this.stores.push(e2);
          });
        });
        console.log(this.stores)
      })
  }

  /* get detalles() {
    var order = this.orders.filter(e => {
      return e._id == $('#detalle').val();
    })
    return
  } */

  public details(order){
    this.selectedOrder = order;
  }

  public store(order){
    var img = this.stores.filter(e => {
      return e.nombre == order.empresa.nombre;
    });
    return img[0].logoEmpresa;
  }

}
