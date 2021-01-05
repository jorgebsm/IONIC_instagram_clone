import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario: Usuario = {};

  constructor(
    private userService: UsersService,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {

    this.usuario = this.userService.getUsuario();    

  }

  async actualizar( fActualizar: NgForm ) {

    if ( fActualizar.invalid ) { return; }

    const actualizado = await this.userService.actualizarUsuario( this.usuario )    

    if ( actualizado ) {      
      //toast actualizado
      this.uiService.presentToast('Se ha actualizado correctamente');
    } else {
      //toast error
      this.uiService.presentToast('No se ha podido actualizar');
    }

  }

  logout() {

  }

}
