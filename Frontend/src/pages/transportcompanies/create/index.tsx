import {
    Space,
    Button,
    Col,
    Row,
    Divider,
    Form,
    Input,
    Card,
    message,
    DatePicker,
  } from "antd";
  
  import { useState } from "react";
  import { PlusOutlined } from "@ant-design/icons";
  import { TransportCompaniesInterface } from "../../../interfaces/TransportCompanies";
  import { CreateTransportCompanies } from "../../../services/https";
  import { useNavigate, Link } from "react-router-dom";
  
  function TransportCompaniesCreate() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
  
    const onFinish = async (values: TransportCompaniesInterface) => {
      let res = await CreateTransportCompanies(values);
  
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });
        setTimeout(() => {
          navigate("/transportcompanies");
        }, 2000);
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        });
      }
    };
  
    return (
      <div>
        {contextHolder}
  
        <Card>
          <h2>เพิ่มข้อมูลบริษัทขนส่ง</h2>
          <Divider />
  
          <Form
            name="transport-companies-form"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="Company Name"
                  name="company_name"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกชื่อบริษัท !",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="Contact"
                  name="contact"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกข้อมูลติดต่อ !",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "รูปแบบอีเมลไม่ถูกต้อง !",
                    },
                    {
                      required: true,
                      message: "กรุณากรอกอีเมล !",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกที่อยู่ !",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="Postal Code"
                  name="postal_code"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกรหัสไปรษณีย์ !",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="Start Date"
                  name="start_date"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาเลือกวันที่เริ่มดำเนินการ !",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item label="End Date" name="end_date">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
  
            <Row justify="end">
              <Col style={{ marginTop: "40px" }}>
                <Form.Item>
                  <Space>
                    <Link to="/transportcompanies">
                      <Button htmlType="button" style={{ marginRight: "10px" }}>
                        ยกเลิก
                      </Button>
                    </Link>
  
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<PlusOutlined />}
                    >
                      ยืนยัน
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
  
  export default TransportCompaniesCreate;
  