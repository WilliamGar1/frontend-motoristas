import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { esEmailValido } from '../../email.helper';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public datos = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.crearRegistroForm();
  }

  crearRegistroForm(): void{
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      passw: new FormControl("", Validators.required)
    })
  }

  public login() {
    var usuario = this.loginForm.value;

    this.datos = {
      correo: usuario.email,
      pass: usuario.passw
    };

    //console.log(JSON.stringify(this.datos));

    if(!this.emailValido){
      Swal.fire(
        'Error!',
        'Ingrese un email valido',
        'warning',
      );
    }else if(this.loginForm.valid){
      this.authService.postLogin(this.datos)
        .subscribe(data => {

          if(data.state !== 'Activo'){
            Swal.fire(
              'Error!',
              'Aún no has sido admitido',
              'warning',
            );
          }else if(data.acceso){
            localStorage.setItem('driver_id', data._id);
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            //console.log(data.usuario);
            this.router.navigate(['/orders/list']);
          }else{
            //console.log(data.acceso);
            Swal.fire(
              'Error!',
              '',
              'warning',
            );
          }
  
      }, err => {
        Swal.fire(
          'Error!',
          'Contraseña o correo incorrectos',
          'warning',
        );
      })
    }else{
      Swal.fire(
        'Error!',
        'Por favor completar todos los datos',
        'warning',
      );
    }
  }

  get emailValido(){
    return esEmailValido(this.loginForm.get('email').value)
  }

}
