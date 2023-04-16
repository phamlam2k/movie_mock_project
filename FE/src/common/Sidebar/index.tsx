import { NavLink, useNavigate } from "react-router-dom";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import { MENU_SIDEBAR, MenuSidebar } from "../../utils/common";
import style from "./style.module.css";
import { pb } from "../../lib/pocketbase";

export const Sidebar = () => {
  const navigate = useNavigate();

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#fff" : "",
    backgroundColor: isActive ? "#808080" : "",
  });

  const logout = () => {
    pb.authStore.clear();
    navigate("/login");
  };
  return (
    <div className={style.container}>
      <div className={style.menu_container}>
        {MENU_SIDEBAR.map((content: MenuSidebar) => {
          return (
            <div className={style.menu_wrapper}>
              <NavLink
                key={content.id}
                to={content.path}
                style={navLinkStyle}
                className={style.menu_section}
              >
                {content.name}
              </NavLink>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};
