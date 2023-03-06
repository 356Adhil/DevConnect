const { response } = require("express");
const User = require("../../models/userSign");
const jwt = require("jsonwebtoken");
const { find } = require("../../models/userSign");
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


  postLogin: async (req,res) => {
    try {
      const { email, password } = req.body
     const findUser =  User.findOne({ email:email , password:password})
     if(findUser) {
      
     }
    } catch (error) {
      
    }
  },

  postLogin: async (req,res) => {
    try {
      const { email, password } = req.body;
      User.findOne({ email, password }).then((doc) => {
          if (doc) {
              const reps = {
                  id: doc._id,
                  email: doc.email,
                  name: doc.name,
              }
              const token = jwt.sign(reps, "mykeysecret", { expiresIn: '7d' });
              res.send({ auth: true, token: token, id: reps.id});
              console.log(token)
          } else {
              res.send({ auth: false });
          }
      }).catch((e) => {
          // console.log(e);
          res.status(505).send(e);
      })  
    } catch (error) {
      console.log(error);
    }
  }
};

