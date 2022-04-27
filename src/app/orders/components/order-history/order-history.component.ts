import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  public history = [];

  constructor(
    private orderService: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHistory();
  }

  public getHistory() {
    let id = localStorage.getItem('driver_id');
    this.orderService.getHistory(id)
      .subscribe(data => {
        data.forEach(o => {
          if(o.estado == 'finalizada'){
            this.history.push(o);
          }
        });
      });
  }

  get order(){

    return
  }

}
