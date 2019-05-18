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
    return `${day}/${month}/${year}`;
  }

}
