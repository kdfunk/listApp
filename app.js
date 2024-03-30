const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize the database
const db = new sqlite3.Database('./mylist.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )`);
    }
});


// Server-side app.js

app.get('/list-items', (req, res) => {
    const searchTerm = req.query.term;
    const db = new sqlite3.Database('mylist.db');
    
    // Insecure SQL query 
    const sql = `SELECT * FROM items WHERE name LIKE '%${listTerm}%'`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        res.status(500).send("Error executing query");
      } else {
        res.json(rows);
      }
    });
    db.close();
});


// Endpoint to get all items
app.get('/get-items', (req, res) => {
    db.all(`SELECT * FROM items`, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json({ items: rows });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
