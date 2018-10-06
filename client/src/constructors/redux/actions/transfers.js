import axios from '@/constructors/axios'

const getTransfersForAddress = async (address) => {
  return await axios.get(`/api/v1/transfers/?address=${address}`)
}

export {
  getTransfersForAddress,
}