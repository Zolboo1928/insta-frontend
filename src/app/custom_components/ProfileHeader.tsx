import { ChevronLeft } from "lucide-react"
import { userType } from "./PostHeader"
import { useRouter } from "next/navigation"

 export const ProfileHeader = ({user}:{user:userType|null})=>{
  const router = useRouter()
  const redirectToHomePage = ()=>{
    router.push("/homePage")
  }
    return (
      <>
        <div
          className="flex justify-center h-11 items-center font-bold"
          onClick={redirectToHomePage}
        >
          <ChevronLeft className="left-4 absolute" />
          <p className="">{user?.userName}</p>
        </div>
      </>
    );
}
