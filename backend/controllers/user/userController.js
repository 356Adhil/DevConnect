const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;
const Article = require("../../models/articleModal");
const Events = require("../../models/eventsModel");
const Community = require("../../models/communityModel");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const Booking = require("../../models/eventBooking");

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
        await User.updateOne(
          { _id: id },
          { fullName: fullName, email: email, about: about }
        );
        res.send({ user });
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
      const article = await Article.create({
        title: title,
        content: content,
        userName: user.fullName,
        coverImg: image,
        userId: id,
      });
      return res.status(200).json({ article, message: "Article Created" });
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

    // Check if the event date is in the past
    if (dateObj < new Date()) {
      return res.status(400).json({ message: "Cannot add events with past dates" });
    }

    try {
      const events = await Events.create({
        title: data.title,
        description: data.description,
        userId: req.id,
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
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },


  getEvent: async (req, res) => {
    try {
      const currentDate = new Date();
      const events = await Events.find({ eventDate: { $gte: currentDate } });
      res.json(events).status(200);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
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
        eventDate: { $gte: new Date() },
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
    
      const userData = await User.findOne({ _id: userId }).select("fullName");
      // check if the user is already a member of the community
      const community = await Community.findById(communityId);
    
      const members = [];
      for (const memberId of community.members) {
        const communityMember = await User.findById(memberId);
        members.push(communityMember);
      }
      if (community.members.includes(userId)) {
        return res.json({
          userData,
          community,
          members,
          message: `Welcome to ${community.title} community`,
        });
      }
    
      // add the user to the community's members array
      community.members.push(userId);
      await community.save();
    
      // add the community to the user's communities array
      const user = await User.findById(userId);
      user.communities.push(communityId);
      await user.save();
    
      res.status(200).json({
        userData,
        community,
        members,
        message: `User added to ${community.title} community`,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
    
  },

  storeMessages: async (req, res) => {
    try {
      const communityId = req.params.id;
      const { room, author, message, time } = req.body;
      // Create a new message object
      const messages = {
        message: message,
        author: author,
        room: room,
        time: time,
      };

      // Find the community by ID
      Community.findById(communityId)
        .then((community) => {
          // Push the new message to the messages array
          community.messages.push(messages);
          res.send(community.messages);
          return community.save();
        })
        .then((updatedCommunity) => {})
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },

  getMessages: async (req, res) => {
    try {
      const communityId = req.params.id;
      // Find the community by ID
      Community.findById(communityId).then((community) => {
        res.send(community.messages);
      });
    } catch (error) {
      console.log(error);
    }
  },

  postBookEvent: async (req, res) => {
    try {
      const { eventId, userId, username, email } = req.body;
      const event = await Events.findById(eventId);
        
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      const booking = await Booking.findOne({ eventId, userId });
  
      if (booking) {
        return res.json({ error: "You have already booked this event" });
      }
  
      if (event.eventSeats <= 0) {
        return res.json({ error: "Event is already fully booked" });
      }
  
      const newBooking = new Booking({ eventId, userId, username, email });
      await newBooking.save();
  
      await Events.findByIdAndUpdate(
        eventId,
        {
          $inc: { eventSeats: -1 },
        },
        { new: true }
      );
  
      res.json({ message: "Event booked successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
};
