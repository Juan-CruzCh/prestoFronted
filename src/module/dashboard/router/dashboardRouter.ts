import type { RouterI } from "../../../core/interface/router";
import { DashboardPage } from "../page/DashboardPage";

export const dashboardRouter: RouterI[] = [
    {
        element:DashboardPage,
        path:'/dashboard'
    }
];