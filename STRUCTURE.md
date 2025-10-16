# Project Structure Guide

## Folder Structure

```
demo-for-backend/
├── config/              # Configuration files
│   └── database.js      # Database connection setup
├── src/                 # Source code
│   ├── models/          # Database operations (Data Layer)
│   │   └── toolModel.js
│   ├── controllers/     # Business logic (Logic Layer)
│   │   └── toolController.js
│   ├── routes/          # API routes (Route Layer)
│   │   └── toolRoutes.js
│   └── app.js           # Express app setup
├── data/                # Environment variables
│   └── .env
├── server.js            # Server entry point
├── package.json         # Dependencies
└── ASSIGNMENT.md        # Your tasks
```

---

## MVC Architecture Explained

This project uses **MVC (Model-View-Controller)** pattern - a standard way to organize backend code.

### **Model** (Data Layer)
**File:** `src/models/toolModel.js`

- Handles ALL database operations
- Contains SQL queries
- Returns data to controllers
- **What you do here:** Write functions that query the database

**Example:**
```javascript
const getAllTools = async () => {
    const result = await pool.query('SELECT * FROM tools');
    return result.rows;
};
```

---

### **Controller** (Logic Layer)
**File:** `src/controllers/toolController.js`

- Contains business logic
- Receives requests from routes
- Calls model functions to get/save data
- Sends responses back to client
- **What you do here:** Handle request/response logic

**Example:**
```javascript
const getAllTools = async (req, res) => {
    try {
        const tools = await toolModel.getAllTools();
        res.json({ results: tools });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
```

---

### **Routes** (Route Layer)
**File:** `src/routes/toolRoutes.js`

- Defines URL endpoints
- Maps URLs to controller functions
- **What you do here:** Define what URLs are available

**Example:**
```javascript
router.get('/', toolController.getAllTools);
router.get('/:id', toolController.getToolById);
router.post('/', toolController.createTool);
```

---

## How It All Connects

```
1. Client makes request
   ↓
2. Route receives it → routes/toolRoutes.js
   ↓
3. Route calls Controller → controllers/toolController.js
   ↓
4. Controller calls Model → models/toolModel.js
   ↓
5. Model queries Database → PostgreSQL
   ↓
6. Data flows back up the chain
   ↓
7. Controller sends response to Client
```

---

## How to Add a New Endpoint

Let's say you want to add a DELETE endpoint:

### Step 1: Add Model Function
**File:** `src/models/toolModel.js`
```javascript
const deleteTool = async (id) => {
    const result = await pool.query(
        'DELETE FROM tools WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

// Don't forget to export it!
module.exports = {
    getAllTools,
    getToolById,
    createTool,
    deleteTool  // ← Add this
};
```

### Step 2: Add Controller Function
**File:** `src/controllers/toolController.js`
```javascript
const deleteTool = async (req, res) => {
    try {
        const deletedTool = await toolModel.deleteTool(req.params.id);
        if (!deletedTool) {
            return res.status(404).json({ error: 'Tool not found' });
        }
        res.json({ 
            message: 'Tool deleted successfully', 
            deleted: deletedTool 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Export it!
module.exports = {
    getAllTools,
    getToolById,
    createTool,
    deleteTool  // ← Add this
};
```

### Step 3: Add Route
**File:** `src/routes/toolRoutes.js`
```javascript
router.delete('/:id', toolController.deleteTool);
```

**Done!** Now you have: `DELETE /api/tools/:id`

---

## Benefits of This Structure

1. **Organized** - Each file has one clear purpose
2. **Reusable** - Models can be used by different controllers
3. **Testable** - Easy to test each layer separately
4. **Scalable** - Easy to add new features
5. **Industry Standard** - This is how real companies structure backends

---

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start server:**
   ```bash
   npm start
   ```

3. **Test the API:**
   - GET all tools: `http://localhost:3000/api/tools`
   - GET one tool: `http://localhost:3000/api/tools/1`
   - POST new tool: `http://localhost:3000/api/tools`

---

## Tips for Students

- **Start with Models** - Write your SQL query first
- **Then Controllers** - Handle the request/response
- **Finally Routes** - Connect the URL to your controller
- **Use Comments** - Explain what your code does
- **Test Each Step** - Make sure one layer works before moving to the next

---

## Old Routes (Backward Compatibility)

The old routes still work for now:
- `/api/get` → Get all tools (old way)
- `/api/get/:id` → Get one tool (old way)
- `/api/add` → Add tool (old way)

**New routes:**
- `/api/tools` → Get all tools (new way)
- `/api/tools/:id` → Get one tool (new way)
- `/api/tools` → Add tool (new way)

You should use the **new routes** for your assignment!

