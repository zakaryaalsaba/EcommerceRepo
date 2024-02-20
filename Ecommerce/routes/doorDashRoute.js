const express = require("express");
const mysql = require('mysql');
const router = express.Router();
router.use(express.json());
const jwt = require('jsonwebtoken')
const axios = require('axios')

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

const accessKey = process.env.DOOR_DASH_ACCESS_KEY
const developerId = process.env.DD_DEVELOPER_ID
const SigningSecret = process.env.SIGNING_SECRET

const https = require('https');

// router.get('/', (req, res) => {
//     const data = {
//         aud: 'doordash',
//         iss: developerId,
//         kid: accessKey,
//         exp: Math.floor(Date.now() / 1000 + 300),
//         iat: Math.floor(Date.now() / 1000),
//     };

//     const headers = { algorithm: 'HS256', header: { 'dd-ver': 'DD-JWT-V1' } };

//     const token = jwt.sign(
//         data,
//         Buffer.from(SigningSecret, 'base64'),
//         headers,
//     );
//     console.log('test token:');
//     console.log(token);

//     const body = {
//         external_delivery_id: 'D-123458',
//         pickup_address: '901 Market Street 6th Floor San Francisco, CA 94103',
//         pickup_business_name: 'Wells Fargo SF Downtown',
//         pickup_phone_number: '+16505555555',
//         pickup_instructions: 'Enter gate code 1234 on the callbox.',
//         dropoff_address: '901 Market Street 6th Floor San Francisco, CA 94103',
//         dropoff_business_name: 'Wells Fargo SF Downtown',
//         dropoff_phone_number: '+16505555555',
//         dropoff_instructions: 'Enter gate code 1234 on the callbox.',
//         order_value: 1999,
//     };

//     axios
//         .post('https://openapi.doordash.com/drive/v2/deliveries', body, {
//             headers: {
//                 Authorization: 'Bearer ' + token,
//                 'Content-Type': 'application/json',
//             },
//             httpsAgent: new https.Agent({ rejectUnauthorized: false }), // This line was misplaced
//         })
//         .then(function (response) {
//             console.log(response.data);
//             // Handle response here
//             return response.data;
//         })
//         .catch(function (error) {
//             console.log(error);
//             return error;
//             // Handle error here
//         });

//     return "No data found";
// });

//get quotes
router.get('/', (req, res) => {
    const data = {
        aud: 'doordash',
        iss: developerId,
        kid: accessKey,
        exp: Math.floor(Date.now() / 1000 + 300),
        iat: Math.floor(Date.now() / 1000),
    };

    const headers = { algorithm: 'HS256', header: { 'dd-ver': 'DD-JWT-V1' } };

    const token = jwt.sign(
        data,
        Buffer.from(SigningSecret, 'base64'),
        headers,
    );
    console.log('test token:');
    console.log(token);

    const body = 
    // 
    {
        "external_delivery_id": "D-1763",
        "locale": "en-US, fr-CA, es-US",
        "order_fulfillment_method": "standard",
        "origin_facility_id": "MERCHANTA-CA-1",
        "pickup_address": "901 Market Street 6th Floor San Francisco, CA 94103",
        "pickup_business_name": "Wells Fargo SF Downtown",
        "pickup_phone_number": "+16505555555",
        "pickup_instructions": "Go to the bar for pick up.",
        "pickup_reference_tag": "Order number 61",
        "pickup_external_business_id": "ase-243-dzs",
        "pickup_external_store_id": "ase-243-dzs",
        "dropoff_address": "901 Market Street 6th Floor San Francisco, CA 94103",
        "dropoff_business_name": "The Avery Condominium",
        "dropoff_location": {
          "lat": 123.1312343,
          "lng": -37.2144343
        },
        "dropoff_phone_number": "+16505555555",
        "dropoff_instructions": "Enter gate code 1234 on the callbox.",
        "dropoff_contact_given_name": "John",
        "dropoff_contact_family_name": "Doe",
        "dropoff_contact_send_notifications": true,
        "dropoff_options": {
          "signature": "required",
          "id_verification": "required",
          "proof_of_delivery": "photo_required"
        },
        "shopping_options": {
          "payment_method": "red_card",
          "payment_barcode": "12345",
          "payment_gift_cards": [
            "123443434",
            "123443435"
          ],
          "ready_for_pickup_by": "2018-08-22T17:20:28Z",
          "dropoff_contact_loyalty_number": "1234-5678-9876-5432-1"
        },
        "order_value": 1999,
        "items": [
          {
            "name": "Mega Bean and Cheese Burrito",
            "description": "Mega Burrito contains the biggest beans of the land with extra cheese.",
            "quantity": 2,
            "external_id": "123-123443434b",
            "external_instance_id": 12,
            "volume": 5.3,
            "weight": 2.8,
            "length": 2.8,
            "width": 2.8,
            "height": 2.8,
            "price": 1000,
            "barcode": 12342830041,
            "item_options": {
              "substitute_item_ids": [
                "123443434",
                "123443435"
              ],
              "weight_unit": "oz",
              "substitution_preference": "refund"
            }
          }
        ],
        "pickup_time": "2018-08-22T17:20:28Z",
        "dropoff_time": "2018-08-22T17:20:28Z",
        "pickup_window": {
          "start_time": "2018-08-22T17:20:28Z",
          "end_time": "2018-08-22T17:20:28Z"
        },
        "dropoff_window": {
          "start_time": "2018-08-22T17:20:28Z",
          "end_time": "2018-08-22T17:20:28Z"
        },
        "contactless_dropoff": false,
        "action_if_undeliverable": "return_to_pickup",
        "tip": 599,
        "order_contains": {
          "alcohol": false,
          "pharmacy_items": false,
          "age_restricted_pharmacy_items": false
        },
        "dasher_allowed_vehicles": [
          "car",
          "bicycle",
          "walking"
        ],
        "dropoff_requires_signature": false,
        "promotion_id": "ee680b87-0016-496e-ac3c-d3f33ab54c1c",
        "dropoff_cash_on_delivery": 1999
      }

    axios
        .post('https://openapi.doordash.com/drive/v2/quotes', body, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }), // This line was misplaced
        })
        .then(function (response) {
            console.log(response.data);
            // Handle response here
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return error;
            // Handle error here
        });

    return "No data found";
});


router.get('/:token', (req, res) => {
    const token = req.params.token;
    const body = JSON.stringify({
        external_delivery_id: 'D-12345',
        pickup_address: '901 Market Street 6th Floor San Francisco, CA 94103',
        pickup_business_name: 'Wells Fargo SF Downtown',
        pickup_phone_number: '+16505555555',
        pickup_instructions: 'Enter gate code 1234 on the callbox.',
        dropoff_address: '901 Market Street 6th Floor San Francisco, CA 94103',
        dropoff_business_name: 'Wells Fargo SF Downtown',
        dropoff_phone_number: '+16505555555',
        dropoff_instructions: 'Enter gate code 1234 on the callbox.',
        order_value: 1999,
    })

    axios
        .post('https://openapi.doordash.com/drive/v2/deliveries', body, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })

});

module.exports = router;
