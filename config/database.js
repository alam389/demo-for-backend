// Database connection configuration
// This connects your app to PostgreSQL database

require('dotenv').config({ path: './data/.env' });
const { Pool } = require('pg');

// Get database credentials from environment variables
const {
    PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD,
    PGPORT
} = process.env;

// Create a connection pool to the database
const pool = new Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});

module.exports = pool;

