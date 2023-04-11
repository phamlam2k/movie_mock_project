import { PrivateLayout } from "../../layouts/PrivateLayout";
import style from "./style.module.css";

export const HomeScreen = () => {
  return (
    <PrivateLayout>
      <div className={style.container}>
        <div className={style.page_content}>
          <h1 className={style.page_title}>Home Page</h1>
          <div>Day la Home</div>
        </div>
      </div>
    </PrivateLayout>
  );
};
