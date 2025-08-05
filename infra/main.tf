data "azurerm_resource_group" "existing" {
  name = var.resource_group_name
}

data "azurerm_kubernetes_cluster" "existing" {
  name                = var.cluster_name
  resource_group_name = data.azurerm_resource_group.existing.name
}

output "aks_cluster_name" {
  value = data.azurerm_kubernetes_cluster.existing.name
}

output "aks_cluster_fqdn" {
  value = data.azurerm_kubernetes_cluster.existing.fqdn
}

output "aks_resource_group" {
  value = azurerm_kubernetes_cluster.new.resource_group_name
}
