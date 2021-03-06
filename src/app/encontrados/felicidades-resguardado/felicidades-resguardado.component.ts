import { AuthService } from './../../servicios/auth.service';
import { PerrosPerdidosService } from './../../servicios/perros-perdidos.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-felicidades-resguardado',
  templateUrl: './felicidades-resguardado.component.html',
  styleUrls: ['./felicidades-resguardado.component.scss'],
})
export class FelicidadesResguardadoComponent implements OnInit {
  usuarioActual;
  mensaje: any;
  perro: any;
  rescatador: any;

// tslint:disable-next-line: max-line-length
  constructor(private params: NavParams, private modal: ModalController, private perdidosService: PerrosPerdidosService, private authService: AuthService) { }

  ngOnInit() {
    this.usuarioActual = this.params.get('actualUser');
    this.mensaje = this.params.get('mensaje');

    this.getInfoRescatadorPerro();
  }

  closeDetalle() {
    this.modal.dismiss();
  }

  getInfoRescatadorPerro() {
    const rescatadorId = this.mensaje.rescatadorId;
    let rescatador = null;
    const perroId = this.mensaje.perroId;
    console.log('perroId', perroId);
    const perro = this.perdidosService.obtenerPerro(perroId);
    console.log('perro del modal', perro);
    this.perro = perro;
    this.authService.getUsers().subscribe(usuarios => {
      usuarios.forEach(user => {
        if (rescatadorId === user.key) {
          rescatador = user;
          console.log('rescatador del modal', rescatador);
          this.rescatador = rescatador;
        }
      });
    });
  }

  private formatoFecha(rawFecha: any) {
    let fecha = new Date(rawFecha);
    let month = String(fecha.getMonth() + 1);
    let day = String(fecha.getDate());
    const year = String(fecha.getFullYear());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    switch(month){
      case "01":month="Enero";break;
      case "02":month="Febrero";break;
      case "03":month="Marzo" ;break;
      case "04":month="Abril";break;
      case "05":month="Mayo";break;
      case "06":month="Junio";break;
      case "07":month="Julio";break;
      case "08":month="Agosto";break;
      case "09":month="Septiembre";break;
      case "10":month="Octubre";break;
      case "11":month="Noviembre";break;
      case "12":month="Diciembre";break;
    }
    return `${day}-${month}-${year}`;
  }

}
