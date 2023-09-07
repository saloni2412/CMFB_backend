const express = require("express");
const FoodBanks = require("../model/FoodBank");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Redis = require('../redis_func');
const redisInstance = new Redis();

router.post("/foodbank",
[
  body('address').notEmpty().withMessage('Address is required.'),
  body('zipcode').notEmpty().withMessage('Zipcode is required.'),
  body('province').notEmpty().withMessage('Province is required.'),
  body('helpline').notEmpty().withMessage('Helpline is required.')
], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("error in bopdy")
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const newFoodBank = await FoodBanks.create({
      address: req.body.address,
      zipcode: req.body.zipcode,
      province: req.body.province,
      helpline: req.body.helpline,
    });

    redisInstance.deleteKey('/getAllFoodBanks')
    res.status(201).json({ message: "FoodBank created successfully", data: newFoodBank });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal server error", error });
}
});

router.get("/getAllFoodBanks", async (req, res) => {
try {
  redisInstance.getRedisData('getAllFoodBanks').then(data => {
    console.log("entered get metho and got somethingr" , data)
    if (data.result) {
      console.log('Data found in Redis:', data);
      return res.status(200).json({ source: "Redis" , message: "Fetched all Food Bank successfully " , data: JSON.parse(data.result)})
    } else {
      // If data is not found in Redis, fetch it from the database and return it
      FoodBanks.find({}).then(databaseData => {
        // Store the data in Redis cache for future use (optional)
        redisInstance.setRedisData('getAllFoodBanks', JSON.stringify(databaseData));
        return res.status(200).json({ source: "Database" , message: "Fetched all FoodBank successfully", data: databaseData});  // Return the donations as a JSON response
      })
    }
  }); 
} catch (error) {
  res.status(500).json({ message: "Error fetching FoodBanks", error });
}
});

router.get('/foodbank/:id', async (req, res) => {
try {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid foodbank ID' });
  }
  
  const getFoodBank = await FoodBanks.findById(req.params.id);
  if (!getFoodBank) {
    return res.status(404).json({ message: 'FoodBanks not found' });
  }
  res.json(getFoodBank);
} catch (error) {
  console.error('Error fetching foodbanks:', error);
  res.status(500).json({ message: 'Error fetching foodbanks' });
}
});

// Route to update a foodbanks
router.put('/foodBank/:id',
[
  body('address').notEmpty().withMessage('Address is required.'),
  body('zipcode').notEmpty().withMessage('Zipcode is required.'),
  body('province').notEmpty().withMessage('Province is required.'),
  body('helpline').notEmpty().withMessage('Helpline is required.')
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
    return res.status(400).json({ message: 'Invalid Foodbank ID' });
  }

  const updatedFoodBank = await FoodBanks.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedFoodBank) {
    return res.status(404).json({ message: 'FoodBanks not found' });
  }

  res.status(404).json({ message: 'FoodBank updated successfully', data: updatedFoodBank});
} catch (error) {
  console.error('Error updating FoodBanks:', error);
  res.status(500).json({ message: 'Error updating FoodBanks', error });
}
});

// Route to delete a FoodBanks
router.delete('/:id', async (req, res) => {
try {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid FoodBanks ID' });
  }

  const deletedFoodBanks = await FoodBanks.findByIdAndDelete(req.params.id);
  if (!deletedFoodBanks) {
    return res.status(404).json({ message: 'No such FoodBanks' });
  }
  res.status(200).json({ message: 'FoodBank deleted successfully', data: deletedFoodBanks});
} catch (error) {
  console.error('Error deleting FoodBanks:', error);
  res.status(500).json({ message: 'Error deleting FoodBanks', error });
}
});

module.exports = router;