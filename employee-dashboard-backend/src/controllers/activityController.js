const Activity = require('../models/Activity');

const getActivities = async (req, res) => {
  const activities = await Activity.findAll();
  res.json(activities);
};

module.exports = { getActivities };
