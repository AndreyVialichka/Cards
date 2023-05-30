import { useAppDispatch, useAppSelector } from "app/hooks";
import styles from "./RegisterStyles.module.css"
import { authThunks, selectEmail } from "features/auth/auth.slice";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";

type Inputs = {
  email: string,
  password: string,
};

export default function RegisterPage () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectEmail);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    let payload = {
      email: data.email,
      password : data.password
    }
    dispatch(authThunks.register(payload));
    navigate("/SignInPage")
  };
  return (
  <form onSubmit={handleSubmit(onSubmit)}> 
  { email &&  (
    
     <Navigate to = '/SignInPage' replace={true} />
  )}
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
