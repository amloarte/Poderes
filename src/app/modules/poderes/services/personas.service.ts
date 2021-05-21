import { RespuestaTransaccion } from './../../../models/RespuestaTransaccion.models';
import { HttpParams, HttpClient } from '@angular/common/http';
import { URL_PODERES } from './../../../configs/config';
import { Persona } from './../../../models/persona.models';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  personas: Persona[] = [];
  dataChange: BehaviorSubject<Persona[]>;
  
  constructor(
    private http: HttpClient,
  ) { 
    this.dataChange = new BehaviorSubject<Persona[]>(this.personas);
  }

  get data(): Persona[] {
    this.dataChange = new BehaviorSubject<Persona[]>(this.personas);
    return this.dataChange.value;
  }

  async getInfoCliente(cedula: string) {

    const url = URL_PODERES +"?str_operacion=BUSCAR_CLIENTE";
    var objConsultCedula = {
      str_documento: cedula
    }
    return new Promise( (resolve, reject) => {

      this.http.post(url, objConsultCedula )

        .subscribe((resp: RespuestaTransaccion) => {
          if (resp.codigo === '000') {
            resolve(resp.cuerpo);
          } else {
            resolve(null);
          }

        }, reject);
    });
  }

  agregarPersona (persona: Persona): void {
    this.personas.push(persona);
  }

  eliminarPersona (index: number): void{
    this.personas.splice(index, 1);
    this.dataChange = new BehaviorSubject<Persona[]>(this.personas);
  } 

  registrarPersonas(): Promise<[]>{
    const url = URL_PODERES +"?str_operacion=AGREGAR_PERSONAS";
    var objRegistraPersonas = {
      lst_personas: this.personas
    }
    
    return new Promise( (resolve, reject) => {
      this.http.post(url, objRegistraPersonas )

        .subscribe((resp: RespuestaTransaccion) => {
          if (resp.codigo === '000') {
            resolve(resp.cuerpo);
          } else {
            resolve(null);
          }

        }, reject);
    });
  }
}
