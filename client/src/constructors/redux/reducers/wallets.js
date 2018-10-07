import {
  getItem,
} from '@/constructors/localStorage'
const initialState = {
  wallet: getItem('wallet') || null,
  watchlist: getItem('watchlist') || null,
};

export default function wallets(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_PROFILE':
      return Object.assign({}, state, {
        wallet: payload.wallet,
        watchlist: payload.watchlist,
      });
    default:
      return state;
  }
}