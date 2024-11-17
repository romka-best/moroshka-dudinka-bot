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
} from './constants';

const initialState = {
  loading: true,
  cart: [],
  cartId: null,
  count: null,
};

function updatedCart(cart, productId, count) {
  let updatedCart;

  const productExistsInCart = cart.some(item => item.product.id === productId);

  switch (true) {
    case count !== 0 && productExistsInCart:
      // Обновляем количество существующего товара в корзине
      updatedCart = cart.map(item => 
        item.product.id === productId ? { ...item, count } : item
      );
      break;
      
    case count !== 0 && !productExistsInCart:
      // Добавляем новый товар в корзину
      updatedCart = [...cart, { product: { id: productId }, count }];
      break;
      
    case count === 0:
      // Удаляем товар из корзины
      updatedCart = cart.filter(item => item.product.id !== productId);
      break;
      
    default:
      updatedCart = [...cart];
  }

  return updatedCart;
};

export const cartReducer = (state = initialState, { type, response, count, product_id }) => {
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
      const newCart = updatedCart(state.cart, product_id, count);

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
      const newCartCount = updatedCart(state.cart, product_id, count);

      return ({
        ...state,
        cart: newCartCount,
      });

    default:
      return state;
  }
};