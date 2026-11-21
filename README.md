# Three-Tier Web Application with Docker and Microsoft Azure

A containerized three-tier web application built with React, Node.js, Express, PostgreSQL, Docker, and Microsoft Azure.

This project was developed as part of a Cloud Computing academic project (2025–2026). It demonstrates containerization, service orchestration, REST API development, database persistence, and cloud deployment.

## 1. Project Overview

The application is a task management system that allows users to create, view, update, and delete tasks.

It follows a three-tier architecture:

- **Presentation Layer:** React frontend served through Nginx.
- **Application Layer:** Node.js and Express REST API.
- **Data Layer:** PostgreSQL relational database.

Docker Compose orchestrates the three services and provides an isolated network for communication between containers.

## 2. Architecture

```text
              User / Browser
                    |
                    v
          React Frontend + Nginx
                Port 3000
                    |
                    v
             Express REST API
                Port 5000
                    |
                    v
              PostgreSQL 15
              Internal Network
                    |
                    v
             Persistent Volume
```

### Technologies

| Component | Technology |
|---|---|
| Frontend | React |
| Web server | Nginx |
| Backend | Node.js, Express |
| API | REST |
| Database | PostgreSQL 15 |
| Containerization | Docker |
| Orchestration | Docker Compose |
| Cloud platform | Microsoft Azure |

## 3. Features

- Create new tasks.
- Retrieve and display tasks.
- Update task completion status.
- Delete tasks.
- Backend health check with database connectivity verification.
- Persistent database storage using Docker volumes.
- Container health checks and service dependencies.

## 4. Project Structure

```text
docker-azure-three-tier-app/
├── backend/
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
├── database/
│   └── init.sql
├── docs/
│   ├── README.md
│   └── azure-architecture-export.json
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 5. Run Locally with Docker Compose

### Prerequisites

- Docker Desktop
- Docker Compose
- Git

### Clone the repository

```bash
git clone https://github.com/clouds-K/docker-azure-three-tier-app.git
cd docker-azure-three-tier-app
```

### Configure environment variables

Create a local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Review `.env` and set your own database password.

### Build and start the application

```bash
docker compose up --build -d
```

### Access the application

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend health check | http://localhost:5000/api/health |
| Tasks API | http://localhost:5000/api/tasks |

### Stop the application

```bash
docker compose down
```

To remove containers and the persistent database volume:

```bash
docker compose down -v
```

**Warning:** The `-v` option deletes the database volume and its stored data.

## 6. REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check backend and database connectivity |
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update task completion status |
| DELETE | `/api/tasks/:id` | Delete a task |

### Example: Create a task

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Complete Cloud Computing project"
}
```

## 7. Database Persistence

PostgreSQL data is stored in a named Docker volume called `postgres_data`.

This ensures that database records persist when containers are stopped or restarted.

The database initialization script is located at:

```text
database/init.sql
```

## 8. Azure Deployment

An earlier version of this project was deployed on Microsoft Azure using:

- Azure Container Instances (ACI)
- Azure Container Registry (ACR)
- Azure Database for PostgreSQL Flexible Server

The academic project report documents the historical deployment, application access, CRUD operations, database connectivity, and persistence tests.

**Important:** The Azure architecture export in `docs/` is provided for historical documentation. It is not guaranteed to be directly deployable and may not reflect the current Azure resources. See [`docs/README.md`](docs/README.md) for details.

## 9. Security Considerations

- Environment variables are used for database configuration.
- Local `.env` files must not be committed.
- Database credentials must be changed from their development defaults.
- PostgreSQL is not directly exposed to the host in the provided Docker Compose configuration.
- Production deployments should use HTTPS, restricted CORS origins, secure secret management, and appropriate database access controls.
- The historical Azure export must not be treated as a production-ready deployment template.

## 10. Future Improvements

- Implement user authentication and authorization.
- Add automated backend and frontend tests.
- Introduce CI/CD using GitHub Actions.
- Integrate Azure Key Vault for secret management.
- Configure HTTPS and production-grade network security.
- Add monitoring and centralized logging.

## Academic Context

**Project:** Cloud Computing — Three-Tier Web Application

**Academic Year:** 2025–2026

**Author:** Khouloud Moumni
