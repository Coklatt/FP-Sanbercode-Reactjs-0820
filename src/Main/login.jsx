import React, { useContext } from "react";
import { Form, Input, Button, Layout, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import { MainContext, a, b } from "./main";
import api from "./api";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { span: 16 },
};

const { Content } = Layout;

const Login = () => {
  const history = useHistory();
  const { setUser, setNavMenu, setSwitchItem } = useContext(MainContext);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    var email = values.email;
    var password = values.password;
    const hide = message.loading("Logging in", 0);
    setTimeout(hide, 1000);
    const login = api;
    login
      .post("user-login", {
        email,
        password,
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("fp", JSON.stringify(res.data));

        // Set Navbar and Switch
        setNavMenu(a);
        setSwitchItem(b);

        setTimeout(() => {
          message.success("Login Success");
          history.push("/");
        }, 1100);
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
