import {
  GET_CART_BY_ID_START,
  GET_CART_BY_ID_SUCCESS,
  GET_CART_BY_ID_FAIL,
  DELETE_CART_BY_ID_START,
  DELETE_CART_BY_ID_SUCCESS,
  DELETE_CART_BY_ID_FAIL,
  EDIT_CART_ITEM_START,
  EDIT_CART_ITEM_SUCCESS,
  EDIT_CART_ITEM_FAIL,
  INITIAL_CART,
} from './constants';

const initialState = {
  loading: true,
  cart: [],
  cartId: null,
};

export const cartReducer = (state = initialState, { type, response, count, product_id, cartData }) => {
  switch (type) {
    case GET_CART_BY_ID_FAIL:
    case GET_CART_BY_ID_START:
    case DELETE_CART_BY_ID_START:
    case DELETE_CART_BY_ID_FAIL:
      return ({
        ...state,
        loading: true,
      });

      
    case EDIT_CART_ITEM_SUCCESS:
      const newCart = count !== 0 
        ? state.cart.map(item => {
          if (item?.product?.id === product_id) {
            return ({
              ...item,
              count: count,
            });
          } else {
            return item;
          }
        })
        : state.cart.filter(item => item?.product?.id !== product_id);
      
      return ({
        ...state,
        cart: newCart,
        loadingEdit: false,
      });
        
    case EDIT_CART_ITEM_START:
    case EDIT_CART_ITEM_FAIL:
      return ({
        ...state,
        loading: false,
      });

    case GET_CART_BY_ID_SUCCESS:
      return ({
        ...state,
        loading: false,
        cart: response?.items,
      });

    case DELETE_CART_BY_ID_SUCCESS:
      return ({
        ...state,
        loading: false,
        cart: [],
      });

    case INITIAL_CART:
      return ({
        ...state,
        cartId: cartData?.id
      })

    default:
      return state;
  }
};