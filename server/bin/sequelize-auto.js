/*
 * sequelize-auto implementation
 *
 * Produces models from (postgres) database
 * - to execule: yarn run sequelize-auto
 * - output: @/constructors/sequelize/models/
 *
**/
require('module-alias/register');
const path = require('path');
const SequelizeAuto = require('sequelize-auto');

const {
  host,
  dialect,
  database,
  user,
  password,
  port,
} = require('@/constants/postgres');

const auto = new SequelizeAuto(database, user, password, {
  host,
  dialect,
  port,
  directory: path.resolve(__dirname, '../constructors/sequelize/models'),
});

auto.run(function (err) {
  if (err) throw err;

  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});
