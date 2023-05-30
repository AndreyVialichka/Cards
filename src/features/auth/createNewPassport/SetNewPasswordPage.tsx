import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch } from "app/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./SetNewPasswordPage.module.css"
import { Link, useNavigate } from "react-router-dom";
import {MESSAGE_FOR_FOGGOTEN_PASSPORT} from "../auth.api"


type Inputs = {
  password: string,
};


export default function SetNewPasswordPage() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    let payload = {
      email: data.password,
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
      <label>Create New Password</label>
      <div className={styles.email_input}>
        <label></label>
        <input
          defaultValue="password" 
          {...register("password")} 
        />
        <label>Create new password and we will send you further instructions to email </label>
        
      </div>

      <div className={styles.sign_in}>  
        <input
          value={'Send instructions'} 
          type="submit" />
      </div>
    </div>  
    </form>
  )
}
