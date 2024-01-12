import { Link,useNavigate } from "react-router-dom";
import { Button } from "../button";
import { useMutation } from "react-query";
import { logoutUser } from "@/features/user-api/user-api";

const Topbar = () => {
const navigate = useNavigate()
const user= 'adam'


const mutation= useMutation(logoutUser,{
  onSuccess:()=>{
console.log("Success")
navigate("/sign-in")
  },
  onError:()=>{
    "Success"
  }
})

const logout= ()=>{
mutation.mutate()
}

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo_4.svg"
            alt="loto"
            width={38}
            height={38}
          />
        </Link>
        <div className="flex gap-4">
<Button variant="ghost" className="shad-button_ghost" onClick={()=>logout()} >
  <img src="/assets/icons/logout.svg" alt="logout" />
</Button>
<Link to={`/profile${user.id}`} className="flex-center gap-3">
<img src={user.imageUrl||'/assets/images/profile-placeholder.png'} alt="profile" 
className="h-8 w-8 rounded-full"
/>
</Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
