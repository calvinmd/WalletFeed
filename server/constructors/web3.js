const Web3 = require('web3')

// const provider = new Web3.providers.WebsocketProvider('ws://mainnet.infura.io/v3/22c2ef9247c04d489f384e53a40cc264');

// provider.on('connect', () => {
//   console.log('WSS Reconnected');
// });
// provider.on('error', e => console.error('WS Error', e));
// provider.on('end', e => console.error('WS End', e));

// const web3 = new Web3(provider);
web3 = new Web3(new Web3.providers.HttpProvider("http://mainnet.infura.io/v3/22c2ef9247c04d489f384e53a40cc264"))
// web3.eth.subscribe('newBlockHeaders', (error, result) => console.log(error, result))
module.exports = web3
// const contract = new web3.eth.Contract(gameABI, game.contract);
//   return contract.events.Transfer({}, async (err, event) => {