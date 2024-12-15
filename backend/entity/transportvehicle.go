package entity

import (
	"time"

	"gorm.io/gorm"
)

type TransportVehicle struct {
	gorm.Model
	Photo             string    `gorm:"type:longtext" json:"photovehicle"`
	VehicleName       string    `json:"vehicle_name"`
	VehicleNumber     string    `json:"vehicle_number"`
	ContainerCapacity int       `json:"capacity"`
	YearOfManufacture int       `json:"manufacture"`
	VehicleModel      string    `json:"vmodel"`
	StartDate         time.Time `json:"start_date"`
	EndDate           time.Time `json:"end_date"`

	TransportCompaniesID   uint
	TransportCompanies     *TransportCompanies `gorm:"foreignKey:TransportCompaniesID"`
	TransportVehicleTypeID uint
	TransportVehicleType   *TransportVehicleType `gorm:"foreignKey:TransportVehicleTypeID"`
}