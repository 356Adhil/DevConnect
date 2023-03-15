const { response } = require("express");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const { find } = require("../../models/userModel");
const secretKey = "secret"; // set your own secret key here

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dryuwxaf6",
  api_key: "683424611214174",
  api_secret: "nEppa5gn66QyzHp4Wtp4izq-raE",
});

const createToken = (_id) => {
  return jwt.sign({ _id }, secretKey, { expiresIn: "1d" });
};

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

        return res.status(200).json({ message: "User created successfully" }); // include token in response
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  postLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email, password });

      if (user) {
        console.log(user);
        console.log("userDetails......:", user);
        const token = createToken(user._id);
        return res.status(200).json({ email, token, user });
      } else {
        return res.status(401).json({ message: "Invalid login credentials" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getProfile: (req, res) => {
    try {
      const id = req.id;
console.log(id);
      User.findOne({ _id: id }).then((user) => {

        if (user) {
          res.send({ user });
        }
      });
    } catch (error) {
      console.error();
    }
  },

  postEditProfile: async (req,res) =>{
    console.log('hi.....hi')
    console.log(req.body)
   const fullName = req.body.fullName;
  const email = req.body.email;
  const about = req.body.about;
  try {
    const id = req.id;
    const user = await User.findOne({ _id: id });
    if (user) {
      await User.updateOne({ _id: id },{fullName:fullName, email:email, about:about});
      console.log("updated....");
      res.send({ user });
    }
  } catch (error) {
    console.error(error);
  }

  }


};
