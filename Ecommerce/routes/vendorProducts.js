const express = require("express");
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
router.use(express.json());

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    connectionLimit: 10, // Adjust this number as needed
});

function getConnection(callback) {
    pool.getConnection((error, connection) => {
        callback(error, connection);
    });
}

// Getting One by VendorID
router.get('/:id', (req, res) => {
    const VendorID = req.params.id;

    console.log('starting here ' + VendorID);
    // SQL query to select a user by their ID
    const selectSql = 'SELECT * FROM ecommercedb.products where VendorID =  ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(selectSql, [VendorID], (queryError, results) => {
            connection.release(); // Release the connection back to the pool
            if (queryError) {
                console.log(queryError);
                res.status(500).json({ message: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ message: 'product not found' });
            } else {
                console.log('Fetched product by VendorID');
                console.log(results)
                res.status(200).json(results);
            }
        });
    });
});

module.exports = router;
