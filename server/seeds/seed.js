const db = require('../config/connection');
const { User, Art, Evoke, Comment } = require('../models');

const userData = require('./userData.json');
const artData = require('./artData.json');
const commentData = require('./commentData.json');

db.once('open', async () => {
  try {
    await User.deleteMany({})
    await Art.deleteMany({});
    await Comment.deleteMany({});

    // const users = User.insertMany(userData);
    // const art = Art.insertMany(artData);
    // const comment = Comment.insertMany(commentData);

    await User.create(userData);
    await Art.create(artData);
    await Comment.create(commentData);

    console.log('Done seeding!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});