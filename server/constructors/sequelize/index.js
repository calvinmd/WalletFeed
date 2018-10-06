const Sequelize = require('sequelize');
const Models = require('./models');
const SequelizeAuto = require('sequelize-auto')

const {
  database,
  dialect,
  host,
  user,
  password,
  port,
} = require('@/constants/postgres')

const sequelize = new Sequelize(
  database,
  user,
  password,
  {
    host,
    dialect,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    operatorsAliases: Sequelize.Op,
  }
);

module.exports = {
  sequelize,
  Sequelize,
  models: Models({ sequelize }),
};
