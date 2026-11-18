
# CoreCRM

A modern CRM application for managing leads, companies and business opportunities.

## Technologies

### Frontend
- React
- Vite
- React Router
- Lucide React
- Recharts

### Backend
- Node.js
- Express.js
- REST API
- JSON

### Database
- PostgreSQL

## Features

- Dashboard with business statistics
- Lead management
- Company management
- Lead search and filtering
- Create, edit and delete records
- REST API integration
- Responsive interface
- Progressive Web App (PWA)

## Requirements

Before running the application, install:

- Node.js
- npm
- PostgreSQL
- Git

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/corecrm.git

cd corecrm
```

### 2. Configure the database

Create a PostgreSQL database:

```sql
CREATE DATABASE corecrm;
```

Execute the database schema:

```bash
psql -U postgres -d corecrm -f database/schema.sql
```

### 3. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/corecrm
```

Start the backend:

```bash
npm run dev
```

### 4. Configure the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

### 5. Access the application

Open:

http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/leads | List leads |
| POST | /api/leads | Create lead |
| PUT | /api/leads/:id | Update lead |
| DELETE | /api/leads/:id | Delete lead |
| GET | /api/companies | List companies |
| POST | /api/companies | Create company |
| PUT | /api/companies/:id | Update company |
| DELETE | /api/companies/:id | Delete company |
| GET | /api/dashboard | Dashboard statistics |

## Technical Decisions

- React was selected to build a reusable and component-based interface.
- Node.js and Express provide a lightweight REST API.
- PostgreSQL provides relational data storage.
- JSON is used for communication between frontend and backend.
- Vite provides a fast development environment.
- PWA support allows installation through compatible browsers.

## Limitations

- The application requires the backend and PostgreSQL to be running.
- Offline data synchronisation is not implemented.
- Authentication and role-based access control need further development.
- Automated tests need to be expanded.

## Development Approach

The project was developed using a modular architecture, separating frontend, backend and database responsibilities.

Tools used:
- Visual Studio Code
- Git and GitHub
- React
- Node.js
- Express
- PostgreSQL
- Postman

## License

MIT
