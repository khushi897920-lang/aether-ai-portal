import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';

// Load environment variables
dotenv.config();

// Establish connection to MongoDB Atlas database
connectDB();

const app = express();

// Global Middlewares
app.use(express.json());

app.use(cors({
  origin: 'https://aether-ai-portal.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

// Route Endpoints mounting
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Base Server Health Check Verification Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    systems: 'operational',
    timestamp: Date.now()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`📡 Server actively listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
