import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <form>
        <h1>Login In to TradeSkill</h1>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button>Login</button>
        <button>Login with Google</button>

        <div>
          <a href="#">Forgot Password?</a>
          <div>
            <p>Don't have an account ?</p> <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
