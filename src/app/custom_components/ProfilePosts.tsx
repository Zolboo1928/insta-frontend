/* eslint-disable @next/next/no-img-element */
import { Grid3x3 } from "lucide-react";
import { postType } from "../homePage/page";
import { useRouter } from "next/navigation";
export const ProfilePosts = ({posts}:{posts:postType[]|null}) => {
  const router = useRouter()
  const redirectToPost = (postId:string)=>{
    router.push(`/post/${postId}`)
  }
  return (
    <>
      <div className="flex justify-center border-b-2">
        <Grid3x3 className="my-2" />
      </div>
      <div className="flex gap-1 mx-1">
        {posts?.map((post,index)=>{
            return (
              <div key={index} className="w-1/3" onClick={()=>redirectToPost(post._id)}>
                <img
                  src={post.postImages[0]}
                  className="w-full aspect-square object-cover"
                  alt=""
                />
              </div>
            );
        })}
      </div>
    </>
  );
};
