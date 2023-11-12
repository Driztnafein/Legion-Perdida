import { useForm } from "react-hook-form";
import { login } from "../../services/api-service";
import { useAuthContext } from "../../contexts/auth";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { onLogin } = useAuthContext();
  const navigate = useNavigate();

 

  function handleLogin(data) {
    login(data).then((response) => {
      onLogin(response);
      navigate("/game");
    });
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>

          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <Link className="btn btn-link" to="/signup">
          Sign up
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;