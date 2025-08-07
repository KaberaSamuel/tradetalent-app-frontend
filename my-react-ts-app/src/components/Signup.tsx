import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import type { SignupFormTypes } from "../App.types";
import { registerUser } from "../api";
import { updateMessage } from "../features/messages/messageSlice";

const Signup = () => {
  const [passwordVisibility1, setPasswordVisibility1] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<SignupFormTypes>();

  const onSubmit = async (data: SignupFormTypes): Promise<void> => {
    try {
      const { password1, password2 } = data;
      if (password1 !== password2) {
        dispatch(updateMessage("Passwords don't match"));
        return;
      }

      const response = await registerUser(data);
      if (response.status == 201) {
        navigate("/login");
      } else {
        dispatch(updateMessage("Failed to register, try again"));
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        dispatch(
          updateMessage(
            errorData.username || errorData.email || "Validation error"
          )
        );
      } else {
        dispatch(updateMessage("Internal Server Error. Refresh and try again"));
      }
    }
  };

  return (
    <div className="h-screen text-neutral-500 text-center flex justify-center items-center">
      <form
        className="w-[580px] p-8 bg-neutral-50 flex flex-col gap-4 border border-neutral-200  rounded-2xl [&>*]:w-full [&_input]:w-full [&_input]:bg-neutral-100 [&_input]:border [&_input]:border-neutral-200 [&_input]:py-2 [&_input]:px-3 [&_input]:text-black [&_input]:placeholder-gray-500 [&_input]:rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-black text-3xl font-semibold">
          Join Our Community!
        </h1>
        <p>Create your account to start trading your talents.</p>

        <input
          {...register("fullname", { required: true })}
          placeholder="Your names"
        />

        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
        />

        <div className="relative">
          <input
            type={passwordVisibility1 ? "input" : "password"}
            {...register("password1", { required: true })}
            placeholder="Password"
          />

          <FontAwesomeIcon
            icon={passwordVisibility1 ? faEyeSlash : faEye}
            onClick={() => {
              setPasswordVisibility1(!passwordVisibility1);
            }}
            className="absolute right-1 top-1/2 transform -translate-1/2"
          />
        </div>

        <div className="relative">
          <input
            type={passwordVisibility2 ? "input" : "password"}
            {...register("password2", { required: true })}
            placeholder="Confirm Password"
          />

          <FontAwesomeIcon
            icon={passwordVisibility2 ? faEyeSlash : faEye}
            onClick={() => {
              setPasswordVisibility2(!passwordVisibility2);
            }}
            className="absolute right-1 top-1/2 transform -translate-1/2"
          />
        </div>

        <button
          type="submit"
          className="p-2.5 bg-teal-500 text-white font-semibold rounded-2xl"
        >
          Sign Up
        </button>
        <button className="p-2.5 bg-white text-black rounded-2xl font-semibold flex justify-center items-center gap-1 border border-neutral-200">
          <FontAwesomeIcon icon={faChrome} />
          <p>Sign Up with Google</p>
        </button>

        <div className="mt-2 flex justify-center items-center gap-2">
          <p>Already have an account ?</p>{" "}
          <Link to="/login" className="text-teal-500 font-semibold">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
