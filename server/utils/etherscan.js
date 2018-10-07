const _ = require('lodash');
const { API_KEY, ETHERSCAN_API } = require('@/constants/etherscan');
const { TOKENS } = require('@/constants/tokens');
const { getTokenImage } = require('@/utils/tokens');

const getTransferUrl = ({
  address,
  action = 'tokentx',
  module = 'account',
  sort = 'desc',
}) => `${ETHERSCAN_API}?module=${module}&action=${action}&sort=${sort}&apikey=${API_KEY}&address=${address}`;

const isCoinTx = tx => _.get(tx, 'tokenSymbol', false) &&
  // Ether Online is the exception
  _.get(tx, 'contractAddress') !== '0xda9c03dfd4d137f926c3cf6953cb951832eb08b2' &&
  // CryptoBotsBattle is another exception
  _.get(tx, 'contractAddress') !== '0x4daa9dc438a77bd59e8a43c6d46cbfe84cd04255';

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
  contractAddress = coin.contractAddress;
  if (contractAddress) {
    coin.image = `https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${contractAddress.toLowerCase()}.png`;
  }
  return coin;
};

const getTokenData = async tx => {
  let token = _.cloneDeep(tx);
  token = trimData(token);
  token.tokenId = token.value;
  delete token.value;
  delete token.tokenDecimal;
  delete token.tokenName;
  delete token.tokenSymbol;

  const contractAddress = token.contractAddress;
  const normalizedContractAddress = contractAddress ? contractAddress.toLowerCase() : '';

  if (contractAddress && TOKENS[normalizedContractAddress]) {
    token.tokenName = TOKENS[normalizedContractAddress].tokenName;
    token.tokenSymbol = TOKENS[normalizedContractAddress].tokenSymbol;
  }

  const image = await getTokenImage(normalizedContractAddress, token.tokenId);
  if (image) {
    token.image = image;
  }
  return token;
};

module.exports = {
  getCoinData,
  getTokenData,
  getTransferUrl,
  isCoinTx,
}
