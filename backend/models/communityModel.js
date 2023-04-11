const mongoose = require("mongoose");
const    messageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  author: {
    type: String,
  },
  time: {
    type: String,
  },
});

const communitySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  isShow: {
    type: Boolean,
    default: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  messages: [messageSchema],
});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;
