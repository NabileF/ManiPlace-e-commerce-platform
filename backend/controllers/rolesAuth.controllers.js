const User = require('../models/user');
const Role = require('../models/role');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const userRole = await Role.findOne({ roleName: role });
    const user = new User({ firstName, lastName, email, password, roles: [userRole._id] });
    await user.save();
    res.redirect(`/role/register/${role.toLowerCase()}`);
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
};

exports.login = (req, res) => {
  // Implement login logic here
};

exports.logout = (req, res) => {
  // Implement logout logic here
};
