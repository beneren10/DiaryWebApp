resource_group_name     = "RG_App_Service"
app_service_plan_name   = "my-app-service-plan"
app_service_name        = "my-nodejs-appservice"

app_settings = {
  "NODE_ENV"       = "production"
  "DB_HOST"        = "db"
  "DB_PORT"        = "5432"
  "DB_USER"        = "postgres"
  "DB_PASSWORD"    = "hyar1nyxg"
  "SECRET_TOKEN"   = "11a129d278e863da8f8f44e9f3a5f61c0aac39176bd0dbcb85c335e0cb94b63f2f2924030ed35c721f82e26cc0ac99d25a16824a5ec44fcf2fe7f62530d67de1"
}
