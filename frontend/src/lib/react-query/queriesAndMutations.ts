import {useQuery,useMutation,userQueryClient,useIfniniteQuery} from "react-query"
import { INewUser } from "../../../types"
import { createUserAccount } from "@/features/user-api/user-api"


export const useCreateUserAccountMutation = ()=>{


    return useMutation({
      mutationFn:(user:INewUser)=>createUserAccount(user)
    })
}