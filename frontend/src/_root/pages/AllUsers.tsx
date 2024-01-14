import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getUsers } from "@/features/user-api/user-api";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";

const AllUsers = () => {
  const {
    data: users,
    isError,
    isLoading,
    isFetching,
  } = useQuery("recipes", () => getUsers());

  return (
    <main className="w-full h-full max-w-7xl mx-auto my-12 custom-scrollbar overflow-scroll pb-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-12">
        {users &&
          users.map((user) => {
            return (
              <Card key={user.id} className="flex flex-col justify-between ">
                <CardHeader className="flex-row gap-4 items-center">
                  <img
                    src={
                      user.userAvatar || "/assets/icons/profile-placeholder.svg"
                    }
                    alt="avatar"
                    className="rounded-full w-14 h-14"
                  />
                  <div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{user.role}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="hover:bg-purple-700" variant="ghost">
                    View more
                  </Button>
                  {/* {recipe.vegan && <Badge variant="secondary">Vegan!</Badge>} */}
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </main>
  );
};

export default AllUsers;
