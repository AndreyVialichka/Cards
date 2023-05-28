import { useAppDispatch } from "app/hooks";
import styles from "./RegisterStyles.module.css"
import { authThunks } from "features/auth/auth.slice";

export default function RegisterPage () {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    let payload = {
      email: "abobba@nya.nya",
      password : "1qazxcvBG"
    }
    dispatch(authThunks.register(payload));
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};
