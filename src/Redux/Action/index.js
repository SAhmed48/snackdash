import {
  REMOVE_ITEM_CART,
  SET_ADD_TO_CART_DETAILS,
  SET_AUTH_CREDENTIAL,
  SET_FAVORITE_DETAILS,
  SET_ITEM_TOTAL,
  SET_MAP_DETAILS,
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

const setAuthCredential = authData => {
  return {
    type: SET_AUTH_CREDENTIAL,
    payload: authData,
  };
};

export {
  setData,
  setMapData,
  setAddToCartData,
  removeItemCart,
  setItemTotal,
  setAuthCredential,
};
