const activities = require('../data/activities');

const getActivities = (req, res) => {
  res.json(activities);
};

module.exports = { getActivities };
