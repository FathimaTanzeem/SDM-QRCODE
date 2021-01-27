import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import {ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Layout } from "antd";

import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components/authentication/protectedroute";

import Login from "./components/pages/Login";

import Home from "./components/pages/Home";

const { Header } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "1",
    };
  }
  render() {
    const client = new ApolloClient({
      uri:"http://localhost:8080/v1/graphql",
      cache: new InMemoryCache()
    });
    return(
      <ApolloProvider client={client} >
      <div>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            textAlign: "center",
            fontSize: "25px",
            backgroundColor: "#111827",
            color:"white"
          }}
        >
          STUDENT DETAILS MANAGEMENT
        </Header>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/home" component={Home} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
      </ApolloProvider>
    );
  }
}
