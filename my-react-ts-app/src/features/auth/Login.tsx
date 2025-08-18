import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateTokens, updateUser } from "./authSlice";
import { updateMessage } from "../popups/messageSlice";
import { loginUser } from "./api";

export interface LoginFormTypes {
  email: string;
  password: string;
  token?: string;
}

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<LoginFormTypes>();

  const onSubmit = async (data: LoginFormTypes): Promise<void> => {
    try {
      const response = await loginUser(data);
      const { user, tokens } = response.data;

      // Update Redux store
      dispatch(updateUser(user));
      dispatch(updateTokens(tokens));

      // Update localStorage
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      // Redirect to home page with a refresh
      window.location.href = "/";
    } catch (error: any) {
      console.log(error);
      dispatch(
        updateMessage(
          error.response?.data?.error || "Internal error. Refresh and try again"
        )
      );
    }
  };

  return (
    <div className="h-screen flex items-center">
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
        <button className="p-2 bg-teal-500 text-white font-semibold rounded-2xl">
          Log In
        </button>
        <button className="p-2 bg-white text-black rounded-2xl font-semibold flex justify-center items-center gap-1 border border-neutral-200">
          <FontAwesomeIcon icon={faChrome} />
          <span>Log In with Google</span>
        </button>

        <div className="text-teal-500 text-center font-semibold">
          <a href="#">Forgot Password?</a>
        </div>

        <div className="text-teal-500 font-semibold flex justify-center items-center gap-2">
          <span>Don't have an account ?</span> <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
