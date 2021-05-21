import { LoginService } from './../../auth/_services/login.service';
import { RespuestaTransaccion } from '../../../models/RespuestaTransaccion.models';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { URL_PODERES } from '../../../configs/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(
    private http: HttpClient,
    private serviceUsuario: LoginService,
    private route: Router,
  ) { }

  async getCatalogos(nombre: string, filtro: string ) {

    let params = new HttpParams();
    params = params.set('str_operacion', "CONSULTAR_CATALOGOS");
    var objCatalogos = {
      str_nombre_catalogo: nombre,
      str_filtro: filtro
    } 

    return new Promise( (resolve, reject) => {

      this.http.post(URL_PODERES, objCatalogos, { params })

        .subscribe((resp: RespuestaTransaccion) => {
          console.log(resp.cuerpo);
          
          if (resp.codigo === '0') {
            resolve(resp.cuerpo);
          } else {
            resolve(null);
          }

        }, reject);
    });
  }


  getParametros(nombre: string, tipo_busqueda: string ) {

    let params = new HttpParams();
    params = params.set('str_operacion', "CONSULTA_PARAMETROS");

    var objParametros = {
      str_tipo_busqueda: tipo_busqueda,
      str_filtro: nombre
    } 

    return new Promise( (resolve, reject) => {
      this.http.post(URL_PODERES, objParametros, { params })
        .subscribe((resp: RespuestaTransaccion) => {
          if (resp.codigo === '0') {
            resolve(resp.cuerpo);
          } else {
            resolve(null);
          }
        }, reject);
    });
  }


  getUbicacionUsuario(int_id_oficina: number ) {
    const url = URL_PODERES + '/api/getUbicacionUsuario';

    let params = new HttpParams();
    params = params.set('int_id_oficina', int_id_oficina.toString());

    return new Promise( (resolve, reject) => {

      this.http.get(url, { params })

        .subscribe((resp: RespuestaTransaccion) => {

          if (resp.codigo === '0') {
            resolve(resp.cuerpo);
          } else {
            resolve(null);
          }

        }, reject);
    });
    // this.http.get(url, { params }).subscribe((resp: RespuestaTransaccion) => {

    //   if (resp.codigo === '0') {
    //     return resp.cuerpo;
    //   } else {
    //     return null;
    //   }

    // });


  }
}
