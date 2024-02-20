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
    connectionLimit: 10,
});

function getConnection(callback) {
    pool.getConnection((error, connection) => {
        callback(error, connection);
    });
}

// Get all shipping addresses for a specific user
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM ecommercedb.ShippingAddresses WHERE UserID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(sql, [userId], (queryError, results) => {
            connection.release();
            if (queryError) {
                console.log(queryError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log(results);
                res.send(results);
            }
        });
    });
});

// Add a new shipping address for a user
router.post('/', (req, res) => {
    const { UserID, StreetAddress, City, State, PostalCode, Country } = req.body;

    const insertSql = 'INSERT INTO ecommercedb.ShippingAddresses (UserID, StreetAddress, City, State, PostalCode, Country) VALUES (?, ?, ?, ?, ?, ?)';

    getConnection((error, connection) => {
        if (error) {
            console.log ('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(insertSql, [UserID, StreetAddress, City, State, PostalCode, Country], (insertError) => {
            connection.release();
            if (insertError) {
                console.log(insertError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Shipping address added');
                res.status(201).json({ message: 'Shipping address added' });
            }
        });
    });
});

// Update an existing shipping address
router.patch('/:addressId', (req, res) => {
    const addressId = req.params.addressId;
    const { StreetAddress, City, State, PostalCode, Country } = req.body;

    const updateSql = 'UPDATE ecommercedb.ShippingAddresses SET StreetAddress = ?, City = ?, State = ?, PostalCode = ?, Country = ? WHERE AddressID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(updateSql, [StreetAddress, City, State, PostalCode, Country, addressId], (updateError) => {
            connection.release();
            if (updateError) {
                console.log(updateError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Shipping address updated');
                res.status(200).json({ message: 'Shipping address updated' });
            }
        });
    });
});

// Delete a shipping address
router.delete('/:addressId', (req, res) => {
    const addressId = req.params.addressId;

    const deleteSql = 'DELETE FROM ecommercedb.ShippingAddresses WHERE AddressID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(deleteSql, [addressId], (deleteError) => {
            connection.release();
            if (deleteError) {
                console.log(deleteError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Shipping address removed');
                res.status(200).json({ message: 'Shipping address removed' });
            }
        });
    });
});

module.exports = router;