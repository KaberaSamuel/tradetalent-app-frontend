import { loginByGoogle } from "@/features/auth/api";
import { updateTokens, updateUser } from "@/features/auth/authSlice";
import { updatePopupMessage } from "@/features/popups/messageSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  pending: boolean;
  updatePending: (choice: boolean) => void;
}

export default function GoogleLoginButton({ pending, updatePending }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const googleLoginRef = useRef<HTMLDivElement>(null);

  // handle success login
  const handleGoogleSuccess = async (response: CredentialResponse) => {
    try {
      updatePending(true);

      if (response.credential) {
        // Send the JWT credential to backend
        const apiResponse = await loginByGoogle(response.credential);
        const { user, tokens } = apiResponse.data;

        if (user && tokens) {
          // Update Redux store
          dispatch(updateUser(user));
          dispatch(updateTokens(tokens));

          // Update localStorage
          localStorage.setItem("access", tokens.access);
          localStorage.setItem("refresh", tokens.refresh);

          navigate("/");
          return;
        }
      }

      dispatch(updatePopupMessage("Google login failed: No credential received."));
    } catch (error) {
      console.log(error);
      dispatch(updatePopupMessage("Google login failed, try another way"));
    } finally {
      updatePending(false);
    }
  };

  // handle failed login by google
  const handleGoogleError = () => {
    dispatch(updatePopupMessage("Google login failed, try another way"));
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
    <div>
      {/* Custom button that triggers Google Login */}
      <button
        type="button"
        onClick={triggerGoogleLogin}
        disabled={pending}
        className="w-full p-2 bg-white text-black rounded-2xl font-semibold flex justify-center items-center gap-2 border border-neutral-200"
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
    </div>
  );
}
