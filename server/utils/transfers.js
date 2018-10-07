const logger = require('@/constructors/logger');
const axios = require('axios');
const _ = require('lodash');
const {
  getCoinData,
  getTokenData,
  getTransferUrl,
  isCoinTx,
} = require('@/utils/etherscan');

const getTxs = async address => {
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

const getTransfers = async wallets => {
  const walletArray = wallets.split(',');
  logger.info('WalletArray: ', walletArray);

  /* Merge all wallet transactions and sort by timestamp desc */
  const results = await Promise.all(walletArray.map(addr => getTxs(addr)));
  const result = _
    .chain(results)
    .flatten()
    .compact()
    .uniq()
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

  return {
    coins,
    tokens,
  };
};

module.exports = {
  getTxs,
  getTransfers,
}
