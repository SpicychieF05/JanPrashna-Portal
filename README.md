# JanPrashna Intelligence Portal

The **JanPrashna Portal** is an AI-powered Citizen Question Intelligence Platform built for the Government of West Bengal. It enables citizens to submit questions and grievances, while providing government officials with an AI-driven dashboard to analyze trends, generate reports, and cluster related queries.


## Architecture

This project is built using a modern **Monorepo Architecture** powered by Turborepo:

- **Frontend (`apps/citizen-portal`)**: Next.js public-facing application for citizens.
- **Admin Dashboard (`apps/admin-dashboard`)**: Next.js secured intelligence platform for government officials.
- **Backend API (`apps/backend-api`)**: Python FastAPI backend with Clean Architecture, SQLAlchemy, and PostgreSQL/SQLite.
- **Shared Packages (`packages/ui`, `packages/config`)**: Shared React components, Tailwind config, and utility libraries.

---

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (>= 18)
- [pnpm](https://pnpm.io/installation) (Package manager used for this monorepo)
- Python (>= 3.9)

### 1. Installation

First, install the monorepo dependencies from the project root:

```bash
pnpm install
```

Set up the Python virtual environment and install backend dependencies:

```bash
cd apps/backend-api
python -m venv venv

# On Windows:
.\venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

---

## Running the Application Locally

You need to run both the FastAPI backend and the Next.js frontend servers simultaneously to use the application.

### Start the Backend (FastAPI)

Open a terminal and start the backend server:

```bash
cd apps/backend-api

# Activate virtual environment if not already active
.\venv\Scripts\activate   # Windows
# source venv/bin/activate # Mac/Linux

# Start the server
uvicorn app.main:app --reload --port 8000
```
- **Backend API Docs (Swagger)**: http://localhost:8000/api/v1/docs

### Start the Admin Dashboard (Next.js)

Open a **new** terminal at the project root and start the Admin Dashboard:

```bash
# Run from the project root
pnpm dev --filter admin-dashboard
```
- **Admin Dashboard UI**: http://localhost:3000

*(To test the login flow locally while the database is empty, you can bypass auth using any credentials depending on your local SQLite setup, or seed the DB using FastAPI).*

### Start the Citizen Portal (Next.js)

Open a **new** terminal at the project root and start the Citizen Portal:

```bash
# Run from the project root
pnpm dev --filter citizen-portal
```
- **Citizen Portal UI**: http://localhost:3001

---

## Useful Commands

- **Run all apps simultaneously:** `pnpm dev`
- **Build all apps:** `pnpm build`
- **Lint all apps:** `pnpm lint`
- **Format code:** `pnpm format`

## Database Migrations (Alembic)

The backend uses Alembic for database migrations. To generate or apply migrations:

```bash
cd apps/backend-api
alembic revision --autogenerate -m "migration_message"
alembic upgrade head
```
