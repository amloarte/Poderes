export class Poder {
    int_pais: number;
    int_provincia: number;
    int_ciudad: number;
    int_oficina: number;
    str_fechaOtorgamiento: string;
    str_fechaNotificacion: string;
    str_fechaVencimiento: string;
    int_instancia: number;
    str_descripcion_instancia: string;
    int_tipo: number;
    str_estado: string;
    lst_personas: [];
    lst_facultades:[];
    str_facultades_subsisten: string;
    lst_doc_alfresco: string;
    int_formaFacultades: number;
    revocatoria?: any;
}