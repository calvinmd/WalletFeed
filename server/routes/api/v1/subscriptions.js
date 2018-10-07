const router = require('express').Router();
const logger = require('@/constructors/logger');
const _ = require('lodash');

const EMPTY_QUEUE = {
  coins: [],
  tokens: [],
};
// TODO: Move these to DB
let NOTIFICATION_WALLETS = [];
let NOTIFICATION_QUEUE = EMPTY_QUEUE;

const listener = () => {
  // TODO: do the magic
  setTimeout(listener, 2 * 60 * 1000);
};

module.exports = () => {
  router.get('/', async (req, res) => {
    try {
      const queue = _.cloneDeep(NOTIFICATION_QUEUE);
      NOTIFICATION_QUEUE = EMPTY_QUEUE; // reset queue
      return res.status(200).json({ queue });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'An error occurred while retrieving notification queue.' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const wallets = _.get(req, ['body', 'wallets']);
      console.log('zzz subscribe wallets: ', wallets);
      const walletArray = wallets.split(',');
      logger.info('Subscribe to wallets: ', walletArray);

      NOTIFICATION_WALLETS = _
        .chain(NOTIFICATION_WALLETS)
        .concat(walletArray)
        .flatten()
        .compact()
        .uniq()
        .value();

      logger.info('Updated NOTIFICATION_WALLETS: ', NOTIFICATION_WALLETS);

      return res.status(200).json({
        status: 1,
        NOTIFICATION_WALLETS,
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

      NOTIFICATION_WALLETS = _.difference(NOTIFICATION_WALLETS, walletArray);
      logger.info('Updated NOTIFICATION_WALLETS: ', NOTIFICATION_WALLETS);

      return res.status(200).json({
        status: 1,
        NOTIFICATION_WALLETS,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'An error occurred while unsubscribing wallets.' });
    }
  });

  return router;
};