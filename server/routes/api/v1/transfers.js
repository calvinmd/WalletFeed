const router = require('express').Router();
const logger = require('@/constructors/logger');
const url = require('url');
const { getTransfers } = require('@/utils/transfers');

module.exports = () => {
  router.get('/', async (req, res) => {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    try {
      const wallets = query.wallets;
      const walletArray = wallets.split(',');
      logger.info('WalletArray: ', walletArray);

      const transfers = await getTransfers(walletArray);
      return res.status(200).json(transfers);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'An error occurred while fetching coins.' });
    }
  });

  return router;
};
