const { API_KEY, ETHERSCAN_API } = require('@/constants/etherscan');

const getTransferUrl = ({
  address,
  action = 'tokentx',
  module = 'account',
  sort = 'desc',
}) => `${ETHERSCAN_API}?module=${module}&action=${action}&sort=${sort}&apikey=${API_KEY}&address=${address}`;

module.exports = {
  getTransferUrl,
}
