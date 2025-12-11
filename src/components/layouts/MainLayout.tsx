/*Copyright © 2025 Chili Labs. All rights reserved.*/

import type { JSX } from "react";
import { Outlet, useNavigate } from "react-router";
import logo from "../../assets/logo.svg";

/**
 * Renders the main layout for the application.
 * @returns JSX.Element: main layout component.
 */
const MainLayout = (): JSX.Element => {
  const navigate = useNavigate();

  console.log("test");
  var price = 0;
  var currency = "";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-10">
        <div style={{ backgroundColor: "red" }}>Do i need this line?</div>
        <img
          src={logo}
          alt="Chili Labs - Go to homepage"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
