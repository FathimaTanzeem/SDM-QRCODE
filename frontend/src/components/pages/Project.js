import { React, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Input, Button, DatePicker, Card } from "antd";
import Modal from "antd/lib/modal/Modal";
import _default from "antd/lib/checkbox/Group";

const m = gql`
  mutation MyMutation($object: projects_insert_input!) {
    insert_projects_one(object: $object) {
      project_id
    }
  }
`;

function Project() {

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const [form] = Form.useForm();

  const { TextArea } = Input;

  const monthFormat = "YYYY/MM";

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [addProject] = useMutation(m);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    form.resetFields();
    // alert(JSON.stringify(values,null,2))
    addProject({
      variables: {
        object: values,
      },
    }).then((value) => {
      showModal();
    });
  };

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
        minHeight: "40vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card hoverable
        style={{
          width: "500px",
          height: "550px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: "10px",
          textAlign:"center"
        }}
      >
        <h2 style={{fontWeight:"bold"}}>PROJECT DETAILS</h2>

        <Form
          {...layout}
          onFinish={onFinish}
          size={_default}
          style={{ width: "400px", height: "450px" }}
          form={form}
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
          >
            <Input style={{ width: "250px", borderRadius: "5px" }} />
          </Form.Item>

          <Form.Item
            name="project_domain"
            label="Domain"
            rules={[
              {
                required: true,
                message: "Please input your project domain",
              },
            ]}
          >
            <Input style={{ width: "250px", borderRadius: "5px" }} />
          </Form.Item>

          <Form.Item
            name="project_title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input your project title!",
                whitespace: true,
              },
            ]}
          >
            <Input style={{ width: "250px", borderRadius: "5px" }} />
          </Form.Item>

          <Form.Item
            name="project_desc"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input your project description!",
              },
            ]}
          >
            <TextArea
              onChange={onChange}
              autoSize={{ minRows: 2, maxRows: 5 }}
              style={{ width: "250px", borderRadius: "5px" }}
            />
          </Form.Item>

          <Form.Item
            name="project_start"
            label="Start date"
            rules={[
              {
                required: true,
                message: "Please input your project start date!",
              },
            ]}
          >
            <DatePicker
              format={monthFormat}
              picker="month"
              onChange={onDate}
              style={{ width: "250px", borderRadius: "5px" }}
            />
          </Form.Item>

          <Form.Item
            name="project_end"
            label="End date"
            rules={[
              {
                required: true,
                message: "Please input your project end date!",
              },
            ]}
          >
            <DatePicker
              format={monthFormat}
              picker="month"
              onChange={onDate}
              style={{ width: "250px", borderRadius: "5px" }}
            />
          </Form.Item>

          <Form.Item
            name="project_link"
            label="Link"
            rules={[
              {
                required: false,
                message: "Please input your project link if any!",
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
        visible={isModalVisible}
        footer={[<Button onClick={handleOk} size="middle" type="primary">OK</Button>]}
        style={{ justifyContent: "center", borderRadius: "5px" }}
      >
        Your project is added successfully
      </Modal>
    </div>
  );
}

export default Project;
