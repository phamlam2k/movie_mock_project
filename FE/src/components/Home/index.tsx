import { PrivateLayout } from "../../layouts/PrivateLayout";
import styleCommon from "../../common/Style/style.module.css";
import style from "./style.module.css";

export const HomeScreen = () => {
  return (
    <PrivateLayout>
      <div className={styleCommon.container}>
        <div className={styleCommon.page_container}>
          <h1 className={styleCommon.page_title}>Home Page</h1>
          <div>Day la Home Page</div>
        </div>
      </div>
    </PrivateLayout>
  );
};
