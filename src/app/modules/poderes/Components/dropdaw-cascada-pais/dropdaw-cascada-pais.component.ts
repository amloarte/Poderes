import { LoginService } from './../../../auth/_services/login.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';

@Component({
  selector: 'app-dropdaw-cascada-pais',
  templateUrl: './dropdaw-cascada-pais.component.html',
  styleUrls: ['./dropdaw-cascada-pais.component.scss']
})
export class DropdawCascadaPaisComponent implements OnInit {

  @Output() pais = new EventEmitter();
  @Output() provincia = new EventEmitter();
  @Output() ciudad = new EventEmitter();

  selectPaises = '1';
  selectProvincia: string;
  selectCicudad: string;
  paises: {};
  provincias: {};
  ciudades: {};

  constructor(
    private serviceCatalogos: CatalogosService,
    private serviceUsuario: LoginService
  ) {}

  ngOnInit(): void {
    this.selectCascada('paises', '0');
    this.selectCascada('provincia', '1');
    // this.selectProvincias = this.serviceUsuario.usuario.pv_provincia.toString();
    // this.selectCicudad = this.serviceUsuario.usuario.ci_ciudad.toString();
   // this.selectCascada('ciudad', this.selectProvincias);
  }

  selectCascada(nombre: string, codigo: string) {

    this.serviceCatalogos.getCatalogos(nombre, codigo).then((resp: []) => {
      switch (nombre) {
        case 'paises':
          this.paises = resp;
          break;
        case 'provincia':
          this.provincias = resp;
          break;
        case 'ciudad':
          this.ciudades = resp;
          break;
      }
    });
  }



}
