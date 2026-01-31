import type { RouterI } from "../../../core/interface/router";
import { LoginPage } from "../page/LoginPage";

export const autenticacionRouter: RouterI[] = [
  {
    path: "/",
    element: LoginPage,
  },
];