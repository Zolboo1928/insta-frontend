"use client"
import { useEffect, useState } from "react"

const Page = ()=>{
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
      postedUserImage: string;
      userId: string;
      comments: commentsType;
      likedUsers: likedUsersTypes;
    }[];
    const [posts,setPost] = useState<postType>([])
    const getData = async ()=>{
      console.log("working")
        const response = await fetch("https://instagram-service-xt7j.onrender.com/post/posts")
        console.log(response)
        const parsedPosts = await response.json();
        setPost(parsedPosts)
    }
    useEffect(()=>{
      getData()
    },[])
    return (
      <div>
        {posts?.map((post,index) => {
          return <div key={index}>{post.title}</div>;
        })}
      </div>
    );
}
export default Page