import React from "react";
import auth from "../authentication/auth";
import { Card } from "antd";
import { Form, Input, Button, Checkbox, Col, Row } from "antd";
import { Helmet } from "react-helmet";

function Login(props) {
  return (
    <div>
      <Helmet>
        <style>{"body { background-color: #111827; }"}</style>
      </Helmet>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "80vh" }}
      >
        <Col>
          <Card hoverable style={{ width: "500px",borderRadius:"10px" }}>
            <h1>ADMIN LOGIN</h1>
            <Form>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    auth.login(() => {
                      props.history.push("/home");
                    });
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Login;
