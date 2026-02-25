variable "location" {
  default = "West Europe"
}

variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
}

variable "app_service_plan_name" {
  description = "Name of the App Service Plan"
  type        = string
}

variable "app_service_name" {
  description = "Name of the App Service (Web App)"
  type        = string
}

variable "app_settings" {
  description = "Map of application settings (environment variables)"
  type        = map(string)
  default     = {}
}
