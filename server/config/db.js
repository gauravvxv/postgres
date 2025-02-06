const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.host,
    user: process.env.user,
    port: process.env.port,
    password: process.env.password,
    database: process.env.database,
})

pool.connect().then(() => console.log("Connected to postgres!")).catch(err => console.log("error from db" , err.stack));


module.exports = pool;