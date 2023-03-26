import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImgPerfilService {
  url: string = "";
  URL = environment.basePath+'images/';

constructor(private http: HttpClient, private storage: Storage) { }

public uploadImage($event: any) {
  
}

public savePhoto(obj: FormData){
  return this.http.post(this.URL+'img', obj);
}


}



