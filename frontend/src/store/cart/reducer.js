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
  EDIT_CART_ITEM_COUNT,
  CLEAR_CART_STATE,
} from './constants';

const initialState = {
  loading: true,
  cart: [],
  cartId: null,
  count: null,
};

function updatedCart(cart, product, count) {
  let updatedCart;

  const productExistsInCart = cart.some(item => item.product.id === product?.id);

  switch (true) {
    case count !== 0 && productExistsInCart:
      // Обновляем количество существующего товара в корзине
      updatedCart = cart.map(item => 
        item.product.id === product?.id ? { ...item, count } : item
      );
      break;
      
    case count !== 0 && !productExistsInCart:
      // Добавляем новый товар в корзину
      updatedCart = [...cart, { product: product, count }];
      break;
      
    case count === 0:
      // Удаляем товар из корзины
      updatedCart = cart.filter(item => item.product.id !== product?.id);
      break;
      
    default:
      updatedCart = [...cart];
  }

  return updatedCart;
};

export const cartReducer = (state = initialState, { type, response, count, product }) => {
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
      const newCart = updatedCart(state.cart, product, count);

      return ({
        ...state,
        cart: newCart,
        loadingEdit: false,
        count: newCart?.length !== 0 ? newCart?.length : null 
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
        count: response?.items?.length > 0 ? response?.items?.length : null,
        cartId: response?.id
      });

    case DELETE_CART_BY_ID_SUCCESS:
      return ({
        ...state,
        loading: false,
        cart: [],
        count: null,
      });

    case EDIT_CART_ITEM_COUNT:
      const newCartCount = updatedCart(state.cart, product, count);

      return ({
        ...state,
        cart: newCartCount,
        count: newCartCount?.length === 0 ? null : newCartCount?.length,
      });

    case CLEAR_CART_STATE:
      return ({
        ...state,
        cart: [],
        count: null,
      });

    default:
      return state;
  }
};