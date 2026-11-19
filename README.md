
# CoreCRM

A modern CRM application for managing leads, companies and business opportunities.

## Technologies
### Backend
- Node.js
- Express.js
- REST API
- JSON

### Database
- PostgreSQL

## Features

- Lead management
- Company management
- Lead search and filtering
- Create, edit and delete records
- REST API integration

## Requirements

Before running the application, install:

- Node.js
- npm
- PostgreSQL
- Git

## Installation

### 1. Clone the repository

```bash
git clone ttps://github.com/antoniopamantec/challengyAgriVenture.git

cd challengyAgriVenture
```

### 2. Configure the database

Create a PostgreSQL challengyAgre:

```sql
CREATE DATABASE challengyAgre;
```


### 3. Configure the backend

```bash
cd challengyAgriVenture
npm install
```

Create a `.env` file:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/challengyAgre
```

Start the backend:

```bash
npm start
```


## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /leads | List leads |
| POST | /leads | Create lead |
| PUT | /leads/:id | Update lead |
| DELETE | /leads/:id | Delete lead |
| GET | /companies | List companies |
| POST | /companies | Create company |
| PUT | /companies/:id | Update company |
| DELETE | /companies/:id | Delete company |


## Technical Decisions


- Node.js and Express provide a lightweight REST API.
- PostgreSQL provides relational data storage.
- JSON is used for communication between frontend and backend.


## Development Approach

The project was developed using a modular architecture, separating frontend, backend and database responsibilities.

Tools used:
- Visual Studio Code
- Git and GitHub
- Node.js
- Express
- PostgreSQL
- Postman


MIT
