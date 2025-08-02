import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../hooks/AuthProvider";
import type { LoginFormTypes } from "../App.types";
import MessagesContainer from "./MessageContainer";

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [message, setMesssage] = useState("");

  const auth = useAuth();
  const { register, handleSubmit } = useForm<LoginFormTypes>();

  return (
    <div className="h-screen text-neutral-500 text-center flex justify-center items-center">
      <form
        onSubmit={handleSubmit(auth!.loginAction)}
        className="w-[560px] py-10 px-8 bg-neutral-50 flex flex-col gap-4 border border-neutral-200  rounded-2xl [&_p]:text-left [&_p]:text-black [&_p]:mb-2 [&_input]:w-full [&_input]:bg-neutral-100 [&_input]:border [&_input]:border-neutral-200 [&_input]:py-2 [&_input]:px-3 [&_input]:text-black [&_input]:placeholder-gray-500 [&_input]:rounded-xl"
      >
        <h1 className="text-black text-3xl font-semibold">
          Login In to TradeTalent
        </h1>

        <div>
          <p>Email</p>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <p>Password</p>
          <div className="relative">
            <input
              {...register("password", { required: true })}
              type={passwordVisibility ? "input" : "password"}
              placeholder="Enter your password"
            />
            <FontAwesomeIcon
              icon={passwordVisibility ? faEyeSlash : faEye}
              onClick={() => {
                setPasswordVisibility(!passwordVisibility);
              }}
              className="absolute right-1 top-1/2 transform -translate-1/2"
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

        <div className="text-teal-500 font-semibold">
          <a href="#">Forgot Password?</a>
        </div>

        <div className="text-teal-500 font-semibold flex justify-center items-center gap-2">
          <span>Don't have an account ?</span> <Link to="/signup">Sign Up</Link>
        </div>
      </form>

      <MessagesContainer message={message} setMessage={setMesssage} />
    </div>
  );
};

export default Login;
