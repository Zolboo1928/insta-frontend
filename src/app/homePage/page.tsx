"use client"
import { useEffect, useState } from "react"
import { MessageCircle } from 'lucide-react';
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = ()=>{
  const router = useRouter();
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
      _id: string
    };
    type postType = {
      _id: string;
      title: string;
      postImage: string;
      userId: userType;
      comments: commentsType[];
      likedUsers: likedUsersTypes[];
    }[];
    const [posts,setPost] = useState<postType>([])
    const getData = async ()=>{
        const response = await fetch("https://instagram-service-xt7j.onrender.com/post/posts",{
          headers:{
            
          }
        })
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

    return (
      <div>
        {posts?.map((post,index) => {
          return (
            <div key={index} className="border-0 mb-[22px]">
              <div className="flex gap-2 font-semibold items-center ml-[16px]">
                <img
                  src={post?.userId.profileImage}
                  alt=""
                  width={32}
                  height={32}
                  className=" rounded-[50%] object-cover"
                />
                <p>{post.userId.userName}</p>
              </div>
              <img
                src={post?.postImage}
                alt=""
                width={468}
                height={517}
                className=" object-cover mt-[14px]"
              />
              <div className="ml-[16px] ">
                <div className="flex gap-4 my-3">
                  <Heart />
                  <MessageCircle onClick={() => redirectToComments(post._id)} />
                </div>
                <p className=" font-semibold">{post.likedUsers.length} likes</p>
                <div className="space-x-2">
                  <span className="font-semibold">{post.userId.userName}</span>
                  <span>{post.title}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
}
export default Page