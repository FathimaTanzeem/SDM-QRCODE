import { React, useState } from "react";
import { Form, Input, Button, InputNumber, DatePicker, Card } from "antd";
import { gql, useMutation } from "@apollo/client";
import Qrcode from "./Qrcode";
import Modal from "antd/lib/modal/Modal";
import _default from "antd/lib/checkbox/Group";

const m = gql`
  mutation MyMutation($object: students_insert_input!) {
    insert_students_one(object: $object) {
      usn
    }
  }
`;

function Register() {


  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };


  const [form] = Form.useForm();

  const [usn, setusn] = useState("");

  const [addStudent] = useMutation(m);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    form.resetFields();
    // alert(JSON.stringify(values,null,2))
    addStudent({
      variables: {
        object: values,
      },
    }).then((value) => {
      console.log(value);
      setusn(value.data.insert_students_one.usn);
      showModal();
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  function onChange(value) {
    console.log("changed", value);
  }

  function onDate(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#111827"
      }}
    >
      <Card hoverable
        style={{
          width: "500px",
          height: "650px",
          display: "flex",
          alignItems: "center",
          borderRadius:"10px",
          textAlign:"center"
        }}
      >
        <h2 style={{marginLeft:"50px",fontWeight:"bold"}}>STUDENT REGISTRATION</h2>
        <Form
         {...layout}
          onFinish={onFinish}
          size={_default}
          style={{
            width: "400px",
            height: "550px",
            // textAlign:"left"
          }}
          form={form}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input style={{ width: "250px", borderRadius: "5px" }} />
          </Form.Item>
          <Form.Item
            name="dob"
            label="DOB"
            rules={[
              {
                required: true,
                message: "Please input your date of birth",
              },
            ]}
          >
            <DatePicker
              onChange={onDate}
              style={{ width: "250px", borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item
            name="branch"
            label="Branch"
            rules={[
              {
                required: true,
                message: "Please input your branch!",
                whitespace: true,
              },
            ]}
          >
            <Input style={{ width: "250px", borderRadius: "5px" }} />
          </Form.Item>
          <Form.Item
            name="year_of_adm"
            label="Year of ADM"
            rules={[
              {
                required: true,
                message: "Please input your year of admission!",
                whitespace: true,
              },
            ]}
          >
            <Input style={{ width: "250px", borderRadius: "5px" }} />
          </Form.Item>
          <Form.Item
            name="sem"
            label="Sem"
            rules={[
              {
                required: true,
                message: "Please input your sem!",
              },
            ]}
          >
            <InputNumber
              min={1}
              max={8}
              onChange={onChange}
              style={{ width: "250px", borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item
            name="usn"
            label="USN"
            rules={[
              {
                required: true,
                message: "Please input your >usn!",
              },
            ]}
          >
            <Input style={{ width: "250px", borderRadius: "5px" }} />
          </Form.Item>
          <Form.Item
            name="cgpa"
            label="CGPA"
            rules={[
              {
                required: true,
                message: "Please input your cgpa!",
              },
            ]}
          >
            <InputNumber
              min={1}
              max={10}
              onChange={onChange}
              style={{ width: "250px", borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input style={{ width: "250px", borderRadius: "5px" }} />
          </Form.Item>
          <Form.Item
            name="phno"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input style={{ width: "250px", borderRadius: "5px" }} />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form.Item
            {...tailLayout}
            >
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
      </Card>
      <Modal
        title="QR code"
        visible={isModalVisible}
        style={{borderRadius:"10px"}}
        footer={[<Button onClick={handleOk}>OK</Button>]}
      >
        <Qrcode usn={usn} />
      </Modal>
    </div>
  );
}

export default Register;