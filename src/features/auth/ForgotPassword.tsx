import { useAppDispatch } from "@/hooks/reduxHooks";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Spinner } from "@/components/Loader";
import { requestPasswordResetLink } from "@/features/auth/api";
import { updateMessage } from "@/features/popups/messageSlice";
import axios from "axios";

export interface formTypes {
  email: string;
}

const ForgotPasswordPage = () => {
  const [pending, setpending] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<formTypes>();

  const onSubmit = async (data: formTypes): Promise<void> => {
    try {
      setpending(true);

      const response = await requestPasswordResetLink(data.email);
      if (response.status === 200) {
        setMessage("Password reset link was sent to you, check your email!");
      }
    } catch (error: unknown) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        // when email is invalid
        if (error.response?.status === 404) {
          dispatch(updateMessage("No user with that email"));
        }
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
        <h1 className="form-header">Request Password Reset Link </h1>

        <div>
          <label htmlFor="email" className="text-lg font-semibold">
            Enter email, you used when signing up
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Your email"
            className="input-text mt-3"
          />
        </div>

        {message && (
          <p className="font-semibold text-teal-500 text">{message}</p>
        )}

        {!message && (
          <button
            type="submit"
            className="p-2.5 bg-teal-500 text-white font-semibold rounded-2xl"
          >
            {pending ? (
              <Spinner isButton={true} />
            ) : (
              <p>Request Password Reset</p>
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
