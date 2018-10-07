const initialState = {
  loading: false,
  me: {
    coins: [],
    tokens: [],
  },
  watchlist: {
    coins: [],
    tokens: [],
  },
  all: {
    coins: [],
    tokens: [],
  },
};

export default function wallets(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'TRANSFERS_LOADING':
      return Object.assign({}, state, {
        loading: payload,
      });
    case 'UPDATE_TRANSFERS':
      const { data, addressType } = payload
      const { coins, tokens } = data
      return Object.assign({}, state, {
        [addressType]: {
          coins,
          tokens,
        },
      });
    default:
      return state;
  }
}