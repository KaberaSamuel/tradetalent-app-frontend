import { faChrome } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import type { UserTypes } from "@/App.types";
import { Spinner } from "@/components/Loader";
import { loginByGoogle, loginUser } from "@/features/auth/api";
import { updateTokens, updateUser } from "@/features/auth/authSlice";
import { updateMessage } from "@/features/popups/messageSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

export interface LoginFormTypes {
  email: string;
  password: string;
  token?: string;
}

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [pending, setPending] = useState(false);
  const googleLoginRef = useRef<HTMLDivElement>(null);

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

  // handle success login by google
  const handleGoogleSuccess = async (response: CredentialResponse) => {
    try {
      setPending(true);

      if (!response.credential) {
        dispatch(updateMessage("Google login failed: No credential received."));
        return;
      }

      // Send the JWT credential to your backend
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
    } finally {
      setPending(false);
    }
  };

  // handle failed login by google
  const handleGoogleError = () => {
    dispatch(updateMessage("Google login failed, try another way"));
  };

  // Trigger hidden Google Login button
  const triggerGoogleLogin = () => {
    const googleButton = googleLoginRef.current?.querySelector(
      'div[role="button"]'
    ) as HTMLElement;
    if (googleButton) {
      googleButton.click();
    }
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
              type={passwordVisibility ? "text" : "password"}
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
          type="submit"
          disabled={pending}
          className="h-10 bg-teal-500 text-white font-semibold flex items-center justify-center rounded-2xl"
        >
          {pending ? <Spinner isButton={true} /> : <p>Login</p>}
        </button>

        {/* Custom styled button that triggers Google Login */}
        <button
          type="button"
          onClick={triggerGoogleLogin}
          disabled={pending}
          className="p-2 bg-white text-black rounded-2xl font-semibold flex justify-center items-center gap-1 border border-neutral-200"
        >
          <FontAwesomeIcon icon={faChrome} />
          <span>Continue with Google</span>
        </button>

        {/* Hidden GoogleLogin component */}
        <div ref={googleLoginRef} className="hidden">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
          />
        </div>

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
