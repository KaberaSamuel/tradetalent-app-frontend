import { mdiSendOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useForm } from "react-hook-form";

import type { ListingTypes } from "@/App.types";
import FieldValidationError from "@/components/FormValidationError";
import { Spinner } from "@/components/Loader";
import { authSelector } from "@/features/auth/authSlice";
import { updatePopupMessage } from "@/features/popups/messageSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useState } from "react";
import { postListing } from "./api";

function NewListing() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelector);
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ListingTypes>();

  const onSubmit = async (data: ListingTypes) => {
    try {
      setPending(true);
      await postListing(auth.token.access, data);
      window.location.href = "/my-listings";
    } catch (error) {
      setPending(false);
      console.log(error);
      dispatch(
        updatePopupMessage("Failed to create listing. Refresh and try again")
      );
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-header mb-0!">Post a New Listing</h1>

        <div>
          <h2 className="input-label">Listing Title</h2>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Music Theory Tutor"
            className="input-text"
          />
        </div>

        {/* listing type & work mode */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-10 [&_p]:text-sm [&_p]:font-medium">
          <div>
            <h2 className="input-label mb-0!">Listing Type</h2>
            <div className="w-full pt-2 flex gap-3 [&>div]:flex [&>div]:items-center [&>div]:gap-1">
              <div>
                <input
                  type="radio"
                  value="offer"
                  {...register("type", { required: true })}
                />
                <p>Service Offer</p>
              </div>

              <div>
                <input
                  type="radio"
                  value="need"
                  {...register("type", { required: true })}
                />
                <p>Service Needed</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="input-label mb-0!">Work Mode</h2>
            <div className="w-full pt-2 flex gap-3 [&>div]:flex [&>div]:items-center [&>div]:gap-1">
              <div>
                <input
                  type="radio"
                  value="onsite"
                  {...register("work_mode", { required: true })}
                />
                <p>Onsite</p>
              </div>

              <div>
                <input
                  type="radio"
                  value="remote"
                  {...register("work_mode", { required: true })}
                />
                <p>Remote</p>
              </div>

              <div>
                <input
                  type="radio"
                  value="hybrid"
                  {...register("work_mode", { required: true })}
                />
                <p>Hybrid</p>
              </div>
            </div>
          </div>
        </div>

        {/* location */}
        <div>
          <h2 className="input-label">Location </h2>
          <input
            {...register("location", { required: true })}
            type="text"
            className="input-text"
            placeholder="Newyork, USA (or Global for all locations)"
          />
        </div>

        {/* description */}
        <div>
          <h2 className="input-label">Description</h2>
          <textarea
            {...register("description", {
              required: true,
              minLength: {
                value: 70,
                message: "This input needs atleast 70 characters",
              },
              maxLength: {
                value: 200,
                message: "Input has reached maximum limit of 200 characters",
              },
            })}
            className="input-text min-h-25"
            placeholder="Provide a detailed description of your need or offer"
          ></textarea>

          {errors.description && (
            <FieldValidationError
              message={
                getValues("description").length +
                  " Characters. " +
                  errors.description.message! || "This field is required"
              }
            />
          )}
        </div>

        {/* skills */}
        <div>
          <h2 className="input-label">Skills/Tags (comma-separated)</h2>
          <input
            {...register("skills", { required: true })}
            className="input-text"
            type="text"
            placeholder="Writing, Blogging, Marketing"
          />
        </div>

        {/* submit button */}
        <div>
          <button
            disabled={pending}
            type="submit"
            className="w-45 h-10 mt-5 bg-teal-500 text-white justify-self-center flex items-center justify-center gap-2 rounded-xl"
          >
            {pending ? (
              <Spinner isButton={true} />
            ) : (
              <>
                <Icon path={mdiSendOutline} size={0.8} rotate={-45} />
                <h2>Post Listing</h2>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default NewListing;
