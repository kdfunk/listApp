const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const helmet = require('helmet'); // installed helmet via npm

const app = express();
const port = 3000;

// Helmet for setting HTTP security headers
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://trusted.cdn.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://trusted.image-source.com"],
      connectSrc: ["'self'", "https://api.trusted-service.com"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Securely index.html file and set cookies
app.get('/', (req, res) => {
    res.cookie('username', 'run@cool.com', { secure: true, httpOnly: true });
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Static files from the "public" directory
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

// Securely list-items 
app.get('/list-items', (req, res) => {
    const searchTerm = req.query.term;
    const sql = `SELECT * FROM items WHERE name LIKE ?`;
    db.all(sql, [`%${searchTerm}%`], (err, rows) => {
        if (err) {
            res.status(500).send("Error executing query");
        } else {
            res.status(200).json(rows);
        }
    });
});

// Endpoint to get all items securely
app.get('/get-items', (req, res) => {
    db.all(`SELECT * FROM items`, [], (err, rows) => {
        if (err) {
            res.status(500).send("Error retrieving items");
        } else {
            res.status(200).json({ items: rows });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
