const _ = require('lodash');
const { API_KEY, ETHERSCAN_API } = require('@/constants/etherscan');

const getTransferUrl = ({
  address,
  action = 'tokentx',
  module = 'account',
  sort = 'desc',
}) => `${ETHERSCAN_API}?module=${module}&action=${action}&sort=${sort}&apikey=${API_KEY}&address=${address}`;

const isCoinTx = tx => _.get(tx, 'tokenSymbol', false);

const trimData = data => {
  const newData = _.cloneDeep(data);
  delete newData.blockNumber;
  delete newData.nonce;
  delete newData.blockHash;
  delete newData.transactionIndex;
  delete newData.gas;
  delete newData.gasPrice;
  delete newData.gasUsed;
  delete newData.cumulativeGasUsed;
  delete newData.input;
  delete newData.confirmations;
  return newData;
}

const getCoinData = tx => {
  let coin = _.cloneDeep(tx);
  coin = trimData(coin);
  return coin;
};

const getTokenData = tx => {
  let token = _.cloneDeep(tx);
  token = trimData(token);
  return token;
};

module.exports = {
  getCoinData,
  getTokenData,
  getTransferUrl,
  isCoinTx,
}
