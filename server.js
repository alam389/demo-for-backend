const express = require('express');
app = express();
require('dotenv').config({ path: './data/.env' }); // Properly load dotenv
const { Pool } = require('pg');//importing Pool from pg

//destructuring
const {
    PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD,
    PGPORT
} = process.env;
const pool = new Pool({// hey i am establishing a connection to the database by creating a new instance of Pool
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
    ssl: {
        require: true,
        rejectUnauthorized: false // Add this line if you encounter SSL issues
    } 
});//creating a new instance of Pool

app.get('/api/get' , async (req, res) => {

    try {
        const client = await pool.connect();//this i to the database
        const result = await client.query('SELECT * FROM users');//hey i am executing a query
        const results = { 'results': (result) ? result.rows : null};//hey i am storing the result of the query
        res.send(results);//hey i am sending the result of the query
        client.release();//hey i am releasing the connection
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});