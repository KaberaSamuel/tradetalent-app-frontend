export default function FilterBar() {
  const activeFilterStyle = "text-teal-500 bg-teal-100!";
  return (
    <div className="flex gap-3 [&>*]:bg-neutral-200 [&>*]:py-2 [&>*]:px-5 [&>*]:rounded-2xl [&>*]:text-sm">
      <p className={activeFilterStyle}>All Listings</p>
      <p>Onsite</p>
      <p>Remote</p>
      <p>Offers</p>
      <p>Needs</p>
    </div>
  );
}
