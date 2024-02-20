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

// Get the orders for a user
router.get('/:id/:CusOrVndrId', (req, res) => {
    const userId = req.params.id;
    const CusOrVndrId = req.params.CusOrVndrId;  // Assuming you have a parameter for CusOrVndrId in your route

    let sql = '';

    if (CusOrVndrId == 1) {
        sql = 'SELECT * FROM ecommercedb.Orders WHERE UserID = ?'; //get cusmr's orders
    } else if (CusOrVndrId == 2) {
        sql = 'SELECT * FROM ecommercedb.Orders WHERE VendorID = ?';//get vendor's orders
    } else {
        res.status(400).json({ message: 'Invalid CusOrVndrId' });
        return;
    }
    if (sql == '') return;
    console.log(sql);
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

// Place a new order
router.post('/', (req, res) => {
    const { UserID, TotalAmount } = req.body;

    const insertSql = 'INSERT INTO ecommercedb.Orders (UserID, TotalAmount) VALUES (?, ?)';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(insertSql, [UserID, TotalAmount], (insertError) => {
            connection.release();
            if (insertError) {
                console.log(insertError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Order placed');
                res.status(201).json({ message: 'Order placed' });
            }
        });
    });
});

// Update the total amount of an order
router.patch('/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const { TotalAmount } = req.body;

    const updateSql = 'UPDATE ecommercedb.Orders SET TotalAmount = ? WHERE OrderID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(updateSql, [TotalAmount, orderId], (updateError) => {
            connection.release();
            if (updateError) {
                console.log(updateError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Total amount updated in the order');
                res.status(200).json({ message: 'Total amount updated in the order' });
            }
        });
    });
});

// Delete an order
router.delete('/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    const deleteSql = 'DELETE FROM ecommercedb.Orders WHERE OrderID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(deleteSql, [orderId], (deleteError) => {
            connection.release();
            if (deleteError) {
                console.log(deleteError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Order removed');
                res.status(200).json({ message: 'Order removed' });
            }
        });
    });
});

module.exports = router;