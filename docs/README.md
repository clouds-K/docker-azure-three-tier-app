# Azure Architecture Export

## Purpose

`azure-architecture-export.json` is a sanitized ARM template export documenting the Azure infrastructure used during an earlier deployment of this project.

## Historical architecture

The exported configuration describes:

- Azure Container Instances for the frontend and backend.
- Azure Container Registry for container images.
- Azure Database for PostgreSQL Flexible Server.
- Supporting Azure resources, including registry scope maps and PostgreSQL configuration resources.

## Important notes

- This file is provided for architectural documentation and reference.
- It is not guaranteed to be directly deployable.
- Required resource-name parameters do not have default values.
- The backend `DB_PASSWORD` environment variable references a `secureString` parameter.
- The PostgreSQL administrator password must be configured separately before any new deployment.
- The exported configuration enables the ACR admin user. Managed identity or another secure authentication method is preferable for a new deployment.
- The current Azure resources may differ from this historical export.

Never commit actual passwords, access keys, connection strings, or deployment parameter files containing secrets.

