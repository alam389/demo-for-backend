// This file handles the logic for each endpoint
// Think of it as the "brain" - it receives requests, processes them, and sends responses

const toolModel = require('../models/toolModel');

// Controller to get all tools
const getAllTools = async (req, res) => {
    try {
        const tools = await toolModel.getAllTools();
        res.json({ results: tools });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching tools: ' + err.message });
    }
};

// Controller to get a single tool by ID
const getToolById = async (req, res) => {
    try {
        const tool = await toolModel.getToolById(req.params.id);
        if (!tool) {
            return res.status(404).json({ error: 'Tool not found' });
        }
        res.json({ results: [tool] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching tool: ' + err.message });
    }
};

// Controller to create a new tool
const createTool = async (req, res) => {
    try {
        const newTool = await toolModel.createTool(req.body);
        res.status(201).json(newTool);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating tool: ' + err.message });
    }
};

// Export all controller functions
module.exports = {
    getAllTools,
    getToolById,
    createTool
};

