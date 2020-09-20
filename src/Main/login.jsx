import React, { useContext } from "react";
import { Form, Input, Button, Layout, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import { MainContext } from "./main";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Content } = Layout;

const Login = () => {
  const history = useHistory();
  const { setUser } = useContext(MainContext);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    var email = values.email;
    var password = values.password;

    axios
      .post("https://backendexample.sanbersy.com/api/user-login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
        localStorage.setItem("fp", JSON.stringify(res.data));
        history.push("/");
      })
      .catch((res) => {
        message.error("Wrong email or password");
        form.resetFields();
      });
  };

  return (
    <Content className="login-container">
      <Form
        form={form}
        {...layout}
        onFinish={onFinish}
        name="basic"
        initialValues={{ remember: true }}
      >
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
            <Link to="/register">Register</Link>
          </Button>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default Login;
