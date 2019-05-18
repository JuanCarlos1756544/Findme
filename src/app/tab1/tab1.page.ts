
import { PerrosPerdidosService } from '../servicios/perros-perdidos.service';
import { Component } from '@angular/core';
import { ActivationEnd } from '@angular/router';
import { DetallePerdidodComponent } from '../perdidos/detalle-perdidos/detalle-perdidod.component';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Encontrado } from '../perdidos/formulario-encontrado/encontrado.model';
import { strict } from 'assert';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectKm: any = 'all';
  filtro = false;
  listaPerros: any;
  listaLista = false;
  constructor(private perrosPerdidosServicio: PerrosPerdidosService, public modal:ModalController,private socialSharing: SocialSharing) {}

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.obtenerAnuncios();
  }

  obtenerAnuncios() {
    let filtroValue = this.selectKm;
    this.perrosPerdidosServicio.obtenerAnuncios(filtroValue).subscribe(datos => {
      console.log('Datos traidos del servicio', datos);
      this.perrosPerdidosServicio.todosPerrosPerdidos = datos;
      console.log(this.perrosPerdidosServicio.todosPerrosPerdidos);

      // segun el filtro
      this.listaPerros = this.perrosPerdidosServicio.todosPerrosPerdidos;
      console.log('MI LISTA DE PERROS', this.listaPerros);
      console.log('Ubicacion del primer perro', this.listaLista[0]);
    }, error => {
      console.log(error);
    }, () => {
      console.log('completado');
      this.listaLista = true;
    });
  }

  obtenerAnuncio(key: string) {
    const perro = this.perrosPerdidosServicio.obtenerAnuncio(key);
    console.log(perro);
  }

  private formatoFecha(fecha: Date) {
    let month = String(fecha.getMonth() + 1);
    let day = String(fecha.getDate());
    const year = String(fecha.getFullYear());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return `${day}/${month}/${year}`;
  }

  onFiltrar() {
    if(this.filtro === false) {
      this.filtro = true;
    }else{
      this.filtro = false;
    }
  }
  OpenDetalle(perro){
    this.modal.create({
      component:DetallePerdidodComponent,
      componentProps:{
        perro:perro
      }
  
    }).then((modal)=>modal.present())
  
  }

  updateLikes(anuncion:any,id:any){
    this.perrosPerdidosServicio.updateLikes(anuncion,id);
  }

  Compartir(){
    // Check if sharing via email is supported
this.socialSharing.canShareViaEmail().then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});

// Share via email
this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
  // Success!
}).catch(() => {
  // Error!
});
  }
}