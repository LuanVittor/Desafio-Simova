const sequelize = require('../config/database');
const Employee = require('../models/Employee');
const Activity = require('../models/Activity');
const Bulletin = require('../models/Bulletin');
const Appointment = require('../models/Appointment');

const employees = [
    { name: 'Employee 1', code: '1', active: true, image: 'https://raw.githubusercontent.com/daltondiaz/test-frontend/main/assets/images/employee1.png' },
    { name: 'Employee 11', code: '3', active: true, image: 'https://raw.githubusercontent.com/daltondiaz/test-frontend/main/assets/images/employee2.png' },
    { name: 'Employee 17', code: '5', active: true, image: 'https://raw.githubusercontent.com/daltondiaz/test-frontend/main/assets/images/employee3.png' },
    { name: 'Employee 13', code: '7', active: true, image: 'https://raw.githubusercontent.com/daltondiaz/test-frontend/main/assets/images/employee4.png' },
    { name: 'Employee 21', code: '9', active: false, image: 'https://raw.githubusercontent.com/daltondiaz/test-frontend/main/assets/images/employee1.png' },
    { name: 'Employee 23', code: '11', active: false, image: 'https://raw.githubusercontent.com/daltondiaz/test-frontend/main/assets/images/employee2.png' },
    { name: 'Employee 25', code: '13', active: true, image: 'https://raw.githubusercontent.com/daltondiaz/test-frontend/main/assets/images/employee3.png' },
    { name: 'Employee 27', code: '15', active: false, image: 'https://raw.githubusercontent.com/daltondiaz/test-frontend/main/assets/images/employee4.png' },
];

const activities = [
    { code: 101, description: 'Issue 10', color: '#bbf7d0' },
    { code: 201, description: 'Almoço', color: '#f97316' },
    { code: 203, description: 'Interrupção', color: '#dc2626' },
    { code: 102, description: 'Issue 100', color: '#84cc16' }
];

