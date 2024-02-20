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
   const sql = 'SELECT * FROM ecommercedb.Vendors';
   getConnection((error, connection) => {
      if (error) {
         console.log('Error connecting to the database:', error);
         res.status(500).json({
            message: 'Internal server error'
         });
         return;
      }
      connection.query(sql, (error, results) => {
         connection.release();
         // Release the connection back to the pool 
         if (error) {
            console.log(error);
            res.status(500).json({
               message: 'Internal server error'
            });
         } else {
            console.log(results);
            res.send(results);
         }
      });
   });
});

// Getting One by ID 
router.get('/:id', (req, res) => {
   const vendorId = req.params.id;
   // SQL query to select a vendor by their ID 
   const selectSql = 'SELECT * FROM Vendors WHERE VendorID = ?';
   getConnection((error, connection) => {
      if (error) {
         console.log('Error connecting to the database:', error);
         res.status(500).json({
            message: 'Internal server error'
         });
         return;
      }
      connection.query(selectSql, [vendorId], (queryError, results) => {
         connection.release();
         // Release the connection back to the pool 
         if (queryError) {
            console.log(queryError);
            res.status(500).json({
               message: 'Internal server error'
            });
         } else if (results.length === 0) {
            res.status(404).json({
               message: 'Vendor not found'
            });
         } else {
            console.log('Fetched vendor by ID');
            res.status(200).json(results[0]);
         }
      });
   });
});

router.post('/', (req, res) => {
   const {
      VendorName,
      UserID,
      Description,
   } = req.body;
   const selectSql = 'SELECT VendorName FROM ecommercedb.Vendors WHERE VendorName = ?';
   const insertSql = 'INSERT INTO Vendors SET ?';
   getConnection((error, connection) => {
      if (error) {
         console.log('Error connecting to the database:', error);
         res.status(500).json({
            message: 'Internal server error'
         });
         return;
      }
      connection.query(selectSql, [VendorName], async (error, results) => {
         if (error) {
            console.log(error);
            res.status(500).json({
               message: 'Internal server error'
            });
            connection.release();
         } else if (results.length > 0) {
            res.status(409).json({
               message: 'Vendor is already in use'
            });
            connection.release();
         } else {
            const vendor = {
               VendorName,
               UserID,
               Description,
            };
            connection.query(insertSql, vendor, (insertError) => {
               connection.release();
               // Release the connection back to the pool 
               if (insertError) {
                  console.log(insertError);
                  res.status(500).json({
                     message: 'Internal server error'
                  });
               } else {
                  console.log('Inserted');
                  res.status(201).json({
                     message: 'Inserted'
                  });
               }
            });
         }
      });
   });
});
// Updating One 
router.patch('/:id', (req, res) => {
   const vendorId = req.params.id;
   const {
      VendorName,
      UserID,
      Description
   } = req.body;
   // SQL query to update a vendor based on their ID 
   const selectSql = 'SELECT VendorName FROM ecommercedb.Vendors WHERE VendorName = ?';
   const updateSql = 'UPDATE Vendors SET ? WHERE VendorID = ?';
   getConnection((error, connection) => {
      if (error) {
         console.log('Error connecting to the database:', error);
         res.status(500).json({
            message: 'Internal server error'
         });
         return;
      }
      connection.query(selectSql, [VendorName], async (error, results) => {
         if (error) {
            console.log(error);
            res.status(500).json({
               message: 'Internal server error'
            });
            connection.release();
         } else if (results.length > 0) {
            res.status(409).json({
               message: 'Vendor name is already in use'
            });
            connection.release();
         } else {
            const vendorUpdate = {
               ...(VendorName && {
                  VendorName
               }),
               ...(UserID && {
                  UserID
               }),
               ...(Description && {
                  Description
               }),
            };

            connection.query(updateSql, [vendorUpdate, vendorId], (updateError) => {
               connection.release();
               // Release the connection back to the pool 
               if (updateError) {
                  console.log(updateError);
                  res.status(500).json({
                     message: 'Internal server error'
                  });
               } else {
                  console.log('Updated');
                  res.status(200).json({
                     message: 'Updated'
                  });
               }
            });
         }
      });
   });
});
// Deleting One 
router.delete('/:id', (req, res) => {
   const vendorId = req.params.id;
   // SQL query to delete a vendor based on their ID 
   const deleteSql = 'DELETE FROM Vendors WHERE VendorID = ?';
   getConnection((error, connection) => {
      if (error) {
         console.log('Error connecting to the database:', error);
         res.status(500).json({
            message: 'Internal server error'
         });
         return;
      }
      connection.query(deleteSql, [vendorId], (deleteError) => {
         connection.release();
         // Release the connection back to the  pool 
         if (deleteError) {
            console.log(deleteError);
            res.status(500).json({
               message: 'Internal server error'
            });
         } else {
            console.log('Deleted');
            res.status(200).json({
               message: 'Deleted'
            });
         }
      });
   });
});
module.exports = router;