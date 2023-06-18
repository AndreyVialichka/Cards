import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./SetNewPasswordPage.module.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import {MESSAGE_FOR_FOGGOTEN_PASSPORT} from "../auth.api"


type Inputs = {
  password: string,
};


export default function SetNewPasswordPage() {
  const location = useLocation()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    let payload = {
      password: data.password,
      resetPasswordToken : location.pathname
    }
    dispatch(authThunks.setNewPassword(payload));
    navigate("/SignInPage")
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
    > 
    <div className={styles.form}>
      <label>Create New Password</label>
      <div className={styles.email_input}>
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
