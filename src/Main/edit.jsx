import React, { useContext } from "react";
import { Form, Input, Button, InputNumber, Card, message } from "antd";
import { MainContext } from "./main";
import { useHistory, useParams } from "react-router-dom";
import api from "./api";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 16 },
};

export const EditMovie = () => {
  const { id } = useParams();
  const history = useHistory();
  const { movie, setMovie, user } = useContext(MainContext);
  const currentMovie =
    movie !== null && movie.filter((el) => parseInt(el.id) === parseInt(id))[0];
  const [form] = Form.useForm();
  form.setFieldsValue({
    title: currentMovie.title,
    description: currentMovie.description,
    year: currentMovie.year,
    genre: currentMovie.genre,
    rating: currentMovie.rating,
    image_url: currentMovie.image_url,
  });

  const onFinish = (values) => {
    const hide = message.loading("Changing movie", 0);
    setTimeout(hide, 1000);
    var changeMovie = {
      title: values.title,
      description: values.description,
      year: parseInt(values.year),
      genre: values.genre,
      rating: parseInt(values.rating),
      image_url: values.image_url,
    };
    var newMovie = movie.filter((el) => parseInt(el.id) !== parseInt(id));
    const edit = api;
    edit
      .put(`data-movie/${parseInt(id)}`, changeMovie, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setMovie([...newMovie, res.data]);
        message.success("Movie changed");
        history.push("/editor/movie");
      })
      .catch(() => {
        message.error("Failed to change movie");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {movie !== null && (
        <Card
          style={{ width: "90%", margin: "0 auto", marginTop: "100px" }}
          title="Add Movie"
        >
          <Form
            {...layout}
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Year"
              name="year"
              rules={[{ required: true, message: "Please input year!" }]}
            >
              <InputNumber max={2020} min={1900} defaultValue={2018} />
            </Form.Item>

            <Form.Item
              label="Genre (Separate by space)"
              name="genre"
              rules={[{ required: true, message: "Please input genre!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: "Please input rating!" }]}
            >
              <InputNumber max={10} min={0} defaultValue={8} />
            </Form.Item>

            <Form.Item
              label="Image Url"
              name="image_url"
              rules={[{ required: true, message: "Please input image url!" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
};

export const EditGame = () => {
  const { id } = useParams();
  const history = useHistory();
  const { game, setGame, user } = useContext(MainContext);
  const currentGame =
    game !== null && game.filter((el) => parseInt(el.id) === parseInt(id))[0];
  const [form] = Form.useForm();

  form.setFieldsValue({
    name: currentGame.name,
    release: currentGame.release,
    genre: currentGame.genre,
    multiplayer: currentGame.multiplayer,
    platform: currentGame.platform,
  });

  const onFinish = (values) => {
    const hide = message.loading("Changing game", 0);
    setTimeout(hide, 1000);

    var editGame = {
      name: values.name,
      release: parseInt(values.release),
      genre: values.genre,
      multiplayer: parseInt(values.multiplayer),
      platform: values.platform,
    };

    var newGame = game.filter((el) => parseInt(el.id) !== parseInt(id));

    const edit = api;
    edit
      .put(`data-game/${id}`, editGame, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setGame([...newGame, res.data]);
        message.success("Game changed");
        history.push("/editor/game");
      })
      .catch((res) => {
        message.error("Failed to add game");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {game !== null && (
        <Card
          style={{ width: "90%", margin: "0 auto", marginTop: "100px" }}
          title="Add Game"
        >
          <Form
            {...layout}
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Release"
              name="release"
              rules={[
                { required: true, message: "Please input release year!" },
              ]}
            >
              <InputNumber max={2020} min={1900} defaultValue={2018} />
            </Form.Item>

            <Form.Item
              label="Genre (Separate with space)"
              name="genre"
              rules={[{ required: true, message: "Please input genre!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Multiplayer"
              name="multiplayer"
              rules={[{ required: true, message: "Please input multiplayer!" }]}
            >
              <InputNumber max={100} min={0} defaultValue={0} />
            </Form.Item>

            <Form.Item
              label="Platform (Separate with space)"
              name="platform"
              rules={[{ required: true, message: "Please input platform!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
};
