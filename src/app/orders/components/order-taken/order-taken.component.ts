import { ParseTreeResult } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Order, Producto } from '../../models/order-interface';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-taken',
  templateUrl: './order-taken.component.html',
  styleUrls: ['./order-taken.component.css']
})
export class OrderTakenComponent implements OnInit {

  public stateForm: FormGroup;

  public order: Order;
  public products: any = [];

  public imgURL = 'http://localhost:3300/images/'

  constructor(
    private route: Router,
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.getOrder();
    this.crearRegistroForm();
  }

  crearRegistroForm(): void{
    this.stateForm = new FormGroup({
      state: new FormControl(false)
    })
  }

  public getOrder() {
    if(this.orderTaken._id !== null){

      this.orderService.getOrder(this.orderTaken._id)
        .subscribe(data => {
          this.order = data;
  
          this.getProducts(this.order.empresa.nombre);
        });
    }
  }

  get orderTaken(){
    if (localStorage.getItem('order_id') == null){
      return {exist: false, _id: null};
    }else{
      return {exist: true, _id: localStorage.getItem('order_id')};
    }
  }

  public updateOrder(){
    var datos = {estado: this.stateForm.get('state').value};
    var id = localStorage.getItem('order_id');

    this.orderService.updateOrderState(datos, id)
      .subscribe(data => {

        if(data.update){
          Swal.fire(
            'Estado: En ' + datos.estado,
            '' + data.msg,
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
    
  }

  public finishOrder(){
    var datos = {estado: 'finalizada'};
    var id = localStorage.getItem('order_id');

    this.orderService.updateOrderState(datos, id)
      .subscribe(data => {

        if(data.update){
          Swal.fire(
            'Orden ' + datos.estado,
            '' + data.msg,
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

  public getProducts(name: string){
    this.orderService.getProducts(name)
      .subscribe(data => {
        this.products = data;
        localStorage.setItem('product_img', JSON.stringify(this.products))
      });
  }

  public getImg(_id){
    var imgs = JSON.parse(localStorage.getItem('product_img')!);

    var img;

    imgs.forEach(p => {

      if(p._id == _id){
        img = p.imagenProducto
      }
      
    });

    return img;
  }
}
