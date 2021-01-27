import { React, useState } from "react";
import moment from "moment";
import { Form, Button, Space, Select } from "antd";
import { Drawer, List, Avatar, Divider, Col, Row, Card, Collapse } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { gql, useLazyQuery } from "@apollo/client";
const { Option } = Select;
const { Panel } = Collapse;

const q = gql`
  query MyQuery($branch: [String!], $sem: [Int!]) {
    students(
      where: { branch: { _in: $branch }, _and: { sem: { _in: $sem } } }
    ) {
      name
      usn
      dob
      cgpa
      branch
      email
      phno
      sem
      year_of_adm
      projects {
        project_desc
        project_domain
        project_end
        project_id
        project_link
        project_start
        project_title
      }
    }
  }
`;

export default function AllStudents() {
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p
        className="site-description-item-profile-p-label"
        style={{ fontWeight: "bold", fontSize: "18px" }}
      >
        {title} : {content}
      </p>
    </div>
  );

  const [student, setStudent] = useState({});
  const [drawerVisible, setdrawerVisible] = useState(false);

  const showDrawer = (e) => {
    for (let i = 0; i < data.students.length; i++) {
      if (`${e.currentTarget.value}` === data.students[i].usn) {
        console.log(data.students[i]);
        setStudent(data.students[i]);
        break;
      }
    }
    setdrawerVisible(true);
  };

  const onClose = () => {
    setdrawerVisible(false);
  };

  const [getStudents, { loading, data }] = useLazyQuery(q);

  const onFinish = (values) => {
    console.log(values);
    getStudents({
      variables: {
        branch: values.branch,
        sem: values.sem,
      },
    });
    console.log(data);
  };

  if (loading) return <p>loading...</p>;

  return (
    <>
      <div
        style={{
          minHeight: "75vh",
          minWidth: "100%",
          // justifyContent: "center"
        }}
      >
        <div
          style={{
            minHeight: "100%",
            minWidth: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems:"center"
          }}
        >
          <Space wrap>
            <Form
              name="customized_form_controls"
              layout="inline"
              onFinish={onFinish}
            >
              <Form.Item
                name="sem"
                label={<h3 style={{color:"white", fontWeight:"bolder"}}>Sem</h3>}
                rules={[
                  {
                    required: true,
                    message: "Please input your sem!",
                  },
                ]}
              >
                
                <Select
                  mode="tags"
                  style={{ width: "200px", borderRadius: "5px" }}
                  placeholder="Select branch"
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  <Option value="6">6</Option>
                  <Option value="7">7</Option>
                  <Option value="8">8</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="branch"
                label={<h3 style={{color:"white", fontWeight:"bolder"}}>Branch</h3>}

                rules={[
                  {
                    required: true,
                    message: "Please select a branch!",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  style={{ width: "200px", borderRadius: "5px" }}
                  placeholder="Select branch"
                >
                  <Option value="CSE">Computer Science</Option>
                  <Option value="ECE">Electronics & Communication</Option>
                  <Option value="CIV">Civil</Option>
                  <Option value="TEX">Textile</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ borderRadius: "5px" }}
                >
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </div>

        {data && (
          <>
            <List
              grid={{
                xs: 1,
                sm: 3,
                md: 4,
                lg: 3,
                xl: 3,
                xxl: 3,
              }}
              style={{ padding: "30px" }}
              dataSource={data.students}
              renderItem={(item) => (
                <List.Item
                  key={item.usn}
                  style={{
                    padding: "15px",
                    paddingBottom: "5px",
                    marginBottom: "0px",
                  }}
                >
                  <Card>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                        }
                        title={
                          <h3 style={{ fontWeight: "bold" }}>{item.name}</h3>
                        }
                        description={
                          <a>
                            {item.usn} , {item.sem}sem {item.branch}
                          </a>
                        }
                      />
                      <Button type="link" onClick={showDrawer} value={item.usn}>
                        View Profile
                      </Button>
                    </div>
                  </Card>
                </List.Item>
              )}
            />

            <Drawer
              width={640}
              placement="right"
              closable={true}
              onClose={onClose}
              visible={drawerVisible}
            >
              <p
                className="site-description-item-profile-p"
                style={{
                  marginBottom: "24px",
                  fontWeight: "bolder",
                  fontSize: "22px",
                }}
              >
                Student Profile
              </p>
              <p
                className="site-description-item-profile-p"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Personal
              </p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Full Name" content={student.name} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="USN" content={student.usn} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Date Of Birth"
                    content={student.dob}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Year Of Admission"
                    content={student.year_of_adm}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Semester" content={student.sem} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Branch" content={student.branch} />
                </Col>
              </Row>
              <Divider />
              <p
                className="site-description-item-profile-p"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Projects
              </p>

              {student.projects &&
                student.projects.map((project, index) => {
                  return (
                    <div>
                      <Collapse collapsible="header" ghost>
                        <Panel
                          header={
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <a style={{ fontWeight: "bold", fontSize: "18px" }}>
                              Project {index + 1}
                            </a>
                          }
                          key={index + 1}
                        >
                          <Row>
                            <Col span={12}>
                              <DescriptionItem
                                title="Title"
                                content={project.project_title}
                              />
                            </Col>
                            <Col span={12}>
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
                                content={moment(project.project_start).format(
                                  "MMM YYYY"
                                )}
                              />
                            </Col>
                            <Col span={12}>
                              <DescriptionItem
                                title="End"
                                content={moment(project.project_end).format(
                                  "MMM YYYY"
                                )}
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
                    </div>
                  );
                })}
              <Divider />
              <p
                className="site-description-item-profile-p"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Contacts
              </p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Email" content={student.email} />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Phone Number"
                    content={student.phno}
                  />
                </Col>
              </Row>
            </Drawer>
          </>
        )}
      </div>
    </>
  );
}
