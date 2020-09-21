import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Layout, Tag, Divider, Rate } from "antd";
import { MainContext } from "./main";

const { Content } = Layout;
const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

export const DetailMovie = () => {
  var { id } = useParams();
  const { movie } = useContext(MainContext);
  const currentMovie =
    movie !== null && movie.filter((el) => Number(el.id) === Number(id))[0];
  return (
    <>
      {movie !== null && (
        <Content
          style={{
            marginTop: "64px",
            background: "url('" + currentMovie.image_url + "')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <div className="detail-container">
            <h1 style={{ textAlign: "center", fontSize: "2.5em" }}>
              {currentMovie.title}
            </h1>
            <div style={{ marginTop: "10px" }}>
              <div>{currentMovie.description}</div>
              <Divider orientation="left">Genre</Divider>
              <div>
                {currentMovie.genre.split(" ").map((el, index) => {
                  const fin = el.replace(",", "");
                  return <Tag color={colors[index]}>{fin}</Tag>;
                })}
              </div>
              <Divider orientation="left">Release</Divider>
              <Tag color="geekblue">{currentMovie.year}</Tag>
              <Divider orientation="left">Rating</Divider>
              <Rate disabled defaultValue={currentMovie.rating / 2} />
            </div>
          </div>
        </Content>
      )}
    </>
  );
};

export const DetailGame = () => {
  var { id } = useParams();
  const { game } = useContext(MainContext);
  const currentGame =
    game !== null && game.filter((el) => Number(el.id) === Number(id))[0];
  return (
    <>
      {game !== null && (
        <Content
          style={{
            marginTop: "64px",
            background: "url('" + currentGame.image_url + "')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <div className="detail-container">
            <h1 style={{ textAlign: "center", fontSize: "2.5em" }}>
              {currentGame.name}
            </h1>
            <div style={{ marginTop: "10px" }}>
              <Divider orientation="left">Genre</Divider>
              <div>
                {currentGame.genre.split(" ").map((el, index) => {
                  const fin = el.replace(",", "");
                  return <Tag color={colors[index]}>{fin}</Tag>;
                })}
                {currentGame.multiplayer !== 0 && (
                  <Tag color="purple">multiplayer</Tag>
                )}
              </div>
              <Divider orientation="left">Release</Divider>
              <Tag color="geekblue">{currentGame.release}</Tag>
              <Divider orientation="left">Platform</Divider>
              {currentGame.platform.split(" ").map((el, index) => {
                const fin = el.replace(",", "");
                return (
                  <Tag
                    color={
                      colors.length > index
                        ? colors[colors.length - 1 - index]
                        : colors[index - colors.length]
                    }
                  >
                    {fin}
                  </Tag>
                );
              })}
            </div>
          </div>
        </Content>
      )}
    </>
  );
};
