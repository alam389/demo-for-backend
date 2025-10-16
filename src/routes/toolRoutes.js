// This file defines all the URL routes (endpoints) for tools
// Think of it as the "menu" - it lists what actions are available

const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');

// Route: GET all tools
// Example: GET http://localhost:3000/api/tools
router.get('/', toolController.getAllTools);

// Route: GET a single tool by ID
// Example: GET http://localhost:3000/api/tools/5
router.get('/:id', toolController.getToolById);

// Route: POST - Create a new tool
// Example: POST http://localhost:3000/api/tools
router.post('/', toolController.createTool);

// TODO: Students will add more routes here:
// - PUT /api/tools/:id (update a tool)
// - DELETE /api/tools/:id (delete a tool)
// - GET /api/tools/filter (filter tools)
// - etc.

module.exports = router;

