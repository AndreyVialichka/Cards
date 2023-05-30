import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch } from "app/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./SignInPage.module.css"
import { Link } from "react-router-dom";
type Inputs = {
  email: string,
  password: string,
  rememberMe: boolean
};


export default function SignInPage () {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    let payload = {
      email: data.email,
      password : data.password,
      rememberMe: data.rememberMe,
    }
    dispatch(authThunks.login(payload));
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


