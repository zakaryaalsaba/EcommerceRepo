const express = require("express");
const cors = require("cors");
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })

const app = express()

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  authSwitchHandler: function ({ pluginName, pluginData }, cb) {
    if (pluginName === 'caching_sha2_password') {
      cb(null, Buffer.from('mysql_native_password'));
    } else {
      cb(new Error('Unsupported authentication plugin'));
    }
  },
});

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.set('view engine', 'hbs');

db.connect((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('connected to MYSql..')
  }
})

const userRouter = require('./routes/users')
app.use('/users', userRouter)

const venderRouter = require('./routes/venders')
app.use('/venders', venderRouter)

const vendorProductsRouter = require('./routes/vendorProducts')
app.use('/vendorProducts', vendorProductsRouter)

const productRouter = require('./routes/products')
app.use('/products', productRouter)

const cartRouter = require('./routes/carts')
app.use('/carts', cartRouter)

const cartsProfileRouter = require('./routes/cartsProfile')
app.use('/cartsProfile', cartsProfileRouter)

const orderItemsRouter = require('./routes/orderItems')
app.use('/orderItems', orderItemsRouter)

const ordersRouter = require('./routes/orders')
app.use('/orders', ordersRouter)

const productcategoriesRouter = require('./routes/productcategories')
app.use('/productcategories', productcategoriesRouter)

const shippingAddressesRouter = require('./routes/shippingAddresses')
app.use('/shippingAddresses', shippingAddressesRouter)

const reviewsRouter = require('./routes/reviews');
const { default: Stripe } = require("stripe");
app.use('/reviews', reviewsRouter)

const stripeRoute = require('./routes/stripeRoutes')
app.use('/stripeRoutes', stripeRoute);

const doorDashRoutes = require('./routes/doorDashRoute')
app.use('/doorDashRoute', doorDashRoutes)

app.get("/", (req, res) => {
  res.render("index")
})
app.get("/signup", (req, res) => {
  res.render("signup")
})
app.get("/register", (req, res) => {
  res.render("register")
})

app.listen(3000, () => console.log('server started'))