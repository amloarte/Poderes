import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fechas-poderes',
  templateUrl: './fechas-poderes.component.html',
  styleUrls: ['./fechas-poderes.component.scss']
})
export class FechasPoderesComponent implements OnInit {

  fechaOtorgamiento = new Date
  fechaVencimiento: Date;
  fechaNotificacion: Date;

  controlFechaOtorg = new FormControl(new Date(), Validators.required);
  controlFechaVenc  = new FormControl('', Validators.required);
  controlFechaNotif = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {}
  
}
