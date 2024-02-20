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

// Get all product categories
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM ecommercedb.ProductCategories';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(sql, (queryError, results) => {
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
router.get('/:id', (req, res) => {
    const categoryId = req.params.id;
    const sql = 'SELECT * FROM ecommercedb.ProductCategories WHERE CategoryID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(sql, [categoryId], (queryError, results) => {
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

// Add a new product category
router.post('/', (req, res) => {
    const { CategoryName, Description } = req.body;

    const insertSql = 'INSERT INTO ecommercedb.ProductCategories (CategoryName, Description) VALUES (?, ?)';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(insertSql, [CategoryName, Description], (insertError) => {
            connection.release();
            if (insertError) {
                console.log(insertError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Product category added');
                res.status(201).json({ message: 'Product category added' });
            }
        });
    });
});

// Update an existing product category
router.patch('/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    const { CategoryName, Description } = req.body;

    const updateSql = 'UPDATE ecommercedb.ProductCategories SET CategoryName = ?, Description = ? WHERE CategoryID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(updateSql, [CategoryName, Description, categoryId], (updateError) => {
            connection.release();
            if (updateError) {
                console.log(updateError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Product category updated');
                res.status(200).json({ message: 'Product category updated' });
            }
        });
    });
});

// Delete a product category
router.delete('/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;

    const deleteSql = 'DELETE FROM ecommercedb.ProductCategories WHERE CategoryID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(deleteSql, [categoryId], (deleteError) => {
            connection.release();
            if (deleteError) {
                console.log(deleteError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Product category removed');
                res.status(200).json({ message: 'Product category removed' });
            }
        });
    });
});

module.exports = router;