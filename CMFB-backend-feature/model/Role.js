const mongoose = require('mongoose');
const { Schema } = mongoose;


const roleSchema = new mongoose.Schema({
  roleType: {
    type: String,
    required: true
  }
});



const Role = mongoose.model('Role', roleSchema);

module.exports = Role;