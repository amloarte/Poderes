import { PersonasService } from './../../services/personas.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Persona } from './../../../../models/persona.models';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-persona',
  templateUrl: './agregar-persona.component.html',
  styleUrls: ['./agregar-persona.component.scss']
})
export class AgregarPersonaComponent implements OnInit {

  cedulaControForm = new FormControl( '', 
    [ 
      Validators.required, 
      Validators.maxLength(13),
      Validators.minLength(10)
    ]
  );

  formGroup: FormGroup;
  persona: Persona;
  mostrarForm: false;
  habilitarForm: false;

  constructor(
    private servicePersonas: PersonasService,
    public dialogRef: MatDialogRef<AgregarPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public tipoPersona: string,
  ) { }

  ngOnInit(): void { 
    // this.initForm();
  }

  buscarSocio(cedula: string) {
    this.servicePersonas.getInfoCliente(cedula.trim())
        .then((resp: Persona) => {

            if(resp){
              this.persona = resp[0];
              this.persona.str_tipo = this.tipoPersona;
            }else {
              this.persona = null;
              alert("No se encontro resultados..")
            }
        });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.servicePersonas.agregarPersona(this.persona);
    this.dialogRef.close();
  }
  
  // initForm() {
  //   this.formGroup = new FormGroup({
  //     cedula: new FormControl(null, Validators.required),
  //     nombres: new FormControl(null, Validators.required),
  //     correo: new FormControl(null,Validators.required),
  //     telefono: new FormControl(null, Validators.required),
  //     celular: new FormControl(null, Validators.required),
  //     direccion: new FormControl(null, Validators.required),
  //     domicilio: new FormControl(null, Validators.required),
  //   });
  // }
}
