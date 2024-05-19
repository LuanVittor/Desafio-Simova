const employees = require('../data/employees');

const getEmployees = (req, res) => {
  res.json(employees);
};

const getEmployeeById = (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

module.exports = { getEmployees, getEmployeeById };
