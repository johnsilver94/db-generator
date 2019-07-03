const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('../.env') });

// Do not change ports without changing axios methods implimentation
module.exports = {
  PORT: process.env.PORT || 5000,
  SERVER_PORT: process.env.SERVER_PORT || 3000
};
