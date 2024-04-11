import React from 'react'
import AuthLayout from '../../components/AuthLayout'
import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/userApi';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ email, password }) => login({ email, password }),
        onSuccess: (data) => {

            localStorage.setItem('user', JSON.stringify(data))
            localStorage.setItem('token', data.csrf_token)

        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const { email, password } = data;
        mutate({ email, password })
    }


    return (
        <AuthLayout>
            <div className='bg-orange-600 flex-1 px-10 flex items-center justify-center'>
                <form onSubmit={handleSubmit(submitHandler)}>



                    <div className='flex flex-col mb-6 w-full'>
                        <label
                            htmlFor="email"
                            className='text-[#5a7184] font-semibold block'>
                            Email
                        </label>
                        <input
                            {...register("email", {
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Please enter a valid email',
                                },
                                required: {
                                    value: true,
                                    message: "Email is required"
                                },
                            })}
                            type="email"
                            id='email'
                            placeholder='Eneter your email'
                            className={`placeholder:text-[#959ead] text-dark-3  mb-3 rounded-lg 
                                px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.email ? "border-red-500" : "border-[#c3cad9]"}`}

                        />
                        {errors.email?.message && (
                            <span className='text-red-500 text-xs mt-1'>{errors.email.message}</span>
                        )}
                    </div>

                    <div className='flex flex-col mb-6 w-full'>
                        <label
                            htmlFor="password"
                            className='text-[#5a7184] font-semibold block'>
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required"
                                },
                                minLength: {
                                    value: 6,
                                    message: "Password lenght must be at least 6 characters"
                                }
                            })}
                            type="password"
                            id='password'
                            placeholder='Eneter your password'
                            className={`placeholder:text-[#959ead] text-dark-3 mb-3 rounded-lg 
                                px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.password ? "border-red-500" : "border-[#c3cad9]"}`}

                        />
                        {errors.password?.message && (
                            <span className='text-red-500 text-xs mt-1'>{errors.password.message}</span>
                        )}
                    </div>


                    <Link
                        to="/forget-password"
                        className='text-sm font-semibold text-primary'>
                        Forgot Password?
                    </Link>
                    <button
                        type='submit'
                        disabled={!isValid || isLoading}
                        className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed'>
                        Sign In
                    </button>
                    <p
                        className='text-sm font-semibold text-[#5a7184]'
                    >
                        Dont have an account?
                        <Link
                            to="/register"
                            className='text-primary ml-1'
                        >

                            Register now</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login