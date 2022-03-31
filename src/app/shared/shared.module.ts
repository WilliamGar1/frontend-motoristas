import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { SharedRoutes } from './shared-routing.module';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    SharedRoutes
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LandingComponent
  ]
})
export class SharedModule { }
