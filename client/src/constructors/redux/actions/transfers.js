import * as log from 'loglevel'
import axios from '@/constructors/axios'
import { getItem, setItem } from '@/constructors/localStorage'


export const getTransfersForAddress = async (address, addressType) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/v1/transfers?wallets=${address}`)
      const { coins, tokens } = data;
      log.info('Server returned address transfers: ', coins, tokens)
      return dispatch({
        type: 'UPDATE_TRANSFERS',
        payload: {
          addressType,
          data: { coins, tokens },
        },
      })
    } catch (error) {
      log.error(error)
      // return dispatch({ type: 'UPDATE_TRANSFERS', payload: { error } })
      return null;
    }
  }
}
