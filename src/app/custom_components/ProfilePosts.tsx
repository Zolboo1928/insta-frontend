import { Grid3x3 } from "lucide-react";
import { userType } from "./PostHeader";
import { postType } from "../homePage/page";
export const ProfilePosts = ({user,posts}:{user:userType|null,posts:postType[]|null}) => {
  return (
    <>
      <div className="flex justify-center">
        <Grid3x3 className="my-2" />
      </div>
      <div className="flex justify-evenly">
        {posts?.map((post,index)=>{
            return (
              <div key={index} >
                <img
                  src={post.postImages[0]}
                  className="object-fill"
                  width={127}
                  height={127}
                  alt=""
                />
              </div>
            );
        })}
      </div>
    </>
  );
};
