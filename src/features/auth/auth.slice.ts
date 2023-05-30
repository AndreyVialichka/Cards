import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "app/store";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { LoginResponseType, RegisterResponseType, authApi, loginPayloadType, payloadForgotPassportType } from "features/auth/auth.api";
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

const logut = createAppAsyncThunk( "auth/logut", async (arg) => {
  await authApi.logout()
}
);

const forgotPassword = createAppAsyncThunk<any,payloadForgotPassportType>( "auth/forgotPassword", async (arg) => {
  await authApi.forgorPassport(arg)
}
);
  
  const slice = createSlice({
    name: "auth",
    initialState: {
      profile: null as LoginResponseType | null
    },
    reducers: {
    },
    extraReducers: builder => {
      builder.addCase(login.fulfilled , (state,action) => {
        state.profile = action.payload.profile
        debugger
      })
      .addCase(logut.fulfilled, (state,action) => {
        state.profile = null
      })
      .addCase(forgotPassword.fulfilled, (state,action) => {
        state.profile = null
      })
    }
  });
  
  export const authReducer = slice.reducer;

  export const selectEmail = (state: RootState) => state.auth.profile;
  debugger
  // Санки давайте упакуем в объект, нам это пригодится в дальнейшем
  export const authThunks = { register , login, logut, forgotPassword };
  export const authActions = slice.actions
  export const  setProfile  = slice.actions