import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./signIn.css";

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const isValid = (input: string) => {
    return watch(input);
  };

  return (
    <div className="sign-in">
      <form onSubmit={onSubmit}>
        <h2>Sign In</h2>
        <div className="inputBox">
          <label htmlFor="email" className={isValid("email") ? "active" : ""}>
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="error-msg">{errors.email.message}</span>
          )}
        </div>
        <div className="inputBox">
          <label
            htmlFor="password"
            className={isValid("password") ? "active" : ""}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="error-msg">{errors.password.message}</span>
          )}
        </div>
        <span className="sign-in-footer">
          <button type="submit" className="sign-in_button">
            Login
          </button>
        </span>

        <span className="sign-in-footer">
          Not Registered?{" "}
          <Link className="link" to="/register">

            Create an account here
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
