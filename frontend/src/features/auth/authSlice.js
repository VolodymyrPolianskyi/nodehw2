import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({email, password, confirmPassword}) => {
    const response = await axios.post(`http://localhost:8000/api/auth/register`, {email, password, confirmPassword})
    localStorage.setItem('token', response.data)
    console.log(response.data);
    return response.data
  }
)

export const loginUser = createAsyncThunk('auth/loginUser', 
    async ({email, password}) => {
    const response = await axios.post('http://localhost:8000/api/auth/login', {email, password})
    localStorage.setItem('token', response.data)
    return response.data
})

export const getToken = createAsyncThunk("auth/getToken", async () =>{
    const token = localStorage.getItem('token') 
    return token
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      token: null, 
      error: null,
      loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.loading = false;
          state.token = action.payload
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.token = action.payload
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getToken.fulfilled, (state, action)=>{
            state.loading = false
            state.token = action.payload
        })
        .addCase(getToken.rejected, (state)=>{
            state.token = null
        })
    },
  });
  
  export default authSlice.reducer;