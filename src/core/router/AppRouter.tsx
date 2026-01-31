import { BrowserRouter, Route, Router, Routes } from "react-router";
import type { RouterI } from "../interface/router"
import { tarifaRouter } from "../../module/tarifa/router/router";
import { clienteRouter } from "../../module/cliente/router/router";
import { medidorRouter } from "../../module/medidor/router/router";
import { gastoRouter } from "../../module/gasto/router/router";
import { lecturaRouter } from "../../module/lectura/router/router";
import { pagoRouter } from "../../module/pago/router/router";
import { usuarioRouter } from "../../module/usuario/router/router";
import { Menu } from "../components/Menu";
import { autenticacionRouter } from "../../module/autenticacion/router/router";
import { dashboardRouter } from "../../module/dashboard/router/dashboardRouter";

const renderRoutes = (routes: RouterI[]) =>
  routes.map((item, index) => (
    <Route key={index} path={item.path} element={<item.element />} />
  ));
export const AppRouter = () => {
  /*  const { isAutenticacion, token } = useContext()
    if (!isAutenticacion) {
      return (
        <Router>
  
          <Routes>
            <Route path="/" element={<AutenticacionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
  
        </Router>
      );
    }*/
  return (

    <BrowserRouter>
      <Routes>

        {/* Layout */}
        <Route element={<Menu />}>
          {renderRoutes(dashboardRouter)}
          {renderRoutes(autenticacionRouter)}
          {renderRoutes(tarifaRouter)}
          {renderRoutes(clienteRouter)}
          {renderRoutes(medidorRouter)}
          {renderRoutes(gastoRouter)}
          {renderRoutes(lecturaRouter)}
          {renderRoutes(pagoRouter)}
          {renderRoutes(usuarioRouter)}
        </Route>

      </Routes>
    </BrowserRouter>

  );
};