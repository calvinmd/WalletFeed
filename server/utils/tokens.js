const axios = require('axios');
const { TOKENS } = require('@/constants/tokens');
const { get } = require('lodash');

const getTokenImage = async(contractAddress, tokenId) => {
  if (!contractAddress || !tokenId) return null;
  const token = TOKENS[contractAddress];
  const api = get(token, 'api');
  if (!api) return null;

  /* Get token image from API */
  try {
    const { data } = await axios.get(`${api}${tokenId}`);
    if (!data) return null;
    let imageAttr;
    switch (contractAddress) {
      // CryptoKitties
      case '0xb1690c08e213a35ed9bab7b318de14420fb57d8c':
        imageAttr = 'image_url';
        break;
      // Blockchain Cuties
      case '0xd73be539d6b2076bab83ca6ba62dfe189abc6bbe':
        imageAttr = 'animation';
        break;
      default:
        imageAttr = 'image';
    }
    let image = get(data, imageAttr);
    switch (contractAddress) {
      // Blockchain Cuties
      case '0xd73be539d6b2076bab83ca6ba62dfe189abc6bbe':
        image = `https://blockchaincuties.com${image}`;
        break;
    }
    return image;
  } catch(e) {
    console.error(e);
    return null;
  };
};

module.exports = {
  getTokenImage,
}
