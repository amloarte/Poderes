import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-fechas-poderes',
  templateUrl: './fechas-poderes.component.html',
  styleUrls: ['./fechas-poderes.component.scss']
})
export class FechasPoderesComponent implements OnInit {

  @Output()
  fechasSeleccionadas: EventEmitter<object> = new EventEmitter<object>();
  fechaOtorgamiento = new Date
  fechaVencimiento: Date;
  fechaNotificacion: Date;

  controlFechaOtorg = new FormControl(new Date(), Validators.required);
  controlFechaVenc  = new FormControl('', Validators.required);
  controlFechaNotif = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {}
  

  enviarFechas(){

    var fechas = {
      fecha_otorgamiento: moment(this.controlFechaOtorg.value).format('L'),
      fecha_vencimiento: moment(this.controlFechaVenc.value).format('L'),
      fecha_notificacion: moment(this.controlFechaNotif.value).format('L')
    }
    this.fechasSeleccionadas.emit(fechas);
  }
}
