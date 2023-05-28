import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "app/store";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { LoginResponseType, RegisterResponseType, authApi, loginPayloadType } from "features/auth/auth.api";
import { payloadRegistrationType } from "features/auth/auth.api";


const register = createAppAsyncThunk<void,payloadRegistrationType>("auth/register", async (arg) => {
      await authApi.registration(arg);
    }
);

const login = createAppAsyncThunk<{ profile : LoginResponseType },loginPayloadType>( "auth/login", async (arg) => {
      const res = await authApi.login(arg)
        return  { profile: res.data }
    }
);  
  
  const slice = createSlice({
    name: "auth",
    initialState: {
      profile: null as LoginResponseType | null
    },
    reducers: {
      setProfile: (state, action: PayloadAction<{profile: LoginResponseType}>) => {
        state.profile = action.payload.profile;
      },
    },
    extraReducers: builder => {
      builder.addCase(login.fulfilled , (state,action) => {
        state.profile = action.payload.profile
      })
    }
  });
  
  export const authReducer = slice.reducer;
  // Санки давайте упакуем в объект, нам это пригодится в дальнейшем
  export const authThunks = { register , login };
  export const authActions = slice.actions
  export const  setProfile  = slice.actions