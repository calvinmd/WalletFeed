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
const SUBSCRIPTIONS = [];

const INTERVAL = 2 * 60 * 1000 / 4;
// let LAST_TIMESTAMP = Date.now() - INTERVAL;
let LAST_TIMESTAMP = 1536260376 - 10000;

const sendNotification = async (subscription, dataToSend) => {
  const res = await webPush.sendNotification(subscription, dataToSend)
  .catch((err) => {
    if (err.statusCode >= 400) {
      console.log('Subscription is invalid: ', err)
    }
  })
}

const sendPushNotificationForCoin = async coin => {
  // Send notification for each matching subscription
  SUBSCRIPTIONS.forEach(sub => {
    const { wallet, subscription } = sub
    const {
      value,
      to,
      from,
      image,
      tokenSymbol,
      tokenName,
      tokenDecimal,
    } = coin
    const fromWallet = from.toLowerCase()
    const toWallet = to.toLowerCase()
    if (fromWallet === wallet) {
      sendNotification(subscription, `Transferred ${value / (Math.pow(10, tokenDecimal))} ${tokenSymbol} to ${toWallet}`)
    }
    if (toWallet === wallet) {
      sendNotification(subscription, `Received ${value / (Math.pow(10, tokenDecimal))} ${tokenSymbol} from ${fromWallet}`)
    }
  })
}

const sendPushNotificationForToken = async token => {
  // Send notification for each matching subscription
  SUBSCRIPTIONS.forEach(sub => {
    const { wallet, subscription } = sub
    const {
      to,
      from,
      image,
      tokenSymbol,
      tokenName,
      tokenId,
      contractAddress,
    } = token
    const fromWallet = from.toLowerCase()
    const toWallet = to.toLowerCase()
    if (fromWallet === wallet) {
      sendNotification(subscription, `Transferred ${value / (Math.pow(10, tokenDecimal))} ${tokenSymbol} to ${toWallet}`)
    }
    if (toWallet === wallet) {
      sendNotification(subscription, `Received ${value / (Math.pow(10, tokenDecimal))} ${tokenSymbol} from ${fromWallet}`)
    }
  })
}

const listener = async() => {
  // TODO: do the magic
  console.log('zzz listner running!: ', SUBSCRIPTIONS);
  console.log('SUBSCRIPTIONS:', SUBSCRIPTIONS)
  if (!_.isEmpty(SUBSCRIPTIONS)) {
    const { coins = [], tokens = [] } = await getTransfers(SUBSCRIPTIONS);

    /* Add all transactions happened after INTERVAL ago to notification queue */
    coins.map(coin => {
      if (coin.timeStamp > LAST_TIMESTAMP) {
        console.log('Adding coin transfer to notification queue: ', coin);
        sendPushNotificationForCoin(coin);
      }
    });

    tokens.map(token => {
      if (token.timeStamp > LAST_TIMESTAMP) {
        console.log('Adding token transfer to notification queue: ', token);
        sendPushNotificationForToken(token);
      }
    });
  }

  // LAST_TIMESTAMP = Date.now();

  setTimeout(listener, INTERVAL);
};

listener();


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

  // router.post('/', async (req, res) => {
  //   try {
  //     const wallets = _.get(req, ['body', 'wallets']);
  //     console.log('zzz subscribe wallets: ', wallets);
  //     const walletArray = wallets.split(',');
  //     logger.info('Subscribe to wallets: ', walletArray);

  //     NOTIFICATION_WALLETS = _
  //       .chain(NOTIFICATION_WALLETS)
  //       .concat(walletArray)
  //       .flatten()
  //       .compact()
  //       .uniq()
  //       .value();

  //     logger.info('Updated NOTIFICATION_WALLETS: ', NOTIFICATION_WALLETS);

  //     return res.status(200).json({
  //       status: 1,
  //       NOTIFICATION_WALLETS,
  //     });
  //   } catch (e) {
  //     console.error(e);
  //     return res.status(500).json({ error: 'An error occurred while subscribing to wallets.' });
  //   }
  // });

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
    const { subscription, wallet } = req.body
    if (!subscription) return res.status(500).json({ error: 'Subscription must be provided.' });
    if (!wallet) return res.status(500).json({ error: 'Wallet must be provided.' });
    SUBSCRIPTIONS.push({ subscription, wallet: wallet.toLowerCase() })
    res.status(200).send({ message: 'Subscribed to notifications.' })
  })

  return router;
};
