import {
  SET_ADD_TO_CART_DETAILS,
  SET_FAVORITE_DETAILS,
  SET_ITEM_TOTAL,
  SET_MAP_DETAILS,
  REMOVE_ITEM_CART,
  SET_AUTH_CREDENTIAL,
} from '../../Constants/SetData';

const initialData = {
  selectedDetails: [],
  mapDetails: '',
  setAddToCartDetails: [],
  itemTotal: null,
  authData: null,
  userData: null
};

const Reducer = (state = initialData, action) => {
  switch (action.type) {
    case SET_FAVORITE_DETAILS:
      return {
        ...state,
        selectedDetails: [...state.selectedDetails, action.payload],
      };
    case SET_MAP_DETAILS:
      return {
        ...state,
        mapDetails: action.payload,
      };
    case SET_ADD_TO_CART_DETAILS: {
      const {id, countChange} = action.payload;
      const exists = state.setAddToCartDetails.some(item => item.id === id);

      return exists
        ? {
            ...state,
            setAddToCartDetails: state.setAddToCartDetails.map(item =>
              item.id === id
                ? {
                    ...item,
                    count: Math.max(0, item.count + (countChange || 1)),
                  }
                : item,
            ),
          }
        : {
            ...state,
            setAddToCartDetails: [
              ...state.setAddToCartDetails,
              {
                id: action.payload,
                name: action.payload,
                count: 1, 
                price: 20,
                timestamp: Date.now(),
              },
            ],
          };
    }
    case REMOVE_ITEM_CART:
      return {
        ...state,
        setAddToCartDetails: state.setAddToCartDetails.filter(
          item => item.id !== action.payload,
        ),
      };
    case SET_ITEM_TOTAL:
      return {
        ...state,
        itemTotal: action.payload,
      };
    case SET_AUTH_CREDENTIAL:
      return {
        ...state,
        authData: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
