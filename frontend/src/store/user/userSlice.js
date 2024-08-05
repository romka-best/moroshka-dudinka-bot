import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// const API_URL = import.meta.env.VITE_API_BASE;
const API_URL = 'https://moroshka-dudinka-bot-test-jmwcc4rfzq-ez.a.run.app';
// const API_URL = 'https://cors-anywhere.herokuapp.com/https://moroshka-dudinka-bot-test-jmwcc4rfzq-ez.a.run.app';

// Асинхронный thunk для получения данных пользователя
export const getUser = createAsyncThunk('user/getUser', async (userId) => {
  const response = await axios.get(
    `${API_URL}/api/v1/users/${userId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default userSlice.reducer;
