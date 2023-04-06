const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;
const Article = require("../../models/articleModal");
const Events = require("../../models/eventsModel");
const Community = require("../../models/communityModel");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

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
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with the hashed password
        const user = await User.create({
          fullName: fullName,
          password: hashedPassword,
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
      const user = await User.findOne({ email });

      if (user) {
        if (user.isBlock) {
          return res
            .status(401)
            .json({ message: "This account has been blocked by admin !!" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          const token = createToken(user._id);
          return res.status(200).json({ email, token, user });
        } else {
          return res.status(401).json({ message: "Invalid login credentials" });
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
          if (user.isBlock == false) {
            res.send({ user });
          } else {
            return res
              .status(401)
              .json({ message: "This account has been blocked by admin !!" });
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
        if (user.isBlock == false) {
          await User.updateOne(
            { _id: id },
            { fullName: fullName, email: email, about: about }
          );
          res.send({ user });
        } else {
          return res
            .status(401)
            .json({ message: "This account has been blocked by admin !!" });
        }
      }
    } catch (error) {
      console.error(error);
    }
  },

  postArticle: async (req, res) => {
    title = req.body.title;
    content = req.body.content;
    const image = req.file.path;
    try {
      const id = req.id;
      const user = await User.findOne({ _id: id });
      if (user.isBlock == false) {
        const article = await Article.create({
          title: title,
          content: content,
          userName: user.fullName,
          coverImg: image,
        });
        return res.status(200).json({ article, message: "Article Created" });
      } else {
        return res
          .status(401)
          .json({ message: "This account has been blocked by admin !!" });
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
    const image = req.file.path;

    try {
      const id = req.id;
      const user = await User.findOne({ _id: id });
      if (user.isBlock == false) {
        const currentDate = new Date();
        if (dateObj < currentDate) {
          return res
            .status(400)
            .json({
              message: "Evant cannot be added ! Event date is in the past !",
            });
        }
        const events = await Events.create({
          title: data.title,
          description: data.description,
          userId: user._id,
          eventDate: dateObj,
          eventTime: data.time,
          location: data.location,
          eventSeats: data.seats,
          category: data.category,
          coverImg: image,
        });
        return res.status(200).json({
          events,
          message: "Event Added, Awaiting Approval From Admin !",
        });
      } else {
        return res
          .status(401)
          .json({ message: "This account has been blocked by admin !!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  getEvent: async (req, res) => {
    try {
      const currentDate = new Date();
      const events = await Events.find({ eventDate: { $gte: currentDate } });
      console.log("events:", events);
      res.json(events).status(200);
    } catch (error) {
      console.error(error);
    }
  },

  getUserEvents: async (req, res) => {
    try {
      const userId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send("Invalid user ID");
      }

      const events = await Events.find({
        userId,
        eventDate: { $lte: new Date() },
      });

      if (!events || events.length === 0) {
        return res.status(404).send("No upcoming events found for user");
      }

      res.send(events);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },

  getCommunity: async (req, res) => {
    try {
      const community = await Community.find({ isShow: true });
      res.json(community).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },

  joinCommunity: async (req, res) => {
    try {
      const communityId = req.params.id;
      const userId = req.id;
      
      
      // check if the user is already a member of the community
      const community = await Community.findById(communityId);
      if (community.members.includes(userId)) {
        const userData = await User.findOne({ _id: userId }).select("fullName");
        return res.json({userData,community, message: `User already in ${community.title} community` });
      }

      // add the user to the community's members array
      community.members.push(userId);
      await community.save();

      // add the community to the user's communities array
      const user = await User.findById(userId);
      user.communities.push(communityId);
      await user.save();
      
      res.status(200).json({ message: `User added to ${community.title} community` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

};
