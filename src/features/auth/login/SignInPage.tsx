import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch } from "app/hooks";

export default function SignInPage () {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    let payload = {
      email: "abobba@nya.nya",
      password : "1qazxcvBG",
      rememberMe: true,
    }
    dispatch(authThunks.login(payload));
  };

  return (
    <div className={''}>
      <h1>Login</h1>
      <button onClick={registerHandler}>login</button>
    </div>
  );
};
