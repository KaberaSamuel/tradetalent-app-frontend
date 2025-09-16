import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const buttonStyles =
    "py-2 px-4 bg-teal-500 text-white text-sm font-semibold rounded-xl";

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className=" h-screen border-5 sm:text-xl flex flex-col gap-5 justify-center items-center">
      <p>Page Not found</p>

      <div className="flex gap-5">
        <Link to="/" className={buttonStyles}>
          Go to home age
        </Link>
        <button onClick={goBack} className={buttonStyles}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
