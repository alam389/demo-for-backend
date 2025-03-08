const express = require('express');
app = express();
const pool = require('./dbconnection');//hey i am importing the pool from the dbconnection file

app.get('/api/get' , async (req, res) => { //there must be a async used here because we are connecting to the database and it takes time to connect to the database
    try {//this is a try block that will attempt to connect to the database
        const client = await pool.connect();// i to the database
        const result = await client.query('SELECT * FROM users');//This is using SQL to execut a query to retieve data
        const results = { 'results': (result) ? result.rows : null};//hey i am storing the result of the query
        res.send(results);//"res" is response so once the query is successful i will respond with the results
        client.release();//hey i am releasing the connection
    } catch (err) {//this will cathc any errors that occur
        console.error(err);
        res.send("Error " + err);
    }
});

app.get('/api/get/:id' , async (req, res) => {// this is making use of adding parameters to the query in the actual URL
    try {
        const client = await pool.connect();//connects to the database
        const result = await client.query(`SELECT * FROM users WHERE id = ${req.params.id}`);//req.params is used to get the parameters from the URL
        const results = { 'results': (result) ? result.rows : null};
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});
app.post('/api/add', async (req, res) => {
    const { name, brand, catagory, price, stock, condition, seller } = req.body;// for this api it is expecting to recieve a json body with the following fields
    try {
        const client = await pool.connect();
        const result = await client.query(
            `INSERT INTO tools 
            (name, brand, catagory, price, stock, condition, seller) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
            [name, brand, catagory, price, stock, condition, seller]
        );//sql script to add a new took, the $1, $2, $3, $4, $5, $6, $7 are placeholders for the values that will be passed in the array
        res.send(result.rows[0]);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

/*
Your task is to create an API endpoint that allows updating any field(s) in a specific row of the tools table in your PostgreSQL database. 
The endpoint should use the HTTP PUT method and accept a JSON body containing the fields to be updated.
*/

/*
Your task is to create an API endpoint that allows deleting a specific row from the tools table in your PostgreSQL database. 
The endpoint should use the HTTP DELETE method and accept the id of the tool to be deleted as a URL parameter.
*/


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});// run "npm start" to start the server in the terminal 