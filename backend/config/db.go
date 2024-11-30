package config

import (
	"fmt"
	"time"

	"example.com/sa-67-example/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.Users{},
		&entity.Genders{},
		&entity.TransportCompanies{},
		&entity.TransportVehicle{},
		&entity.TransportVehicleType{},
	)

	// Existing Gender data
	GenderMale := entity.Genders{Gender: "Male"}
	GenderFemale := entity.Genders{Gender: "Female"}

	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})

	hashedPassword, _ := HashPassword("123456")
	BirthDay, _ := time.Parse("2006-01-02", "1988-11-12")
	User := &entity.Users{
		FirstName: "Software",
		LastName:  "Analysis",
		Email:     "sa@gmail.com",
		Age:       80,
		Password:  hashedPassword,
		BirthDay:  BirthDay,
		Address:   "444 PuYai Mueang Nakhon Ratchasima",
		GenderID:  1,
	}
	db.FirstOrCreate(User, &entity.Users{Email: "sa@gmail.com"})

	StartDate, _ := time.Parse("2006-01-02", "2024-01-01")
	EndDate, _ := time.Parse("2006-01-02", "2024-12-31")

	transportCompanies := []entity.TransportCompanies{
		{
			TComName:   "FastDelivery Co., Ltd.",
			Contact:    "0812345678",
			Email:      "contact@fastdelivery.com",
			Address:    "123 Moo 5, Mueang, Bangkok",
			PostalCode: "10110",
			StartDate:  StartDate,
			EndDate:    EndDate,
			Photo:      "https://example.com/logo.png",
		},
		{
			TComName:   "Speedy Logistics Co., Ltd.",
			Contact:    "0812341234",
			Email:      "contact@speedylogistics.com",
			Address:    "45 Moo 10, Mueang, Chiang Mai",
			PostalCode: "50200",
			StartDate:  StartDate,
			EndDate:    EndDate,
			Photo:      "https://example.com/logo2.png",
		},
	}
	for _, company := range transportCompanies {
		db.FirstOrCreate(&company, &entity.TransportCompanies{TComName: company.TComName})
	}

	transportVehicles := []entity.TransportVehicle{
		{
			Photo:                "https://example.com/vehicle1.png",
			VehicleName:          "Truck Model A",
			VehicleNumber:        "123-ABC",
			ContainerCapacity:    1000,
			YearOfManufacture:    2020,
			VehicleModel:         "Model A",
			StartDate:            StartDate,
			EndDate:              EndDate,
			TransportCompaniesID:   1,
			TransportVehicleTypeID: 2,
		},
		{
			Photo:                "https://example.com/vehicle2.png",
			VehicleName:          "Truck Model B",
			VehicleNumber:        "456-DEF",
			ContainerCapacity:    1500,
			YearOfManufacture:    2021,
			VehicleModel:         "Model B",
			StartDate:            StartDate,
			EndDate:              EndDate,
			TransportCompaniesID:   2,
			TransportVehicleTypeID: 1,
		},
	}
	for _, vehicle := range transportVehicles {
		db.FirstOrCreate(&vehicle, &entity.TransportVehicle{VehicleNumber: vehicle.VehicleNumber})
	}

	transportVehicleTypes := []entity.TransportVehicleType{
		{
			Weight:      500.50,
			Description: "Large vehicle for transporting goods",
		},
		{
			Weight:      500.50,
			Description: "Large vehicle for transporting goods",
		},
	}
	for _, transportVehicleTypess := range transportVehicleTypes {
		db.Create(&transportVehicleTypess)
	}
}
