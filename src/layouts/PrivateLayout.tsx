import { ReactElement } from "react";
import { Header } from "../common/Header";
import { Sidebar } from "../common/Sidebar";
import style from "./style.module.css";
import { pb } from "../lib/pocketbase";
import { Navigate } from "react-router-dom";

interface Prop {
  children: ReactElement;
}

export const PrivateLayout = ({ children }: Prop) => {
  if (!pb.authStore.isValid) {
    return <Navigate to="/login" replace />;
  }

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
