import { useEffect, useState } from "react";

const useMediaQuery = (queryString: string, defaultValue = false) => {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const media = window.matchMedia(queryString);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    // remove even listener when component unmounts
    return () => media.removeEventListener("change", listener);
  }, [queryString, matches]);

  return matches;
};

export default useMediaQuery;
