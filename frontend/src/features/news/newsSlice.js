import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverLink } from '../../links';



export const fetchNewsPosts = createAsyncThunk(
  'news/fetchNewsPosts',
  async ({ page = 1, size = 10 } = {}) => {
    const response = await fetch(`${serverLink}/newsposts?page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json()
  }
);

export const fetchNewsPostById = createAsyncThunk('news/fetchNewsPostById', async (id) => {
  const response = await fetch(`${serverLink}/newsposts/${id}`);
  if(!response.ok){
    return response.json()
  }
  return response.json();
})

export const createNewsPost = createAsyncThunk(
  'news/createNewsPost',
  async ({ header, text, token }) => {
    const response = await axios.post(`${serverLink}/newsposts/`, {header, text}, {headers: {Authorization: `Bearer ${token}`}})
    return response.data;
  }
);

export const updateNewsPost = createAsyncThunk(
  'news/updateNewsPost',
  async ({ id, updates, token }, { rejectWithValue }) => {
    const response = await fetch(`${serverLink}/newsposts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
       },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData || 'Unexpected error occured');
    }
    return response.json();
  }
);

export const deleteNewsPost = createAsyncThunk('news/deleteNewsPost', async ({id, token} ,  { rejectWithValue }) => {
  const response = await fetch(`${serverLink}/newsposts/${id}`, { method: 'DELETE', headers: {'Authorization': `Bearer ${token}`} })
  if (!response.ok) {
    const errorData = await response.json();
    return rejectWithValue(errorData || 'Unexpected error occured');
  }
  return response.json()
})

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.totalPages = action.payload.totalPages; 
      })
      .addCase(fetchNewsPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNewsPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(createNewsPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(createNewsPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateNewsPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) state.posts[index] = action.payload;
      })
      .addCase(updateNewsPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteNewsPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
        state.currentPost = null;
      })
      .addCase(deleteNewsPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default newsSlice.reducer;