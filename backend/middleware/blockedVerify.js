const User = require('../models/userModel');

const checkBlocked = async (req, res, next) => {
  try {
    const id = req.id;
    const user = await User.findOne({ _id: id });
    if (user.isBlock === true) {
      return res.status(401).json({ message: "This account has been blocked by admin !!" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = checkBlocked;
