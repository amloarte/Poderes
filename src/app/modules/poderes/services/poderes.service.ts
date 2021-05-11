import { Injectable } from '@angular/core';
import { Documento } from 'src/app/models/documento.model';
import { Persona } from 'src/app/models/persona.models';
import { Poder } from '../../../models/poder.model';
import { Parametros } from '../../../models/parametros.models';

@Injectable({
  providedIn: 'root'
})
export class PoderesService {

  documento: Documento
  persona: Persona[];
  poder: Poder[];

  facultades: any = [];
  
  constructor() {
     //console.log(this.facultades);
  }

  facultadesConcedidas(){
  }

  registrarPoder(){
  }

}
