import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className=" h-screen border-5 sm:text-xl flex flex-col gap-5 justify-center items-center">
      <h1 className="text-2xl">Page Not found!</h1>

      <div>
        <Link
          to="/"
          className="py-2 px-4 bg-teal-500 text-white text-sm font-semibold rounded-xl"
        >
          Go to home page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
