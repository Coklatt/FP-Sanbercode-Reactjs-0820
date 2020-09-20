import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  HomeFilled,
} from "@ant-design/icons";
import Movies from "./movies";
import Login from "./login";
import Games from "./games";
import Editor from "./editor";
import Logout from "./logout";
import Register from "./register";
import { DetailMovie, DetailGame } from "./detail";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
export const MainContext = createContext();

const Main = () => {
  const [movie, setMovie] = useState(null);
  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);
  const [navMenu, setNavMenu] = useState([
    { comp: Login, text: "Login", to: "/login" },
    { comp: Games, text: "Games", to: "/games" },
    { comp: Movies, text: "Movies", to: "/" },
  ]);

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

    console.log(userData);
    console.log(user);
    if (user === null) {
      if (userData === null || userData === {}) {
        setNavMenu([
          { comp: Login, text: "Login", to: "/login" },
          { comp: Games, text: "Games", to: "/games" },
          { comp: Movies, text: "Movies", to: "/" },
        ]);
        localStorage.setItem("fp", JSON.stringify(null));
      } else {
        setNavMenu([
          { comp: Logout, text: "Logout", to: "/logout" },
          { comp: Editor, text: "Editor", to: "/editor" },
          { comp: Games, text: "Games", to: "/games" },
          { comp: Movies, text: "Movies", to: "/" },
        ]);
      }
    } else {
      if (userData !== null && userData !== {}) {
        setNavMenu([
          { comp: Logout, text: "Logout", to: "/logout" },
          { comp: Editor, text: "Editor", to: "/editor" },
          { comp: Games, text: "Games", to: "/games" },
          { comp: Movies, text: "Movies", to: "/" },
        ]);
      } else {
      }
    }
  }, [movie, game, user]);

  return (
    <MainContext.Provider
      value={{
        movie,
        setMovie,
        game,
        setGame,
        setUser,
      }}
    >
      <Layout>
        <Router>
          <Header
            className="header"
            style={{ position: "fixed", zIndex: 1, width: "100%" }}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[navMenu.length + ""]}
            >
              {navMenu.map((el, index) => {
                return (
                  <Menu.Item style={{ float: "right" }} key={index}>
                    <Link to={el.to}>{el.text}</Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Header>
          <Switch>
            {navMenu.map((el) => {
              if (el.to === "/") {
                return <Route exact path={el.to} component={el.comp} />;
              } else {
                return <Route path={el.to} component={el.comp} />;
              }
            })}
            <Route path="/register" component={Register} />
            <Route path="/detail/movie/:id" component={DetailMovie} />
            <Route path="/detail/game/:id" component={DetailGame} />
          </Switch>
        </Router>
      </Layout>
    </MainContext.Provider>
  );
};

export default Main;
