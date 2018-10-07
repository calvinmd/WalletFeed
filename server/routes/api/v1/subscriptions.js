const router = require('express').Router();
const logger = require('@/constructors/logger');
const _ = require('lodash');

// TODO: Move it to DB
let NOTIFICATIONS = [];

module.exports = () => {
  router.post('/', async (req, res) => {
    try {
      const wallets = _.get(req, ['body', 'wallets']);
      console.log('zzz subscribe wallets: ', wallets);
      const walletArray = wallets.split(',');
      logger.info('Subscribe to wallets: ', walletArray);

      NOTIFICATIONS = _
      .chain(NOTIFICATIONS)
      .concat(walletArray)
      .compact()
      .flatten()
      .value();

      logger.info('Updated NOTIFICATIONS: ', NOTIFICATIONS);

      return res.status(200).json({
        status: 1,
        NOTIFICATIONS,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'An error occurred while subscribing to wallets.' });
    }
  });

  router.delete('/', async (req, res) => {
    try {
      const wallets = _.get(req, ['body', 'wallets']);
      console.log('zzz unsubscribe wallets: ', wallets);
      const walletArray = wallets.split(',');
      logger.info('Unsubscribe to wallets: ', walletArray);

      NOTIFICATIONS = _.difference(NOTIFICATIONS, walletArray);
      logger.info('Updated NOTIFICATIONS: ', NOTIFICATIONS);

      return res.status(200).json({
        status: 1,
        NOTIFICATIONS,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'An error occurred while unsubscribing wallets.' });
    }
  });

  return router;
};
