const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;

// Initialize auto-increment
// autoIncrement.initialize(connection);

const feedbackSchema = new Schema({
  // i guess only use either name or id
  user_name: {
    type: String,
    required: true,
  },
  feedback_message: {
    type: String,
    required: true
  },
  feedback_date: {
    type: Date,
    required: true
  },
  email:{
    type: String,
    required:true
  }
});

// feedbackSchema.plugin(autoIncrement.plugin, {
//   model: 'Feedback',
//   field: 'feedback_id',
//   startAt: 1, // Specify the starting value for auto-incrementing
//   incrementBy: 1, // Specify the increment value
// });

//user sollction in db
const Feedback = mongoose.model('Feedback', feedbackSchema,'Feedback');

module.exports = Feedback;
