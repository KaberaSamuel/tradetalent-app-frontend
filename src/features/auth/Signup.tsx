import { useAppDispatch } from "@/hooks/reduxHooks";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Spinner } from "@/components/Loader";
import { registerUser } from "@/features/auth/api";
import { updateMessage } from "@/features/popups/messageSlice";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GoogleLoginButton from "./GoogleLoginButton";

export interface SignupFormTypes {
  name: string;
  email: string;
  password: string;
  password2?: string;
}

const Signup = () => {
  const [pending, setpending] = useState(false);
  const [passwordVisibility1, setPasswordVisibility1] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<SignupFormTypes>();

  const onSubmit = async (data: SignupFormTypes): Promise<void> => {
    try {
      setpending(true);
      const { password, password2 } = data;
      if (password !== password2) {
        dispatch(updateMessage("Passwords don't match"));
        return;
      }

      // remove password2 on data object
      delete data.password2;

      const response = await registerUser(data);
      if (response.status === 201) {
        navigate("/public/login");
      } else {
        dispatch(updateMessage("Server error, try again"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          const errorData = error.response.data;
          dispatch(
            updateMessage(
              errorData.username || errorData.email || "Validation error"
            )
          );
        }
      } else {
        dispatch(updateMessage("Internal Server Error. Refresh and try again"));
      }
    } finally {
      setpending(false);
    }
  };

  const updatePending = (choice: boolean) => {
    setpending(choice);
  };

  return (
    <div className="mt-25">
      <form className="form gap-3!" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-header">Join Our Community!</h1>

        <input
          {...register("name", { required: true })}
          placeholder="Your names"
          className="input-text"
        />

        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="input-text"
        />

        <div className="relative">
          <input
            type={passwordVisibility1 ? "input" : "password"}
            {...register("password", { required: true })}
            placeholder="Password"
            className="input-text"
          />

          <FontAwesomeIcon
            icon={passwordVisibility1 ? faEyeSlash : faEye}
            onClick={() => {
              setPasswordVisibility1(!passwordVisibility1);
            }}
            className="password-eye"
          />
        </div>

        <div className="relative">
          <input
            type={passwordVisibility2 ? "input" : "password"}
            {...register("password2", { required: true })}
            placeholder="Confirm Password"
            className="input-text"
          />

          <FontAwesomeIcon
            icon={passwordVisibility2 ? faEyeSlash : faEye}
            onClick={() => {
              setPasswordVisibility2(!passwordVisibility2);
            }}
            className="password-eye"
          />
        </div>

        <button
          type="submit"
          className="p-2.5 bg-teal-500 text-white font-semibold rounded-2xl"
        >
          {pending ? <Spinner isButton={true} /> : <p>Signup</p>}
        </button>

        <GoogleLoginButton pending={pending} updatePending={updatePending} />

        <div className="mt-2 flex justify-center items-center gap-2">
          <p>Already have an account ?</p>{" "}
          <Link to="/public/login" className="text-teal-500 font-semibold">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
