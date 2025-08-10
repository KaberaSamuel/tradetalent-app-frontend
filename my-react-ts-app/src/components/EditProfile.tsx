import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Icon from "@mdi/react";
import { mdiTrayArrowUp } from "@mdi/js";
import { useAppSelector } from "../hooks/reduxHooks";
import { authSelector } from "../features/auth/authSlice";

interface handleImageUploadType {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

const ProfileImageUpload = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleImageUpload: handleImageUploadType = (e) => {
    if (e.target.files) {
      const fileUrl = e.target.files[0];
      setFileUrl(URL.createObjectURL(fileUrl));
    }
  };

  const auth = useAppSelector(authSelector);
  const usernameShortned =
    auth.user.first_name.charAt(0) + auth.user.last_name.charAt(0);

  // function to trigger input click event on input
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  };

  return (
    <>
      <form>
        <div className="flex gap-7 items-center">
          {fileUrl ? (
            <img src={fileUrl} className="w-25 h-25 rounded-full" />
          ) : (
            <div className="w-25 h-25 bg-neutral-200 text-neutral-500 rounded-full flex justify-center items-center text-3xl">
              {usernameShortned}
            </div>
          )}

          <button
            onClick={handleButtonClick}
            className="py-2 px-3 flex gap-2 items-center border border-neutral-300 rounded-xl"
          >
            <Icon path={mdiTrayArrowUp} size={0.9} />
            <span>Upload New Photo</span>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageUpload}
            hidden
          />
        </div>
      </form>
    </>
  );
};

function EditProfile() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async () => {};

  return (
    <div className="py-3 flex flex-col gap-10">
      <h1 className="text-lg font-semibold">Edit Profile</h1>

      <ProfileImageUpload />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-3 flex flex-col gap-8 [&_p]:font-semibold [&_input,&_textarea]:w-[100%] [&_input,&_textarea]:py-2 [&_input,&_textarea]:px-3 [&_input,&_textarea]:mt-3 [&_input,&_textarea]:bg-neutral-100 [&_input,&_textarea]:border [&_input,&_textarea]:border-neutral-300 [&_input,&_textarea]:rounded-lg"
      >
        <div>
          <p>Name</p>
          <input
            {...register("names", { required: true })}
            type="text"
            placeholder="Your names"
          />
        </div>

        <div>
          <p>Location</p>
          <input
            {...register("location", { required: true })}
            type="text"
            placeholder="New York, USA"
          />
        </div>

        <div>
          <p>About Me</p>
          <textarea
            {...register("description", { required: true })}
            placeholder="Tell us about yourself"
            className="min-h-20"
          ></textarea>
        </div>

        <div>
          <p>Skills Offered (comma-separated)</p>
          <input
            {...register("servicesOffered", { required: true })}
            type="text"
            placeholder="Web development, Photography,..."
          />
        </div>

        <div>
          <p>Skills Needed (comma-separated)</p>
          <input
            {...register("servicesNeeded", { required: true })}
            type="text"
            placeholder="French Coaching, Novel Writer,..."
          />
        </div>

        <div className="mt-5 flex justify-end gap-5 [&_button]:py-2 [&_button]:px-5 [&_button]:rounded-xl">
          <button type="button" className="bg-neutral-200 text-neutral-500">
            Cancel
          </button>
          <button type="submit" className="bg-teal-400 text-white">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
