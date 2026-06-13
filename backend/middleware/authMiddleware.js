import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Route guard middleware to protect endpoints using JWT verification.
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the raw token string
      token = req.headers.authorization.split(' ')[1];

      // Verify its integrity against JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Retrieve the authenticated user excluding password and attach to request
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          message: '401 Unauthorized: Access Token Invalid or Expired'
        });
      }

      next();
    } catch (error) {
      console.warn('JWT Verification Intercept:', error.message);
      return res.status(401).json({
        message: '401 Unauthorized: Access Token Invalid or Expired'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: '401 Unauthorized: Access Token Invalid or Expired'
    });
  }
};
