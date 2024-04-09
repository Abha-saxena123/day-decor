import { ReactNode } from "react";
import { AppLayout } from "./layout.styles";
import { Navbar } from "@/components/nav-bar/nav-bar";

export const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppLayout>
      <Navbar />
      <div>{children}</div>
    </AppLayout>
  );
};

