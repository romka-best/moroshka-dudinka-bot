import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: null,
  loading: false,
  error: null,
};

// const API_URL = import.meta.env.VITE_API_BASE;
const API_URL = 'https://moroshka-dudinka-bot-test-jmwcc4rfzq-ez.a.run.app';

export const getProducts = createAsyncThunk('products/getProducts', async ({ title, page, size }) => {
  const response = await axios.get(
    `${API_URL}/api/v1/products`,
    {
      headers: {
        'Content-Type': 'application/json',
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
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        // state.products = action.payload?.user;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productsSlice.reducer;
