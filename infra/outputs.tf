output "app_service_url" {
  description = "The URL of the App Service"
  value = azurerm_linux_web_app.app.default_hostname
}

output "resource_group_name" {
  description = "The name of the resource group"
  value       = azurerm_resource_group.rg.name
}

output "app_service_plan_id" {
  description = "The ID of the App Service Plan"
  value       = azurerm_service_plan.asp.id
}

output "app_service_name" {
  description = "The name of the Azure App Service"
  value       = azurerm_linux_web_app.app.name
}

# output "app_service_default_hostname" {
#   description = "The default hostname of the App Service"
#   value       = azurerm_linux_web_app.app.default_site_hostname
# }

# output "app_service_identity_principal_id" {
#   description = "The Principal ID of the system-assigned managed identity"
#   value       = azurerm_linux_web_app.app.identity.principal_id
# }
