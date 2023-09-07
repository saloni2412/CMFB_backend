const mongoose = require('mongoose');
const { Schema } = mongoose;
const IDSequence = require('./IDSequence')


      
const inventorySchema = new Schema({
  item_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  },
  availability: {
    type: Boolean,
    required: true
  }
});

// inventorySchema.pre('save', async function (next) {
//   const doc = this;
  
//     const sequence = await IDSequence.findOneAndUpdate(
//       { name: 'Inventory' },
//       { $inc: { value: 1 } },
//       { new: true }
//     ).exec();

//     doc.item_id = sequence.value;
  
//   next();
// });

//user sollction in db
const Inventory = mongoose.model('Inventory', inventorySchema,'Inventory');

module.exports = Inventory;