const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signupSchema = new Schema({
    fullName: String,
    phone: Number,
    email: String,
    password: String
});

const User = mongoose.model("users", signupSchema);
module.exports = User;
