import { useRouter } from "next/navigation";
import { userType } from "./PostHeader"

export const Followers = ({user}:{user:userType|null})=>{
  const router = useRouter()
  const redirectToFollowers = ()=>{
    router.push("/followers")
  }
  const redirectToFollowings = ()=>{
    router.push("/followings")
  }
    return (
      <div className="flex justify-evenly my-3 ">
        <div className="flex-col">
          <p className="text-center font-bold">{user?.posts.length} </p>
          <p className="text-gray-600 ">posts</p>
        </div>
        <div onClick={redirectToFollowers}>
          <p className="text-center font-bold">{user?.followers.length} </p>
          <p className="text-gray-600 ">followers</p>
        </div>
        <div onClick={redirectToFollowings}>
          <p className="text-center font-bold">{user?.following.length} </p>
          <p className="text-gray-600 ">following</p>
        </div>
      </div>
    );
}