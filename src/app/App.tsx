import { useEffect } from 'react';
import './App.css';
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import {  useAppSelector } from '../common/hooks/useAppSelector';
import { appActions } from 'app/app.slice';
import { LinearProgress } from '@mui/material';
import { isLoadingSelector } from './app.selectors';

function App() {
  const isLoading = useAppSelector(isLoadingSelector);
  // const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized);
  

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 3000);
  }, []);
  return (
    <div className="App">
      {isLoading && <LinearProgress />}
        <nav className='Navbar'>
          <ul className='Navbar'>
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
              <Link to={`RegisterPage`} >RegisterPage</Link>
            </li>
            <li>
              <Link to={`SetNewPassportPage`}>SetNewPassportPage</Link>
            </li>
          </ul>
        </nav>
      <Outlet />
      
    </div>
  );
}

export default App;
