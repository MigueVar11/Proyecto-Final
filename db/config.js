const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ventas_sistemas',
    password: '1948',
    port: 5432, // puerto por defecto de PostgreSQL
});

module.exports = pool;
