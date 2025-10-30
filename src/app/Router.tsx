/*Copyright © 2025 Chili Labs. All rights reserved.*/

import {
    createBrowserRouter,
    RouterProvider,
    type DataRouter,
} from "react-router";
import type { JSX } from "react";
import NotFoundPage from "./pages/NotFound";
import MainLayout from "../components/layouts/MainLayout";

/**
 * Creates a list of all application's routes.
 * @returns DataRouter: list of all routes.
 */
const routes: DataRouter = createBrowserRouter([
    {
        path: "*",
        element: <NotFoundPage />,
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                lazy: () =>
                    import("./pages/Products").then((m) => ({
                        Component: m.default,
                    })),
            },
            {
                path: "/products/:id",
                lazy: () =>
                    import("./pages/ProductDetails").then((m) => ({
                        Component: m.default,
                    })),
            },
        ],
    },
]);

/**
 * Provides routing for the application using react-router's v7 data mode.
 * @returns JSX.Element: router provider component.
 */
const AppRouter = (): JSX.Element => {
    return <RouterProvider router={routes} />;
};

export default AppRouter;
