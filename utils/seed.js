const connection = require('../config/connection');
const { Thought, User } = require('../models');
const thoughtData = require('./thoughtData');
const userData = require('./userData');

const seedDatabase = async () => {
  try {
    await connection;
    console.log('Connected to database');

    // Clear existing data
    await Thought.deleteMany({});
    await User.deleteMany({});

    // Seed users
    const createdUsers = await User.create(userData);

    // Seed thoughts
    const thoughtsWithUsers = thoughtData.map((thought) => {
      const { username, reactions } = thought;
      const userId = createdUsers.find((user) => user.username === username)._id;
      return { ...thought, userId };
    });
    await Thought.insertMany(thoughtsWithUsers);

    console.log('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
