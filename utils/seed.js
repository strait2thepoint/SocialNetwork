const connection = require('../config/connection');
const { Thought, User } = require('../models');
const {thoughtData, userData} = require('./seedData');

const seedDatabase = async () => {
  try {
    await connection;
    console.log('Connected to database');

    // Clear existing data
    await Thought.deleteMany({});
    await User.deleteMany({});
    // Seed users
    userData.forEach(async (user) => {
      await User.create(user)
    })
    console.log("users created!")

    thoughtData.forEach(async(thought) => {
      const newThought = await Thought.create(thought)
      await User.findOneAndUpdate({username: newThought.username},
        { $push: { thoughts: newThought._id } })
    })

    console.log('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
