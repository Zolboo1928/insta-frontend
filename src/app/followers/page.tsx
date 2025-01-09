"use client"

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FollowersContent from "../custom_components/FollowersContent";

const Page = ()=>{
    const router = useRouter()
    const redirectToProfile = ()=>{
        router.push("/profile")
    }
    return (
      <>
        <div
          className="flex justify-center h-11 items-center font-bold border-b-2"
          onClick={redirectToProfile}
        >
          <ChevronLeft className="left-4 absolute" />
          <p>Followers</p>
        </div>
        <FollowersContent />
      </>
    );
}
export default Page