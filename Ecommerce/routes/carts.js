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
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT p.ProductName, CartID,UserID,C.ProductID,AddedAt,C.Price,C.Quantity FROM ecommercedb.cart C INNER JOIN products p ON C.ProductID = p.ProductID WHERE UserID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(sql, [userId], (queryError, results) => {
            connection.release(); // Release the connection back to the pool
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
// Get the items in the user's shopping cart
router.get('/:id/:vendorId', (req, res) => {
    const userId = req.params.id;
    const vendorId = req.params.vendorId;

    const sql = 'SELECT p.ProductName,p.ImageName,p.ProductID, CartID,UserID,C.ProductID,AddedAt,C.Price,C.Quantity FROM ecommercedb.cart C INNER JOIN products p ON C.ProductID = p.ProductID WHERE UserID = ? and p.VendorID =?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(sql, [userId, vendorId], (queryError, results) => {
            connection.release(); // Release the connection back to the pool
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

// Add a product to the user's shopping cart
router.post('/', (req, res) => {
    const { UserID, ProductID, Quantity, Price } = req.body;

    const insertProcedure = 'CALL InsertCartItem(?, ?, ?, ?)';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(insertProcedure, [UserID, ProductID, Quantity, Price], (insertError) => {
            connection.release(); // Release the connection back to the pool
            if (insertError) {
                console.log(insertError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Item added to the cart');
                res.status(201).json({ message: 'Item added to the cart' });
            }
        });
    });
});

// Update the quantity of a product in the user's shopping cart
router.patch('/:id', (req, res) => {
    const CartID = req.params.id;
    const { Quantity } = req.body;

    // SQL query to update the quantity of a product in the cart
    const updateSql = 'UPDATE Cart SET Quantity = ? WHERE CartID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(updateSql, [Quantity, CartID], (updateError) => {
            connection.release(); // Release the connection back to the pool
            if (updateError) {
                console.log(updateError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Quantity updated in the cart');
                res.status(200).json({ message: 'Quantity updated in the cart' });
            }
        });
    });
});

// Remove a product from the user's shopping cart
router.delete('/:id', (req, res) => {
    const CartID = req.params.id;

    // SQL query to remove a product from the cart
    const deleteSql = 'DELETE FROM Cart WHERE CartID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(deleteSql, [CartID], (deleteError) => {
            connection.release(); // Release the connection back to the pool
            if (deleteError) {
                console.log(deleteError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Product removed from the cart');
                res.status(200).json({ message: 'Product removed from the cart' });
            }
        });
    });
});

module.exports = router;
