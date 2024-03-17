import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ContentCard from "@/components/ui/shared/ContentCard"
import { Label } from "@radix-ui/react-label"


const Profile = () => {
  return (
    <div className=" w-full px-20 pt-14 pb-10 ">
      <div className="border border-slate-200 rounded-md px-6 py-6">
      <h2 className="text-3xl font-semibold">Settings</h2>
      <span className="text-gray-300">Manage your account settings and set e-mail preferences.</span>
  <hr className=" mt-3 h-0 border-2 border-dark-4" />
<div className=" h-full flex mt-5">

<div className="w-1/5 flex flex-col text-xl gap-1">
<span className=" py-1">Profile</span>
<span className=" py-1">Account</span>
<span className="  py-1">Apperance</span>
<span className=" py-1">Notifications</span>
<span className="  py-1">Display</span>
</div>

<div className="flex-1 border-2 ">
  

</div>

</div>
      </div>

    </div>
  )
}

export default Profile