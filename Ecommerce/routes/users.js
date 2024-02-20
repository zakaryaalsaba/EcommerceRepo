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
    const sql = 'SELECT * FROM ecommercedb.users';
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
router.get('/:id', (req, res) => {
    const userId = req.params.id;

    // SQL query to select a user by their ID
    const selectSql = 'SELECT * FROM users WHERE Id = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(selectSql, [userId], (queryError, results) => {
            connection.release(); // Release the connection back to the pool
            if (queryError) {
                console.log(queryError);
                res.status(500).json({ message: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                console.log('Fetched user by ID');
                res.status(200).json(results[0]);
            }
        });
    });
});


// Authentication API
router.post('/login', (req, res) => {
    const { UserName, Password } = req.body;
    const selectSql = 'SELECT * FROM users WHERE UserName = ?';
    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(selectSql, [UserName], async (error, results) => {
            connection.release(); // Release the connection back to the pool

            if (error) {
                console.log(error);
                res.status(500).json({ message: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                const user = results[0];
                const isPasswordValid = await bcrypt.compare(Password, user.Password);

                if (isPasswordValid) {
                    const jwtToken = jwt.sign({ user_id: user.Id, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.SECRET_KEY);
                    res.status(200).json({ message: 'Login successful', user, jwtToken});
                } else {
                    res.status(401).json({ message: 'Invalid username or password' });
                }
            }
        });
    });
});

// Add new user API
router.post('/register', (req, res) => {
    const { UserName, FirstName, LastName, Email, Password, PhoneNumber, MobileNumber, UserTypeId, StatusId } = req.body;
    console.log(req.body)
    const selectSql = 'SELECT Email FROM users WHERE Email = ?';
    const insertSql = 'INSERT INTO users SET ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        connection.query(selectSql, [Email], async (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'Internal server error' });
                connection.release();
            } else if (results.length > 0) {
                res.status(409).json({ message: 'Email is already in use' });
                connection.release();
            } else {
                const hashPassword = await bcrypt.hash(Password, 8);
                const user = {
                    UserName,
                    FirstName,
                    LastName,
                    Email,
                    Password: hashPassword,
                    PhoneNumber,
                    MobileNumber,
                    UserTypeId,
                    StatusId
                };
                connection.query(insertSql, user, (insertError) => {
                    connection.release(); // Release the connection back to the pool
                    if (insertError) {
                        console.log(insertError);
                        res.status(500).json({ message: 'Internal server error' });
                    } else {
                        console.log('Inserted');
                        res.status(201).json({ message: 'Inserted' });
                    }
                });
            }
        });
    });
});
// Updating One
router.patch('/:id', (req, res) => {
    const userId = req.params.id;
    const { UserName, FirstName, LastName, Email, Password, PhoneNumber, MobileNumber, UserTypeId, StatusId } = req.body;

    // SQL query to update a user based on their ID
    const updateSql = 'UPDATE users SET ? WHERE Id = ?';

    getConnection((error, connection) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        const updateUserData = {
            ...(UserName && { UserName }),
            ...(FirstName && { FirstName }),
            ...(LastName && { LastName }),
            ...(Email && { Email }),
            ...(PhoneNumber && { PhoneNumber }),
            ...(MobileNumber && { MobileNumber }),
            ...(UserTypeId && { UserTypeId }),
            ...(StatusId && { StatusId })
        };

        // If Password is sent, hash it and update
        if (Password) {
            bcrypt.hash(Password, 8, (hashError, hash) => {
                if (hashError) {
                    console.log(hashError);
                    res.status(500).json({ message: 'Internal server error' });
                    connection.release();
                } else {
                    updateUserData.Password = hash;
                    performUpdate();
                }
            });
        } else {
            performUpdate();
        }

        function performUpdate() {
            connection.query(updateSql, [updateUserData, userId], (updateError) => {
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
    const deleteSql = 'DELETE FROM users WHERE Id = ?';

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
