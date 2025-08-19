import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="w-screen  flex justify-center">
      <div className="w-8/9 md:w-1/2 h-screen text-center flex flex-col justify-center items-center gap-7 md:gap-9">
        <h1 className="text-3xl lg:text-5xl leading-tight font-semibold">
          Exchange Services, Grow Together
        </h1>
        <p className="text-lg text-neutral-500">
          Connect with a community of talented individuals to share your
          expertise or find the skills you need. Learn, teach, and collaborate
          effortlessly
        </p>

        <div className="mt-1 flex gap-5 *:py-2.5 *:px-7 *:rounded-2xl *:font-semibold">
          <Link to="/signup" className="bg-teal-500 text-white">
            Sign Up
          </Link>
          <Link to="/login" className="bg-teal-100 text-teal-500">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
