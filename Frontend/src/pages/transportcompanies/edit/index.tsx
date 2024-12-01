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
  Upload,
  DatePicker,
  Select,
} from "antd";
import { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { GetTransportCompaniesById, UpdateTransportCompaniesById } from "../../../services/https";

function TransportCompaniesEdit() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState<File | null>(null);
  const [initialValues, setInitialValues] = useState<any>(null);
  const { id } = useParams(); // รับ ID จาก URL

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const res = await GetTransportCompaniesById(id!); // ส่ง ID ไปยัง API เพื่อดึงข้อมูลบริษัท
        if (res.status === 200) {
          setInitialValues(res.data);
        } else {
          messageApi.error("ไม่สามารถดึงข้อมูลได้");
        }
      } catch (err) {
        console.error("Error:", err);
        messageApi.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    if (id) {
      fetchCompanyData();
    } else {
      messageApi.error("ไม่พบ ID ของบริษัท");
    }
  }, [id, messageApi]);

  const handleFileChange = (info: any) => {
    const isImage = info.file.type.startsWith("image/");
    if (!isImage) {
      messageApi.error("กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น");
      return;
    }
    setFile(info.file.originFileObj);
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("company_name", values.company_name);
    formData.append("contact", values.contact);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("postal_code", values.postal_code);
    formData.append("start_date", values.start_date ? values.start_date.format("YYYY-MM-DD") : "");
    formData.append("end_date", values.end_date ? values.end_date.format("YYYY-MM-DD") : "");

    if (file) {
      formData.append("photo", file);
    }

    try {
      const res = await UpdateTransportCompaniesById(id!, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        messageApi.success("แก้ไขข้อมูลบริษัทขนส่งสำเร็จ");
        setTimeout(() => navigate("/transportcompanies"), 2000);
      } else {
        messageApi.error(res.data?.error || "ไม่สามารถแก้ไขข้อมูลได้");
      }
    } catch (err) {
      console.error("Error:", err);
      messageApi.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
    }
  };

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>แก้ไขข้อมูลบริษัทขนส่ง</h2>
        <Divider />
        {initialValues ? (
          <Form
            name="edit"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            initialValues={initialValues}
          >
            <Row gutter={[16, 0]}>
              {/* อัพโหลดโลโก้ */}
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item label="อัพโหลดโลโก้บริษัท" name="photo">
                  <Upload
                    beforeUpload={() => false}
                    onChange={handleFileChange}
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>อัพโหลด</Button>
                  </Upload>
                </Form.Item>
              </Col>
              {/* ชื่อบริษัท */}
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="ชื่อบริษัท"
                  name="company_name"
                  rules={[{ required: true, message: "กรุณากรอกชื่อบริษัท!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              {/* ข้อมูลการติดต่อ */}
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="ติดต่อ"
                  name="contact"
                  rules={[{ required: true, message: "กรุณากรอกข้อมูลการติดต่อ!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              {/* อีเมล */}
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="อีเมล"
                  name="email"
                  rules={[{ type: "email", message: "กรุณากรอกอีเมลที่ถูกต้อง!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              {/* ที่อยู่ */}
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "กรุณากรอกที่อยู่!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              {/* รหัสไปรษณีย์ */}
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="รหัสไปรษณีย์"
                  name="postal_code"
                  rules={[{ required: true, message: "กรุณากรอกรหัสไปรษณีย์!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              {/* วันเริ่มต้นและวันสิ้นสุด */}
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="วันที่เริ่มต้น"
                  name="start_date"
                  rules={[{ required: true, message: "กรุณาเลือกวันที่เริ่มต้น!" }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="วันที่สิ้นสุด"
                  name="end_date"
                  rules={[{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">บันทึกการแก้ไข</Button>
                <Button onClick={() => navigate("/transportcompanies")}>ยกเลิก</Button>
              </Space>
            </Form.Item>
          </Form>
        ) : (
          <p>กำลังโหลดข้อมูล...</p>
        )}
      </Card>
    </div>
  );
}

export default TransportCompaniesEdit;
