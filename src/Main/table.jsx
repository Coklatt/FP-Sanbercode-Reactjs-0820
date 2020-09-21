import React, { useContext } from "react";
import { Table, Tag, Button, Layout, Menu } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { MainContext } from "./main";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;

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

export const TableMovie = () => {
  const { movie } = useContext(MainContext);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Description",
      dataIndex: "desc",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        a.desc !== null && b.desc !== null && a.desc.length - b.desc.length,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: ">2015",
          value: [2015, 2100],
        },
        {
          text: "2011 - 2015",
          value: [2010, 2015],
        },
        {
          text: "2000 - 2010",
          value: [1999, 2010],
        },
        {
          text: "<2000",
          value: [1, 1999],
        },
      ],
      onFilter: (value, record) =>
        parseInt(record.year) > value[0] && parseInt(record.year) <= value[1],
      filterMultiple: false,
      sorter: (a, b) => parseInt(a.year) - parseInt(b.year),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rating",
      dataIndex: "rating",
      filters: [
        {
          text: "10",
          value: "10",
        },
        {
          text: "9",
          value: "9",
        },
        {
          text: "8",
          value: "8",
        },
        {
          text: "7",
          value: "7",
        },
        {
          text: "6",
          value: "6",
        },
        {
          text: "5",
          value: "5",
        },
      ],
      onFilter: (value, record) => parseInt(record.rating) === parseInt(value),
      filterMultiple: false,
      sorter: (a, b) => parseInt(a.rating) - parseInt(b.rating),
      defaultSortOrder: "descend",
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Genre",
      dataIndex: "genre",
      filters: [
        {
          text: "Action",
          value: "action",
        },
        {
          text: "Romance",
          value: "Romance",
        },
        {
          text: "Fantasy",
          value: "Fantasy",
        },
        {
          text: "Adventure",
          value: "Adventure",
        },
      ],
      render: (genre) => (
        <>
          {genre.map((tag, index) => {
            const fin = tag.replace(",", "");
            return (
              <Tag
                color={
                  colors.length > index
                    ? colors[colors.length - 1 - index]
                    : colors[index - colors.length]
                }
                style={{ margin: "5px" }}
              >
                {fin}
              </Tag>
            );
          })}
        </>
      ),
      filterMultiple: false,
      onFilter: (value, record) => record.genre.includes(value),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (id) => {
        return (
          <>
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              style={{ marginRight: "10px" }}
            >
              <Link style={{ color: "white" }} to={"/delete/movie/" + id}>
                Delete
              </Link>
            </Button>
            <Button type="primary" style={{ marginTop: "10px" }}>
              <Link to={"/edit/movie/" + id}>Edit</Link>
            </Button>
          </>
        );
      },
    },
  ];

  const data =
    movie !== null &&
    movie.map((el, index) => {
      var desc = el.description;
      var descNew =
        desc !== undefined && desc !== null
          ? desc.length > 20
            ? desc.substring(0, 40) + "..."
            : desc
          : null;
      return {
        key: index + 1 + "",
        title: el.title,
        desc: descNew,
        year: el.year,
        rating: el.rating,
        genre: el.genre !== null ? el.genre.split(" ") : [""],
        action: el.id,
      };
    });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <Layout style={{ marginTop: "64px" }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["0"]}
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
            <Link to="/add/movie">
              <Button
                type="dashed"
                icon={<PlusCircleOutlined />}
                style={{ marginBottom: "20px" }}
                block
              >
                Add Movie
              </Button>
            </Link>
            {movie !== null && (
              <Table
                style={{ width: "100%" }}
                columns={columns}
                dataSource={data}
                onChange={onChange}
              />
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

// Table Game

export const TableGame = () => {
  const { game } = useContext(MainContext);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Release",
      dataIndex: "release",
      filters: [
        {
          text: ">2015",
          value: [2015, 2100],
        },
        {
          text: "2011 - 2015",
          value: [2010, 2015],
        },
        {
          text: "2000 - 2010",
          value: [1999, 2010],
        },
        {
          text: "<2000",
          value: [1, 1999],
        },
      ],
      onFilter: (value, record) =>
        parseInt(record.release) > value[0] &&
        parseInt(record.release) <= value[1],
      filterMultiple: false,
      sorter: (a, b) => parseInt(a.release) - parseInt(b.release),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Multiplayer",
      dataIndex: "multiplayer",
      filters: [
        {
          text: "2",
          value: "2",
        },
        {
          text: "3",
          value: "3",
        },
        {
          text: "4",
          value: "4",
        },
        {
          text: "5",
          value: "5",
        },
      ],
      onFilter: (value, record) =>
        parseInt(record.multiplayer) === parseInt(value),
      filterMultiple: false,
      sorter: (a, b) => parseInt(a.multiplayer) - parseInt(b.multiplayer),
      defaultSortOrder: "descend",
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Genre",
      dataIndex: "genre",
      filters: [
        {
          text: "Fighting",
          value: "Fighting",
        },
        {
          text: "Arcade",
          value: "Arcade",
        },
        {
          text: "Fantasy",
          value: "Fantasy",
        },
        {
          text: "Adventure",
          value: "Adventure",
        },
      ],
      render: (genre) => (
        <>
          {genre.map((tag, index) => {
            const fin = tag.replace(",", "");
            return (
              <Tag
                color={
                  colors.length > index
                    ? colors[colors.length - 1 - index]
                    : colors[index - colors.length]
                }
                style={{ margin: "5px" }}
              >
                {fin}
              </Tag>
            );
          })}
        </>
      ),
      filterMultiple: false,
      onFilter: (value, record) => record.genre.includes(value),
    },
    {
      title: "Platform",
      dataIndex: "platform",
      filters: [
        {
          text: "PC",
          value: "PC",
        },
        {
          text: "Xbox",
          value: "Xbox",
        },
        {
          text: "PlatStation",
          value: "PlayStation",
        },
      ],
      render: (platform) => (
        <>
          {platform.map((tag, index) => {
            const fin = tag.replace(",", "");
            return (
              <Tag
                color={
                  colors.length > index
                    ? colors[colors.length - 1 - index]
                    : colors[index - colors.length]
                }
                style={{ margin: "5px" }}
              >
                {fin}
              </Tag>
            );
          })}
        </>
      ),
      filterMultiple: false,
      onFilter: (value, record) => record.platform.includes(value),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (id) => {
        return (
          <>
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              style={{ marginRight: "10px" }}
            >
              <Link style={{ color: "white" }} to={"/delete/game/" + id}>
                Delete
              </Link>
            </Button>
            <Button type="primary" style={{ marginTop: "10px" }}>
              <Link to={"/edit/game/" + id}>Edit</Link>
            </Button>
          </>
        );
      },
    },
  ];

  const data =
    game !== null &&
    game.map((el, index) => {
      return {
        key: index + 1 + "",
        name: el.name,
        release: el.release,
        multiplayer: el.multiplayer,
        genre: el.genre.split(" "),
        platform: el.platform.split(" "),
        action: el.id,
      };
    });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <Layout style={{ marginTop: "64px" }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
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
            <Link to="/add/game">
              <Button
                type="dashed"
                icon={<PlusCircleOutlined />}
                style={{ marginBottom: "20px" }}
                block
              >
                Add Game
              </Button>
            </Link>
            {game !== null && (
              <Table
                style={{ width: "100%" }}
                columns={columns}
                dataSource={data}
                onChange={onChange}
              />
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
