const mongoose = require('mongoose');
const { Schema } = mongoose;



const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    ref: 'Role'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    unique: true,
    auto:true
  }
});



const Users = mongoose.model('Users', userSchema,'Users');

module.exports = Users;