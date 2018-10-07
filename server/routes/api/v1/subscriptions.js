const router = require('express').Router();
const _ = require('lodash');
const logger = require('@/constructors/logger');
const webPush = require('@/constructors/webPush');

const { getTransfers } = require('@/utils/transfers');

const EMPTY_QUEUE = {
  coins: [],
  tokens: [],
};
// TODO: Move these to DB
let NOTIFICATION_WALLETS = [];
let NOTIFICATION_QUEUE = _.cloneDeep(EMPTY_QUEUE);

const INTERVAL = 2 * 60 * 1000;
let LAST_TIMESTAMP = Date.now() - INTERVAL;

const listener = async() => {
  // TODO: do the magic
  console.log('zzz listner running!: ', NOTIFICATION_WALLETS);
  if (!_.isEmpty(NOTIFICATION_WALLETS)) {
    const { coins = [], tokens = [] } = await getTransfers(NOTIFICATION_WALLETS);

    /* Add all transactions happened after INTERVAL ago to notification queue */
    coins.map(coin => {
      if (coin.timeStamp > LAST_TIMESTAMP) {
        console.log('Adding coin transfer to notification queue: ', coin);
        NOTIFICATION_QUEUE.coins.push(coin);
      }
    });

    tokens.map(token => {
      if (token.timeStamp > LAST_TIMESTAMP) {
        console.log('Adding token transfer to notification queue: ', token);
        NOTIFICATION_QUEUE.tokens.push(token);
      }
    });
  }

  LAST_TIMESTAMP = Date.now();

  setTimeout(listener, INTERVAL);
};

listener();

const SUBSCRIPTIONS = [];
const sendNotification = async (subscription, dataToSend) => {
  const res = await webPush.sendNotification(subscription, dataToSend)
  .catch((err) => {
    if (err.statusCode === 410) {
      console.log('Subscription is no longer valid: ', err)
    } else {
      console.log('Subscription is no longer valid: ', err)
    }
  })
}

module.exports = () => {
  router.get('/', async (req, res) => {
    try {
      const queue = _.cloneDeep(NOTIFICATION_QUEUE);
      NOTIFICATION_QUEUE = _.cloneDeep(EMPTY_QUEUE); // reset queue
      return res.status(200).json(queue);
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


  router.post('/subscribe', async (req, res) => {
    const { subscription } = req.body
    if (!subscription) return res.status(500).json({ error: 'Subscription must be provided.' });
    SUBSCRIPTIONS.push(subscription)
    console.log(subscription)
    sendNotification(subscription, 'hello world')
  })

  return router;
};
