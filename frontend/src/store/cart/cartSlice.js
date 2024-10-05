import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cart: [],
  cartId: null,
  loading: false,
  error: null,
};

// const API_URL = import.meta.env.VITE_API_BASE;
const API_URL = 'https://moroshka-dudinka-bot-test-jmwcc4rfzq-ez.a.run.app';
// const API_URL = 'https://cors-anywhere.herokuapp.com/https://moroshka-dudinka-bot-test-jmwcc4rfzq-ez.a.run.app';

const testCartId = 'r8iCU4nURnbGF34bDnWS';

export const getCart = createAsyncThunk('cart/getCart', async (cartId = testCartId) => {
  const response = await axios.get(
    `${API_URL}/api/v1/carts/${cartId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
});

export const editCart = createAsyncThunk('cart/editCart', async ({ cartId, count, productId}) => {
  const response = await axios.put(
    `${API_URL}/api/v1/carts/${cartId}`,
    {
      count,
        product_id: productId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
});

export const clearCart = createAsyncThunk('cart/clearCart', async (cartId) => {
  const response = await axios.delete(
    `${API_URL}/api/v1/carts/${cartId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GetCart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload?.items;
        state.cartId = action.payload?.id;
      })
      .addCase(getCart.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // editCart
      .addCase(editCart.pending, (state, action) => {
        const { count, productId } = action.meta.arg;
        state.loading = true;
        state.error = null;
        state.cart = state.cart.map(item => {
          if (item?.product?.id === productId) {
            return {
              ...item,
              count,
            }
          };

          return item;
        });
      })
      .addCase(editCart.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editCart.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // clearCart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(clearCart.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default cartSlice.reducer;
