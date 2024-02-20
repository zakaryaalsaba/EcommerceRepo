const express = require("express");
const mysql = require('mysql');
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

// Get the items in the user's shopping cart
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const sqlGetAllCartsByUser = 'CALL GetAllCartsGroupingByVender(?)';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(sqlGetAllCartsByUser, [userId], (queryError, results) => {
            connection.release(); // Release the connection back to the pool
            if (queryError) {
                console.log(queryError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log(results[0]);
                res.send(results[0]);
            }
        });
    });
});

module.exports = router;
