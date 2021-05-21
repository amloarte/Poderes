import { LoginService } from '../../../auth/_services/login.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';

@Component({
  selector: 'app-dropdawn-oficinas',
  templateUrl: './dropdawn-oficinas.component.html',
  styleUrls: ['./dropdawn-oficinas.component.scss']
})
export class DropdawnOficinasComponent implements OnInit {
  @Output()
  id_oficina: EventEmitter<number> = new EventEmitter<number>();

  idOficina: number;
  nombreOficina: string;
  oficinas: {};

  constructor(
    private usuarioService: LoginService,
    private serviceCatalogos: CatalogosService
  ) { }

  ngOnInit(): void {
    this.idOficina = this.usuarioService.usuario.id_oficina;
    this.getCatalogos('oficina', '0');
  }

  getCatalogos(nombre: string, filtro: string) {
    this.serviceCatalogos.getCatalogos(nombre, filtro)
      .then((resp: any) => {
        this.oficinas = resp;
        console.log(this.oficinas);
      });
  }
  enviarIdOficina(){
    this.id_oficina.emit(this.idOficina);
  }
}
