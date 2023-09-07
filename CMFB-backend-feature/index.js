const express = require('express');
const { query } = require('express-validator');
const cors = require('cors');
const app = express();
const port = 5040;
const initializeIDSequence = require('./initializeIDSeq')
const registerSchemas = require('./registerSchema')
const IOREDIS = require('ioredis')

const ioredis_client = new IOREDIS("redis://default:ea614b3c872244ebae7229f76f5a5915@correct-civet-35597.upstash.io:35597");

// calling exports and connecting to mongodb
const mongoDB = require('./db');
mongoDB();


const bodyParser = require('body-parser');


// Middleware
app.use(cors());
// Middleware to check the cache before fetching data from the database
// app.use(express.json);
app.use(bodyParser.json());
app.use('/cmfb/user', require("./controller/UserController"));
app.use('/cmfb/donation', require("./controller/DonationController"));
app.use('/cmfb', require("./controller/StripeCheckout"));
app.use('/cmfb/feedback', require("./controller/FeedbackController"));
app.use('/cmfb/foodBank', require("./controller/FoodBankController"));
app.use('/cmfb/inventory', require("./controller/InventoryController"));
app.use('/cmfb/vendingLocation', require("./controller/VendingLocationController"));




// app.use('/auth', authRoutes);

// initializeIDSequence()
//   .then(() => {
//     // Start your server or perform other operations
//     registerSchemas()
//     console.log('Application started.');
//   })
//   .catch((error) => {
//     console.error('Error initializing IDSequence collection:', error);
//   });

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

  

module.exports = ioredis_client;