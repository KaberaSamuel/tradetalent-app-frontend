import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Spinner } from "@/components/Loader";
import { loginUser } from "@/features/auth/api";
import { updateTokens, updateUser } from "@/features/auth/authSlice";
import { updatePopupMessage } from "@/features/popups/messageSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

import GoogleLoginButton from "@/features/auth/GoogleLoginButton";

export interface LoginFormTypes {
  email: string;
  password: string;
  token?: string;
}

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [pending, setPending] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<LoginFormTypes>();

  const onSubmit = async (data: LoginFormTypes): Promise<void> => {
    try {
      setPending(true);
      const response = await loginUser(data);
      const { user, tokens } = response.data;

      // Update Redux store
      dispatch(updateUser(user));
      dispatch(updateTokens(tokens));

      // Update localStorage
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      navigate("/");
    } catch (error) {
      console.log(error);

      if (isAxiosError(error)) {
        dispatch(
          updatePopupMessage(
            error?.response?.data?.error ||
              "Internal error. Refresh and try again"
          )
        );

        return;
      }

      dispatch(updatePopupMessage("Internal server error. Try again"));
    } finally {
      setPending(false);
    }
  };

  const updatePending = (choice: boolean) => {
    setPending(choice);
  };

  return (
    <div className="mt-25">
      <form onSubmit={handleSubmit(onSubmit)} className="form gap-3!">
        <h1 className="form-header">Login In to Service Exchange</h1>

        <div>
          <p className="input-label">Email</p>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter your email"
            className="input-text"
          />
        </div>
        <div>
          <p className="input-label">Password</p>
          <div className="relative">
            <input
              {...register("password", { required: true })}
              type={passwordVisibility ? "input" : "password"}
              placeholder="Enter your password"
              className="input-text"
            />
            <FontAwesomeIcon
              icon={passwordVisibility ? faEyeSlash : faEye}
              onClick={() => {
                setPasswordVisibility(!passwordVisibility);
              }}
              className="password-eye"
            />
          </div>
        </div>

        <button
          disabled={pending}
          className="h-10 bg-teal-500 text-white font-semibold flex items-center justify-center rounded-2xl"
        >
          {pending ? <Spinner isButton={true} /> : <p>Login</p>}
        </button>

        <GoogleLoginButton pending={pending} updatePending={updatePending} />

        <div className="text-teal-500 text-center font-semibold">
          <a href="/public/forgot-password">Forgot Password?</a>
        </div>

        <div className="text-teal-500 font-semibold flex justify-center items-center gap-2">
          <span>Don't have an account ?</span>{" "}
          <Link to="/public/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
