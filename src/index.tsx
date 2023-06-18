import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from 'components/ErrorPage';
import SignInPage from 'features/auth/login/SignInPage';
import CardsPage from 'components/CardsPage';
import CheckEmailPage from 'features/auth/checkEmail/CheckEmailPage';
import FoggotPasportPage from 'features/auth/foggotPassport/ForgotPassportPage';
import LearnPage from 'components/LearnPage';
import ProfilePage from 'features/auth/profile/ProfilePage';
import RegisterPage from 'features/auth/register/RegisterPage';
import SetNewPasswordPage from 'features/auth/createNewPassport/SetNewPasswordPage';
import { Packs } from 'features/packs/Packs';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
    errorElement: <ErrorPage />,
    children :[
      {
        path: "SignInPage",
        element: <SignInPage />
      },
      {
        path: "CardsPage",
        element: <CardsPage />
      },
      {
        path: "CheckEmailPage",
        element: <CheckEmailPage />
      },
      {
        path: "FoggotPassportPage",
        element: <FoggotPasportPage />
      },
      {
        path: "LearnPage",
        element: <LearnPage />
      },
      {
        path: "PacksPage",
        element: <Packs />
      },
      {
        path: "ProfilePage",
        element: <ProfilePage />
      },
      {
        path: "RegisterPage",
        element: <RegisterPage />
      },
      {
        path: "SetNewPassportPage:?/*",
        element: <SetNewPasswordPage />
      },
    ],
  },
]);
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
