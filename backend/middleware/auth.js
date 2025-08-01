const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Expect the token in the Authorization header: Bearer <token>
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Authorization denied: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied: Malformed token' });
  }

  try {
    // Verify the token and extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user id from payload to request object for use in controllers
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Authorization denied: Invalid token' });
  }
};
