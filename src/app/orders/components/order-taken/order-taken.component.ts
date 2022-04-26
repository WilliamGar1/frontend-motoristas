import { ParseTreeResult } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order-interface';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-taken',
  templateUrl: './order-taken.component.html',
  styleUrls: ['./order-taken.component.css']
})
export class OrderTakenComponent implements OnInit {

  hora = Date.now()

  public order: Order;

  constructor(
    private route: Router,
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.getOrder();
  }

  public getOrder() {
    this.orderService.getOrder(this.orderTaken._id)
      .subscribe(data => {
        this.order = data;
        console.log(this.order);
      })
  }

  get orderTaken(){
    if (localStorage.getItem('order_id') == null){
      return {exist: false, _id: null};
    }else{
      return {exist: true, _id: localStorage.getItem('order_id')};
    }
  }

  public finishOrder(){
    localStorage.removeItem('order_id');
    this.route.navigate(['orders/list']);
  }

  get subTotal(){
    var valor: number = 0;

    this.order.productos.forEach(e =>{
      valor += e.cantidad * e.precio;
    });
    return valor
  }

  get total(){
    var valor: number = 0;

    valor = this.subTotal + this.order.precio_envio;

    return valor
  }

}
