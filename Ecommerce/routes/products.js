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

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM ecommercedb.products';
    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(sql, (error, results) => {
            connection.release(); // Release the connection back to the pool
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log(results);
                res.send(results);
            }
        });
    });
});


// Getting One by ID
router.get('/id/:id', (req, res) => {
    const ProductID = req.params.id;
    // SQL query to select a user by their ID
    const selectSql = 'SELECT p.ProductID, p.ProductName, p.Price, p.Description, p.ImageName, p.StockQuantity ,c.CategoryID, c.CategoryName, v.VendorID, v.VendorName FROM products p INNER JOIN productcategories c ON p.CategoryID = c.CategoryID INNER JOIN vendors v ON p.VendorID = v.VendorID WHERE ProductID =  ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(selectSql, [ProductID], (queryError, results) => {
            connection.release(); // Release the connection back to the pool
            if (queryError) {
                console.log(queryError);
                res.status(500).json({ message: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ message: 'product not found' });
            } else {
                console.log('Fetched product by ProductID');
                res.status(200).json(results[0]);
            }
        });
    });
});

router.get('/:search_query', (req, res) => {
    const search_query = req.params.search_query;
    console.log(search_query);

    const sql = 'SELECT * FROM ecommercedb.products WHERE ProductName LIKE ? LIMIT 10';
    const queryValue = `%${search_query}%`;

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(sql, [queryValue], (error, results) => {
            connection.release(); // Release the connection back to the pool
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log(results);
                res.send(results);
            }
        });
    });
});

router.post('/', (req, res) => {
    const { ProductName,Description, Price, VendorID,CategoryID, StockQuantity } = req.body;
    
    const insertSql = 'INSERT INTO products SET ?';
    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        const product = {
            ProductName,
            Description,
            Price,
            VendorID,
            CategoryID,
            StockQuantity
        };
        connection.query(insertSql, product, (insertError) => {
            connection.release(); // Release the connection back to the pool
            if (insertError) {
                console.log(insertError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Inserted');
                res.status(201).json({ message: 'Inserted' });
            }
        });
    })
})

// Updating One
router.patch('/:id', (req, res) => {
    const ProductID = req.params.id;
    const { ProductName,Description, Price, VendorID,CategoryID, StockQuantity } = req.body;

    // SQL query to update a user based on their ID
    const updateSql = 'UPDATE products SET ? WHERE ProductID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        const updateUserData = {
            ...(ProductName && { ProductName }),
            ...(Description && { Description }),
            ...(Price && { Price }),
            ...(VendorID && { VendorID }),
            ...(CategoryID && { CategoryID }),
            ...(StockQuantity && { StockQuantity })
        };

        performUpdate();

        function performUpdate() {
            connection.query(updateSql, [updateUserData, ProductID], (updateError) => {
                connection.release(); // Release the connection back to the pool
                if (updateError) {
                    console.log(updateError);
                    res.status(500).json({ message: 'Internal server error' });
                } else {
                    console.log('Updated');
                    res.status(200).json({ message: 'Updated' });
                }
            });
        }
    });
});



// Deleting One
router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    // SQL query to delete a user based on their ID
    const deleteSql = 'DELETE FROM products WHERE ProductID = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(deleteSql, [userId], (deleteError) => {
            connection.release(); // Release the connection back to the pool
            if (deleteError) {
                console.log(deleteError);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Deleted');
                res.status(200).json({ message: 'Deleted' });
            }
        });
    });
});


// Add similar logic for other routes (e.g., GET by ID, PATCH, DELETE)

module.exports = router;
