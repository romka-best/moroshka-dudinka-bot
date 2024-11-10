import { 
  GET_PRODUCT_TYPES_START,
  GET_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPES_FAIL,
  GET_PRODUCT_START,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_MORE_PRODUCTS_START,
  GET_MORE_PRODUCTS_SUCCESS,
  GET_MORE_PRODUCTS_FAIL,
} from './constants';

const initialState = {
  loading: false,
  categories: [],
  products: [],
  productsPagination: {
    page: null,
    pages: null,
    size: null,
    total: null,
  },
  loadingMore: false,
};

export const productReducer = (state = initialState, { type, response }) => {
  switch (type) {
    case GET_PRODUCT_START:
    case GET_PRODUCT_TYPES_START:
      return ({
        ...state,
        loading: true,
      });

    case GET_PRODUCT_TYPES_SUCCESS:
      return ({
        ...state,
        loading: false,
        categories: response,
      });

    case GET_PRODUCT_FAIL:
    case GET_PRODUCT_TYPES_FAIL:
      return ({
        ...state,
        loading: false,
      });
    
    case GET_PRODUCT_SUCCESS:
      const { page, pages, size, total } = response;

      return {
        ...state,
        loading: false,
        products: response?.items,
        productsPagination: {
          page,
          pages,
          size,
          total,
        }
      };

    case GET_MORE_PRODUCTS_START:
      return ({
        ...state,
        loadingMore: true,
      });

    case GET_MORE_PRODUCTS_SUCCESS:
      return ({
        ...state,
        loadingMore: false,
        products: [...state.products, ...response.items],
        productsPagination: {
          ...state.productsPagination,
          page: state.productsPagination + 1,
        }
      });

    case GET_MORE_PRODUCTS_FAIL:
      return ({
        ...state,
        loadingMore: false,
      });

    default:
      return state;
  }
};