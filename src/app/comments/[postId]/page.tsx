"use client";
import { use, useState } from "react";

const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = use(params);
  const [comments, setComments] = useState()
  const getComments = async ()=>{
    const response = await fetch("https://instagram-service-xt7j.onrender.com/post/getPostById",{
        body: postId
    });
  }
  return <div>comments{postId}</div>;
};

export default Page;
