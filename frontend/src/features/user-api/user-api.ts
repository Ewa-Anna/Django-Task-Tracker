
import {RegisterFormData} from "../../components/pages/register/Register"
import {SignInFormData} from "../../components/pages/signIn/SignIn"
import axios from "../axios/axios"
import clientApi from "../axios/axios"


 export const createUserAccount = async(formData:RegisterFormData)=>{

const response = await axios.post("user/register/",formData)
return response.data
}


 export const loginUser= async (formData:SignInFormData)=>{

    try{
        const response = await clientApi.post("/user/login/",formData)
        return response.data
    }

    catch(error){
        console.error(error);
  
    }

}

