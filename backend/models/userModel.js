const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  communities : [
    {
        type: mongoose.Schema.Types.ObjectId,
    }
  ],

  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
  },
  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/DevConnect_Profile/image/upload/v1623259449/default-profile-pic.png",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
