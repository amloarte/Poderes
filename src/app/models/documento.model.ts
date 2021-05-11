import { Persona } from 'src/app/models/persona.models';
import { Poder } from "./poder.model";

export class Documento {
    id_documento: string;
    str_fechaRegistro: string;
    str_usuarioRegistro: string;
    str_ip: string;
    int_Oficina: number;
    lst_doc_alfresco: string[];
    tipo_documento: number;
    lst_personas: Persona[];
    lst_tipo_doc: Poder[];
}