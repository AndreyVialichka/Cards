import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "common/utils/thunk-try-catch";
import { authApi, loginPayloadType, payloadForgotPassportType, payloadNewPassportType, profileType } from "features/auth/auth.api";
import { payloadRegistrationType } from "features/auth/auth.api";


const registration = createAppAsyncThunk<void,payloadRegistrationType>("auth/register", async (arg,thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
          const res = await authApi.registration(arg);
          console.log(res)
        })
      
    }
);


// change login thunk TODO
const login = createAppAsyncThunk<{ profile : profileType },loginPayloadType>( "auth/login", async (arg, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async() => {
          const res = await authApi.login(arg)
          return  { profile: res.data }
        },)
    }
);  

const logut = createAppAsyncThunk( "auth/logut", async (arg) => {
    await authApi.logout()
  }
);

const forgotPassword = createAppAsyncThunk<any,payloadForgotPassportType>( "auth/forgotPassword", async (arg,thunkAPI) => {
  
    await authApi.forgorPassport(arg)
  }
);

const setNewPassword = createAppAsyncThunk<any,payloadNewPassportType>( "auth/setNewPassport", async (arg,thunkAPI) => {
  let splashIndex = arg.resetPasswordToken.lastIndexOf('/')
  let token = arg.resetPasswordToken.slice(splashIndex+1)
  let payload = {
    ...arg,
    resetPasswordToken: token
  }
  await authApi.setNewPassport(payload)
}
);
  
  const slice = createSlice({
    name: "auth",
    initialState: {
      profile: null as profileType | null
    },
    reducers: {
      changeName: (state, action: PayloadAction<string>) => {
        //@ts-ignore
          state.profile.name = action.payload;
      },
    },
    extraReducers: builder => {
      builder.addCase(login.fulfilled , (state,action) => {
        state.profile = action.payload.profile
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



  // Санки давайте упакуем в объект, нам это пригодится в дальнейшем
  export const authThunks = { registration , login, logut, forgotPassword, setNewPassword };
  export const authActions = slice.actions
  export const  setProfile  = slice.actions