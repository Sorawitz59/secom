package transportcompanies

import (
    "net/http"
	"encoding/json"
    "github.com/gin-gonic/gin"
    "example.com/sa-67-example/config"
    "example.com/sa-67-example/entity"
	"time"
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
    var payload struct {
		CompanyName string `json:"company_name"`
		Contact     string `json:"contact"`
		Email       string `json:"email"`
		Address     string `json:"address"`
		PostalCode  string `json:"postal_code"`
		StartDate   time.Time `json:"start_date"`
		EndDate     time.Time `json:"end_date"`
		Photo       string `json:"photo"`
		VehicleName string `json:"vehicle_name"`
        VehicleNumber     string    `json:"vehicle_number"`
	    ContainerCapacity int       `json:"capacity"`
	    YearOfManufacture int       `json:"manufacture"`
	    VehicleModel      string    `json:"vmodel"`
	}
	

    // รับข้อมูล JSON
    if err := c.ShouldBindJSON(&payload); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
        return
    }

    db := config.DB()

    // บันทึก TransportCompanies
    company := entity.TransportCompanies{
        TComName:    payload.CompanyName,
        Contact:     payload.Contact,
        Email:       payload.Email,
        Address:     payload.Address,
        PostalCode:  payload.PostalCode,
        StartDate:   payload.StartDate,
        EndDate:     payload.EndDate,
        Photo:       payload.Photo,
    }
    if err := db.Create(&company).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transport company"})
        return
    }

    // บันทึก TransportVehicle
    vehicle := entity.TransportVehicle{
        VehicleName:          payload.VehicleName,
        VehicleNumber:          payload.VehicleNumber,
        ContainerCapacity:          payload.ContainerCapacity,
        YearOfManufacture:          payload.YearOfManufacture,
        VehicleModel:          payload.VehicleModel,
        TransportCompaniesID: company.ID,
    }
    if err := db.Create(&vehicle).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transport vehicle"})
        return
    }

    // ตอบกลับเมื่อสำเร็จ
    c.JSON(http.StatusOK, gin.H{
        "message": "Transport company and vehicle created successfully",
        "company": company,
        "vehicle": vehicle,
    })
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
