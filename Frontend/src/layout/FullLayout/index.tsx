import React, { useState } from "react";

import { Routes, Route, Link } from "react-router-dom";

import "../../App.css";

import { UserOutlined, DashboardOutlined, SearchOutlined } from "@ant-design/icons";

import { Breadcrumb, Layout, Menu, Button, message } from "antd";

import logo from "../../assets/logo.png";

import Dashboard from "../../pages/dashboard";

import Customer from "../../pages/customer";

import CustomerCreate from "../../pages/customer/create";

import CustomerEdit from "../../pages/customer/edit";

import TransportCompanies from "../../pages/transportcompanies";

import TransportCompaniesCreate from "../../pages/transportcompanies/create";

import TransportCompaniesEdit from "../../pages/transportcompanies/edit";

import TransportForm from "../../pages/transportcompanies/form";

import TransportSeacrh from "../../pages/transportcompanies/search";

const { Header, Content, Footer, Sider } = Layout;

const FullLayout: React.FC = () => {
  const page = localStorage.getItem("page");
  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  const Logout = () => {
    localStorage.clear();
    messageApi.success("Logout successful");
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#DAD6EF" }}>
      {contextHolder}

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: "#4A90E2" }} // เปลี่ยนสีพื้นหลัง Sider เป็นสีฟ้า
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <img src={logo} alt="Logo" style={{ width: "80%" }} />
            </div>
            <Menu
              theme="dark"
              defaultSelectedKeys={[page ? page : "dashboard"]}
              mode="inline"
              style={{ background: "#4A90E2", color: "#fff" }} // เปลี่ยนสีพื้นหลังและข้อความของเมนู
            >
              <Menu.Item
                key="dashboard"
                onClick={() => setCurrentPage("dashboard")}
              >
                <Link to="/" style={{ color: "#fff" }}> {/* เปลี่ยนสีข้อความเป็นสีขาว */}
                  <DashboardOutlined />
                  <span>แดชบอร์ด</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                key="customer"
                onClick={() => setCurrentPage("customer")}
              >
                <Link to="/customer" style={{ color: "#fff" }}> {/* เปลี่ยนสีข้อความเป็นสีขาว */}
                  <UserOutlined />
                  <span>ข้อมูลสมาชิก</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                key="transportcompanies"
                onClick={() => setCurrentPage("transportcompanies")}
              >
                <Link to="/transportcompanies" style={{ color: "#fff" }}> {/* เปลี่ยนสีข้อความเป็นสีขาว */}
                  <UserOutlined />
                  <span>Company</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                key="transportsearch"
                onClick={() => setCurrentPage("transportsearch")}
              >
                <Link to="/transportcompanies/search" style={{ color: "#fff" }}> {/* เปลี่ยนสีข้อความเป็นสีขาว */}
                  <SearchOutlined />
                  <span>Search</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>

          <Button
            onClick={Logout}
            style={{
              margin: 4,
              background: "#4A90E2", // เปลี่ยนสีปุ่มเป็นสีฟ้า
              color: "#fff", // เปลี่ยนสีข้อความปุ่มเป็นสีขาว
              border: "none",
            }}
          >
            ออกจากระบบ
          </Button>
        </div>
      </Sider>


      <Layout>
        <Header style={{ padding: 0, background: "#DAD6EF" }} />
        <Content style={{ margin: "0 16px", background: "#DAD6EF" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: "#DAD6EF",
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/customer/create" element={<CustomerCreate />} />
              <Route path="/customer/edit/:id" element={<CustomerEdit />} />


              <Route path="/transportcompanies" element={<TransportCompanies />} />
              <Route path="/transportcompanies/form" element={<TransportForm />} />
              <Route path="/transportcompanies/search" element={<TransportSeacrh />} />
              <Route path="/transportcompanies/create" element={<TransportCompaniesCreate />} />
              <Route path="/transportcompanies/edit/:id" element={<TransportCompaniesEdit />} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#DAD6EF",
          }}
        >
          HarryFaster
        </Footer>
      </Layout>
    </Layout>
  );
};

export default FullLayout;