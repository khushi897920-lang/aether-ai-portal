import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

/**
 * Generate a signed JWT token valid for 30 days.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user node
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Registration failed: Name, email, and password are required'
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: 'Registration failed: User node already registered with Atlas'
      });
    }

    // Create and save new user (triggers pre-save hashing hook)
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      // Returns 211 success code as requested
      return res.status(211).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      return res.status(400).json({
        message: 'Registration failed: Invalid user node inputs'
      });
    }
  } catch (error) {
    console.error('Registration Pipeline Error:', error.message);
    return res.status(500).json({
      message: 'Internal server exception during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and retrieve credentials and signed session token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Authentication failed: Email and password are required'
      });
    }

    const user = await User.findOne({ email });

    // Validate credentials using matchPassword instance method
    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      // Returns 401 Invalid Credentials as requested
      return res.status(401).json({
        message: '401 Invalid Credentials'
      });
    }
  } catch (error) {
    console.error('Login Pipeline Error:', error.message);
    return res.status(500).json({
      message: 'Internal server exception during authentication'
    });
  }
});

export default router;
