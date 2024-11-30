package transportcompanies

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/sa-67-example/config"
	"example.com/sa-67-example/entity"
)

// GetAllTransportCompanies - ดึงข้อมูลบริษัทขนส่งทั้งหมด
func GetAlltransportcompanies(c *gin.Context) {
	var companies []entity.TransportCompanies

	db := config.DB()

	// ดึงข้อมูลบริษัทขนส่งทั้งหมด
	results := db.Find(&companies)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, companies)
}

// GetTransportCompany - ดึงข้อมูลบริษัทขนส่งตาม ID
func Gettransportcompanies(c *gin.Context) {
	ID := c.Param("id")
	var company entity.TransportCompanies

	db := config.DB()

	// ค้นหาบริษัทขนส่งโดย ID
	results := db.Preload("transportvehicle").First(&transportvehicle, ID)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// ตรวจสอบว่ามีบริษัทขนส่งหรือไม่
	if company.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}

	c.JSON(http.StatusOK, company) 


}

// CreateTransportCompany - สร้างบริษัทขนส่งใหม่
func Createtransportcompanies(c *gin.Context) {
	var company entity.TransportCompanies

	// รับข้อมูล JSON ที่ส่งมาจาก client
	if err := c.ShouldBindJSON(&company); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// บันทึกบริษัทขนส่งใหม่ลงในฐานข้อมูล
	db := config.DB()
	if result := db.Create(&company); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create transport company"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transport company created successfully", "company": company})
}

// UpdateTransportCompany - แก้ไขข้อมูลบริษัทขนส่ง
func Updatetransportcompanies(c *gin.Context) {
	var company entity.TransportCompanies
	companyID := c.Param("id")

	// ค้นหาข้อมูลบริษัทขนส่งที่ต้องการแก้ไข
	db := config.DB()
	result := db.First(&company, companyID)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transport company not found"})
		return
	}

	// รับข้อมูล JSON ที่ส่งมาจาก client เพื่ออัปเดตข้อมูลบริษัทขนส่ง
	if err := c.ShouldBindJSON(&company); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// บันทึกข้อมูลบริษัทขนส่งที่อัปเดต
	result = db.Save(&company)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update transport company"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transport company updated successfully"})
}

// DeleteTransportCompany - ลบบริษัทขนส่ง
func Deletetransportcompanies(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	// ลบบริษัทขนส่งจากฐานข้อมูล
	if tx := db.Exec("DELETE FROM transport_companies WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Transport company not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transport company deleted successfully"})
}

