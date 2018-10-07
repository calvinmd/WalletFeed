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

const getTxs = async(address, res) => {
  if (!address) return res.status(500).json({ error: 'address param is required.' });

  const etherscanUrl = getTransferUrl({ address });
  const { data } = await axios.get(etherscanUrl);
  if (!data) return res.status(500).json({ error: 'no data.' });

  const status = _.get(data, 'status');
  const result = _.get(data, 'result', 'api returns error.');
  if (status !== '1') return res.status(500).json({ error: result });

  return result;
};

module.exports = () => {
  router.get('/', async (req, res) => {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    let transfers = {};
    try {
      const wallets = query.wallets;
      const walletArray = wallets.split(',');
      const results = await Promise.all(walletArray.map(addr => getTxs(addr, res)));
      const result = _.flatten(results);

      /* Separate ERC20 and ERC721 tokens */
      const coins = [];
      const tokenPromises = [];
      let tokens = [];

      result.map(async tx => {
        isCoinTx(tx) ? coins.push(getCoinData(tx)) : tokenPromises.push(getTokenData(tx));
      });

      await Promise.all(tokenPromises)
        .then(values => {
          tokens = _.cloneDeep(values);
        })
        .catch(e => {
          console.error(e);
        });

      transfers = {
        coins,
        tokens,
      };
      return res.status(200).json(transfers);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'An error occurred while fetching coins.' });
    }
  });

  return router;
};
