import { jwtDecode } from "jwt-decode";
import { House } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { decodedType } from "./AddComment";
import { useRouter } from "next/navigation";
export const HomeOptions = ({token}:{token:string}) => {
    const router = useRouter()
    const decoded : decodedType= jwtDecode(token)
    const redirectToHome = ()=>{
        router.push("/homePage")
    }
    const redirectToUploadPost = ()=>{
        router.push("/upload")
    }
    const redirectToProfile = ()=>{
        router.push("/profile")
    }
  return (
    <>
      <div className="fixed bottom-0 left-0  w-full p-4 h-12 flex justify-evenly border-t-[1px] items-center bg-white ">
        <House onClick={redirectToHome} />
        <SquarePlus onClick={redirectToUploadPost} />
        <img
          onClick={redirectToProfile}
          src={decoded.profileImage}
          alt=""
          width={24}
          height={24}
          className=" rounded-[50%] object-cover aspect-square"
        />
      </div>
    </>
  );
};
