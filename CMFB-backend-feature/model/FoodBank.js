const mongoose = require('mongoose');
const { Schema } = mongoose;



const foodBankSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  zipcode:{
    type: String,
    required: true
  },
  province:{
    type: String,
    required: true
  },
  helpline:{
    type: String,
    required: true
  }
});



//user sollction in db
const FoodBanks = mongoose.model('FoodBanks', foodBankSchema,'FoodBanks');

module.exports = FoodBanks;