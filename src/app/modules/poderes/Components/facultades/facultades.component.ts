import { Parametros } from '../../../../models/parametros.models';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PoderesService } from '../../services/poderes.service';

@Component({
  selector: 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrls: ['./facultades.component.scss']
})
export class FacultadesComponent implements OnInit {

  facultades: Parametros[] = [];
  displayedColumns: string[] = ['select', 'prm_nemonico'];
  dataSource = new MatTableDataSource<Parametros>();
  selection = new SelectionModel<Parametros>(true);
  contadorGeneral = 0;
  contadorFacultades = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private serviceCatalogos: CatalogosService,
    private servicePoderes: PoderesService 
  ) {}

  ngOnInit(): void {
    this.getFacultades();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getFacultades() {
    this.serviceCatalogos.getParametros('FACULTADES_PODERES').then((resp: Parametros[]) => {
      this.facultades = resp;
      this.dataSource.data =  this.facultades;
    });
  }

  obtenerfacultadesPoderes(){
    console.log(this.facultades);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    this.selection.selected.find( facul => {
      this.servicePoderes.facultades.push(facul.prm_id);
    });
    this.contadorFacultades = numSelected;
    this.contadorGeneral = numRows;
    return numSelected === numRows; 
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Parametros): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.prm_nemonico + 1}`;
  }
}
