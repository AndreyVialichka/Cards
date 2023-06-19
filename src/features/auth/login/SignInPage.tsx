import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import {  useAppSelector } from '../../../common/hooks/useAppSelector';
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./SignInPage.module.css"
import { Link, useNavigate } from "react-router-dom";

import { useEffect } from 'react';
import { useActions } from "common/hooks/useActions";
import { toast } from "react-toastify";
type Inputs = {
  email: string,
  password: string,
  rememberMe: boolean
};


export default function SignInPage () {
  const { login } = useActions(authThunks);
  const profile = useAppSelector((state) => state.auth.profile);
  const navigate = useNavigate()

  const { register, handleSubmit} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    
    let payload = {
      email: data.email,
      password : data.password,
      rememberMe: data.rememberMe,
    }

    login(payload)
      .unwrap()
      .then((res) => {
        toast.success("Вы успешно залогинились");
        navigate("/packs");
      })
      .catch((err) => {
        toast.error(err.e.response.data.error);
      });

  };
  

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
    > 
    <div className={styles.form}>
      <label>Sign In</label>
      <div className={styles.email_input}>
        <label>Email</label>
        <input
          defaultValue="email" 
          {...register("email")} 
        />
        
      </div>
      <div className={styles.password_input}>
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: true })}
        />
       
      </div>
      <div className={styles.checkbox_input} >
        <input 
          type="checkbox" 
          {...register("rememberMe")} 
        />
        <label>RememberMe</label>
      </div>
      <div className={styles.forgot_password}>
        <Link to={`/FoggotPassportPage`}>Foggot Password ?</Link>
      </div>
      <div className={styles.sign_in}>  
        <input
          value={'Sign In'} 
          type="submit" />
      </div>
      <div className={styles.sign_up}>  
        <label>Don't have an account ?</label>
        <Link replace to={`/RegisterPage`} >Sign Up</Link>
      </div>
    </div>  
    </form>
  );
};


