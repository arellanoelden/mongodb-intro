const User = require("./user");

// these all return promises, not a real promise but like a promise as
// attaches .then method onto it. exec will say there are no more queries after this, return
// an actual promise
const getUserById = id => {
  return User.findById(id).exec();
};

const getAllUsers = () => {
  return User.find({}).exec();
};

const createUser = userDetails => {
  return User.create(userDetails);
};
const removeUserById = id => {
  return User.findByIdAndRemove(id).exec();
  // alos User.findById(id).remove()
};

const updateUserById = (id, update) => {
  // by default does not return updated user, to do so add 3rd argument
  return User.findByIdAndUpdate(id, update, { new: true }).exec();
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById
};
