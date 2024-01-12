import { getUsers } from "@/features/user-api/user-api"
import { useQuery } from "react-query"


const AllUsers = () => {


const {data:users,isError,isLoading,isFetching}= useQuery("users",()=>getUsers())

console.log(users)

  return (
    <div>AllUsers</div>
  )
}

export default AllUsers