const { response } = require("express");
const User = require("../../models/userSign");
const jwt = require("jsonwebtoken");
const secretKey = "secret"; // set your own secret key here

module.exports = {
  postSignup: async (req, res) => {
    fullName = req.body.fullName;
    password = req.body.password;
    email = req.body.email;
    phone = req.body.phone;

    try {
      const oldUser = await User.findOne({ email: email });
      if (oldUser) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const user = await User.create({
          fullName: fullName,
          password: password,
          email: email,
          phone: phone,
        });

        const token = jwt.sign({ userId: user._id }, secretKey,{expiresIn:'7d'}); // create token

        return res
          .status(200)
          .json({ message: "User created successfully", token: token }); // include token in response
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

