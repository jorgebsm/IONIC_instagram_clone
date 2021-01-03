import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  token: string = null;
  
  constructor( private http: HttpClient,
               private storage: Storage ) { }

  login( email: string, password: string ) {
    const data = { email, password }

    return new Promise( resolve => {

      this.http.post(`${ API }/users/login/`, data).subscribe(
        res => {
           if( res['ok'] ) {
             this.saveToken( res['token'] );
             resolve(true);
           } else {
             this.token = null;
             this.storage.clear();
             resolve(false);
           }
        }
      );

    });

  }

  register( user: Usuario ) {

    return new Promise( resolve => {

      this.http.post(` ${ API }/users/create`, user).subscribe(
        res => {
          if( res['ok'] ) {
            this.saveToken( res['token'] );
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        }
      );

    });

  }

  async saveToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);
  }

}
