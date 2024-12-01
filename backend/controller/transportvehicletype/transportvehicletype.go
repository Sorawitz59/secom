package transportvehicletype

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/sa-67-example/config"
	"example.com/sa-67-example/entity"
)

// GetAllTransportVehicleTypes - ดึงข้อมูลประเภทยานพาหนะทั้งหมด
func GetAllTransportVehicleTypes(c *gin.Context) {
	var vehicleTypes []entity.TransportVehicleType

	db := config.DB()

	// ดึงข้อมูลประเภทยานพาหนะทั้งหมด
	results := db.Preload("TransportVehicles").Find(&vehicleTypes)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// ส่ง JSON ที่ดึงได้กลับไป
	c.JSON(http.StatusOK, gin.H{"data": vehicleTypes})
}

// CreateTransportVehicleType - สร้างประเภทยานพาหนะใหม่
func CreateTransportVehicleType(c *gin.Context) {
	var vehicleType entity.TransportVehicleType

	// รับข้อมูล JSON ที่ส่งมาจาก client
	if err := c.ShouldBindJSON(&vehicleType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// บันทึกประเภทยานพาหนะใหม่ลงในฐานข้อมูล
	db := config.DB()
	if result := db.Create(&vehicleType); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create transport vehicle type"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transport vehicle type created successfully", "data": vehicleType})
}

// UpdateTransportVehicleType - แก้ไขข้อมูลประเภทยานพาหนะ
func UpdateTransportVehicleType(c *gin.Context) {
	var vehicleType entity.TransportVehicleType
	vehicleTypeID := c.Param("id")

	// ค้นหาข้อมูลประเภทยานพาหนะที่ต้องการแก้ไข
	db := config.DB()
	if result := db.First(&vehicleType, vehicleTypeID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transport vehicle type not found"})
		return
	}

	// รับข้อมูล JSON ที่ส่งมาจาก client เพื่ออัปเดตข้อมูลประเภทยานพาหนะ
	if err := c.ShouldBindJSON(&vehicleType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// บันทึกข้อมูลประเภทยานพาหนะที่อัปเดต
	if result := db.Save(&vehicleType); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update transport vehicle type"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transport vehicle type updated successfully", "data": vehicleType})
}

// DeleteTransportVehicleType - ลบประเภทยานพาหนะ
func DeleteTransportVehicleType(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	// ลบประเภทยานพาหนะจากฐานข้อมูล
	if tx := db.Exec("DELETE FROM transport_vehicle_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Transport vehicle type not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transport vehicle type deleted successfully"})
}
