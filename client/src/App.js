import React from "react";
import "./App.css";
import ListAllTasks from "./components/ListAllTasks";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddNewProject from "./components/AddNewProject";
import AboutUs from "./components/AboutUs";
import ViewProject from "./components/ViewProject";

const { Header, Footer, Sider, Content } = Layout;

function App(props) {
  return (
    <Router>
        <Layout>
          <Sider>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <Link to="/">All Projects</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/addNewProject">Add New Project</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/about-us">About US</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="site-layout-background" style={{ padding: 0 }} />

            <Content style={{ margin: "0 16px" }}>
              <Switch>
                <Route path="/" exact component={ListAllTasks} />
                <Route path="/addNewProject" exact component={AddNewProject} />
                <Route path="/about-us" exact component={AboutUs} />
                <Route path="/view-project/:id" component={ViewProject} />
              </Switch>
            </Content>

            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
    </Router>
  );
}

export default App;
