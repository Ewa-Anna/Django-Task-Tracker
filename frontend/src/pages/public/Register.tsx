import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerAccount } from "../../services/userApi";

const Register = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    }: {
      email: string;
      password: string;
    }) =>
      registerAccount({
        first_name,
        last_name,
        email,
        password,
        confirm_password,
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onChange",
  });

  const onSubmit = handleSubmit(
    ({ first_name, last_name, email, password, confirm_password }) => {
      mutate({ first_name, last_name, email, password, confirm_password });
    }
  );

  const validatePassword = (val: string): boolean => {
    if (val.length < 8) return false;

    const hasDigit = /\d/.test(val);
    const hasLowerCase = /[a-z]/.test(val);
    const hasUpperCase = /[A-Z]/.test(val);
    const hasLetter = /[a-zA-Z]/.test(val);
    const hasSpecialChar = /[!@#$%^&*(),.?":;{}|<>]/.test(val);

    return (
      hasDigit && hasLowerCase && hasUpperCase && hasLetter && hasSpecialChar
    );
  };

  return (
    <div className="bg-slate-100 flex-1 px-10 flex items-center justify-center">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col mb-6 w-full">
          <label htmlFor="email" className="text-[#5a7184] font-semibold block">
            First name
          </label>
          <input
            {...register("first_name", {
              required: "This field is required",
            })}
            type="text"
            id="email"
            placeholder="Enter your email"
            className={`placeholder:text-[#959ead] text-dark-3  mb-3 rounded-lg 
                                    px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${
                                      errors.email
                                        ? "border-red-500"
                                        : "border-[#c3cad9]"
                                    }`}
          />
          {errors.first_name?.message && (
            <span className="text-red-500 text-xs mt-1">
              {errors.first_name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col mb-6 w-full">
          <label htmlFor="email" className="text-[#5a7184] font-semibold block">
            Last name
          </label>
          <input
            {...register("last_name", { required: "This field is required" })}
            type="text"
            id="email"
            placeholder="Enter your email"
            className={`placeholder:text-[#959ead] text-dark-3  mb-3 rounded-lg 
                                    px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${
                                      errors.email
                                        ? "border-red-500"
                                        : "border-[#c3cad9]"
                                    }`}
          />
          {errors.last_name?.message && (
            <span className="text-red-500 text-xs mt-1">
              {errors.last_name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col mb-6 w-full">
          <label htmlFor="email" className="text-[#5a7184] font-semibold block">
            Email
          </label>
          <input
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            type="email"
            id="email"
            placeholder="Enter your email"
            className={`placeholder:text-[#959ead] text-dark-3  mb-3 rounded-lg 
                                    px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${
                                      errors.email
                                        ? "border-red-500"
                                        : "border-[#c3cad9]"
                                    }`}
          />
          {errors.email?.message && (
            <span className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col mb-6 w-full">
          <label
            htmlFor="password"
            className="text-[#5a7184] font-semibold block"
          >
            Password
          </label>
          <input
            {...register("password", {
              validate: (val) =>
                validatePassword(val) ||
                "Password should contain at least 8 characters with at least 1 digit, 1 letter, 1 upper case letter, 1 lower case letter, and 1 special character",
            })}
            type="password"
            id="password"
            placeholder="Enter your password"
            className={`placeholder:text-[#959ead] text-dark-3 mb-3 rounded-lg 
                                    px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${
                                      errors.password
                                        ? "border-red-500"
                                        : "border-[#c3cad9]"
                                    }`}
          />
          {errors.password?.message && (
            <span className="text-rose-600 font-semibold  text-xs mt-1 px-2 md:px-0 max-w-[280px] md:max-w[280] lg:max-w-[280px]  mx-auto">
              {errors.password.message}
            </span>
          )}
          {errorMessage && (
            <div className="flex justify-center">
              <span className="text-sm text-rose-500 "> {errorMessage}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col mb-6 w-full">
          <label
            htmlFor="password"
            className="text-[#5a7184] font-semibold block"
          >
            Confrim password
          </label>
          <input
            {...register("confirm_password", {
              validate: (val) => {
                const passwordValue = watch("password");
                if (val !== passwordValue) {
                  return "Passwords do not match";
                }
              },
            })}
            type="password"
            id="password"
            placeholder="confirm your password"
            className={`placeholder:text-[#959ead] text-dark-3 mb-3 rounded-lg 
                                    px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${
                                      errors.password
                                        ? "border-red-500"
                                        : "border-[#c3cad9]"
                                    }`}
          />
          {errors.confirm_password?.message && (
            <span className="text-rose-600 font-semibold text-xs mt-1">
              {errors.confirm_password.message}
            </span>
          )}
          {errorMessage && (
            <div className="flex justify-center">
              <span className="text-sm text-rose-500 "> {errorMessage}</span>
            </div>
          )}
        </div>

        <Link
          to="/forget-password"
          className="text-sm font-semibold text-primary"
        >
          Forgot Password?
        </Link>

        <button
          type="submit"
          //   disabled={!isValid || isLoading}
          className="bg-teal-600 text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Register
        </button>
        <p className="text-sm font-semibold text-[#5a7184]">
          Already have an account?
          <Link to="/login" className="text-primary ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
