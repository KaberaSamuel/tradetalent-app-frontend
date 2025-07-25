import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div>
      <h1>Exchange Skils, Grow Together</h1>
      <p>
        Connect with a community of talented individuals to share your expertise
        or find the skills you need. Learn, teach, and collaborate effortlessly
      </p>

      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default WelcomePage;
