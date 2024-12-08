"use client"
import { useEffect, useState } from "react"
import { Card, CardHeader } from "../components/ui/card";

const Page = ()=>{
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
      postedUserImage: string;
      userId: userType;
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
          return (
            <Card key={index}>
              <div className="flex gap-2 font-semibold items-center">
                <img
                  src={post.userId.profileImage}
                  alt=""
                  width={32}
                  height={32}
                  className=" rounded-[50%] object-fill"
                />
                <p>{post.userId.userName}</p>
              </div>
              
            </Card>
          );
        })}
      </div>
    );
}
export default Page