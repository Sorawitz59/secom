package transportcompanies

import (
    "net/http"
    "encoding/json"
    "github.com/gin-gonic/gin"
    "example.com/sa-67-example/config"
    "example.com/sa-67-example/entity"
)

// GetAllTransportCompanies - ดึงข้อมูลบริษัทขนส่งทั้งหมด
func GetAlltransportcompanies(c *gin.Context) {
    var companies []entity.TransportCompanies

    db := config.DB()

    // ดึงข้อมูลบริษัทขนส่งทั้งหมดพร้อมยานพาหนะ
    results := db.Preload("TransportVehicles").Find(&companies)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    // ใช้ json.MarshalIndent เพื่อจัดระเบียบ JSON
    prettyJSON, err := json.MarshalIndent(companies, "", "  ") // "  " คือตัวเว้นระยะ (2 spaces)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to format JSON"})
        return
    }

    // ส่ง JSON ที่จัดระเบียบแล้วกลับไป
    c.Data(http.StatusOK, "application/json", prettyJSON)
}

// CreateTransportCompany - สร้างบริษัทขนส่งใหม่
func CreateTransportCompanies(c *gin.Context) {
    var company entity.TransportCompanies

    // รับข้อมูล JSON ที่ส่งมาจาก client
    if err := c.ShouldBindJSON(&company); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
        return
    }

    db := config.DB()
    if result := db.Create(&company); result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transport company"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Transport company created successfully", "company": company})
}

// UpdateTransportCompany - แก้ไขข้อมูลบริษัทขนส่ง
func UpdateTransportCompanies(c *gin.Context) {
    var company entity.TransportCompanies
    companyID := c.Param("id")

    db := config.DB()
    if result := db.First(&company, companyID); result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Transport company not found"})
        return
    }

    // รับข้อมูล JSON ที่ส่งมาจาก client เพื่ออัปเดตข้อมูลบริษัทขนส่ง
    if err := c.ShouldBindJSON(&company); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
        return
    }

    // อัปเดตข้อมูลบริษัทขนส่งที่ได้รับ
    if result := db.Model(&company).Updates(company); result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update transport company"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Transport company updated successfully"})
}

// DeleteTransportCompany - ลบบริษัทขนส่ง
func DeleteTransportCompanies(c *gin.Context) {
    id := c.Param("id")
    db := config.DB()

    if result := db.Delete(&entity.TransportCompanies{}, id); result.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Transport company not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Transport company deleted successfully"})
}
