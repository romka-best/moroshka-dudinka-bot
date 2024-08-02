import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

// const API_URL = import.meta.env.VITE_API_BASE;
const API_URL = 'https://cors-anywhere.herokuapp.com/https://moroshka-dudinka-bot-test-jmwcc4rfzq-ez.a.run.app';

export const getProducts = createAsyncThunk('products/getProducts', async ({ title = '', page = 1, size = 20 }) => {
  const response = await axios.get(
    `${API_URL}/api/v1/products`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        title,
        page,
        size,
      },
      withCredentials: false,
    },
  );
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, 'TEST');
        state.products = action.payload?.items;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productsSlice.reducer;
