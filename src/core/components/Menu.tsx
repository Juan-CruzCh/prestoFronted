import { useState } from "react";
import { MenuGroup } from "./MenuGroup";
import { SubItem } from "./SubItem";

// React Icons import
import {
  MdDashboard,
  MdSpeed,
  MdBook,
  MdCreditCard,
  MdAccountBalanceWallet,
  MdGroup,
  MdAdd,
  MdList,
  MdSettings,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import { Link, Outlet } from "react-router";
import { useAuthStore } from "../context/auth";

const cerrarSession = () => console.log("logout");

export const Menu: React.FC = () => {
  const {usuario, isAutenticaicon}= useAuthStore()
  console.log(isAutenticaicon);
  


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const toggleSubmenu = (name: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="relative h-screen bg-gray-100 flex">
      {/* OVERLAY */}
      {drawerOpen && (
        <div
          className="fixed top-16 left-0 w-full h-[calc(100%-64px)]"
          onClick={toggleDrawer}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-16 left-0 w-64 h-[calc(100%-64px)] bg-white shadow-md flex flex-col transition-transform duration-300 z-50
        ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        { usuario &&  isAutenticaicon &&(
        <div className="flex items-center p-4 border-b bg-white shadow-md rounded-lg hover:bg-gray-50">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl">👤</div>
          <div className="ml-4">
            <div className="font-semibold text-gray-900 text-lg">
              {usuario.nombre} {usuario.apellidoMaterno}
            </div>
            <div className="text-sm text-gray-500">
              Rol: <span className="font-medium text-gray-700">{usuario.rol}</span>
            </div>
          </div>
        </div>)
  }
      {
        usuario && isAutenticaicon && (
        <nav className="flex-1 overflow-y-auto">
          {(usuario.rol === "ADMINISTRADOR" || usuario.rol === "LECTURADOR") && (
            <Link to="/inicio" className="flex items-center p-3 hover:bg-gray-100">
              <MdDashboard className="text-xl" />
              <span className="ml-2">Dashboard</span>
            </Link>
          )}

          {/* MEDIDOR */}
          {usuario.rol === "ADMINISTRADOR" && (
            <MenuGroup
              name="medidor"
              icon={<MdSpeed className="text-xl" />}
              title="Medidor"
              toggleSubmenu={toggleSubmenu}
              expandedMenus={expandedMenus}
            >
              <SubItem to="/medidor/crear" icon={<MdAdd />} text="Crear" />
              <SubItem to="/medidor/listar" icon={<MdList />} text="Listar" />
              <SubItem to="/medidor/moroso" icon={<MdList />} text="Morosos" />
            </MenuGroup>
          )}

          {/* LECTURAS */}
          {(usuario.rol === "ADMINISTRADOR" || usuario.rol === "LECTURADOR") && (
            <MenuGroup
              name="lecturas"
              icon={<MdBook className="text-xl" />}
              title="Lecturas"
              toggleSubmenu={toggleSubmenu}
              expandedMenus={expandedMenus}
            >
              <SubItem to="/lectura/realizar" icon={<MdAdd />} text="Crear" />
              <SubItem to="/lectura/listar" icon={<MdList />} text="Listar" />
            </MenuGroup>
          )}

          {/* TARIFA */}
          {usuario.rol === "ADMINISTRADOR" && (
            <MenuGroup
              name="tarifa"
              icon={<MdCreditCard className="text-xl" />}
              title="Tarifa"
              toggleSubmenu={toggleSubmenu}
              expandedMenus={expandedMenus}
            >
              <SubItem to="/tarifa/listar" icon={<MdList />} text="Listar tarifas" />
            </MenuGroup>
          )}

          {/* GASTOS */}
          {usuario.rol === "ADMINISTRADOR" && (
            <MenuGroup
              name="gastos"
              icon={<MdAccountBalanceWallet className="text-xl" />}
              title="Gastos"
              toggleSubmenu={toggleSubmenu}
              expandedMenus={expandedMenus}
            >
              <SubItem to="/gastos/crear" icon={<MdAdd />} text="Registrar" />
              <SubItem to="/gastos/listar" icon={<MdList />} text="Listar" />
              <SubItem to="/gastos/categorias" icon={<MdSettings />} text="Categorías" />
            </MenuGroup>
          )}

          {/* PAGOS */}
          {usuario.rol === "ADMINISTRADOR" && (
            <MenuGroup
              name="pagos"
              icon={<MdCreditCard className="text-xl" />}
              title="Pagos"
              toggleSubmenu={toggleSubmenu}
              expandedMenus={expandedMenus}
            >
              <SubItem to="/pago/realizar" icon={<MdAdd />} text="Realizar pago" />
              <SubItem to="/pago/listar" icon={<MdList />} text="Listar pagos" />
            </MenuGroup>
          )}

          {usuario.rol === "ADMINISTRADOR" && (
            <Link to="/usuario/listar" className="flex items-center p-3 hover:bg-gray-100">
              <MdGroup className="text-xl" />
              <span className="ml-2">Usuarios</span>
            </Link>
          )}

          <button
            onClick={cerrarSession}
            className="flex items-center p-3 hover:bg-gray-100 mt-auto w-full"
          >
            <MdLogout className="text-xl" />
            <span className="ml-2">Cerrar sesión</span>
          </button>
        </nav>)
}
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col h-full w-full">
        <header className="flex items-center bg-blue-600 text-white p-4 shadow z-10">
          <button onClick={toggleDrawer} className="mr-4">
            <MdMenu className="text-2xl" />
          </button>
          <h1 className="text-lg font-semibold">Sistema de Agua</h1>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
