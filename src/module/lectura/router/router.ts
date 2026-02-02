import type { RouterI } from "../../../core/interface/router";
import { ListarLecturasPage } from "../page/ListarLecturaPage";
import { RealizarLecturaPage } from "../page/RealizarLecturaPage";

export const lecturaRouter: RouterI[] = [
    {
        element:ListarLecturasPage,
        path:'/lectura/listar'

    },
      {
        element:RealizarLecturaPage,
        path:'/lectura/realizar'

    }
];