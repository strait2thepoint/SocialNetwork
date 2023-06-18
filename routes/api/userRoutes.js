const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addReaction,
  removeReaction,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/reactions
// router.route('/:userId/reactions') 

// /api/students/:userId/reactions/:reactionId
router.route('/:userId/reactions/:reactionId')
.post(addReaction)
.delete(removeReaction);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;
