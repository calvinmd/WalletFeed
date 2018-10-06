const router = require('express').Router();
const logger = require('@/constructors/logger');
const axios = require('axios');
const url = require('url');
const _ = require('lodash');

const ETHERSCAN_API = 'http://api.etherscan.io/api?module=account&action=tokentx';
const SORT_ORDER = 'desc';
const API_KEY = '5V1DUNJRCKDD6WDZKEAQZDI2SZ5Z6IAQFJ';

module.exports = () => {
  router.get('/', async (req, res) => {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    console.log('zzz query: ', query);
    let transfers = {};
    try {
      const address = query.address;

      if (!address) return res.status(500).json({ error: 'address param is required.' });

      const TRANSFER_API_URL = `${ETHERSCAN_API}&sort=${SORT_ORDER}&apikey=${API_KEY}&address=${address}`;

      const { data } = await axios.get(TRANSFER_API_URL);

      console.log('zzz data: ', data);
      if (!data) return res.status(500).json({ error: 'no data.' });
      const status = _.get(data, 'status');
      const result = _.get(data, 'result', 'api returns error.');
      if (status !== '1') return res.status(500).json({ error: result });
      // TODO: extract ERC20 and ERC721 tokens
      transfers = result;
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
