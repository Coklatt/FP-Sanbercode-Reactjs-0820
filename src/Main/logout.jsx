import React, { useContext } from "react";
import { Card, Button, Tooltip, message } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { MainContext } from "./main";
import { useHistory } from "react-router-dom";
import { NavDataLogout, SwitchDataLogout } from "./nav";

const Logout = () => {
  const { setUser, setNavMenu, setSwitchItem } = useContext(MainContext);
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.clear();
    setUser(null);
    const hide = message.loading("Logging out", 0);

    // Unset Nav and Switch
    setNavMenu(NavDataLogout);
    setSwitchItem(SwitchDataLogout);

    setTimeout(hide, 1000);
    setTimeout(() => {
      message.success("You are logged out");
      history.push("/");
    }, 1100);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Card
        style={{
          width: 300,
          margin: "0 auto",
          marginTop: "30vh",
          padding: "30px",
          boxShadow: "0.4px 4px 10px #aaa",
        }}
      >
        <Tooltip placement="top" title="logout">
          <Button
            danger
            type="primary"
            onClick={logoutHandler}
            icon={<PoweroffOutlined />}
          >
            Are you sure to logout?
          </Button>
        </Tooltip>
      </Card>
    </div>
  );
};
export default Logout;
