import type { RouterI } from "../../../core/interface/router";
import { CrearMedidorPage } from "../../medidor/page/CrearMedidorPage";
import { ListarTarifaPage } from "../page/ListarTarifaPage";

export const tarifaRouter: RouterI[] = [
    {
        path: '/tarifa/crear',
        element: CrearMedidorPage
    },
    {
        path: '/tarifa/listar',
        element: ListarTarifaPage
    }
];