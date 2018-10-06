import * as log from 'loglevel'
import axios from '@/constructors/axios'
import { getItem, setItem } from '@/constructors/localStorage'


const getTransfersForAddress = async (address) => {
  // let coins
  // let tokens
  try {
    // coins = getItem('coins')
    // tokens = getItem('tokens')
    // if (coins && tokens) return { data: { coins, tokens } }

    // const res = {

    // }


    const res = await axios.get(`/api/v1/transfers/?address=${address}`)
    // const { coins, tokens } = res;

    // setItem('coins', { coins })
    // setItem('tokens', { tokens })
    return res
    // return { data: { coins, tokens } }
  } catch (e) {
    log.error(e)
  }
}

export {
  getTransfersForAddress,
}