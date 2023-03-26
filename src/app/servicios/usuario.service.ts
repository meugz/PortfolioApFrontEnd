import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private tokenService:TokenService) { }

  isLogged():boolean{
    return this.tokenService.getToken() !=null;
  }

}
