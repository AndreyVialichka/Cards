import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch } from "app/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./ForgotPassport.module.css"
import { Link, useNavigate } from "react-router-dom";
import {MESSAGE_FOR_FOGGOTEN_PASSPORT} from "../auth.api"


type Inputs = {
  email: string,
};


export default function FoggotPasportPage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
      let payload = {
        email: data.email,
        from : "test-front-admin <ai73a@yandex.by>",
        message: MESSAGE_FOR_FOGGOTEN_PASSPORT
      }
      dispatch(authThunks.forgotPassword(payload));
      navigate("/CheckEmailPage")
    };
  
    return (
      <form 
        onSubmit={handleSubmit(onSubmit)} 
      > 
      <div className={styles.form}>
        <label>Forgot your password ?</label>
        <div className={styles.email_input}>
          <label>Email</label>
          <input
            defaultValue="email" 
            {...register("email")} 
          />
          <label>Enter your email address and we will send you further instructions </label>
          
        </div>

        <div className={styles.sign_in}>  
          <input
            value={'Send instructions'} 
            type="submit" />
        </div>
        <div className={styles.sign_up}>  
          <label>Did you remember your password?</label>
          <Link replace to={`/SignInPage`} >Try to logging in</Link>
        </div>
      </div>  
      </form>
    )
}
