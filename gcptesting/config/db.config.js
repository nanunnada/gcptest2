const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, 'gcptesting/.env') })

module.exports = {
    HOST: "34.64.180.157",
    USER: "root",
    PASSWORD: process.env.SEQUELIZE_PASSWORD,
    DB: "gcptest",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };