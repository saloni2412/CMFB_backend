const express = require("express");
const FeedBack = require("../model/FeedBack");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Redis = require('../redis_func');
const redisInstance = new Redis();

// Feedback CRUD operations
router.post("/feedBack",
  [
    body('email').isEmail().withMessage('User ID must be a number.'),
    body('user_name').notEmpty().withMessage('User name is required.'),
    body('feedback_message').notEmpty().withMessage('Feedback message is required.'),
    body('feedback_date').isISO8601().withMessage('Invalid date format.'),
  ], async (req, res) => {
  
  try {

    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];
    console.log(currentDate);

  
    const newFeedback = await FeedBack.create({
      feedback_message: req.body.feedback_message,
      feedback_date: req.body.feedback_date,
      user_name: req.body.user_name,
      email: req.body.email
    });;

    redisInstance.deleteKey('/getAllFeedBacks')
    res.status(201).json({ message: "Feedback made successfully", data:  newFeedback});
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal server error", error });
}
});

router.get("/getAllFeedBacks", async (req, res) => {
try {
  redisInstance.getRedisData('getAllFeedBacks').then(data => {
      console.log("entered get metho and got somethingr" , data)
      if (data.result) {
        console.log('Data found in Redis:', data);
        return res.status(200).json({ source: "Redis" , message: "Fetched all Feedback successfully " , data: JSON.parse(data.result)})
      } else {
        // If data is not found in Redis, fetch it from the database and return it
        FeedBack.find({}).then(databaseData => {
          // Store the data in Redis cache for future use (optional)
          redisInstance.setRedisData('getAllFeedBacks', JSON.stringify(databaseData));
          return res.status(200).json({ source: "Database" , message: "Fetched all Feedback successfully", data: databaseData});  // Return the donations as a JSON response
        })
      }
    });
} catch (error) {
  res.status(500).json({ message: "Error fetching feedback", error });
}
});


// Route to fetch a single feedback by ID
router.get('/feedback/:id', async (req, res) => {
try {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid feedback ID' });
  }
  
  const getFeedback = await FeedBack.findById(req.params.id);
  if (!getFeedback) {
    return res.status(404).json({ message: 'Feedback not found' });
  }
  res.status(200).json({message: "Feedback got successfully", data:  getFeedback});
} catch (error) {
  console.error('Error fetching feedback:', error);
  res.status(500).json({ message: 'Error fetching feedback' });
}
});


// Route to update a feedback
router.put('/feedback/:id',
[
  body('email').notEmpty().withMessage('User Email must be a number.'),
  body('user_name').notEmpty().withMessage('User name is required.'),
  body('feedback_message').notEmpty().withMessage('Feedback message is required.'),
  body('feedback_date').isISO8601().withMessage('Invalid date format.'),
], async (req, res) => {
try {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.params)
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid feedback ID' });
  }

  const updatedFeedback = await FeedBack.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedFeedback) {
    return res.status(404).json({ message: 'FeedBack not found' });
  }

  res.status(200).json({ message: 'Feedback Updated Successfully' , data: updatedFeedback});
} catch (error) {
  console.error('Error updating feedback:', error);
  res.status(500).json({ message: 'Error updating feedback', error });
}
});

// Route to delete a feedback
router.delete('/:id', async (req, res) => {
try {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid feedback ID' });
  }

  const deletedFeedback = await FeedBack.findByIdAndDelete(req.params.id);
  if (!deletedFeedback) {
    return res.status(404).json({ message: 'No such Feedback' });
  }
  res.status(200).json({ message: 'Feedback deleted successfully', data: deletedFeedback });
} catch (error) {
  console.error('Error deleting feedback:', error);
  res.status(500).json({ message: 'Error deleting feedback' });
}
});

module.exports = router;