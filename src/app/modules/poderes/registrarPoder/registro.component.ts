import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CatalogosService } from '../services/catalogos.service';
import { Component, Input, OnInit } from '@angular/core';
import { PersonasService } from '../services/personas.service';
import { Poder } from '../../../models/poder.model';
import { PoderesService } from '../services/poderes.service';

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
  instituciones: [] = [];
  lst_codigo_alfresco = [];
  selectInstancia: number;
  base64: string;
  tipoArchivo: string;

  poder: Poder = {
    int_pais: 0,
    int_provincia: 0,
    int_ciudad: 0,
    int_oficina: 0,
    str_fechaOtorgamiento: "",
    str_fechaNotificacion: "",
    str_fechaVencimiento: "",
    int_instancia: 0,
    str_descripcion_instancia: "",
    int_tipo: 0,
    str_estado: "PENDIENTE",
    lst_personas: [],
    lst_facultades: [],
    str_facultades_subsisten: "",
    int_formaFacultades: 0,
    lst_doc_alfresco: ""
  }

  constructor(
    private formBuilder: FormBuilder,
    private serviceCatalogos: CatalogosService,
    private servicePoderes: PoderesService,
    private servicePersonas: PersonasService
  ) { }

  ngOnInit(): void {
    this.formularioRegistro();
    this.getParametros('INSTANCIA_OTORGAMIENTO', 'prm_nombre');
  }

  getParametros(nombre: string, tipo_busqueda: string) {
    this.serviceCatalogos.getParametros(nombre, tipo_busqueda)
      .then((resp: []) => {
        this.instituciones = resp;
    });
  }

  formularioRegistro(): FormGroup {
    return this.fomularioRegistro = this.formBuilder.group({});
  }
  recibirID(event: any) {

    this.poder.int_pais = event.pais
    this.poder.int_provincia = event.provincia
    this.poder.int_ciudad = event.ciudad
  }
  recibirOficinaId(event: number) {
    this.poder.int_oficina = event;
  }

  valorFormaFacultad( event){
  }

  recibirFechas(event: any){
    this.poder.str_fechaNotificacion = event.fecha_notificacion;
    this.poder.str_fechaOtorgamiento = event.fecha_otorgamiento;
    this.poder.str_fechaVencimiento = event.fecha_vencimiento;
  }

  enviarDocumento(event){
    this.base64 = event.base64;
    this.tipoArchivo = event.extension;
  }
  
  registrarPoder() {
   
    var array = this.servicePoderes.facultades
    const dataArr = new Set(array);
    let result: any = [...dataArr];
    this.poder.lst_facultades = result;
    var tipo = this.instituciones.length === this.poder.lst_facultades.length ? 1 : 0;
    this.poder.int_tipo = tipo
    
    
    this.servicePoderes.registrarDocumentoAlfresco( this.base64, this.tipoArchivo, this.poder,)
      .then((resp) => {
        if (resp) {
          alert("REGISTRADO CORRECTAMENTE");
        } else {
          alert("ERROR AL REGISTRAR PODER");
        }
      })
  
    
    // this.servicePoderes.registrarPoder(this.poder)
    //     .then( (resp)=>{
    //         if(resp){
    //           alert("REGISTRADO CORRECTAMENTE");
    //         }else {
    //           alert("Error el registrar");
    //         }
    //     })

    

    
    // console.log(this.poder);
    
  }

}
