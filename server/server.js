const express = require('express');
const cors = require('cors');
const volunteerRoutes = require('./routes/volunteerHistoryRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/volunteer-history', volunteerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});