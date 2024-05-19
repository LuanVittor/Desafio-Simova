const Bulletin = require('../models/Bulletin');
const Appointment = require('../models/Appointment');

const getBulletins = async (req, res) => {
  const bulletins = await Bulletin.findAll({ include: Appointment });
  res.json(bulletins);
};

const getBulletinsByEmployeeId = async (req, res) => {
  const bulletins = await Bulletin.findAll({
    where: { employeeId: req.params.employeeId },
    include: Appointment,
  });
  res.json(bulletins);
};

module.exports = { getBulletins, getBulletinsByEmployeeId };
