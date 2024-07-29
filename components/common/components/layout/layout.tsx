import React, { ReactNode, useEffect } from "react";
import { Footer } from "./footer/footer";
import {
  AppLayout,
  AppContent,
  AppWrapper,
  AppSideImage,
} from "./layout.styles";
import { Header } from "./header/header";
import { useRouter } from "next/router";
import { Navbar } from "@/components/nav-bar/nav-bar";
import { CategoryMenus } from "@/components/nav-bar/menu";

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      window.scroll({
        top: 0,
        left: 0,
      });
    });
  }, [router.events]);

  return (
    <AppLayout>

      <Navbar />
      <CategoryMenus />
      <AppContent>{children}</AppContent>

    </AppLayout>
  );
};
