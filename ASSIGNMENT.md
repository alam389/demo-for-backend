# API Development Assignment

## Learning Objectives

- Understand REST APIs and HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Implement CRUD operations with a PostgreSQL database
- Transform and filter data using SQL and JavaScript
- Test APIs using Postman or Thunder Client

---

## Assignment Structure

**Part 0: Warm-Up (3 tasks)** - 30-45 min  
**Part 1: CRUD Operations (2 tasks)** - 1-2 hours  
**Part 2: Data Transformation (3 tasks)** - 2-3 hours  

**Total: 8 tasks**

---

## Project Structure

This project uses **MVC (Model-View-Controller)** architecture:

- **Models** (`src/models/toolModel.js`) - Database queries
- **Controllers** (`src/controllers/toolController.js`) - Business logic
- **Routes** (`src/routes/toolRoutes.js`) - URL endpoints

**For each task, you'll need to:**
1. Add a function in the **Model** (SQL query)
2. Add a function in the **Controller** (handle request/response)
3. Add a route in **Routes** (connect URL to controller)

**Read `STRUCTURE.md` for detailed explanation and examples!**

---

## Part 0: Warm-Up Tasks

### Task 0.1: Tools Count
**Endpoint:** `GET /api/tools/count`  
**Return:** Total number of tools in database  

**Where to add code:**
- Model: `src/models/toolModel.js` - Add `getToolsCount()` function
- Controller: `src/controllers/toolController.js` - Add `getToolsCount()` function
- Route: `src/routes/toolRoutes.js` - Add `router.get('/count', ...)`

```sql
SELECT COUNT(*) FROM tools
```

**Expected Output:**
```json
{ "total_tools": 25 }
```

---

### Task 0.2: Tool Names Only
**Endpoint:** `GET /api/tools/names`  
**Return:** Array of tool names only (no full objects)

**Hint:** Use `result.rows.map(row => row.name)`

**Expected Output:**
```json
{
  "count": 3,
  "tool_names": ["Circular Saw", "Impact Driver", "Hammer"]
}
```

---

### Task 0.3: Get by Category
**Endpoint:** `GET /api/tools/category/:category`  
**Return:** All tools in specified category

**Example:** `/api/tools/category/power-tools`

```sql
SELECT * FROM tools WHERE catagory = $1
```

---

## Part 1: CRUD Operations

### Task 1: UPDATE Endpoint
**Endpoint:** `PUT /api/tools/:id`  
**Accept:** JSON body with fields to update (partial updates supported)  
**Return:** Updated tool object

**Example Request:**
```json
PUT /api/tools/3
{
  "price": 49.99,
  "stock": 15
}
```

**Where to add code:**
- Model: Add `updateTool(id, updates)` function
- Controller: Add `updateTool()` function
- Route: Add `router.put('/:id', toolController.updateTool)`

**Hints:**
- SQL: `UPDATE tools SET name = $1, price = $2 WHERE id = $3 RETURNING *`
- Build query dynamically based on provided fields
- Check `STRUCTURE.md` for a complete example!

---

### Task 2: DELETE Endpoint
**Endpoint:** `DELETE /api/tools/:id`  
**Return:** Success message with deleted tool info

**Where to add code:**
- Model: Add `deleteTool(id)` function
- Controller: Add `deleteTool()` function
- Route: Add `router.delete('/:id', toolController.deleteTool)`

```sql
DELETE FROM tools WHERE id = $1 RETURNING *
```

**Expected Output:**
```json
{
  "message": "Tool deleted successfully",
  "deleted": { "id": 3, "name": "Cordless Drill" }
}
```

---

## Part 2: Data Transformation

### Task 3: Filter Endpoint
**Endpoint:** `GET /api/tools/filter`  
**Query Params:** `category`, `brand`, `condition`, `minPrice`, `maxPrice`

**Example:** `/api/tools/filter?category=power-tools&minPrice=50&maxPrice=150`

