// Main application setup
// This file sets up Express and connects all the routes

const express = require('express');
const toolRoutes = require('./routes/toolRoutes');

const app = express();

// Middleware to parse JSON request bodies
// This allows us to read req.body in our controllers
app.use(express.json());

// Connect our tool routes to the /api/tools path
// All routes in toolRoutes.js will be prefixed with /api/tools
app.use('/api/tools', toolRoutes);

// Keep old routes for backward compatibility (students can migrate them)
const pool = require('../config/database');

app.get('/api/get', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tools');
        const results = { 'results': (result) ? result.rows : null };
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.get('/api/get/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await pool.query(`SELECT * FROM tools WHERE id = ${req.params.id}`);
        const results = { 'results': (result) ? result.rows : null };
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.post('/api/add', async (req, res) => {
    const { name, brand, catagory, price, stock, condition, seller } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query(
            `INSERT INTO tools 
            (name, brand, catagory, price, stock, condition, seller) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, brand, catagory, price, stock, condition, seller]
        );
        res.send(result.rows[0]);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = app;

