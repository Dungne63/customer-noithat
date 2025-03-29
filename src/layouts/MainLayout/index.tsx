import React from "react";
import Header from "./MainLayoutHeader";
import Footer from "./MainLayoutFooter";
import { Outlet } from "react-router";
import CategorySider from "@features/CategorySider";
import CartSider from "@features/CartSider";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full">
      <Header />
      <CategorySider />
      <CartSider />
      <div className="grow flex flex-col w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
