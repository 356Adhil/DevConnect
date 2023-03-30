require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const adminMail = process.env.ADMIN_MAIL;
const adminPass = process.env.ADMIN_PASS;
const User = require("../../models/userModel");
const Event = require("../../models/eventsModel");
const Community = require("../../models/communityModel")

module.exports = {
  adminPostSign: async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      if (email === adminMail && password === adminPass) {
        const token = jwt.sign({ email }, secretKey, { expiresIn: "1d" });
        return res.status(200).json({ email, token });
      } else {
        return res.status(401).json({ message: "Invalid login credentials" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  adminGetUsers: async (req, res) => {
    const users = await User.find();
    res.send(users);
  },

  blockUser: (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      let value;
      User.findById(id).then((data) => {
        if (data.isBlock === true) {
          value = false;
        } else {
          value = true;
        }
        User.findByIdAndUpdate(id, { isBlock: value }).then((user) => {
          if (user) {
            res.send({ succes: true });
          }
        });
      });
    } catch (error) {
      console.error();
    }
  },

  adminGetEvents: async (req, res) => {
    try {
      const events = await Event.find();
      const eventsWithCreatorDetails = await Promise.all(
        events.map(async (event) => {
          const creator = await User.findOne({ _id: event.userId });
          return { ...event.toObject(), creator };
        })
      );
      res.send(eventsWithCreatorDetails);
    } catch (error) {
      res.status(500).send({ message: "Error getting events", error });
    }
  },

  approveEvent: (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      let value;
      Event.findById(id).then((data) => {
        console.log(data);
        if (data.isApproved === true) {
          value = false;
        } else {
          value = true;
        }
        Event.findByIdAndUpdate(id, { isApproved: value }).then((event) => {
          if (event) {
            console.log(event);
            res.send({ succes: true });
          }
        });
      });
    } catch (error) {
      console.error();
    }
  },

  postCommunity: async (req, res) => {
    try {
      const data = req.body; 
      console.log("hello hello hello")
      const communities = await Community.create({
        title: data.name,
        description: data.description,
      });
      console.log(communities)
    } catch (error) {
      console.error(error);
    }
  },
};
