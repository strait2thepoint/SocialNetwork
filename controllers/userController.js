const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId }).populate("thoughts")
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    console.log("Making user")
console.log(req.body)
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => { console.log(err)
        res.status(500).json(err)});
  },
  // Delete a user and remove them from the thought
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { user: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'user deleted, but no user found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,  // Update the user with the request body
      { new: true }  // Return the updated user
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

// Add a friend to a user
addFriend(req, res) {
  const { userId, friendId } = req.params;

  User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { friends: friendId } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user found with that ID :(' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

// Remove a friend from a user
deleteFriend(req, res) {
  const { userId, friendId } = req.params;

  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { friends: friendId } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user found with that ID :(' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

  // Add an reaction to a user
  addReaction(req, res) {
    console.log('You are adding an reaction');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a user
  removeReaction(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { reactions: { reactionsId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  };
