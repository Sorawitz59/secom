package entity

import (
	"gorm.io/gorm"
)

type TransportVehicleType struct {
	gorm.Model
	ID         uint      `gorm:"primaryKey"`
	Weight      float32 `json:"weight"`
	Description string  `json:"description"`

	TransportVehicles []TransportVehicle `gorm:"foreignKey:TransportVehicleTypeID"`
}