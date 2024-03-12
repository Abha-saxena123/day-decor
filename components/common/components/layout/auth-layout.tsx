import { ReactNode } from "react";
import { AppLayout } from "./layout.styles";

export const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppLayout>
      <div>{children}</div>
    </AppLayout>
  );
};

