import { useActions } from 'common/hooks/useActions';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import {  useAppSelector } from '../../../common/hooks/useAppSelector';
import { selectEmail } from '../auth.selectors';
import styles from "./RegisterStyles.module.css"
import { authThunks } from "features/auth/auth.slice";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

type Inputs = {
  email: string,
  password: string,
};

export default function RegisterPage () {
  const navigate = useNavigate()
  const { registration } = useActions(authThunks);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    let payload = {
      email: data.email,
      password : data.password
    }
    registration(payload)
      .unwrap()
      .then((res) => {
        toast.success("Вы успешно зарегистрировались");
        navigate("/signin")
      })
      .catch((err) => {
        toast.error(err.e.response.data.error);
      });
  };
  return (
  <form onSubmit={handleSubmit(onSubmit)}> 
  <div className={styles.form}>
    <label>Sign Up</label>
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
    <div className={styles.password_input}>
      <label>Confirm password</label>
      <input
        type="password"
        {...register("password", { required: true })}
      />
     
    </div>
    <div className={styles.sign_in}>  
      <input
        value={'Sign Up'} 
        type="submit" />
    </div>
    <div className={styles.sign_up}>  
      <label>Alredy have an account ?</label>
      <Link to={`/SignInPage`}>Sign Up</Link>
    </div>
  </div>  
  </form>
  );
};
