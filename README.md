# todo-api
A RESTful API for managing to-do tasks, built with Node.js, Express, and MariaDB.
Supports full CRUD operations — create, read, update, and delete tasks via HTTP endpoints.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MariaDB (mysql2)
- **Environment:** dotenv

## Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get a single todo |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

## Getting Started
1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in your database credentials
4. Run `npm run dev`
