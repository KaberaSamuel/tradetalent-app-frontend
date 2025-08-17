import Icon from "@mdi/react";
import { mdiSendOutline } from "@mdi/js";

function NewListing() {
  return (
    <>
      <form className="form">
        <h1 className="form-header mb-0!">Post a New Listing</h1>

        <div>
          <h2 className="input-label">Listing Title</h2>
          <input
            type="text"
            placeholder="Music Theory Tutor"
            className="input-text"
          />
        </div>

        <div>
          <h2 className="input-label mb-0!">Listing Type</h2>
          <div className="w-full pt-2 flex gap-5 [&>div]:flex [&>div]:items-center [&>div]:gap-1">
            <div>
              <input type="radio" />
              <p>Service Offer</p>
            </div>

            <div>
              <input type="radio" />
              <p>Service Needed</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="input-label">Description</h2>
          <textarea
            className="input-text min-h-25"
            placeholder="Provide a detailed description of your need or offer"
          ></textarea>
        </div>

        <div>
          <h2 className="input-label">Skills/Tags (comma-separated)</h2>
          <input
            className="input-text"
            type="text"
            placeholder="Writing, Blogging, Marketing"
          />
        </div>

        <div>
          <button className="w-fit py-2.5 px-6 mt-5 bg-teal-500 text-white justify-self-center flex items-center gap-2 rounded-xl">
            <Icon path={mdiSendOutline} size={0.8} rotate={-45} />
            <h2>Post Listing</h2>
          </button>
        </div>
      </form>
    </>
  );
}

export default NewListing;
