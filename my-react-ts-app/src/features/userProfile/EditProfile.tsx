import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { authSelector, updateUser } from "../auth/authSlice";
import { updateMessage } from "../popups/messageSlicePopUp";
import { editUser } from "../auth/api";
import ProfileImageUpload from "./ProfileImageUpload";

export interface EditFormTypes {
  name: string;
  email: string;
  location: string;
  about: string;
  services_offered: string;
  services_needed: string;
  uploaded_image: File | null;
}

function EditProfile() {
  const auth = useAppSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | null>(null);
  const defaultData = { ...auth.user };

  // removing computed fields
  delete defaultData.profile_image;
  delete defaultData.first_name;
  delete defaultData.name_initials;

  const { register, handleSubmit, reset, setValue } = useForm<EditFormTypes>({
    defaultValues: defaultData,
  });

  const updateFile = (file: File) => {
    setFile(file);
    setValue("uploaded_image", file);
  };

  const onSubmit = async (data: EditFormTypes) => {
    try {
      const updatedUserData = {
        ...data,
        uploaded_image: file,
      };

      const response = await editUser(auth.token.access, updatedUserData);

      dispatch(updateUser(response.data.user));

      navigate("/profile");
    } catch (error) {
      ("/profile");
      console.log(error);
      dispatch(updateMessage("Failed to update user. Refresh and try again"));
    }
  };

  useEffect(() => {
    reset(defaultData);
  }, [auth.user]);

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
          <input {...register("name")} type="text" placeholder="Your names" />
        </div>

        <div>
          <p>Location</p>
          <input
            {...register("location")}
            type="text"
            placeholder="New York, USA"
          />
        </div>

        <div>
          <p>About Me</p>
          <textarea
            {...register("about")}
            placeholder="Tell us about yourself"
            className="min-h-20"
          ></textarea>
        </div>

        <div>
          <p>Services Offered (comma-separated)</p>
          <input
            {...register("services_offered")}
            type="text"
            placeholder="Web development, Photography,..."
          />
        </div>

        <div>
          <p>Services Needed (comma-separated)</p>
          <input
            {...register("services_needed")}
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
