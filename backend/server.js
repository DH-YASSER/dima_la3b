const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // For database connection

// Load environment variables from .env file
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// --- Database Connection (Placeholder/Example for MongoDB) ---
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/dimalab_db'; // Fallback URI
    await mongoose.connect(mongoUri, {
      // These options are to avoid deprecation warnings, adjust as needed by your Mongoose version
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Mongoose 6+ no longer supports useCreateIndex
      // useFindAndModify: false // Mongoose 6+ no longer supports useFindAndModify
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    // Exit process with failure if DB connection fails
    process.exit(1); 
  }
};

// Connect to Database
connectDB();
// --- End Database Connection ---

// API Routes
app.use('/api/auth', authRoutes); // Mount authentication routes under /api/auth

// Basic route for testing server is up
app.get('/', (req, res) => {
  res.send('DimaLa3b Backend API is running...');
});

// Define PORT
const PORT = process.env.PORT || 5001; // Use 5001 as a common backend port if 3000 is for frontend dev server

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// --- Environment Variables Reminder ---
// Create a .env file in the backend directory with your actual values:
// MONGO_URI=your_mongodb_connection_string
// JWT_SECRET=your_super_secret_jwt_key
// PORT=5001 (optional, defaults to 5001)
// NODE_ENV=development (or production)
// ---
