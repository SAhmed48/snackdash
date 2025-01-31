import {
  REMOVE_ITEM_CART,
  SET_ADD_TO_CART_DETAILS,
  SET_AUTH_CREDENTIAL,
  SET_FAVORITE_DETAILS,
  SET_ITEM_TOTAL,
  SET_MAP_DETAILS,
  SET_TOKEN,
  SET_HISTORY_DATA,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  SET_ITEM_CART,
  EMPTY_CART,
} from '../../Constants/SetData';

const setData = details => {
  return {
    type: SET_FAVORITE_DETAILS,
    payload: details,
  };
};

const setMapData = MapDetails => {
  return {
    type: SET_MAP_DETAILS,
    payload: MapDetails,
  };
};

const setAddToCartData = data => {
  return {
    type: SET_ADD_TO_CART_DETAILS,
    payload: data,
  };
};

const removeItemCart = id => {
  return {
    type: REMOVE_ITEM_CART,
    payload: id,
  };
};

const setItemTotal = ItemTotal => {
  return {
    type: SET_ITEM_TOTAL,
    payload: ItemTotal,
  };
};

export const incrementCount = id => {
  return {
    type: INCREMENT_COUNT,
    payload: id,
  };
};

export const decrementCount = id => {
  return {
    type: DECREMENT_COUNT,
    payload: id,
  };
};

const setAuthCredential = authData => {
  return {
    type: SET_AUTH_CREDENTIAL,
    payload: authData,
  };
};

const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

const setHistoryData = data => {
  return {
    type: SET_HISTORY_DATA,
    payload: data,
  };
};

const setItemCart = data => {
  return {
    type: SET_ITEM_CART,
    payload: data,
  };
};

const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

export {
  setData,
  setMapData,
  setAddToCartData,
  removeItemCart,
  setItemTotal,
  incrementCount,
  decrementCount,
  setAuthCredential,
  setToken,
  setHistoryData,
  setItemCart,
  emptyCart,
};
