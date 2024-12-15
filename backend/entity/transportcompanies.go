package entity

import (
	"time"
	"gorm.io/gorm"
)

type TransportCompanies struct {
	gorm.Model
    ID         uint      `gorm:"primaryKey"`
    TComName   string    `json:"company_name"`
    Contact    string    `json:"contact"`
    Email      string    `json:"email"`
    Address    string    `json:"address"`
    PostalCode string    `json:"postal_code"`
    StartDate  time.Time `json:"start_date"`
    EndDate    time.Time `json:"end_date"`
    Photo      string    `gorm:"type:longtext" json:"photocom"`
	TransportVehicles []TransportVehicle `gorm:"foreignKey:TransportCompaniesID"`
}