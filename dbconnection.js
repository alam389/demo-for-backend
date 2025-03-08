require('dotenv').config({ path: './data/.env' }); // here i am basically importing the environment varibles used to connect to the database
const { Pool } = require('pg'); //importing Pool from pg to establish a connection to the database
//destructuring
const {
    PGHOST,//dw about these 
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

module.exports = pool;//exporting the pool so that it can be used in other files