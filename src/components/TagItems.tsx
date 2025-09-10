const TagItems = ({
  items,
  fallback,
}: {
  items: string[];
  fallback: string;
}) => {
  const validatedArray = items.filter((item) => item != "");

  if (validatedArray.length > 0) {
    return (
      <div className="flex flex-wrap gap-3">
        {validatedArray.map((item) => (
          <p
            key={item}
            className="w-fit py-1.5 px-3 bg-teal-100 text-teal-500 text-xs sm:text-sm capitalize rounded-xl"
          >
            {item}
          </p>
        ))}
      </div>
    );
  }

  // displaying fallback message
  return <div>{fallback}</div>;
};

export default TagItems;
