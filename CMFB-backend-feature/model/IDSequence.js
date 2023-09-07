const mongoose = require('mongoose');

const idSequenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    default: 0,
  },
});

const IDSequence = mongoose.model('IDSequence', idSequenceSchema);

module.exports = IDSequence;