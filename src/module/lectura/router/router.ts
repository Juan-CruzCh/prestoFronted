import type { RouterI } from "../../../core/interface/router";
import { ListarLecturasPage } from "../page/ListarLecturaPage";

export const lecturaRouter: RouterI[] = [
    {
        element:ListarLecturasPage,
        path:'/lectura/listar'

    }
];