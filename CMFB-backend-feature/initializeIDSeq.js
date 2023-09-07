const mongoose = require("mongoose");

const initializeIDSequence = async () => {
    const IDSequence = require('./model/IDSequence');
    
    // Check if the IDSequence collection is already initialized
    const isInitialized = await IDSequence.exists({});
    
    // If not initialized, create a document with the default value
    if (!isInitialized) {
      const sequence = new IDSequence({});
      await sequence.save();
      console.log('IDSequence collection initialized with default value.');
    }
  };

  module.exports = initializeIDSequence;