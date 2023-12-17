
const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'pas',
    user: 'noah',
    password: 'abc123',
});

pool.connect((err, client, done) => {
    if (err) {
        console.log('Error connecting to database', err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = pool;