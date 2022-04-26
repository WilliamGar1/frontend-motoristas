import { ParseTreeResult } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-taken',
  templateUrl: './order-taken.component.html',
  styleUrls: ['./order-taken.component.css']
})
export class OrderTakenComponent implements OnInit {

  hora = Date.now()
  total: number = 250.56

  constructor() { }

  ngOnInit(): void {
  }

  get orderTaken(){
    if (localStorage.getItem('order_id') == null){
      return true;
    }else{
      return false;
    }
  }

}
