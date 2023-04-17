const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
