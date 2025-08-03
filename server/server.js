const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const volunteerRoutes = require('./routes/volunteerHistoryRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const eventRoutes = require('./routes/events');
const matchRoutes = require('./routes/volunteerMatchingRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');
const db = require('./pool');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// (Removed MongoDB since we're using MySQL for all data now)

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
// app.use('/api/notifications', notificationRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
