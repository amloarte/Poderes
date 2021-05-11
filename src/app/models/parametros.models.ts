export class Parametros {

  constructor(
    prm_id: number,
    prm_nombre: string,
    prm_nemonico: string,
    prm_valor_ini: string,

) {
    this.prm_id = prm_id;
    this.prm_nombre = prm_nombre;
    this.prm_nemonico = prm_nemonico;
    this.prm_valor_ini = prm_valor_ini;
}

prm_id: number;
prm_nombre?: string;
prm_nemonico?: string;
prm_valor_ini?: string;

}