import React, { useContext } from "react";
import { Form, Input, Button, Layout, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { MainContext } from "./main";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Content } = Layout;

const Register = () => {
  const history = useHistory();
  const { setUser } = useContext(MainContext);
  const onFinish = (values) => {
    var name = values.name;
    var email = values.email;
    var password = values.password;

    axios
      .post("https://backendexample.sanbersy.com/api/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        message.success("Your account has been created");
        setUser(res.data);
        history.push("/");
      })
      .catch((res) => {
        if (res.status === 400) {
          message.error("Cannot create account");
        }
      });
  };

  return (
    <Content className="login-container">
      <Form
        {...layout}
        onFinish={onFinish}
        name="basic"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="link">
            <Link to="/login">Login</Link>
          </Button>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default Register;
