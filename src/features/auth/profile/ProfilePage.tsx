import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import {  useAppSelector } from '../../../common/hooks/useAppSelector';
import { SubmitHandler, useForm } from "react-hook-form";
import { authActions, authThunks } from "../auth.slice";
import styles from './ProfilePage.module.css'
import avatar from '../../../common/assets/9359.png_860.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectEmail } from '../auth.selectors';


type Inputs = {
};

export default function ProfilePage() {
  let [NameState, setNameState] = useState(false)
  const profile = useAppSelector(selectEmail);
  //@ts-ignore
  let [name,setName] = useState<string>(profile?.name)
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { handleSubmit,  formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(authThunks.logut());
    navigate("/SignInPage")
  };
  const handleDoubleClick = (e:any) => {
    setNameState(!e.currentTarget.value)
    dispatch(authActions.changeName(name))
  } 

  const handleChange = (e:any) => {
    setName(e.currentTarget.value)    
  }

  return (
    <div id="ProfilePage">
      <div className={styles.profile}>
        <h3>Personal Information</h3>
        <div className={styles.img}>
          <img src={avatar} />
        </div>
        <div className={styles.name}>
          {
            NameState 
              ? <input
                onChange={handleChange} 
                onDoubleClick={handleDoubleClick}/> 
              : <div onDoubleClick={handleDoubleClick}>{name} </div>}
        </div>
        <div className={styles.email}>
        {profile?.email}
        </div>
        <form
          className={styles.form} 
          onSubmit={handleSubmit(onSubmit)}>
          <input value = 'logout'type="submit" />
        </form>
      </div>
    </div>
  );
}
