export interface Paginador {
    content:          Content[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Content {
    id_detalle:   number;
    codigo:       number;
    rol:          null | string;
    mensaje:      string;
    prompts:      string;
    fecha:        Date;
    conversacion: Conversacion;
}

export interface Conversacion {
    id_conversacional: number;
    identificador:     string;
    sistema:           string;
    fecha:             Date;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageSize:   number;
    pageNumber: number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
