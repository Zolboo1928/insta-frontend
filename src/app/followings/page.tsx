"use client"

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FollowingContent } from "../custom_components/FollowingContent";

const Page = ()=>{
    const router = useRouter();
    const redirectToProfile = () => {
      router.push("/profile");
    };
    return (
      <>
        <div
          className="flex justify-center h-11 items-center font-bold border-b-2"
          onClick={redirectToProfile}
        >
          <ChevronLeft className="left-4 absolute" />
          <p>Following</p>
        </div>
        <FollowingContent />
      </>
    );
}
export default Page