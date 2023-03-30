const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;
const Article = require("../../models/articleModal");
const Events = require("../../models/eventsModel");

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
        if(user.isBlock == false ){
          const token = createToken(user._id);
          return res.status(200).json({ email, token, user });
        } else {
          return res.status(401).json({ message: "This account has been blocked by admin !!" });
        }
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
      User.findOne({ _id: id }).then((user) => {
        if (user) {
          if(user.isBlock == false ){
            res.send({ user });
          } else {
            return res.status(401).json({ message: "This account has been blocked by admin !!" });
          }
        }
      });
    } catch (error) {
      console.error();
    }
  },

  postEditProfile: async (req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const about = req.body.about;
    try {
      const id = req.id;
      const user = await User.findOne({ _id: id });
      if (user) {
        if(user.isBlock == false ){
          await User.updateOne(
            { _id: id },
            { fullName: fullName, email: email, about: about }
          );
          res.send({ user });
        } else {
          return res.status(401).json({ message: "This account has been blocked by admin !!" });
        }
      }
    } catch (error) {
      console.error(error);
    }
  },

  postArticle: async (req, res) => {
    title = req.body.title;
    content = req.body.content;
    const image = req.file.path
    try {     
      const id = req.id;
      const user = await User.findOne({ _id: id });
      if(user.isBlock == false ){
        const article = await Article.create({
          title: title,   
          content: content,
          userName: user.fullName,
          coverImg:image
        });
        return res.status(200).json({ article, message: "Article Created" });
      } else {
        return res.status(401).json({ message: "This account has been blocked by admin !!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getArticle: async (req, res) => {
    try {
      Article.find().then((article) => {
        if (article) {
          res.send({ article });
        }
      });
    } catch (error) {
      console.error();
    }
  },

  postEvent: async (req, res) => {
    const data = req.body;
    const inputDate = data.date;
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    try {
      const id = req.id;
      const user = await User.findOne({ _id: id });
      if(user.isBlock == false ){
        const events = await Events.create({
          title: data.title,
          description: data.description,
          userId: user._id,
          eventDate: formattedDate,
          category: data.category,
        });
        return res.status(200).json({ events, message: "Event Created" });
      } else {
        return res.status(401).json({ message: "This account has been blocked by admin !!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getEvent: async (req, res) => {
    try {
      const events = await Events.find();
        res.json( events ).status(200)
    } catch (error) {
      console.error(error);
    }
  },  
};
