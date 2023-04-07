require("dotenv").config();
const jwt = require('jsonwebtoken');

function checkJwtToken(req, res, next) {
  // Get the token from the request headers
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.substring(7);

  // Verify the token
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken.user; // Set the decoded user object on the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = checkJwtToken;
 