const { response } = require("express");
const Admin = require("../../models/adminModel");
const jwt = require("jsonwebtoken");
const { find } = require("../../models/adminModel");
const secretKey = "secret"; // set your own secret key here
require('dotenv').config();
const adminMail = 'admin@gmail.com'
const adminPass = '110011'

module.exports = {
    adminPostSign: async (req,res)=>{
      
      
        const { email, password } = req.body;
        console.log(email,password)
        try {
          if (email === adminMail && password === adminPass) {
            const token = jwt.sign({ email }, secretKey, { expiresIn: "1d" });
            return res.status(200).json({ email, token });
          }
          else {
            return res.status(401).json({ message: "Invalid login credentials" });
          }

          } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
          }
    }
}