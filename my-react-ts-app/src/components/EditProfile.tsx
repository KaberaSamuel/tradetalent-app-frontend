import React from "react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Icon from "@mdi/react";
import { mdiTrayArrowUp } from "@mdi/js";
import { useAppSelector } from "../hooks/reduxHooks";
import { authSelector } from "../features/auth/authSlice";
import { editUser } from "../features/auth/api";

export interface EditFormTypes {
  name: string;
  email: string;
  location: string;
  about: string;
  services_offered: string;
  services_needed: string;
  image_url?: File | null;
}

interface ProfileImageProps {
  updateFile: (file: File) => void;
}

interface HandleImageUploadType {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

const ProfileImageUpload = ({ updateFile }: ProfileImageProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleImageUpload: HandleImageUploadType = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileUrl(URL.createObjectURL(file));
      updateFile(file);
    }
  };

  const auth = useAppSelector(authSelector);
  const usernameShortened =
    auth.user.first_name.charAt(0) + auth.user.last_name.charAt(0);

  // function to trigger input click event on file input
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  };

  return (
    <form>
      <div className="flex gap-7 items-center">
        {fileUrl ? (
          <img src={fileUrl} alt="Profile" className="w-25 h-25 rounded-full" />
        ) : (
          <div className="w-25 h-25 bg-neutral-200 text-neutral-500 rounded-full flex justify-center items-center text-3xl">
            {usernameShortened}
          </div>
        )}

        <button
          onClick={handleButtonClick}
          type="button"
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
  );
};

function EditProfile() {
  const auth = useAppSelector(authSelector);
  const [file, setFile] = useState<File | null>(null);
  const { register, handleSubmit } = useForm<EditFormTypes>();

  const updateFile = (file: File) => {
    setFile(file);
  };

  const onSubmit = async (data: EditFormTypes) => {
    try {
      data.image_url = file;
      data.email = auth.user.email;
      const response = await editUser(auth.token.access, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-3 flex flex-col gap-10">
      <h1 className="text-lg font-semibold">Edit Profile</h1>

      <ProfileImageUpload updateFile={updateFile} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-3 flex flex-col gap-8 [&_p]:font-semibold [&_input,&_textarea]:w-[100%] [&_input,&_textarea]:py-2 [&_input,&_textarea]:px-3 [&_input,&_textarea]:mt-3 [&_input,&_textarea]:bg-neutral-100 [&_input,&_textarea]:border [&_input,&_textarea]:border-neutral-300 [&_input,&_textarea]:rounded-lg"
      >
        <div>
          <p>Name</p>
          <input
            {...register("name", { required: true })}
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
            {...register("about", { required: true })}
            placeholder="Tell us about yourself"
            className="min-h-20"
          ></textarea>
        </div>

        <div>
          <p>Services Offered (comma-separated)</p>
          <input
            {...register("services_offered", { required: true })}
            type="text"
            placeholder="Web development, Photography,..."
          />
        </div>

        <div>
          <p>Services Needed (comma-separated)</p>
          <input
            {...register("services_needed", { required: true })}
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
