const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/studentRoutes');
const taskRoutes = require('./routes/taskRoutes');
const linkedinRoutes = require('./routes/linkedinRoutes');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const huggingfaceRoutes = require('./routes/huggingfaceRoutes');
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'linkedin secret', resave: false, saveUninitialized: false }));
app.use(express.urlencoded({ extended: true }));

// Add CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Database connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Routes
app.use('/api', studentRoutes);
app.use('/api', taskRoutes);
app.use('/api', linkedinRoutes);
app.use('/api', authRoutes);
app.use('/api', huggingfaceRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Trying another port...`);
    server.close(() => {
      const newPort = PORT + 1;
      app.listen(newPort, () => {
        console.log(`Server is running on port ${newPort}`);
      });
    });
  } else {
    console.error(`Server error: ${error}`);
  }
});
