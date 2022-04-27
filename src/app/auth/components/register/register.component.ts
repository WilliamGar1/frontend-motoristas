import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isValidEmail } from '../../email.helper';
import { isValidPass, passwordMatchValidator } from '../../passw.helper';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  private driver = {}

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.crearregisterForm();
  }

  public crearregisterForm(): void{
    this.registerForm = new FormGroup({
      name: new FormControl("", Validators.required),
      dni: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      passw: new FormControl("", Validators.required),
      cell: new FormControl("", Validators.required),
      birth: new FormControl("", Validators.required),
      passw2: new FormControl("", Validators.required),
      termino: new FormControl(false, Validators.requiredTrue),
      placa: new FormControl("", Validators.required)
    }, passwordMatchValidator)
  }

  public postRegister(): void {

    var user = this.registerForm.value;

    this.driver = {
      name: user.name,
      dni: user.dni,
      email: user.email,
      passw: user.passw,
      cell: user.cell,
      birth: user.birth,
      placa: user.placa,
      state: 'Sin Admitir'
    };

    console.log(this.driver);

    if (this.registerForm.valid && this.emailValido && this.contraValida) {

      this.authService.postRegister(this.driver)
        .subscribe(result => {
  
          if(result.save){

            //console.log(result.mensaje);
            Swal.fire({
              title: 'Solicitud Enviada',
              text: "Un administrador estará revisando su registro.",
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/auth/login'])
              }
            });

          }else{
            console.log(result.msg);
            this.router.navigate(['/auth/register']);
            Swal.fire(
              'Error!',
              result.msg,
              'warning',
            );
          }
      
    
        }, err => console.log(err));
      }else{
        Swal.fire(
          'Error!',
          'Por favor completar el registro con todo los datos',
          'warning',
        );
      }
  }

  get passw2ConfirmIsValid() {
    return this.registerForm.get('passw2').valid;
  }

  get PasswIsValid() {
    return this.registerForm.get('passw').valid;
  }

  get emailValido(){
    return isValidEmail(this.registerForm.get('email').value);
  }

  get contraValida(){
    return isValidPass(this.registerForm.get('passw').value);
  }

}
