import { useState } from "react";
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
  Image,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TransportCompaniesInterface } from "../../../interfaces/TransportCompanies";
import { CreateTransportCompanies } from "../../../services/https";
import { useNavigate, Link } from "react-router-dom";
import { RcFile } from "antd/es/upload/interface";

const { RangePicker } = DatePicker;

function TransportCompaniesCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [image, setImage] = useState<string | undefined>(undefined);

  const onFinish = async (values: TransportCompaniesInterface) => {
    try {
      if (!image) {
        messageApi.error("กรุณาอัปโหลดรูปภาพ!");
        return;
      }
  
      let payload = {
        ...values,
        photo: image,
      };
  
      console.log("Payload:", payload);
  
      let res = await CreateTransportCompanies(payload);
  
      if (res.status === 200) {
        messageApi.success("สร้างข้อมูลบริษัทสำเร็จ");
        setTimeout(() => navigate("/transportcompanies"), 2000);
      } else {
        console.error("API Error:", res);
        messageApi.error(res.error || "เกิดข้อผิดพลาดในการสร้างข้อมูลบริษัท");
      }
    } catch (error) {
      console.error("System Error:", error);
      messageApi.error("เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่");
    }
  };
  
  

  const handleImageUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <div style={{ fontFamily: 'Kanit, sans-serif', padding: '20px' }}>
      {contextHolder}
      <Card style={{ maxWidth: '80%', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px', color: 'black', fontFamily: 'Kanit, sans-serif' }}>เพิ่มข้อมูลบริษัทขนส่ง</h2>
        <Divider />
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: 'black', fontFamily: 'Kanit, sans-serif' }}>ชื่อบริษัท</span>}
                name="company_name"
                rules={[{ required: true, message: "กรุณากรอกชื่อบริษัท!" }]}
              >
                <Input
                  style={{
                    fontSize: '16px',
                    borderRadius: '8px',
                    border: '1px solid black', // กำหนดกรอบเป็นสีดำ
                    color: 'black', // กำหนดสีตัวอักษรในช่องเป็นสีดำ
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>ติดต่อ</span>}
                name="contact"
                rules={[{ required: true, message: "กรุณากรอกข้อมูลติดต่อ!" }]} >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>อีเมล</span>}
                name="email"
                rules={[{ required: true, type: 'email', message: "กรุณากรอกอีเมลที่ถูกต้อง!" }]} >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>ที่อยู่</span>}
                name="address"
                rules={[{ required: true, message: "กรุณากรอกที่อยู่!" }]} >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>รหัสไปรษณีย์</span>}
                name="postal_code"
                rules={[{ required: true, message: "กรุณากรอกรหัสไปรษณีย์!" }]} >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>วันที่เริ่มต้น</span>}
                name="start_date"
                rules={[{ required: true, message: "กรุณากรอกวันที่เริ่มต้น!" }]} >
                <DatePicker
                  format="MM/DD/YYYY"
                  style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>วันที่สิ้นสุด</span>}
                name="end_date"
                rules={[{ required: true, message: "กรุณากรอกวันที่สิ้นสุด!" }]} >
                <DatePicker
                  format="MM/DD/YYYY"
                  style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>รูปภาพ</span>}
                name="photo">
                <Upload
                  customRequest={({ file, onSuccess }) => {
                    handleImageUpload(file as RcFile);
                    if (onSuccess) {
                      onSuccess();
                    }
                  }}
                  showUploadList={false}>
                  <Button
                    style={{
                      fontSize: '16px',
                      borderRadius: '8px',
                      border: '1px solid black',
                      backgroundColor: '#87CEFA', // สีฟ้าอ่อน
                      color: 'black', // สีของตัวอักษรในปุ่ม
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4682B4')} // สีฟ้าเข้มเมื่อเอาเมาส์ชี้
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#87CEFA')} // กลับเป็นสีฟ้าอ่อนเมื่อเมาส์ออก
                  >
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
              {image && (
                <div style={{
                  marginTop: '16px',
                  textAlign: 'center',
                  borderRadius: '8px',
                  border: '1px solid black',
                  overflow: 'hidden',
                }}>
                  <Image
                    width={300}
                    height={200}
                    src={image}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              )}
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>Vehicle Name</span>}
                name="vehicle_name"
                rules={[{ required: true, message: "กรุณากรอก Vehicle Name!" }]} >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>Vehicle Number</span>}
                name="vehicle_number"
                rules={[{ required: true, message: "กรุณากรอก Vehicle Number!" }]} >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>Container Capacity</span>}
                name="capacity"
                rules={[{ required: true, message: "กรุณากรอก Container Capacity!" }]} >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>Year Of Manufacture</span>}
                name="manufacture"
                rules={[{ required: true, message: "กรุณากรอก Manufacture!" }]} >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>Vehicle Model</span>}
                name="vmodel"
                rules={[{ required: true, message: "กรุณากรอก Model!" }]} >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }} />
              </Form.Item>
            </Col>



            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#black', fontFamily: 'Kanit, sans-serif' }}>Description</span>}
                name="description"
                rules={[{ required: true, message: "กรุณากรอกยานพาหนะ!" }]} >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid black', color: 'black' }} />
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
