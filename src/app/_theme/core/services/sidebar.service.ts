import { LoginService } from './../../../modules/auth/_services/login.service';
import { Usuario } from './../../../modules/auth/_models/usuario.model';
import { filter } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ID_SISTEMA, URL_SERVICIOS } from '../../../configs/config';
import { Injectable } from '@angular/core';
import { Funcionalidades } from 'src/app/models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  funcionalidadesPadre: Funcionalidades [] = [];
  usuario: Usuario;

  constructor(
    private http: HttpClient,
    private usuarioService: LoginService,
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  get_funcionalidadesPadre( perfilID: number): Promise<Funcionalidades[]> {

    let params = new HttpParams();
    params = params.set('id_perfil', perfilID.toString());
    params = params.set('id_sistema', ID_SISTEMA.toString());
    const url = URL_SERVICIOS + '/api/funcionalidades/get_menu_principal';
    return new Promise((resolve, reject) => {
      this.http.get(url, { params })
        // tslint:disable-next-line: deprecation
        .subscribe((resp: any) => {

          this.funcionalidadesPadre = resp;
          // tslint:disable-next-line: variable-name
          this.funcionalidadesPadre.map(( funcionalidad_padre: any) => {

            const array = funcionalidad_padre.submenu = [];

            this.get_funcionalidades_hijas(funcionalidad_padre.id, perfilID)
              // tslint:disable-next-line: variable-name
              .then((funcionalidades_hijas: any) => {

                // tslint:disable-next-line: variable-name
                funcionalidades_hijas.map(((sub_menus: any) => {

                  // tslint:disable-next-line: triple-equals
                  if (funcionalidad_padre.id == sub_menus.fun_fk_padre) {
                    array.push(sub_menus);
                  }

                }));
              });
          });
          resolve(this.funcionalidadesPadre);
        }, reject);
    });
  }

  get_funcionalidades_hijas( funPadreID: number, perfilID: number): Promise<void>{

    let params = new HttpParams();
    params = params.set('id_fun_padre', funPadreID.toString());
    params = params.set('id_perfil', perfilID.toString());

    const url = URL_SERVICIOS + '/api/funcionalidades/get_hijas';

    return new Promise((resolve, reject) => {
      this.http.get(url, { params })
        .pipe(filter((resp: any) => resp.length !== 0 ))
          .subscribe(resp => {
            resolve(resp);
          }, reject);
    });
  }
}
