import { useAppDispatch } from "@/hooks/reduxHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Spinner } from "@/components/Loader";
import { resetPassword } from "@/features/auth/api";
import { updateMessage } from "@/features/popups/messageSlice";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";

export interface formTypes {
  password1: string;
  password2: string;
}

const ResetPasswordPage = () => {
  const [pending, setpending] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { token } = useParams();
  const [passwordVisibility1, setPasswordVisibility1] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);

  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<formTypes>();

  const onSubmit = async (data: formTypes): Promise<void> => {
    const { password1, password2 } = data;

    if (password1 != password2) {
      dispatch(updateMessage("Passwords don't match"));
      return;
    }

    try {
      setpending(true);

      const response = await resetPassword(data.password1, token!);
      if (response.status === 200) {
        setIsDone(true);
      }
    } catch (error: unknown) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        dispatch(updateMessage("Invalid or Expired Token"));
      } else {
        dispatch(updateMessage("Internal Server Error. Refresh and try again"));
      }
    } finally {
      setpending(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="form w-120!" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-header">Reset Password</h1>

        <div>
          <label htmlFor="password" className="text-lg font-semibold">
            New Password
          </label>

          <div className="mt-2 relative">
            <input
              type={passwordVisibility1 ? "text" : "password"}
              {...register("password1", { required: true })}
              placeholder="Strong password"
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
        </div>

        <div>
          <label htmlFor="password" className="text-lg font-semibold">
            Confirm Password
          </label>

          <div className="mt-2 relative">
            <input
              type={passwordVisibility2 ? "text" : "password"}
              {...register("password2", { required: true })}
              placeholder="Confirm password"
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
        </div>

        {/* message after successful password reset */}
        {isDone ? (
          <div className="flex flex-col gap-3 items-center">
            <p className="font-semibold text-teal-500">
              Password reset successfully!
            </p>

            <Link
              to="/public/login"
              className="py-2 px-4 bg-teal-500 text-white rounded-xl"
            >
              Go Login Page
            </Link>
          </div>
        ) : <button
            type="submit"
            className="p-2.5 bg-teal-500 text-white font-semibold rounded-2xl"
          >
            {pending ? <Spinner isButton={true} /> : <p>Reset Password</p>}
          </button>}

  
      </form>
    </div>
  );
};

export default ResetPasswordPage;
