const router = require('express').Router();
const url = require('url');
const { getTransfers } = require('@/utils/transfers');

module.exports = () => {
  router.get('/', async (req, res) => {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    try {
      const wallets = query.wallets;
      const transfers = await getTransfers(wallets);
      return res.status(200).json(transfers);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'An error occurred while fetching coins.' });
    }
  });

  return router;
};
