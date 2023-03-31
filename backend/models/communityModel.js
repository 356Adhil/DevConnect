const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isShow: {
    type: Boolean,
    default: true
  }
});

const Community = mongoose.model("Community", communitySchema);
module.exports = Community;


