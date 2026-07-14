const Pool = require('pg').Pool;

const pool = new Pool({
    user : "postgres",
    password : "postgres123@231@00",
    host : "localhost",
    port : 5432,
    database : "preleave"
});

module.exports = pool;