const PostgresStore = require('openrecord/store/postgres')

const store = new PostgresStore({
  host: process.env.OPENRECORD_POSTGRES_HOST || 'postgres' || '127.0.0.1',
  user: process.env.OPENRECORD_POSTGRES_USER || 'postgres',
  password: process.env.OPENRECORD_POSTGRES_PASSWORD || 'password',
  database: process.env.OPENRECORD_POSTGRES_DATABASE ||'postgres',
  // models,
  autoLoad: true,
  autoAttributes: true,
})

module.exports = store;
