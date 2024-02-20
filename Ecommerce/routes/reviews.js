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

// Get reviews for a product
router.get('/product/:productId', (req, res) => {
    const productId = req.params.productId;
    const sql = 'SELECT * FROM ecommercedb.Reviews WHERE ProductID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(sql, [productId], (queryError, results) => {
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

// Add a new review for a product
router.post('/', (req, res) => {
    const { UserID, ProductID, Rating, Comment } = req.body;

    const insertSql = 'INSERT INTO ecommercedb.Reviews (UserID, ProductID, Rating, Comment) VALUES (?, ?, ?, ?)';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(insertSql, [UserID, ProductID, Rating, Comment], (insertError) => {
            connection.release();
            if (insertError) {
                console.log(insertError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Review added');
                res.status(201).json({ message: 'Review added' });
            }
        });
    });
});

// Update an existing review
router.patch('/:reviewId', (req, res) => {
    const reviewId = req.params.reviewId;
    const { Rating, Comment } = req.body;

    const updateSql = 'UPDATE ecommercedb.Reviews SET Rating = ?, Comment = ? WHERE ReviewID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(updateSql, [Rating, Comment, reviewId], (updateError) => {
            connection.release();
            if (updateError) {
                console.log(updateError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Review updated');
                res.status(200).json({ message: 'Review updated' });
            }
        });
    });
});

// Delete a review
router.delete('/:reviewId', (req, res) => {
    const reviewId = req.params.reviewId;

    const deleteSql = 'DELETE FROM ecommercedb.Reviews WHERE ReviewID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(deleteSql, [reviewId], (deleteError) => {
            connection.release();
            if (deleteError) {
                console.log(deleteError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Review removed');
                res.status(200).json({ message: 'Review removed' });
            }
        });
    });
});

module.exports = router;