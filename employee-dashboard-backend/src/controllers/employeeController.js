const Employee = require('../models/Employee');

const getEmployees = async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
};

const getEmployeeById = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

module.exports = { getEmployees, getEmployeeById };
