import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  loginForm: FormGroup;
  error: string;


  constructor(private tokenService: TokenService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.isLog();
  }

  //corroborar si está logueado
  isLog() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  //Metodo para loguearse
  onLogin() {
    //llamamos al constructor de loginUsuario para instanciar un LoginUsuario
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe({
      next: (data) => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities); //aqui almacenamos en el navegador 
        this.roles = data.authorities; //aqui se lo seteamos a la variable roles

        this.router.navigate(['']);

      },
      error: (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.showError(err);
      }
    });
  }

  showError(err: any) {
    this.error = 'Usuario no autorizado';
  }

}
