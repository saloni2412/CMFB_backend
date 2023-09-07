const mongoose = require('mongoose');
const { Schema } = mongoose;


const vendingLocationSchema = new Schema({
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    unique: true,
  },
  foodbank_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  user_ids: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
});




const VendingLocation = mongoose.model('VendingLocation', vendingLocationSchema,'VendingLocation');

module.exports = VendingLocation;