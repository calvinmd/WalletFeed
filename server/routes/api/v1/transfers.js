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

const getTxs = async(address) => {
  if (!address) return null;

  const etherscanUrl = getTransferUrl({ address });
  logger.info('Fetching data from etherscan: ', etherscanUrl);
  const { data } = await axios.get(etherscanUrl);
  if (!data) return null;

  const status = _.get(data, 'status');
  const result = _.get(data, 'result', 'api returns error.');

  logger.info('Etherscan status: ', status);
  if (status !== '1') return null;

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
      logger.info('WalletArray: ', walletArray);

      /* Merge all wallet transactions and sort by timestamp desc */
      const results = await Promise.all(walletArray.map(addr => getTxs(addr)));
      const result = _
        .chain(results)
        .compact()
        .flatten()
        .sortBy('timeStamp')
        .reverse()
        .value();

      /* Separate ERC20 and ERC721 tokens */
      const tokenPromises = []; // tokens require async call to retrieve metadata
      const coins = [];
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
