const connection = require('../config/connection');
const { Thought, User } = require('../models');
const thoughtData = require('./thoughtData');
const userData = require('./userData');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing Thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Add users to the collection and await the results
  await User.collection.insertMany(userData);

  // Loop 20 times -- add users to the users array
for (let i = 0; i < 20; i++) {
  const reactions = getRandomReactions(20);

  const fullName = getRandomName();
  const first = fullName.split(' ')[0];
  const last = fullName.split(' ')[1];
  const email = `${first.toLowerCase()}@example.com`; // Example email generation
  const username = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

  users.push({
    first,
    last,
    email,
    username,
    reactions,
  });
}

  // Add Thoughts to the collection and await the results
await Thought.insertMany([
  {
    thoughtName: 'My Thoughts',
    inPerson: false,
    users: users,
  }
]);

  console.log('Seeding complete! 🌱');
  process.exit(0);
});
