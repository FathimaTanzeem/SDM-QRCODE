import React, { useState } from "react";
import QrReader from "react-qr-reader";
import {
  Drawer,
  List,
  Avatar,
  Divider,
  Col,
  Row,
  Collapse,
  Button,
  Table,
  Tag,
  Space,
} from "antd";
import { gql, useLazyQuery } from "@apollo/client";

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
const text = "HELLO NIDHI !";
const Student = gql`
  query MyQuery($usn: String!) {
    students(where: { usn: { _eq: $usn } }) {
      name
      usn
      dob
      year_of_adm
      branch
      sem
      cgpa
      email
      phno
    }
    projects(where: { usn: { _eq: $usn } }) {
      project_desc
      project_domain
      project_end
      project_id
      project_link
      project_start
      project_title
    }
  }
`;

function Details() {
  const [result, setResult] = useState("No result");
  const [visible, setVisible] = useState(false);
  const [childrenDrawer, setchildrenDrawer] = useState(false);
  const [pro, setPro] = useState(0);
  const setProject = (pro) => {
    setPro(pro);
    console.log(pro);
  };
  const [getStudent, { loading, data }] = useLazyQuery(Student);
  console.log(data);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const showChildrenDrawer = () => {
    setchildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setchildrenDrawer(false);
    setPro(0);
  };

  const handleScan = (result) => {
    // this.setState({
    //   result: "WELCOME TO WT-MINI-PROJECT",
    // });

    if (result) {
      setResult(result);
      console.log(result);
      getStudent({
        variables: {
          usn: result,
        },
      });
    }
  };
  const handleError = (err) => {
    console.log(err);
  };

  const previewStyle = {
    height: 350,
    width: 350,
    display: "flex",
    "justify-content": "center",
  };
  const camStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  const columns = [{ dataIndex: "project_title", key: "project_title" }];

  return (
    <div style={{ minHeight: "75vh" }}>
      <div style={camStyle}>
        <QrReader
          delay={500}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      </div>
      <br />
      {loading && <p>loading</p>}
      {data && (
        <div style={{ justifyContent: "center" }}>
          <List
            dataSource={data.students}
            style={{ width: "600px", marginLeft: "26.5%" }}
            bordered
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <a onClick={showDrawer} key={`a-${item.id}`}>
                    View Profile
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  }
                  title={
                    <h3 style={{ color: "white", fontWeight: "bold" }}>
                      {item.name}
                    </h3>
                  }
                  description={
                    <h4 style={{ color: "white" }}>{item.branch}</h4>
                  }
                />
              </List.Item>
            )}
          />

          <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <p
              className="site-description-item-profile-p"
              style={{ marginBottom: 24,fontWeight:"bolder",fontSize:"20px" }}
            >
              Student Profile
            </p>
            <p className="site-description-item-profile-p"
            style={{fontWeight:"bold",fontSize:"15px"}}>Personal</p>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Full Name"
                  content={data.students[0].name}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem title="USN" content={data.students[0].usn} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Birthday"
                  content={data.students[0].dob}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Year of Admission"
                  content={data.students[0].year_of_adm}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Semester"
                  content={data.students[0].sem}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Branch"
                  content={data.students[0].branch}
                />
              </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p"
            style={{fontWeight:"bold",fontSize:"15px"}}>Project</p>
            {data.projects &&
              data.projects.map((project, index) => {
                return (
                  <div>
                    <Space>
                      <Collapse ghost>
                        <Panel
                          header={<a>Project {index + 1}</a>}
                          key={index + 1}
                        >
                          <Row>
                            <Col span={24}>
                              <DescriptionItem
                                title="Project"
                                content={project.project_title}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <DescriptionItem
                                title="Domain"
                                content={project.project_domain}
                              />
                            </Col>
                          </Row>
                          <Row>
                          <Col span={12}>
                              <DescriptionItem
                                title="Start"
                                content={project.project_start}
                              />
                            </Col>
                            <Col span={12}>
                              <DescriptionItem
                                title="End"
                                content={project.project_end}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <DescriptionItem
                                title="Description"
                                content={project.project_desc}
                              />
                            </Col>
                          </Row>
                        </Panel>
                      </Collapse>
                    </Space>
                  </div>
                );
              })}
            <Divider />
            <p className="site-description-item-profile-p"
            style={{fontWeight:"bold",fontSize:"15px"}}>Contact</p>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Email"
                  content={data.students[0].email}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Phone Number"
                  content={data.students[0].phno}
                />
              </Col>
            </Row>
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default Details;
