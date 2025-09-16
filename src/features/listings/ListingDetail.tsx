import { Spinner } from "@/components/Loader";
import TagItems from "@/components/TagItems";
import { authSelector } from "@/features/auth/authSlice";
import DeleteListing from "@/features/modals/DeleteListing";
import ProfileImage from "@/features/profile/ProfileImage";
import { useAppSelector } from "@/hooks/reduxHooks";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  mdiArrowLeft,
  mdiCalendarRangeOutline,
  mdiDeleteOutline,
  mdiMapMarkerOutline,
  mdiMessageOutline,
  mdiPencilOutline,
  mdiTagOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchListingDetail } from "./api";

export default function ListingDetail() {
  const [isDelete, setIsDelete] = useState(false);
  const { listing_slug } = useParams();
  const auth = useAppSelector(authSelector);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const updateDeleteStatus = (isDelete: boolean) => {
    setIsDelete(isDelete);
  };

  const { data: listing, isLoading } = useQuery({
    queryKey: [listing_slug],
    queryFn: () => fetchListingDetail(auth.token.access, listing_slug!),
  });

  const iconSize = 0.8;
  const buttonStyles =
    "w-fit py-2 px-4 text-sm sm:text-base text-white flex gap-2 items-center rounded-xl";

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full -translate-y-5 flex flex-col gap">
        <Spinner />
      </div>
    );
  }

  if (listing) {
    const isOwner = listing.user.email == auth.user.email;
    const tagItemsStyes = " [&>*]:flex [&>*]:gap-1 [&>*]:items-center";
    const headerStyles = "sm:text-lg font-semibold mb-4";

    const footerButton = isOwner ? (
      <div className="flex gap-3">
        <Link
          to={"/listings/" + listing.slug + "/edit"}
          className={buttonStyles + " bg-teal-500"}
        >
          <Icon path={mdiPencilOutline} size={iconSize} />
          <p>Edit Listing</p>
        </Link>

        <button
          onClick={() => {
            updateDeleteStatus(true);
          }}
          className={buttonStyles + " bg-red-500"}
        >
          <Icon path={mdiDeleteOutline} size={iconSize} />
          <p>Delete Listing</p>
        </button>
      </div>
    ) : (
      <div>
        <Link to="#" className={buttonStyles + " bg-teal-500"}>
          <Icon path={mdiMessageOutline} size={iconSize} />
          <p>Message {listing.user.first_name}</p>
        </Link>
      </div>
    );

    return (
      <div className="flex flex-col gap-5 sm:gap-7">
        <div onClick={goBack} className="text-gray-500 flex gap-2 items-center">
          <Icon path={mdiArrowLeft} size={iconSize} />
          <p>Back to Listings</p>
        </div>

        {/* title */}
        <div>
          <h1 className="capitalize text-lg sm:text-xl font-bold mb-3">
            {listing.type}: {listing.title}
          </h1>

          {/* tags */}
          <div
            className={
              "text-sm sm:text-base text-gray-500 capitalize  flex flex-wrap gap-2 sm:gap-5 " +
              tagItemsStyes
            }
          >
            <div>
              <Icon path={mdiTagOutline} size={iconSize} />
              <p>{listing.type}</p>
            </div>

            <div>
              <Icon path={mdiCalendarRangeOutline} size={iconSize} />
              <p>posted {listing.delta_time}</p>
            </div>

            <div>
              <Icon path={mdiMapMarkerOutline} size={iconSize} />
              <p>{listing.location}</p>
            </div>
          </div>
        </div>

        {/* description */}
        <div>
          <h2 className={headerStyles}>Description</h2>
          <p className="text-sm sm:text-base">{listing.description}</p>
        </div>

        {/* skills */}
        <div>
          <TagItems
            items={listing.skills.split(",")}
            fallback="No specified skills yet!"
          />
        </div>

        {/* poster */}
        <div>
          <h2 className={headerStyles}>About the poster</h2>

          <div className="py-3 px-4 bg-neutral-100 flex gap-4 items-center border border-neutral-300 rounded-xl mt-5">
            <ProfileImage
              size={isMobile ? 15 : 17}
              isSmall={false}
              user={listing.user}
              text=" text-2xl"
            />
            <div className="text-sm sm:text-base">
              <p className="capitalize font-semibold">{listing.user.name}</p>
              <p className="text-gray-500">
                {listing.user.location || "No location yet!"}
              </p>
              {isOwner ? (
                <p className="w-fit py-1 px-3  bg-teal-500 text-xs text-white rounded-xl mt-1">
                  You
                </p>
              ) : (
                <Link
                  to={"/users/" + listing.user.slug}
                  className="text-teal-500"
                >
                  View Profile
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* footer */}
        {footerButton}

        {/* delete modal */}
        <AnimatePresence>
          {isDelete && (
            <DeleteListing
              updateDeleteStatus={updateDeleteStatus}
              listing={listing}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div>
      <p>Error fetching listing details try again</p>
    </div>
  );
}
