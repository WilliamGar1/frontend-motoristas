import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import Swal from 'sweetalert2';

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
    _id: '',
    cliente:{
      nombre:'',
      celular:''
    },
    direccion:{
      referencia:''
    }
  }

  private datos = {};

  constructor(
    private orderService: OrdersService,
    private router: Router
    ) { }

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

  public takeOrder(order_id){
    if (localStorage.getItem('order_id') == null){
      localStorage.setItem('order_id', order_id);

      this.datos = {
        _id: localStorage.getItem('driver_id'),
        estado: 'tomada'
      }

      this.orderService.updateOrder(this.datos, order_id)
        .subscribe(data =>{
          if(data.update){
            Swal.fire(
              '' + data.msg,
              '',
              'success',
            );
          }else{
            Swal.fire(
              '' + data.msg,
              '',
              'info',
            );
          }
        })

      this.router.navigate(['/orders/taken']);
    }else{
      Swal.fire(
        'ERROR!',
        'Ya existe una orden en progreso',
        'warning',
      );
    }
  }

}
