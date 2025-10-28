import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { authSelector, updateUser } from "@/features/auth/authSlice";
import { updatePopupMessage } from "@/features/popups/messageSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useQueryClient } from "@tanstack/react-query";

import FieldValidationError from "@/components/FormValidationError";
import { Spinner } from "@/components/Loader";
import { editUser } from "@/features/auth/api";
import ProfileImageUpload from "@/features/profile/ImageUpload";

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
  const queryClient = useQueryClient();

  const inputStyles =
    " [&_input,&_textarea]:py-2 [&_input,&_textarea]:px-3 [&_input,&_textarea]:mt-3 [&_input,&_textarea]:bg-neutral-100 [&_input,&_textarea]:border [&_input,&_textarea]:border-neutral-300 [&_input,&_textarea]:rounded-lg";

  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);

  const defaultData = useMemo(() => {
    return { ...auth.user };
  }, [auth.user]);

  // removing computed fields
  delete defaultData.profile_image;
  delete defaultData.first_name;
  delete defaultData.name_initials;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditFormTypes>({
    defaultValues: defaultData,
  });

  const updateFile = (file: File) => {
    setFile(file);
  };

  const onSubmit = async (data: EditFormTypes) => {
    try {
      setPending(true);
      const updatedUserData = {
        ...data,
        uploaded_image: file,
      };

      const response = await editUser(auth.token.access, updatedUserData);
      dispatch(updateUser(response.data.user));

      // Reset user profile query to trigger a refetch for updated user data
      queryClient.resetQueries({
        queryKey: ["user-data"],
      });

      navigate("/profile");
    } catch (error) {
      console.log(error);
      dispatch(updatePopupMessage("Failed to update user. Refresh and try again"));
    } finally {
      setPending(false);
    }
  };

  // Effect to populate fields with default data
  useEffect(() => {
    reset(defaultData);
  }, [reset, defaultData]);

  return (
    <div className="py-3 flex flex-col gap-10">
      <h1 className="text-lg font-semibold">Edit Profile</h1>

      <ProfileImageUpload updateFile={updateFile} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          "mt-3 text-sm sm:text-base flex flex-col gap-8 [&_p]:font-semibold [&_input,&_textarea]:w-[100%] " +
          inputStyles
        }
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
            {...register("about", {
              maxLength: {
                value: 250,
                message: "Input has reached maximum limit of 250 characters",
              },
            })}
            placeholder="Tell us about yourself"
            className="min-h-20"
          ></textarea>

          {errors.about && (
            <FieldValidationError message={errors.about.message!} />
          )}
        </div>

        <div>
          <p>Services Offered (comma-separated)</p>
          <input
            {...register("services_offered", {
              maxLength: {
                value: 150,
                message: "Input has reached maximum limit of 150 characters",
              },
            })}
            type="text"
            placeholder="Web development, Photography,..."
          />
          {errors.services_offered && (
            <FieldValidationError message={errors.services_offered.message!} />
          )}
        </div>

        <div>
          <p>Services Needed (comma-separated)</p>
          <input
            {...register("services_needed", {
              maxLength: {
                value: 150,
                message: "Input has reached maximum limit of 150 characters",
              },
            })}
            type="text"
            placeholder="French Coaching, Novel Writer,..."
          />

          {errors.services_needed && (
            <FieldValidationError message={errors.services_needed.message!} />
          )}
        </div>

        <div className="mt-5 flex justify-end gap-5 [&_button]:min-w-30 [&_button]:py-2 [&_button]:px-5 [&_button]:rounded-xl">
          <button
            type="button"
            onClick={() => {
              navigate("/profile");
            }}
            className="bg-neutral-200 text-neutral-500"
          >
            Cancel
          </button>
          <button
            disabled={pending}
            type="submit"
            className="bg-teal-400 text-white"
          >
            {pending ? <Spinner isButton={true} /> : <p>Save Changes</p>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