**Hints:**
- Use `req.query` to get parameters
- Build WHERE clause dynamically
- SQL: `SELECT * FROM tools WHERE catagory = $1 AND price >= $2 AND price <= $3`

---

### Task 4: Sort Endpoint
**Endpoint:** `GET /api/tools/sort`  
**Query Params:** `sortBy` (price, name, stock, brand), `order` (asc, desc)  
**Default:** Sort by name ascending

**Example:** `/api/tools/sort?sortBy=price&order=desc`

**Hints:**
- Validate `sortBy` against whitelist to prevent SQL injection
- SQL: `SELECT * FROM tools ORDER BY price DESC`

---

### Task 5: Analytics Endpoint
**Endpoint:** `GET /api/tools/stats`  
**Return:** Aggregated statistics

**Calculate:**
- Total inventory value: `SUM(price * stock)`
- Tools by category: `COUNT(*) GROUP BY catagory`
- Average price by brand: `AVG(price) GROUP BY brand`
- Low stock items (stock < 10)

**Expected Output:**
```json
{
  "total_inventory_value": 15234.50,
  "total_tools": 25,
  "by_category": {
    "power-tools": 12,
    "hand-tools": 8
  },
  "average_price_by_brand": {
    "DeWalt": 95.50,
    "Makita": 87.25
  },
  "low_stock_items": [...]
}
```

---

## Testing with Postman/Thunder Client

### Setup
1. Start server: `npm start`
2. Base URL: `http://localhost:3000/api/tools`
3. Install Postman or Thunder Client (VS Code extension)

### Important: New URL Structure
All new endpoints use `/api/tools` as the base:
- `/api/tools` (new structure)
- `/api/get` (old structure - still works but don't use)

### Test Examples

**Task 1 - Update:**
- Method: PUT
- URL: `http://localhost:3000/api/tools/1`
- Headers: `Content-Type: application/json`
- Body: `{ "price": 99.99, "stock": 12 }`

**Task 2 - Delete:**
- Method: DELETE
- URL: `http://localhost:3000/api/tools/1`

**Task 3 - Filter:**
- Method: GET
- URL: `http://localhost:3000/api/tools/filter?brand=DeWalt&minPrice=30`

**Task 4 - Sort:**
- Method: GET
- URL: `http://localhost:3000/api/tools/sort?sortBy=price&order=asc`

---

## Submission Checklist

**Core Tasks (Minimum):**
- [ ] Tasks 0.1-0.3: Warm-up completed
- [ ] Tasks 1-2: UPDATE and DELETE working
- [ ] Tasks 3-5: Filter, Sort, Analytics working

**Quality:**
- [ ] Error handling (try-catch) in all endpoints
- [ ] Parameterized queries ($1, $2) used everywhere
- [ ] Tested with multiple test cases
- [ ] Comments explain your logic
- [ ] Server starts without errors

---

## Tips

1. **Start small** - Complete one task before moving to the next
2. **Test immediately** - After writing each endpoint
3. **Use console.log()** - To debug your code
4. **Reference existing code** - Look at GET and POST endpoints in `server.js`
5. **SQL injection** - Always use `$1, $2` instead of string concatenation
6. **Stuck?** - Ask for help after 30 minutes

---

## Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot read property of undefined" | Check `req.body` or `req.query` with `console.log()` |
| SQL syntax error | Test your query in a PostgreSQL client first |
| "Port 3000 already in use" | Stop existing server or use different port |
| Empty response | Make sure you're calling `res.send()` or `res.json()` |

---

## Resources

- [REST API Basics](https://www.redhat.com/en/topics/api/what-is-a-rest-api)
- [Express.js Routing](https://expressjs.com/en/guide/routing.html)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [SQL Aggregate Functions](https://www.postgresqltutorial.com/postgresql-aggregate-functions/)

---

Good luck!