import { RespuestaTransaccion } from './../../../models/RespuestaTransaccion.models';
import { URL_PODERES } from './../../../configs/config';
import { Observable, BehaviorSubject } from 'rxjs';
import { URL_SERVICIOS, ID_SISTEMA, TERMINAL } from '../../../configs/config';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../_models/usuario.model';
import { Login } from '../_models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario: Usuario;
  validacion: number;
  loginUser: Login;
  // public fields
  currentUser$: Observable<Usuario>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<Usuario>;
  
  constructor(
    private http: HttpClient,
    private route: Router
  )
  {
    this.cargarStorange();
    this.currentUserSubject = new BehaviorSubject<Usuario>(this.usuario);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }


  get currentUserValue(): Usuario {
    this.currentUserSubject = new BehaviorSubject<Usuario>(this.usuario);
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: Usuario) {
    this.currentUserSubject.next(user);
  }

  guardarStorange( usuario: Usuario): void {
    localStorage.clear();
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  cargarStorange(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  login( usuario: string, contrasenia: string ){

    this.loginUser = {
      login: usuario,
      password: contrasenia,
      id_sistema: ID_SISTEMA,
      terminal: TERMINAL
    };

    const url = URL_SERVICIOS + '/api/login/autentificar';

    return new Promise((resolve, reject) => {

      this.http.post(url, this.loginUser)

        .subscribe( ( respuesta: any) => {

          if (respuesta.T !== null){

            this.usuario = respuesta.T;
            this.currentUserSubject = new BehaviorSubject<Usuario>(respuesta.T);

            this.getUbicacionUsuario(this.usuario.id_perfil).then( (resp: any) => {
                this.usuario.pv_provincia = resp[0].pv_provincia
                this.usuario.ci_ciudad = resp[0].ci_ciudad
            });

            this.guardarStorange(this.usuario);

            if ( this.usuario.id_perfil === 0){

              resolve(respuesta);

            } else {

              this.validarHorario( this.usuario.id_perfil ).then((resp) => {

                if (resp) {

                  resolve(respuesta);

                } else {

                  localStorage.clear();
                  alert('Fuera de horario');

                }
              });
            }

          }else{

            resolve(respuesta);
            localStorage.clear();

          }
        }, reject);
      });
  }


  logOut( ): void{
    const usuarioId  = this.usuario.id_usuario;
    const url = URL_SERVICIOS + '/api/login/cerrar_session';
    const data = { id_usuario: usuarioId, id_sistema: ID_SISTEMA};

    this.http.post(url, data)
      .subscribe(resp => {
        localStorage.clear();
        this.route.navigate(['/login']);
      });
  }

  validarHorario(perfilID: number ): Promise<boolean> {

    const url = URL_SERVICIOS + '/api/login/verificar_horario';

    let params = new HttpParams();
    params = params.set('id_usuario', this.usuario.id_usuario.toString());
    params = params.set('id_sistema', ID_SISTEMA.toString());
    params = params.set('id_perfil', perfilID.toString());

    return new Promise( (resolve, reject) => {

      this.http.get(url, { params })

        .subscribe(resp => {

          if (resp === 0) {

            resolve(false);

          } else {

            resolve(true);

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
  }
}
