import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPassComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports: [
    
  ]
})
export class AuthModule { }
