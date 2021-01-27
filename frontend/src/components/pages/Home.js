import React, { Component } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  ScanOutlined,
  LogoutOutlined,
  ProjectOutlined,
} from "@ant-design/icons";

import Register from "./Register";
import Project from "./Project";
import Details from "./Details";
import Lost from "./Lost";
import AllStudents from "./AllStudents";
import { Content } from "antd/lib/layout/layout";

const { SubMenu } = Menu;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedkey: "1",
    };
  }
  handleChange = (e) => {
    this.setState(
      {
        selectedkey: e.key,
      },
      console.log(this.state, e)
    );
  };
  render() {
    let page;
    switch (this.state.selectedkey) {
      case "1":
        page = <Register />;
        break;
      case "2":
        page = <Project />;
        break;
      case "3":
        page = <Details />;
        break;
      case "4":
        page = <Details />;
        break;
      case "5":
        page = <Lost />;
        break;
      case "6":
        page = <AllStudents />;
        break;
      default:
        break;

    }
    return (
      <div style={{backgroundColor: "#111827"}} >
        <Menu  onClick={this.handleChange} mode="horizontal">
          <Menu.Item key="1" icon={<UserOutlined />}>
            Register
          </Menu.Item>
          <Menu.Item key="2" icon={<ProjectOutlined />}>
            Project
          </Menu.Item>
          <SubMenu key="3" icon={<ScanOutlined />} title="Code-Scanner">
            <Menu.Item key="4">Student Deatils</Menu.Item>
            <Menu.Item key="5">Lost QR Code</Menu.Item>
          </SubMenu>
          <Menu.Item key="6" icon={<UserOutlined />}>
            Student List
          </Menu.Item>
          <Menu.Item key="7" icon={<LogoutOutlined />}>
            <a href="/">LogOut</a>
          </Menu.Item>
        </Menu>
        <Content style={{ margin: "24px 16px 0",backgroundColor: "#111827" }}>
          <div style={{ padding: 24, minHeight: 360 ,backgroundColor: "#111827"}}>
            {page}
          </div>
        </Content>
      </div>
    );
  }
}
export default Home;
