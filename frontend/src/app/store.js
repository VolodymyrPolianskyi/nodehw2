import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/newsSlice';
import authReducer from "../features/auth/authSlice"

const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer
  },
});

export default store;