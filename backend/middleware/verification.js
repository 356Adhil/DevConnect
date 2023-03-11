
const jwt = require('jsonwebtoken');

module.exports = {
  verify: (req, res, next) => {
console.log("ethiiiii");
    const token = req.headers.authorization
    if (!token) {
      console.log("no token");
      return res.status(400).send({
        token: false,
        message: 'No taken provided',
      });
    }
    try {
      const decoded = jwt.verify(token,"secret");

      if (decoded){
console.log(decoded._id);
         
        req.id =decoded._id
        next();
      }
      else {
      console.log("invalid token");
        return res.status(400).send({
          token: false,
          message: 'invalid token',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        token: false,
        message: 'invalid token',
      });
    }
  },
};