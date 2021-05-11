import { CatalogosService } from '../../services/catalogos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instancia-otorgamiento',
  templateUrl: './instancia-otorgamiento.component.html',
  styleUrls: ['./instancia-otorgamiento.component.scss']
})
export class InstanciaOtorgamientoComponent implements OnInit {

  instituciones: [] = [];
  selectInstancia: number;

  constructor(
    private serviceCatalogos: CatalogosService
  ) { }

  ngOnInit(): void {
    this.getParametros('INSTANCIA_OTORGAMIENTO');
  }

  getParametros(nombre: string) {
    this.serviceCatalogos.getParametros(nombre)
      .then((resp: []) => {
        this.instituciones = resp;
    });
  }

}
