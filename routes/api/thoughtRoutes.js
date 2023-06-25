const express = require('express');
const router = express.Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions POST new reactions
router.route('/:thoughtId/reactions')
  .post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId DELETE reaction by ID
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
