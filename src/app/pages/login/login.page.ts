import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    email: 'jorge@gmail.com',
    password: '12345'
  };

  registerUser: Usuario = {
    email: 'test@gmail.com',
    password: '12345',
    name: 'Test',
    avatar: 'av-1.png'
  }

  constructor(
    private usersService: UsersService,
    private navCtrl: NavController,
    private UiService: UiServiceService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.slides.lockSwipes( true );
  }

  async login( fLogin: NgForm ) {
    if ( fLogin.invalid ) { return; }
    const valido = await this.usersService.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
      //navegar a tabs
      this.navCtrl.navigateRoot( '/posts', { animated: true } );

    } else {
      //mostrar datos incorrectos
      this.UiService.alertaInformativa('Usuario o contraseña incorrecta');
    }

  }

  async registro( fRegistro: NgForm ) {
    if ( fRegistro.invalid ) { return; }

    const valido = await this.usersService.register( this.registerUser );

    if ( valido ) {
      //navegar a tabs
      this.navCtrl.navigateRoot( '/posts', { animated: true } );

    } else {
      //mostrar datos incorrectos
      this.UiService.alertaInformativa('El email ya está en uso');
    }

  }
  
  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
