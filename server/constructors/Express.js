const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const Sequelize = require('sequelize')
const session = require('express-session')
const rfs = require('rotating-file-stream')

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize } = require('./sequelize');

const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET || 'keyboard cat'
const logsDirectory = path.join(__dirname, '../logs')


const Express = () => {
  const app = express();

  // ensure log directory exists
  fs.existsSync(logsDirectory) || fs.mkdirSync(logsDirectory);
   
  const logStreamConfig = {
    interval: '1d', // rotate daily
    compress: 'gzip', // compress rotated files
    path: logsDirectory,
  };

  const accessLogStream = rfs('access.log', logStreamConfig);
  const errorLogStream = rfs('error.log', logStreamConfig);

  app.use(morgan('dev', {
    skip: (req, res) => res.statusCode < 400,
    stream: process.env === 'production' ? errorLogStream : process.stderr,
  }));

  app.use(morgan('dev', {
      skip: (req, res) => res.statusCode >= 400,
      stream: process.env === 'production' ? accessLogStream : process.stdout,
  }));

  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname, '../views'))

  app.use(express.static(path.resolve(__dirname, '../public')))
  app.use(express.static(path.resolve(__dirname, '../../client/dist')))

  app.use(cors());
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser(EXPRESS_SESSION_SECRET))
  app.use(cookieParser())

  const sessionStore = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // 15 minutes. The interval to cleanup expired sessions (in milliseconds).
    expiration: 24 * 60 * 60 * 1000, // 1 day (milliseconds)
  });

  app.use(session({
    secret: EXPRESS_SESSION_SECRET,
    store: sessionStore,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  }))

  sessionStore.sync();

  return app
}

module.exports = Express;
