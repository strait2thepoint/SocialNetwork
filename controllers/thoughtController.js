const { Thought, User, Reaction } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteMany({ _id: { $in: thought.users } })
      )
      .then(() => res.json({ message: 'Thoughts and users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionData } = req.body;
  
    //To interact with the Reaction model/schema
    const newReaction = new Reaction(reactionData);
  
    newReaction.save()
      .then((reaction) => {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $push: { reactions: reaction._id } },
          { new: true }
        );
      })
      .then((updatedThought) => {
        if (!updatedThought) {
          throw new Error('No thought found with the provided ID');
        }
        res.json(updatedThought);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to create reaction' });
      });
  },
  // Delete a reaction
deleteReaction(req, res) {
  const { thoughtId, reactionId } = req.params;

  Thought.findOneAndUpdate(
    { _id: thoughtId },
    { $pull: { reactions: reactionId } },
    { new: true }
  )
    .then((updatedThought) => {
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(updatedThought);
    })
    .catch((err) => res.status(500).json(err));
},

};
