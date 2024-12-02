import React, { useState, useEffect } from "react";
import { Button, Row, Col, Typography } from "antd";
import { useNavigate } from 'react-router-dom';
import { GetTransportVehicle } from "../../../services/https";
import { TransportVehiclesInterface } from "../../../interfaces/TransportVehicles";
import Loader from "../../../components/third-patry/Loader"; // Import the Loader component

const { Title, Text } = Typography;

const styles = {
    container: {
      width: '80%',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#E0F7FA', // เปลี่ยนพื้นหลังเป็นสีฟ้าอ่อน
      border: '2px solid #0288D1', // เปลี่ยนกรอบเป็นสีฟ้า
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Kanit, sans-serif',
    },
    title: {
      fontSize: '36px',
      marginBottom: '20px',
      fontFamily: 'Kanit, sans-serif',
    },
    button: {
      width: '100%',
      height: '300px',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#0288D1', // สีพื้นหลังของปุ่มเป็นสีฟ้า
      color: '#fff',
      fontSize: '16px',
      fontFamily: 'Kanit, sans-serif',
    },
    imageWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      transition: 'transform 1s ease-in-out',
      willChange: 'transform',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    text: {
      marginTop: '10px',
      fontSize: '18px',
      fontFamily: 'Kanit, sans-serif',
    },
  };
  

// Utility function to delay for a specific time
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function TransportSearch() {
  const [cars, setCars] = useState<TransportVehiclesInterface[]>([]);
  const [imagesByType, setImagesByType] = useState<Record<string, string[]>>({
    'Truck': [],
    'Boat': [],
    'Airplane': []
  });
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({
    'Truck': 0,
    'Boat': 0,
    'Airplane': 0
  });
  const [intervals, setIntervals] = useState<Record<string, NodeJS.Timeout | null>>({
    'Truck': null,
    'Boat': null,
    'Airplane': null
  });
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();

  const getCars = async () => {
    try {
      const [res] = await Promise.all([GetTransportVehicle(), delay(1250)]); // Ensure at least 1.25 sec delay

      if (res.length > 0) {
        setCars(res);
        const groupedImages: Record<string, string[]> = {
          'Truck': [],
          'Boat': [],
          'Airplane': []
        };
        res.forEach((car: { type: string | number; picture: string; }) => {
          if (groupedImages[car.type]) {
            groupedImages[car.type].push(car.picture);
          }
        });
        setImagesByType(groupedImages);
      } else {
        setCars([]);
        setImagesByType({
          'Truck': [],
          'Boat': [],
          'Airplane': []
        });
      }
    } catch (error) {
      console.error("Failed to fetch transport data", error);
    } finally {
      setLoading(false); // Stop loading after fetching data and delay
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    Object.keys(imagesByType).forEach(type => {
      if (imagesByType[type].length > 0) {
        const interval = setInterval(() => {
          setCurrentImageIndex(prevState => ({
            ...prevState,
            [type]: (prevState[type] + 1) % imagesByType[type].length
          }));
        }, 3000);

        if (intervals[type]) {
          clearInterval(intervals[type] as NodeJS.Timeout);
        }

        setIntervals(prevState => ({
          ...prevState,
          [type]: interval
        }));
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => {
        if (interval) {
          clearInterval(interval);
        }
      });
    };
  }, [imagesByType]);

  const handleTypeClick = (type: string) => {
    navigate(`/transport/type/${type}`);
  };

  if (loading) {
    return <Loader />; // Display loader while data is loading
  }

  return (
    <div style={styles.container}>
      <Title level={1} style={styles.title}>กรุณาเลือกประเภทการขนส่ง</Title>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        {['Truck', 'Boat', 'Airplane'].map(type => (
          <Col xs={24} sm={12} md={8} lg={8} xl={8} style={{ textAlign: 'center' }} key={type}>
            <Button
              style={styles.button}
              onClick={() => handleTypeClick(type)}
            >
              <div
                style={{
                  ...styles.imageWrapper,
                  transform: `translateX(-${currentImageIndex[type] * 100}%)`,
                }}
              >
                {imagesByType[type].map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`transport-${index}`}
                    style={{
                      ...styles.image,
                      transform: `translateX(${currentImageIndex[type] * 100}%)`,
                      position: index === currentImageIndex[type] ? 'relative' : 'absolute',
                      opacity: index === currentImageIndex[type] ? 1 : 0,
                      transition: 'opacity 1s ease-in-out',
                    }}
                  />
                ))}
              </div>
            </Button>
            <Text style={styles.text}>{type}</Text>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default TransportSearch;
