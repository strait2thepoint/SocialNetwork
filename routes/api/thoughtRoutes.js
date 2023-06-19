const express = require('express');
const router = express.Router();
const thoughtController = require('../../controllers/thoughtController');

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
  .get(thoughtController.getThoughts)
  .post(thoughtController.createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(thoughtController.getSingleThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

//  /api/thoughts/:thoughtId/reactions POST new reactions
router.route('/:thoughtId/reactions')
  .post(thoughtController.createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId DELETE reaction by ID
router.route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.deleteReaction);

module.exports = router;
