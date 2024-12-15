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

    // Additional Transport Companies data
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
        {
            TComName:   "MegaTrans Co., Ltd.",
            Contact:    "0901234567",
            Email:      "contact@megatrans.com",
            Address:    "101 Moo 1, Mueang, Phuket",
            PostalCode: "83000",
            StartDate:  StartDate,
            EndDate:    EndDate,
            Photo:      "https://example.com/logo3.png",
        },
        {
            TComName:   "QuickMove Co., Ltd.",
            Contact:    "0898765432",
            Email:      "contact@quickmove.com",
            Address:    "202 Moo 2, Nakhon Pathom",
            PostalCode: "73000",
            StartDate:  StartDate,
            EndDate:    EndDate,
            Photo:      "https://example.com/logo4.png",
        },
        {
            TComName:   "SwiftTrans Ltd.",
            Contact:    "0881234433",
            Email:      "contact@swifttrans.com",
            Address:    "300 Moo 3, Chiang Rai",
            PostalCode: "57000",
            StartDate:  StartDate,
            EndDate:    EndDate,
            Photo:      "https://example.com/logo5.png",
        },
        {
            TComName:   "Express Logistics Co.",
            Contact:    "0855432109",
            Email:      "contact@expresslogistics.com",
            Address:    "500 Moo 5, Ayutthaya",
            PostalCode: "13000",
            StartDate:  StartDate,
            EndDate:    EndDate,
            Photo:      "https://example.com/logo6.png",
        },
        {
            TComName:   "RapidCargo Ltd.",
            Contact:    "0866543210",
            Email:      "contact@rapidcargo.com",
            Address:    "111 Moo 4, Songkhla",
            PostalCode: "90000",
            StartDate:  StartDate,
            EndDate:    EndDate,
            Photo:      "https://example.com/logo7.png",
        },
        {
            TComName:   "LogiExpress Co.",
            Contact:    "0845678901",
            Email:      "contact@logiexpress.com",
            Address:    "123 Moo 6, Surat Thani",
            PostalCode: "84000",
            StartDate:  StartDate,
            EndDate:    EndDate,
            Photo:      "https://example.com/logo8.png",
        },
    }
    for _, company := range transportCompanies {
        db.FirstOrCreate(&company, &entity.TransportCompanies{TComName: company.TComName})
    }

    // Additional Transport Vehicles data
    transportVehicles := []entity.TransportVehicle{
        {
            Photo:                "https://example.com/vehicle1.png",
            VehicleName:          "Truck Model A",
            VehicleNumber:        "123",
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
            VehicleNumber:        "456",
            ContainerCapacity:    1500,
            YearOfManufacture:    2021,
            VehicleModel:         "Model B",
            StartDate:            StartDate,
            EndDate:              EndDate,
            TransportCompaniesID:   2,
            TransportVehicleTypeID: 1,
        },
        {
            Photo:                "https://example.com/vehicle3.png",
            VehicleName:          "Truck Model C",
            VehicleNumber:        "789",
            ContainerCapacity:    2000,
            YearOfManufacture:    2019,
            VehicleModel:         "Model C",
            StartDate:            StartDate,
            EndDate:              EndDate,
            TransportCompaniesID:   3,
            TransportVehicleTypeID: 2,
        },
        {
            Photo:                "https://example.com/vehicle4.png",
            VehicleName:          "Truck Model D",
            VehicleNumber:        "101",
            ContainerCapacity:    2500,
            YearOfManufacture:    2021,
            VehicleModel:         "Model D",
            StartDate:            StartDate,
            EndDate:              EndDate,
            TransportCompaniesID:   4,
            TransportVehicleTypeID: 1,
        },
        {
            Photo:                "https://example.com/vehicle5.png",
            VehicleName:          "Truck Model E",
            VehicleNumber:        "202",
            ContainerCapacity:    1800,
            YearOfManufacture:    2018,
            VehicleModel:         "Model E",
            StartDate:            StartDate,
            EndDate:              EndDate,
            TransportCompaniesID:   5,
            TransportVehicleTypeID: 2,
        },
        {
            Photo:                "https://example.com/vehicle6.png",
            VehicleName:          "Truck Model F",
            VehicleNumber:        "303",
            ContainerCapacity:    3000,
            YearOfManufacture:    2022,
            VehicleModel:         "Model F",
            StartDate:            StartDate,
            EndDate:              EndDate,
            TransportCompaniesID:   6,
            TransportVehicleTypeID: 1,
        },
        {
            Photo:                "https://example.com/vehicle7.png",
            VehicleName:          "Truck Model G",
            VehicleNumber:        "404",
            ContainerCapacity:    2200,
            YearOfManufacture:    2020,
            VehicleModel:         "Model G",
            StartDate:            StartDate,
            EndDate:              EndDate,
            TransportCompaniesID:   7,
            TransportVehicleTypeID: 2,
        },
        {
            Photo:                "https://example.com/vehicle8.png",
            VehicleName:          "Truck Model H",
            VehicleNumber:        "505",
            ContainerCapacity:    1600,
            YearOfManufacture:    2017,
            VehicleModel:         "Model H",
            StartDate:            StartDate,
            EndDate:              EndDate,
            TransportCompaniesID:   8,
            TransportVehicleTypeID: 1,
        },
    }
    for _, vehicle := range transportVehicles {
        db.FirstOrCreate(&vehicle, &entity.TransportVehicle{VehicleNumber: vehicle.VehicleNumber})
    }

    // Additional Transport Vehicle Types data
    // transportVehicleTypes := []entity.TransportVehicleType{
    //     {
    //         Weight:      800.75,
    //         Description: "Large vehicle for heavy cargo",
    //     },
    //     {
    //         Weight:      600.25,
    //         Description: "Medium vehicle for standard cargo",
    //     },
    //     {
    //         Weight:      300.50,
    //         Description: "Small vehicle for light cargo",
    //     },
    //     {
    //         Weight:      500.00,
    //         Description: "Large vehicle for transporting perishable goods",
    //     },
    //     {
    //         Weight:      900.00,
    //         Description: "Heavy-duty truck for long-distance travel",
    //     },
    //     {
    //         Weight:      750.00,
    //         Description: "Large vehicle for transporting machinery",
    //     },
    //     {
    //         Weight:      850.00,
    //         Description: "Heavy-duty vehicle for bulky items",
    //     },
    //     {
    //         Weight:      450.00,
    //         Description: "Standard vehicle for transporting goods",
    //     },
    // }
    // for _, transportVehicleType := range transportVehicleTypes {
    //     db.Create(&transportVehicleType)
    // }
}

