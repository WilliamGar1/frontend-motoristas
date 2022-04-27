import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { OrderTakenComponent } from './components/order-taken/order-taken.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListOrdersComponent,
    OrderHistoryComponent,
    OrderTakenComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class OrdersModule { }
