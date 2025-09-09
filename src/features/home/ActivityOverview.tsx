import Icon from "@mdi/react";
import {
  mdiFormatListCheckbox,
  mdiMessageOutline,
  mdiEyeOutline,
} from "@mdi/js";

const ActivityOverview = () => {
  const cardsContainerStyles = "grid grid-cols-1 lg:grid-cols-2 gap-6 ";
  const cardStyles =
    "[&_.card]:h-50  [&_.card]:p-5 [&_.card]:bg-neutral-50 [&_.card]:flex [&_.card]:justify-between [&_.card]:border [&_.card]:border-neutral-300 [&_.card]:rounded-2xl ";
  const leftStyles =
    "[&_.left]:font-semibold [&_.left]:grid [&_.left]:grid-rows-2 ";
  const rightStyles =
    "[&_.right]:text-teal-500 [&_.right]:flex [&_.right]:flex-col [&_.right]:justify-between [&_.right]:items-end ";
  const numberStyles =
    "[&_.number]:text-3xl [&_.number]:transform [&_.number]:-translate-y-2";

  return (
    <div>
      <h1 className="text-xl font-semibold mb-7">Your Activity Overview</h1>

      {/* cards */}
      <div
        className={
          cardsContainerStyles +
          cardStyles +
          leftStyles +
          rightStyles +
          numberStyles
        }
      >
        {/* active listings */}
        <div className="card">
          <div className="left">
            <p>Active Listings</p>
            <p className="number">4</p>
          </div>

          <div className="right">
            <Icon path={mdiFormatListCheckbox} size={1} />
            <p>View My Listings</p>
          </div>
        </div>

        {/* new messages */}
        <div className="card">
          <div className="left">
            <p>New Messages</p>
            <p className="number">2</p>
          </div>

          <div className="right">
            <Icon path={mdiMessageOutline} size={1} />
            <p>Go to Messages</p>
          </div>
        </div>

        {/* profile views */}
        <div className="card">
          <div className="left">
            <p>Profile Views</p>
            <p className="number">18</p>
          </div>

          <div className="right">
            <Icon path={mdiEyeOutline} size={1} />
            <p>View Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityOverview;
