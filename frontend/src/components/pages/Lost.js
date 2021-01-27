import { React, useState } from "react";
import { Form, Input, Button, Card } from "antd";
import Qrcode from "./Qrcode";
import Modal from "antd/lib/modal/Modal";
import _default from "antd/lib/checkbox/Group";

export default function Lost() {
  const [form] = Form.useForm();

  const [usn, setusn] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    form.resetFields();
    console.log(values);
    setusn(values.usn);
    showModal();
    // alert(JSON.stringify(values,null,2))
  };

  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Card
        hoverable
        style={{
          width: "400px",
          height: "300px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <Form
          {...layout}
          onFinish={onFinish}
          size={_default}
          form={form}
          style={{
            width: "400px",
            height: "100px",
          }}
        >
          <Form.Item
            name="usn"
            label="USN"
            rules={[
              {
                required: true,
                message: "Please input your USN!",
              },
            ]}
            style={{}}
          >
            <Input style={{ width: "200px", borderRadius: "5px" }} />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ borderRadius: "5px" }}
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>

        <Modal
          title="QR code"
          visible={isModalVisible}
          footer={[<Button onClick={handleOk}>OK</Button>]}
        >
          <Qrcode usn={usn} />
        </Modal>
      </Card>
    </div>
  );
}
