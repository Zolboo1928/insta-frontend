"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { PostHeader } from "../custom_components/PostHeader";
import { PostContent } from "../custom_components/PostContent";
import { PostActions } from "../custom_components/PostActions";

     export type postType = {
       _id: string;
       title: string;
       postImages: string[];
       userId: userType;
       comments: commentsType[];
       likedUsers: likedUsersTypes[];
       createdAt: string;
     };

     type userType = {
         userName: string;
         profileImage: string;
       };
       type commentsType = {
         _id: string;
         comment: string;
         userId: string;
         commentedPostId: string;
       };
       type likedUsersTypes = {
         userName: string;
         profileImage: string;
         _id: string;
       };

const Page = ()=>{
  const token = window.localStorage.getItem("authorization")

  const router = useRouter();

    const [posts,setPost] = useState<postType[]>([])
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
        const parsedPosts = await response.json();
        setPost(parsedPosts)
    }
    useEffect(()=>{
      getData()
    },[])
    console.log(posts)

    const redirectToComments = (id: string)=>{
      router.push(`comments/${id}`)
    }
  if (!token) {
    return <div>Login Or Sign up</div>;
  }
  console.log(posts)
    return (
      <div className="pt-5">
        {posts?.map((post,index) => {
          return (
            <div key={index} className="border-0 mb-[22px]">
              <PostHeader user={post.userId} />
              <PostContent Images={post.postImages} />
              <PostActions
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