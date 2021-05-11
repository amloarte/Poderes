import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CatalogosService } from '../services/catalogos.service';
import { Component, Input, OnInit } from '@angular/core';
import { PersonasService } from '../services/personas.service';
import { Poder } from '../../../models/poder.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  // @Input() oficina: number;
  // @Input() titular: [];
  // @Input() beneficiario: [];
  // @Input() facultades: [];
  // @Input() fechasPoderes: [];
  lst_personas = [];
  formaFacultades1: "conjunta";
  formaFacultades2: "Indistinta";
  fomularioRegistro: FormGroup;
  titular: 'titular';
  beneficiario: 'beneficiario';
  poder: Poder = {
      int_pais: 0,
      int_provincia: 0,
      str_ciudad: "",
      str_fechaOtorgamiento: "",
      str_fechaModificacion: "",
      str_fechaVencimiento: "",
      int_instancia: 0,
      str_instancia_descripcion: "",
      int_tipo: 0,
      int_estado: 0,
      lst_personas: [],
      lst_facultades: [],
      str_facultades_subsisten: "",
      int_formaFacultades: 0,
  }

  constructor(
    private formBuilder: FormBuilder,
    private serviceCatalogos: CatalogosService,
    private servicePersonas: PersonasService
  ) { }

  ngOnInit(): void {
    this.formularioRegistro();
  }

  formularioRegistro(): FormGroup {
    return this.fomularioRegistro = this.formBuilder.group({
      
    });
  }

  obtenerPais(e){
    console.log(e);
    
  }
  registrarPoder() {
      const lista_personas = this.servicePersonas.registrarPersonas().then( (resp:[]) => { return this.lst_personas = resp; });
      console.log(lista_personas);
  }

}
