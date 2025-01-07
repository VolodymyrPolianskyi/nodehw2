import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
import { serverLink } from '../../links';


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({email, password, confirmPassword}) => {
    const response = await axios.post(`${serverLink}/auth/register`, {email, password, confirmPassword})
    localStorage.setItem('token', response.data)
    console.log(response.data);
    return response.data
  }
)

export const loginUser = createAsyncThunk('auth/loginUser', 
  async ({email, password}) => {
  const response = await axios.post(`${serverLink}/auth/login`, {email, password})
  localStorage.setItem('token', response.data)
  return response.data
})

export const getToken = createAsyncThunk("auth/getToken", async () =>{
  const token = localStorage.getItem('token') 
  return token
})

export const toggleNotif = createAsyncThunk('auth/toggleNotif', async (token) => {
  const response = await axios.post(`${serverLink}/auth/togglenotif`, {}, {headers: {Authorization: `Bearer ${token}`}} )
  return response.data
})

export const toggleNotifCahnnel = createAsyncThunk('auth/toggleNotifChannel', async (token) => {
  const response = await axios.post(`${serverLink}/auth/togglenotifChannel`, {}, {headers: {Authorization: `Bearer ${token}`}} )
  return response.data
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      token: null, 
      error: null,
      loading: false,
      sendNotification: true,
      notifChannel: 'alert'
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
        .addCase(toggleNotif.fulfilled, (state)=>{
          state.sendNotification = !state.sendNotification
        })
        .addCase(toggleNotifCahnnel.fulfilled, (state)=>{
          state.notifChannel = state.notifChannel == 'log' ? "alert" : 'log';
        })
        .addCase(toggleNotif.rejected, (state, action)=>{
          state.error = action.payload
        })
        .addCase(toggleNotifCahnnel.rejected, (state, action)=>{
          state.error = action.payload
        })
    },
  });
  
  export default authSlice.reducer;