const bulletins = require('../data/bulletins');

const getBulletins = (req, res) => {
  res.json(bulletins);
};

const getBulletinsByEmployeeId = (req, res) => {
  const employeeId = parseInt(req.params.employeeId);
  const employeeBulletins = bulletins.filter(bul => bul.employeeId === employeeId);
  res.json(employeeBulletins);
};

module.exports = { getBulletins, getBulletinsByEmployeeId };
