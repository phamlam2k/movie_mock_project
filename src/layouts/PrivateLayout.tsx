import { ReactElement } from "react";
import { Header } from "../common/Header";
import { Sidebar } from "../common/Sidebar";
import style from "./style.module.css";

interface Prop {
  children: ReactElement;
}

export const PrivateLayout = ({ children }: Prop) => {
  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style.children_container}>
        <Header />
        <div className={style.children_content}>{children}</div>
      </div>
    </div>
  );
};
