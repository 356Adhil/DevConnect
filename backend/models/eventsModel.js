const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  createdDate: {
    type: String,
    default: () => new Date().toISOString().substr(0, 10)
  },
  eventDate: {
    type: String,
    required: true
  },
  userId: {
    type: String,
  } 
});

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;


