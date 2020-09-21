import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { message, Card } from "antd";
import { MainContext } from "./main";
import { LoadingOutlined } from "@ant-design/icons";

export const DeleteMovie = () => {
  const { user, movie, setMovie } = useContext(MainContext);
  const { id } = useParams();
  const history = useHistory();
  const hide = message.loading("Deleting movie", 0);
  setTimeout(hide, 1000);

  const newMovie = movie.filter((el) => parseInt(el.id) !== parseInt(id));

  axios
    .delete(
      `https://backendexample.sanbersy.com/api/data-movie/${parseInt(id)}`,
      { headers: { Authorization: `Bearer ${user.token}` } }
    )
    .then((res) => {
      console.log(res);
      setMovie(newMovie);
      message.success("Delete success");
      history.push("/editor/movie");
    });
  return (
    <>
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
          <LoadingOutlined />
          Deleting
        </Card>
      </div>
    </>
  );
};

export const DeleteGame = () => {
  const { user, game, setGame } = useContext(MainContext);
  const { id } = useParams();
  const history = useHistory();
  const hide = message.loading("Deleting game", 0);
  setTimeout(hide, 1000);

  const newGame = game.filter((el) => parseInt(el.id) !== parseInt(id));

  axios
    .delete(
      `https://backendexample.sanbersy.com/api/data-game/${parseInt(id)}`,
      { headers: { Authorization: `Bearer ${user.token}` } }
    )
    .then((res) => {
      console.log(res);
      setGame(newGame);
      message.success("Delete success");
      history.push("/editor/game");
    });
  return (
    <>
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
          <LoadingOutlined />
          Deleting
        </Card>
      </div>
    </>
  );
};
