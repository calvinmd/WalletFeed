const router = require('express').Router();
const logger = require('@/constructors/logger');
const axios = require('axios');
const url = require('url');
const _ = require('lodash');

const {
  getCoinData,
  getTokenData,
  getTransferUrl,
  isCoinTx,
} = require('@/utils/etherscan');

module.exports = () => {
  router.get('/', async (req, res) => {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    let transfers = {};
    try {
      const address = query.address;

      if (!address) return res.status(500).json({ error: 'address param is required.' });

      const etherscanUrl = getTransferUrl({ address });
      console.log('zzz etherscanUrl: ', etherscanUrl);

      const { data } = await axios.get(etherscanUrl);

      if (!data) return res.status(500).json({ error: 'no data.' });
      const status = _.get(data, 'status');
      const result = _.get(data, 'result', 'api returns error.');
      if (status !== '1') return res.status(500).json({ error: result });
      /* Separate ERC20 and ERC721 tokens */
      const coins = [];
      const tokens = [];
      result.map(tx => {
        isCoinTx(tx) ? coins.push(getCoinData(tx)) : tokens.push(getTokenData(tx));
      });
      console.log('zzz coins: ', coins);
      console.log('zzz tokenTxs: ', tokens);
      transfers = {
        coins,
        tokens,
      };
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'An error occurred while fetching coins.' });
    }
    console.log('zzz transfers: ', transfers);
    // TODO: return { coins: [], tokens: [] }
    return res.status(200).json(transfers);
  });

  return router;
};
