const mongoose = require("mongoose");

const registerSchemas = () => {
  // Import all the model classes
  const Users = require("./model/Users");
  const Donations = require("./model/Donation");
  const Feedback = require("./model/FeedBack");
  const FoodBanks = require("./model/FoodBank");
  const Inventory = require("./model/Inventory");
  const VendingLocation = require("./model/VendingLocation");
  const IDSequence = require("./model/IDSequence")
  // Add more model imports as needed

  // Register the schemas or collections
  mongoose.model("Users", Users);
  mongoose.model("Donations", Donations);
  mongoose.model("Feedback", Feedback);
  mongoose.model("FoodBanks", FoodBanks);
  mongoose.model("Inventory", Inventory);
  mongoose.model("VendingLocation", VendingLocation);
  mongoose.model("IDSequence", IDSequence);
  // Register more models as needed
};

module.exports = registerSchemas;
