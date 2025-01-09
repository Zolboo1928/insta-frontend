import { postType } from "../homePage/page";

 export type userType = {
  _id: string;
   userName: string;
   password: string;
   email: string;
   profileImage: string;
   posts: postType[];
   following: string[];
   followers: string[];
 };
export const PostHeader = ({user}: {user: userType|undefined})=>{
    return (
      <>
        <div className="flex gap-2 font-semibold items-center ml-[16px]">
          <img
            src={user?.profileImage}
            alt=""
            width={32}
            height={32}
            className=" rounded-[50%] object-cover aspect-square"
          />
          <p>{user?.userName}</p>
        </div>
      </>
    );
}