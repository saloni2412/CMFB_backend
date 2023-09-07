const express = require("express");
const Inventory = require("../model/Inventory");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Redis = require('../redis_func');
const redisInstance = new Redis();

// InventoryManagement CRUD operations
router.post('/addInventory', async (req, res) => {
    try {
      const newInventoryManagement = await Inventory.create(req.body);

      redisInstance.deleteKey('/getAllInventory')
      res.status(201).json({ message: "Inventory added successfully", data: newInventoryManagement});
    } catch (error) {
      res.status(500).json({ message: 'Error creating inventory management', error });
    }
  });
  
  router.get('/getAllInventory', async (req, res) => {
    try {

      redisInstance.getRedisData('getAllInventory').then(data => {
        console.log("entered get metho and got somethingr" , data)
        if (data.result) {
          console.log('Data found in Redis:', data);
          return res.status(200).json({ source: "Redis" , message: "Fetched all Inventory info successfully " , data: JSON.parse(data.result)})
        } else {
          // If data is not found in Redis, fetch it from the database and return it
          Inventory.find({}).then(databaseData => {
            // Store the data in Redis cache for future use (optional)
            redisInstance.setRedisData('getAllInventory', JSON.stringify(databaseData));
            return res.status(200).json({ source: "Database" , message: "Fetched all Inventory info successfully", data: databaseData});  // Return the donations as a JSON response
          })
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching inventory managements', error});
    }
  });

  router.post("/inventory", async (req, res) => {
  
    try {
  
    
      const newInventory = await Inventory.create({
        details: req.body.details,
      });;
  
      res.status(201).json({ message: "Inventory item details created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  });
  
  
  
  router.get('/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Inventory item details ID' });
    }
    
    const getInventory = await Inventory.findById(req.params.id);
    if (!getInventory) {
      return res.status(404).json({ message: 'FoodBanks not found' });
    }
    res.status(200).json({message: "Get inventory success", data: getInventory});
  } catch (error) {
    console.error('Error fetching Inventory item details:', error);
    res.status(500).json({ message: 'Error fetching Inventory item details' });
  }
  });
  
  
  // Route to update a Inventory item details
  router.put('/inventory/:id', async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Inventory item details ID' });
    }
  
    const updatedInventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
  
    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventory item details not found' });
    }
  
    res.status(200).json({ message: 'Inventory updated successfully', data:updatedInventory });
  } catch (error) {
    console.error('Error updating Inventory item details:', error);
    res.status(500).json({ message: 'Error updating Inventory item details', error });
  }
  });
  
  // Route to delete a Inventory
  router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Inventory item details ID' });
    }
  
    const deletedInventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedInventory) {
      return res.status(404).json({ message: 'No such FoodBanks' });
    }
    res.status(200).json({ message: 'Inventory item details deleted successfully', data: deletedInventory });
  } catch (error) {
    console.error('Error deleting Inventory item details:', error);
    res.status(500).json({ message: 'Error deleting Inventory item details', error });
  }
  });

module.exports = router;