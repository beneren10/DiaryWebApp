data "azurerm_resource_group" "existing" {
  name = var.resource_group_name
}

# data "azurerm_kubernetes_cluster" "existing" {
#   name                = var.cluster_name
#   resource_group_name = data.azurerm_resource_group.existing.name
# }

resource "azurerm_kubernetes_cluster" "new" {
  name                = var.cluster_name
  location            = data.azurerm_resource_group.existing.location
  resource_group_name = data.azurerm_resource_group.existing.name
  dns_prefix          = "myaks"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_B1s"
  }

  identity {
    type = "SystemAssigned"
  }
}


output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.new.name
}

output "aks_cluster_fqdn" {
  value = azurerm_kubernetes_cluster.new.fqdn
}

output "aks_resource_group" {
  value = data.azurerm_kubernetes_cluster.existing.resource_group_name
}
