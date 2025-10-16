# Backend API Assignment

A simple REST API for managing tools inventory using Express.js and PostgreSQL.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file in `data/` folder with your PostgreSQL credentials:
   ```
   PGHOST=your_host
   PGDATABASE=your_database
   PGUSER=your_user
   PGPASSWORD=your_password
   PGPORT=5432
   ```

3. Start server:
   ```bash
   npm start
   ```

## Project Structure

```
├── config/
│   └── database.js         # Database connection
├── src/
│   ├── models/             # Database queries
│   ├── controllers/        # Request handlers
│   └── routes/             # API endpoints
├── server.js               # Entry point
└── ASSIGNMENT.md           # Your tasks
```

## How It Works

**3-Layer Architecture:**
1. **Routes** (`src/routes/`) - Define URLs
2. **Controllers** (`src/controllers/`) - Handle logic
3. **Models** (`src/models/`) - Query database

## Available Endpoints

- `GET /api/tools` - Get all tools
- `GET /api/tools/:id` - Get one tool
- `POST /api/tools` - Create tool

## Your Task

Complete `ASSIGNMENT.md` to add:
- UPDATE and DELETE endpoints
- Filter and search features
- Analytics and more

See `STRUCTURE.md` for detailed examples.
