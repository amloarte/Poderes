export class Poder {
    int_pais: number;
    int_provincia: number;
    str_ciudad: string;
    str_fechaOtorgamiento: string;
    str_fechaModificacion: string;
    str_fechaVencimiento: string;
    int_instancia: number;
    str_instancia_descripcion: string;
    int_tipo: number;
    int_estado: number;
    lst_personas: [];
    lst_facultades:number[];
    str_facultades_subsisten: string;
    int_formaFacultades: number;
    revocatoria?: any;
}