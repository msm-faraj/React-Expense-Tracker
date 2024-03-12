import { Outlet } from "react-router-dom";
import App from "../App";

const Layout = () => {
  return (
    <App>
      <Outlet />
    </App>
  );
};

export default Layout;
