const express = require('express');
const cors = require('cors');
const volunteerRoutes = require('./routes/volunteerHistoryRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const eventRoutes = require('./routes/events');
const matchRoutes = require('./routes/volunteerMatchingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

//Testing Comments to see if I can push

app.use('/api/volunteer-history', volunteerRoutes);
app.use('/api/user-profiles', userProfileRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/volunteer-matching', matchRoutes);
app.use('/api/notifications', notificationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
