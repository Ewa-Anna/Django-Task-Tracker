import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Link, useHistory} from "react-router-dom"
import { getUsers } from "@/features/user-api/user-api";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuUsers } from "react-icons/lu";
import Cookies from 'js-cookie';


const AllUsers = () => {

  const csrftoken= Cookies.get('sessionid')

console.log(csrftoken)

  const {
    data: users,
    isError,
    isLoading,
    isFetching,
  } = useQuery("all_users", () => getUsers(),{
    refetchOnWindowFocus:false,
  });

 
  return (
    <main className="w-full h-full py-5 px-16 mx-auto my-12 custom-scrollbar overflow-scroll pb-20">
     <div  className="flex mb-12 gap-2">
     <LuUsers className="w-10 h-10"/>
     <h2 className='h3-bold md:h2-bold '>Users</h2>

     </div>
      <div className="  grid grid-cols-1 gap-8 md:grid-cols-2 px-18 md:gap-4 lg:grid-cols-4 lg:gap-12 px-22">
        {users &&
          users.results.map((user) => {
            return (
              <Card key={user.id} className="flex flex-col justify-between  border-dark-4 ">
                <CardHeader className="flex-row gap-4 items-center justify-evenly flex flex-wrap-reverse">
          
             <div className="flex flex-col items-center gap-1 flex-1">
             <img
                    src={
                      user.userAvatar || "/assets/icons/profile-placeholder.svg"
                    }
                    alt="avatar"
                    className="rounded-full w-16 h-16 md:w-10 h10"
                  />
          
             </div>
               
                       <div className="flex-1">
                    <CardTitle className="">{user.first_name}</CardTitle>
                    <CardTitle className="text-sm flex-1">{user.last_name}</CardTitle>
                    {/* <CardDescription>{user.last_name}</CardDescription> */}
                  </div>
                </CardHeader>
       
                <CardFooter className="flex justify-evenly flex-wrap gap-2 ">
                <Badge variant="secondary"> {user?.role}</Badge>
                <Link to={`/profile/${user.id}`}>
                  <Button className="hover:bg-purple-700" variant="ghost">
                    View more
                  </Button>
                  </Link>
             
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </main>
   
  );
};

export default AllUsers;
