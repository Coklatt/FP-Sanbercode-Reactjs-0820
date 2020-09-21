import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";

import Register from "./register";

import {
  NavDataLogin,
  NavDataLogout,
  SwitchDataLogin,
  SwitchDataLogout,
} from "./nav";

const { Header, Footer } = Layout;
export const MainContext = createContext();
export const a = NavDataLogin;
export const b = SwitchDataLogin;
export const c = NavDataLogout;
export const d = SwitchDataLogout;

const Main = () => {
  const [movie, setMovie] = useState(null);
  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);
  const [navMenu, setNavMenu] = useState(null);
  const [switchItem, setSwitchItem] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("fp"));

    // Movies changes effect
    if (movie === null) {
      axios
        .get("http://backendexample.sanbercloud.com/api/data-movie")
        .then((result) => {
          console.log("Movie");
          console.log(result);
          setMovie(result.data);
        })
        .catch((error) => console.log(error));
    }

    if (game === null) {
      axios
        .get("http://backendexample.sanbercloud.com/api/data-game")
        .then((result) => {
          console.log("Game");
          console.log(result);
          setGame(result.data);
        })
        .catch((error) => console.log(error));
    }

    // User Login Handler
    console.log(userData);
    console.log(user);
    if (user === null) {
      if (userData === null || userData === {}) {
        console.log("Blom Login");
        localStorage.setItem("fp", JSON.stringify(null));
      } else {
        console.log("Login dari localstorage");
        setUser(userData);
      }
    }

    // Nav And Switch Handler
    if (navMenu === null && switchItem === null) {
      if (userData !== null) {
        console.log("Udah Login Nav");
        setNavMenu(NavDataLogin);
        setSwitchItem(SwitchDataLogin);
      } else {
        console.log("Blom Login Nav");
        setNavMenu(NavDataLogout);
        setSwitchItem(SwitchDataLogout);
      }
    }
  }, [movie, game, user, switchItem, navMenu]);

  return (
    <MainContext.Provider
      value={{
        movie,
        game,
        user,
        setMovie,
        setGame,
        setUser,
        setNavMenu,
        setSwitchItem,
      }}
    >
      <Layout>
        <Router>
          <Header
            className="header"
            style={{ position: "fixed", zIndex: 1, width: "100%" }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
              {navMenu !== null &&
                navMenu.map((el, index) => {
                  if (el.text === "Logout") {
                    return (
                      <Menu.Item
                        icon={<PoweroffOutlined />}
                        style={{ float: "right" }}
                        key={index}
                      >
                        <Link to={el.to}>{el.text}</Link>
                      </Menu.Item>
                    );
                  } else {
                    return (
                      <Menu.Item
                        style={{ float: "right" }}
                        key={el.text === "Movies" ? "home" : index}
                      >
                        <Link to={el.to}>{el.text}</Link>
                      </Menu.Item>
                    );
                  }
                })}
            </Menu>
          </Header>
          <Switch>
            {switchItem !== null &&
              switchItem.map((el) => {
                if (el.to === "/") {
                  return <Route exact path={el.to} component={el.comp} />;
                } else {
                  return <Route path={el.to} component={el.comp} />;
                }
              })}
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </Layout>
      <Footer className="center">
        Final Project - Sanbercode ReactJs Online Bootcamp by @r.eader
      </Footer>
    </MainContext.Provider>
  );
};

export default Main;
