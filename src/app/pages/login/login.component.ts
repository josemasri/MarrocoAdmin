import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email.length === 0 || this.password.length === 0) {
      Swal.fire(
        'Llena los campos',
        'Por favor ingresa todos los datos',
        'error'
      );
      return;
    }
    if (this.email === 'admin@test.com' || this.password === 'test') {
      this.router.navigate(['panel']);
    } else {
      Swal.fire(
        'Datos incorrectos',
        'El email/contraseña no son correctos',
        'error'
      );
      return;
    }
  }

}