const bulletins = [
    {
        employeeId: 1,
        startDate: "2023-10-01 08:00:00",
        endDate: "2023-10-01 12:00:00",
        appointments: [
          { date: "2023-10-01 08:10:00", activityId: 1 },
          { date: "2023-10-01 10:00:00", activityId: 3 },
          { date: "2023-10-01 10:15:00", activityId: 4 },
        ],
    },
    {
        employeeId: 1,
        startDate: "2023-10-15 08:00:00",
        endDate: "2023-10-15 12:00:00",
        appointments: [
          { date: "2023-10-15 08:10:00", activityId: 1 },
          { date: "2023-10-15 10:00:00", activityId: 4 },
          { date: "2023-10-15 12:15:00", activityId: 2 },
        ],
    },
    {
        employeeId: 2,
        startDate: "2023-10-01 08:00:00",
        endDate: "2023-10-01 15:00:00",
        appointments: [
          { date: "2023-10-01 08:10:00", activityId: 1 },
          { date: "2023-10-01 10:00:00", activityId: 4 },
          { date: "2023-10-01 12:15:00", activityId: 2 },
          { date: "2023-10-01 13:15:00", activityId: 4 },
        ],
    },
    {
        employeeId: 2,
        startDate: "2023-10-20 08:00:00",
        endDate: "2023-10-20 15:00:00",
        appointments: [
          { date: "2023-10-20 08:10:00", activityId: 1 },
          { date: "2023-10-20 10:00:00", activityId: 4 },
          { date: "2023-10-20 12:15:00", activityId: 2 },
          { date: "2023-10-20 13:15:00", activityId: 4 },
        ],
    },
    {
        employeeId: 3,
        startDate: "2023-11-01 08:00:00",
        endDate: "2023-11-01 15:00:00",
        appointments: [
          { date: "2023-11-01 08:10:00", activityId: 1 },
          { date: "2023-11-01 10:00:00", activityId: 4 },
          { date: "2023-11-01 12:15:00", activityId: 2 },
        ],
    },
    {
        employeeId: 3,
        startDate: "2023-11-10 08:00:00",
        endDate: "2023-11-10 15:00:00",
        appointments: [
          { date: "2023-11-10 08:10:00", activityId: 1 },
          { date: "2023-11-10 10:00:00", activityId: 4 },
          { date: "2023-11-10 12:15:00", activityId: 2 },
        ],
    },
    {
        employeeId: 4,
        startDate: "2023-12-01 09:00:00",
        endDate: "2023-12-01 17:00:00",
        appointments: [
          { date: "2023-12-01 09:10:00", activityId: 1 },
          { date: "2023-12-01 11:00:00", activityId: 4 },
        ],
    },
    {
        employeeId: 4,
        startDate: "2023-12-15 09:00:00",
        endDate: "2023-12-15 17:00:00",
        appointments: [
          { date: "2023-12-15 09:10:00", activityId: 1 },
          { date: "2023-12-15 11:00:00", activityId: 4 },
        ],
    },
    {
        employeeId: 5,
        startDate: "2023-10-02 08:00:00",
        endDate: "2023-10-02 15:00:00",
        appointments: [
          { date: "2023-10-02 08:10:00", activityId: 1 },
          { date: "2023-10-02 10:00:00", activityId: 4 },
          { date: "2023-10-02 12:15:00", activityId: 2 },
          { date: "2023-10-02 13:15:00", activityId: 4 },
        ],
    },
    {
        employeeId: 5,
        startDate: "2023-10-10 08:00:00",
        endDate: "2023-10-10 15:00:00",
        appointments: [
          { date: "2023-10-10 08:10:00", activityId: 1 },
          { date: "2023-10-10 10:00:00", activityId: 4 },
          { date: "2023-10-10 12:15:00", activityId: 2 },
          { date: "2023-10-10 13:15:00", activityId: 4 },
        ],
    },
    {
        employeeId: 6,
        startDate: "2023-11-02 08:00:00",
        endDate: "2023-11-02 15:00:00",
        appointments: [
          { date: "2023-11-02 08:10:00", activityId: 1 },
          { date: "2023-11-02 10:00:00", activityId: 4 },
          { date: "2023-11-02 12:15:00", activityId: 2 },
          { date: "2023-11-02 13:15:00", activityId: 4 },
        ],
    },
    {
        employeeId: 6,
        startDate: "2023-11-15 08:00:00",
        endDate: "2023-11-15 15:00:00",
        appointments: [
          { date: "2023-11-15 08:10:00", activityId: 1 },
          { date: "2023-11-15 10:00:00", activityId: 4 },
          { date: "2023-11-15 12:15:00", activityId: 2 },
          { date: "2023-11-15 13:15:00", activityId: 4 },
        ],
    },
    {
        employeeId: 7,
        startDate: "2023-09-01 08:00:00",
        endDate: "2023-09-01 12:00:00",
        appointments: [
          { date: "2023-09-01 08:10:00", activityId: 1 },
          { date: "2023-09-01 10:00:00", activityId: 3 },
          { date: "2023-09-01 10:15:00", activityId: 4 },
        ],
    },
    {
        employeeId: 7,
        startDate: "2023-09-15 08:00:00",
        endDate: "2023-09-15 12:00:00",
        appointments: [
          { date: "2023-09-15 08:10:00", activityId: 1 },
          { date: "2023-09-15 10:00:00", activityId: 3 },
          { date: "2023-09-15 10:15:00", activityId: 4 },
        ],
    },
    {
        employeeId: 8,
        startDate: "2023-08-01 08:00:00",
        endDate: "2023-08-01 15:00:00",
        appointments: [
          { date: "2023-08-01 08:10:00", activityId: 1 },
          { date: "2023-08-01 10:00:00", activityId: 4 },
          { date: "2023-08-01 12:15:00", activityId: 2 },
          { date: "2023-08-01 13:15:00", activityId: 4 },
        ],
    },
    {
        employeeId: 8,
        startDate: "2023-08-15 08:00:00",
        endDate: "2023-08-15 15:00:00",
        appointments: [
          { date: "2023-08-15 08:10:00", activityId: 1 },
          { date: "2023-08-15 10:00:00", activityId: 4 },
          { date: "2023-08-15 12:15:00", activityId: 2 },
          { date: "2023-08-15 13:15:00", activityId: 4 },
        ],
    },
    {
        employeeId: 8,
        startDate: "2023-08-16 08:00:00",
        endDate: "2023-08-16 15:00:00",
        appointments: [
          { date: "2023-08-16 08:10:00", activityId: 1 },
          { date: "2023-08-16 10:00:00", activityId: 4 },
          { date: "2023-08-16 12:15:00", activityId: 2 },
          { date: "2023-08-16 13:15:00", activityId: 4 },
        ],
    },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const createdEmployees = await Employee.bulkCreate(employees, { returning: true });
  const createdActivities = await Activity.bulkCreate(activities, { returning: true });

  for (const bulletin of bulletins) {
    const { appointments, ...bulletinData } = bulletin;
    const createdBulletin = await Bulletin.create(bulletinData, { returning: true });
    await Appointment.bulkCreate(
      appointments.map((appt, index) => ({ ...appt, bulletinId: createdBulletin.id, id: undefined }))
    );
  }

  console.log('Database seeded successfully!');
  process.exit();
};

seedDatabase().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
