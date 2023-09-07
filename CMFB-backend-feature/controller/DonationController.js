const express = require("express");
const Donations = require("../model/Donation");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Redis = require('../redis_func');
const { json } = require("body-parser");
const redisInstance = new Redis();


router.post("/donate",
  [
    body('amount').isNumeric().withMessage('Donation amount must be a number.'),
    body('username').notEmpty().withMessage('User Name must not be null.'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('paymentMethodId').notEmpty().withMessage('Please try again as paymentID not generated.')
  ], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      console.log("emtered here");
      const today = new Date();
      const currentDate = today.toISOString().split('T')[0];
      console.log(currentDate);
      const newDonation = await Donations.create({
        donation_amount: req.body.amount,
        donation_datetime: currentDate,
        user_name: req.body.username,
        user_email: req.body.email,
        payment_id: req.body.paymentMethodId
      });

      redisInstance.deleteKey('/getAllDonations')
      res.status(201).json({ message: "Donation made successfully", data: newDonation });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error });
    }
  });

router.get("/getAllDonations", async (req, res) => {
  try {
    redisInstance.getRedisData('getAllDonations').then(data => {
      console.log("entered get metho and got somethingr", data)
      if (data.result) {
        console.log('Data found in Redis:', data);
        return res.status(200).json({ source: "Redis", message: "Fetched all Donations successfully ", data: JSON.parse(data.result) })
      } else {
        // If data is not found in Redis, fetch it from the database and return it
        Donations.find({}).then(databaseData => {
          // Store the data in Redis cache for future use (optional)
          redisInstance.setRedisData('/getAllDonations', JSON.stringify(databaseData));
          return res.status(200).json({ source: "Database", message: "Fetched all Donations successfully", data: databaseData });  // Return the donations as a JSON response
        })
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error: error });
  }
});


// Route to fetch a single donation by ID
router.get('/donations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const baseURL = 'donations';
    const setURL = `${baseURL}/id:${id}`;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid donation ID' });
    }
    console.log(setURL)
    // redisInstance.getRedisData(`donations/${id}`).then(data => {
    //   console.log("entered get metho and got somethingr" )
    //   if (data.result) {
    //     console.log('Data found in Redis:');
    //     return res.status(200).json({ source: "Redis" , message: "Fetched all Donations successfully " , data: JSON.parse(data.result)})
    //   } else {
    //     console.log("entered else");
    //     // If data is not found in Redis, fetch it from the database and return it
    Donations.findById(req.params.id).then(databaseData => {

      if (!databaseData) {
        // Data with the specified id was not found in the database
        return res.status(404).json({ message: "Donation Data not found" });
      }
      // Store the data in Redis cache for future use (optional)
      // redisInstance.setRedisData(setURL, JSON.stringify(databaseData));
      return res.status(200).json({ source: "Database", message: `Fetched Donations Data successfully for ${id}`, data: databaseData });  // Return the donations as a JSON response
    })
    //   }
    // });
  } catch (error) {
    console.error('Error fetching donation:');
    res.status(500).json({ message: 'Error fetching donation' });
  }
});


// Route to update a donation
router.put('/donations/:id', [
  body('donation_amount').isNumeric().withMessage('Donation amount must be a number.'),
  body('donation_datetime').isISO8601().withMessage('Invalid date format.'),
  body('user_name').notEmpty().withMessage('User Name must not be null.'),
  body('user_email').notEmpty().withMessage('User Email must not be null.'),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid donation ID' });
    }

    const updatedDonation = await Donations.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json({ message: 'Donation updated successfully', data: updatedDonation });
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ message: 'Error updating donation', error });
  }
});

// Route to delete a donation
router.delete('/donations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid donation ID' });
    }

    const deletedDonation = await Donations.findByIdAndDelete(req.params.id);
    if (!deletedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json({ message: 'Donation deleted successfully', data: deletedDonation });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ message: 'Error deleting donation' });
  }
});


module.exports = router;