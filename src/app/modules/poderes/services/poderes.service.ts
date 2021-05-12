import { Injectable } from '@angular/core';
import { Documento } from 'src/app/models/documento.model';
import { Persona } from 'src/app/models/persona.models';
import { Poder } from '../../../models/poder.model';
import { Parametros } from '../../../models/parametros.models';
import { HttpParams, HttpClient } from '@angular/common/http';
import { LoginService } from '../../auth/_services/login.service';
import { URL_PODERES, TERMINAL } from '../../../configs/config';
import { RespuestaTransaccion } from '../../../models/RespuestaTransaccion.models';
import { PersonasService } from './personas.service';
import { Respuesta } from '../../auth/_models/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class PoderesService {

  documento: Documento
  persona: Persona[];
  poder: Poder[];
  lista_codigos_alfresco: []
  facultades: any = [];
  
  constructor(
    private http: HttpClient,
    private serviceUsuario: LoginService,
    private servicePersonas: PersonasService
  ) {
  }

  registrarDocumentoAlfresco(bytes:string , extencion: string, objPoder:Poder ){

    let params = new HttpParams();
    params = params.set('str_operacion', "AGREGAR_DOCUMENTO_ALFRESCO");
    var objDocumetAlfresco = {
      int_ente: this.serviceUsuario.usuario.id_persona,
      int_tipo_identifica: "153",
      str_referencia: this.serviceUsuario.usuario.id_persona,
      int_oficina: this.serviceUsuario.usuario.id_oficina,
      int_perfil: this.serviceUsuario.usuario.id_perfil,
      str_nombre: "documento_poderes_"+ this.serviceUsuario.usuario.id_persona,
      str_observacion: "DOCUMENTOS LEGALES",
      str_doc_extencion: extencion,
      file_bytes: bytes,
      str_usuario: this.serviceUsuario.usuario.login,
      str_terminal: TERMINAL
    } 

    return new Promise( (resolve, reject) => {

      this.http.post(URL_PODERES, objDocumetAlfresco, { params })

        .subscribe((resp: RespuestaTransaccion) => {
          
          if (resp.codigo == '000') {
            //resolve(resp.cuerpo);
            let id_codigo: any = resp.cuerpo
            //var codigo_alfresco = id_codigo.str_id 
            //this.lista_codigos_alfresco = resp.cuerpo.str_id;
            objPoder.lst_doc_alfresco = id_codigo.str_id;

            console.log(objPoder.lst_doc_alfresco);
            this.agregarPersonas().then( (resp: []) => {
                objPoder.lst_personas = resp;
                console.log(objPoder.lst_personas);
                this.registrarPoder(objPoder).then( (resp: any) => {
                  console.log(resp);
                  resolve(resp);
                  this.servicePersonas.personas = null;
                });    
            });

          } else {
            resolve(null);
          }

        }, reject);
    });
  }


  agregarPersonas(){
    const url = URL_PODERES +"?str_operacion=AGREGAR_PERSONAS";
    // let params = new HttpParams();
    // params = params.set('str_operacion', "AGREGAR_DOCUMENTO_ALFRESCO");
    var objRegistraPersonas = {
      lst_personas: this.servicePersonas.personas
    }
    return new Promise( (resolve, reject) => {

      this.http.post(url, objRegistraPersonas)

        .subscribe((resp: RespuestaTransaccion) => {
          if (resp.codigo === '000') {
            resolve(resp.cuerpo);
          } else {
            resolve(null);
          }

        }, reject);
    });

  }

  
  registrarPoder( objetoPoder: Poder){
    console.log(objetoPoder);
    let params = new HttpParams();
    params = params.set('str_operacion', "AGREGAR_PODER");

    return new Promise( (resolve, reject) => {

      this.http.post(URL_PODERES, objetoPoder, { params })

        .subscribe((resp: RespuestaTransaccion) => {
          if (resp.codigo === '000') {
            resolve(resp.cuerpo);
          } else {
            resolve(null);
          }

        }, reject);
    });
  }

  // registrarPersonas(poder: Poder, base64: string, tipoArchivo: string): Promise<[]>{
  //   const url = URL_PODERES +"?str_operacion=AGREGAR_PERSONAS";
  //   var objRegistraPersonas = {
  //     lst_personas: this.servicePersonas.personas
  //   }
    
  //   return new Promise( (resolve, reject) => {
  //     this.http.post(url, objRegistraPersonas )

  //       .subscribe((resp: RespuestaTransaccion) => {
  //         if (resp.codigo === '000') {
                            
  //             resp.cuerpo = poder.lst_personas;

  //             this.registrarDocumentoAlfresco(base64, tipoArchivo).then( resp => {
                
  //               resp = poder.lst_doc_alfresco;
  //               this.registrarPoder(poder).then( (resp: RespuestaTransaccion) => {
  //                 if(resp.codigo === '000'){
  //                     resolve(resp.cuerpo)
  //                 }else {
  //                   resolve(null);
  //                 }
  //               });
  //             });
  //         } else {
  //           resolve(null);
  //         }

  //       }, reject);
  //   });
  // }



}
