import { createSlice,PayloadAction  } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";

const slice = createSlice({
  // name должен быть уникальным
  // name будет использоваться в качетве приставки (redux ducks)
  name: "app",
  // Инициализационный стейт
  initialState: {
    error: null as string | unknown,
    isLoading: true,
    isAppInitialized: false,
  },
  // reducers состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
        // Логику в подредьюсерах пишем мутабельным образом,
        // т.к. иммутабельность достигается благодаря immer.js
        state.isLoading = action.payload.isLoading;
      },
      setAppError: (state, action: PayloadAction<{ error: string | unknown }>) => {
        state.error = action.payload.error;
      },
      
  },
  extraReducers: builder => {
    builder
      .addMatcher(
      (action) => {
        console.log('addMatcher matcher: ', action.type)
        return action.type.endsWith('/pending')
      },
      (state, action) => {
        state.isLoading = true
        console.log("✅ addMatcher reducer");
      }
    )
    .addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.isLoading = false;
        if (!action.payload.showGlobalError) return;
        const err = action.payload.e as Error | AxiosError<{ error: string }>;
        if (isAxiosError(err)) {
           state.error = err.response ? err.response.data.error : err.message;
        } else {
           state.error = `Native error ${err.message}`;
         }
      }
     )
    .addMatcher(
      (action) => {
        return action.type.endsWith('/fulfilled')
      },
      (state, action) => {
        state.isLoading = false
        console.log("✅ addMatcher reducer");
      }
    )
  }
});

// Создаем reducer с помощью slice
export const appReducer = slice.reducer 

export const appActions = slice.actions;