export const truncateAddress = (address, charBefore = 4, charAfter = 4) => {
  const baseString = address || ''
  return `${baseString.substring(0, 6)}...${baseString.substring(baseString.length - 4)}`;
}