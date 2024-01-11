
import { Button } from "@/components/ui/button";

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
import { signinValidationSchema } from "@/lib/validation";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { createUserAccount, loginUser } from "@/features/user-api/user-api";



const SigninForm = () => {
const toast = useToast()
const isLoading = false;



  // 1. Define form
  const form = useForm<z.infer<typeof signinValidationSchema>>({
    resolver: zodResolver(signinValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


const mutation = useMutation(loginUser,{
  onSuccess:(data)=>{
    console.log(data)
  },
  onError:(error)=>{
console.log(error)
  }
})

  // 2. Define a submit handler.
   function onSubmit(values: z.infer) {

    console.log(values)
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img
          src="assets/images/logo_4.svg"
          alt="logo"
          height={120}
          width={120}
        />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
 
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
  
          <Button className="shad-button_primary" type="submit">
            {isLoading?(<div className="flex-center gap-3"><Loader/>Loading...</div>):("Sign up")}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">Don't have an account?
          <Link className="text-primary-500 text-small-semibold ml-1" to="/sign-up">Sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
