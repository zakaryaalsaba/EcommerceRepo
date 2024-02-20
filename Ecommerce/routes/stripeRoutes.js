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

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Your actual Stripe secret key

router.post('/createcustomer', async (req, res) => {
    try {
        console.log(stripe);
        const customer = await stripe.customers.create({
            email: req.body.email,
        })


        res.json({ customerId: customer.id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
});

router.post('/processpayment', async (req, res) => {
    const { token, amountVal, email } = req.body;
    try {
        let customer;

        // Check if the customer already exists
        const customers = await stripe.customers.list({
            email: email,
            limit: 1, // Limit to 1 result, as there should be only one customer with a given email
        });

        if (customers.data.length > 0) {
            // Customer found
            customer = customers.data[0];
            console.log("Customer found:", customer);
        } else {
            // Create a new customer and associate with the payment source
            customer = await stripe.customers.create({
                email: email,
                source: token, // Associate the payment source with the customer
            });
            console.log("New customer created:", customer);
        }

        // Create a charge using the saved customer's ID
        const charge = await stripe.charges.create({
            amount: amountVal, // Amount in cents
            currency: 'usd',
            customer: customer.id, // Use the customer's ID for charging
            description: 'Example Charge',
        });

        console.log('Charge created:', charge);
        res.status(200).send({ success: true, charge: charge });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).send({ error: 'Payment failed' });
    }
});


router.post("/checkout", async (req, res, next) => {
    const { email } = req.body;
    var charged;
    var customer;
    try {
        const customers = await stripe.customers.list({
            email: email,
            limit: 1, // Limit to 1 result, as there should be only one customer with a given email
        });
        if (customers.data.length > 0) {
            // Customer found
            customer = customers.data[0];
            console.log("Customer found:", customer);

            // Now, you can use foundCustomer.id to associate the customer with a PaymentIntent or perform other operations.
        } else {
            console.log("Customer not found");
            customer = await stripe.customers.create({
                email: email,
            })
        }

        charged = await stripe.paymentIntents.create({
            amount: 987,
            currency: "usd",
            payment_method_types: ["card"],
            receipt_email: "zakarya.alsaba@gmail.com",
            customer: customer.id
        });
    } catch (err) {
        return res.status(500).send(err);
    }

    console.log(charged);
    try {
        const paymentConfirm = await stripe.paymentIntents.confirm(
            charged.id,
            { payment_method: "pm_card_visa" }
        );
        res.status(200).send(paymentConfirm);
    } catch (err) {
        return res.status(500).send(err);
    }

});


router.post('/checkout11', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the customer already exists
        let customer = await stripe.customers.list({
            email: email,
            limit: 1,
        });

        if (customer.data.length === 0) {
            // If the customer doesn't exist, create a new one
            customer = await stripe.customers.create({
                email: email,
            });
        } else {
            // If the customer exists, use their existing ID
            customer = customer.data[0];
        }

        if (!customer.id) {
            console.error('Error creating/retrieving customer:', customer);
            res.status(500).json({ error: 'Error processing checkout' });
            return;
        }

        // Use the customer.id in the checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: 'price_1OfqhHKl5JC95HqauHEvgyl7', // Replace with your actual product price ID
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:8080/success', // Replace with your success URL
            cancel_url: 'http://localhost:8080/cancel', // Replace with your cancel URL
            customer: customer.id,
        });

        console.log('Checkout Session ID:', session.id);
        res.json({ sessionId: session.id });

    } catch (error) {
        console.error('Error processing checkout:', error);
        res.status(500).json({ error: 'Error processing checkout' });
    }
});



// router.post('/checkout', async (req, res) => {
//     try {
//         //const { customerId } = req.body;
//         // Create a checkout session
//         const customer = await stripe.customers.create({
//             email: req.body.email,
//         })
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     price: 'price_1OfqhHKl5JC95HqauHEvgyl7', // Replace with your actual product price ID
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             success_url: 'http://localhost:8080/success', // Replace with your success URL
//             cancel_url: 'http://localhost:8080/cancel', // Replace with your cancel URL
//             customer: customerId,
//         });

//         console.log('Checkout Session ID:', session.id);
//         res.json({ sessionId: session.id });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error });
//     }
// });

//     const selectSql = 'SELECT * FROM ecommercedb.products where VendorID =  ?';


// Getting One by VendorID
// router.get('/:id', (req, res) => {
//     const VendorID = req.params.id;

//     console.log('starting here ' + VendorID);
//     // SQL query to select a user by their ID
//     const selectSql = 'SELECT * FROM ecommercedb.products where VendorID =  ?';

//     getConnection((error, connection) => {
//         if (error) {
//             console.log('Error connecting to the database:', error);
//             res.status(500).json({ message: 'Internal server error' });
//             return;
//         }

//         connection.query(selectSql, [VendorID], (queryError, results) => {
//             connection.release(); // Release the connection back to the pool
//             if (queryError) {
//                 console.log(queryError);
//                 res.status(500).json({ message: 'Internal server error' });
//             } else if (results.length === 0) {
//                 res.status(404).json({ message: 'product not found' });
//             } else {
//                 console.log('Fetched product by VendorID');
//                 res.status(200).json(results);
//             }
//         });
//     });
// });

module.exports = router;
