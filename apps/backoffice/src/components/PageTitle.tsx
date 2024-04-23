import { ReactNode } from "react";

type PageTitleProps = {
  children: ReactNode;
};

export function PageTitle({ children }: PageTitleProps) {
  return <h2 className="text-3xl font-bold tracking-tight my-5">{children}</h2>;
}
