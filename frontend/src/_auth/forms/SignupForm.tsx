import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupValidationSchema } from "@/lib/validation";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/features/user-api/user-api";
import { useMutation } from "react-query";
import { useAuthContext } from "@/contexts/AuthContext";


const SignupForm = () => {
  const navigate = useNavigate()
const toast = useToast()
const isLoading = false;
const  {showToast}=useAuthContext()



  // 1. Define form
  const form = useForm<z.infer<typeof signupValidationSchema>>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password:""
      
    },
  });

  const mutation = useMutation(createUserAccount,{
    onSuccess:()=>{
      showToast({
        message:"Registration Sucess",type:"SUCCESS"
      })
      navigate("/")
    },
    onError:(error:Error)=>{
 showToast({message:error.message,type:"ERROR"})
    }
  })
  



  // 2. Define a submit handler.
  function onSubmit(values: z.infer) {

mutation.mutate(values)
 
  }


  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img
          src="assets/images/logo_4.svg"
          alt="logo"
          height={100}
          width={100}
        />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use BugBard, please enter your details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input"{...field} />
                </FormControl>
         
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input"{...field} />
                </FormControl>
         
                <FormMessage />
              </FormItem>
            )}
          />
                              <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input"{...field} />
                </FormControl>
         
                <FormMessage />
              </FormItem>
            )}
          />
                              <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input"{...field} />
                </FormControl>
         
                <FormMessage />
              </FormItem>
            )}
          />
                                <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input"{...field} />
                </FormControl>
         
                <FormMessage className="text-red-300" />
              </FormItem>
            )}
          />
  
          <Button className="shad-button_primary" type="submit">
            {isLoading?(<div className="flex-center gap-3"><Loader/>Loading...</div>):("Sign up")}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">Already have an account?
          <Link className="text-primary-500 text-small-semibold ml-1" to="/sign-in">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
