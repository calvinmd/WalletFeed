export const truncateAddress = (address, charBefore = 4, charAfter = 4) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}