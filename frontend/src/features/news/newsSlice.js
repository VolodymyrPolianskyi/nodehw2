import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNewsPosts = createAsyncThunk('news/fetchNewsPosts', async () => {
  try {
    const response = await fetch('http://localhost:8000/api/newsposts');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
});

export const fetchNewsPostById = createAsyncThunk('news/fetchNewsPostById', async (id) => {
  const response = await fetch(`http://localhost:8000/api/newsposts/${id}`);
  return response.json();
})

export const createNewsPost = createAsyncThunk('news/createNewsPost', async (news) => {
  const response = await fetch('http://localhost:8000/api/newsposts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(news),
  })
  return response.json()
})

export const updateNewsPost = createAsyncThunk('news/updateNewsPost', async ({ id, updates }) => {
  const response = await fetch(`http://localhost:8000/api/newsposts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  return response.json()
})

export const deleteNewsPost = createAsyncThunk('news/deleteNewsPost', async (id) => {
  await fetch(`http://localhost:8000/api/newsposts/${id}`, { method: 'DELETE' })
  return id
})

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsPosts.pending, (state) => {
        
        state.loading = true;
      })
      .addCase(fetchNewsPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchNewsPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(createNewsPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updateNewsPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) state.posts[index] = action.payload;
      })
      .addCase(deleteNewsPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(fetchNewsPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
