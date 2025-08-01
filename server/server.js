const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const volunteerRoutes = require('./routes/volunteerHistoryRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const eventRoutes = require('./routes/events');
const matchRoutes = require('./routes/volunteerMatchingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const db = require('./pool');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection for Auth
mongoose.connect('mongodb://127.0.0.1:27017/volunteer_app')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// MySQL Connection check
db.getConnection()
  .then(connection => {
    console.log('MySQL connection established.');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the MySQL database:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/volunteer-history', volunteerRoutes);
app.use('/api/user-profiles', userProfileRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/volunteer-matching', matchRoutes);
app.use('/api/notifications', notificationRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
