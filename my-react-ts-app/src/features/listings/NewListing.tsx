import Icon from "@mdi/react";
import { mdiSendOutline } from "@mdi/js";

function NewListing() {
  const inputStyles =
    " [&_input]:w-full [&_input]:py-1.5 [&_input]:px-3 [&_input]:mt-2 [&_input]:bg-neutral-100 [&_input]:border [&_input]:border-neutral-300 [&_input]:rounded-lg";
  const radioStyles = "w-fit! -translate-y-0.5";

  return (
    <div className="w-[60%] py-5 px-7 m-auto bg-neutral-50 border border-neutral-300 rounded-2xl">
      <h1 className="text-2xl text-center font-semibold mb-5">
        Post a New Listing
      </h1>
      <form
        className={"[&_h2]:font-semibold flex flex-col gap-5" + inputStyles}
      >
        <div>
          <h2>Listing Title</h2>
          <input type="text" placeholder="Music Theory Tutor" />
        </div>

        <div>
          <h2>Listing Type</h2>
          <div className="w-full pt-2 flex gap-5 [&>div]:flex [&>div]:items-center [&>div]:gap-1">
            <div>
              <input type="radio" className={radioStyles} />
              <p>Service Offer</p>
            </div>

            <div>
              <input type="radio" className={radioStyles} />
              <p>Service Needed</p>
            </div>
          </div>
        </div>

        <div>
          <h2>Description</h2>
          <textarea
            className="min-h-25 w-full py-2 px-3 mt-2 border border-neutral-300 rounded-lg"
            placeholder="Provide a detailed description of your need or offer"
          ></textarea>
        </div>

        <div>
          <h2>Skills/Tags (comma-separated)</h2>
          <input type="text" placeholder="Writing, Blogging, Marketing" />
        </div>

        <div>
          <button className="w-fit py-2.5 px-6 mt-5 bg-teal-500 text-white justify-self-center flex items-center gap-2 rounded-xl">
            <Icon path={mdiSendOutline} size={0.8} rotate={-45} />
            <h2>Post Listing</h2>
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewListing;
