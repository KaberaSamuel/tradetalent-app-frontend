import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <form>
        <h1>Join Our Community</h1>
        <p>Create your account to start trading skills</p>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>Sign Up</button>
        <button>Sign Up with Google</button>
        <div>
          <p>Already have an account ?</p> <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
