import React, { useContext } from "react";
import { MainContext } from "./main";
import { Card, Row, Col, Layout, Button } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Content } = Layout;

const Movies = () => {
  const { movie } = useContext(MainContext);
  var default_img =
    "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

  return (
    <>
      <Content className="movie-container">
        <h1 style={{ textAlign: "center" }}>Movie List</h1>
        <div className="movie-list">
          <Row gutter={[16, 24]}>
            {movie !== null &&
              movie.map((el) => {
                var desc = el.description;
                var descNew =
                  desc !== undefined && desc !== null
                    ? desc.length > 20
                      ? desc.substring(0, 40) + "..."
                      : desc
                    : null;
                var image =
                  el.image_url !== null &&
                  el.image_url !== undefined &&
                  el.image_url.includes("http")
                    ? el.image_url
                    : default_img;
                return (
                  <Col span={8}>
                    <Card
                      style={{ width: 300 }}
                      cover={
                        <img
                          alt="example"
                          style={{
                            minHeight: "170px",
                            maxHeight: "170px",
                            objectFit: "cover",
                          }}
                          src={image}
                        />
                      }
                    >
                      <Meta title={el.title} description={descNew}></Meta>
                      <Button
                        style={{ marginTop: "10px" }}
                        type="primary"
                        size="small"
                      >
                        <Link to={"/detail/movie/" + el.id}>Details</Link>
                      </Button>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      </Content>
    </>
  );
};

export default Movies;
