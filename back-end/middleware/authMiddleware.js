const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  // If no token is found, respond with 401 Unauthorized
  if (token == null) return res.sendStatus(401);

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If verification fails, respond with 403 Forbidden
    if (err) return res.sendStatus(403);
    
    // Attach the user info to the request object
    req.user = user;
    // Continue to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;
