import { ChevronLeft } from "lucide-react"
import { userType } from "./PostHeader"

 export const ProfileHeader = ({user}:{user:userType|null})=>{
    return<>
      <div className="flex justify-center h-11 items-center font-bold">
        <ChevronLeft className="left-4 absolute" />
        <p className="">{user?.userName}</p>
      </div>
    </>
}
