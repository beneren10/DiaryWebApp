provider "azurerm" {
  features {}

  subscription_id = "de7df33b-09ca-462e-89af-643803ca49bd"
}

terraform {
  required_version = ">= 1.3"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.0.0"
    }
  }
}
