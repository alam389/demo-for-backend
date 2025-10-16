// This file handles all database operations for tools
// Think of it as the "data layer" - it talks directly to the database

const pool = require('../../config/database');

// Get all tools from database
const getAllTools = async () => {
    const result = await pool.query('SELECT * FROM tools');
    return result.rows;
};

// Get a single tool by ID
const getToolById = async (id) => {
    const result = await pool.query('SELECT * FROM tools WHERE tool_id = $1', [id]);
    return result.rows[0];
};

// Add a new tool to database
const createTool = async (toolData) => {
    const { name, brand, catagory, price, stock, condition, seller } = toolData;
    const result = await pool.query(
        `INSERT INTO tools (name, brand, catagory, price, stock, condition, seller) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [name, brand, catagory, price, stock, condition, seller]
    );
    return result.rows[0];
};

// Export all functions so they can be used in controllers
module.exports = {
    getAllTools,
    getToolById,
    createTool
};

