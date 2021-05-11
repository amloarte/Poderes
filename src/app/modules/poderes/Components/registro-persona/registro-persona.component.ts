import { Observable } from 'rxjs';
import { PersonasService } from './../../services/personas.service';
import { AgregarPersonaComponent } from './../../utils/agregar-persona/agregar-persona.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Persona } from 'src/app/models/persona.models';
import { MatDialog } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.scss']
})
export class RegistroPersonaComponent implements OnInit {
  @Input() tipoPersona : string;
  persona: Persona[];
  per$: Observable<Persona[]>;
  displayedColumns = ['str_documento', 'str_nombres', 'str_telefono', 'str_celular', 'str_correo', 'str_direccion', 'acciones'];
  dataSource = new MatTableDataSource<Persona>();
  selection = new SelectionModel<Persona>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private servicePersonas: PersonasService
  ) { 
    this.per$ = this.servicePersonas.dataChange.asObservable();
  }

  ngOnInit(): void {
  }
  addPersona(){
    const dialogRef = this.dialog.open(AgregarPersonaComponent, {
      width: '500px',
      data: this.tipoPersona
    }).afterClosed().subscribe(result => {
      this.cargarDataTable();
    });
  }

  ngAfterViewInit() {
    this.dataSource.data =  this.persona;
  }
  
  cargarDataTable(){
    
    let array = this.servicePersonas.personas.filter( (persona)=> {
      return persona.str_tipo == this.tipoPersona;
    })
    this.dataSource.data = array;
    console.log(this.servicePersonas.data);
  }

  eliminarPersona(index: number){

    this.servicePersonas.eliminarPersona(index);
    let array = this.servicePersonas.personas.filter( (persona)=> {
      return persona.str_tipo == this.tipoPersona;
    })
    this.dataSource.data = array;
    // this.dataSource._updateChangeSubscription();
    // this.cargarDataTable();
  }
}
