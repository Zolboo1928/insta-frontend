"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { PostHeader, userType } from "../custom_components/PostHeader";
import { PostContent } from "../custom_components/PostContent";
import { PostActions } from "../custom_components/PostActions";

     export type postType = {
       _id: string;
       title: string;
       postImages: string[];
       userId: userType;
       comments: commentsType[];
       likedUsers: string[];
       createdAt: string;
     };



       type commentsType = {
         _id: string;
         comment: string;
         userId: string;
         commentedPostId: string;
       };


const Page = ()=>{
  const token = localStorage.getItem("authorization")

  const router = useRouter();

    const [posts,setPosts] = useState<postType[]>([])
    const [isloading,setIsLoading] = useState(true)
    const getData = async ()=>{
        const response = await fetch(
          "https://instagram-service-xt7j.onrender.com/post/posts",
          {
            headers: {
              authorization: `Bearer ${token}`,
              "content-type": "application/json",
            },
          }
        );
        if(response) setIsLoading(false)
        const parsedPosts = await response.json();
        setPosts(parsedPosts)
    }
    useEffect(()=>{
      getData()
    },[])

    const redirectToComments = (id: string)=>{
      router.push(`comments/${id}`)
    }
  if (!token) {
    return <div>Login Or Sign up</div>;
  } else if(isloading){
    return <div className="text-center mt-[100%] ">Loading...</div>;
  }
    return (
      <div className="pt-5 pb-10">
        {posts?.map((post, index) => {
          return (
            <div key={index} className="border-0 mb-[22px]">
              <PostHeader user={post.userId} />
              <PostContent Images={post.postImages} />
              <PostActions
                getData={getData}
                token={token}
                post={post}
                redirectToComments={redirectToComments}
              />
            </div>
          );
        })}
      </div>
    );
}
export default Page