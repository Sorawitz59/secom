import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message, Image, Modal, Input, Select } from "antd";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { GetTransportCompanies, GetTransportCompaniesById, GetTransportVehicle, GetTransportVehicleById, DeleteTransportCompaniesById } from "../../services/https/index"; // เพิ่มฟังก์ชัน DeleteTransportCompany
import { TransportCompaniesInterface } from "../../interfaces/TransportCompanies";
import { TransportVehiclesInterface } from "../../interfaces/TransportVehicles";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function TransportCompanies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<TransportCompaniesInterface[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<TransportCompaniesInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<TransportCompaniesInterface | null>(null);
  const [associatedVehicles, setAssociatedVehicles] = useState<TransportVehiclesInterface[]>([]);

  // Fetch transport companies
  const getTransportCompanies = async () => {
    try {
      const res = await GetTransportCompanies();
      if (res.status === 200) {
        setCompanies(res.data);
        setFilteredCompanies(res.data);
      } else {
        messageApi.error(res.data.error);
      }
    } catch (error) {
      messageApi.error("ไม่สามารถดึงข้อมูลบริษัทได้");
    }
  };

  // Fetch transport vehicles for a specific company
  const getTransportVehiclesByCompany = async (companyId: string) => {
    try {
      const res = await GetTransportVehicleById(companyId);
      if (res.status === 200) {
        setAssociatedVehicles(res.data);
      } else {
        messageApi.error("ไม่พบข้อมูลรถยนต์สำหรับบริษัทนี้");
      }
    } catch (error) {
      messageApi.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  // Delete transport company
  const handleDeleteCompany = async (companyId: string) => {
    try {
      const res = await DeleteTransportCompaniesById(companyId);
      if (res.status === 200) {
        messageApi.success("ลบบริษัทขนส่งเรียบร้อย");
        // Reload the companies after deletion
        getTransportCompanies();
      } else {
        messageApi.error("ลบข้อมูลล้มเหลว");
      }
    } catch (error) {
      messageApi.error("เกิดข้อผิดพลาดในการลบข้อมูล");
    }
  };

  useEffect(() => {
    getTransportCompanies();
  }, []);

  // Show details for a selected company
  const handleShowDetails = async (record: TransportCompaniesInterface) => {
    setSelectedCompany(record);
    await getTransportVehiclesByCompany(record.ID);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
    setAssociatedVehicles([]);
  };

  // Handle search filter
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = companies.filter((company) =>
      company.company_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  // Handle sort change
  const handleSortChange = (value: "ascend" | "descend" | null) => {
    setSortOrder(value);
  };

  // Update filtered companies on search or sort change
  useEffect(() => {
    const sortedCompanies = [...filteredCompanies].sort((a, b) =>
      sortOrder === "ascend"
        ? a.company_name.localeCompare(b.company_name)
        : sortOrder === "descend"
        ? b.company_name.localeCompare(a.company_name)
        : 0
    );

    setFilteredCompanies(sortedCompanies);
  }, [sortOrder, searchText, companies]);

  const columns: ColumnsType<TransportCompaniesInterface> = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text) => text ? <Image width={50} src={text} alt="Company Logo" /> : "-",
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Vehicles",
      dataIndex: "vehicle_name",
      key: "vehicle_name",
      render: (text, record) => (
        <ul>
          {record.transportvehicle?.map((transportvehicle, idx) => (
            <li key={idx}>{transportvehicle.vehicle_name}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Edit",
      render: (record) => (
        <Link to={`/transportcompanies/edit/${record.ID}`}>
          <Button type="default">Edit</Button>
        </Link>
      ),
    },
    {
      title: "Delete",
      render: (record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteCompany(record.ID)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <h2>จัดการบริษัทขนส่ง</h2>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
        <Col span={12} style={{ textAlign: "left" }}>
          <Select
            placeholder="เรียงลำดับ"
            style={{ width: 200 }}
            onChange={handleSortChange}
            allowClear
          >
            <Option value="ascend">เรียงจาก A-Z</Option>
            <Option value="descend">เรียงจาก Z-A</Option>
          </Select>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => navigate("/transportcompanies/create")}
          >
            เพิ่มข้อมูลใหม่
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: 10, textAlign: "right" }}>
        <Col span={24}>
          <Input.Search
            placeholder="ค้นหาชื่อบริษัท"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
        </Col>
      </Row>

      <Divider />
      <div style={{ marginTop: 20 }}>
        {filteredCompanies.length === 0 ? (
          <p>ไม่พบข้อมูลที่ค้นหา</p>
        ) : (
          <Table
            rowKey="ID"
            columns={columns}
            dataSource={filteredCompanies}
            style={{ width: "100%" }}
          />
        )}
      </div>
    </>
  );
}

export default TransportCompanies;
