const db = require('../config/connection');
const { User } = require('../models');
const userData = require('./userData.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userData);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});