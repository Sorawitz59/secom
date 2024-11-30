package transportvehicle

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/sa-67-example/config"
	"example.com/sa-67-example/entity"
)

// GetAllTransportVehicles - ดึงข้อมูลรถขนส่งทั้งหมด
func GetAlltransportvehicle(c *gin.Context) {
	var vehicles []entity.TransportVehicle

	db := config.DB()

	// ดึงข้อมูลรถขนส่งทั้งหมด
	results := db.Find(&vehicles)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, vehicles)
}

// GetTransportVehicle - ดึงข้อมูลรถขนส่งตาม ID
func Gettransportvehicle(c *gin.Context) {
	ID := c.Param("id")
	var vehicle entity.TransportVehicle
	
	db := config.DB()

	// ค้นหารถขนส่งโดย ID
	results := db.First(&vehicle, ID)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// ตรวจสอบว่ามีรถขนส่งหรือไม่
	if vehicle.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}

	c.JSON(http.StatusOK, vehicle)
}

// CreateTransportVehicle - สร้างรถขนส่งใหม่
func Createtransportvehicle(c *gin.Context) {
	var vehicle entity.TransportVehicle

	// รับข้อมูล JSON ที่ส่งมาจาก client
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// บันทึกข้อมูลรถขนส่งใหม่ลงในฐานข้อมูล
	db := config.DB()
	if result := db.Create(&vehicle); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create transport vehicle"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transport vehicle created successfully", "vehicle": vehicle})
}

// UpdateTransportVehicle - แก้ไขข้อมูลรถขนส่ง
func Updatetransportvehicle(c *gin.Context) {
	var vehicle entity.TransportVehicle
	vehicleID := c.Param("id")

	// ค้นหาข้อมูลรถขนส่งที่ต้องการแก้ไข
	db := config.DB()
	result := db.First(&vehicle, vehicleID)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transport vehicle not found"})
		return
	}

	// รับข้อมูล JSON ที่ส่งมาจาก client เพื่ออัปเดตข้อมูลรถขนส่ง
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// บันทึกข้อมูลรถขนส่งที่อัปเดต
	result = db.Save(&vehicle)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update transport vehicle"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transport vehicle updated successfully"})
}

// DeleteTransportVehicle - ลบรถขนส่ง
func Deletetransportvehicle(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	// ลบข้อมูลรถขนส่งจากฐานข้อมูล
	if tx := db.Exec("DELETE FROM transport_vehicles WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Transport vehicle not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transport vehicle deleted successfully"})
}
