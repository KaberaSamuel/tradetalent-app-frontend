interface Props {
  activeFilter: string;
  updateFilter: (filter: string) => void;
}

export default function FilterBar({ activeFilter, updateFilter }: Props) {
  const activeFilterStyle = "text-teal-500 bg-teal-100!";
  const itemStyle =
    " [&>*]:bg-neutral-200 [&>*]:py-1 sm:[&>*]:py-2 [&>*]:px-3 sm:[&>*]:px-5 [&>*]:rounded-2xl [&>*]:text-xs sm:[&>*]:text-sm [&>*]:whitespace-nowrap";

  return (
    <div className={"flex gap-2 sm:gap-3 flex-wrap" + itemStyle}>
      <p
        className={activeFilter === "all" ? activeFilterStyle : ""}
        onClick={() => {
          updateFilter("all");
        }}
      >
        All
      </p>
      <p
        className={activeFilter === "onsite" ? activeFilterStyle : ""}
        onClick={() => {
          updateFilter("onsite");
        }}
      >
        Onsite
      </p>
      <p
        className={activeFilter === "hybrid" ? activeFilterStyle : ""}
        onClick={() => {
          updateFilter("hybrid");
        }}
      >
        Hybrid
      </p>
      <p
        className={activeFilter === "remote" ? activeFilterStyle : ""}
        onClick={() => {
          updateFilter("remote");
        }}
      >
        Remote
      </p>
      <p
        className={activeFilter === "offers" ? activeFilterStyle : ""}
        onClick={() => {
          updateFilter("offers");
        }}
      >
        Offers
      </p>
      <p
        className={activeFilter === "needs" ? activeFilterStyle : ""}
        onClick={() => {
          updateFilter("needs");
        }}
      >
        Needs
      </p>
    </div>
  );
}
