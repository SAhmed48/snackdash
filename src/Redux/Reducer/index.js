import {
  SET_ADD_TO_CART_DETAILS,
  SET_FAVORITE_DETAILS,
  SET_ITEM_TOTAL,
  SET_MAP_DETAILS,
  REMOVE_ITEM_CART,
  SET_AUTH_CREDENTIAL,
  SET_TOKEN,
  SET_HISTORY_DATA,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  MARK_VIEWED_ITEM,
} from '../../Constants/SetData';

const initialData = {
  selectedDetails: [],
  mapDetails: '',
  setAddToCartDetails: [],
  itemTotal: null,
  authData: null,
  userData: null,
  userToken: '',
  historyData: [],
  currentCartIndex: 0,
  cartViewed: false,
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
      if (countChange !== undefined) {
        return {
          ...state,
          setAddToCartDetails: state.setAddToCartDetails.map(item =>
            item.id === id
              ? {
                  ...item,
                  count: item.count + countChange,
                  timestamp: Date.now(),
                }
              : item,
          ),
        };
      } else {
        const newItem = action.payload;
        const existingItem = state.setAddToCartDetails.find(
          item => item.id === newItem.id,
        );

        if (existingItem) {
          return {
            ...state,
            setAddToCartDetails: state.setAddToCartDetails.map(item =>
              item.id === newItem.id
                ? {...item, count: item.count + 1, timestamp: Date.now()}
                : item,
            ),
          };
        } else {
          return {
            ...state,
            setAddToCartDetails: [...state.setAddToCartDetails, newItem],
          };
        }
      }
    }
    case REMOVE_ITEM_CART: {
      const idToRemove = action.payload;
      return {
        ...state,
        setAddToCartDetails: state.setAddToCartDetails.filter(
          item => item.id !== idToRemove,
        ),
      };
    }
    case SET_ITEM_TOTAL:
      return {
        ...state,
        itemTotal: action.payload
      };
    case INCREMENT_COUNT: {
      const idToIncrement = action.payload;
      return {
        ...state,
        setAddToCartDetails: state.setAddToCartDetails.map(item =>
          item.id === idToIncrement
            ? {...item, count: item.count + 1, timestamp: Date.now()}
            : item,
        ),
      };
    }
    case DECREMENT_COUNT: {
      const idToDecrement = action.payload;
      return {
        ...state,
        setAddToCartDetails: state.setAddToCartDetails
          .map(item =>
            item.id === idToDecrement
              ? {...item, count: item.count - 1, timestamp: Date.now()}
              : item,
          )
      };
    }
    case SET_AUTH_CREDENTIAL:
      return {
        ...state,
        authData: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case SET_HISTORY_DATA:
      return {
        ...state,
        historyData: [...state.historyData, action.payload],
      };
    case MARK_VIEWED_ITEM:
      return {
        ...state,
        cartViewed: true,
        currentCartIndex: 0,
      };
    default:
      return state;
  }
};

export default Reducer;