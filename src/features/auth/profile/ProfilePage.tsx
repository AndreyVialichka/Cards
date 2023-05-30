import { useAppDispatch } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { authThunks } from "../auth.slice";
type Inputs = {
  email: string,
  password: string,
  rememberMe: boolean
};

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(authThunks.logut());
  };
  return (
    <div id="ProfilePage">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input value = 'logout'type="submit" />
      </form>
    </div>
  );
}
