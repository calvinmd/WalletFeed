import * as log from 'loglevel'
import axios from '@/constructors/axios'

export const getProducts = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/products')
      log.info('Server returned product info: ', data)
      return dispatch({ type: 'UPDATE_PRODUCTS', payload: { products: data } });
    } catch(error) {
      log.error(error)
      return dispatch({ type: 'UPDATE_PRODUCTS', payload: { error } })
    }
  }
}
