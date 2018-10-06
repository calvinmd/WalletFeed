const initialState = {
  menuOpen: false,
};

export default function layout(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_MENU_STATE':
      return Object.assign({}, state, {
        menuOpen: payload,
      });
    default:
      return state;
  }
}