const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));


// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'host_data'
});

// Handle form submission
// Handle form submission
app.get('/submit', (req, res) => {
    const email = req.query.email; // Use req.query if you're sending data through a GET request
    const password = req.query.password;

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';

    connection.query(query, [email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return;
        }
        console.log('Data inserted successfully:', result);
        res.redirect('/display'); // Redirect back to the form
    });
});


// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

// Display data
app.get('/display', (req, res) => { // Change to app.get here
    const query = 'SELECT * FROM users';

    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return;
        }
        res.write('<h1>Data in the Database:</h1>');

        rows.forEach(row => {
            res.write(`<p>ID: ${row.id}, email: ${row.email}, password: ${row.password}</p>`);
        });

        res.end();
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
