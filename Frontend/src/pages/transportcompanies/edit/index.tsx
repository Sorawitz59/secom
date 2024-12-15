import { useState, useEffect } from "react";
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
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TransportCompaniesInterface } from "../../../interfaces/TransportCompanies"; // เปลี่ยนเป็น interface ที่เกี่ยวข้อง
import { GetTransportCompaniesById, UpdateTransportCompaniesById } from "../../../services/https/index"; // เปลี่ยนเป็นฟังก์ชันที่เกี่ยวข้องกับบริษัทขนส่ง
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

function TransportCompaniesEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // ฟังก์ชันดึงข้อมูลบริษัทขนส่งตาม ID
  const getTransportCompanyById = async (id: string) => {
    let res = await GetTransportCompaniesById(id);
    if (res.status == 200) {
      form.setFieldsValue({
        company_name: res.data.company_name,
        address: res.data.address,
        contact: res.data.contact,
        email: res.data.email,
        postal_code: res.data.postal_code,
        start_date: dayjs(res.data.start_date),
        end_date: dayjs(res.data.end_date),
        vehicle_name: res.data.TransportVehicles[0]?.vehicle_name,
        vehicle_number: res.data.TransportVehicles[0]?.vehicle_number,
      });
    } else {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลบริษัทขนส่ง",
      });
      setTimeout(() => {
        navigate("/transportcompanies");
      }, 2000);
    }
  };

  // ฟังก์ชันบันทึกข้อมูลที่แก้ไข
  const onFinish = async (values: TransportCompaniesInterface) => {
    let payload = { ...values };
    const res = await UpdateTransportCompaniesById(id, payload);
    if (res.status == 200) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      setTimeout(() => {
        navigate("/transportcompanies");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  useEffect(() => {
    getTransportCompanyById(id);
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>แก้ไขข้อมูล บริษัทขนส่ง</h2>
        <Divider />
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อบริษัท"
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
                label="อีเมล"
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
                label="เบอร์โทร"
                name="contact"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเบอร์โทร !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ที่อยู่"
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
                label="ตำบล"
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
                label="อำเภอ"
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
                label="จังหวัด"
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
                    message: "กรุณากรอก postal_code !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="วัน/เดือน/ปี เริ่มต้น"
                name="start_date"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกวัน/เดือน/ปี เริ่มต้น !",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="วัน/เดือน/ปี สิ้นสุด"
                name="end_date"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกวัน/เดือน/ปี สิ้นสุด !",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Vehicle"
                name="vehicle_name"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกVehicle !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Number"
                name="vehicle_number"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกNumber !",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                />
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
                  <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                    บันทึก
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

export default TransportCompaniesEdit;
