const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const employeeRoutes = require('./routes/employeeRoutes');
const activityRoutes = require('./routes/activityRoutes');
const bulletinRoutes = require('./routes/bulletinRoutes');

app.use('/employees', employeeRoutes);
app.use('/activities', activityRoutes);
app.use('/bulletins', bulletinRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
