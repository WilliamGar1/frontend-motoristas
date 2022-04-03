import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderTakenComponent } from './components/order-taken/order-taken.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'list', component: ListOrdersComponent},
      {path: 'history', component: OrderHistoryComponent},
      {path: 'taken', component: OrderTakenComponent},
      {path: '**', redirectTo: 'list'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
