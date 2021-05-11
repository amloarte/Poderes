export class Persona {

  constructor(
    str_nombres: string,
    str_documento: string,
    str_direccion: string,
    str_telefono: string,
    str_celular: string,
    str_correo: string,
    str_tipo: string,
  ) {

    this.str_nombres = str_nombres;
    this.str_documento = str_documento;
    this.str_direccion = str_direccion;
    this.str_telefono = str_telefono;
    this.str_celular = str_celular;
    this.str_correo = str_correo;
    this.str_tipo = str_tipo;
  }

  str_documento: string;
  str_nombres: string;
  str_direccion: string;
  str_telefono: string;
  str_celular: string;
  str_correo: string;
  str_tipo?: string;
}
