import { Component, OnInit } from '@angular/core';
import {NavParams,ModalController}from "@ionic/angular";
import{Anuncio }from '../crear-anuncio/anuncio.model';
import { PerrosPerdidosService } from '../../servicios/perros-perdidos.service';
@Component({
  selector: 'app-detalle-perdidod',
  templateUrl: './detalle-perdidod.component.html',
  styleUrls: ['./detalle-perdidod.component.scss'],
})
export class DetallePerdidodComponent implements OnInit {
public perro:Anuncio;


  constructor(private params:NavParams,private modal:ModalController,private perrosPerdidosServicio: PerrosPerdidosService) { }

  ngOnInit() {
    this.perro=this.params.get('perro');

  }
  closeDetalle(){
    this.modal.dismiss();
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
    return `${day}/${month}/${year}`;
  }

}
