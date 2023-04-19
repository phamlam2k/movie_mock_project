import { useState } from "react";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import style from "./style.module.css";
export const Header = () => {
  const savedItem = JSON.parse(localStorage.getItem("pocketbase_auth") || "");
  console.log(savedItem);
  return (
    <div className={style.header_container}>
      <div className={style.header_content}>
        <div className={style.header_email}>{savedItem.model.email}</div>
      </div>
    </div>
  );
};
