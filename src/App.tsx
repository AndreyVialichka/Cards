import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { appActions } from 'app/app.slice';

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 3000);
  }, []);
  return (
    <div className="App">
        <nav>
          <ul>
            <li>
              <Link to={`SignInPage`}>SignIn</Link>
            </li>
            <li>
              <Link to={`CardsPage`}>CardsPage</Link>
            </li>
            <li>
              <Link to={`CheckEmailPage`}>CheckEmailPage</Link>
            </li>
            <li>
              <Link to={`FoggotPassportPage`}>FoggotPassportPage</Link>
            </li>
            <li>
              <Link to={`LearnPage`}>LearnPage</Link>
            </li>
            <li>
              <Link to={`PacksPage`}>PacksPage</Link>
            </li>
            <li>
              <Link to={`ProfilePage`}>ProfilePage</Link>
            </li>
            <li>
              <Link to={`RegisterPage`}>RegisterPage</Link>
            </li>
            <li>
              <Link to={`SetNewPassportPage`}>SetNewPassportPage</Link>
            </li>
          </ul>
        </nav>
      <Outlet />
      {isLoading && <h1>Loader...</h1>}
      
      <header className="App-header">
        <Counter />
      </header>
    </div>
  );
}

export default App;
