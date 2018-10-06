import * as log from 'loglevel';


export const getItem = key => {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    log.error(e);
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (e) {
    log.error(e);
    return false;
  }
};


export default {
  getItem,
  setItem,
};
