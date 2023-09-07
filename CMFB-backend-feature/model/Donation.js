const mongoose = require('mongoose');
const { Schema } = mongoose;
// const IDSequence = require('./IDSequence')



const donationSchema = new Schema({
  donation_amount: {
    type: Number,
    required: true
  },
  donation_datetime: {
    type: Date,
    required: true
  },
  user_name :{
    type: String,
    required: true
  },
  user_email :{
    type: String,
    required: true
  },
  payment_id:{
    type: String,
    required: true
    
  }
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   unique: true,
  //   auto:true
  // }
});


// donationSchema.pre('save', async function (next) {
//   const doc = this;
  
//     const sequence = await IDSequence.findOneAndUpdate(
//       { name: 'Donations' },
//       { $inc: { value: 1 } },
//       { new: true }
//     ).exec();

//     doc.donation_id = sequence.value;
  
//   next();
// });


//user sollction in db
const Donations = mongoose.model('Donations', donationSchema,'Donations');

module.exports = Donations;