const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://chetanrawat560933:*Cricket3167@cluster0.qvorlem.mongodb.net/CMFB";


const mongoDB = async () => {
  await mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("Connected to MongoDB");
      
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB", error);
    });
};

// to export this to other files
module.exports = mongoDB;
