// const { Client } = require('pg');

const Pool = require('pg').Pool;

const pool = new Pool({
    host:'database-ch-psql.cxxsoylsaete.us-east-1.rds.amazonaws.com',
    port:5432,
    user:'postgres',
    password:'Sunny@123',
    database:'postgres'
})

pool.on("connect",()=>{
    console.log("Database connection");
})

pool.on("end",()=>{
    console.log("Connection end");
})

module.exports = pool;