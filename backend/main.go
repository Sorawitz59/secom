package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"example.com/sa-67-example/config"

	"example.com/sa-67-example/controller/genders"
	"example.com/sa-67-example/controller/transportvehicle"

	"example.com/sa-67-example/controller/users"

	"example.com/sa-67-example/controller/transportcompanies"

	"example.com/sa-67-example/middlewares"
)


const PORT = "8000"


func main() {

   config.ConnectionDB()
   config.SetupDatabase()

   r := gin.Default()
   r.Use(CORSMiddleware())

   r.POST("/signup", users.SignUp)

   r.POST("/signin", users.SignIn)

   r.GET("/transportcompanies", transportcompanies.GetAlltransportcompanies)
   r.GET("/transportcompanies/:id", transportcompanies.Gettransportcompanies)
    r.DELETE("/transportcompanies/:id", transportcompanies.DeleteTransportCompanies)   
    r.POST("/transportcompanies", transportcompanies.CreateTransportCompanies)       
    r.PUT("/transportcompanies/:id", transportcompanies.UpdateTransportCompanies) 

    r.GET("/transportvehicle", transportvehicle.GetAlltransportvehicle)
    r.GET("/transportvehicle/:id", transportvehicle.Gettransportvehicle)       // ดึงข้อมูลโปรโมชั่นตาม ID
    r.POST("/transportvehicle", transportvehicle.Createtransportvehicle)       // สร้างโปรโมชั่นใหม่
    r.PUT("/transportvehicle/:id", transportvehicle.Updatetransportvehicle)    // แก้ไขข้อมูลโปรโมชั่น
    r.DELETE("/transportvehicle/:id", transportvehicle.Deletetransportvehicle)

   router := r.Group("/")

   {

       router.Use(middlewares.Authorizes())

       router.PUT("/user/:id", users.Update)
       router.GET("/users", users.GetAll)
       router.GET("/user/:id", users.Get)
       router.DELETE("/user/:id", users.Delete)

    //    router.GET("/transportcompanies/:id", transportcompanies.Gettransportcompanies)       // ดึงข้อมูลโปรโมชั่นตาม ID
    //    router.POST("/transportcompanies", transportcompanies.Createtransportcompanies)       // สร้างโปรโมชั่นใหม่
    //    router.PUT("/transportcompanies/:id", transportcompanies.Updatetransportcompanies)    // แก้ไขข้อมูลโปรโมชั่น


    //    router.GET("/transportvehicle", transportvehicle.GetAlltransportvehicle)       // ดึงข้อมูลโปรโมชั่นทั้งหมด
    //    router.GET("/transportvehicle/:id", transportvehicle.Gettransportvehicle)       // ดึงข้อมูลโปรโมชั่นตาม ID
    //    router.POST("/transportvehicle", transportvehicle.Createtransportvehicle)       // สร้างโปรโมชั่นใหม่
    //    router.PUT("/transportvehicle/:id", transportvehicle.Updatetransportvehicle)    // แก้ไขข้อมูลโปรโมชั่น
    //    router.DELETE("/transportvehicle/:id", transportvehicle.Deletetransportvehicle)

   }


   r.GET("/genders", genders.GetAll)

   r.GET("/", func(c *gin.Context) {
       c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
   })
   r.Run("localhost:" + PORT)
}


func CORSMiddleware() gin.HandlerFunc {
   return func(c *gin.Context) {
       c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
       c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
       c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
       c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

       if c.Request.Method == "OPTIONS" {
           c.AbortWithStatus(204)
           return
       }
       c.Next()
   }
}