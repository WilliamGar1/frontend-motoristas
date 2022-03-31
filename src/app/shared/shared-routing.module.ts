import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  
  ];

@NgModule({
    declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutes { }