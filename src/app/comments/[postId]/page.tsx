"use client";
import { use, useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = use(params);
  type commentsType = {
    comments: string;
  }
  const [post, setPost] = useState<commentsType[]>([])
  const getPostById = async ()=>{
    const response = await fetch("https://instagram-service-xt7j.onrender.com/post/getPostById",{
        body: postId
    });
    setPost(await response.json())
  }
  useEffect(()=>{
    getPostById()
  },[])
  console.log(post)
  return( <div>comments{postId}</div>)
};

export default Page;
