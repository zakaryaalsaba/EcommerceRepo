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

// Get order items for a specific order
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT O.OrderID,O.ProductID,O.Quantity,O.Price, P.ProductName FROM ecommercedb.OrderItems O INNER JOIN products P ON O.ProductID = P.ProductID  WHERE OrderID = ?';


    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(sql, [id], (queryError, results) => {
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
    console.log(sql)
});

// Add an item to an order
router.post('/', (req, res) => {
    const { OrderID, ProductID, Quantity, Price } = req.body;

    const insertSql = 'INSERT INTO ecommercedb.OrderItems (OrderID, ProductID, Quantity, Price) VALUES (?, ?, ?, ?)';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(insertSql, [OrderID, ProductID, Quantity, Price], (insertError) => {
            connection.release();
            if (insertError) {
                console.log(insertError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Item added to the order');
                res.status(201).json({ message: 'Item added to the order' });
            }
        });
    });
});

// Update an item in an order
router.patch('/:orderItemId', (req, res) => {
    const orderItemId = req.params.orderItemId;
    const { Quantity, Price } = req.body;

    const updateSql = 'UPDATE ecommercedb.OrderItems SET Quantity = ?, Price = ? WHERE OrderItemID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(updateSql, [Quantity, Price, orderItemId], (updateError) => {
            connection.release();
            if (updateError) {
                console.log(updateError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Item in the order updated');
                res.status(200).json({ message: 'Item in the order updated' });
            }
        });
    });
});

// Delete an item from an order
router.delete('/:orderItemId', (req, res) => {
    const orderItemId = req.params.orderItemId;

    const deleteSql = 'DELETE FROM ecommercedb.OrderItems WHERE OrderItemID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(deleteSql, [orderItemId], (deleteError) => {
            connection.release();
            if (deleteError) {
                console.log(deleteError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Item removed from the order');
                res.status(200).json({ message: 'Item removed from the order' });
            }
        });
    });
});

module.exports = router;