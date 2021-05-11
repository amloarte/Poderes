export class Funcionalidades {

  constructor(
      id: number,
      id_sistema: number,
      fun_fk_padre: number,
      nombre: string,
      tipo: number,
      url: string,
      descripcion: string,
      submenu: [],
  ) {

      this.id = id;
      this.id_sistema = id_sistema;
      this.fun_fk_padre = fun_fk_padre;
      this.nombre = nombre;
      this.tipo = tipo;
      this.url = url;
      this.descripcion = descripcion;
      this.submenu = submenu;
  }

  id: number;
  id_sistema?: number;
  fun_fk_padre: number;
  nombre: string;
  tipo: number;
  url: string;
  descripcion?: string;
  submenu?: [];
}