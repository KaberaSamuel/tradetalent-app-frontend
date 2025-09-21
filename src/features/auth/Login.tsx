import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import type { UserTypes } from "@/App.types";
import { Spinner } from "@/components/Loader";
import { loginByGoogle, loginUser } from "@/features/auth/api";
import { updateTokens, updateUser } from "@/features/auth/authSlice";
import { updateMessage } from "@/features/popups/messageSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import type { CredentialResponse } from "@react-oauth/google";

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

  // update state and redirect to homepage after successful login
  const onSuccessLogin = (
    user: UserTypes,
    tokens: { access: string; refresh: string }
  ) => {
    // Update Redux store
    dispatch(updateUser(user));
    dispatch(updateTokens(tokens));

    // Update localStorage
    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);

    navigate("/");
  };

  // handle login by email/password
  const onSubmit = async (data: LoginFormTypes): Promise<void> => {
    try {
      setPending(true);
      const response = await loginUser(data);
      const { user, tokens } = response.data;

      if (user && tokens) {
        onSuccessLogin(user, tokens);
      }
    } catch (error: any) {
      console.log(error);
      dispatch(
        updateMessage(
          error.response?.data?.error || "Internal error. Refresh and try again"
        )
      );
    } finally {
      setPending(false);
    }
  };

  // handle login by google
  const handleSuccess = async (response: CredentialResponse) => {
    try {
      if (!response.credential) {
        dispatch(updateMessage("Google login failed: No credential received."));
        return;
      }
      const apiResponse = await loginByGoogle(response.credential);
      const { user, tokens } = apiResponse.data;

      if (user && tokens) {
        onSuccessLogin(user, tokens);
        return;
      }

      dispatch(updateMessage("Google login failed, try another way"));
    } catch (error) {
      console.log(error);
      dispatch(updateMessage("Google login failed, try another way"));
    }
  };

  // handle failed login by google
  const handleError = () => {
    dispatch(updateMessage("Google login failed, try another way"));
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

        <button className="h-10 bg-teal-500 text-white font-semibold flex items-center justify-center rounded-2xl">
          {pending ? <Spinner isButton={true} /> : <p>Login</p>}
        </button>

        <button type="button">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </button>

        <div className="text-teal-500 text-center font-semibold">
          <a href="#">Forgot Password?</a>
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
