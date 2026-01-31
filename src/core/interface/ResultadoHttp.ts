export interface ResultadoHttp<T> {
    data: T[];
    total: number;
    paginas: number;
    limite:number,
    pagina:number
}