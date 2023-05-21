export interface Detalle {
    id_detalle?:   number;
    codigo?:       number;
    rol?:          null | string;
    mensaje?:      string;
    conversacion?: Conversacion;
    id_conversacion?: number;
    prompts?:      string;
    fecha?:        Date;
}

export interface Conversacion {
    id_conversacional?: number;
    identificador?:     string;
    sistema?:           string;
    fecha?:             Date;
    detalles?: Detalle[];
}
