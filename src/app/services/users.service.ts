import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  token: string = null;
  private usuario: Usuario = {};
  
  constructor( private http: HttpClient,
               private storage: Storage,
               private navCtrl: NavController ) { }

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

  actualizarUsuario( usuario: Usuario ) {    

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise( resolve => {

      this.http.post(`${ API }/users/update`, usuario, { headers } ).subscribe(
        res => {
  
          if ( res['ok'] ) {
            this.saveToken( res['token'] );
            resolve(true);
          } else {
            resolve(false);
          }
          
        }
      );

    });

  }

  getUsuario() {    

    if ( !this.usuario._id ) {      
      this.validaToken();
    }

    return { ...this.usuario };

  }

  async saveToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async cargarToken() {

    this.token = await this.storage.get('token') || null;    

  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if ( !this.token ) {      
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${ API }/users/`, { headers })
        .subscribe( res => {

          if ( res['ok'] ) {
            this.usuario = res['usuario'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

        });


    });

  }

}
