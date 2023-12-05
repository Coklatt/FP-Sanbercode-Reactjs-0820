import React, { useContext } from "react";
import { Form, Input, Button, Layout, message, Menu } from "antd";
import { useHistory, Link } from "react-router-dom";
import { MainContext } from "./main";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

const { Sider } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { span: 16 },
};

const { Content } = Layout;

export const ChangePass = () => {
  const history = useHistory();
  const { user, setUser } = useContext(MainContext);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const hide = message.loading("Changing password", 0);
    setTimeout(hide, 1000);

    const newPass = {
      current_password: values.current_password,
      new_password: values.new_password,
      new_confirm_password: values.new_confirm_password,
    };

    const change = axios.create({
      baseURL: `https://backendexample.sanbersy.com/api/`,
    });
    change
      .post("change-password", newPass, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        message.success("Change password success");
        setUser(res.data);
        localStorage.setItem("fp", JSON.stringify(res.data));
        history.push("/");
      })
      .catch((res) => {
        message.error("Failed to change password");
      });
  };

  return (
    <>
      <Layout style={{ marginTop: "64px" }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["2"]}
            theme="dark"
            style={{
              height: "100%",
              borderRight: 0,
              backgroundColor: "rgb(10,27,100)",
            }}
          >
            <Menu.Item key="0">
              <Link to="/editor/movie">
                <EditOutlined />
                Movie Editor
              </Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/editor/game">
                <EditOutlined />
                Game Editor
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/editor/change-password">
                <EditOutlined />
                Ganti Password
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              width: "100%",
              overflow: "",
              //   overflow: "scroll",
            }}
          >
            <Content className="login-container">
              <Form
                form={form}
                {...layout}
                onFinish={onFinish}
                name="basic"
                initialValues={{ remember: true }}
              >
                <Form.Item
                  label="Current Password"
                  name="current_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your current password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="new_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirm New Password"
                  name="new_confirm_password"
                  rules={[
                    { required: true, message: "Confirm your new password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Change
                  </Button>
                </Form.Item>
              </Form>
            </Content>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
