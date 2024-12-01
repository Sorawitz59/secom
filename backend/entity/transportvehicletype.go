package entity

import (
	"gorm.io/gorm"
)

type TransportVehicleType struct {
	gorm.Model
	ID string `json:"description"`
	Weight      float32 `json:"weight"`
	Description string  `json:"description"`

	TransportVehicles []TransportVehicle `gorm:"foreignKey:TransportVehicleTypeID"`
}
