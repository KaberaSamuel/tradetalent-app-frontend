import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Signup = () => {
  const [passwordVisibility1, setPasswordVisibility1] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);

  return (
    <div className="h-screen text-neutral-500 text-center flex justify-center items-center">
      <form className="w-[600px] py-10 px-8 bg-neutral-50 flex flex-col gap-4 border border-neutral-200  rounded-2xl [&>*]:w-full [&_input]:w-full [&_input]:bg-neutral-100 [&_input]:border [&_input]:border-neutral-200 [&_input]:py-2.5 [&_input]:px-3 [&_input]:text-black [&_input]:placeholder-gray-500 [&_input]:rounded-xl">
        <h1 className="text-black text-3xl font-semibold">
          Join Our Community!
        </h1>
        <p>Create your account to start trading your talents.</p>
        <input className="min-w-[220px]" type="email" placeholder="Email" />

        <div className="relative">
          <input
            type={passwordVisibility1 ? "input" : "password"}
            placeholder="Enter your password"
          />
          <FontAwesomeIcon
            icon={passwordVisibility1 ? faEye : faEyeSlash}
            onClick={() => {
              setPasswordVisibility1(!passwordVisibility1);
            }}
            className="absolute right-1 top-1/2 transform -translate-1/2"
          />
        </div>

        <div className="relative">
          <input
            type={passwordVisibility2 ? "input" : "password"}
            placeholder="Confirm password"
          />
          <FontAwesomeIcon
            icon={passwordVisibility2 ? faEye : faEyeSlash}
            onClick={() => {
              setPasswordVisibility2(!passwordVisibility2);
            }}
            className="absolute right-1 top-1/2 transform -translate-1/2"
          />
        </div>

        <button className="p-2.5 bg-teal-500 text-white font-semibold rounded-2xl">
          Sign Up
        </button>
        <button className="p-2.5 bg-white text-black rounded-2xl font-semibold flex justify-center items-center gap-1 border border-neutral-200">
          <FontAwesomeIcon icon={faChrome} />
          <p>Sign Up with Google</p>
        </button>

        <div className="mt-5 flex justify-center items-center gap-2">
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
