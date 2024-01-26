import * as z from "zod"




export const signupValidationSchema = z.object({
    first_name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    last_name:z.string().min(2,{
        message:"Surname must be at least 2 characters."
    }),
    email:z.string().email(),
    password:z.string().min(8,{
        message:"Password must be at least 8 characters."
    }),
confirm_password:z.string()
  }).refine((data)=>data.password===data.confirm_password,{
    path:['confirmPassword'],
    message:"Passwords do not match"
  })

  export const signinValidationSchema = z.object({
 
    email:z.string().email(),
    password:z.string().min(8,{
        message:"Password must be at least 8 characters."
    }),
    
  });

  export const ProjectValidationSchema = z.object({
 
    title:z.string().min(5,{message:"Title must be at least 5 characters long"}).max(100,{message:"Title cannot exceed 100 characters."}),
    description:z.string().min(15,{message:"Description must be at least 15 characters long"}).max(2200,{message:"Description cannot exceed 2200 characters."}),
    file:z.custom<File[]>(),
    owner:z.string().min(1,{message:"This field is required"}),
    visibility:z.string().min(1,{message:"Please choose visibility type"}),
    tags:z.array(z.string()),
    deadline:z.union([z.string().optional(), z.date()]).refine(value => value !== '', {message: "Deadline field is required"}),
    assignees: z.array(z.object({
      id:z.number(),
      email:z.string().email()
    })),

    
  })
 
