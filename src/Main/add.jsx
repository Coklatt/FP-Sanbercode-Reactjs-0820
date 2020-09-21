import React, { useContext } from "react";
import { Form, Input, Button, InputNumber, Card, message } from "antd";
import { MainContext } from "./main";
import { useHistory } from "react-router-dom";
import api from "./api";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 16 },
};

export const AddMovie = () => {
  const history = useHistory();
  const { movie, setMovie, user } = useContext(MainContext);
  const onFinish = (values) => {
    const hide = message.loading("Adding movie", 0);
    setTimeout(hide, 1000);

    var newMovie = {
      title: values.title,
      description: values.description,
      year: parseInt(values.year),
      genre: values.genre,
      rating: parseInt(values.rating),
      image_url: values.image_url,
    };

    const add = api;
    add
      .post("data-movie", newMovie, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setMovie([...movie, res.data]);
        message.success("Movie added");
        history.push("/editor/movie");
      })
      .catch((res) => {
        message.error("Failed to add movie");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card
      style={{ width: "90%", margin: "0 auto", marginTop: "100px" }}
      title="Add Movie"
    >
      <Form
        {...layout}
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
  );
};

export const AddGame = () => {
  const history = useHistory();
  const { game, setGame, user } = useContext(MainContext);
  const onFinish = (values) => {
    const hide = message.loading("Adding game", 0);
    setTimeout(hide, 1000);

    var newGame = {
      name: values.name,
      release: parseInt(values.release),
      genre: values.genre,
      multiplayer: parseInt(values.multiplayer),
      platform: values.platform,
    };

    const add = api;
    add
      .post("data-game", newGame, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setGame([...game, res.data]);
        message.success("Game added");
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
    <Card
      style={{ width: "90%", margin: "0 auto", marginTop: "100px" }}
      title="Add Game"
    >
      <Form
        {...layout}
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
          rules={[{ required: true, message: "Please input release year!" }]}
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
  );
};
