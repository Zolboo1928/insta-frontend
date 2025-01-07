"use client"
import { jwtDecode } from "jwt-decode"
import { decodedType } from "../custom_components/AddComment";
import { useEffect, useState } from "react";
import { ProfileHeader } from "../custom_components/ProfileHeader";
import { userType } from "../custom_components/PostHeader";
import { UserSection } from "../custom_components/UserSection";
import { Followers } from "../custom_components/Followers";
import { ProfilePosts } from "../custom_components/ProfilePosts";
import { postType } from "../homePage/page";

const Page = ()=>{
    const [user,setUser] = useState<userType | null>(null)
    const [posts, setPosts] = useState<postType[] | null>(null)
   const token = localStorage.getItem("authorization");
    const decoded :decodedType= jwtDecode(token || "")
    const getUser = async ()=>{
        const response = await fetch(
          "https://instagram-service-xt7j.onrender.com/user/getUserById",
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: decoded._id }),
          }
        );
        const data = await response.json()
        setUser(data)
    }
    const getPostsOfUser = async()=>{
        const res = await fetch(
          "https://instagram-service-xt7j.onrender.com/user/getPostsOfUserByUserId",{
            method:"POST",
            headers:{
                authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({userId:decoded._id})
          }
        );
        const userWithPosts = await res.json()
        setPosts(userWithPosts.posts)
    }
    useEffect(()=>{
        getUser()
        getPostsOfUser()
    },[])
    console.log(posts)
    return (
      <>
        <ProfileHeader user={user} />
        <hr />
        <UserSection user={user} />
        <hr />
        <Followers user={user} />
        <hr />
        <ProfilePosts
          user={user}
          posts={posts}
        />
      </>
    );
}
export default Page