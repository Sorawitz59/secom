import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message, Card } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetUsers, DeleteUsersById } from "../../services/https/index";
import { UsersInterface } from "../../interfaces/IUser";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function Customers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const myId = localStorage.getItem("id");

  const columns: ColumnsType<UsersInterface> = [
    {
      title: "",
      render: (record) => (
        <>
          {myId === record?.ID ? null : (
            <Button
              type="dashed"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteUserById(record.ID)}
            />
          )}
        </>
      ),
    },
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ชื่อ",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "นามสกุุล",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "วัน/เดือน/ปี เกิด",
      key: "birthday",
      render: (record) => <>{dayjs(record.birthday).format("DD/MM/YYYY")}</>,
    },
    {
      title: "อายุ",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "เพศ",
      key: "gender",
      render: (record) => <>{record?.gender?.gender}</>,
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "ชื่อบริษัท",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "",
      render: (record) => (
        <Button
          type="primary"
          onClick={() => navigate(`/customer/edit/${record.ID}`)}
        >
          แก้ไขข้อมูล
        </Button>
      ),
    },
  ];

  const deleteUserById = async (id: string) => {
    let res = await DeleteUsersById(id);

    if (res.status === 200) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      await getUsers();
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const getUsers = async () => {
    let res = await GetUsers();

    if (res.status === 200) {
      setUsers(res.data);
    } else {
      setUsers([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {contextHolder}

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2>จัดการข้อมูลสมาชิก</h2>
        </Col>

        <Col span={24} style={{ textAlign: "end" }}>
          <Space>
            <Link to="/customer/create">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้างข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        {users.map((user) => (
          <Col key={user.ID} xs={24} md={12} lg={8}>
            <Card
              title={`${user.first_name} ${user.last_name}`}
              bordered={true}
              actions={[
                <Button
                  type="link"
                  onClick={() => navigate(`/customer/edit/${user.ID}`)}
                >
                  แก้ไขข้อมูล
                </Button>,
              ]}
            >
              <p>วันเกิด: {dayjs(user.birthday).format("DD/MM/YYYY")}</p>
              <p>อายุ: {user.age}</p>
              <p>เพศ: {user.gender?.gender}</p>
              <p>อีเมล: {user.email}</p>
              <p>เบอร์โทร: {user.contact}</p>
              <p>ชื่อบริษัท: {user.company}</p>
              {myId !== user.ID && (
                <Button
                  type="dashed"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => deleteUserById(user.ID)}
                >
                  ลบ
                </Button>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Customers;
