import { useForm } from "react-hook-form";
import "./register.css";
import { Link } from "react-router-dom";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { register, watch,handleSubmit,formState:{errors} } = useForm<RegisterFormData>();


const isValid = (input:string)=>{
  return watch(input)
}
  
const onSubmit = handleSubmit((data)=>{
console.log(data)
})

  return (
    <div className="register">
      <form onSubmit={onSubmit}>
        <h2>Create an Account</h2>
      <div className="inputBox">
          <label htmlFor="firstName" className={isValid("firstName")?"active":""}>
            First Name
            </label>
            <input
            id="firstName"
              type="text"
              {...register("firstName", { required: "This field is required" })}
            />
           
       
          {errors.firstName &&(
                <span className="error-msg">{errors.firstName.message}</span>
            )}
          </div>
          <div className="inputBox">
          <label htmlFor="lastName" className={isValid("lastName")?"active":""}>
     
            Last Name
            </label>
            <input
            id="lastName"
              type="text"
              {...register("lastName", { required: "This field is required" })}
            />
             
      
          {errors.lastName &&(
                <span className="error-msg">{errors.lastName.message}</span>
            )}
        </div>
        <div className="inputBox">
        <label htmlFor="email" className={isValid("email")?"active":""}>
          
          Email
          </label>
          <input
          id="email"
            type="email"
            {...register("email", { required: "This field is required" })}
          />
               
      
        {errors.email &&(
                <span className="error-msg">{errors.email.message}</span>
            )}
       </div>
       <div className="inputBox">
          <label htmlFor="password" className={isValid("password")?"active":""}>
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
                
        
          {errors.password &&(
                <span className="error-msg">{errors.password.message}</span>
            )}
          </div>
          <div className="inputBox">
          <label htmlFor="confirmPassword" className={isValid("confirmPassword")?"active":""}>
            Confirm Password
            </label>
            <input
            id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                validate: (value) => {
                  if (!value) {
                    return "This field is required";
                  } else if (watch("password") !== value) {
                    return "Your passwords do not match";
                  }
                },
              })}
            />
                
        
          {errors.confirmPassword &&(
                <span className="error-msg">{errors.confirmPassword.message}</span>
            )}
          </div>
          <div className="inputBox">
            <button type="submit" className="register-button">Create</button>
         </div>
        
        <span className="register-footer">Already have an account? <Link className="link" to="/sign-in">Login</Link></span>
      </form>
    </div>
  );
};

export default Register;
