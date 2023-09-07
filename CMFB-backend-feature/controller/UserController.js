const express = require("express");
const Users = require("../model/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Redis = require('../redis_func');
const redisInstance = new Redis();

const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const validateUserData = [
  body('name').notEmpty().withMessage('Name is required'),
  body("email").isEmail().withMessage('Please provide a valid email address.'),
  body("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('address').notEmpty().withMessage('Address is required'),
  body('role').notEmpty().withMessage('Role is required'),
];

// User registration
router.post("/register",validateUserData, async (req, res) => {
  //validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("error in bopdy")
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user already exists
    const { email, address, phone, role, name, password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    let salt = await bcrypt.genSalt(10)
    let securePassword = await bcrypt.hash(password, salt)


    // Create a new user object
    //user registration
    const newUser = new Users();
    
    newUser.email = email;
    newUser.address = address,
    newUser.phone = phone,
    newUser.role = role,
    newUser.name = name,
    newUser.password = securePassword;
    
    
    // Save the user to the database
    const savedUser = await newUser.save();


    // // Create a new user
    // const newUser = new User({ name, email, password: hashedPassword });
    // await newUser.save();

    res.status(201).json({ message: "User registered successfully", data: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});


const validateLoginData = [
  body('email').isEmail().withMessage('Please provide a valid email address.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

// User login
router.post('/login', validateLoginData, async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Passwords do not match
      return res.status(401).json({ message: 'Invalid credentials' });
    }
 
    res.status(200).json({ message: 'Login successful', data: user });

    // Generate JWT token
    // const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
    //   expiresIn: '1h',
    // });

    
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

//get all user
router.get("/getAllUsers", async (req, res) => {
  try {
    console.log("entered");
    // redisInstance.getRedisData('getAllUsers').then(data => {
      // console.log("entered get metho and got somethingr" , data)
      // if (data.result) {
      //   console.log('Data found in Redis:', data);
      //   return res.status(200).json({ source: "Redis" , message: "Fetched all Users data successfully " , data: JSON.parse(data.result)})
      // } else {
        // If data is not found in Redis, fetch it from the database and return it
        Users.find({}).then(databaseData => {
          // Store the data in Redis cache for future use (optional)
          // redisInstance.setRedisData('getAllUsers', JSON.stringify(databaseData));
          return res.status(200).json({ source: "Database" , message: "Fetched all Users data successfully", data: databaseData});  // Return the donations as a JSON response
        })
      // }
    // });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});


// Route to fetch a single user by ID
router.post('/getUser',
[
  body('email').isEmail().withMessage('Please provide a valid email address.')
],
 async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  try {
    const user = await Users.findOne(req.params.email).populate('role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({message: "User fetched", data: user});
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error });
  }
});



// Route to update a user
router.put('/userUpdate', [
  // Validation using express-validator
  body('name').notEmpty().withMessage('Name is required'),
  body("email").isEmail().withMessage('Please provide a valid email address.'),
  body("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('address').notEmpty().withMessage('Address is required'),
  body('role').notEmpty().withMessage('Role is required'),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updatedUser = await Users.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', data: updatedUser});
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error });
  }
});



// Route to delete a user
router.delete('/deleteUser',
[
  body('email').isEmail().withMessage('Please provide a valid email address.')
],
async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const deletedUser = await Users.findOneAndDelete({ email: req.body.email })
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;
