const sqlite3 = require('sqlite3').verbose();
const path = require('path');
// todo: Open database SQLite3
const URL = path.join(__dirname, '../products.db');
const db = new sqlite3.Database(URL, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database => ' + URL);
});


// * Export the database
module.exports = db;