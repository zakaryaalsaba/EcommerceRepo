const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dbConfig = {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    connectionLimit: 10, // Adjust this number as needed
};

const pool = mysql.createPool(dbConfig);

function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                console.error('Error connecting to the database:', error);
                reject(error);
            } else {
                resolve(connection);
            }
        });
    });
}

exports.handler = async (event, context, callback) => {
    try {
        // Extract HTTP method and path from the event
        const { httpMethod, path } = event;

        console.log('hanler has been called')
        console.log(`${httpMethod} ${path}`);

        // const response = {
        //     statusCode: 200,
        //     headers: {
        //         "Access-Control-Allow-Headers" : "Content-Type",
        //         "Access-Control-Allow-Origin": "https://www.example.com",
        //         "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        //     },
        //     body: JSON.stringify('Hello from Lambda!'),
        // };

        switch (`${httpMethod} ${path}`) {
            case 'GET /users/':
                return await getUsers();
            case 'POST /users/login':
                return await login(JSON.parse(event.body));
            case 'POST /users/register':
                return await register(JSON.parse(event.body));
            case 'GET /users/' + event.pathParameters.id:
                return await getUserById(event.pathParameters.id);
            case 'PATCH /users/' + event.pathParameters.id:
                return await updateUser(event.pathParameters.id, JSON.parse(event.body));
            case 'DELETE /users/' + event.pathParameters.id:
                return await deleteUser(event.pathParameters.id);
            default:
                return {
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PATCH"
                    },
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Not Found - switch is not satisfied' }),
                };
        }
    } catch (error) {
        console.error('Error handling request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};

async function getUsers() {
    const connection = await getConnection();
    const sql = 'SELECT * FROM ecommercedb.users';
    try {
        const results = await query(connection, sql);
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        };
    } finally {
        connection.release();
    }
}

async function getUserById(id) {
    const connection = await getConnection();
    const sql = 'SELECT * FROM ecommercedb.users WHERE Id = ?';
    try {
        const results = await query(connection, sql, [id]);
        if (results.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(results[0]),
        };
    } finally {
        connection.release();
    }
}

async function login({ UserName, Password }) {
    const connection = await getConnection();
    const sql = 'SELECT * FROM ecommercedb.users WHERE UserName = ?';
    try {
        const results = await query(connection, sql, [UserName]);
        if (results.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (isPasswordValid) {
            const jwtToken = jwt.sign({ user_id: user.Id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return {
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PATCH"
                },
                statusCode: 200,
                body: JSON.stringify({ message: 'Login successful', jwtToken }),
            };
        } else {
            return {
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PATCH"
                },
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid username or password' }),
            };
        }
    } finally {
        connection.release();
    }
}

async function register(user) {
    const connection = await getConnection();
    const selectSql = 'SELECT Email FROM ecommercedb.users WHERE Email = ?';
    const insertSql = 'INSERT INTO ecommercedb.users SET ?';
    try {
        const [existingUser] = await query(connection, selectSql, [user.Email]);
        if (existingUser) {
            return {
                statusCode: 409,
                body: JSON.stringify({ message: 'Email is already in use' }),
            };
        }
        const hashPassword = await bcrypt.hash(user.Password, 8);
        user.Password = hashPassword;
        await query(connection, insertSql, user);
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User registered successfully' }),
        };
    } finally {
        connection.release();
    }
}

async function updateUser(id, user) {
    const connection = await getConnection();
    const updateSql = 'UPDATE ecommercedb.users SET ? WHERE Id = ?';
    try {
        await query(connection, updateSql, [user, id]);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User updated successfully' }),
        };
    } finally {
        connection.release();
    }
}
async function deleteUser(id) {
    const connection = await getConnection();
    const deleteSql = 'DELETE FROM ecommercedb.users WHERE Id = ?';
    try {
        await query(connection, deleteSql, [id]);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User deleted successfully' }),
        };
    } finally {
        connection.release();
    }
}

async function query(connection, sql, params) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (error, results) => {
            if (error) {
                console.error('Error executing SQL query:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}